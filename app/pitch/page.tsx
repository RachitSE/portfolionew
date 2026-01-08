"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Sparkles, Zap, Layers, Clock, DollarSign, 
  Lightbulb, Search, ArrowRight, CheckCircle2, Server, 
  Database, Globe, Smartphone, Lock, Cpu, Code2, Terminal,
  Share2, Download, FileText, Layout, CreditCard, Activity,
  Briefcase, IndianRupee
} from "lucide-react";

// --- TYPES ---
type Blueprint = {
  appName: string;
  tagline: string;
  summary: string;
  features: string[];
  userFlow: { step: string; action: string }[];
  stack: {
    frontend: string;
    backend: string;
    database: string;
    extra: string;
  };
  commercials: {
    designCost: number;
    devCost: number;
    deployCost: number;
    total: number;
    timeline: string; // e.g., "3-5 Days"
    maintenance: string; // e.g., "₹2000/mo"
  };
};

// --- MOCK LOGS ---
const GENERATION_STEPS = [
  "Parsing industry requirements...",
  "Calibrating Indian market pricing models...",
  "Optimizing for high-performance delivery...",
  "Selecting cost-effective tech stack...",
  "Drafting user journey maps...",
  "Finalizing architectural schematic..."
];

// --- HELPER COMPONENTS ---

// 1. Animated Connection Line (The "Data Pipe")
const DataPipe = ({ vertical = false, delay = 0 }: { vertical?: boolean, delay?: number }) => {
  return (
    <div className={`relative overflow-hidden opacity-50 ${vertical ? "w-[2px] h-12" : "h-[2px] w-full"} bg-white/10`}>
      <motion.div 
        className={`absolute bg-cyan-500 ${vertical ? "w-full h-1/2" : "h-full w-1/2"}`}
        initial={vertical ? { top: "-100%" } : { left: "-100%" }}
        animate={vertical ? { top: "200%" } : { left: "200%" }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay }}
      />
    </div>
  );
};

