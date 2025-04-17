document.addEventListener('DOMContentLoaded', function() {
    const socket = io('http://localhost:5000', {
        transports: ['websocket'],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        withCredentials: true,
        timeout: 10000,  // Add timeout
    });
    
    const video = document.getElementById('videoElement');
    const pdfInput = document.getElementById('pdfFile');
    const uploadSection = document.getElementById('uploadSection');
    const currentSlideSpan = document.getElementById('currentSlide');
    const totalSlidesSpan = document.getElementById('totalSlides');
    
    let isStreaming = false;
    let lastFrameTime = 0;
    const FRAME_INTERVAL = 1000 / 30; // 30 FPS limit
    let frameProcessingActive = false;
    let displayCanvas = null;
    let processingCanvas = null;
    let currentFrameImage = null;

    // Initialize canvases
    function initializeCanvases() {
        displayCanvas = document.getElementById('displayCanvas');
        if (!displayCanvas) {
            console.error('Display canvas not found');
            return false;
        }
        processingCanvas = document.createElement('canvas');
        processingCanvas.width = 1280;  // Match the backend dimensions
        processingCanvas.height = 720;
        return true;
    }

    // Add the missing updateDisplay function
    function updateDisplay(data) {
        if (!displayCanvas) return;
    
        if (data.currentSlide !== undefined && data.totalSlides !== undefined) {
            currentSlideSpan.textContent = (data.currentSlide + 1).toString();
            totalSlidesSpan.textContent = data.totalSlides.toString();
        }
    
        if (data.frame) {
            if (!currentFrameImage) {
                currentFrameImage = new Image();
            }
    
            currentFrameImage.onload = () => {
                try {
                    const ctx = displayCanvas.getContext('2d', { 
                        alpha: false,
                        imageSmoothingEnabled: false
                    });
                    
                    if (!ctx) return;
                    
                    displayCanvas.width = currentFrameImage.width;
                    displayCanvas.height = currentFrameImage.height;
                    
                    ctx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
                    ctx.drawImage(currentFrameImage, 0, 0);
                } catch (error) {
                    console.error('Display update error:', error);
                }
            };
    
            currentFrameImage.onerror = (error) => {
                console.error('Image loading error:', error);
            };
    
            currentFrameImage.src = data.frame;
        }
    }

    // Socket connection handlers
    socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        alert('Failed to connect to server. Please refresh the page.');
    });

    socket.on('connect', () => {
        console.log('Connected to server');
    })

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
        frameProcessingActive = false;
        releaseFrameResources();
    });

    socket.on('processed_frame', (data) => {
        if (!data || !data.frame) {
            console.error('Invalid frame data received');
            return;
        }
        updateDisplay(data);
    });

    // PDF upload handler with improved error handling
    pdfInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        if (!file.type.includes('powerpoint') && !file.name.toLowerCase().endsWith('.pptx')) {
            alert('Please select a PowerPoint (PPTX) file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5000/upload-ppt', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                console.log('PDF uploaded successfully');
                uploadSection.style.display = 'none';
                initializeCanvases();
                await startWebcam();
            } else {
                throw new Error(data.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert(`Failed to upload ppt: ${error.message}`);
            pdfInput.value = ''; // Reset input
        }
    });

    // Improved webcam handlers
    async function startWebcam() {
    if (isStreaming) return;
    
    try {
        // First check if mediaDevices API is available
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('Your browser does not support accessing the webcam or is missing permissions.');
        }
        
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 800 },
                height: { ideal: 600 },
                frameRate: { ideal: 50, max: 50 }
            }
        });
        
        video.srcObject = stream;
        await new Promise(resolve => video.onloadedmetadata = resolve);
        video.play();
        isStreaming = true;
        frameProcessingActive = true;
        startFrameProcessing();
        
    } catch (error) {
        console.error('Error accessing webcam:', error);
        alert('Failed to access webcam. Please ensure permissions are granted and you are using a secure connection.');
        throw error;
    }
}
    function startFrameProcessing() {
        if (!processingCanvas) {
            processingCanvas = document.createElement('canvas');
            processingCanvas.width = 800;
            processingCanvas.height = 600;
        }
        const ctx = processingCanvas.getContext('2d', { alpha: false });

        function processFrame() {
            if (!isStreaming || !frameProcessingActive) {
                releaseFrameResources();
                return;
            }
        
            const now = Date.now();
            if (now - lastFrameTime >= FRAME_INTERVAL) {
                try {
                    if (!processingCanvas || !ctx) return;
                    ctx.drawImage(video, 0, 0, processingCanvas.width, processingCanvas.height);
                    const frameData = processingCanvas.toDataURL('image/jpeg', 0.85);
                    
                    if (socket && socket.connected) {
                        socket.emit('process_frame', frameData);
                        lastFrameTime = now;
                    }
                } catch (error) {
                    console.error('Frame processing error:', error);
                    frameProcessingActive = false;
                }
            }
        
            if (frameProcessingActive) {
                requestAnimationFrame(processFrame);
            }
        }

        processFrame();
    }

    function releaseFrameResources() {
        // Clear processing canvas
        if (processingCanvas) {
            const ctx = processingCanvas.getContext('2d');
            ctx.clearRect(0, 0, processingCanvas.width, processingCanvas.height);
        }
        
        // Clear display canvas
        if (displayCanvas) {
            const ctx = displayCanvas.getContext('2d');
            ctx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
        }
        
        // Clear current frame image
        if (currentFrameImage) {
            currentFrameImage.src = '';
            currentFrameImage = null;
        }
    }

    // Cleanup function
    function cleanup() {
        try {
            isStreaming = false;
            frameProcessingActive = false;
            
            // Stop video tracks
            if (video.srcObject) {
                const tracks = video.srcObject.getTracks();
                tracks.forEach(track => track.stop());
                video.srcObject = null;
            }
            
            // Clear canvases
            releaseFrameResources();
            
            // Close socket properly
            if (socket && socket.connected) {
                socket.disconnect();
            }
        } catch (error) {
            console.error('Cleanup error:', error);
        }
    }

    // Add cleanup on page unload
    window.addEventListener('beforeunload', cleanup);
    window.onerror = function(msg, url, lineNo, columnNo, error) {
        console.error('Global error:', {msg, url, lineNo, columnNo, error});
        cleanup();
        return false;
    };
    
    window.addEventListener('unhandledrejection', function(event) {
        console.error('Unhandled promise rejection:', event.reason);
        cleanup();
    });
});