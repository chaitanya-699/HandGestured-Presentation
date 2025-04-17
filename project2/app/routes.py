from flask import render_template
from app import app, socketio, gesture_processor
from flask import request, jsonify
from flask_socketio import emit

@app.route('/')
def index():
    return render_template('index.html');

@app.route('/upload-ppt', methods=['POST'])
def upload_pptx():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
        
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
        
    if not file.filename.endswith('.pptx'):
        return jsonify({'error': 'File must be a pptx'}), 400
        
    pptx_data = file.read()
    success = gesture_processor.load_ppt(pptx_data)
    
    if success:
        return jsonify({'message': 'pptx loaded successfully'})
    else:
        return jsonify({'error': 'Failed to load pptx from server'}), 500
@socketio.on('process_frame')
def handle_frame(frame_data):
    try:
        result = gesture_processor.process_frame(frame_data)
        if result:
            emit('processed_frame', result)
    except Exception as e:
        print(f"Error in handle_frame: {str(e)}")
        emit('error', {'message': 'Error processing frame'})
