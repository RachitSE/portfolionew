"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Send, Cpu, Terminal, Activity, Wifi, Shield, Lock, 
  Mic, MicOff, Volume2, VolumeX, Minimize, Maximize, X, 
  Database, Server, Code, Eye, Settings, RefreshCw
} from "lucide-react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import ThinkingCore from "@/app/components/ui/ThinkingCore";

// --- SOUND ENGINE (Simple Beeps) ---
const playSound = (type: "click" | "success" | "error" | "boot") => {
  if (typeof window === "undefined") return;
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  const now = ctx.currentTime;
  if (type === "click") {
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.start(now);
    osc.stop(now + 0.1);
  } else if (type === "success") {
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.linearRampToValueAtTime(800, now + 0.1);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === "error") {
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(100, now);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  }
};

// --- HACKER TEXT COMPONENT ---
const HackerText = ({ text, speed = 30 }: { text: string; speed?: number }) => {
  const [display, setDisplay] = useState(text);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
  
  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(text.split("").map((letter, index) => {
        if (index < iterations) return text[index];
        return letters[Math.floor(Math.random() * letters.length)];
      }).join(""));
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1/2;
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{display}</span>;
};

// --- MAIN PAGE ---
export default function AskAiPage() {
  // System States
  const [booted, setBooted] = useState(false);
  const [bootLog, setBootLog] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"terminal" | "system" | "debug">("terminal");
  
  // AI States
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [fullResponse, setFullResponse] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  
  // Hardware Features
  const [micActive, setMicActive] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const recognitionRef = useRef<any>(null);

  // Metrics
  const [cpuUsage, setCpuUsage] = useState([20, 30, 40]);
  const [memory, setMemory] = useState(40);
  const [latency, setLatency] = useState(24);

  // --- BOOT SEQUENCE ---
  useEffect(() => {
    const bootSequence = [
      "Initializing Kernel...",
      "Loading Neural Modules...",
      "Connecting to Gemini_1.5_Flash...",
      "Decrypting Secure Enclave...",
      "System Online."
    ];
    
    let delay = 0;
    bootSequence.forEach((step, index) => {
      delay += Math.random() * 800 + 200;
      setTimeout(() => {
        setBootLog(prev => [...prev, step]);
        playSound("click");
        if (index === bootSequence.length - 1) {
          setTimeout(() => setBooted(true), 800);
        }
      }, delay);
    });
  }, []);

  // --- METRICS SIMULATION ---
  useEffect(() => {
    if (!booted) return;
    const interval = setInterval(() => {
      setCpuUsage(prev => prev.map(() => Math.floor(Math.random() * 60) + 20));
      setMemory(Math.floor(Math.random() * 30) + 30);
      setLatency(Math.floor(Math.random() * 50) + 10);
    }, 1000);
    return () => clearInterval(interval);
  }, [booted]);

  // --- VOICE RECOGNITION SETUP ---
// --- VOICE RECOGNITION SETUP ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      // We manually check for the API
      const SpeechRecognition = 
        (window as any).SpeechRecognition || 
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setQuery(transcript);
          handleAsk(null, transcript); 
          setMicActive(false);
        };
        
        recognitionRef.current.onerror = () => {
          setMicActive(false);
          playSound("error");
          addLog("Audio Input Failed");
        };
      }
    }
  }, []);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Voice input not supported in this browser.");
      return;
    }
    if (micActive) {
      recognitionRef.current.stop();
      setMicActive(false);
    } else {
      playSound("click");
      recognitionRef.current.start();
      setMicActive(true);
      setStatus("listening");
    }
  };

  // --- LOGGING SYSTEM ---
  const addLog = (text: string) => {
    setLogs(prev => [...prev.slice(-8), `[${new Date().toLocaleTimeString().split(" ")[0]}] ${text}`]);
  };

  // --- MAIN CHAT LOGIC ---
  const handleAsk = async (e: React.FormEvent | null, overrideQuery?: string) => {
    if (e) e.preventDefault();
    const finalQuery = overrideQuery || query;
    if (!finalQuery.trim()) return;

    setStatus("thinking");
    setFullResponse("");
    setDisplayedResponse("");
    addLog(`INPUT: "${finalQuery.substring(0, 15)}..."`);
    playSound("click");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: finalQuery }),
      });
      const data = await res.json();
      
      setStatus("speaking");
      setFullResponse(data.reply);
      setQuery(""); 
      addLog("PACKET RECEIVED");
      playSound("success");

      // Text-to-Speech
      if (audioEnabled && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(data.reply);
        utterance.pitch = 0.9;
        utterance.rate = 1.1;
        // Try to find a robotic voice
        const voices = window.speechSynthesis.getVoices();
        const robotVoice = voices.find(v => v.name.includes("Google") || v.name.includes("Male"));
        if (robotVoice) utterance.voice = robotVoice;
        window.speechSynthesis.speak(utterance);
      }

    } catch (err) {
      setFullResponse("CRITICAL ERROR: CONNECTION SEVERED.");
      setStatus("speaking");
      addLog("ERR_NETWORK_TIMEOUT");
      playSound("error");
    }
  };

  // --- TYPEWRITER EFFECT ---
  useEffect(() => {
    if (status === "speaking" && fullResponse) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedResponse(fullResponse.slice(0, i));
        i++;
        if (i > fullResponse.length) {
          clearInterval(interval);
          setStatus("idle");
        }
      }, 20); // Fast typing
      return () => clearInterval(interval);
    }
  }, [fullResponse, status]);

  // --- RENDER: BOOT SCREEN ---
  if (!booted) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center font-mono text-green-500 p-8">
        <div className="w-full max-w-md space-y-2">
           {bootLog.map((log, i) => (
             <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="border-l-2 border-green-500 pl-4"
             >
                {">"} {log}
             </motion.div>
           ))}
        </div>
        <div className="mt-8 w-64 h-1 bg-green-900 rounded-full overflow-hidden">
           <motion.div 
             className="h-full bg-green-500"
             initial={{ width: 0 }}
             animate={{ width: "100%" }}
             transition={{ duration: 3, ease: "linear" }}
           />
        </div>
      </div>
    );
  }

  // --- RENDER: MAIN HUD ---
  return (
    <main className="h-screen w-full bg-[#030303] overflow-hidden relative flex flex-col font-mono text-white selection:bg-purple-500/30">
      
      {/* BACKGROUND LAYERS */}
      <ThinkingCore status={status} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] pointer-events-none z-10" />
      <div className="absolute inset-0 z-10 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      
      {/* SCANLINES */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%]" />

      {/* --- TOP BAR (Draggable) --- */}
      <header className="relative z-50 p-4 border-b border-white/10 bg-[#030303]/80 backdrop-blur-md flex justify-between items-center select-none">
        <div className="flex items-center gap-4">
           <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all text-xs uppercase tracking-widest text-gray-400 hover:text-white group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <HackerText text="DISCONNECT" />
           </Link>
           <div className="h-8 w-[1px] bg-white/10" />
           <div className="flex gap-1">
             <button 
               onClick={() => setActiveTab("terminal")}
               className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeTab === "terminal" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50" : "text-gray-500 hover:text-white"}`}
             >
               Terminal
             </button>
             <button 
               onClick={() => setActiveTab("system")}
               className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeTab === "system" ? "bg-purple-500/20 text-purple-400 border border-purple-500/50" : "text-gray-500 hover:text-white"}`}
             >
               Sys_Health
             </button>
             <button 
               onClick={() => setActiveTab("debug")}
               className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeTab === "debug" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50" : "text-gray-500 hover:text-white"}`}
             >
               Debug
             </button>
           </div>
        </div>

        <div className="flex items-center gap-4">
           <button onClick={() => setAudioEnabled(!audioEnabled)} className="text-gray-500 hover:text-cyan-400 transition-colors">
              {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
           </button>
           <div className="text-right">
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">System Status</div>
              <div className="text-xs font-bold text-green-400 flex items-center justify-end gap-2">
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                 </span>
                 <HackerText text="OPERATIONAL" />
              </div>
           </div>
        </div>
      </header>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex-grow relative z-40 p-6 flex gap-6 overflow-hidden">
        
        {/* LEFT PANEL: CONTEXT & LOGS (Draggable) */}
        <motion.div 
           drag
           dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
           className="hidden lg:flex w-80 flex-col gap-4"
        >
          {/* Active Tasks Box */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 overflow-hidden">
             <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <span className="text-xs text-gray-400 uppercase tracking-widest flex items-center gap-2">
                   <Activity className="w-3 h-3" /> Processes
                </span>
                <span className="text-[10px] text-green-500">RUNNING</span>
             </div>
             <div className="space-y-3">
                {[
                  { label: "Neural Engine", val: "98%" },
                  { label: "Voice Module", val: micActive ? "ACTIVE" : "STANDBY" },
                  { label: "Secure Link", val: "ENCRYPTED" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                     <span className="text-gray-500">{item.label}</span>
                     <span className="font-mono text-cyan-400">{item.val}</span>
                  </div>
                ))}
             </div>
          </div>

          {/* System Logs */}
          <div className="flex-grow bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 overflow-hidden flex flex-col">
             <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <span className="text-xs text-gray-400 uppercase tracking-widest flex items-center gap-2">
                   <Terminal className="w-3 h-3" /> Event Log
                </span>
             </div>
             <div className="flex-grow overflow-y-auto font-mono text-[10px] space-y-1 text-gray-500 scrollbar-hide">
                {logs.map((log, i) => (
                   <div key={i} className="border-l border-white/10 pl-2 hover:bg-white/5 hover:text-cyan-400 transition-colors cursor-default">
                      {log}
                   </div>
                ))}
                <div ref={(el) => el?.scrollIntoView({ behavior: "smooth" })} />
             </div>
          </div>
        </motion.div>

        {/* CENTER PANEL: THE AI INTERFACE */}
        <div className="flex-grow flex flex-col items-center justify-center relative">
           
           {/* Tab Content Switching */}
           <AnimatePresence mode="wait">
             
             {/* TERMINAL TAB (Chat) */}
             {activeTab === "terminal" && (
               <motion.div 
                 key="terminal"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="w-full max-w-3xl flex flex-col gap-8"
               >
                  {/* Output Display */}
                  <div className="min-h-[200px] flex items-center justify-center text-center">
                    {status === "idle" && !displayedResponse ? (
                      <div className="text-white/20 flex flex-col items-center gap-4">
                         <Cpu className="w-16 h-16 opacity-20 animate-pulse" />
                         <p className="text-sm uppercase tracking-[0.3em]">Awaiting Directives</p>
                      </div>
                    ) : (
                      <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full relative overflow-hidden">
                         {/* Loading Bar at top */}
                         {status === "thinking" && (
                           <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
                              <motion.div 
                                className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                              />
                           </div>
                         )}
                         <p className="text-xl md:text-2xl text-cyan-50 font-light leading-relaxed">
                           {displayedResponse}
                           {status === "speaking" && <span className="inline-block w-3 h-6 bg-cyan-400 ml-1 animate-pulse"/>}
                         </p>
                      </div>
                    )}
                  </div>

                  {/* Input Module */}
                  <div className="relative group">
                     <div className={`absolute -inset-0.5 bg-gradient-to-r ${status === "thinking" ? "from-purple-500 to-pink-500" : "from-cyan-500 to-blue-500"} rounded-xl opacity-30 group-hover:opacity-60 blur transition duration-500`} />
                     <div className="relative bg-black rounded-xl border border-white/10 flex items-center p-2 shadow-2xl">
                        
                        <button 
                          onClick={toggleMic}
                          className={`p-3 rounded-lg border border-white/10 transition-all ${micActive ? "bg-red-500/20 text-red-500 animate-pulse border-red-500/50" : "bg-white/5 text-gray-400 hover:text-white"}`}
                        >
                           {micActive ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </button>

                        <input 
                          type="text" 
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleAsk(null)}
                          placeholder={micActive ? "Listening..." : "Enter command or query..."}
                          className="flex-grow bg-transparent border-none px-4 text-white placeholder:text-gray-600 focus:ring-0 text-lg font-mono"
                          autoFocus
                          disabled={status === "thinking" || micActive}
                        />

                        <button 
                          onClick={(e) => handleAsk(e)}
                          disabled={!query.trim() || status === "thinking"}
                          className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                           {status === "thinking" ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                        </button>
                     </div>
                     <div className="flex justify-between mt-2 px-2">
                        <div className="flex gap-2">
                           {["Who are you?", "Skillset?", "Pricing?"].map(hint => (
                             <button key={hint} onClick={() => { setQuery(hint); handleAsk(null, hint); }} className="text-[10px] text-gray-500 hover:text-cyan-400 uppercase tracking-wider border border-white/5 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-all">
                               {hint}
                             </button>
                           ))}
                        </div>
                        <span className="text-[10px] text-gray-600 font-mono">{query.length} / 256 CHARS</span>
                     </div>
                  </div>
               </motion.div>
             )}

             {/* SYSTEM HEALTH TAB */}
             {activeTab === "system" && (
               <motion.div 
                 key="system"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6"
               >
                  {/* CPU Widget */}
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
                     <Cpu className="w-8 h-8 text-cyan-500 mb-4" />
                     <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-2">Neural Load</h3>
                     <div className="flex items-end gap-1 h-32 w-full">
                        {cpuUsage.map((val, i) => (
                           <div key={i} className="flex-1 bg-cyan-900/20 rounded-t relative h-full overflow-hidden">
                              <motion.div 
                                className="absolute bottom-0 w-full bg-cyan-400"
                                animate={{ height: `${val}%` }}
                                transition={{ type: "spring", bounce: 0 }}
                              />
                           </div>
                        ))}
                     </div>
                     <div className="mt-4 text-2xl font-bold text-white">{Math.max(...cpuUsage)}% <span className="text-xs text-gray-500 font-normal">PEAK</span></div>
                  </div>

                  {/* Memory Widget */}
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
                     <Database className="w-8 h-8 text-purple-500 mb-4" />
                     <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-2">Memory Alloc</h3>
                     <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden mb-2">
                        <motion.div 
                          className="h-full bg-purple-500"
                          animate={{ width: `${memory}%` }}
                        />
                     </div>
                     <div className="flex justify-between text-xs text-gray-500">
                        <span>USED: {memory * 10} MB</span>
                        <span>TOTAL: 1024 MB</span>
                     </div>
                  </div>

                  {/* Latency Map */}
                  <div className="md:col-span-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-green-500/30 transition-colors flex items-center justify-between">
                     <div>
                       <Wifi className="w-8 h-8 text-green-500 mb-4" />
                       <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-2">Network Latency</h3>
                       <div className="text-4xl font-bold text-white">{latency} <span className="text-lg text-gray-500">ms</span></div>
                     </div>
                     <div className="h-full w-1/2 flex items-center justify-center">
                        <div className="relative w-32 h-32 border-2 border-green-500/20 rounded-full flex items-center justify-center animate-pulse">
                           <div className="w-24 h-24 border border-green-500/40 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                           </div>
                           <div className="absolute top-0 w-[1px] h-16 bg-gradient-to-b from-green-500 to-transparent animate-spin origin-bottom" style={{ transformOrigin: "50% 100%" }} />
                        </div>
                     </div>
                  </div>
               </motion.div>
             )}

             {/* DEBUG TAB */}
             {activeTab === "debug" && (
                <motion.div 
                  key="debug"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full max-w-3xl bg-[#0a0a0a] border border-white/10 rounded-xl p-6 font-mono text-xs overflow-hidden"
                >
                   <div className="flex items-center gap-2 mb-4 text-yellow-500">
                      <Settings className="w-4 h-4" />
                      <span className="uppercase tracking-widest font-bold">Raw_System_Dump</span>
                   </div>
                   <pre className="text-gray-500 overflow-x-auto">
{JSON.stringify({
  session_id: "x89-22-ALPHA",
  timestamp: new Date().toISOString(),
  user_agent: typeof window !== "undefined" ? window.navigator.userAgent : "SERVER",
  audio_context: audioEnabled ? "ACTIVE" : "MUTED",
  ai_model: "gemini-1.5-flash-latest",
  render_engine: "Three.js r124",
  status_code: status,
  last_packet_size: fullResponse.length + " bytes"
}, null, 2)}
                   </pre>
                </motion.div>
             )}

           </AnimatePresence>
        </div>

        {/* RIGHT PANEL: CONNECTIVITY (Hidden on mobile) */}
        <div className="hidden xl:flex w-64 flex-col gap-4">
           <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4">
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Active Nodes</div>
              <div className="space-y-4">
                {[
                  { name: "Gemini Core", status: "CONNECTED", ping: "24ms" },
                  { name: "Portfolio DB", status: "SYNCED", ping: "12ms" },
                  { name: "UI Thread", status: "OPTIMAL", ping: "1ms" },
                ].map((node, i) => (
                   <div key={i} className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-xs text-white">
                         <span>{node.name}</span>
                         <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e]" />
                      </div>
                      <div className="flex justify-between text-[10px] text-gray-500">
                         <span>{node.status}</span>
                         <span>{node.ping}</span>
                      </div>
                   </div>
                ))}
              </div>
           </div>
           
           <div className="flex-grow bg-gradient-to-b from-cyan-900/10 to-transparent border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center">
               <Shield className="w-12 h-12 text-cyan-500/50 mb-2" />
               <h4 className="text-xs text-cyan-400 font-bold uppercase tracking-widest">Secure Environment</h4>
               <p className="text-[10px] text-gray-500 mt-2">All interactions are encrypted via TLS 1.3. No user data is stored persistently.</p>
           </div>
        </div>

      </div>
    </main>
  );
}