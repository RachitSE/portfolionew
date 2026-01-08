"use client";

import React, { useState, useEffect, useRef, useReducer, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Server, Database, Globe, Activity, 
  Cpu, AlertTriangle, ShieldCheck, Zap, Terminal, 
  Cloud, Lock, RefreshCw, XCircle, CheckCircle2,
  TrendingUp, DollarSign, Layers, Box, Settings,
  ShieldAlert, Globe2, Play, Pause, ChevronDown,
  HardDrive, Network, Wifi, Minimize2, Maximize2
} from "lucide-react";

// --- 1. SYSTEM CONFIGURATION & TYPES --- //

type NodeType = "lb" | "web" | "api" | "redis" | "db_primary" | "db_replica" | "firewall";
type Region = "us-east-1" | "ap-south-1" | "eu-central-1";
type DeploymentState = "idle" | "deploying" | "rollback" | "success";
type DefconLevel = 5 | 4 | 3 | 2 | 1;

interface CloudNode {
  id: string;
  type: NodeType;
  region: Region;
  version: "v1.0" | "v2.0";
  status: "healthy" | "stress" | "critical" | "draining" | "booting" | "dead";
  cpu: number;
  memory: number;
  requests: number;
  temperature: number;
}

interface TrafficParticle {
  id: number;
  type: "user" | "malicious" | "data";
  path: "ingress" | "internal" | "egress";
  progress: number; // 0 to 100
  targetId: string;
}

interface LogEntry {
  id: number;
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR" | "SUCCESS" | "SECURITY";
  source: string;
  message: string;
}

// --- 2. SUB-COMPONENTS (THE "LEGO BLOCKS") --- //

