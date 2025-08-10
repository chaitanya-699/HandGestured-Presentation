# Interactive Gesture-Based Presentation System

## Overview
Gesture is an innovative presentation control system that enables users to control PDF presentations using hand gestures. The system combines computer vision technology with web-based architecture to provide a contactless, intuitive interface for presentations. Users can navigate through slides, draw annotations, and use a pointer mode - all through natural hand gestures.

## Features
- **Gesture-Based Navigation**
  - Next/Previous slide control
  - Drawing mode activation
  - Pointer mode activation
  - Screen clearing

- **Interactive Drawing**
  - Real-time drawing on slides
  - Multiple color options
  - Adjustable pen sizes
  - Whiteboard mode

- **Real-time Processing**
  - Low-latency gesture recognition
  - Smooth drawing experience
  - Efficient frame processing

- **User-Friendly Interface**
  - Simple PDF upload
  - Intuitive gesture controls
  - Visual feedback
  - Responsive design

## Supported Gestures
- ✌️ + 👍 : Next Slide
- ☝️ + 👍 : Previous Slide
- ✌️ : Drawing Mode
- ☝️ : Pointer Mode
- 🖐️ : Clear Drawing

## Technologies Used
- **Frontend**
  - HTML5/CSS3
  - JavaScript (ES6+)
  - Socket.IO Client
  - Canvas API

- **Backend**
  - Python 3.8+
  - Flask
  - MediaPipe Hands
  - OpenCV
  - PyMuPDF

- **Communication**
  - WebSocket
  - Socket.IO

## Dependencies

### Python Requirements (Both Windows and Linux)
- Python 3.7 - 3.10
- OpenCV (`cv2`)
- NumPy
- PyMuPDF (`fitz`)
- Pillow (`PIL`)
- Base64 (standard library)
- MediaPipe
- python-pptx
- pdf2image
- Logging (standard library)
- Collections (standard library)
- Time (standard library)
- Typing (standard library)
- os (standard library)
- tempfile (standard library)
- subprocess (standard library)

### External Dependencies

#### Windows
- LibreOffice (for PPT to PDF conversion)
  - Default path: `C:\Program Files\LibreOffice\program\soffice.exe`
- Poppler (required for pdf2image)
  - Not included by default in Windows

#### Linux
- LibreOffice (for PPT to PDF conversion)
  - Usually available as `libreoffice` package
- Poppler Utils (required for pdf2image)
  - Package name typically `poppler-utils`

## Installation

### Windows

1. Install Python 3.7 or higher from https://www.python.org/downloads/

2. Install required Python packages:
```
pip install opencv-python numpy pymupdf pillow mediapipe python-pptx pdf2image
```

3. Install LibreOffice:
   - Download from https://www.libreoffice.org/download/
   - Default installation path should be `C:\Program Files\LibreOffice\`

4. Install Poppler for Windows:
   - Download from https://github.com/oschwartz10612/poppler-windows/releases
   - Extract to a folder (e.g., `C:\Program Files\poppler`)
   - Add bin directory to your PATH environment variable

5. Verify the path to LibreOffice in `gesture_processor.py` matches your installation:
```python
# Line ~403 in gesture_processor.py
'C:\\Program Files\\LibreOffice\\program\\soffice.exe'
```

### Linux

1. Install Python and pip:
```
sudo apt update
sudo apt install python3 python3-pip
```

2. Install LibreOffice and Poppler:
```
sudo apt install libreoffice poppler-utils
```

3. Install required Python packages:
```
pip3 install opencv-python numpy pymupdf pillow mediapipe python-pptx pdf2image
```

4. Modify the code to use the Linux path for LibreOffice:
```python
# Change line ~403 in gesture_processor.py from:
'C:\\Program Files\\LibreOffice\\program\\soffice.exe'
# To:
'libreoffice'
```

## Usage
1. Upload a PDF file through the web interface
2. Allow camera access when prompted
3. Use hand gestures to control the presentation:
   - Show two fingers + thumb for next slide
   - Show one finger + thumb for previous slide
   - Use two fingers for drawing mode
   - Use one finger for pointer mode
   - Show palm to clear drawings

## Project Structure
```
gesturepdf/
├── app.py              # Main application file
├── static/            # Static files (CSS, JS)
├── templates/         # HTML templates
├── gesture_detector/  # Gesture recognition module
├── pdf_processor/     # PDF handling module
└── requirements.txt   # Project dependencies
```

## Performance Optimization
- Frame rate limiting to 30 FPS
- Position smoothing for stable gesture detection
- Efficient WebSocket communication
- Optimized drawing canvas updates

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- MediaPipe Hands for gesture recognition
- Flask for web framework
- OpenCV for image processing
- PyMuPDF for PDF handling

## Contact
For any queries or support, please contact:
- Email: chaitanyapotti0@gmail.com
- GitHub: chaitanya-699

## Future Enhancements
- Multi-user collaboration
- Cloud storage integration
- Mobile device support
- AI-enhanced gesture recognition
- Analytics dashboard
- Voice command integration


## Troubleshooting

- If you encounter issues with pdf2image on Windows, ensure Poppler is properly installed and its bin directory is in your PATH
- For Linux users, if LibreOffice command fails, try using the full path: `/usr/bin/libreoffice`
- Webcam access may require permissions on both operating systems 
