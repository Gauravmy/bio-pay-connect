
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Fingerprint } from 'lucide-react';
import RegisterForm from '@/components/auth/RegisterForm';
import { toast } from 'sonner';
import PageBackground from '@/components/layout/PageBackground';

const Register = () => {
  const navigate = useNavigate();
  
  const handleRegister = (data: any) => {
    console.log('Registration data:', data);
    // In a real app, we would save user data here
    toast.success('Registration successful!', {
      description: `Your ${data.userType === 'merchant' ? 'merchant' : 'customer'} account has been created.`,
    });
    
    // Save the user data in session storage for the demo
    sessionStorage.setItem('user', JSON.stringify({
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      userType: data.userType,
      fingerprint: data.fingerprint,
    }));
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };
  
  return (
    <PageBackground>
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        <div className="w-full max-w-md relative z-10">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-8 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30 group" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back
          </Button>
          
          <div className="bg-[#0A0E2E]/80 backdrop-blur-xl border border-cyan-800/30 shadow-lg rounded-xl p-8 relative">
            {/* Enhanced holographic corner accents */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg"></div>
            
            {/* Scanline effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl">
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent absolute animate-[scan_4s_linear_infinite]"></div>
            </div>
            
            {/* Registration header */}
            <div className="flex items-center mb-6">
              <div className="bg-cyan-400/20 p-2 rounded-lg mr-3">
                <Fingerprint className="h-6 w-6 text-cyan-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Create Your Account</h2>
            </div>
            
            <div className="mb-4 border-l-2 border-cyan-500/50 pl-3">
              <p className="text-sm text-white/70">
                For demonstration purposes, the OTP will be shown in the browser console. 
                In a production app, the OTP would be sent via real SMS to your mobile number.
              </p>
            </div>
            
            <RegisterForm onSubmit={handleRegister} />
          </div>
        </div>
      </div>
    </PageBackground>
  );
};

export default Register;
