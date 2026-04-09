import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Wrench, ShieldAlert, Sparkles, 
  MapPin, Clock, Search, ChevronRight,
  ShieldCheck, Info, Zap, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const Repairs = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Diagnostic');

  const repairTypes = [
    { label: 'Diagnostic', icon: Zap, desc: 'Full system health scan' },
    { label: 'Engine', icon: Settings, desc: 'Mechanical & Performance' },
    { label: 'Bodywork', icon: Sparkles, desc: 'Dent & Paint Restoration' },
    { label: 'Electrical', icon: AlertCircle, desc: 'Wiring & Sensors' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-['Outfit']">
      {/* Cinematic Repair Header */}
      <div className="pt-12 pb-10 px-6 rounded-b-[3rem] shadow-2xl relative overflow-hidden bg-[#0A0E17] border-b border-emerald-500/20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full -mr-40 -mt-40 blur-[100px]" />
        
        <button onClick={() => navigate('/')} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white mb-8 border border-white/10 active:scale-95 shadow-lg">
          <ArrowLeft size={18} />
        </button>

        <div className="flex flex-col relative">
          <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.6em] mb-3 block">Expert Solutions</span>
          <h1 className="text-4xl font-black text-white uppercase tracking-tight leading-none mb-3">Repair Centre</h1>
          <p className="text-white/40 text-[9px] font-black uppercase tracking-widest max-w-[200px]">Restore your machine to factory excellence with certified expertise.</p>
        </div>
      </div>

      <div className="px-6 -mt-8 relative z-20 space-y-8">
        {/* Quick Diagnostic Card */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-all duration-700" />
           <div className="relative flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A0E17] flex items-center justify-center text-emerald-500 shadow-lg"><ShieldAlert size={24} /></div>
              <div>
                 <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none mb-1.5 pt-1">Book Inspection</h3>
                 <p className="text-[10px] font-medium text-slate-500 max-w-[180px]">Instant 36-Point diagnostic check for engine, suspension & brakes.</p>
              </div>
           </div>
           <button className="w-full h-12 mt-6 bg-[#0A0E17] text-white rounded-xl text-[9px] font-black uppercase tracking-[0.4em] shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3">
              Request Scan <Zap size={14} className="text-emerald-500" />
           </button>
        </div>

        {/* Repair Categories */}
        <div className="grid grid-cols-2 gap-4">
           {repairTypes.map((type) => (
             <motion.div
               key={type.label}
               whileTap={{ scale: 0.98 }}
               className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-md flex flex-col items-center text-center group"
             >
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#004AAD] group-hover:bg-[#004AAD] group-hover:text-white transition-all mb-4 shadow-sm">
                   <type.icon size={20} />
                </div>
                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1">{type.label}</h4>
                <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">{type.desc}</p>
             </motion.div>
           ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm"><ShieldCheck size={20} /></div>
              <div>
                 <p className="text-[10px] font-black text-slate-900 uppercase">100% Genuine Parts</p>
                 <p className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest">Warrantied Repairs</p>
              </div>
           </div>
           <ChevronRight size={18} className="text-emerald-200" />
        </div>
      </div>
    </div>
  );
};

export default Repairs;
