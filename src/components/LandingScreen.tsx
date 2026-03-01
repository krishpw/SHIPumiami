/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { ArrowDown, Wind, Thermometer, Target, Move } from 'lucide-react';

interface LandingScreenProps {
  onStart: () => void;
  visible: boolean;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onStart, visible }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#02040A] animate-in fade-in duration-1000">
      
      {/* --- Aurora Borealis Background --- */}
      <div className="absolute inset-0 bg-[#02040A]">
          {/* Vertical Orange Streak (Left) */}
          <div className="absolute top-[-20%] left-[10%] w-[40vw] h-[140vh] bg-[#F47321]/30 blur-[100px] rotate-[-15deg] mix-blend-screen animate-pulse duration-[8000ms]"></div>
          {/* Vertical White/Silver Streak (Right) */}
          <div className="absolute top-[-20%] right-[10%] w-[40vw] h-[140vh] bg-slate-400/20 blur-[100px] rotate-[15deg] mix-blend-screen animate-pulse duration-[7000ms] delay-1000"></div>
          {/* Bottom Haze */}
          <div className="absolute bottom-0 w-full h-[50vh] bg-gradient-to-t from-[#005030]/40 to-transparent"></div>
      </div>
      
      {/* Film Grain */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* HUD Elements - Corners */}
      <div className="absolute top-8 left-8 flex items-center gap-3 text-slate-400/70 font-mono text-[10px] tracking-widest uppercase shadow-black drop-shadow-md">
         <Move className="w-3 h-3 text-[#F47321]" />
         <span>ALT: 50,000 FT</span>
      </div>
      <div className="absolute top-8 right-8 flex items-center gap-3 text-slate-400/70 font-mono text-[10px] tracking-widest uppercase shadow-black drop-shadow-md">
         <Target className="w-3 h-3 text-[#F47321]" />
         <span>TRGT: UMIAMI CAMPUS</span>
      </div>

      {/* Center Reticle - Subtle Tech Lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
          <div className="w-[60vh] h-[60vh] border border-slate-500/20 rounded-full flex items-center justify-center relative">
               <div className="absolute top-0 w-[1px] h-3 bg-slate-400/50"></div>
               <div className="absolute bottom-0 w-[1px] h-3 bg-slate-400/50"></div>
               <div className="absolute left-0 h-[1px] w-3 bg-slate-400/50"></div>
               <div className="absolute right-0 h-[1px] w-3 bg-slate-400/50"></div>
          </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-16">
        
        {/* Prismatic Hero Text */}
        <div className="relative group cursor-default select-none pt-12">
            {/* Layer 1: Orange Offset Left */}
            <h1 className="absolute inset-0 text-7xl md:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#F47321] to-orange-700 blur-[1px] -translate-x-[4px] -translate-y-[2px] opacity-70 mix-blend-screen">
                SH1P UMIAMI 
            </h1>
            {/* Layer 2: White/Silver Offset Right */}
            <h1 className="absolute inset-0 text-7xl md:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-tl from-white to-slate-400 blur-[1px] translate-x-[4px] translate-y-[2px] opacity-70 mix-blend-screen">
                SH1P UMIAMI
            </h1>
            
            {/* Layer 3: Main White Core with Metal Outline */}
            <h1 className="relative text-7xl md:text-9xl font-display font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                {/* CSS Stroke for that 'Outline' look in the reference */}
                <span className="relative z-10" style={{ WebkitTextStroke: '1px rgba(244,115,33,0.5)' }}>SH1P UMIAMI</span>
            </h1>
        </div>
        
        {/* Holographic Mission Container */}
        <div className="relative p-[2px] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(244,115,33,0.4)] group hover:shadow-[0_0_80px_rgba(244,115,33,0.6)] transition-shadow duration-500 mx-4">
             {/* The Rainbow Border Gradient */}
             <div className="absolute inset-0 bg-gradient-to-r from-[#005030] via-white to-[#F47321] animate-[spin_4s_linear_infinite] opacity-80"></div>
             
             {/* The Content Box */}
             <div className="relative bg-[#050A14]/90 backdrop-blur-xl rounded-[14px] p-8 flex flex-col items-center gap-3 text-center min-w-[320px]">
                 
                 {/* Top Label */}
                 <div className="flex items-center gap-2 mb-1">
                     <div className="w-1.5 h-1.5 bg-[#F47321] rounded-full animate-pulse"></div>
                     <span className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em]">Mission Directive</span>
                     <div className="w-1.5 h-1.5 bg-[#F47321] rounded-full animate-pulse"></div>
                 </div>

                 {/* Coordinates */}
                 <div className="text-sm font-sans font-bold text-white tracking-wide">
                    DEPLOY TO SECTOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005030] to-[#F47321] font-extrabold">25.72N, 80.28W</span>
                 </div>
                 
                 {/* Destination */}
                 <div className="text-xs font-mono font-medium text-slate-400 tracking-wider">
                    DESTINATION: UNIVERSITY OF MIAMI
                 </div>

                 {/* Glossy Overlay on the box */}
                 <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-[14px]"></div>
             </div>
        </div>

        {/* Liquid Metal Button */}
        <button 
            onClick={onStart}
            className="group relative px-10 py-4 bg-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] border border-white/80"
        >
            <div className="relative flex items-center gap-3 font-mono text-xs font-black text-black uppercase tracking-widest z-10">
                Initiate Drop
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </div>
        </button>

      </div>

      {/* Bottom Data */}
      <div className="absolute bottom-8 left-8 flex items-center gap-3 text-slate-400/50 font-mono text-[10px] tracking-widest uppercase">
         <Wind className="w-3 h-3 text-[#F47321]" />
         <span>WIND: 15 KNOTS NE</span>
      </div>
      <div className="absolute bottom-8 right-8 flex items-center gap-3 text-slate-400/50 font-mono text-[10px] tracking-widest uppercase">
         <Thermometer className="w-3 h-3 text-[#F47321]" />
         <span>TEMP: 85°F</span>
      </div>

    </div>
  );
};