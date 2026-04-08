import React from 'react';
import { motion } from 'framer-motion';
import { History, Wrench, Clock, CheckCircle, ChevronRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServiceHistory = () => {
  const navigate = useNavigate();

  const history = [
    { id: '#SRV-9082', type: 'Full Service', date: '24 Mar 2024', status: 'Completed', bike: 'Royal Enfield Interceptor', price: '₹4,899' },
    { id: '#SRV-8941', type: 'Oil Change', date: '12 Feb 2024', status: 'Completed', bike: 'Royal Enfield Interceptor', price: '₹1,299' },
    { id: '#SRV-7721', type: 'Break Adjustment', date: '05 Jan 2024', status: 'Completed', bike: 'Royal Enfield Interceptor', price: '₹450' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-color)] pb-24">
      {/* Deep Navy Header */}
      <div 
        style={{ backgroundColor: '#0A0E17' }}
        className="pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden border-b border-white/5"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-[80px]" />
        
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6 border border-white/20 active:scale-90 transition-all"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="flex items-end justify-between relative">
          <div>
            <span className="text-white/50 font-black text-[9px] uppercase tracking-[0.4em] mb-2 block">Maintenance Log</span>
            <h1 className="text-2xl font-black text-white uppercase tracking-widest leading-none">Service History</h1>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
            <History className="text-white" size={24} />
          </div>
        </div>
      </div>

      <div className="px-6 mt-8 space-y-4">
        {history.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[var(--card-bg)] p-5 rounded-2xl border border-[var(--border-color)] shadow-xl relative overflow-hidden group active:scale-[0.98] transition-all"
          >
            <div className="flex items-start justify-between mb-4">
               <div>
                  <div className="flex items-center gap-2 mb-1.5">
                     <span className="text-[var(--primary-color)] font-black text-[10px] uppercase tracking-widest">{item.type}</span>
                     <div className="w-1 h-1 rounded-full bg-zinc-300" />
                     <span className="text-zinc-500 font-bold text-[8px] uppercase tracking-widest">{item.id}</span>
                  </div>
                  <h3 className="text-[var(--text-main)] font-black text-xs uppercase tracking-wider">{item.bike}</h3>
               </div>
               <div className="px-2.5 py-1 bg-green-500/10 rounded-lg border border-green-500/20">
                  <span className="text-green-500 font-black text-[7.5px] uppercase tracking-widest">{item.status}</span>
               </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                     <Clock size={12} className="text-zinc-400" />
                     <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                     <CheckCircle size={12} className="text-[#004AAD]" />
                     <span className="text-[9px] font-black text-[var(--text-main)] uppercase tracking-widest">{item.price}</span>
                  </div>
               </div>
               <ChevronRight size={14} className="text-zinc-300 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}

        <button className="w-full h-16 mt-6 bg-[#004AAD]/5 border border-[#004AAD]/20 rounded-2xl flex flex-col items-center justify-center group active:scale-95 transition-all">
           <Wrench size={20} className="text-[#004AAD] mb-1 group-hover:rotate-12 transition-transform" />
           <span className="text-[#004AAD] font-black text-[9px] uppercase tracking-widest">Book New Service</span>
        </button>
      </div>
    </div>
  );
};

export default ServiceHistory;
