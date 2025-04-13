
/**
 * Utility functions for biometric authentication
 * This serves as a bridge between the frontend and a backend
 * running OpenCV for palm vein recognition
 */

// Types
interface BiometricAuthResponse {
  success: boolean;
  message: string;
  token?: string;
  userId?: string;
}

interface BiometricScanOptions {
  endpoint?: string;
  scanType: 'palm-vein' | 'fingerprint';
  userId?: string;
  transactionData?: {
    amount: number;
    merchantId: string;
    description?: string;
  };
}

/**
 * Authenticate a user with biometric data
 * Connects to a backend service running OpenCV for palm vein scanning
 */
export async function authenticateWithBiometrics(
  options: BiometricScanOptions,
  imageData?: string // Base64 encoded image data when available
): Promise<BiometricAuthResponse> {
  const { endpoint, scanType, userId, transactionData } = options;
  
  // Check if we have a real backend to connect to
  if (!endpoint) {
    console.log('No backend endpoint provided, using simulation mode');
    // Simulate successful authentication after a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response - in a real implementation this would come from the backend
    return {
      success: true,
      message: 'Authentication successful (simulated)',
      token: 'mock-jwt-token-' + Math.random().toString(36).substring(2),
      userId: userId || 'user-' + Math.random().toString(36).substring(2)
    };
  }
  
  try {
    console.log(`Connecting to biometric authentication backend at ${endpoint}`);
    console.log(`Using scan type: ${scanType}`);
    
    // Prepare the request payload
    const payload: Record<string, any> = {
      scanType,
      userId: userId || undefined,
    };
    
    // Add transaction data if available
    if (transactionData) {
      payload.transactionData = transactionData;
    }
    
    // Add image data if available (for real palm vein scanning)
    if (imageData) {
      payload.imageData = imageData;
    }
    
    // Make the API request to the backend
    const response = await fetch(`${endpoint}/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during biometric authentication:', error);
    return {
      success: false,
      message: 'Error during biometric authentication'
    };
  }
}

/**
 * Check if the biometric scanning backend is available
 */
export async function checkBackendAvailability(endpoint?: string): Promise<boolean> {
  if (!endpoint) {
    return false;
  }
  
  try {
    // Try to connect to the health check endpoint
    const response = await fetch(`${endpoint}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.ok;
  } catch (error) {
    console.error('Backend not available:', error);
    return false;
  }
}

/**
 * Helper function to store authentication tokens securely
 * In a production environment, this should use secure storage mechanisms
 */
export function storeAuthToken(token: string): void {
  // In a real implementation, consider using more secure storage options
  localStorage.setItem('authToken', token);
}

/**
 * Helper function to get the stored authentication token
 */
export function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}

/**
 * Helper function to clear the stored authentication token (logout)
 */
export function clearAuthToken(): void {
  localStorage.removeItem('authToken');
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

/**
 * Calculate a hash of biometric data
 * This is a placeholder for a real hashing function
 * In a real implementation, this would be done on the backend
 */
export function hashBiometricData(data: any): string {
  // This is just for demonstration - in a real implementation,
  // raw biometric data should never be processed directly in the browser
  // and hashing should be done server-side
  return 'biometric-hash-' + Math.random().toString(36).substring(2);
}

/**
 * Utility to check if the device has camera access
 * This is needed for palm vein scanning to work
 */
export async function checkCameraAccess(): Promise<boolean> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    // Stop the stream immediately after checking
    stream.getTracks().forEach(track => track.stop());
    return true;
  } catch (error) {
    console.error('Camera access denied:', error);
    return false;
  }
}
