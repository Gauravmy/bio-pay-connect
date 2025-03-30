
import React from 'react';
import NetworkVisualization from '@/components/3d/NetworkVisualization';

interface PageBackgroundProps {
  children: React.ReactNode;
}

const PageBackground: React.FC<PageBackgroundProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#05081F] text-white overflow-x-hidden relative">
      {/* Network Background */}
      <div className="fixed inset-0 opacity-40 pointer-events-none">
        <NetworkVisualization />
      </div>
      
      {/* Holographic Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/10 blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/15 to-pink-500/10 blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 right-1/5 w-48 h-48 rounded-full bg-gradient-to-r from-teal-500/15 to-emerald-500/10 blur-3xl animate-float" style={{ animationDelay: '2.8s' }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex-1">
        {children}
      </div>
    </div>
  );
};

export default PageBackground;
