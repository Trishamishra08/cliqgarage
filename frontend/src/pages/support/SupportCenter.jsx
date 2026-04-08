import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageSquare, Phone, Globe, ArrowLeft, ChevronRight, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SupportCenter = () => {
  const navigate = useNavigate();

  const faqs = [
    { q: 'How do I track my service live?', a: 'Go to your profile and click Live Tracking.' },
    { q: 'What is the refund policy?', a: 'Cancel 24h before for full refund.' },
    { q: 'How to claim brand warranty?', a: 'All documents are available in Service history.' },
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
            <span className="text-white/50 font-black text-[9px] uppercase tracking-[0.4em] mb-2 block">Help Center</span>
            <h1 className="text-2xl font-black text-white uppercase tracking-widest leading-none">Support</h1>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
            <HelpCircle className="text-white" size={24} />
          </div>
        </div>
      </div>

      <div className="px-6 mt-8 space-y-6">
        <div className="grid grid-cols-2 gap-4">
           {[
             { label: 'Chat Help', icon: MessageSquare, color: 'bg-blue-500' },
             { label: 'Call Hub', icon: Phone, color: 'bg-green-500' }
           ].map((action, i) => (
             <div key={i} className="bg-[var(--card-bg)] p-5 rounded-2xl border border-[var(--border-color)] shadow-xl flex flex-col items-center justify-center group active:scale-95 transition-all">
                <div className={`${action.color} w-10 h-10 rounded-full flex items-center justify-center text-white mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                   <action.icon size={18} />
                </div>
                <span className="text-[9px] font-black text-[var(--text-main)] uppercase tracking-[0.2em]">{action.label}</span>
             </div>
           ))}
        </div>

        <div className="bg-zinc-900 p-5 rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-between">
           <div className="relative z-10">
              <h4 className="text-white font-black text-[10px] uppercase tracking-widest mb-1">Knowledge Hub</h4>
              <p className="text-white/40 text-[7px] font-bold uppercase tracking-[0.3em]">Learn more about CliqGarage</p>
           </div>
           <PlayCircle className="text-[var(--primary-color)]" size={32} />
        </div>

        <div>
           <h4 className="text-[8px] font-black text-[var(--text-dim)] uppercase tracking-[0.3em] mb-4 px-1">Common Queries</h4>
           <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-[var(--card-bg)] p-4 rounded-xl border border-[var(--border-color)] flex items-center justify-between group active:scale-[0.98] transition-all">
                   <div className="flex-grow">
                      <p className="text-[9px] font-black text-[var(--text-main)] uppercase tracking-wider">{faq.q}</p>
                   </div>
                   <ChevronRight size={14} className="text-zinc-300" />
                </div>
              ))}
           </div>
        </div>

        <div className="pt-4 flex flex-col items-center gap-2 opacity-30">
           <Globe size={16} className="text-zinc-500" />
           <span className="text-[6px] font-black text-zinc-500 uppercase tracking-widest">www.cliqgarage.com / v2.0.4 - prohub</span>
        </div>
      </div>
    </div>
  );
};

export default SupportCenter;
