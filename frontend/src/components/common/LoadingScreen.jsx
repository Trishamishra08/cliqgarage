import React from 'react';
import { motion } from 'framer-motion';
import { Bike } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Radiating Rings */}
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-blue-100 rounded-full blur-2xl"
        />
        
        {/* Circular Dashed Path (Royal Enfield Style) */}
        <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
          <motion.circle
            cx="64"
            cy="64"
            r="48"
            fill="none"
            stroke="#1e3a8a" // Blue 950
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, rotate: 360 }}
            transition={{ 
              pathLength: { duration: 2, repeat: Infinity, ease: "linear" },
              rotate: { duration: 10, repeat: Infinity, ease: "linear" }
            }}
          />
        </svg>

        {/* Central Bike Icon */}
        <motion.div
          animate={{ 
            y: [0, -4, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-16 h-16 bg-blue-950 rounded-full flex items-center justify-center shadow-2xl shadow-blue-900/30 text-white border-2 border-white"
        >
          <Bike size={32} strokeWidth={2.5} />
        </motion.div>

        {/* Trail Points */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-blue-950 rounded-full"
            animate={{ 
              rotate: 360,
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 0.2
            }}
            style={{ 
              originX: "64px",
              originY: "64px",
              top: "16px",
              left: "64px"
            }}
          />
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-[10px] font-black text-blue-950 uppercase tracking-[0.5em] mb-1">CliqGarage</p>
        <div className="flex gap-1 justify-center">
           {[...Array(3)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-1.5 h-1.5 bg-blue-600 rounded-full"
              />
           ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