// A. ISOMETRIC SERVER UNIT (The "Blade")
const ServerBlade = ({ 
  node, 
  isHovered, 
  onClick 
}: { 
  node: CloudNode, 
  isHovered: boolean, 
  onClick: (id: string) => void 
}) => {
  
  // Status Color Logic
  const getStatusColor = () => {
    if (node.status === 'dead') return "bg-gray-800 border-gray-700";
    if (node.status === 'critical') return "bg-red-900/40 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]";
    if (node.status === 'stress') return "bg-yellow-900/40 border-yellow-500";
    if (node.status === 'booting') return "bg-blue-900/40 border-blue-500 animate-pulse";
    if (node.status === 'draining') return "bg-purple-900/40 border-purple-500 opacity-50";
    return "bg-cyan-950/40 border-cyan-500/50 hover:border-cyan-400";
  };

  return (
    <motion.div
      layoutId={node.id}
      onClick={() => onClick(node.id)}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className={`
        relative w-28 h-32 group cursor-pointer perspective-1000 transition-all duration-300
      `}
    >
      {/* 3D SERVER CHASSIS */}
      <div className={`
        absolute inset-0 border backdrop-blur-md rounded-lg flex flex-col items-center justify-between p-2
        transition-all duration-300 transform group-hover:-translate-y-2
        ${getStatusColor()}
      `}>
        {/* Header: ID & Version */}
        <div className="w-full flex justify-between items-center border-b border-white/10 pb-1">
          <span className="text-[9px] font-mono text-gray-400">{node.id.split('-').pop()}</span>
          <span className={`text-[8px] font-bold px-1 rounded ${node.version === 'v1.0' ? 'bg-gray-700' : 'bg-green-600'}`}>
            {node.version}
          </span>
        </div>

        {/* Center: Icon & Load */}
        <div className="flex-grow flex flex-col items-center justify-center gap-1">
          {node.type === 'db_primary' || node.type === 'db_replica' ? (
            <Database className={`w-6 h-6 ${node.status === 'healthy' ? 'text-green-400' : 'text-red-400'}`} />
          ) : node.type === 'redis' ? (
            <Layers className="w-6 h-6 text-red-400" />
          ) : (
            <Server className={`w-6 h-6 ${node.status === 'healthy' ? 'text-cyan-400' : 'text-yellow-400'}`} />
          )}
          
          <div className="w-full h-1 bg-gray-800 rounded-full mt-2 overflow-hidden">
             <div 
               className={`h-full transition-all duration-300 ${node.cpu > 90 ? 'bg-red-500' : 'bg-cyan-500'}`} 
               style={{ width: `${node.cpu}%` }} 
             />
          </div>
          <div className="text-[9px] font-mono text-gray-500">{node.cpu}% LOAD</div>
        </div>

        {/* Footer: Status LEDs */}
        <div className="w-full flex justify-between items-center pt-1 border-t border-white/10">
           <div className="flex gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${node.status === 'dead' ? 'bg-red-900' : 'bg-green-500 animate-pulse'}`} />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
           </div>
           <Activity className={`w-3 h-3 ${node.requests > 100 ? 'text-white animate-bounce' : 'text-gray-600'}`} />
        </div>
      </div>

      {/* HOVER DATA CARD (The "Hologram") */}
      <AnimatePresence>
        {isHovered && (
           <motion.div 
             initial={{ opacity: 0, y: 10, scale: 0.9 }}
             animate={{ opacity: 1, y: -20, scale: 1 }}
             exit={{ opacity: 0 }}
             className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 bg-black/90 border border-cyan-500/30 p-3 rounded-xl z-50 pointer-events-none shadow-[0_0_30px_rgba(6,182,212,0.2)]"
           >
              <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-1">
                 <Terminal className="w-3 h-3 text-cyan-500" />
                 <span className="text-[10px] font-bold text-cyan-500 uppercase">Node Telemetry</span>
              </div>
              <div className="space-y-1 font-mono text-[9px]">
                 <div className="flex justify-between"><span className="text-gray-500">MEM_USAGE</span> <span>{node.memory}MB</span></div>
                 <div className="flex justify-between"><span className="text-gray-500">TEMP</span> <span className={node.temperature > 80 ? "text-red-500" : "text-green-500"}>{node.temperature}°C</span></div>
                 <div className="flex justify-between"><span className="text-gray-500">THREADS</span> <span>{Math.floor(node.requests / 2)}</span></div>
                 <div className="flex justify-between"><span className="text-gray-500">REGION</span> <span className="text-yellow-500">{node.region}</span></div>
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// B. TRAFFIC PARTICLE SYSTEM
const ParticleLayer = ({ particles }: { particles: TrafficParticle[] }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
     {particles.map((p) => (
       <motion.div
         key={p.id}
         initial={false}
         animate={{
           left: `${p.progress}%`,
           top: p.path === 'ingress' ? '20%' : p.path === 'internal' ? '50%' : '80%',
           opacity: [0, 1, 0]
         }}
         transition={{ duration: 1, ease: "linear" }}
         className={`
           absolute w-1.5 h-1.5 rounded-full shadow-[0_0_10px_currentColor]
           ${p.type === 'malicious' ? 'bg-red-500 text-red-500' : p.type === 'data' ? 'bg-green-400 text-green-400' : 'bg-cyan-400 text-cyan-400'}
         `}
       />
     ))}
  </div>
);

// --- 3. MAIN SIMULATION ENGINE --- //

export default function WarRoom() {
  
  // --- STATE: INFRASTRUCTURE ---
  const [region, setRegion] = useState<Region>("us-east-1");
  const [nodes, setNodes] = useState<CloudNode[]>([]);
  const [particles, setParticles] = useState<TrafficParticle[]>([]);
  
  // --- STATE: METRICS & CONTROLS ---
  const [trafficLoad, setTrafficLoad] = useState(20); // 0-100 slider
  const [isWafEnabled, setIsWafEnabled] = useState(true);
  const [deploymentState, setDeploymentState] = useState<DeploymentState>("idle");
  const [defcon, setDefcon] = useState<DefconLevel>(5);
  const [cost, setCost] = useState(145.20);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  
  // --- STATE: UI ---
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const logsRef = useRef<HTMLDivElement>(null);
  const [showGrid, setShowGrid] = useState(true);

  // --- INITIALIZER ---
  useEffect(() => {
     // Boot up initial cluster
     const initialNodes: CloudNode[] = [
       { id: "lb-01", type: "lb", region, version: "v1.0", status: "healthy", cpu: 12, memory: 256, requests: 0, temperature: 45 },
       { id: "waf-01", type: "firewall", region, version: "v1.0", status: "healthy", cpu: 5, memory: 128, requests: 0, temperature: 40 },
       { id: "web-01", type: "web", region, version: "v1.0", status: "healthy", cpu: 20, memory: 512, requests: 0, temperature: 50 },
       { id: "web-02", type: "web", region, version: "v1.0", status: "healthy", cpu: 18, memory: 512, requests: 0, temperature: 49 },
       { id: "api-01", type: "api", region, version: "v1.0", status: "healthy", cpu: 15, memory: 1024, requests: 0, temperature: 52 },
       { id: "redis-01", type: "redis", region, version: "v1.0", status: "healthy", cpu: 8, memory: 2048, requests: 0, temperature: 38 },
       { id: "db-pri", type: "db_primary", region, version: "v1.0", status: "healthy", cpu: 12, memory: 4096, requests: 0, temperature: 42 },
     ];
     setNodes(initialNodes);
     addLog("INFO", "SYSTEM", "Cluster initialized in region: " + region);
  }, []); // Run once on mount

  // --- HELPER: LOGGING ---
  const addLog = (level: LogEntry['level'], source: string, message: string) => {
    setLogs(prev => [
      { id: Date.now(), timestamp: new Date().toISOString().split('T')[1].slice(0,8), level, source, message },
      ...prev.slice(0, 49) // Keep last 50 logs
    ]);
  };

  // --- SIMULATION TICK (RUNS EVERY 500ms) ---
  useEffect(() => {
    const interval = setInterval(() => {
      
      // 1. GENERATE TRAFFIC
      const isUnderAttack = defcon === 1;
      const baseLoad = trafficLoad + (isUnderAttack ? 200 : 0);
      
      // Spawn particles
      if (Math.random() > 0.5) {
         const newParticle: TrafficParticle = {
            id: Date.now(),
            type: isUnderAttack ? (isWafEnabled ? "malicious" : "user") : "user", // Simplified visual logic
            path: "ingress",
            progress: 0,
            targetId: "lb-01"
         };
         setParticles(prev => [...prev.slice(-20), newParticle]);
      }

      // 2. UPDATE NODES
      setNodes(prev => prev.map(node => {
         if (node.status === 'dead') return node;

         // Load Calculation
         let load = baseLoad / (prev.filter(n => n.type === node.type).length || 1);
         if (node.type === 'firewall' && isUnderAttack) load *= 2; // WAF works hard during attack
         if (node.type === 'db_primary') load *= 0.5;

         // Variance
         load += Math.random() * 10 - 5;
         
         // WAF Protection Logic
         if (node.type !== 'firewall' && isUnderAttack && !isWafEnabled) {
            load = 100; // System crash if no WAF
         }

         // Status Logic
         let status: CloudNode['status'] = node.status === 'booting' ? 'booting' : 'healthy';
         if (load > 90) status = 'critical';
         else if (load > 70) status = 'stress';

         if (node.status === 'booting' && Math.random() > 0.7) {
            status = 'healthy';
            addLog("SUCCESS", "AUTOSCALER", `Node ${node.id} is online.`);
         }

         return {
            ...node,
            cpu: Math.min(100, Math.max(0, Math.floor(load))),
            temperature: 40 + (load * 0.4),
            status,
            requests: Math.floor(load * 12)
         };
      }));

      // 3. AUTO-SCALING LOGIC
      const webNodes = nodes.filter(n => n.type === 'web' && n.status !== 'dead');
      const avgCpu = webNodes.reduce((acc, n) => acc + n.cpu, 0) / webNodes.length;
      
      if (avgCpu > 80 && webNodes.length < 8) {
         // Scale Up
         const id = `web-0${nodes.length + 1}`;
         setNodes(prev => [...prev, {
            id, type: 'web', region, version: 'v1.0', status: 'booting',
            cpu: 0, memory: 512, requests: 0, temperature: 30
         }]);
         addLog("WARN", "AUTOSCALER", `High load detected. Provisioning ${id}...`);
      }

      // 4. COST CALCULATION
      setCost(prev => prev + (nodes.length * 0.005));

    }, 800);
    return () => clearInterval(interval);
  }, [trafficLoad, defcon, isWafEnabled, nodes, region]);

  // --- ACTIONS ---

  const triggerAttack = () => {
     if (defcon === 1) {
        setDefcon(5);
        addLog("INFO", "SECURITY", "Threat neutralized. DEFCON level normal.");
     } else {
        setDefcon(1);
        addLog("SECURITY", "NETWORK", "DDoS SIGNATURE DETECTED! INCOMING FLOOD!");
     }
  };

  const deployVersion = () => {
     if (deploymentState !== 'idle') return;
     setDeploymentState("deploying");
     addLog("INFO", "CI/CD", "Starting Blue/Green Deployment (v2.0)...");
     
     // Simulate Rolling Update
     let step = 0;
     const deployInterval = setInterval(() => {
        setNodes(prev => {
           const newNodes = [...prev];
           const target = newNodes.filter(n => n.type === 'web' && n.version === 'v1.0')[0];
           if (target) {
              target.version = 'v2.0';
              target.status = 'booting';
              addLog("INFO", "DEPLOY", `Rolling update: ${target.id} updated to v2.0`);
           } else {
              clearInterval(deployInterval);
              setDeploymentState("success");
              addLog("SUCCESS", "CI/CD", "Deployment v2.0 completed successfully.");
              setTimeout(() => setDeploymentState("idle"), 2000);
           }
           return newNodes;
        });
     }, 1000);
  };

  const killNode = (id: string) => {
     setNodes(prev => prev.map(n => {
        if (n.id === id) {
           addLog("ERROR", "CHAOS", `Manual termination of ${id}`);
           return { ...n, status: 'dead', cpu: 0, requests: 0 };
        }
        return n;
     }));
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500/30 flex flex-col overflow-hidden">
       
       {/* --- 1. COMMAND HEADER --- */}
       <header className="h-16 border-b border-white/10 bg-[#0a0a0a] flex justify-between items-center px-6 relative z-50">
          <div className="flex items-center gap-4">
             <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-widest group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                HQ
             </Link>
             <div className="h-6 w-px bg-white/10" />
             <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <span className="font-mono text-sm font-bold text-gray-300">INFRA_MAP_V4</span>
             </div>
          </div>

          {/* Global Status Ticker */}
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-3 bg-black/50 px-4 py-1.5 rounded-full border border-white/10">
                <div className={`w-2 h-2 rounded-full ${defcon === 1 ? 'bg-red-500 animate-ping' : 'bg-green-500'}`} />
                <span className={`text-xs font-bold tracking-widest ${defcon === 1 ? 'text-red-500' : 'text-gray-400'}`}>
                   DEFCON {defcon}
                </span>
             </div>
             <div className="text-right">
                <div className="text-[10px] text-gray-500 uppercase">Current Bill</div>
                <div className="text-sm font-mono text-yellow-400">${cost.toFixed(2)}</div>
             </div>
          </div>
       </header>

       {/* --- 2. MAIN WORKSPACE --- */}
       <div className="flex-grow flex h-[calc(100vh-64px)]">
          
          {/* LEFT: CONFIGURATION PANEL */}
          <aside className="w-80 border-r border-white/10 bg-[#050505] flex flex-col z-40">
             <div className="p-6 space-y-8 overflow-y-auto">
                
                {/* A. Region Selector */}
                <div className="space-y-3">
                   <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Globe2 className="w-3 h-3" /> Availability Zone
                   </div>
                   <div className="grid grid-cols-2 gap-2">
                      {["us-east-1", "eu-central-1"].map((r) => (
                         <button
                           key={r}
                           onClick={() => { setRegion(r as Region); addLog("INFO", "ROUTER", `Region switched to ${r}`); }}
                           className={`p-3 rounded border flex flex-col items-center gap-1 transition-all ${
                              region === r 
                                ? "bg-cyan-950/30 border-cyan-500/50 text-cyan-400" 
                                : "bg-white/5 border-transparent text-gray-500 hover:border-white/20"
                           }`}
                         >
                            <span className="text-xs font-bold uppercase">{r.split('-')[0]}</span>
                            <span className="text-[9px] opacity-50">{r}</span>
                         </button>
                      ))}
                   </div>
                </div>

                {/* B. Traffic Control */}
                <div className="space-y-4 p-4 rounded-xl border border-white/5 bg-white/5">
                   <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>Inbound Traffic</span>
                      <span className="text-cyan-400 font-mono">{trafficLoad * 100} RPS</span>
                   </div>
                   <input 
                     type="range" min="0" max="100" value={trafficLoad}
                     onChange={(e) => setTrafficLoad(parseInt(e.target.value))}
                     className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>

                {/* C. Operations Deck */}
                <div className="space-y-3">
                   <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Settings className="w-3 h-3" /> Ops Deck
                   </div>
                   
                   <button 
                     onClick={() => setIsWafEnabled(!isWafEnabled)}
                     className={`w-full p-3 rounded border flex items-center justify-between transition-all ${
                        isWafEnabled ? "bg-blue-900/20 border-blue-500 text-blue-400" : "bg-red-900/10 border-red-500/50 text-red-500"
                     }`}
                   >
                      <div className="flex items-center gap-2 text-xs font-bold">
                         <ShieldCheck className="w-4 h-4" /> WAF Shield
                      </div>
                      <div className={`w-2 h-2 rounded-full ${isWafEnabled ? 'bg-blue-500' : 'bg-red-500'}`} />
                   </button>

                   <button 
                     onClick={deployVersion}
                     disabled={deploymentState !== 'idle'}
                     className={`w-full p-3 rounded border border-white/10 flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                        deploymentState === 'deploying' ? 'bg-yellow-500/10 text-yellow-500 animate-pulse' : 'bg-white/5 hover:bg-white/10 text-white'
                     }`}
                  >
                     <RefreshCw className={`w-4 h-4 ${deploymentState === 'deploying' ? 'animate-spin' : ''}`} />
                     {deploymentState === 'deploying' ? "ROLLING UPDATE..." : "DEPLOY V2.0"}
                  </button>

                  <button 
                     onClick={triggerAttack}
                     className={`w-full p-4 rounded border flex items-center justify-center gap-2 text-xs font-bold transition-all mt-4 ${
                        defcon === 1 
                          ? "bg-red-500 text-white animate-pulse shadow-[0_0_20px_red]" 
                          : "bg-red-950/30 border-red-900 text-red-500 hover:bg-red-900/50"
                     }`}
                  >
                     <ShieldAlert className="w-4 h-4" />
                     {defcon === 1 ? "MITIGATE ATTACK" : "SIMULATE DDoS"}
                  </button>
                </div>

             </div>
          </aside>

          {/* CENTER: THE HOLODECK (3D VISUALIZATION) */}
          <main className="flex-grow relative bg-[#020202] overflow-hidden perspective-2000 group">
             
             {/* 1. Environment Layers */}
             <div className="absolute inset-0 z-0 opacity-20 transition-transform duration-1000 group-hover:scale-110" 
                  style={{ 
                     backgroundImage: `radial-gradient(circle at 50% 50%, #111 0%, transparent 50%), linear-gradient(0deg, transparent 24%, #222 25%, #222 26%, transparent 27%, transparent 74%, #222 75%, #222 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #222 25%, #222 26%, transparent 27%, transparent 74%, #222 75%, #222 76%, transparent 77%, transparent)`,
                     backgroundSize: '50px 50px',
                     transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)'
                  }} 
             />
             
             {/* 2. Attack Overlay */}
             {defcon === 1 && (
                <div className="absolute inset-0 z-0 bg-red-900/10 animate-pulse pointer-events-none" />
             )}

             {/* 3. The Node Graph */}
             <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="relative w-full max-w-5xl h-[600px] flex flex-col justify-between py-10">
                   
                   {/* ROW 1: INGRESS (LB & WAF) */}
                   <div className="flex justify-center gap-12 relative">
                      {isWafEnabled && (
                         <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-center">
                            <motion.div 
                              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                              className="px-3 py-1 bg-blue-500/20 border border-blue-500 rounded-full text-[10px] text-blue-400 font-bold backdrop-blur"
                            >
                               EDGE PROTECTION ACTIVE
                            </motion.div>
                         </div>
                      )}
                      {nodes.filter(n => n.type === 'firewall' || n.type === 'lb').map(node => (
                         <ServerBlade key={node.id} node={node} isHovered={hoveredNode === node.id} onClick={killNode} />
                      ))}
                      
                      {/* Particles Ingress */}
                      <ParticleLayer particles={particles.filter(p => p.path === 'ingress')} />
                   </div>

                   {/* Connector */}
                   <div className="flex justify-center h-20 relative">
                      <div className="w-px h-full bg-gradient-to-b from-cyan-500/50 to-transparent" />
                      {defcon === 1 && <div className="absolute inset-0 bg-red-500/20 w-1 mx-auto animate-pulse" />}
                   </div>

                   {/* ROW 2: COMPUTE (Web & API) */}
                   <div className="flex justify-center gap-8 flex-wrap relative px-10">
                      <div className="absolute inset-0 border border-white/5 rounded-3xl bg-white/5 -z-10" />
                      <div className="absolute -top-3 left-6 text-[10px] text-gray-500 uppercase tracking-widest bg-[#020202] px-2">
                         Compute Cluster (Auto-Scaling)
                      </div>
                      
                      {nodes.filter(n => n.type === 'web' || n.type === 'api').map(node => (
                         <ServerBlade key={node.id} node={node} isHovered={hoveredNode === node.id} onClick={killNode} />
                      ))}
                   </div>

                   {/* Connector */}
                   <div className="flex justify-center h-20 relative">
                       <div className="w-px h-full bg-gradient-to-b from-transparent to-cyan-500/50" />
                   </div>

                   {/* ROW 3: DATA (DB & Redis) */}
                   <div className="flex justify-center gap-12">
                      {nodes.filter(n => n.type.includes('db') || n.type === 'redis').map(node => (
                         <ServerBlade key={node.id} node={node} isHovered={hoveredNode === node.id} onClick={killNode} />
                      ))}
                   </div>

                </div>
             </div>

          </main>

          {/* RIGHT: LIVE TELEMETRY PANEL */}
          <aside className="w-96 border-l border-white/10 bg-[#050505] flex flex-col z-40">
             
             {/* 1. Metrics Grid */}
             <div className="grid grid-cols-2 gap-px bg-white/10 border-b border-white/10">
                <div className="bg-[#0a0a0a] p-4">
                   <div className="text-[10px] text-gray-500 uppercase mb-1">Latency</div>
                   <div className="text-2xl font-mono text-white flex items-baseline gap-1">
                      {35 + Math.floor(trafficLoad * 0.5)} <span className="text-xs text-gray-500">ms</span>
                   </div>
                </div>
                <div className="bg-[#0a0a0a] p-4">
                   <div className="text-[10px] text-gray-500 uppercase mb-1">Throughput</div>
                   <div className="text-2xl font-mono text-cyan-400 flex items-baseline gap-1">
                      {(trafficLoad * 1.2).toFixed(1)} <span className="text-xs text-gray-500">GB/s</span>
                   </div>
                </div>
             </div>

             {/* 2. Scrolling Terminal */}
             <div className="flex-grow flex flex-col bg-black font-mono text-[10px] overflow-hidden">
                <div className="px-4 py-2 bg-[#111] border-b border-white/10 flex justify-between items-center text-gray-400">
                   <span className="flex items-center gap-2"><Terminal className="w-3 h-3" /> /var/log/syslog</span>
                   <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                   </div>
                </div>
                
                <div className="flex-grow p-4 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-white/20">
                   {logs.length === 0 && <div className="text-gray-700 italic">Initializing system daemons...</div>}
                   {logs.map((log) => (
                      <div key={log.id} className="flex gap-2 opacity-80 hover:opacity-100 transition-opacity">
                         <span className="text-gray-600 shrink-0">{log.timestamp}</span>
                         <span className={`font-bold shrink-0 w-12 ${
                            log.level === 'ERROR' ? 'text-red-500' : 
                            log.level === 'WARN' ? 'text-yellow-500' : 
                            log.level === 'SECURITY' ? 'text-purple-500' : 'text-green-500'
                         }`}>
                            {log.level}
                         </span>
                         <span className="text-gray-300 break-words">
                            <span className="text-gray-500">[{log.source}]</span> {log.message}
                         </span>
                      </div>
                   ))}
                   <div ref={logsRef} />
                </div>
             </div>

             {/* 3. Cost Projection */}
             <div className="p-4 border-t border-white/10 bg-[#080808]">
                <div className="flex items-center gap-3 mb-3">
                   <div className="p-2 bg-yellow-500/10 rounded text-yellow-500"><DollarSign className="w-4 h-4" /></div>
                   <div>
                      <div className="text-xs font-bold text-white">Projected Spend</div>
                      <div className="text-[10px] text-gray-500">Based on current usage</div>
                   </div>
                   <div className="ml-auto text-xl font-bold text-white">${(cost * 30).toFixed(0)}</div>
                </div>
                <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                   <div className="h-full bg-yellow-500" style={{ width: `${(cost / 500) * 100}%` }} />
                </div>
             </div>

          </aside>

       </div>
    </main>
  );
}