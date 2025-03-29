
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PaymentRequest from '@/components/payments/PaymentRequest';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Payments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"pay" | "request">("pay");
  
  // Check if the URL has a request parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('request') === 'true') {
      setActiveTab("request");
    }
  }, [location.search]);
  
  const handleCreatePaymentRequest = (values: any) => {
    console.log('Payment request created:', values);
  };
  
  const handlePaymentComplete = (success: boolean) => {
    if (success) {
      toast.success('Payment completed successfully!');
      
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
      
      // Navigate to dashboard after a delay to see the updated transaction
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } else {
      toast.error('Payment failed. Please try again.');
    }
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
            <PaymentRequest 
              onCreatePaymentRequest={handleCreatePaymentRequest}
              onPaymentComplete={handlePaymentComplete}
              isMerchant={false}
            />
          </TabsContent>
          
          <TabsContent value="request" className="mt-6">
            <PaymentRequest 
              onCreatePaymentRequest={handleCreatePaymentRequest}
              onPaymentComplete={handlePaymentComplete}
              isMerchant={true}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Payments;
