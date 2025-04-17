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

## Installation

### Prerequisites
- Python 3.8 or higher
- Webcam
- Modern web browser (Chrome recommended)

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
- Email: your.email@example.com
- GitHub: [your-github-username]

## Future Enhancements
- Multi-user collaboration
- Cloud storage integration
- Mobile device support
- AI-enhanced gesture recognition
- Analytics dashboard
- Voice command integration


## Screenshots
[Add screenshots of your application here]

## Demo Video
[Add link to demo video here] 