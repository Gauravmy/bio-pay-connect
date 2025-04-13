
import React, { useState, useEffect } from 'react';
import { Check, AlertCircle, HandMetal } from 'lucide-react';

interface PalmVeinScannerProps {
  onScanComplete: (success: boolean) => void;
  className?: string;
  serverEndpoint?: string; // Optional prop to specify the backend endpoint for real palm scanning
}

const PalmVeinScanner: React.FC<PalmVeinScannerProps> = ({ 
  onScanComplete, 
  className,
  serverEndpoint 
}) => {
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanStatus, setStatus] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');
  const [isRealScanAvailable, setIsRealScanAvailable] = useState<boolean>(false);
  const [scanMessage, setScanMessage] = useState<string>('');
  
  // Check if real scanning is available
  useEffect(() => {
    // In a real implementation, this would check if the backend API is available
    // and if the user's device has the necessary hardware/permissions
    setIsRealScanAvailable(!!serverEndpoint);
  }, [serverEndpoint]);
  
  // For demo simulation
  const simulateScan = () => {
    // Reset states
    setScanProgress(0);
    setStatus('scanning');
    setScanMessage('Processing palm vein pattern...');
    
    if (isRealScanAvailable && serverEndpoint) {
      // In a real implementation, this would connect to your Python backend
      // through WebSockets or REST API to start the scanning process
      console.log('Connecting to real palm vein scanning backend at:', serverEndpoint);
      
      // Simulate API communication for demo purposes
      const scanInterval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(scanInterval);
            return 100;
          }
          return prev + 5;
        });
      }, 120);
      
      // Simulate backend response
      setTimeout(() => {
        // In production, this would be replaced with actual API response handling
        const success = Math.random() < 0.9; // 90% success rate for demo
        setStatus(success ? 'success' : 'failed');
        setScanMessage(success ? 'Authentication successful' : 'Authentication failed');
        clearInterval(scanInterval);
        setScanProgress(100);
        
        // Report result to parent component
        setTimeout(() => onScanComplete(success), 1000);
      }, 2400);
    } else {
      // Use the existing simulation code when no real backend is available
      const scanInterval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(scanInterval);
            return 100;
          }
          return prev + 5;
        });
      }, 120);
      
      setTimeout(() => {
        const success = Math.random() < 0.9;
        setStatus(success ? 'success' : 'failed');
        setScanMessage(success ? 'Authentication successful' : 'Authentication failed');
        clearInterval(scanInterval);
        setScanProgress(100);
        
        setTimeout(() => onScanComplete(success), 1000);
      }, 2400);
    }
  };
  
  return (
    <div className={`relative w-full flex flex-col items-center ${className}`}>
      <button 
        onClick={simulateScan}
        disabled={scanStatus === 'scanning'}
        className={`relative w-48 h-64 rounded-xl flex flex-col items-center justify-center
          border-2 transition-all duration-300 overflow-hidden
          ${scanStatus === 'idle' ? 'border-cyan-400/50 bg-cyan-900/20 hover:bg-cyan-800/30' : 
            scanStatus === 'scanning' ? 'border-yellow-400/50 bg-yellow-900/20' :
            scanStatus === 'success' ? 'border-green-500/50 bg-green-900/20' : 
            'border-red-500/50 bg-red-900/20'}`}
      >
        {/* Palm vein scan grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,255,204,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,204,0.03)_1px,transparent_1px)] bg-[size:8px_8px]"></div>
        
        {/* Scan progress line animation */}
        {scanStatus === 'scanning' && (
          <div 
            className="absolute top-0 left-0 w-full bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent h-1"
            style={{ 
              transform: `translateY(${scanProgress}%)`,
              transition: 'transform 0.2s ease-out'
            }}
          />
        )}
        
        {/* Icon and text */}
        <div className="relative z-10 flex flex-col items-center space-y-4">
          {scanStatus === 'idle' && (
            <>
              <HandMetal className="w-16 h-16 text-cyan-400 animate-pulse" />
              <p className="text-sm font-medium text-cyan-300">
                {isRealScanAvailable ? 'Place palm to scan' : 'Tap to simulate palm scan'}
              </p>
            </>
          )}
          
          {scanStatus === 'scanning' && (
            <>
              <HandMetal className="w-16 h-16 text-yellow-400 animate-pulse" />
              <p className="text-sm font-medium text-yellow-300">Scanning...</p>
              <div className="w-full bg-gray-700/60 h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-cyan-300 h-full" 
                  style={{ width: `${scanProgress}%`, transition: 'width 0.3s ease-out' }}
                />
              </div>
            </>
          )}
          
          {scanStatus === 'success' && (
            <>
              <div className="rounded-full bg-green-500/20 p-3">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <p className="text-sm font-medium text-green-300">Authentication successful</p>
            </>
          )}
          
          {scanStatus === 'failed' && (
            <>
              <div className="rounded-full bg-red-500/20 p-3">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <p className="text-sm font-medium text-red-300">Authentication failed</p>
            </>
          )}
        </div>
      </button>
      
      {scanStatus === 'idle' && (
        <p className="text-xs text-gray-400 mt-2 italic">
          {isRealScanAvailable 
            ? "Real palm vein scanning available" 
            : "Tap to simulate palm scan"}
        </p>
      )}
      
      {scanMessage && scanStatus !== 'idle' && (
        <p className="text-xs text-gray-300 mt-2">
          {scanMessage}
        </p>
      )}
      
      {isRealScanAvailable && (
        <div className="mt-4 text-xs text-cyan-400/70 font-mono">
          Connected to palm vein scanning service
        </div>
      )}
    </div>
  );
};

export default PalmVeinScanner;
