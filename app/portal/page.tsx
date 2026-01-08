"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Loader2, ShieldCheck, User } from "lucide-react";
import Link from "next/link";

export default function PortalLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "auth" | "success">("idle");

  const handleGuestLogin = () => {
    setIsLoading(true);
    setStatus("auth");

    // Simulate Network Request
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        router.push("/portal/dashboard");
      }, 800);
    }, 2000);
  };

  return (
    <main className="h-screen w-full bg-[#050505] flex items-center justify-center relative overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      <div className="absolute top-[-50%] left-[-50%] w-[100%] h-[100%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-50%] right-[-50%] w-[100%] h-[100%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse" />

      <div className="w-full max-w-md p-8 relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 mb-6 shadow-lg shadow-cyan-500/20">
             <Lock className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Client Portal</h1>
          <p className="text-gray-400">Secure access for project stakeholders.</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0f1116] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
           
           {/* Success Overlay */}
           {status === "success" && (
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }}
               className="absolute inset-0 z-20 bg-[#0f1116] flex flex-col items-center justify-center gap-4"
             >
                <motion.div 
                  initial={{ scale: 0.5 }} 
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 border border-green-500/20"
                >
                   <ShieldCheck className="w-8 h-8" />
                </motion.div>
                <div className="text-lg font-bold text-white">Access Granted</div>
                <div className="text-xs text-gray-500 font-mono">Redirecting to dashboard...</div>
             </motion.div>
           )}

           <div className="space-y-5 relative z-10">
              <div>
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Email Address</label>
                 <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                    <input 
                      type="email" 
                      disabled
                      value="guest@client.com"
                      className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-gray-400 cursor-not-allowed focus:outline-none"
                    />
                 </div>
              </div>

              <div>
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Password</label>
                 <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                    <input 
                      type="password" 
                      disabled
                      value="••••••••••••"
                      className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-gray-400 cursor-not-allowed focus:outline-none"
                    />
                 </div>
              </div>

              <button 
                onClick={handleGuestLogin}
                disabled={isLoading}
                className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Login as Guest
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
           </div>
           
           {/* Decorative Top Border */}
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 opacity-50" />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-600">
           <p className="mb-2">Restricted Access. Authorized Personnel Only.</p>
           <p className="font-mono">IP: 192.168.X.X • SSL Secure</p>
        </div>

      </div>
    </main>
  );
}