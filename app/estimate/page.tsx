"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, ChevronRight, Check, Zap, Globe, Smartphone, 
  Database, Lock, Palette, Search, Server, Cpu, 
  CreditCard, Layout, Shield, Rocket, Mail, RefreshCw,
  ShoppingBag, PenTool, BarChart3, Languages, MessageSquare,
  FileText, SmartphoneNfc, MonitorSmartphone, Share2, Download
} from "lucide-react";

// --- 1. CONFIGURATION DATA (PRICING IN INR) ---

const PROJECT_TYPES = [
  {
    id: "landing",
    title: "Landing Page",
    description: "High-converting single page for ads/products.",
    basePrice: 8000,
    baseTime: 3, // days
    icon: <Rocket className="w-8 h-8 text-orange-400" />,
    features: ["1 Page", "Mobile Responsive", "Contact Form", "Basic SEO"]
  },
  {
    id: "corporate",
    title: "Corporate Website",
    description: "5-7 pages for business credibility.",
    basePrice: 25000,
    baseTime: 7,
    icon: <Globe className="w-8 h-8 text-blue-400" />,
    features: ["Home, About, Services", "CMS Integration", "Blog Setup", "Google Maps"]
  },
  {
    id: "ecommerce",
    title: "E-Commerce Store",
    description: "Sell products online with payments.",
    basePrice: 45000,
    baseTime: 14,
    icon: <ShoppingBag className="w-8 h-8 text-pink-400" />,
    features: ["Product Listing", "Cart & Checkout", "Payment Gateway", "Admin Dashboard"]
  },
  {
    id: "webapp",
    title: "Custom Web App",
    description: "SaaS, Dashboards, Internal Tools.",
    basePrice: 60000,
    baseTime: 21,
    icon: <Database className="w-8 h-8 text-purple-400" />,
    features: ["User Auth", "Database", "API Integration", "Dynamic Data"]
  },
  {
    id: "mobile",
    title: "Mobile Application",
    description: "iOS & Android App (Flutter/React Native).",
    basePrice: 80000,
    baseTime: 30,
    icon: <Smartphone className="w-8 h-8 text-green-400" />,
    features: ["App Store Deploy", "Push Notifications", "Native Features", "Offline Mode"]
  }
];

const STEPS = [
  {
    id: "design",
    title: "Design Complexity",
    subtitle: "How should it look?",
    options: [
      { id: "template", label: "Clean / Template Based", price: 2000, time: 1, icon: <Layout className="w-5 h-5" />, desc: "Fast, standard UI using premium UI kits." },
      { id: "custom", label: "Custom Branding", price: 8000, time: 3, icon: <PenTool className="w-5 h-5" />, desc: "Unique colors, fonts, and layout for your brand." },
      { id: "premium", label: "High-End Interactions", price: 15000, time: 5, icon: <Zap className="w-5 h-5" />, desc: "GSAP animations, 3D elements, 'Wow' factor." },
    ]
  },
  {
    id: "cms",
    title: "Content Management",
    subtitle: "Do you need to edit content yourself?",
    options: [
      { id: "none", label: "No (Static Code)", price: 0, time: 0, icon: <FileText className="w-5 h-5" />, desc: "I will update the code for you manually." },
      { id: "basic", label: "Basic CMS", price: 5000, time: 2, icon: <Layout className="w-5 h-5" />, desc: "Edit text and images easily (Sanity/Strapi)." },
      { id: "advanced", label: "Advanced Admin Panel", price: 12000, time: 4, icon: <Database className="w-5 h-5" />, desc: "Full dashboard, user management, analytics." },
    ]
  },
  {
    id: "features",
    title: "Add-Ons & Integrations",
    subtitle: "Select everything you need.",
    multi: true,
    options: [
      { id: "auth", label: "User Login/Signup", price: 5000, time: 2, icon: <Lock className="w-5 h-5" />, desc: "Secure authentication & profiles." },
      { id: "payment", label: "Indian Payments", price: 4000, time: 2, icon: <CreditCard className="w-5 h-5" />, desc: "Razorpay / PhonePe integration." },
      { id: "intl_payment", label: "Intl. Payments", price: 6000, time: 2, icon: <Globe className="w-5 h-5" />, desc: "Stripe / PayPal setup." },
      { id: "seo", label: "Advanced SEO", price: 3000, time: 1, icon: <Search className="w-5 h-5" />, desc: "Meta tags, Sitemap, Schema markup." },
      { id: "analytics", label: "Analytics Setup", price: 1500, time: 0, icon: <BarChart3 className="w-5 h-5" />, desc: "Google Analytics / PostHog." },
      { id: "chat", label: "Live Chat / WhatsApp", price: 2000, time: 1, icon: <MessageSquare className="w-5 h-5" />, desc: "Customer support widget." },
      { id: "multi_lang", label: "Multi-Language", price: 8000, time: 3, icon: <Languages className="w-5 h-5" />, desc: "English + Hindi/Regional support." },
      { id: "ai", label: "AI Integration", price: 10000, time: 5, icon: <Cpu className="w-5 h-5" />, desc: "Chatbots, Text Gen, OpenAI API." },
    ]
  },
  {
    id: "timeline",
    title: "Delivery Speed",
    subtitle: "When do you need to launch?",
    options: [
      { id: "standard", label: "Standard Timeline", price: 0, time: 0, icon: <Server className="w-5 h-5" />, desc: "Normal pace, best price." },
      { id: "express", label: "Express Rush (+30%)", price: 0, multiplier: 1.3, time: -5, icon: <Rocket className="w-5 h-5 text-yellow-400" />, desc: "Priority development." },
    ]
  }
];

