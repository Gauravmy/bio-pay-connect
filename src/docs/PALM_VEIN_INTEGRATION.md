
# Palm Vein Integration Guide

This document explains how to integrate the OpenCV-based palm vein scanning Python code with the React frontend.

## Architecture Overview

1. The React frontend provides the user interface for palm vein scanning
2. A Flask backend server runs the Python OpenCV code for palm vein recognition
3. The frontend communicates with the backend through REST APIs

## Setup Instructions

### Backend Server Setup

1. Navigate to the `src/docs/palmvein_backend` directory
2. Set up a Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy .env.example to .env and configure your settings:
   ```bash
   cp .env.example .env
   ```
5. Run the Flask server:
   ```bash
   python app.py
   ```

The backend server will be available at `http://localhost:5000`.

### Frontend Configuration

1. Set the environment variable `VITE_PALM_VEIN_API_ENDPOINT` to point to your backend server:
   - For local development: `http://localhost:5000/api/biometric`
   - For production: Your secure API endpoint URL

```bash
# For local development
export VITE_PALM_VEIN_API_ENDPOINT=http://localhost:5000/api/biometric
```

### Integration Details

1. The PalmVeinScanner component will check if the backend is available
2. If available, it will connect to the real backend for palm vein scanning
3. If not available, it will fall back to simulation mode

## API Endpoints

### Health Check
- **URL:** `/api/biometric/health`
- **Method:** `GET`
- **Use:** Checks if the backend is online

### Register with Biometrics
- **URL:** `/api/biometric/register`
- **Method:** `POST`
- **Use:** Registers a new user with their palm vein pattern

### Authenticate with Biometrics
- **URL:** `/api/biometric/authenticate`
- **Method:** `POST`
- **Use:** Authenticates a user based on their palm vein pattern

### Refresh Token
- **URL:** `/api/biometric/refresh-token`
- **Method:** `POST`
- **Use:** Generates a new access token using a valid refresh token

### Logout
- **URL:** `/api/biometric/logout`
- **Method:** `POST`
- **Use:** Invalidates the user's refresh tokens

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
