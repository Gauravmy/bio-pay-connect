
from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import mediapipe as mp
import os
import time
import base64
import numpy as np
import uuid
import json
from datetime import datetime, timedelta
import jwt
import bcrypt

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Initialize MediaPipe Hands module
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)
mp_draw = mp.solutions.drawing_utils

# Secret key for JWT
SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'your-secret-key-for-development')

# Mock database for development
user_db = {}
tokens_db = {}
rate_limit_db = {}  # For rate limiting

# Middleware for rate limiting
def check_rate_limit(ip_address, max_requests=10, window_seconds=60):
    now = time.time()
    
    # Initialize or get the request history for this IP
    if ip_address not in rate_limit_db:
        rate_limit_db[ip_address] = []
    
    # Clean up old requests
    rate_limit_db[ip_address] = [timestamp for timestamp in rate_limit_db[ip_address] 
                                if timestamp > now - window_seconds]
    
    # Check if the IP has exceeded the rate limit
    if len(rate_limit_db[ip_address]) >= max_requests:
        return False
    
    # Record this request
    rate_limit_db[ip_address].append(now)
    return True

# Process the palm vein image for authentication
def process_palm_image(image_data):
    # Decode base64 image
    encoded_data = image_data.split(',')[1] if ',' in image_data else image_data
    nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    # Convert to RGB (MediaPipe uses RGB)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Process the image with MediaPipe
    results = hands.process(img_rgb)
    
    # Check if hands were detected
    if results.multi_hand_landmarks:
        # Extract features (in a real system, this would be more sophisticated)
        # Here we'll just create a simple "hash" from the coordinates
        hash_data = []
        for hand_landmarks in results.multi_hand_landmarks:
            for landmark in hand_landmarks.landmark:
                hash_data.append(f"{landmark.x:.4f}{landmark.y:.4f}{landmark.z:.4f}")
        
        # Create a simple hash (in production, use stronger algorithms)
        palm_hash = bcrypt.hashpw(''.join(hash_data).encode(), bcrypt.gensalt()).decode()
        return True, palm_hash
    else:
        return False, None

# Create JWT tokens
def generate_tokens(user_id):
    # Access token (short-lived)
    access_token_exp = datetime.utcnow() + timedelta(minutes=15)
    access_token = jwt.encode(
        {'user_id': user_id, 'exp': access_token_exp},
        SECRET_KEY,
        algorithm='HS256'
    )
    
    # Refresh token (long-lived)
    refresh_token_exp = datetime.utcnow() + timedelta(days=7)
    refresh_token = jwt.encode(
        {'user_id': user_id, 'exp': refresh_token_exp, 'type': 'refresh'},
        SECRET_KEY,
        algorithm='HS256'
    )
    
    # Store the refresh token
    if user_id not in tokens_db:
        tokens_db[user_id] = []
    tokens_db[user_id].append(refresh_token)
    
    return access_token, refresh_token

# API route for biometric registration
@app.route('/api/biometric/register', methods=['POST'])
def register_biometrics():
    # Check rate limiting
    ip = request.remote_addr
    if not check_rate_limit(ip):
        return jsonify({
            'success': False,
            'message': 'Rate limit exceeded. Please try again later.'
        }), 429
    
    try:
        data = request.json
        image_data = data.get('imageData')
        user_id = data.get('userId', str(uuid.uuid4()))
        
        if not image_data:
            return jsonify({
                'success': False,
                'message': 'No image data provided'
            }), 400
        
        # Process the palm vein image
        success, biometric_hash = process_palm_image(image_data)
        
        if not success:
            return jsonify({
                'success': False,
                'message': 'No hand detected in the image'
            }), 400
        
        # Store the biometric hash (never store raw biometric data)
        user_db[user_id] = {
            'biometric_hash': biometric_hash,
            'created_at': time.time()
        }
        
        # Generate tokens
        access_token, refresh_token = generate_tokens(user_id)
        
        return jsonify({
            'success': True,
            'userId': user_id,
            'message': 'Biometric data registered successfully',
            'token': access_token,
            'refreshToken': refresh_token
        })
    except Exception as e:
        app.logger.error(f"Error in registration: {str(e)}")
        return jsonify({
            'success': False,
            'message': f'Server error: {str(e)}'
        }), 500

