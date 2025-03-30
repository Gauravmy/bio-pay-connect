
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import PageBackground from "@/components/layout/PageBackground";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageBackground>
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6 text-center bg-[#0A0E2E]/80 backdrop-blur-xl border border-cyan-800/30 shadow-lg rounded-xl p-8 relative">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg"></div>
          
          <h1 className="text-6xl font-bold text-gradient-cyan animate-text-gradient">404</h1>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-white">Page not found</h2>
            <p className="text-white/70">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>
          
          <div className="pt-6">
            <Button onClick={() => navigate('/')} className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </PageBackground>
  );
};

export default NotFound;
