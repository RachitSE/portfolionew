"use client";

import React, { useState, useEffect, useRef, useReducer } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { 
  ArrowLeft, Smartphone, Tablet, Laptop, Wifi, 
  WifiOff, Battery, BatteryCharging, Bluetooth, 
  Search, Bell, X, Minus, Maximize2, 
  Globe, Settings, Image as ImageIcon, MessageSquare, 
  Terminal, Activity, Layers, Cpu, Code2, 
  ChevronRight, ChevronLeft, RefreshCw, Lock, 
  Unlock, Moon, Sun, Monitor, Share2, Power, 
  Volume2, Mic
} from "lucide-react";

// --- 1. OS TYPES & CONFIG --- //

type AppID = "browser" | "settings" | "photos" | "messages" | "terminal";

interface WindowState {
  id: AppID;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

interface SystemState {
  device: "mobile" | "tablet";
  brightness: number;
  volume: number;
  wifi: boolean;
  bluetooth: boolean;
  airplane: boolean;
  theme: "dark" | "light";
  wallpaper: number;
  time: string;
}

const WALLPAPERS = [
  "linear-gradient(to bottom right, #2563eb, #9333ea)", // Default Blue/Purple
  "linear-gradient(to bottom, #000000, #434343)",       // Midnight
  "linear-gradient(to top right, #ff512f, #dd2476)",    // Sunset
  "linear-gradient(to bottom right, #059669, #10b981)", // Forest
];

// --- 2. MOCK DATA & APPS --- //

const MOCK_PHOTOS = [
  { color: "bg-red-500", label: "Design_V1.png" },
  { color: "bg-blue-500", label: "Meeting.jpg" },
  { color: "bg-green-500", label: "Wireframe.svg" },
  { color: "bg-yellow-500", label: "Logo.png" },
  { color: "bg-purple-500", label: "Dashboard.png" },
  { color: "bg-pink-500", label: "Team.jpg" },
];

const MOCK_CHATS = [
  { id: 1, sender: "Rachit", msg: "Did you check the latest deployment?", time: "10:02 AM", unread: true },
  { id: 2, sender: "Client A", msg: "The animations look buttery smooth!", time: "09:45 AM", unread: false },
  { id: 3, sender: "System", msg: "Server reboot scheduled for 2AM.", time: "Yesterday", unread: false },
];

// --- 3. SUB-COMPONENTS (THE APPS) --- //

// App: Browser (Safari-style)
const BrowserApp = ({ theme }: { theme: string }) => (
  <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-[#1a1a1a] text-white' : 'bg-gray-50 text-black'}`}>
    {/* Address Bar */}
    <div className={`p-3 border-b ${theme === 'dark' ? 'border-white/10 bg-[#2a2a2a]' : 'border-gray-200 bg-white'} flex gap-3 items-center sticky top-0 z-10`}>
       <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
       </div>
       <div className={`flex-grow flex items-center justify-center gap-2 text-xs py-1.5 rounded-lg font-mono opacity-70 ${theme === 'dark' ? 'bg-black/30' : 'bg-gray-100'}`}>
          <Lock className="w-3 h-3" />
          rachit.dev/projects
       </div>
       <RefreshCw className="w-4 h-4 opacity-50" />
    </div>
    
    {/* Web Content Mock */}
    <div className="flex-grow overflow-y-auto p-4 space-y-6">
       <div className="space-y-4">
          <div className="h-48 w-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-dashed border-cyan-500/30 flex items-center justify-center">
             <div className="text-center">
                <Globe className="w-12 h-12 mx-auto text-cyan-500 mb-2 opacity-50" />
                <div className="text-sm font-bold opacity-50">Moboflix Landing Page</div>
             </div>
          </div>
          <div className="space-y-2">
             <div className={`h-4 w-3/4 rounded ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
             <div className={`h-4 w-full rounded ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
             <div className={`h-4 w-5/6 rounded ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className={`h-32 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}`} />
             <div className={`h-32 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}`} />
          </div>
       </div>
    </div>
  </div>
);

// App: Settings
const SettingsApp = ({ sys, setSys }: { sys: SystemState, setSys: any }) => (
  <div className={`h-full flex flex-col ${sys.theme === 'dark' ? 'bg-black text-white' : 'bg-[#f2f2f7] text-black'}`}>
     <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        
        {/* Profile Card */}
        <div className={`flex items-center gap-4 p-4 rounded-xl mb-6 ${sys.theme === 'dark' ? 'bg-[#1c1c1e]' : 'bg-white shadow-sm'}`}>
           <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">R</div>
           <div>
              <div className="font-semibold">Rachit Singh</div>
              <div className="text-xs opacity-50">Apple ID, iCloud+ & Media</div>
           </div>
        </div>

        {/* Controls */}
        <div className={`rounded-xl overflow-hidden mb-6 ${sys.theme === 'dark' ? 'bg-[#1c1c1e]' : 'bg-white shadow-sm'}`}>
           <div className="flex items-center justify-between p-4 border-b border-gray-500/10">
              <div className="flex items-center gap-3">
                 <div className="w-7 h-7 rounded bg-blue-500 flex items-center justify-center text-white"><Wifi className="w-4 h-4" /></div>
                 <span>Wi-Fi</span>
              </div>
              <button onClick={() => setSys({ ...sys, wifi: !sys.wifi })} className={`w-10 h-6 rounded-full p-1 transition-colors ${sys.wifi ? 'bg-green-500' : 'bg-gray-500'}`}>
                 <div className={`w-4 h-4 bg-white rounded-full transition-transform ${sys.wifi ? 'translate-x-4' : ''}`} />
              </button>
           </div>
           <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                 <div className="w-7 h-7 rounded bg-blue-500 flex items-center justify-center text-white"><Bluetooth className="w-4 h-4" /></div>
                 <span>Bluetooth</span>
              </div>
              <span className="text-xs opacity-50">On</span>
           </div>
        </div>

        <div className={`rounded-xl overflow-hidden mb-6 ${sys.theme === 'dark' ? 'bg-[#1c1c1e]' : 'bg-white shadow-sm'}`}>
           <div className="flex items-center justify-between p-4 border-b border-gray-500/10">
              <div className="flex items-center gap-3">
                 <div className="w-7 h-7 rounded bg-purple-500 flex items-center justify-center text-white"><Moon className="w-4 h-4" /></div>
                 <span>Dark Mode</span>
              </div>
              <button onClick={() => setSys({ ...sys, theme: sys.theme === 'dark' ? 'light' : 'dark' })} className={`w-10 h-6 rounded-full p-1 transition-colors ${sys.theme === 'dark' ? 'bg-green-500' : 'bg-gray-500'}`}>
                 <div className={`w-4 h-4 bg-white rounded-full transition-transform ${sys.theme === 'dark' ? 'translate-x-4' : ''}`} />
              </button>
           </div>
           <div className="p-4">
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-7 h-7 rounded bg-cyan-500 flex items-center justify-center text-white"><ImageIcon className="w-4 h-4" /></div>
                 <span>Wallpaper</span>
              </div>
              <div className="flex gap-2 overflow-x-auto mt-3">
                 {WALLPAPERS.map((wp, i) => (
                    <button 
                      key={i}
                      onClick={() => setSys({ ...sys, wallpaper: i })}
                      className={`w-10 h-10 rounded-full border-2 ${sys.wallpaper === i ? 'border-blue-500' : 'border-transparent'}`}
                      style={{ background: wp }} 
                    />
                 ))}
              </div>
           </div>
        </div>
     </div>
  </div>
);

// App: Messages
const MessagesApp = ({ theme }: { theme: string }) => (
  <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
     <div className="p-4 border-b border-gray-500/10 flex justify-between items-center">
        <span className="text-blue-500 text-sm">Edit</span>
        <span className="font-bold">Messages</span>
        <span className="text-blue-500"><MessageSquare className="w-5 h-5" /></span>
     </div>
     <div className="flex-grow overflow-y-auto">
        {MOCK_CHATS.map(chat => (
           <div key={chat.id} className="flex gap-3 p-3 border-b border-gray-500/10 hover:bg-gray-500/5 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-gradient-to-b from-gray-300 to-gray-400 flex items-center justify-center text-white font-bold text-lg">
                 {chat.sender[0]}
              </div>
              <div className="flex-grow">
                 <div className="flex justify-between items-start">
                    <span className="font-bold text-sm">{chat.sender}</span>
                    <span className="text-xs opacity-50">{chat.time}</span>
                 </div>
                 <div className="flex justify-between items-center mt-1">
                    <span className="text-xs opacity-70 line-clamp-1 max-w-[180px]">{chat.msg}</span>
                    {chat.unread && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
                 </div>
              </div>
           </div>
        ))}
     </div>
  </div>
);

// --- 4. MAIN PAGE LOGIC --- //

export default function NexusStudio() {
  // SYSTEM STATE
  const [sys, setSys] = useState<SystemState>({
    device: "mobile",
    brightness: 100,
    volume: 75,
    wifi: true,
    bluetooth: true,
    airplane: false,
    theme: "dark",
    wallpaper: 0,
    time: "09:41"
  });

  // WINDOW MANAGER
  const [apps, setApps] = useState<WindowState[]>([
    { id: "settings", isOpen: false, isMinimized: false, zIndex: 1 },
    { id: "browser", isOpen: false, isMinimized: false, zIndex: 1 },
    { id: "messages", isOpen: false, isMinimized: false, zIndex: 1 },
    { id: "photos", isOpen: false, isMinimized: false, zIndex: 1 },
  ]);

  const [activeApp, setActiveApp] = useState<AppID | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const logsRef = useRef<HTMLDivElement>(null);

  // Time & Clock Tick
  useEffect(() => {
    const tick = setInterval(() => {
      setSys(prev => ({
        ...prev,
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: "2-digit" })
      }));
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  // Auto-scroll Logs
  useEffect(() => {
    logsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Actions
  const openApp = (id: AppID) => {
    setApps(prev => prev.map(app => 
      app.id === id 
        ? { ...app, isOpen: true, isMinimized: false, zIndex: 10 } 
        : { ...app, zIndex: 1 }
    ));
    setActiveApp(id);
    addLog(`Process started: com.rachit.${id}`);
  };

  const closeApp = (id: AppID) => {
    setApps(prev => prev.map(app => app.id === id ? { ...app, isOpen: false } : app));
    setActiveApp(null);
    addLog(`Process terminated: com.rachit.${id} (SIGKILL)`);
  };

  const minimizeApp = (id: AppID) => {
    setApps(prev => prev.map(app => app.id === id ? { ...app, isMinimized: true } : app));
    setActiveApp(null);
    addLog(`Process backgrounded: com.rachit.${id}`);
  };

  const addLog = (msg: string) => {
    const ts = new Date().toISOString().split('T')[1].slice(0, 8);
    setLogs(prev => [`[${ts}] ${msg}`, ...prev.slice(0, 20)]);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 flex flex-col overflow-hidden">
      
      {/* BACKGROUND STUDIO LIGHTING */}
      <div className="absolute inset-0 bg-[#050505]">
         <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
         <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[150px] pointer-events-none" />
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />
      </div>

      {/* --- HEADER --- */}
      <nav className="relative z-50 h-16 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md flex items-center justify-between px-6">
         <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-xs uppercase tracking-widest group">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
           Studio Exit
         </Link>
         
         <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font-mono text-gray-400">
               NEXUS_OS v2.4.0
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex gap-3 text-gray-400">
               <Wifi className={`w-4 h-4 ${sys.wifi ? 'text-green-500' : 'opacity-30'}`} />
               <Bluetooth className={`w-4 h-4 ${sys.bluetooth ? 'text-blue-500' : 'opacity-30'}`} />
               <BatteryCharging className="w-4 h-4 text-yellow-500" />
            </div>
         </div>
      </nav>

      {/* --- WORKSPACE --- */}
      <div className="flex-grow flex flex-col lg:flex-row h-[calc(100vh-64px)] relative z-10">
         
         {/* LEFT PANEL: STUDIO CONTROLS */}
         <aside className="w-full lg:w-80 border-r border-white/10 bg-[#080808]/90 backdrop-blur-xl flex flex-col z-20">
            <div className="p-6 space-y-8 overflow-y-auto">
               
               {/* 1. Device Selection */}
               <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Viewport</h3>
                  <div className="grid grid-cols-2 gap-3">
                     {["mobile", "tablet"].map((d) => (
                        <button
                           key={d}
                           onClick={() => { setSys({ ...sys, device: d as any }); addLog(`Switched target: ${d.toUpperCase()}`); }}
                           className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                              sys.device === d 
                                ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]" 
                                : "bg-white/5 border-white/5 text-gray-500 hover:bg-white/10"
                           }`}
                        >
                           {d === 'mobile' ? <Smartphone className="w-6 h-6" /> : <Tablet className="w-6 h-6" />}
                           <span className="text-[10px] font-bold uppercase">{d}</span>
                        </button>
                     ))}
                  </div>
               </div>

               {/* 2. Environment Sliders */}
               <div className="space-y-4">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Environment</h3>
                  
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-4">
                     <div className="space-y-2">
                        <div className="flex justify-between text-[10px] text-gray-400">
                           <span className="flex items-center gap-2"><Sun className="w-3 h-3" /> Brightness</span>
                           <span>{sys.brightness}%</span>
                        </div>
                        <input 
                           type="range" min="20" max="120" value={sys.brightness}
                           onChange={(e) => setSys({ ...sys, brightness: parseInt(e.target.value) })}
                           className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                     </div>
                     <div className="space-y-2">
                        <div className="flex justify-between text-[10px] text-gray-400">
                           <span className="flex items-center gap-2"><Volume2 className="w-3 h-3" /> System Volume</span>
                           <span>{sys.volume}%</span>
                        </div>
                        <input 
                           type="range" min="0" max="100" value={sys.volume}
                           onChange={(e) => setSys({ ...sys, volume: parseInt(e.target.value) })}
                           className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                     </div>
                  </div>
               </div>

               {/* 3. DevTools / Logs */}
               <div className="space-y-3 flex-grow">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex justify-between">
                     <span>Kernel Logs</span>
                     <Activity className="w-3 h-3 text-green-500 animate-pulse" />
                  </h3>
                  <div className="h-48 bg-black rounded-xl border border-white/10 p-3 font-mono text-[10px] overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-white/20">
                     {logs.map((log, i) => (
                        <div key={i} className="text-gray-400 break-all border-l-2 border-transparent hover:border-cyan-500 pl-2 transition-colors">
                           <span className="text-gray-600 mr-2">{log.split("]")[0]}]</span>
                           <span className={log.includes("terminated") ? "text-red-400" : "text-cyan-300"}>
                              {log.split("]")[1]}
                           </span>
                        </div>
                     ))}
                     <div ref={logsRef} />
                  </div>
               </div>

            </div>
         </aside>

         {/* CENTER PANEL: THE STAGE */}
         <div className="flex-grow relative flex items-center justify-center bg-[#0a0a0a] overflow-hidden perspective-[2000px]">
            
            {/* The Device */}
            <motion.div
               layout
               initial={false}
               animate={{
                  width: sys.device === 'mobile' ? 390 : 820,
                  height: sys.device === 'mobile' ? 800 : 600,
                  borderRadius: sys.device === 'mobile' ? 50 : 30,
               }}
               transition={{ type: "spring", stiffness: 120, damping: 20 }}
               className={`
                  relative bg-black border-[8px] border-[#1a1a1a] shadow-2xl z-10 overflow-hidden
                  ring-1 ring-white/10
               `}
               style={{ 
                  boxShadow: "0 0 0 2px #222, 0 50px 100px -20px rgba(0,0,0,0.7)",
                  filter: `brightness(${sys.brightness}%)` 
               }}
            >
               {/* HARDWARE: Notch / Dynamic Island */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
                  <motion.div 
                     animate={{ 
                        width: sys.device === 'mobile' ? 120 : 0, 
                        height: sys.device === 'mobile' ? 35 : 0,
                        opacity: sys.device === 'mobile' ? 1 : 0
                     }}
                     className="bg-black rounded-b-2xl flex items-center justify-center gap-3 overflow-hidden"
                  >
                     <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] border border-[#333]" />
                     <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                  </motion.div>
               </div>

               {/* SCREEN CONTENT */}
               <div 
                  className="w-full h-full relative overflow-hidden bg-cover bg-center transition-all duration-500"
                  style={{ background: WALLPAPERS[sys.wallpaper] }}
               >
                  
                  {/* Status Bar */}
                  <div className={`absolute top-0 w-full p-4 flex justify-between items-start z-40 text-xs font-bold mix-blend-overlay text-white`}>
                     <span>{sys.time}</span>
                     <div className="flex gap-1.5">
                        <Wifi className="w-4 h-4" />
                        <Battery className="w-4 h-4" />
                     </div>
                  </div>

                  {/* OS: HOME SCREEN */}
                  <div className="absolute inset-0 pt-16 pb-24 px-6 flex flex-col justify-between z-0">
                     {/* Widgets */}
                     <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-white shadow-lg">
                           <div className="text-xs uppercase opacity-70 mb-1">Kolkata</div>
                           <div className="text-3xl font-light">28°</div>
                           <div className="text-xs mt-2 flex items-center gap-1"><Sun className="w-3 h-3" /> Sunny</div>
                        </div>
                        <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 text-white shadow-lg">
                           <div className="text-xs uppercase opacity-70 mb-1">Battery</div>
                           <div className="text-3xl font-light text-green-400">92%</div>
                           <div className="text-xs mt-2">Optimal</div>
                        </div>
                     </div>

                     {/* App Grid */}
                     <div className="grid grid-cols-4 gap-y-6 gap-x-4">
                        {apps.map((app) => {
                           const Icon = app.id === 'settings' ? Settings : app.id === 'browser' ? Globe : app.id === 'messages' ? MessageSquare : ImageIcon;
                           const color = app.id === 'settings' ? 'bg-gray-500' : app.id === 'browser' ? 'bg-blue-500' : app.id === 'messages' ? 'bg-green-500' : 'bg-pink-500';
                           
                           return (
                              <button 
                                 key={app.id} 
                                 onClick={() => openApp(app.id)}
                                 className="flex flex-col items-center gap-2 group"
                              >
                                 <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform`}>
                                    <Icon className="w-7 h-7" />
                                 </div>
                                 <span className="text-[10px] font-medium text-white drop-shadow-md capitalize">{app.id}</span>
                              </button>
                           )
                        })}
                     </div>
                  </div>

                  {/* OS: WINDOW MANAGER (The Magic) */}
                  <AnimatePresence>
                     {apps.map((app) => (
                        app.isOpen && !app.isMinimized && (
                           <motion.div
                              key={app.id}
                              initial={{ y: "100%", opacity: 0, scale: 0.9 }}
                              animate={{ y: 0, opacity: 1, scale: 1 }}
                              exit={{ y: "20%", opacity: 0, scale: 0.9 }}
                              transition={{ type: "spring", damping: 25, stiffness: 200 }}
                              className="absolute inset-0 bg-black z-20 flex flex-col"
                              style={{ zIndex: app.zIndex }}
                           >
                              {/* Fake 'Home Indicator' Area for Gestures */}
                              <div className="flex-grow relative overflow-hidden bg-white">
                                 {app.id === 'browser' && <BrowserApp theme={sys.theme} />}
                                 {app.id === 'settings' && <SettingsApp sys={sys} setSys={setSys} />}
                                 {app.id === 'messages' && <MessagesApp theme={sys.theme} />}
                                 
                                 {app.id === 'photos' && (
                                    <div className={`h-full p-4 overflow-y-auto ${sys.theme === 'dark' ? 'bg-black text-white' : 'bg-white'}`}>
                                       <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                                       <div className="grid grid-cols-3 gap-1">
                                          {MOCK_PHOTOS.map((p, i) => (
                                             <div key={i} className={`aspect-square ${p.color} rounded-sm opacity-80`} />
                                          ))}
                                       </div>
                                    </div>
                                 )}
                              </div>

                              {/* Gesture Bar (Click to close) */}
                              <div 
                                onClick={() => closeApp(app.id)}
                                className={`h-6 w-full absolute bottom-0 z-50 flex justify-center items-center cursor-pointer ${sys.theme === 'dark' ? 'bg-black' : 'bg-white'}`}
                              >
                                 <div className="w-1/3 h-1 bg-gray-300 rounded-full" />
                              </div>
                           </motion.div>
                        )
                     ))}
                  </AnimatePresence>

                  {/* OS: DOCK */}
                  <div className="absolute bottom-4 left-4 right-4 h-20 bg-white/20 backdrop-blur-xl rounded-[2rem] flex items-center justify-evenly px-4 border border-white/10 z-10">
                     {["browser", "messages", "photos", "settings"].map((id) => {
                        const app = apps.find(a => a.id === id);
                        const Icon = id === 'settings' ? Settings : id === 'browser' ? Globe : id === 'messages' ? MessageSquare : ImageIcon;
                        const color = id === 'settings' ? 'bg-gray-500' : id === 'browser' ? 'bg-blue-500' : id === 'messages' ? 'bg-green-500' : 'bg-pink-500';
                        
                        return (
                           <button 
                              key={id} 
                              onClick={() => app?.isOpen ? minimizeApp(id as AppID) : openApp(id as AppID)}
                              className="relative group"
                           >
                              <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white shadow-lg group-hover:-translate-y-2 transition-transform`}>
                                 <Icon className="w-6 h-6" />
                              </div>
                              {app?.isOpen && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />}
                           </button>
                        )
                     })}
                  </div>

               </div>
            </motion.div>

            {/* Floor Reflection */}
            <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[400px] h-[50px] bg-white/5 blur-[60px] rounded-full pointer-events-none" />

         </div>

      </div>
    </main>
  );
}