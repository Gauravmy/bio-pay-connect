
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import FingerPrintScanner from '@/components/auth/FingerPrintScanner';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';

type ScanStatus = 'idle' | 'scanning' | 'success' | 'failed';

interface TransactionInfo {
  id: string;
  amount: number;
  merchant: string;
  date: string;
}

const FingerprintScan = () => {
  const navigate = useNavigate();
  const [scanStatus, setScanStatus] = useState<ScanStatus>('idle');
  const [transactionInfo, setTransactionInfo] = useState<TransactionInfo | null>(null);
  
  // Generate a random transaction ID
  const generateTransactionId = () => {
    return 'TX' + Math.random().toString(36).substring(2, 10).toUpperCase();
  };
  
  // Create dummy transaction data
  const createDummyTransaction = () => {
    const merchants = ['Coffee Shop', 'Grocery Store', 'Electronics Store', 'Restaurant', 'Gas Station'];
    const amounts = [12.99, 45.67, 123.45, 8.50, 35.00];
    
    return {
      id: generateTransactionId(),
      amount: amounts[Math.floor(Math.random() * amounts.length)],
      merchant: merchants[Math.floor(Math.random() * merchants.length)],
      date: new Date().toLocaleString(),
    };
  };
  
  const handleScanComplete = (success: boolean) => {
    if (success) {
      setScanStatus('success');
      const transaction = createDummyTransaction();
      setTransactionInfo(transaction);
      
      toast.success('Payment authorized successfully!', {
        description: `₹${transaction.amount.toFixed(2)} paid to ${transaction.merchant}`
      });
      
      // For demo purposes, automatically redirect after successful scan
      setTimeout(() => {
        navigate('/dashboard');
      }, 5000);
    } else {
      setScanStatus('failed');
      toast.error('Authentication failed', {
        description: 'Please try scanning your fingerprint again'
      });
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/30 p-4 relative overflow-hidden">
      {/* Background network grid with animation */}
      <div className="absolute inset-0 bg-network-grid bg-[length:50px_50px] opacity-20"></div>
      
      {/* Animated orbs in background */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="w-full max-w-md relative z-10">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-8 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <Card className="bg-card/80 backdrop-blur-xl border border-cyan-800/30 shadow-lg rounded-xl p-8 relative overflow-hidden">
          {/* Scanline effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl">
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent absolute animate-[scan_4s_linear_infinite]"></div>
          </div>
          
          {/* Enhanced holographic corner accents */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg"></div>
          
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-white">Biometric Payment</h2>
            <p className="text-white/60 text-sm">
              {scanStatus === 'idle' && 'Place your finger on the scanner to authorize payment'}
              {scanStatus === 'scanning' && 'Scanning fingerprint...'}
              {scanStatus === 'success' && 'Payment successful!'}
              {scanStatus === 'failed' && 'Authentication failed. Please try again.'}
            </p>
          </div>
          
          {scanStatus === 'success' && transactionInfo ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-500/20 p-3">
                  <CheckCircle size={60} className="text-green-500" />
                </div>
              </div>
              <div className="space-y-4 text-center">
                <h3 className="text-xl font-bold text-white">Transaction Approved</h3>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10 space-y-2">
                  <div className="grid grid-cols-2 gap-1">
                    <p className="text-white/60 text-left">Transaction ID:</p>
                    <p className="text-white text-right font-mono font-medium">{transactionInfo.id}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <p className="text-white/60 text-left">Amount:</p>
                    <p className="text-white text-right font-mono font-medium">₹{transactionInfo.amount.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <p className="text-white/60 text-left">Merchant:</p>
                    <p className="text-white text-right">{transactionInfo.merchant}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <p className="text-white/60 text-left">Date:</p>
                    <p className="text-white text-right">{transactionInfo.date}</p>
                  </div>
                </div>
                
                <p className="text-sm text-white/60">
                  Redirecting to dashboard in a few seconds...
                </p>
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          ) : scanStatus === 'failed' ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="rounded-full bg-red-500/20 p-3">
                  <XCircle size={60} className="text-red-500" />
                </div>
              </div>
              <div className="space-y-4 text-center">
                <h3 className="text-xl font-bold text-white">Authentication Failed</h3>
                <p className="text-white/60">
                  Your fingerprint could not be verified. Please try again or use an alternative payment method.
                </p>
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={() => setScanStatus('idle')}
                >
                  Try Again
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <FingerPrintScanner onScanComplete={handleScanComplete} className="my-4" />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default FingerprintScan;
