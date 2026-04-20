import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Calendar, CheckCircle2, 
  Clock, ArrowRight, Wrench, Settings, 
  Search, Filter, History, Download, Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const ServiceHistory = () => {
  const navigate = useNavigate();

  const orders = [
    {
      id: 'CLQ-HUB-7721',
      service: 'Car Full Service',
      date: '12 Oct 2025',
      time: '10:30 AM',
      mechanic: 'Elite Performance Hub',
      amount: '2,999',
      status: 'Completed',
      vehicle: 'BMW M3 Competition',
      hasInvoice: true
    },
    {
      id: 'CLQ-HUB-4402',
      service: 'Brake Performance Kit',
      date: '05 Sep 2025',
      time: '02:00 PM',
      mechanic: 'Brembo Official Center',
      amount: '1,899',
      status: 'In-progress',
      vehicle: 'BMW M3 Competition',
      hasInvoice: false
    },
    {
      id: 'CLQ-HUB-2109',
      service: 'Bike General Service',
      date: '19 Apr 2026',
      time: '09:00 AM',
      mechanic: 'Enfield Care Specialist',
      amount: '1,299',
      status: 'Accepted',
      vehicle: 'RE Bullet 350',
      hasInvoice: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return "bg-emerald-50 border-emerald-100 text-emerald-600";
      case 'In-progress': return "bg-blue-50 border-blue-100 text-blue-600";
      case 'Accepted': return "bg-amber-50 border-amber-100 text-amber-600";
      case 'Request Sent': return "bg-slate-50 border-slate-200 text-slate-400";
      default: return "bg-slate-50 border-slate-100 text-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32 font-['Outfit']">
      {/* 🚀 Compact Header */}
      <div className="px-6 pt-10 pb-5 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-40 backdrop-blur-xl bg-white/80">
          <button 
             onClick={() => navigate(-1)}
             className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100"
          >
             <ChevronLeft size={16} />
          </button>
          <div className="text-center">
             <span className="text-[7px] font-bold tracking-[0.3em] text-[#004AAD] uppercase block mb-0.5 italic">Maintenance Log</span>
             <h2 className="text-[10px] font-semibold text-slate-900 uppercase tracking-widest leading-none">Service History</h2>
          </div>
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100 italic font-black text-[8px]">
             CLQ
          </div>
       </div>

       <div className="px-5 py-6">
          <div className="flex items-center justify-between mb-6 px-1">
             <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Recent Maintenance</h3>
             <button className="text-[8px] font-bold text-[#004AAD] uppercase flex items-center gap-1.5">
                <Filter size={10} /> Filter Logs
             </button>
          </div>

          <div className="space-y-4">
             {orders.map((order, idx) => (
               <motion.div 
                 key={order.id}
                 initial={{ opacity: 0, y: 15 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.1 }}
                 className="bg-white p-4 rounded-[1.8rem] border border-slate-100 shadow-sm relative overflow-hidden group"
               >
                  <div className={twMerge(
                    "absolute top-0 right-0 w-16 h-16 opacity-[0.03] group-hover:scale-110 transition-transform duration-700",
                    order.status === 'Completed' ? "text-emerald-500" : "text-amber-500"
                  )}>
                     <History size={64} />
                  </div>

                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <div className="flex items-center gap-2 mb-1">
                           <span className={twMerge(
                             "px-2 py-0.5 rounded-full text-[6.5px] font-bold uppercase tracking-widest border",
                             getStatusColor(order.status)
                           )}>
                              {order.status}
                           </span>
                           <span className="text-[7px] font-bold text-slate-300 uppercase tracking-widest">/ {order.id}</span>
                        </div>
                        <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-tight">{order.service}</h4>
                     </div>
                     <span className="text-[12px] font-bold text-[#004AAD] font-['Outfit']">₹{order.amount}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-50">
                     <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                           <Calendar size={12} />
                        </div>
                        <div>
                           <p className="text-[6.5px] font-bold text-slate-400 uppercase leading-none mb-0.5">Date</p>
                           <p className="text-[8px] font-semibold text-slate-700 uppercase">{order.date}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                           <Wrench size={12} />
                        </div>
                        <div>
                           <p className="text-[6.5px] font-bold text-slate-400 uppercase leading-none mb-0.5">Asset</p>
                           <p className="text-[8px] font-semibold text-slate-700 uppercase line-clamp-1">{order.vehicle}</p>
                        </div>
                     </div>
                  </div>

                  <div className="pt-3.5 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        {order.status === 'Completed' ? (
                          <div className="flex items-center gap-0.5">
                             {[1,2,3,4,5].map(s => <Star key={s} size={6} fill={s <= 4 ? "#D4A017" : "none"} className={s <= 4 ? "text-[#D4A017]" : "text-slate-200"} />)}
                             <span className="text-[6px] font-black text-slate-300 ml-1 uppercase">Reviewed</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                             <div className="w-5 h-5 rounded-full bg-[#004AAD]/5 flex items-center justify-center text-[#004AAD]">
                                <Star size={8} fill="currentColor" />
                             </div>
                             <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight">{order.mechanic}</p>
                          </div>
                        )}
                     </div>
                     <button className="flex items-center gap-1.5 text-[8.5px] font-bold text-[#004AAD] uppercase group-hover:gap-2.5 transition-all">
                        {order.hasInvoice ? 'View Invoice' : 'Track Order'} <ArrowRight size={12} />
                     </button>
                  </div>
               </motion.div>
             ))}
          </div>

          <div className="mt-8 p-5 rounded-3xl bg-[#0A0E17] text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#004AAD]/20 rounded-full -mr-16 -mt-16 blur-2xl" />
             <div className="relative z-10">
                <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#004AAD] mb-1">Export Logs</h4>
                <p className="text-[11px] font-bold uppercase tracking-tight mb-4">Request Complete Maintenance<br/>History Dashboard</p>
                <button className="h-10 px-6 bg-white text-[#0A0E17] rounded-xl text-[8.5px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg active:scale-95 transition-all">
                   <Download size={14} /> Download PDF
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};

export default ServiceHistory;
