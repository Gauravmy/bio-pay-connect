
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
import { toast } from 'sonner';
import PageBackground from '@/components/layout/PageBackground';

const Login = () => {
  const navigate = useNavigate();
  
  const handleLogin = (data: { mobile: string, fingerprint: boolean }) => {
    console.log('Login data:', data);
    // In a real app, we would verify credentials here
    toast.success('Login successful!', {
      description: 'You are now logged in.',
    });
    
    // For demo purpose, set a default user type
    sessionStorage.setItem('user', JSON.stringify({
      name: 'Demo User',
      mobile: data.mobile,
      userType: 'merchant', // Default to merchant for demo
      fingerprint: data.fingerprint,
    }));
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };
  
  return (
    <PageBackground>
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        <div className="w-full max-w-md relative z-10">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-8 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="bg-[#0A0E2E]/80 backdrop-blur-xl border border-cyan-800/30 shadow-lg rounded-xl p-8">
            <div className="mb-4 border-l-2 border-cyan-500/50 pl-3">
              <p className="text-sm text-white/70">
                For demonstration purposes, the OTP will be shown in the browser console. 
                In a production app, the OTP would be sent via real SMS to your mobile number.
              </p>
            </div>
            <LoginForm onSubmit={handleLogin} />
          </div>
          
          {/* Decorative holographic strip */}
          <div className="absolute -top-1 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0"></div>
          <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0"></div>
        </div>
      </div>
    </PageBackground>
  );
};

export default Login;
