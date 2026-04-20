import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Package, Clock, 
  ArrowRight, ShieldCheck, Download,
  ExternalLink, CheckCircle2, RotateCcw,
  Ban, FileText, Search
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const OrderHistory = () => {
  const navigate = useNavigate();

  const orders = [
    {
      id: 'CLQ-9901',
      date: '20 APR 2026',
      total: '5,898',
      status: 'In Transit',
      items: [
        { name: 'STEALTH-1 PRO', image: 'https://images.unsplash.com/photo-1621622340332-9c3f4e1f720f?auto=format&fit=crop&q=80&w=200' }
      ]
    },
    {
      id: 'CLQ-8852',
      date: '12 APR 2026',
      total: '12,999',
      status: 'Delivered',
      items: [
        { name: 'SPORT PADS', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c3d8?auto=format&fit=crop&q=80&w=200' }
      ]
    },
    {
      id: 'CLQ-7721',
      date: '05 APR 2026',
      total: '45,200',
      status: 'Returned',
      items: [
        { name: 'TITANIUM EXHAUST', image: 'https://images.unsplash.com/photo-1590684153482-337ca2a7d8d3?auto=format&fit=crop&q=80&w=200' }
      ]
    },
    {
      id: 'CLQ-6610',
      date: '28 MAR 2026',
      total: '2,400',
      status: 'Cancelled',
      items: [
        { name: 'CHROME FINISH', image: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80&w=200' }
      ]
    }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-32 font-['Outfit'] relative overflow-x-hidden">
      {/* 🚀 High-Density Repository Header */}
      <div className="bg-[#001F3D] pt-10 pb-8 px-6 rounded-b-[2.5rem] shadow-2xl relative z-10 border-b-4 border-[#D4A017]/10">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate('/ecommerce')} className="w-10 h-10 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-center text-white backdrop-blur-md active:scale-95 transition-all"><ChevronLeft size={20} /></button>
          <div className="text-center">
            <h1 className="text-[13px] font-black text-white uppercase tracking-[0.2em] leading-none mb-1.5">Order Repository</h1>
            <p className="text-[#D4A017] text-[7px] font-black uppercase tracking-[0.3em] italic">{orders.length} Authenticated Units</p>
          </div>
          <button className="w-10 h-10 bg-[#D4A017] text-[#001F3D] rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition-all"><Download size={18} strokeWidth={3} /></button>
        </div>

        {/* 🔍 Micro Search Bar */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#D4A017] transition-colors" size={14} />
          <input 
            type="text" 
            placeholder="Search Order ID, Product..." 
            className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-12 text-[9px] font-bold text-white uppercase tracking-widest placeholder:text-white/20 focus:outline-none focus:border-[#D4A017]/30 transition-all focus:bg-white/10"
          />
        </div>
      </div>

      <div className="px-5 mt-8 space-y-5">
        {orders.map((order, idx) => (
          <motion.div key={order.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden relative group"
          >
            {/* Status Side Accent */}
            <div className={twMerge(
              "absolute left-0 top-0 bottom-0 w-1.5 transition-all group-hover:w-2.5",
              order.status === 'In Transit' ? "bg-amber-400" : 
              order.status === 'Delivered' ? "bg-emerald-400" :
              order.status === 'Returned' ? "bg-slate-400" : "bg-rose-400"
            )} />

            <div className="px-6 py-4 bg-slate-50/50 flex justify-between items-center border-b border-slate-50">
               <div>
                  <h3 className="text-[10px] font-black text-[#001F3D] uppercase tracking-widest leading-none mb-1.5">{order.id}</h3>
                  <p className="text-[8px] font-bold text-slate-300 uppercase italic leading-none">{order.date}</p>
               </div>
               <div className={twMerge(
                 "px-3 py-1 rounded-full text-[7px] font-black uppercase tracking-widest ring-1 ring-inset transition-all",
                 order.status === 'In Transit' ? "bg-amber-50 text-amber-600 ring-amber-100" : 
                 order.status === 'Delivered' ? "bg-emerald-50 text-emerald-600 ring-emerald-100" :
                 order.status === 'Returned' ? "bg-slate-50 text-slate-500 ring-slate-100" : 
                 "bg-rose-50 text-rose-600 ring-rose-100"
               )}> {order.status} </div>
            </div>

            <div className="p-6">
               <div className="flex gap-3 mb-6">
                  {order.items.map((item, i) => (
                     <div key={i} className="flex gap-4 items-center">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-50 shadow-md ring-4 ring-slate-50/50"><img src={item.image} className="w-full h-full object-cover" /></div>
                        <div>
                          <h4 className="text-[9px] font-black text-[#001F3D] uppercase tracking-[0.05em] leading-normal">{item.name}</h4>
                          <p className="text-[7px] font-bold text-slate-300 uppercase tracking-tighter mt-1 italic">Serialized Unit Verified</p>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="flex items-center justify-between pt-2 border-t border-slate-50 mt-auto">
                  <div>
                    <p className="text-[7px] font-bold text-slate-300 uppercase tracking-widest mb-1 leading-none">Settlement Amount</p>
                    <p className="text-[18px] font-black text-[#001F3D] tracking-tighter leading-none">₹{order.total}</p>
                  </div>
                  
                  <div className="flex gap-2">
                     {order.status !== 'Cancelled' && (
                       <button className="w-10 h-10 border border-slate-100 rounded-xl flex items-center justify-center text-slate-300 hover:text-[#001F3D] transition-colors"><FileText size={16} /></button>
                     )}
                     <button onClick={() => navigate(`/order-tracking/${order.id}`)}
                       className={twMerge(
                        "h-10 px-5 rounded-xl transition-all active:scale-95 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest shadow-xl",
                        order.status === 'Cancelled' ? "bg-slate-50 text-slate-300 cursor-not-allowed" : "bg-[#001F3D] text-[#D4A017] shadow-[#001F3D]/20"
                       )}
                       disabled={order.status === 'Cancelled'}
                     >
                       Manage <ArrowRight size={12} strokeWidth={3} />
                     </button>
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔐 Security Footer */}
      <div className="mt-12 px-10 text-center opacity-40">
         <div className="flex items-center justify-center gap-3 mb-3">
           <ShieldCheck size={20} className="text-[#001F3D]" />
           <div className="h-4 w-px bg-slate-200" />
           <Package size={18} className="text-[#001F3D]" />
         </div>
         <p className="text-[7px] font-black uppercase tracking-[0.3em] leading-relaxed max-w-[200px] mx-auto">Assets Protected by CliqVault Immutable Order Protocol</p>
         <p className="text-[6px] font-bold text-slate-300 uppercase mt-2 tracking-[0.1em]">© 2026 CLIQGARAGE BOUTIQUE SYSTEMS</p>
      </div>
    </div>
  );
};

export default OrderHistory;
