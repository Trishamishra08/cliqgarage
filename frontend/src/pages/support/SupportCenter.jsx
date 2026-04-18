import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, MessageSquare, Phone, Mail, 
  ChevronRight, HelpCircle, FileText, 
  ExternalLink, LifeBuoy, Zap, ShieldAlert,
  Search, Clock, MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const SupportCenter = () => {
  const navigate = useNavigate();

  const channels = [
    { 
       icon: MessageSquare, 
       label: 'Chat Support', 
       desc: 'Typical response: 2 mins', 
       color: 'bg-[var(--secondary-color)]/10 text-[var(--secondary-color)] border-[var(--secondary-color)]/20' 
    },
    { 
       icon: Phone, 
       label: 'Direct Line', 
       desc: 'Elite members priority dial', 
       color: 'bg-emerald-50 text-emerald-600 border-emerald-100' 
    },
    { 
       icon: Mail, 
       label: 'Email Entry', 
       desc: 'For long-form inquiries', 
       color: 'bg-slate-50 text-slate-600 border-slate-100' 
    }
  ];

  const faqs = [
    { q: 'How do I track my service progress?', cat: 'Servicing' },
    { q: 'Can I cancel my rental booking?', cat: 'Rentals' },
    { q: 'What is elite roadside assistance?', cat: 'Safety' },
    { q: 'How to apply coupon codes?', cat: 'Payments' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32 font-['Outfit']">
      {/* 🚀 Compact Header */}
      <div className="px-6 pt-10 pb-5 bg-[var(--header-color)] flex items-center justify-between sticky top-0 z-40 border-b border-white/5">
          <button 
             onClick={() => navigate(-1)}
             className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white border border-white/10"
          >
             <ChevronLeft size={16} />
          </button>
          <div className="text-center">
             <span className="text-[7px] font-bold tracking-[0.3em] text-[var(--primary-color)] uppercase block mb-0.5">Control Tower</span>
             <h2 className="text-[10px] font-semibold text-white uppercase tracking-widest leading-none">Support Center</h2>
          </div>
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[var(--primary-color)] border border-white/10">
             <LifeBuoy size={14} />
          </div>
       </div>

       <div className="px-5 py-6">
          {/* Search Hub */}
          <div className="relative mb-8">
             <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
             <input 
               type="text" 
               placeholder="How can we help you today?" 
               className="w-full h-12 bg-white rounded-2xl border border-slate-100 pl-11 pr-5 text-[9px] font-bold uppercase tracking-widest text-slate-700 placeholder:text-slate-300 shadow-sm focus:outline-none focus:border-[var(--primary-color)]/30 transition-all"
             />
          </div>

          <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">Connect Channels</h3>
          <div className="grid gap-3 mb-8">
             {channels.map((chan, i) => (
               <motion.button 
                 key={chan.label}
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="bg-white p-4 rounded-2xl border border-slate-50 flex items-center justify-between group active:scale-[0.98] transition-all"
               >
                  <div className="flex items-center gap-4">
                     <div className={twMerge("w-11 h-11 rounded-xl flex items-center justify-center border", chan.color)}>
                        <chan.icon size={20} />
                     </div>
                     <div className="text-left">
                        <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-tight mb-0.5">{chan.label}</h4>
                        <p className="text-[8px] font-semibold text-slate-400 uppercase tracking-widest leading-none">{chan.desc}</p>
                     </div>
                  </div>
                  <ChevronRight size={14} className="text-slate-200 group-hover:text-slate-400 transition-colors" />
               </motion.button>
             ))}
          </div>

          <div className="bg-gradient-to-br from-[var(--primary-color)] to-[var(--primary-color)] border border-[var(--primary-color)]/20 p-8 rounded-[3rem] mb-8 relative overflow-hidden shadow-2xl shadow-[var(--primary-color)]/20">
             <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
             <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 mb-6">
                   <ShieldAlert size={40} className="text-white" />
                </div>
                <h4 className="text-[14px] font-black text-white uppercase tracking-[0.2em] mb-2">Emergency SOS Portal</h4>
                <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest leading-relaxed mb-6 max-w-[200px]">Immediate elite recovery for break-downs or accidents.</p>
                <button className="h-12 px-10 bg-white text-[var(--primary-color)] rounded-full text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-xl">Activate SOS</button>
             </div>
          </div>

          <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">Frequent Inquiries</h3>
          <div className="bg-white rounded-2xl border border-slate-50 divide-y divide-slate-50 overflow-hidden shadow-sm">
             {faqs.map((faq, i) => (
                <button key={i} className="w-full p-4 flex items-center justify-between group active:bg-slate-50 transition-all text-left">
                   <div>
                      <span className="text-[6.5px] font-bold text-[var(--primary-color)] uppercase tracking-[0.2em] mb-1.5 block leading-none">{faq.cat}</span>
                      <p className="text-[9px] font-bold text-slate-700 uppercase tracking-tight">{faq.q}</p>
                   </div>
                   <Plus size={14} className="text-slate-200 group-hover:text-slate-400 transition-colors" />
                </button>
             ))}
          </div>

          <button className="w-full mt-6 py-4 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest border border-dashed border-slate-200 rounded-xl">
             <FileText size={14} /> View All documentation
          </button>
       </div>
    </div>
  );
};

export default SupportCenter;
