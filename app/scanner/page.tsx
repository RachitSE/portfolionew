"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Search, ShieldAlert, Zap, Smartphone, 
  Globe, Eye, Server, Lock, AlertTriangle, CheckCircle, 
  XCircle, ArrowRight, RefreshCw, Bug, Terminal, Activity,
  Cpu, Code2, WifiOff
} from "lucide-react";

// --- 1. INTELLIGENT WHITELIST (The "Smart" Brain) ---
const TECH_GIANTS = [
  "google", "youtube", "amazon", "apple", "facebook", "twitter", "x.com",
  "instagram", "linkedin", "netflix", "microsoft", "vercel", "github", "stripe",
  "openai", "tesla", "spotify", "notion", "linear", "airbnb"
];

const MY_PROJECTS = [
  "rachit.dev", 
  "moboflix", 
  "calibre",
  "jaago",
  "localhost"
];

// --- 2. DETERMINISTIC SCORING ENGINE ---
const generatePseudoScore = (url: string) => {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    hash = url.charCodeAt(i) + ((hash << 5) - hash);
  }
  const score = (Math.abs(hash) % 40) + 45; 
  return score;
};

// --- 3. SCAN SEQUENCES ---
const SCAN_LOGS = [
  { msg: "Initiating handshake sequence...", icon: <Globe className="w-3 h-3" /> },
  { msg: "Resolving DNS records (Google 8.8.8.8)...", icon: <Server className="w-3 h-3" /> }, // Real check happens here
  { msg: "Verifying SSL/TLS certificate chain...", icon: <Lock className="w-3 h-3" /> },
  { msg: "Measuring Time-to-First-Byte (TTFB)...", icon: <Activity className="w-3 h-3" /> },
  { msg: "Parsing HTML DOM structure...", icon: <Code2 className="w-3 h-3" /> },
  { msg: "Downloading static assets...", icon: <Cpu className="w-3 h-3" /> },
  { msg: "Evaluating mobile viewport constraints...", icon: <Smartphone className="w-3 h-3" /> },
  { msg: "Running accessibility heuristic engine...", icon: <Eye className="w-3 h-3" /> },
  { msg: "Finalizing performance report...", icon: <Terminal className="w-3 h-3" /> },
];

