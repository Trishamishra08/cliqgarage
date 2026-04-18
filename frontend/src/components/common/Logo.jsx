import React from 'react';
import { twMerge } from 'tailwind-merge';

const Logo = ({ className = "", showText = true, horizontal = false, forceWhite = false, forceDark = false }) => {
  return (
    <div className={`flex ${horizontal ? 'flex-row items-center gap-1.5' : 'flex-col items-center gap-1'} ${className}`}>
      {/* Visual Logo Mark */}
      <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-sm">
          {/* Main Pin Body */}
          <path 
            d="M50 110C20 80 10 60 10 40C10 20 28 5 50 5C72 5 90 20 90 40C90 60 80 80 50 110Z" 
            fill="#0F172A" 
          />
          <path 
            d="M50 110C80 80 90 60 90 40C90 20 72 5 50 5V110Z" 
            fill="#D4A017" 
          />
          
          {/* Gear Top elements */}
          <path d="M30 15 L35 5 L45 8 L50 2 L55 8 L65 5 L70 15" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" className="opacity-40" />
          
          {/* Icons in contrast */}
          <circle cx="32" cy="55" r="4" stroke="white" strokeWidth="2.5" fill="none" />
          <circle cx="43" cy="55" r="4" stroke="white" strokeWidth="2.5" fill="none" />
          <path d="M32 55 L38 45 L43 55" stroke="white" strokeWidth="2.5" fill="none" />
          
          <rect x="58" y="52" width="16" height="7" rx="1.5" fill="white" />
          <path d="M60 52 L64 45 L70 45 L74 52" fill="white" />
        </svg>
      </div>

      {showText && (
        <div className={`flex flex-col ${horizontal ? 'items-start' : 'items-center'} leading-none`}>
          <div className="flex items-baseline font-black tracking-tight text-lg">
            <span className={twMerge(
              "transition-colors",
              forceWhite ? "text-white" : forceDark ? "text-[#0F172A]" : "text-[#0F172A] dark:text-white"
            )}>Cliq</span>
            <span className="text-[#D4A017] dark:text-[#D4A017] px-0.5">Garage</span>
          </div>
          <div className="text-[5px] font-black uppercase tracking-[0.1em] text-slate-400 dark:text-zinc-500 mt-0.5 whitespace-nowrap transition-colors">
            PREMIUM BIKE SERVICES & SHOP
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;
