
# Palm Vein Authentication Backend

This Flask server provides a backend for palm vein biometric authentication using OpenCV and MediaPipe. It exposes REST API endpoints that the React frontend can use for authentication.

## Requirements

- Python 3.8+
- OpenCV
- MediaPipe
- Flask

## Setup Instructions

1. Clone this repository
2. Create a virtual environment (recommended)
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install the required packages
   ```bash
   pip install -r requirements.txt
   ```
4. Copy the .env.example file to .env and configure your settings
   ```bash
   cp .env.example .env
   ```
5. Run the Flask server
   ```bash
   python app.py
   ```

## API Endpoints

### Health Check
- **URL:** `/api/biometric/health`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "status": "online",
    "service": "palm-vein-authentication",
    "timestamp": 1650000000
  }
  ```

### Register with Biometrics
- **URL:** `/api/biometric/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "imageData": "base64-encoded-image-data",
    "userId": "optional-user-id"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "userId": "user123",
    "message": "Biometric data registered successfully",
    "token": "jwt-access-token",
    "refreshToken": "jwt-refresh-token"
  }
  ```

### Authenticate with Biometrics
- **URL:** `/api/biometric/authenticate`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "imageData": "base64-encoded-image-data",
    "userId": "optional-user-id",
    "scanType": "palm-vein"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Authentication successful",
    "token": "jwt-access-token",
    "refreshToken": "jwt-refresh-token",
    "userId": "user123"
  }
  ```

### Refresh Token
- **URL:** `/api/biometric/refresh-token`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "refreshToken": "jwt-refresh-token"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "token": "new-jwt-access-token",
    "refreshToken": "new-jwt-refresh-token"
  }
  ```

### Logout
- **URL:** `/api/biometric/logout`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "userId": "user123",
    "refreshToken": "optional-refresh-token"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

## Security Considerations

- The server never stores raw biometric data, only hashed representations
- Rate limiting is implemented to prevent brute force attacks
- JWT tokens are used for authentication
- In production, always run the server over HTTPS

## Integration with React Frontend

Set the `VITE_PALM_VEIN_API_ENDPOINT` environment variable in your React app:

```
VITE_PALM_VEIN_API_ENDPOINT=http://localhost:5000/api/biometric
```

This allows the frontend to connect to the backend for palm vein authentication.
