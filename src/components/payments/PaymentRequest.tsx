
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchIcon, Fingerprint, ArrowRight } from 'lucide-react';
import FingerPrintScanner from '../auth/FingerPrintScanner';
import { toast } from 'sonner';

const formSchema = z.object({
  amount: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, {
    message: "Please enter a valid amount greater than 0",
  }),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface PaymentRequestProps {
  onCreatePaymentRequest: (values: FormValues) => void;
  onPaymentComplete?: (success: boolean) => void;
  isMerchant?: boolean;
}

const PaymentRequest: React.FC<PaymentRequestProps> = ({ 
  onCreatePaymentRequest,
  onPaymentComplete,
  isMerchant = true
}) => {
  const [stage, setStage] = useState<'form' | 'scanner' | 'complete'>('form');
  const [paymentDetails, setPaymentDetails] = useState<FormValues | null>(null);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      description: "",
    },
  });

  const handleFormSubmit = (values: FormValues) => {
    setPaymentDetails(values);
    onCreatePaymentRequest(values);
    
    // If merchant, move to scanner stage
    if (isMerchant) {
      setStage('scanner');
    } else {
      // If customer, can directly complete the flow
      setStage('complete');
      if (onPaymentComplete) {
        updateTransactionData(values, true);
      }
    }
  };

  const handleScanComplete = (success: boolean) => {
    setStage('complete');
    if (paymentDetails && success) {
      updateTransactionData(paymentDetails, success);
    }
    if (onPaymentComplete) {
      onPaymentComplete(success);
    }
  };

  // Function to update transaction data in session storage
  const updateTransactionData = (values: FormValues, success: boolean) => {
    setIsUpdatingData(true);
    try {
      // Get existing transactions or initialize empty array
      const existingTransactionsString = sessionStorage.getItem('transactions');
      const existingTransactions = existingTransactionsString 
        ? JSON.parse(existingTransactionsString) 
        : [];
      
      // Create new transaction
      const newTransaction = {
        id: `txn-${Date.now()}`,
        amount: parseFloat(values.amount),
        description: values.description || "Payment",
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        type: isMerchant ? 'incoming' : 'outgoing',
        status: success ? 'completed' : 'failed',
        merchant: isMerchant ? "Your Business" : "Merchant",
      };
      
      // Add to transactions array
      const updatedTransactions = [newTransaction, ...existingTransactions];
      
      // Save back to session storage
      sessionStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      
      // Update user balance in session storage
      const userDataString = sessionStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const currentBalance = userData.balance || 10000; // Default starting balance
        
        // Update balance based on transaction type
        const newBalance = isMerchant 
          ? currentBalance + parseFloat(values.amount) 
          : currentBalance - parseFloat(values.amount);
        
        // Save updated user data
        userData.balance = newBalance;
        sessionStorage.setItem('userData', JSON.stringify(userData));
      }
      
      toast.success('Transaction data updated successfully');
    } catch (error) {
      console.error('Error updating transaction data:', error);
      toast.error('Failed to update transaction data');
    } finally {
      setIsUpdatingData(false);
    }
  };

  // Add a pulsing 3D effect to the transaction completed section
  const [pulseScale, setPulseScale] = useState(1);
  
  useEffect(() => {
    if (stage === 'complete') {
      const interval = setInterval(() => {
        setPulseScale(prev => prev === 1 ? 1.05 : 1);
      }, 1500);
      
      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle>
          {stage === 'form' 
            ? (isMerchant ? "Request Payment" : "Send Payment") 
            : stage === 'scanner' 
              ? "Customer Authentication" 
              : "Payment Complete"
          }
        </CardTitle>
        <CardDescription>
          {stage === 'form' 
            ? (isMerchant ? "Create a new payment request" : "Send money to a merchant") 
            : stage === 'scanner' 
              ? "Ask customer to scan their fingerprint" 
              : "Transaction has been processed"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {stage === 'form' && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (₹)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter amount" 
                        {...field} 
                        type="number" 
                        min="1" 
                        step="0.01"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {isMerchant && (
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="What is this payment for?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {!isMerchant && (
                <div className="space-y-3">
                  <FormLabel>Merchant</FormLabel>
                  <div className="flex w-full items-center space-x-2">
                    <Input placeholder="Search merchant" />
                    <Button type="button" size="icon" variant="ghost">
                      <SearchIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              <Button type="submit" className="w-full">
                {isMerchant ? "Generate Payment Request" : "Continue to Pay"}
              </Button>
            </form>
          </Form>
        )}
        
        {stage === 'scanner' && (
          <div className="text-center space-y-6 py-4">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10">
              <Fingerprint className="h-10 w-10 text-primary" />
            </div>
            
            <div className="space-y-2">
              <p className="font-medium">
                Ready to receive payment of ₹{paymentDetails?.amount}
              </p>
              <p className="text-sm text-muted-foreground">
                Ask customer to scan their fingerprint to authorize payment
              </p>
            </div>
            
            <FingerPrintScanner 
              onScanComplete={handleScanComplete} 
              className="py-6"
            />
          </div>
        )}
        
        {stage === 'complete' && (
          <div className="text-center space-y-6 py-6">
            <div 
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 mb-4 relative"
              style={{ 
                transform: `scale(${pulseScale})`,
                transition: 'transform 0.7s ease-in-out'
              }}
            >
              {/* 3D effect with layered circles */}
              <div className="absolute inset-0 rounded-full bg-green-200/50 transform -translate-z-1"></div>
              <div className="absolute inset-0 rounded-full border-2 border-green-300/30 animate-ping"></div>
              
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-2xl font-medium">Payment Successful!</h3>
              <p className="text-muted-foreground">
                {isMerchant 
                  ? `You received ₹${paymentDetails?.amount}`
                  : `You sent ₹${paymentDetails?.amount}`
                }
              </p>
              
              {/* Show loading state while updating data */}
              {isUpdatingData && (
                <p className="text-xs text-cyan-400 animate-pulse mt-2">
                  Updating your account data...
                </p>
              )}
            </div>
            
            <Button 
              onClick={() => setStage('form')} 
              className="mt-4"
            >
              {isMerchant ? "Create New Request" : "Make Another Payment"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentRequest;
