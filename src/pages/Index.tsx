
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import NetworkVisualization from '@/components/3d/NetworkVisualization';
import LiveTransactionFeed from '@/components/dashboard/LiveTransactionFeed';
import FeatureCard from '@/components/dashboard/FeatureCard';
import StatCard from '@/components/dashboard/StatCard';
import FingerprintModelCanvas from '@/components/3d/FingerprintModel';
import HolographicButton from '@/components/ui/HolographicButton';
import FloatingIcons from '@/components/ui/FloatingIcons';
import HeroSection from '@/components/home/HeroSection';
import { 
  Fingerprint, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Lock,
  Ban,
  ArrowRight
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    // Track mouse position for interactive elements
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#05081F] text-white overflow-x-hidden">
      {/* Enhanced Network Background with parallax effect */}
      <div 
        className="fixed inset-0 opacity-40 pointer-events-none" 
        style={{ 
          transform: `translateY(${scrollPosition * 0.2}px)`
        }}
      >
        <NetworkVisualization />
      </div>
      
      {/* Holographic Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/10 blur-3xl animate-float"></div>
        <div className="absolute bottom-[20%] right-[15%] w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/15 to-pink-500/10 blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-[50%] right-[5%] w-48 h-48 rounded-full bg-gradient-to-r from-teal-500/15 to-emerald-500/10 blur-3xl animate-float" style={{ animationDelay: '2.8s' }}></div>
      </div>

      {/* Floating UI Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <FloatingIcons />
      </div>

      {/* Modern Header with Logo */}
      <header className="relative z-10 w-full py-4 bg-[#05081F]/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative group">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-cyan-400">
                <path d="M12 11h1.5a2.5 2.5 0 0 0 0-5H12v5Z"/>
                <path d="M12 11v5"/>
                <circle cx="12" cy="11.5" r="10"/>
                <path d="m16 16-2-2"/>
              </svg>
              <span className="text-xl font-bold ml-2 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                BioHoloPay
              </span>
            </div>
            <p className="text-xs text-cyan-400/70 hidden sm:block ml-2 tracking-wider">Next Generation Biometric Payment</p>
          </div>
          
          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-white hover:text-cyan-400 transition-colors">Home</a>
            <a href="#" className="text-white/70 hover:text-cyan-400 transition-colors">About</a>
            <a href="#" className="text-white/70 hover:text-cyan-400 transition-colors">How It Works</a>
            <a href="#" className="text-white/70 hover:text-cyan-400 transition-colors">Security</a>
            <a href="#" className="text-white/70 hover:text-cyan-400 transition-colors">Contact</a>
            <a href="#" className="text-white/70 hover:text-cyan-400 transition-colors">Dashboard</a>
          </div>
          
          {/* Auth Buttons */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="text-white border border-cyan-900/50 bg-cyan-900/10 hover:bg-cyan-900/30 hover:border-cyan-500/50"
            >
              <span className="px-2">Sign In</span>
            </Button>
            <Button 
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-cyan-500 to-teal-400 text-black font-medium hover:from-cyan-600 hover:to-teal-500"
            >
              <span className="px-2">Register Now</span>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <HeroSection navigate={navigate} mousePosition={mousePosition} />

      {/* Features Section */}
      <div className="relative z-10 py-16 bg-gradient-to-b from-[#050a2c] to-[#060c35]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Key Features</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-white/70 max-w-2xl mx-auto">
              Experience the future of digital payments with cutting-edge technology and security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Fingerprint className="h-6 w-6 text-cyan-400" />}
              title="Biometric Login"
              description="Secure access with advanced biometric authentication that protects your digital identity."
              glowColor="from-cyan-400/20 to-teal-500/10"
              onClick={() => navigate('/fingerprint-scan')}
            />
            <FeatureCard 
              icon={<Ban className="h-6 w-6 text-green-400" />}
              title="Bank-Free System"
              description="Fully wallet-based system that operates independently without traditional banking infrastructure."
              glowColor="from-green-400/20 to-emerald-500/10"
            />
            <FeatureCard 
              icon={<Zap className="h-6 w-6 text-amber-400" />}
              title="Instant Payments"
              description="Lightning-fast transactions processed in milliseconds with immediate confirmation."
              glowColor="from-amber-400/20 to-yellow-500/10"
            />
            <FeatureCard 
              icon={<ShieldCheck className="h-6 w-6 text-blue-400" />}
              title="Advanced Security"
              description="Military-grade encryption and multi-factor biometric authentication protocols."
              glowColor="from-blue-400/20 to-indigo-500/10"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 py-16 bg-gradient-to-b from-[#05081F] to-[#070a24]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              value="2.4M+"
              label="Transactions / Day"
              className="border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 to-transparent"
            />
            <StatCard 
              value="99.998%"
              label="Security Rating"
              className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-transparent"
            />
            <StatCard 
              value="350+"
              label="Partner Banks"
              className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-transparent"
            />
            <StatCard 
              value="42"
              label="Countries Supported"
              className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-transparent"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full py-12 border-t border-white/10 bg-[#070A1F]/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-cyan-400">
                  <path d="M12 11h1.5a2.5 2.5 0 0 0 0-5H12v5Z"/>
                  <path d="M12 11v5"/>
                  <circle cx="12" cy="11.5" r="10"/>
                  <path d="m16 16-2-2"/>
                </svg>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  BioHoloPay
                </span>
              </div>
              <p className="text-white/60 text-sm mb-4">
                Next-generation biometric payment system using advanced fingerprint and palm vein authentication technology.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">System Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <p className="text-white/60 text-sm mb-4">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input type="email" placeholder="Your email" className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50" />
                </div>
                <Button className="bg-gradient-to-r from-cyan-500 to-teal-400 text-black hover:from-cyan-600 hover:to-teal-500">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">© 2023 BioHoloPay. All rights reserved.</p>
            
            <div className="flex gap-6">
              <a href="#" className="text-white/40 text-sm hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/40 text-sm hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-white/40 text-sm hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
