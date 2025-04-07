
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import HolographicButton from '@/components/ui/HolographicButton';

interface HeroSectionProps {
  navigate: (path: string) => void;
  mousePosition: { x: number, y: number };
}

const HeroSection: React.FC<HeroSectionProps> = ({ navigate, mousePosition }) => {
  return (
    <div className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left side - Text content */}
        <div className="w-full md:w-3/5 space-y-6 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              <span className="block">Revolutionary</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                Biometric
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                Authentication
              </span>
              <span className="block">Payment System</span>
            </h1>
            
            <p className="text-lg text-white/70 max-w-2xl mt-6">
              Secure, fast, and convenient payments using advanced fingerprint and palm vein 
              recognition technology. No cards, no passwords, just you.
            </p>
          </div>
          
          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <HolographicButton 
              onClick={() => navigate('/register')} 
              className="py-6 px-8 text-lg font-medium relative z-10 flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5 ml-1" />
            </HolographicButton>
            
            <Button 
              onClick={() => navigate('/fingerprint-scan')} 
              variant="outline" 
              className="py-6 px-8 text-lg font-medium text-white border-white/20 bg-white/5 hover:bg-white/10 hover:text-white backdrop-blur-sm"
              size="lg"
            >
              Watch Demo
            </Button>
          </div>
        </div>
        
        {/* Right side - Floating feature cards */}
        <div className="w-full md:w-2/5 relative h-[400px] mt-8 md:mt-0"
          style={{
            transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`
          }}
        >
          {/* Secure Authentication Card */}
          <div className="absolute top-0 right-0 w-72 p-4 rounded-xl bg-gradient-to-b from-gray-900/80 to-gray-800/60 backdrop-blur-md border border-cyan-500/20 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Secure Authentication</h3>
                <p className="text-xs text-white/60">256-bit encryption with biometric validation</p>
              </div>
            </div>
            <div className="mt-2 text-xs text-cyan-400/80 font-mono">
              ID: 24299<br/>
              ID: 06652<br/>
            </div>
          </div>
          
          {/* Anti-Spoofing Card */}
          <div className="absolute bottom-24 left-8 w-64 p-4 rounded-xl bg-gradient-to-b from-gray-900/80 to-gray-800/60 backdrop-blur-md border border-cyan-500/20 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 8-6 6-6-6"/></svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Anti-Spoofing</h3>
                <p className="text-xs text-white/60">AI-powered liveness detection</p>
              </div>
            </div>
            <div className="mt-2 text-xs text-teal-400/80 font-mono">
              ID: 33672<br/>
              ID: 70087<br/>
            </div>
          </div>
          
          {/* Scanning Card */}
          <div className="absolute bottom-4 right-12 w-60 p-4 rounded-xl bg-gradient-to-b from-gray-900/80 to-gray-800/60 backdrop-blur-md border border-cyan-500/20 shadow-lg animate-pulse">
            <div className="text-xs text-cyan-400/90 font-mono">
              Scanning biometrics...
            </div>
            <div className="mt-2 text-xs text-cyan-400/80 font-mono">
              ID: 44370<br/>
              ID: 23816<br/>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-white/50 text-sm mb-2">Scroll to explore</span>
        <div className="rounded-full bg-white/10 backdrop-blur-sm p-2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-cyan-400"><circle cx="12" cy="12" r="10"/><path d="m8 12 4 4 4-4"/><path d="M12 8v8"/></svg>
        </div>
      </div>
      
      {/* Brand icons at bottom */}
      <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-16">
        <div className="p-3 rounded-full bg-cyan-900/30 text-cyan-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
        </div>
        <div className="p-3 rounded-full bg-blue-900/30 text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
        </div>
        <div className="p-3 rounded-full bg-indigo-900/30 text-indigo-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
