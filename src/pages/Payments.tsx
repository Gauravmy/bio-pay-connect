
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PaymentRequest from '@/components/payments/PaymentRequest';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ReceiptIndianRupee, Download } from 'lucide-react';

const Payments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"pay" | "request">("pay");
  const [note, setNote] = useState<string>("");
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentRecipient, setPaymentRecipient] = useState<string>("");
  const [showReceiptOption, setShowReceiptOption] = useState(false);
  const [lastTransactionId, setLastTransactionId] = useState<string | number | null>(null);
  
  // Check if the URL has a request parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('request') === 'true') {
      setActiveTab("request");
    }
  }, [location.search]);
  
  const handleCreatePaymentRequest = (values: any) => {
    console.log('Payment request created:', values);
    setPaymentAmount(values.amount || 100);
    setPaymentRecipient(values.recipient || "Demo Recipient");
  };
  
  const updateTransactionData = (amount: number, recipient: string) => {
    try {
      // Get current user data
      const userData = sessionStorage.getItem('user');
      if (!userData) return;
      
      const user = JSON.parse(userData);
      
      // Get or initialize transaction history
      let transactions = [];
      const storedTransactions = sessionStorage.getItem('transactions');
      if (storedTransactions) {
        transactions = JSON.parse(storedTransactions);
      }
      
      // Add the new transaction
      const transactionId = Date.now();
      const newTransaction = {
        id: transactionId,
        amount: amount,
        recipient: recipient,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        status: 'completed',
        type: activeTab === 'pay' ? 'outgoing' : 'incoming',
        note: note || 'No description provided'
      };
      
      transactions.unshift(newTransaction);
      
      // Update session storage
      sessionStorage.setItem('transactions', JSON.stringify(transactions));
      console.log('Transaction data updated:', newTransaction);
      
      // Trigger storage event for other components to listen
      window.dispatchEvent(new Event('storage'));
      
      // Set the transaction ID for receipt download
      setLastTransactionId(transactionId);
      setShowReceiptOption(true);
      
      return transactionId;
    } catch (error) {
      console.error('Error updating transaction data:', error);
      return null;
    }
  };
  
  const handlePaymentComplete = (success: boolean, data?: { amount: number, recipient: string }) => {
    if (success) {
      toast.success('Payment completed successfully!');
      
      // Update transaction data and balance
      if (data?.amount && data?.recipient) {
        const transactionId = updateTransactionData(data.amount, data.recipient);
        if (transactionId) {
          setLastTransactionId(transactionId);
        }
      }
      
      // After successful payment, display transaction confirmation with 3D effect
      const element = document.createElement('div');
      element.className = 'fixed inset-0 flex items-center justify-center z-50 pointer-events-none';
      element.innerHTML = `
        <div class="bg-gradient-to-r from-cyan-500/20 to-blue-500/10 p-8 rounded-xl text-white text-center transform transition-all duration-1000 animate-fade-in backdrop-blur-xl border border-white/10">
          <div class="text-6xl mb-4">💫</div>
          <div class="text-2xl font-bold text-white mb-2">Transaction Successful!</div>
          <div class="text-white/70">Your account has been updated</div>
        </div>
      `;
      
      document.body.appendChild(element);
      
      // Remove the element after animation
      setTimeout(() => {
        element.classList.add('opacity-0');
        setTimeout(() => {
          document.body.removeChild(element);
        }, 1000);
      }, 2000);
      
      // Show receipt download option
      setShowReceiptOption(true);
      
      // Navigate to dashboard after a delay to see the updated transaction
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } else {
      toast.error('Payment failed. Please try again.');
      setShowReceiptOption(false);
    }
  };

  // Function to download transaction receipt
  const downloadReceipt = () => {
    if (!lastTransactionId) return;
    
    // Fetch the transactions from session storage
    const storedTransactions = sessionStorage.getItem('transactions');
    if (!storedTransactions) return;
    
    const transactions = JSON.parse(storedTransactions);
    const transaction = transactions.find((tx: any) => tx.id === lastTransactionId);
    
    if (!transaction) return;
    
    // Create the receipt content
    const receiptContent = `
      ======== TRANSACTION RECEIPT ========
      
      Bio Pay
      
      Date: ${transaction.date}
      Time: ${transaction.time || 'N/A'}
      
      Transaction ID: ${transaction.id}
      
      ${transaction.type === 'incoming' ? 'From' : 'To'}: ${transaction.type === 'incoming' ? transaction.sender : transaction.recipient}
      
      Amount: ₹${transaction.amount.toFixed(2)}
      
      Status: ${transaction.status}
      
      Note: ${transaction.note || 'No description provided'}
      
      ===================================
      
      Thank you for using Bio Pay!
    `;
    
    // Create a Blob from the receipt content
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${transaction.id}.txt`;
    
    // Trigger the download
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success message
    toast.success('Receipt downloaded successfully!');
  };
  
  const handlePaymentRequest = (values: any) => {
    setPaymentAmount(values.amount || 0);
    setPaymentRecipient(values.recipient || "Demo Recipient");
    handleCreatePaymentRequest(values);
  };
  
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground mt-1">
            Make payments or request money securely using fingerprint authentication.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "pay" | "request")} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="pay">Pay</TabsTrigger>
            <TabsTrigger value="request">Request</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pay" className="mt-6">
            <div className="mb-4">
              <label htmlFor="note" className="block text-sm font-medium mb-1">Add a note (optional)</label>
              <Textarea 
                id="note" 
                placeholder="What's this payment for?" 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full max-w-md mx-auto"
              />
            </div>
            <PaymentRequest 
              onCreatePaymentRequest={handlePaymentRequest}
              onPaymentComplete={(success) => handlePaymentComplete(success, {
                amount: paymentAmount, 
                recipient: paymentRecipient
              })}
              isMerchant={false}
            />
            
            {showReceiptOption && (
              <div className="w-full max-w-md mx-auto mt-6 text-center">
                <Button onClick={downloadReceipt} className="gap-2">
                  <ReceiptIndianRupee className="h-4 w-4" />
                  Download Receipt
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="request" className="mt-6">
            <div className="mb-4">
              <label htmlFor="requestNote" className="block text-sm font-medium mb-1">Add a note (optional)</label>
              <Textarea 
                id="requestNote" 
                placeholder="What's this request for?" 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full max-w-md mx-auto"
              />
            </div>
            <PaymentRequest 
              onCreatePaymentRequest={handlePaymentRequest}
              onPaymentComplete={(success) => handlePaymentComplete(success, {
                amount: paymentAmount,
                recipient: paymentRecipient
              })}
              isMerchant={true}
            />
            
            {showReceiptOption && (
              <div className="w-full max-w-md mx-auto mt-6 text-center">
                <Button onClick={downloadReceipt} className="gap-2">
                  <ReceiptIndianRupee className="h-4 w-4" />
                  Download Receipt
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Payments;