# API route for biometric authentication
@app.route('/api/biometric/authenticate', methods=['POST'])
def authenticate():
    # Check rate limiting
    ip = request.remote_addr
    if not check_rate_limit(ip):
        return jsonify({
            'success': False,
            'message': 'Rate limit exceeded. Please try again later.'
        }), 429
    
    try:
        data = request.json
        image_data = data.get('imageData')
        user_id = data.get('userId')
        scan_type = data.get('scanType', 'palm-vein')
        
        # For testing without a camera
        if not image_data:
            # Simulate authentication for demo
            success = (time.time() % 10) < 9  # 90% success rate
            
            if success:
                # Generate a new user ID if not provided
                if not user_id:
                    user_id = str(uuid.uuid4())
                    user_db[user_id] = {
                        'biometric_hash': 'simulated-hash',
                        'created_at': time.time()
                    }
                
                # Generate tokens
                access_token, refresh_token = generate_tokens(user_id)
                
                return jsonify({
                    'success': True,
                    'message': 'Authentication successful (simulated)',
                    'token': access_token,
                    'refreshToken': refresh_token,
                    'userId': user_id
                })
            else:
                return jsonify({
                    'success': False,
                    'message': 'Authentication failed (simulated)'
                }), 401
        
        # Real biometric authentication with image data
        success, palm_hash = process_palm_image(image_data)
        
        if not success:
            return jsonify({
                'success': False,
                'message': 'No hand detected in the image'
            }), 400
        
        # In a real implementation, we would compare the hash with stored hashes
        # Here we're just registering a new user if the ID doesn't exist
        if user_id and user_id in user_db:
            # In reality, we would use a proper comparison method here
            # This is simplified for the demo
            auth_success = True  # Simulated match
        else:
            # Create a new user if user_id is not provided
            user_id = str(uuid.uuid4())
            user_db[user_id] = {
                'biometric_hash': palm_hash,
                'created_at': time.time()
            }
            auth_success = True
        
        if auth_success:
            # Generate tokens
            access_token, refresh_token = generate_tokens(user_id)
            
            return jsonify({
                'success': True,
                'message': 'Authentication successful',
                'token': access_token,
                'refreshToken': refresh_token,
                'userId': user_id
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Authentication failed'
            }), 401
    except Exception as e:
        app.logger.error(f"Error in authentication: {str(e)}")
        return jsonify({
            'success': False,
            'message': f'Server error: {str(e)}'
        }), 500

# API route for refreshing tokens
@app.route('/api/biometric/refresh-token', methods=['POST'])
def refresh_token():
    # Check rate limiting
    ip = request.remote_addr
    if not check_rate_limit(ip):
        return jsonify({
            'success': False,
            'message': 'Rate limit exceeded. Please try again later.'
        }), 429
    
    try:
        data = request.json
        refresh_token = data.get('refreshToken')
        
        if not refresh_token:
            return jsonify({
                'success': False,
                'message': 'Refresh token is required'
            }), 400
        
        # Verify the refresh token
        try:
            payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=['HS256'])
            user_id = payload['user_id']
            
            # Check if the token is in our database
            if user_id not in tokens_db or refresh_token not in tokens_db[user_id]:
                raise Exception("Invalid refresh token")
            
            # Generate new tokens
            access_token, new_refresh_token = generate_tokens(user_id)
            
            # Remove the old refresh token
            tokens_db[user_id].remove(refresh_token)
            
            return jsonify({
                'success': True,
                'token': access_token,
                'refreshToken': new_refresh_token
            })
        except Exception as e:
            return jsonify({
                'success': False,
                'message': f'Invalid refresh token: {str(e)}'
            }), 401
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Server error: {str(e)}'
        }), 500

# API route for user logout
@app.route('/api/biometric/logout', methods=['POST'])
def logout():
    try:
        data = request.json
        user_id = data.get('userId')
        refresh_token = data.get('refreshToken')
        
        if user_id and user_id in tokens_db:
            if refresh_token:
                # Remove specific refresh token
                if refresh_token in tokens_db[user_id]:
                    tokens_db[user_id].remove(refresh_token)
            else:
                # Remove all tokens for this user
                tokens_db[user_id] = []
        
        return jsonify({
            'success': True,
            'message': 'Logged out successfully'
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Server error: {str(e)}'
        }), 500

# API route for health check
@app.route('/api/biometric/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'online',
        'service': 'palm-vein-authentication',
        'timestamp': time.time()
    })

if __name__ == '__main__':
    # Get port from environment variable or use 5000 as default
    port = int(os.environ.get('PORT', 5000))
    
    # In production, use a proper WSGI server like gunicorn
    # For development, use Flask's built-in server with debug mode
    app.run(host='0.0.0.0', port=port, debug=os.environ.get('FLASK_DEBUG', 'False').lower() == 'true')
