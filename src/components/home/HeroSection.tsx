
import React, { useState, useEffect } from 'react';
import { ArrowRight, Scan, ShieldCheck, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import HolographicButton from '@/components/ui/HolographicButton';

interface HeroSectionProps {
  navigate: (path: string) => void;
  mousePosition: { x: number, y: number };
}

const HeroSection: React.FC<HeroSectionProps> = ({ navigate, mousePosition }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [scanLine, setScanLine] = useState(0);
  
  // Animate scan line
  useEffect(() => {
    if (!isHovered) return;
    
    const interval = setInterval(() => {
      setScanLine(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 0;
        }
        return prev + 2;
      });
    }, 20);
    
    return () => clearInterval(interval);
  }, [isHovered]);

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
              Secure, fast, and convenient payments using advanced palm vein 
              recognition technology with real-time processing. Experience the future of payments today.
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
              onClick={() => navigate('/palm-vein-scan')} 
              variant="outline" 
              className="py-6 px-8 text-lg font-medium text-white border-white/20 bg-white/5 hover:bg-white/10 hover:text-white backdrop-blur-sm"
              size="lg"
            >
              Watch Demo
            </Button>
          </div>
          
          {/* Feature badges */}
          <div className="flex flex-wrap gap-3 mt-8">
            <div className="flex items-center gap-2 bg-cyan-900/30 text-cyan-400 px-3 py-1.5 rounded-full text-sm">
              <ShieldCheck className="w-4 h-4" /> Military-grade security
            </div>
            <div className="flex items-center gap-2 bg-purple-900/30 text-purple-400 px-3 py-1.5 rounded-full text-sm">
              <Scan className="w-4 h-4" /> Biometric authentication
            </div>
            <div className="flex items-center gap-2 bg-amber-900/30 text-amber-400 px-3 py-1.5 rounded-full text-sm">
              <Zap className="w-4 h-4" /> Real-time transactions
            </div>
          </div>
        </div>
        
        {/* Right side - Interactive palm scanning simulation */}
        <div 
          className="w-full md:w-2/5 relative h-[400px] mt-8 md:mt-0"
          style={{
            transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setScanLine(0);
          }}
        >
          {/* Palm scan visualization */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
            <div className="relative w-full h-full">
              {/* Hand outline graphic */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg 
                  width="180" 
                  height="180" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className={`text-cyan-400 transition-all duration-300 ${isHovered ? 'opacity-100 scale-110' : 'opacity-70 scale-100'}`}
                >
                  <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                  <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                  <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                  <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                </svg>
              </div>

              {/* Scan grid overlay */}
              <div className="absolute inset-0 rounded-lg bg-[linear-gradient(0deg,rgba(0,255,204,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,204,0.05)_1px,transparent_1px)] bg-[size:8px_8px]"></div>
              
              {/* Scanning line */}
              {isHovered && (
                <div 
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  style={{ 
                    transform: `translateY(${scanLine}%)`,
                    transition: 'transform 0.1s linear'
                  }}
                ></div>
              )}
              
              {/* Circular glow */}
              <div className={`absolute inset-0 rounded-full bg-cyan-500/10 blur-xl transform transition-all duration-500 ${isHovered ? 'scale-110 opacity-100' : 'scale-90 opacity-50'}`}></div>
              
              {/* Data points on palm */}
              <div className="absolute inset-0">
                {Array.from({length: 12}).map((_, i) => (
                  <div 
                    key={i}
                    className={`absolute w-1.5 h-1.5 rounded-full bg-cyan-400 transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`}
                    style={{
                      top: `${30 + Math.random() * 50}%`,
                      left: `${30 + Math.random() * 50}%`,
                      opacity: isHovered ? 0.8 : 0.4,
                      animationDelay: `${i * 0.2}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
            
            {/* Text and status indicators */}
            <div className="absolute -bottom-12 left-0 right-0 text-center">
              <p className={`text-sm transition-all duration-300 ${isHovered ? 'text-cyan-400' : 'text-white/60'}`}>
                {isHovered ? 'Scanning palm vein pattern...' : 'Hover to simulate scanning'}
              </p>
            </div>
          </div>
          
          {/* Data cards */}
          <div className="absolute top-0 right-0 w-72 p-4 rounded-xl bg-gradient-to-b from-gray-900/80 to-gray-800/60 backdrop-blur-md border border-cyan-500/20 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                <ShieldCheck className="h-5 w-5" />
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
          <div className="absolute bottom-16 left-8 w-64 p-4 rounded-xl bg-gradient-to-b from-gray-900/80 to-gray-800/60 backdrop-blur-md border border-cyan-500/20 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400">
                <Scan className="h-5 w-5" />
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
          
          {/* Processing Card */}
          <div className={`absolute bottom-4 right-12 w-60 p-4 rounded-xl bg-gradient-to-b from-gray-900/80 to-gray-800/60 backdrop-blur-md border border-cyan-500/20 shadow-lg transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`}>
            <div className="text-xs text-cyan-400/90 font-mono">
              {isHovered ? 'Processing biometrics...' : 'Ready to scan...'}
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
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
            <circle cx="12" cy="12" r="10"/>
            <path d="m8 12 4 4 4-4"/>
            <path d="M12 8v8"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
