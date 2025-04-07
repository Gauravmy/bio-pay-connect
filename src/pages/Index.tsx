
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Fingerprint, 
  ArrowRight, 
  ShieldCheck, 
  Smartphone, 
  Building, 
  Lock, 
  Globe,
  Ban,
  Zap,
  Cpu,
  Scan
} from 'lucide-react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import NetworkVisualization from '@/components/3d/NetworkVisualization';
import LiveTransactionFeed from '@/components/dashboard/LiveTransactionFeed';
import FeatureCard from '@/components/dashboard/FeatureCard';
import StatCard from '@/components/dashboard/StatCard';
import FingerprintModelCanvas from '@/components/3d/FingerprintModel';
import HolographicButton from '@/components/ui/HolographicButton';
import FloatingIcons from '@/components/ui/FloatingIcons';
import HeroSection from '@/components/home/HeroSection';

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

      {/* Futuristic Header */}
      <header className="relative z-10 w-full py-4 border-b border-white/10 bg-[#05081F]/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-400/30 rounded-lg blur-sm group-hover:bg-cyan-400/50 transition-all duration-300"></div>
              <div className="bg-cyan-400/20 p-2 rounded-lg relative backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
                <Fingerprint className="h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              BioPay
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-white/70 hover:text-white px-4 py-2 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-1/2 hover:after:left-1/4 after:transition-all after:duration-300">Home</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-white/70 hover:text-white px-4 py-2 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-1/2 hover:after:left-1/4 after:transition-all after:duration-300">About</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-white/70 hover:text-white px-4 py-2 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-1/2 hover:after:left-1/4 after:transition-all after:duration-300">Features</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-white/70 hover:text-white px-4 py-2 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-1/2 hover:after:left-1/4 after:transition-all after:duration-300">Contact</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/login')}
              className="text-white hover:text-white hover:bg-white/10 relative overflow-hidden group"
            >
              <div className="absolute inset-0 w-1/12 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              Sign In
            </Button>
            <HolographicButton onClick={() => navigate('/register')}>
              Get Started
            </HolographicButton>
          </div>
        </div>
      </header>
      
      {/* Main Hero Section */}
      <div className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl text-center space-y-8 animate-fade-in">
          <div className="flex flex-col items-center justify-center mb-8 relative">
            {/* Parallax floating elements */}
            <div className="absolute -top-20 -left-10 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/5 blur-2xl"
              style={{
                transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`
              }}
            ></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/5 blur-2xl"
              style={{
                transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
              }}
            ></div>
            
            {/* Fingerprint icon with animation */}
            <div className="relative group mb-8 cursor-pointer" onClick={() => navigate('/fingerprint-scan')}>
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md group-hover:bg-cyan-400/30 transition-all duration-500 animate-pulse"></div>
              <div className="bg-gradient-to-br from-cyan-900/80 to-blue-900/80 p-8 rounded-full relative hover:scale-110 transition-transform duration-300 backdrop-blur-xl border border-cyan-500/30">
                <Fingerprint className="h-20 w-20 text-cyan-400" />
              </div>
              
              {/* Rotating glow circle */}
              <div className="absolute -inset-2 border border-cyan-500/30 rounded-full animate-spin-slow"></div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 mb-2">
                Bank-Free. Secure.
              </span>
              Seamless Payments with just a Touch.
            </h1>
            
            <p className="text-xl text-white/70 mt-6 max-w-2xl"
              style={{
                transform: `translateY(${mousePosition.y * 5}px)`
              }}
            >
              Experience the future of digital payments without the need for a bank account. 
              Just your fingerprint and our app - that's all you need to transact anywhere.
            </p>
          </div>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 mt-8 justify-center"
            style={{
              transform: `translateY(${mousePosition.y * 10}px)`
            }}
          >
            <HolographicButton 
              onClick={() => navigate('/register')} 
              className="relative py-6 text-lg z-10"
            >
              Get Started
            </HolographicButton>
            
            <Button 
              onClick={() => navigate('/fingerprint-scan')} 
              variant="outline" 
              className="text-lg py-6 text-white border-white/20 bg-white/5 hover:bg-white/10 hover:text-white backdrop-blur-sm relative group overflow-hidden"
              size="lg"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              Request Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-16 bg-gradient-to-b from-[#050a2c] to-[#060c35]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Key Features</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-white/70 max-w-2xl mx-auto">
              Experience the future of digital payments with cutting-edge technology and security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Fingerprint className="h-6 w-6 text-yellow-300" />}
              title="Simulated Fingerprint Login"
              description="Secure access with simulated biometric authentication that mimics the real-world experience."
              glowColor="from-yellow-400/20 to-amber-500/10"
              onClick={() => navigate('/fingerprint-scan')}
            />
            <FeatureCard 
              icon={<Ban className="h-6 w-6 text-cyan-300" />}
              title="No Bank Dependency"
              description="Fully wallet-based system that operates independently without traditional banking infrastructure."
              glowColor="from-cyan-400/20 to-teal-500/10"
            />
            <FeatureCard 
              icon={<Smartphone className="h-6 w-6 text-blue-300" />}
              title="Contactless Transactions"
              description="IoT-inspired interface for seamless digital payments without physical contact."
              glowColor="from-blue-400/20 to-indigo-500/10"
            />
            <FeatureCard 
              icon={<ShieldCheck className="h-6 w-6 text-green-400" />}
              title="High Security"
              description="Advanced encryption and fraud detection systems to ensure your payments are always secure."
              glowColor="from-green-400/20 to-emerald-500/10"
            />
          </div>
        </div>
      </div>

      {/* Live Transaction Demo */}
      <div className="relative z-10 py-16 bg-gradient-to-b from-[#060c35] to-[#05081F]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Live Transaction Verification</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-white/70 max-w-2xl mx-auto">
              Watch real-time biometric payment processing with military-grade security.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-[#070b29]/60 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-500/80 rounded-tl-lg"></div>
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-cyan-500/80 rounded-tr-lg"></div>
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-cyan-500/80 rounded-bl-lg"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-500/80 rounded-br-lg"></div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#3defc0] animate-pulse"></div>
                <span className="uppercase tracking-wider text-sm font-semibold text-[#3defc0]">Biometric Transaction Monitor</span>
              </div>
            </div>

            <LiveTransactionFeed />
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
                <div className="bg-cyan-400/20 p-2 rounded-lg">
                  <Fingerprint className="h-6 w-6 text-cyan-400" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  BioPay
                </span>
              </div>
              <p className="text-white/60 text-sm mb-4">
                Next-generation biometric payment system using advanced fingerprint authentication technology for secure, instant transactions.
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
                <Button className="bg-[#3defc0] hover:bg-[#35d6ab] text-black">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">© 2023 BioPay. All rights reserved.</p>
            
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