// 2. Tech Card
const TechCard = ({ icon, title, value, delay }: { icon: any, title: string, value: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    className="bg-[#0f1115] border border-white/10 p-4 rounded-xl relative group hover:border-cyan-500/50 transition-colors z-10 w-48 text-center"
  >
    <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
    <div className="w-10 h-10 mx-auto bg-white/5 rounded-lg flex items-center justify-center mb-3 text-cyan-400">
       {icon}
    </div>
    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{title}</div>
    <div className="font-bold text-sm text-white truncate">{value}</div>
  </motion.div>
);

export default function PitchPage() {
  const [industry, setIndustry] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<Blueprint | null>(null);
  const [activeTab, setActiveTab] = useState<"blueprint" | "journey" | "commercials">("blueprint");

  // --- GENERATION ENGINE ---
  const generatePitch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry.trim()) return;

    setIsGenerating(true);
    setResult(null);
    setLogs([]);
    setActiveTab("blueprint");

    // 1. Simulate "Thinking" Logs
    let step = 0;
    const logInterval = setInterval(() => {
      if (step < GENERATION_STEPS.length) {
        setLogs(prev => [...prev, GENERATION_STEPS[step]]);
        step++;
      }
    }, 600);

    // 2. The AI Prompt (Optimized for INR & Speed)
    const prompt = `
      Act as a Freelance Software Architect in India. A client wants a solution for "${industry}".
      Create a technical proposal.
      RULES:
      1. Pricing MUST be in Indian Rupees (INR).
      2. Timelines must be fast (e.g., Landing Page = 2-3 Days, App = 2-4 Weeks).
      3. Stack must be modern (Next.js, Supabase, Tailwind).
      
      Return JSON:
      {
        "appName": "Name",
        "tagline": "Slogan",
        "summary": "2 sentences.",
        "features": ["Feat 1", "Feat 2", "Feat 3", "Feat 4"],
        "userFlow": [
           {"step": "1", "action": "User visits site"},
           {"step": "2", "action": "Signs up via Google"},
           {"step": "3", "action": "Views Dashboard"}
        ],
        "stack": {
          "frontend": "Framework",
          "backend": "Runtime",
          "database": "DB",
          "extra": "3rd Party"
        },
        "commercials": {
          "designCost": 5000,
          "devCost": 15000,
          "deployCost": 2000,
          "total": 22000,
          "timeline": "5-7 Days",
          "maintenance": "₹1500/mo"
        }
      }
    `;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt }),
      });
      
      const data = await res.json();
      const cleanJson = data.reply.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleanJson);
      
      clearInterval(logInterval);
      setResult(parsed);
    } catch (err) {
      console.error(err);
      clearInterval(logInterval);
      
      // Fallback Data (Smart Logic based on query length/complexity approximation)
      const isSimple = industry.toLowerCase().includes("landing") || industry.length < 10;
      
      setResult({
        appName: isSimple ? "QuickLaunch Page" : "Nova Systems",
        tagline: "High-performance digital solution for " + industry,
        summary: "A streamlined, scalable platform designed to capture leads and automate workflows instantly.",
        features: ["Responsive UI", "Dark Mode", "SEO Optimized", "Fast Load Times"],
        userFlow: [
           { step: "01", action: "Visitor lands on Hero Section" },
           { step: "02", action: "Interacts with 3D Product Demo" },
           { step: "03", action: "Completes Lead Form" },
           { step: "04", action: "Data sent to CRM instanty" }
        ],
        stack: { frontend: "Next.js 14", backend: "Serverless Funcs", database: "Supabase", extra: "Resend Email" },
        commercials: {
          designCost: isSimple ? 3000 : 15000,
          devCost: isSimple ? 5000 : 35000,
          deployCost: isSimple ? 1000 : 5000,
          total: isSimple ? 9000 : 55000,
          timeline: isSimple ? "2-3 Days" : "3-5 Weeks",
          maintenance: isSimple ? "₹500/mo" : "₹2500/mo"
        }
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 flex flex-col relative overflow-hidden">
      
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-20%,#0e749020,transparent)] pointer-events-none" />

      {/* Header */}
      <nav className="relative z-50 p-6 flex justify-between items-center border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
         <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-widest group">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
           HQ
         </Link>
         <div className="flex items-center gap-2 px-4 py-1.5 bg-cyan-950/20 rounded-full border border-cyan-500/20">
            <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">Architect v3.0</span>
         </div>
      </nav>

      {/* MAIN INTERFACE */}
      <div className="flex-grow flex flex-col items-center justify-start pt-12 md:pt-16 p-6 relative z-10 w-full max-w-7xl mx-auto">
        
        {/* INPUT: PROJECT INITIALIZER */}
        <AnimatePresence mode="wait">
          {!result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl text-center mt-12"
            >
               <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-none">
                 Architect your <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">next big idea.</span>
               </h1>
               <p className="text-gray-400 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                 Enter your concept. I will generate a production-ready tech stack, user flow, and India-specific pricing in seconds.
               </p>

               <form onSubmit={generatePitch} className="relative group max-w-lg mx-auto mb-16">
                 <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                 <div className="relative flex items-center bg-[#0a0a0a] rounded-xl border border-white/10 p-2 shadow-2xl transition-transform focus-within:scale-105">
                   <div className="pl-4 text-gray-500">
                     <Search className="w-5 h-5" />
                   </div>
                   <input 
                     type="text" 
                     value={industry}
                     onChange={(e) => setIndustry(e.target.value)}
                     placeholder="e.g. Gym Landing Page, Food Delivery App..." 
                     className="flex-grow bg-transparent border-none px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none text-lg"
                     disabled={isGenerating}
                     autoFocus
                   />
                   <button 
                     type="submit"
                     disabled={isGenerating || !industry.trim()}
                     className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-cyan-400 transition-colors disabled:opacity-50 min-w-[120px]"
                   >
                     {isGenerating ? "BUILDING..." : "GENERATE"}
                   </button>
                 </div>
               </form>

               {/* TERMINAL LOGS */}
               {isGenerating && (
                 <div className="text-left max-w-md mx-auto font-mono text-xs space-y-2 opacity-80 bg-black/50 p-4 rounded-xl border border-white/5">
                   {logs.map((log, i) => (
                     <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-cyan-400"
                      >
                       <span className="text-gray-600">root@rachit:~$</span> {log}
                     </motion.div>
                   ))}
                   <motion.div 
                     initial={{ opacity: 0 }} 
                     animate={{ opacity: 1 }} 
                     transition={{ repeat: Infinity, duration: 0.8 }}
                     className="w-2 h-4 bg-cyan-500 inline-block align-middle" 
                   />
                 </div>
               )}
            </motion.div>
          )}

          {/* OUTPUT: THE HOLOGRAPHIC DASHBOARD */}
          {result && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
               
               {/* LEFT: PROJECT IDENTITY (Sticky) */}
               <div className="lg:col-span-4 space-y-6">
                  <div className="bg-[#0f1115] border border-white/10 p-8 rounded-3xl relative overflow-hidden group shadow-2xl">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[50px] pointer-events-none" />
                     
                     <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                           <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-black shadow-lg shadow-cyan-500/20">
                              <Lightbulb className="w-6 h-6" />
                           </div>
                           <div className="text-xs font-bold uppercase tracking-widest text-gray-500 bg-white/5 px-2 py-1 rounded">
                              Proposal v1.0
                           </div>
                        </div>

                        <h2 className="text-4xl font-bold mb-2 tracking-tight">{result.appName}</h2>
                        <p className="text-cyan-400 font-medium mb-6 text-lg">{result.tagline}</p>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8 border-l-2 border-white/10 pl-4">
                           {result.summary}
                        </p>
                        
                        <div className="space-y-4">
                           {result.features.map((feat, i) => (
                              <div key={i} className="flex items-start gap-3 text-sm group-hover:translate-x-1 transition-transform">
                                 <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                 <span className="text-gray-300 font-medium">{feat}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                     <button onClick={() => setResult(null)} className="flex-1 py-4 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                        Discard
                     </button>
                     <button 
                       onClick={() => window.print()}
                       className="flex-1 py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-all text-sm flex items-center justify-center gap-2"
                     >
                        <Download className="w-4 h-4" /> Save PDF
                     </button>
                  </div>
               </div>

               {/* RIGHT: THE SYSTEM ENGINE */}
               <div className="lg:col-span-8 flex flex-col gap-6">
                  
                  {/* Tabs */}
                  <div className="flex p-1 bg-white/5 rounded-xl border border-white/5 w-fit">
                     {[
                       { id: "blueprint", label: "Architecture", icon: <Layout className="w-4 h-4" /> },
                       { id: "journey", label: "User Flow", icon: <Activity className="w-4 h-4" /> },
                       { id: "commercials", label: "Commercials", icon: <IndianRupee className="w-4 h-4" /> },
                     ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                             activeTab === tab.id ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20" : "text-gray-400 hover:text-white"
                          }`}
                        >
                           {tab.icon} {tab.label}
                        </button>
                     ))}
                  </div>

                  {/* TAB CONTENT: BLUEPRINT */}
                  {activeTab === "blueprint" && (
                     <motion.div 
                       initial={{ opacity: 0, y: 10 }} 
                       animate={{ opacity: 1, y: 0 }}
                       className="flex-grow bg-[#0f1115] border border-white/10 rounded-3xl p-10 relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]"
                     >
                        {/* Grid Background */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                        
                        {/* ARCHITECTURE GRAPH */}
                        <div className="relative z-10 w-full max-w-3xl flex flex-col items-center gap-8">
                           
                           {/* Level 1: Frontend */}
                           <div className="flex gap-12">
                              <TechCard icon={<Globe />} title="Frontend" value={result.stack.frontend} delay={0.1} />
                              <TechCard icon={<Smartphone />} title="Mobile" value="Responsive PWA" delay={0.2} />
                           </div>

                           {/* Pipes */}
                           <div className="w-full max-w-[400px] flex justify-center gap-12 h-12">
                              <DataPipe vertical delay={0} />
                              <DataPipe vertical delay={0.5} />
                           </div>

                           {/* Level 2: API Gateway */}
                           <div className="w-full flex items-center gap-4">
                              <div className="h-[1px] flex-grow bg-white/10" />
                              <TechCard icon={<Server />} title="Backend Logic" value={result.stack.backend} delay={0.3} />
                              <div className="h-[1px] flex-grow bg-white/10" />
                           </div>

                           {/* Pipes */}
                           <div className="w-full max-w-[200px] flex justify-center h-12">
                              <DataPipe vertical delay={0.8} />
                           </div>

                           {/* Level 3: Data & Services */}
                           <div className="flex gap-12">
                              <TechCard icon={<Database />} title="Database" value={result.stack.database} delay={0.4} />
                              <TechCard icon={<Zap />} title="Services" value={result.stack.extra} delay={0.5} />
                           </div>

                        </div>
                     </motion.div>
                  )}

                  {/* TAB CONTENT: JOURNEY */}
                  {activeTab === "journey" && (
                     <motion.div 
                       initial={{ opacity: 0, y: 10 }} 
                       animate={{ opacity: 1, y: 0 }}
                       className="bg-[#0f1115] border border-white/10 rounded-3xl p-8 min-h-[500px]"
                     >
                        <div className="space-y-0">
                           {result.userFlow.map((step, i) => (
                              <div key={i} className="flex gap-6 relative group">
                                 {/* Timeline Line */}
                                 {i !== result.userFlow.length - 1 && (
                                    <div className="absolute left-[23px] top-10 bottom-0 w-[2px] bg-white/5 group-hover:bg-cyan-500/30 transition-colors" />
                                 )}
                                 
                                 {/* Step Circle */}
                                 <div className="w-12 h-12 rounded-full border-2 border-white/10 bg-[#0f1115] flex items-center justify-center text-sm font-bold text-gray-500 group-hover:border-cyan-500 group-hover:text-cyan-400 transition-colors z-10 shrink-0">
                                    {step.step}
                                 </div>
                                 
                                 {/* Step Content */}
                                 <div className="pb-10 pt-2">
                                    <h3 className="text-xl font-bold mb-1 text-white">{step.action}</h3>
                                    <p className="text-gray-500 text-sm">Automated system response triggered.</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </motion.div>
                  )}

                  {/* TAB CONTENT: COMMERCIALS */}
                  {activeTab === "commercials" && (
                     <motion.div 
                       initial={{ opacity: 0, y: 10 }} 
                       animate={{ opacity: 1, y: 0 }}
                       className="bg-[#0f1115] border border-white/10 rounded-3xl p-10 min-h-[500px] flex flex-col"
                     >
                        <div className="mb-8 flex justify-between items-center">
                           <h3 className="text-lg font-bold text-gray-400 uppercase tracking-widest">Investment Breakdown</h3>
                           <div className="bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-2 rounded-lg text-sm font-bold">
                              Valid for 7 Days
                           </div>
                        </div>

                        <div className="space-y-4 mb-8">
                           <div className="flex justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                              <span className="text-gray-300">UI/UX Design & Prototyping</span>
                              <span className="font-mono font-bold">₹{result.commercials.designCost.toLocaleString()}</span>
                           </div>
                           <div className="flex justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                              <span className="text-gray-300">Development & API Integration</span>
                              <span className="font-mono font-bold">₹{result.commercials.devCost.toLocaleString()}</span>
                           </div>
                           <div className="flex justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                              <span className="text-gray-300">Deployment & Server Setup</span>
                              <span className="font-mono font-bold">₹{result.commercials.deployCost.toLocaleString()}</span>
                           </div>
                        </div>

                        <div className="mt-auto border-t border-white/10 pt-8">
                           <div className="flex justify-between items-end mb-2">
                              <span className="text-gray-400">Total Investment</span>
                              <span className="text-4xl font-bold text-white tracking-tight">₹{result.commercials.total.toLocaleString()}</span>
                           </div>
                           <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Timeline: <span className="text-cyan-400">{result.commercials.timeline}</span></span>
                              <span className="text-gray-500">Maintenance: {result.commercials.maintenance}</span>
                           </div>
                        </div>

                        <button className="w-full mt-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-black text-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all">
                           Accept & Start Project
                        </button>
                     </motion.div>
                  )}

               </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}