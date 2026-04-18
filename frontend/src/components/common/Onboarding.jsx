import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Onboarding = ({ onComplete }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden">
      {/* Front Facing Premium Car Background */}
      <motion.div 
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=2000" 
          alt="Front Premium Car"
          className="w-full h-full object-cover brightness-[0.85]"
        />
        {/* Dynamic Blue Overlays */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#001F3D]/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[#003B71]/10 mix-blend-color" />
      </motion.div>

      {/* Aesthetic Accents */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#003B71]/30 to-transparent" />
      <div className="absolute top-10 right-10 w-32 h-32 bg-[#003B71]/20 rounded-full blur-[90px] pointer-events-none" />

      {/* Compact Circular CTA Area */}
      <div className="absolute bottom-12 right-10 flex items-center gap-6">
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 1, duration: 0.8 }}
           className="text-right"
        >
          <p className="text-[10px] font-black text-white leading-none tracking-widest uppercase">Experience</p>
          <p className="text-[8px] font-bold text-[#D4A017] mt-1 tracking-[0.3em] uppercase">Elite Power</p>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, scale: 0.8, x: 20 }}
           animate={{ opacity: 1, scale: 1, x: 0 }}
           transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        >
          {/* Main Compact Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onComplete}
            className="w-16 h-16 bg-[#D4A017] rounded-full flex items-center justify-center text-white shadow-[0_0_40px_rgba(212,160,23,0.4)] border border-white/20 group relative overflow-hidden"
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Pulsing Core */}
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-1 rounded-full border border-white/30"
            />
            
            <ArrowRight size={24} strokeWidth={3} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative Branding Frame */}
      <div className="absolute inset-6 border border-white/5 pointer-events-none rounded-[2rem]" />
    </div>
  );
};

export default Onboarding;
