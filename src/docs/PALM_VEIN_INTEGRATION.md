
# Palm Vein Integration Guide

This document explains how to integrate the OpenCV-based palm vein scanning Python code with the React frontend.

## Architecture Overview

1. The React frontend provides the user interface for palm vein scanning
2. A backend server runs the Python OpenCV code for palm vein recognition
3. The frontend communicates with the backend through REST APIs or WebSockets

## Setup Instructions

### Backend Server Setup

1. Create a Python Flask or FastAPI server to run the OpenCV palm vein scanning code
2. Expose an API endpoint for palm vein authentication

Example Flask implementation:

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import mediapipe as mp
import time
import base64
import numpy as np
import uuid

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Initialize MediaPipe Hands module
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)
mp_draw = mp.solutions.drawing_utils

# Mock database for demonstration
user_db = {}

@app.route('/api/biometric/register', methods=['POST'])
def register_biometrics():
    data = request.json
    user_id = data.get('userId', str(uuid.uuid4()))
    
    # In a real implementation, process the hand image from the request
    # and extract palm vein features for storage
    
    # Generate a mock biometric hash for demonstration
    biometric_hash = f"biometric-hash-{time.time()}"
    
    # Store the biometric hash (never store raw biometric data)
    user_db[user_id] = {
        'biometric_hash': biometric_hash,
        'created_at': time.time()
    }
    
    return jsonify({
        'success': True,
        'userId': user_id,
        'message': 'Biometric data registered successfully'
    })

@app.route('/api/biometric/authenticate', methods=['POST'])
def authenticate():
    data = request.json
    user_id = data.get('userId')
    
    # In a real implementation, process the hand image from the request
    # and verify against stored biometric hash
    
    # For demonstration, we'll simulate successful authentication 90% of the time
    if user_id in user_db or not user_id:
        success = (time.time() % 10) < 9  # 90% success rate
        
        if success:
            # Generate a mock JWT token
            token = f"mock-jwt-{time.time()}"
            
            return jsonify({
                'success': True,
                'message': 'Authentication successful',
                'token': token
            })
    
    return jsonify({
        'success': False,
        'message': 'Authentication failed'
    }), 401

@app.route('/api/biometric/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'online',
        'service': 'palm-vein-authentication'
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

### Frontend Configuration

1. Set the environment variable `VITE_PALM_VEIN_API_ENDPOINT` to point to your backend server:
   - For local development: `http://localhost:5000/api/biometric`
   - For production: Your secure API endpoint URL

### Integration Steps

1. The PalmVeinScanner component will check if the backend is available
2. If available, it will connect to the real backend for palm vein scanning
3. If not available, it will fall back to simulation mode

## Security Considerations

1. **Never store raw biometric data** - only store cryptographic representations
2. Always use HTTPS for API communication
3. Implement proper authentication and authorization
4. Add rate limiting to prevent brute force attacks
5. Implement proper error handling and logging

## Deploying to Production

1. Deploy the Python backend to a secure server with SSL
2. Set up proper monitoring and error logging
3. Implement proper security measures (firewalls, rate limiting, etc.)
4. Ensure compliance with local biometric data regulations (GDPR, etc.)

## Testing

You can test the integration by:

1. Starting the Python backend server
2. Setting the environment variable in your React app
3. Using the palm vein scanner in the React app
4. Checking the logs to verify communication between frontend and backend

## Troubleshooting

- Check camera permissions in the browser
- Verify the backend server is running and accessible
- Check network logs for API errors
- Verify CORS is properly configured on the backend
