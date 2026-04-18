import React from 'react';
import { motion } from 'framer-motion';
import { Bike } from 'lucide-react';
import Logo from './Logo';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#F1F5F9] flex flex-col items-center justify-center">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Soft Background Pulse */}
        <motion.div 
          animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[#003B71]/10 rounded-full blur-3xl"
        />
        
        {/* Circular Dashed Path */}
        <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 192 192">
          <motion.circle
            cx="96"
            cy="96"
            r="75"
            fill="none"
            stroke="#003B71"
            strokeWidth="2"
            strokeDasharray="6 10"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, rotate: 360 }}
            transition={{ 
              pathLength: { duration: 2, repeat: Infinity, ease: "linear" },
              rotate: { duration: 15, repeat: Infinity, ease: "linear" }
            }}
            className="opacity-40"
          />
        </svg>

        {/* Central Logo - Now Perfectly Centered */}
        <motion.div
          animate={{ 
            y: [0, -4, 0],
            scale: [1, 1.03, 1]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(0,59,113,0.12)] border border-white"
        >
          <Logo showText={false} className="scale-[2.8]" />
        </motion.div>

        {/* Orbiting Accents */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#D4A017] rounded-full shadow-[0_0_10px_#D4A017]"
            animate={{ 
              rotate: 360,
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 1.5
            }}
            style={{ 
              originX: "96px",
              originY: "96px",
              top: "21px",
              left: "96px"
            }}
          />
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-14 text-center"
      >
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <span className="text-[14px] font-black text-[#003B71] uppercase tracking-[0.5em] ml-[0.5em]">Cliq</span>
          <span className="text-[14px] font-black text-[#D4A017] uppercase tracking-[0.5em]">Garage</span>
        </div>
        <div className="flex gap-2.5 justify-center mt-4">
           {[...Array(3)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-2.5 h-1 bg-[#003B71]/20 rounded-full"
              />
           ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
