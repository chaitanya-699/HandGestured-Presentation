from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from app.gesture_processor import HandGestureProcessor


app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, 
    cors_allowed_origins="*",
    async_mode='threading',
    ping_timeout=10,
    ping_interval=5
)

# Initialize gesture processor
gesture_processor = HandGestureProcessor()
from app import routes
