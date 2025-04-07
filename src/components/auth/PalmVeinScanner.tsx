
import React, { useState, useEffect } from 'react';
import { Check, AlertCircle, HandMetal } from 'lucide-react';

interface PalmVeinScannerProps {
  onScanComplete: (success: boolean) => void;
  className?: string;
}

const PalmVeinScanner: React.FC<PalmVeinScannerProps> = ({ onScanComplete, className }) => {
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanStatus, setStatus] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');
  
  // For demo, we'll simulate a random success rate
  const simulateScan = () => {
    // Reset states
    setScanProgress(0);
    setStatus('scanning');
    
    // Simulate scanning process with progress
    const scanInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 120);
    
    // After ~2.4s, decide success or failure (90% success rate for demo)
    setTimeout(() => {
      const success = Math.random() < 0.9;
      setStatus(success ? 'success' : 'failed');
      clearInterval(scanInterval);
      setScanProgress(100);
      
      // Report result to parent
      setTimeout(() => onScanComplete(success), 1000);
    }, 2400);
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
              <p className="text-sm font-medium text-cyan-300">Place palm to scan</p>
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
        <p className="text-xs text-gray-400 mt-2 italic">Tap to simulate palm scan</p>
      )}
    </div>
  );
};

export default PalmVeinScanner;