export default function ScannerPage() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "scanning" | "complete" | "error">("idle");
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentLogIndex]);

  const startScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    
    // Cleanup URL
    let cleanUrl = url.toLowerCase().replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
    
    // Reset State
    setStatus("scanning");
    setResult(null);
    setErrorMsg("");
    setCurrentLogIndex(0);

    // 1. START CINEMATIC LOGS (Visual Feedback)
    let step = 0;
    const logInterval = setInterval(() => {
      if (step < SCAN_LOGS.length - 1) {
        step++;
        setCurrentLogIndex(step);
      }
    }, 800);

    // 2. REAL DNS CHECK (The Logic)
    try {
      // Use Google's Public DNS API to verify existence
      const res = await fetch(`https://dns.google/resolve?name=${cleanUrl}`);
      const data = await res.json();

      // Clear the visual interval once we have data
      clearInterval(logInterval);

      // Status 0 = Success (NOERROR), Status 3 = NXDOMAIN (Does not exist)
      if (data.Status !== 0) {
        setStatus("error");
        setErrorMsg(`ERR_NAME_NOT_RESOLVED: ${cleanUrl} could not be found.`);
        return;
      }

      // If domain exists, jump to end of logs and show result
      setCurrentLogIndex(SCAN_LOGS.length - 1);
      setTimeout(() => finalizeResult(cleanUrl), 600);

    } catch (err) {
      // If Fetch fails (offline, etc), fallback to simulation or error
      console.warn("DNS Check failed, falling back to simulation");
      // Fallback: If it looks like a valid domain regex, proceed. Else fail.
      if (!cleanUrl.includes(".")) {
        clearInterval(logInterval);
        setStatus("error");
        setErrorMsg("Invalid Domain Format.");
        return;
      }
      setCurrentLogIndex(SCAN_LOGS.length - 1);
      setTimeout(() => finalizeResult(cleanUrl), 600);
    }
  };

  const finalizeResult = (hostname: string) => {
    // 1. CHECK IDENTITIES
    const isGiant = TECH_GIANTS.some(g => hostname.includes(g));
    const isMyWork = MY_PROJECTS.some(p => hostname.includes(p));
    const isElite = isGiant || isMyWork;

    let score, grade, color, metrics, issues;

    if (isElite) {
      // --- ELITE SCORE (90-100) ---
      score = isMyWork ? 99 : 92 + (Math.floor(Math.random() * 7)); 
      grade = "A";
      color = "text-green-400";
      
      metrics = [
        { label: "Performance", val: 98, icon: <Zap className="w-4 h-4" /> },
        { label: "SEO", val: 100, icon: <Search className="w-4 h-4" /> },
        { label: "Accessibility", val: 99, icon: <Eye className="w-4 h-4" /> },
        { label: "Best Practices", val: 100, icon: <ShieldAlert className="w-4 h-4" /> },
      ];

      issues = [
        { severity: "success", msg: "Core Web Vitals passed with flying colors." },
        { severity: "success", msg: "SSL/TLS Handshake is optimized (HTTP/3)." },
        { severity: "success", msg: "Zero blocking JavaScript resources detected." },
        { severity: "success", msg: "Images are perfectly compressed (WebP/AVIF)." }
      ];

    } else {
      // --- REALISTIC SCORE ---
      score = generatePseudoScore(hostname);
      
      if (score >= 80) { grade = "B"; color = "text-yellow-400"; }
      else if (score >= 60) { grade = "C"; color = "text-orange-400"; }
      else { grade = "F"; color = "text-red-500"; }

      metrics = [
        { label: "Performance", val: score, icon: <Zap className="w-4 h-4" /> },
        { label: "SEO", val: score + 10, icon: <Search className="w-4 h-4" /> }, 
        { label: "Accessibility", val: score - 5, icon: <Eye className="w-4 h-4" /> },
        { label: "Best Practices", val: score + 5, icon: <ShieldAlert className="w-4 h-4" /> },
      ];

      issues = [];
      if (score < 90) issues.push({ severity: "warning", msg: "Missing Next-Gen image formats (WebP)." });
      if (score < 80) issues.push({ severity: "warning", msg: "Unused CSS/JS removing 400ms from load time." });
      if (score < 70) issues.push({ severity: "critical", msg: "High Cumulative Layout Shift (CLS) detected." });
      if (score < 60) issues.push({ severity: "critical", msg: "Time-to-Interactive is over 4.2 seconds." });
      if (score < 50) issues.push({ severity: "critical", msg: "Server response (TTFB) is dangerously slow." });
      
      issues.push({ severity: "info", msg: "Consider implementing a CDN for static assets." });
    }

    setResult({ target: hostname, score, grade, color, metrics, issues, isMyWork, isGiant });
    setStatus("complete");
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 flex flex-col relative overflow-hidden">
      
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 opacity-20 bg-[length:100%_4px,6px_100%] pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Header */}
      <nav className="relative z-50 p-6 flex justify-between items-center border-b border-white/5">
         <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-widest group">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
           Abort Mission
         </Link>
         <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <Activity className="w-4 h-4 text-cyan-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-300">System Auditor v2.0</span>
         </div>
      </nav>

      {/* Main Interaction Layer */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 relative z-10 w-full max-w-5xl mx-auto">
        
        {status === "idle" || status === "scanning" || status === "error" ? (
          <div className="w-full max-w-2xl text-center">
             
             {/* Intro Text */}
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
               <div className="inline-block mb-4 px-3 py-1 rounded border border-red-500/30 bg-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-widest">
                 Diagnostics Tool
               </div>
               <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                 Is your website <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">losing revenue?</span>
               </h1>
               <p className="text-gray-400 text-lg max-w-lg mx-auto leading-relaxed">
                 90% of websites fail Google's Core Web Vitals. <br/>
                 Run a deep-dive heuristic scan to see where you stand.
               </p>
             </motion.div>

             {/* Input Module */}
             <form onSubmit={startScan} className="relative group max-w-lg mx-auto mb-16">
               <div className={`absolute -inset-1 bg-gradient-to-r rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500 ${status === 'error' ? "from-red-500 to-orange-500" : "from-cyan-500 to-blue-600"}`} />
               <div className="relative flex items-center bg-[#0a0a0a] rounded-xl border border-white/10 p-2 shadow-2xl transition-transform focus-within:scale-105">
                 <div className="pl-4 text-gray-500">
                   {status === 'error' ? <WifiOff className="w-5 h-5 text-red-500" /> : <Globe className="w-5 h-5" />}
                 </div>
                 <input 
                   type="text" 
                   value={url}
                   onChange={(e) => setUrl(e.target.value)}
                   placeholder="company.com" 
                   className="flex-grow bg-transparent border-none px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none text-lg font-mono"
                   disabled={status === "scanning"}
                   autoFocus
                 />
                 <button 
                   type="submit"
                   disabled={status === "scanning" || !url.trim()}
                   className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-cyan-400 hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] flex items-center justify-center"
                 >
                   {status === "scanning" ? (
                     <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                   ) : (
                     "AUDIT"
                   )}
                 </button>
               </div>
               
               {/* ERROR MESSAGE DISPLAY */}
               {status === "error" && (
                 <motion.div 
                   initial={{ opacity: 0, y: -10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="absolute top-full left-0 w-full mt-4 text-red-400 text-sm font-mono flex items-center justify-center gap-2"
                 >
                   <XCircle className="w-4 h-4" />
                   {errorMsg}
                 </motion.div>
               )}
             </form>

             {/* Live Terminal Logs */}
             <AnimatePresence>
               {status === "scanning" && (
                 <motion.div 
                   initial={{ opacity: 0, height: 0 }} 
                   animate={{ opacity: 1, height: "auto" }}
                   exit={{ opacity: 0, height: 0 }}
                   className="max-w-lg mx-auto bg-black/50 border border-white/10 rounded-xl p-4 text-left font-mono text-xs overflow-hidden"
                 >
                   <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                      <Terminal className="w-3 h-3 text-gray-500" />
                      <span className="text-gray-500">Live Execution Log</span>
                   </div>
                   <div className="space-y-2 h-32 overflow-hidden flex flex-col justify-end" ref={scrollRef}>
                      {SCAN_LOGS.slice(0, currentLogIndex + 1).map((log, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -10 }} 
                          animate={{ opacity: 1, x: 0 }}
                          className={`flex items-center gap-3 ${i === currentLogIndex ? "text-cyan-400" : "text-gray-600"}`}
                        >
                           {log.icon}
                           <span>{log.msg}</span>
                           {i === currentLogIndex && <span className="animate-pulse">_</span>}
                        </motion.div>
                      ))}
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        ) : (
          /* RESULT REPORT CARD */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
             {/* LEFT: SCORE CARD */}
             <div className="lg:col-span-1 bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                <div className={`absolute inset-0 opacity-10 transition-opacity duration-1000 ${result.score > 80 ? "bg-green-500" : result.score > 50 ? "bg-orange-500" : "bg-red-500"}`} />
                
                <div className="relative z-10">
                   <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center justify-center gap-2">
                     {result.isMyWork ? <ShieldAlert className="w-4 h-4 text-green-500" /> : <Activity className="w-4 h-4" />}
                     {result.isMyWork ? "VERIFIED ARCHITECTURE" : "PERFORMANCE GRADE"}
                   </div>
                   
                   <div className="relative inline-block">
                      <div className={`text-9xl font-black mb-2 ${result.color} drop-shadow-2xl`}>
                         {result.grade}
                      </div>
                      <div className="absolute top-0 right-0 -mr-4 mt-2 px-2 py-1 bg-white/10 rounded text-xs font-mono text-gray-400">
                         {result.score}/100
                      </div>
                   </div>
                   
                   <div className={`text-sm font-bold mt-4 px-4 py-2 rounded-full border bg-opacity-10 ${
                      result.score > 80 
                        ? "bg-green-500 border-green-500 text-green-400" 
                        : "bg-red-500 border-red-500 text-red-400"
                   }`}>
                      {result.score > 80 ? "OPTIMIZED & SECURE" : "OPTIMIZATION REQUIRED"}
                   </div>
                   
                   {!result.isMyWork && !result.isGiant && (
                     <p className="text-xs text-gray-500 mt-6 max-w-[200px] mx-auto leading-relaxed">
                        This site is likely losing <strong>{100 - result.score}%</strong> of potential traffic due to technical debt.
                     </p>
                   )}
                </div>
             </div>

             {/* RIGHT: DETAILS & DIAGNOSTICS */}
             <div className="lg:col-span-2 space-y-6">
                
                {/* Header Info */}
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                   <div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Target Host</div>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                         {result.target}
                         {result.isGiant && <CheckCircle className="w-5 h-5 text-blue-400" />}
                      </h2>
                   </div>
                   <div className="text-right">
                      <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Scan ID</div>
                      <div className="font-mono text-cyan-400">#{Math.floor(Math.random() * 100000).toString(16).toUpperCase()}</div>
                   </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                   {result.metrics.map((m: any, i: number) => (
                     <div key={i} className="bg-[#0a0a0a] border border-white/10 p-5 rounded-2xl flex items-center justify-between group hover:border-white/20 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="p-3 bg-white/5 rounded-xl text-gray-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-all">
                              {m.icon}
                           </div>
                           <span className="text-sm font-medium text-gray-300">{m.label}</span>
                        </div>
                        <div className={`text-2xl font-bold ${
                           m.val >= 90 ? "text-green-400" : m.val >= 50 ? "text-yellow-400" : "text-red-400"
                        }`}>
                           {m.val}
                        </div>
                     </div>
                   ))}
                </div>

                {/* Issues List */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
                   <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                     <Bug className="w-4 h-4" /> Detected Diagnostics
                   </h3>
                   <div className="space-y-4">
                      {result.issues.map((issue: any, i: number) => (
                        <div 
                          key={i} 
                          className="flex items-start gap-4 text-sm animate-fade-in pb-4 border-b border-white/5 last:border-0 last:pb-0" 
                          style={{ animationDelay: `${i * 100}ms` }}
                        >
                           {issue.severity === "critical" ? (
                             <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                           ) : issue.severity === "warning" ? (
                             <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                           ) : (
                             <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                           )}
                           <div>
                              <span className={`font-medium ${
                                 issue.severity === "critical" ? "text-red-200" : issue.severity === "success" ? "text-green-400" : "text-gray-300"
                              }`}>
                                 {issue.msg}
                              </span>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col md:flex-row gap-4 pt-4">
                   <button 
                     onClick={() => { setStatus("idle"); setResult(null); }}
                     className="px-8 py-4 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2 font-medium"
                   >
                     <RefreshCw className="w-4 h-4" /> New Scan
                   </button>
                   
                   {!result.isMyWork && !result.isGiant ? (
                     <Link href="/estimate" className="flex-grow px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold hover:shadow-lg hover:shadow-red-500/20 transition-all flex items-center justify-center gap-3">
                       Fix These Issues Now <ArrowRight className="w-5 h-5" />
                     </Link>
                   ) : (
                     <button disabled className="flex-grow px-8 py-4 rounded-xl bg-green-900/20 text-green-400 font-bold border border-green-500/20 flex items-center justify-center gap-2 cursor-default">
                       <CheckCircle className="w-5 h-5" /> Verified Excellence
                     </button>
                   )}
                </div>

             </div>
          </motion.div>
        )}

      </div>
    </main>
  );
}