// --- HELPER COMPONENTS ---

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-white/5 h-1 mt-4 relative overflow-hidden">
      <motion.div 
        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}

// --- MAIN PAGE ---

export default function EstimatePage() {
  const [phase, setPhase] = useState<"type" | "config" | "review">("type");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  // Selection States
  const [projectType, setProjectType] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<string, any>>({ features: [] });
  
  // Results
  const [totalCost, setTotalCost] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [userEmail, setUserEmail] = useState("");

  // --- CALCULATION ENGINE ---
  useEffect(() => {
    if (!projectType) return;

    const typeDef = PROJECT_TYPES.find(t => t.id === projectType);
    if (!typeDef) return;

    let cost = typeDef.basePrice;
    let days = typeDef.baseTime;

    // Iterate through steps
    STEPS.forEach(step => {
      const userChoice = selections[step.id];
      if (!userChoice) return;

      if (step.multi && Array.isArray(userChoice)) {
        userChoice.forEach(choiceId => {
          const opt = step.options.find(o => o.id === choiceId);
          if (opt) {
            cost += opt.price;
            days += opt.time;
          }
        });
      } else {
        const opt = step.options?.find(o => o.id === userChoice);
        if (opt) {
          cost += opt.price;
          days += opt.time;
          if ((opt as any).multiplier) {
  cost = Math.round(cost * (opt as any).multiplier);
}
        }
      }
    });

    setTotalCost(cost);
    setTotalDays(Math.max(2, days)); // Minimum 2 days
  }, [projectType, selections]);

  // --- HANDLERS ---

  const selectType = (id: string) => {
    setProjectType(id);
    setPhase("config");
    setCurrentStepIndex(0);
  };

  const handleOptionSelect = (stepId: string, optionId: string, isMulti: boolean) => {
    setSelections(prev => {
      if (isMulti) {
        const current = (prev[stepId] as string[]) || [];
        const exists = current.includes(optionId);
        return {
          ...prev,
          [stepId]: exists ? current.filter(id => id !== optionId) : [...current, optionId]
        };
      }
      return { ...prev, [stepId]: optionId };
    });
  };

  const nextStep = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setPhase("review");
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    } else {
      setPhase("type");
    }
  };

  const generateTechStack = () => {
    if (!projectType) return [];
    const stack = ["Next.js", "Tailwind CSS"];
    
    if (projectType === "mobile") return ["Flutter", "Dart", "Firebase"];
    if (projectType === "webapp") stack.push("Node.js", "PostgreSQL");
    
    const feats = selections.features as string[];
    if (selections.cms === "basic") stack.push("Sanity CMS");
    if (selections.auth === "auth") stack.push("NextAuth");
    if (feats.includes("payment")) stack.push("Razorpay");
    if (feats.includes("ai")) stack.push("OpenAI API");
    
    return stack;
  };

  const handleSendWhatsapp = () => {
    const typeDef = PROJECT_TYPES.find(t => t.id === projectType);
    const text = `Hi Rachit, I want to build a *${typeDef?.title}*.
    
Est. Budget: ₹${totalCost.toLocaleString()}
Timeline: ~${totalDays} Days

Tech Stack: ${generateTechStack().join(", ")}

Let's discuss details!`;
    
    window.open(`https://wa.me/8240942827?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendEmail = () => {
      const subject = `Project Inquiry: ${PROJECT_TYPES.find(t => t.id === projectType)?.title} (₹${totalCost})`;
      const body = `Hi Rachit,\n\nI configured this project estimate on your portfolio:\n\nTYPE: ${PROJECT_TYPES.find(t => t.id === projectType)?.title}\nCOST: ₹${totalCost.toLocaleString()}\nTIME: ${totalDays} Days\n\nSTACK: ${generateTechStack().join(", ")}\n\nMy Email: ${userEmail}\n\nLet's talk!`;
      window.location.href = `mailto:rachitofficial77@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 flex flex-col relative overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* --- HEADER --- */}
      <header className="relative z-50 p-6 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
             <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
             <h1 className="text-sm font-bold tracking-widest uppercase text-gray-400">Project Estimator</h1>
             <div className="text-[10px] text-gray-600">v2.0 // India Region</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
           <div className="text-right">
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">Live Total</div>
              <div className="text-xl font-bold text-cyan-400 font-mono">₹{totalCost.toLocaleString()}</div>
           </div>
        </div>
      </header>

      {/* --- CONTENT AREA --- */}
      <div className="flex-grow flex flex-col md:flex-row relative z-10 overflow-hidden">
        
        {/* LEFT SCROLLABLE PANEL */}
        <div className="flex-grow overflow-y-auto p-6 md:p-12 pb-32 md:pb-12 scrollbar-hide">
           
           <AnimatePresence mode="wait">
             {/* PHASE 1: PROJECT TYPE */}
             {phase === "type" && (
               <motion.div 
                 key="type"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, x: -50 }}
                 className="max-w-5xl mx-auto"
               >
                 <h2 className="text-4xl md:text-5xl font-bold mb-6">What are we building?</h2>
                 <p className="text-xl text-gray-400 mb-12 max-w-2xl">Select the core foundation of your project. Base prices include standard setup and responsive design.</p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PROJECT_TYPES.map((type) => (
                       <button 
                         key={type.id}
                         onClick={() => selectType(type.id)}
                         className="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/50 text-left transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10"
                       >
                          <div className="mb-6 w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all">
                             {type.icon}
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{type.title}</h3>
                          <p className="text-sm text-gray-400 mb-6 leading-relaxed">{type.description}</p>
                          
                          <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                             <div className="px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-gray-300">
                                starts @ ₹{type.basePrice.toLocaleString()}
                             </div>
                             <div className="px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-gray-300">
                                ~{type.baseTime} Days
                             </div>
                          </div>
                       </button>
                    ))}
                 </div>
               </motion.div>
             )}

             {/* PHASE 2: CONFIGURATION */}
             {phase === "config" && (
               <motion.div 
                 key="config"
                 initial={{ opacity: 0, x: 50 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -50 }}
                 className="max-w-3xl mx-auto"
               >
                  {/* Step Progress */}
                  <div className="mb-12">
                     <div className="flex justify-between items-end mb-4">
                        <h2 className="text-3xl font-bold">{STEPS[currentStepIndex].title}</h2>
                        <span className="text-xs font-mono text-gray-500">STEP {currentStepIndex + 1}/{STEPS.length}</span>
                     </div>
                     <p className="text-lg text-gray-400">{STEPS[currentStepIndex].subtitle}</p>
                     <ProgressBar progress={((currentStepIndex + 1) / STEPS.length) * 100} />
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-4 mb-12">
                     {STEPS[currentStepIndex].options.map((opt) => {
                        const stepId = STEPS[currentStepIndex].id;
                        const isMulti = STEPS[currentStepIndex].multi;
                        const isSelected = isMulti 
                          ? (selections[stepId] as string[])?.includes(opt.id)
                          : selections[stepId] === opt.id;

                        return (
                           <button
                             key={opt.id}
                             onClick={() => handleOptionSelect(stepId, opt.id, !!isMulti)}
                             className={`flex items-center gap-6 p-6 rounded-2xl border transition-all duration-300 text-left group ${
                               isSelected 
                                 ? "bg-cyan-500/10 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.15)]" 
                                 : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10"
                             }`}
                           >
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-colors ${
                                 isSelected ? "bg-cyan-500 text-black" : "bg-white/5 text-gray-400 group-hover:text-white"
                              }`}>
                                 {opt.icon}
                              </div>
                              <div className="flex-grow">
                                 <div className="flex justify-between items-center mb-1">
                                    <h3 className={`font-bold text-lg ${isSelected ? "text-cyan-400" : "text-white"}`}>{opt.label}</h3>
                                    {isSelected && <Check className="w-5 h-5 text-cyan-400" />}
                                 </div>
                                 <p className="text-sm text-gray-400">{opt.desc}</p>
                              </div>
                              <div className="text-right min-w-[80px]">
                                 <div className="font-mono text-white">
                                    {opt.price === 0 ? "FREE" : `+₹${opt.price.toLocaleString()}`}
                                 </div>
                                 <div className="text-xs text-gray-500">
{(opt as any).multiplier ? `x${(opt as any).multiplier}` : opt.time > 0 ? `+${opt.time} Days` : ""}                                 </div>
                              </div>
                           </button>
                        );
                     })}
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-4">
                     <button onClick={prevStep} className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold">
                        Back
                     </button>
                     <button 
                       onClick={nextStep}
                       className="flex-grow px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                     >
                        {currentStepIndex === STEPS.length - 1 ? "Review Estimate" : "Next Step"}
                        <ChevronRight className="w-5 h-5" />
                     </button>
                  </div>
               </motion.div>
             )}

             {/* PHASE 3: REVIEW & CTA */}
             {phase === "review" && (
               <motion.div 
                 key="review"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="max-w-3xl mx-auto text-center"
               >
                  <div className="inline-block p-4 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 mb-8">
                     <Check className="w-8 h-8" />
                  </div>
                  <h2 className="text-5xl font-bold mb-4">You're Ready to Build.</h2>
                  <p className="text-xl text-gray-400 mb-12">Your custom project specification is complete. Choose how you want to proceed.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                     <button onClick={handleSendWhatsapp} className="p-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 hover:border-[#25D366] transition-all group text-left">
                        <div className="flex items-center gap-3 mb-2">
                           <MessageSquare className="w-6 h-6 text-[#25D366]" />
                           <span className="font-bold text-[#25D366]">WhatsApp Direct</span>
                        </div>
                        <p className="text-sm text-gray-400">Instant chat. Best for quick questions.</p>
                     </button>

                     <div className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-left">
                        <div className="flex items-center gap-3 mb-4">
                           <Mail className="w-6 h-6 text-cyan-400" />
                           <span className="font-bold text-cyan-400">Official Proposal</span>
                        </div>
                        <input 
                           type="email" 
                           placeholder="Enter your email" 
                           value={userEmail}
                           onChange={(e) => setUserEmail(e.target.value)}
                           className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 mb-3"
                        />
                        <button 
                          onClick={handleSendEmail}
                          disabled={!userEmail.includes("@")}
                          className="w-full py-2 bg-cyan-500 text-black font-bold text-sm rounded-lg hover:bg-cyan-400 disabled:opacity-50"
                        >
                           Send Inquiry
                        </button>
                     </div>
                  </div>

                  <button 
                    onClick={() => { setPhase("type"); setSelections({features:[]}); }} 
                    className="text-gray-500 hover:text-white text-sm flex items-center justify-center gap-2 mx-auto"
                  >
                     <RefreshCw className="w-4 h-4" /> Start New Estimate
                  </button>
               </motion.div>
             )}
           </AnimatePresence>

        </div>

        {/* RIGHT STICKY SIDEBAR (INVOICE) */}
        <div className="hidden lg:block w-[400px] bg-[#080a0f] border-l border-white/5 p-8 relative z-20 shadow-2xl">
           <div className="sticky top-8">
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Live Breakdown</h3>
                 {projectType && (
                    <span className="px-2 py-1 bg-cyan-900/30 text-cyan-400 text-[10px] rounded border border-cyan-500/20 uppercase font-bold">
                       {PROJECT_TYPES.find(t => t.id === projectType)?.title}
                    </span>
                 )}
              </div>

              {/* Line Items */}
              <div className="space-y-4 min-h-[300px]">
                 {/* Base Item */}
                 {projectType && (
                    <div className="flex justify-between items-start text-sm animate-fade-in">
                       <div>
                          <div className="text-white font-medium">Base Package</div>
                          <div className="text-xs text-gray-500">{PROJECT_TYPES.find(t => t.id === projectType)?.title}</div>
                       </div>
                       <div className="font-mono text-gray-300">₹{PROJECT_TYPES.find(t => t.id === projectType)?.basePrice.toLocaleString()}</div>
                    </div>
                 )}

                 {/* Add-ons */}
                 {Object.keys(selections).map(key => {
                    const stepDef = STEPS.find(s => s.id === key);
                    if (!stepDef) return null;
                    const vals = Array.isArray(selections[key]) ? selections[key] : [selections[key]];
                    if (!vals || vals.length === 0) return null;

                    return vals.map((vId: string) => {
                       const opt = stepDef.options.find((o: any) => o.id === vId);
                       if (!opt || opt.price === 0) return null;
                       return (
                          <div key={vId} className="flex justify-between items-start text-sm animate-fade-in">
                             <div>
                                <div className="text-gray-300">{opt.label}</div>
                                <div className="text-[10px] text-gray-600 uppercase">{stepDef.title}</div>
                             </div>
                             <div className="font-mono text-gray-400">+₹{opt.price.toLocaleString()}</div>
                          </div>
                       );
                    });
                 })}

                 {!projectType && (
                    <div className="text-center py-10 text-gray-600 text-sm italic">
                       Select a project type to start...
                    </div>
                 )}
              </div>

              {/* Summary Footer */}
              <div className="mt-8 pt-6 border-t border-white/10 bg-white/[0.02] -mx-8 -mb-8 p-8">
                 <div className="flex justify-between items-end mb-2">
                    <span className="text-gray-400 text-sm">Estimated Total</span>
                    <span className="text-3xl font-bold text-white tracking-tight">₹{totalCost.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-end">
                    <span className="text-gray-400 text-sm">Timeline</span>
                    <span className="text-sm font-mono text-cyan-400">~{totalDays} Working Days</span>
                 </div>
              </div>
           </div>
        </div>

        {/* MOBILE FOOTER TOTAL */}
        <div className="lg:hidden fixed bottom-0 left-0 w-full bg-[#080a0f] border-t border-white/10 p-4 z-50 flex justify-between items-center">
            <div>
               <div className="text-[10px] text-gray-500 uppercase">Total Estimate</div>
               <div className="text-xl font-bold text-white">₹{totalCost.toLocaleString()}</div>
            </div>
            {phase !== "review" && (
               <button onClick={nextStep} className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-xl text-sm">
                  Next Step
               </button>
            )}
        </div>

      </div>
    </main>
  );
}