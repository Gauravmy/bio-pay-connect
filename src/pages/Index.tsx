
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Fingerprint, 
  ArrowRight, 
  ShieldCheck, 
  Smartphone, 
  CreditCard, 
  ChevronDown, 
  Building, 
  Lock, 
  Globe, 
  Shield, 
  RefreshCw,
  Zap,
  Cpu,
  Scan
} from 'lucide-react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import NetworkVisualization from '@/components/3d/NetworkVisualization';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
            <span className="text-xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-text-gradient">Bio</span>
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-text-gradient" style={{ animationDelay: '0.5s' }}>Pay</span>
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
                  <NavigationMenuLink className="text-white/70 hover:text-white px-4 py-2 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-1/2 hover:after:left-1/4 after:transition-all after:duration-300">How It Works</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-white/70 hover:text-white px-4 py-2 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-1/2 hover:after:left-1/4 after:transition-all after:duration-300">Security</NavigationMenuLink>
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
              Register Now
            </HolographicButton>
          </div>
        </div>
      </header>
      
      {/* Enhanced Hero Section */}
      <HeroSection navigate={navigate} mousePosition={mousePosition} />
      
      {/* Credit Card Showcase Section */}
      <div className="relative z-10 py-16 bg-gradient-to-b from-[#05081F] to-[#070b29]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gradient-cyan">Compatible With All Your Cards</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Link your existing cards and bank accounts to your biometric profile for seamless authentication.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
            {/* Credit Card - Quantum Bank */}
            <div className="flex-1 p-1 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl group hover:scale-105 transition-transform duration-300">
              <div className="bg-[#070b29]/80 rounded-2xl p-6 h-full border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex justify-between items-start">
                  <div className="text-xl font-bold text-white">Quantum Bank</div>
                  <div className="text-sm text-white/60">09/28</div>
                </div>
                <div className="my-8 text-white/80 tracking-widest">
                  **** **** **** 4291
                </div>
                <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/20 blur-xl"></div>
              </div>
            </div>
            
            {/* Credit Card - Neo Finance */}
            <div className="flex-1 p-1 bg-gradient-to-br from-cyan-500/30 to-teal-500/30 rounded-2xl group hover:scale-105 transition-transform duration-300">
              <div className="bg-[#070b29]/80 rounded-2xl p-6 h-full border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex justify-between items-start">
                  <div className="text-xl font-bold text-white">Neo Finance</div>
                  <div className="text-sm text-white/60">12/27</div>
                </div>
                <div className="my-8 text-white/80 tracking-widest">
                  **** **** **** 7835
                </div>
                <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500/30 to-teal-500/20 blur-xl"></div>
              </div>
            </div>
            
            {/* Credit Card - Future Credit */}
            <div className="flex-1 p-1 bg-gradient-to-br from-pink-500/30 to-red-500/30 rounded-2xl group hover:scale-105 transition-transform duration-300">
              <div className="bg-[#070b29]/80 rounded-2xl p-6 h-full border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex justify-between items-start">
                  <div className="text-xl font-bold text-white">Future Credit</div>
                  <div className="text-sm text-white/60">04/29</div>
                </div>
                <div className="my-8 text-white/80 tracking-widest">
                  **** **** **** 1658
                </div>
                <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-gradient-to-r from-pink-500/30 to-red-500/20 blur-xl"></div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 max-w-3xl mx-auto">
            <p className="text-white/70 mb-6">
              Biometric authentication works with all major banks and financial institutions. Your data stays secure with our advanced encryption.
            </p>
            <Button variant="link" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 mx-auto">
              View All Supported Banks
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Cards with enhanced animations */}
      <div className="relative z-10 py-16 bg-gradient-to-b from-[#070b29] to-[#060c35]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-2 text-gradient-purple">Revolutionary Payment Features</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Experience the future of transactions with cutting-edge biometric security and seamless integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<div className="text-2xl">👆</div>}
              title="Fingerprint Authentication"
              description="Ultra-secure fingerprint recognition with liveness detection and anti-spoofing technology."
              glowColor="from-yellow-400/20 to-amber-500/10"
            />
            <FeatureCard 
              icon={<div className="text-2xl">✋</div>}
              title="Palm Vein Scanning"
              description="Advanced infrared palm vein pattern recognition for unhackable identity verification."
              glowColor="from-cyan-400/20 to-teal-500/10"
            />
            <FeatureCard 
              icon={<div className="text-2xl">🏦</div>}
              title="Multi-Bank Support"
              description="Connect and manage all your bank accounts and cards through a single biometric profile."
              glowColor="from-blue-400/20 to-indigo-500/10"
            />
            <FeatureCard 
              icon={<div className="text-2xl">🛡️</div>}
              title="Real-time Fraud Detection"
              description="AI-powered fraud monitoring system that detects and prevents unauthorized access attempts."
              glowColor="from-red-400/20 to-rose-500/10"
            />
            <FeatureCard 
              icon={<div className="text-2xl">🔒</div>}
              title="Quantum Encryption"
              description="Next-generation encryption that protects your data against both conventional and quantum threats."
              glowColor="from-purple-400/20 to-violet-500/10"
            />
            <FeatureCard 
              icon={<div className="text-2xl">🌎</div>}
              title="Global Acceptance"
              description="Use your biometric payment profile at millions of locations worldwide with instant conversion."
              glowColor="from-green-400/20 to-emerald-500/10"
            />
          </div>
        </div>
      </div>

      {/* Stats Section with glowing accents */}
      <div className="relative z-10 py-16 bg-gradient-to-b from-[#060c35] to-[#05081F]">
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

      {/* Live Transaction Verification Section */}
      <div className="relative z-10 py-16 bg-gradient-to-b from-[#05081F] to-[#050a2c]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2 text-gradient-green">Live Transaction Verification</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Watch real-time biometric payment processing with military-grade security.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-[#070b29]/60 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg transform hover:scale-[1.01] transition-transform duration-300 ease-out">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-500/80 rounded-tl-lg"></div>
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-cyan-500/80 rounded-tr-lg"></div>
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-cyan-500/80 rounded-bl-lg"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-500/80 rounded-br-lg"></div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#3defc0] animate-pulse"></div>
                <span className="uppercase tracking-wider text-sm font-semibold text-[#3defc0]">BIOMETRIC TRANSACTION MONITOR</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center text-white/60 text-sm gap-1">
                  <RefreshCw className="h-4 w-4 animate-spin-slow" />
                  <span>Live updating</span>
                </div>
                <Button variant="outline" size="sm" className="text-xs h-8 border-white/10 bg-white/5 hover:bg-white/10">
                  Filter
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <div className="bg-[#070b29]/80 rounded-lg p-3 mb-2 flex items-center justify-between border border-white/5 hover:bg-[#070b29]/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                    📱
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">FutureHealth</p>
                    <p className="text-xs text-white/60">Just now</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">₹47.28</p>
                  <p className="text-xs text-green-400">Verified</p>
                </div>
              </div>
              
              <div className="bg-[#070b29]/80 rounded-lg p-3 mb-2 flex items-center justify-between border border-white/5 hover:bg-[#070b29]/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                    📱
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">NeoFoods</p>
                    <p className="text-xs text-white/60">Just now</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">₹40.08</p>
                  <p className="text-xs text-green-400">Verified</p>
                </div>
              </div>
              
              <div className="bg-[#070b29]/80 rounded-lg p-3 mb-2 flex items-center justify-between border border-white/5 hover:bg-[#070b29]/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                    ☕
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">CyberCafe</p>
                    <p className="text-xs text-white/60">2 mins ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">₹15.99</p>
                  <p className="text-xs text-green-400">Verified</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-[#070b29]/80 rounded-xl p-6 border border-white/10 hover:border-cyan-500/40 transition-colors duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-cyan-400/10 animate-pulse"></div>
                    <CreditCard className="h-5 w-5 text-blue-400 relative z-10" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Total Daily Volume</p>
                    <h3 className="text-3xl font-bold text-white">₹12,459.20</h3>
                  </div>
                </div>
              </div>
              <div className="bg-[#070b29]/80 rounded-xl p-6 border border-white/10 hover:border-green-500/40 transition-colors duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-emerald-400/10 animate-pulse"></div>
                    <ShieldCheck className="h-5 w-5 text-green-400 relative z-10" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Verification Success Rate</p>
                    <h3 className="text-3xl font-bold text-white">99.8%</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button variant="link" className="text-[#3defc0] hover:text-[#35d6ab] gap-1 group">
                See full transaction history
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="border-t border-white/10 mt-6 pt-2 text-center">
              <p className="text-xs text-white/40">SYS:OK • NET:ACTIVE • SEC:MAXIMUM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative z-10 py-20 bg-gradient-to-b from-[#050a2c] to-[#05081F]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-blue">The Future of Payment Is Here</h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-10">
            Join thousands of forward-thinking individuals and businesses embracing the next evolution in financial technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <HolographicButton onClick={() => navigate('/register')} className="py-6 text-lg">
              Create Free Account
            </HolographicButton>
            <Button variant="outline" onClick={() => navigate('/contact')} className="py-6 text-lg text-white border-white/20 bg-white/5 hover:bg-white/10">
              Contact Sales
            </Button>
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
                <span className="text-xl font-bold">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-text-gradient">Bio</span>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-text-gradient" style={{ animationDelay: '0.5s' }}>Pay</span>
                </span>
              </div>
              <p className="text-white/60 text-sm mb-4">
                Next-generation biometric payment system using advanced fingerprint and palm vein authentication technology for secure, instant transactions.
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
              <p className="text-white/40 text-xs mt-2">Your information is secure. We don't share your data with third parties.</p>
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

          <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-2 text-white/40 text-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 9L7 12L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              ISO 27001 Certified
            </div>
            <div className="flex items-center justify-center gap-2 text-white/40 text-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 9L7 12L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Bank-Level Encryption
            </div>
            <div className="flex items-center justify-center gap-2 text-white/40 text-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 9L7 12L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              PCI DSS Compliant
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gradient bg-gradient-to-r from-cyan-400 to-blue-500 text-sm font-medium">
              Made with ❤️ by G.S. Dhakad
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
