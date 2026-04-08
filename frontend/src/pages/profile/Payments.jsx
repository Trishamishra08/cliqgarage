import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, Smartphone, Plus, ArrowLeft, ShieldCheck, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Payments = () => {
  const navigate = useNavigate();

  const methods = [
    { type: 'UPI', label: 'johan.das@upi', brand: 'PhonePe', primary: true, icon: Smartphone },
    { type: 'Visa', label: '**** 9082', brand: 'HDFC Bank', primary: false, icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-color)] pb-24">
      <div 
        style={{ backgroundColor: '#0A0E17' }}
        className="pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden border-b border-white/5"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-[80px]" />
        
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6 border border-white/20"><ArrowLeft size={18} /></button>

        <div className="flex items-end justify-between relative">
          <div>
            <span className="text-white/50 font-black text-[9px] uppercase tracking-[0.4em] mb-2 block">Finances</span>
            <h1 className="text-2xl font-black text-white uppercase tracking-widest leading-none">Payments</h1>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
            <Wallet className="text-white" size={24} />
          </div>
        </div>
      </div>

      <div className="px-6 mt-8 space-y-6">
        <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden h-44 flex flex-col justify-between">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-[60px]" />
           <div className="flex justify-between items-start relative z-10">
              <span className="text-white/40 font-black text-[8px] uppercase tracking-widest">Active Balance</span>
              <ShieldCheck size={20} className="text-[#FFD700]" />
           </div>
           <div className="relative z-10">
              <h2 className="text-3xl font-black text-white tracking-widest mb-1 leading-none">₹8,450.00</h2>
              <span className="text-white/40 font-bold text-[7px] uppercase tracking-widest mt-1.5 flex">CliqGarage Store Credits</span>
           </div>
        </div>

        <div>
           <h4 className="text-[8px] font-black text-[var(--text-dim)] uppercase tracking-widest mb-4 px-1">Saved Gateways</h4>
           <div className="space-y-3">
              {methods.map((method, i) => (
                <div key={i} className="bg-[var(--card-bg)] p-4 rounded-xl border border-[var(--border-color)] flex items-center gap-4 active:scale-[0.98] transition-all">
                   <div className="w-10 h-10 bg-white/5 border border-[var(--border-color)] rounded-lg flex items-center justify-center text-[#004AAD]">
                      <method.icon size={20} />
                   </div>
                   <div className="flex-grow">
                      <div className="flex items-center gap-2">
                         <span className="text-[10px] font-black text-[var(--text-main)] uppercase tracking-widest">{method.label}</span>
                         {method.primary && <span className="text-[6px] font-black text-[#004AAD] uppercase tracking-widest border border-[#004AAD]/30 px-1 rounded">Primary</span>}
                      </div>
                      <span className="text-[8px] font-bold text-[var(--text-dim)] uppercase tracking-widest">{method.brand}</span>
                   </div>
                   <ChevronRight size={14} className="text-zinc-300" />
                </div>
              ))}
              <button className="w-full h-14 bg-[var(--card-bg)] border border-dashed border-[#004AAD]/30 rounded-xl flex items-center justify-center gap-2 text-[#004AAD] active:scale-95 transition-all">
                 <Plus size={16} />
                 <span className="text-[9px] font-black uppercase tracking-widest">Add New Gateway</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
