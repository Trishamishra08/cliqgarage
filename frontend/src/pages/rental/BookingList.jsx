import React from 'react';
import { motion } from 'framer-motion';
import { Bike, Calendar, Shield, MapPin, ChevronRight, ArrowLeft, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const BookingList = () => {
  const navigate = useNavigate();

  const bookings = [
    { id: '#BK-1102', bike: 'Harley Davidson X440', date: '10 Apr - 12 Apr', status: 'Upcoming', active: true, price: '₹3,500' },
    { id: '#BK-0982', bike: 'Royal Enfield Himalayan', date: '15 Mar - 16 Mar', status: 'Completed', price: '₹1,500' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32 font-['Outfit']">
      {/* 🚀 Premium Pilot Header */}
      <div className="px-6 pt-10 pb-5 bg-[#0A0E17] flex items-center justify-between sticky top-0 z-40 border-b border-white/5 shadow-2xl">
          <button 
             onClick={() => navigate(-1)}
             className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white border border-white/10"
          >
             <ArrowLeft size={16} />
          </button>
          <div className="text-center">
             <span className="text-[7px] font-bold tracking-[0.3em] text-[#004AAD] uppercase block mb-0.5">Fleet Terminal</span>
             <h2 className="text-[10px] font-semibold text-white uppercase tracking-widest leading-none">Your Rentals</h2>
          </div>
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#004AAD] border border-white/10">
             <Key size={14} />
          </div>
       </div>

      <div className="px-5 mt-8 space-y-4">
        <h3 className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.4em] px-1 italic">Active Expeditions</h3>
        {bookings.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-2xl border border-slate-50 shadow-sm relative overflow-hidden group active:scale-[0.98] transition-all"
          >
            <div className="flex items-start justify-between mb-4">
               <div className="flex flex-col">
                  <span className="text-[7px] font-bold text-[#004AAD] uppercase tracking-widest leading-none mb-1.5">{item.id}</span>
                  <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-tight">{item.bike}</h4>
               </div>
               <div className={twMerge(
                 "px-2 py-0.5 rounded-full text-[6.5px] font-bold uppercase tracking-widest border",
                 item.active ? "bg-blue-50 border-blue-100 text-[#004AAD]" : "bg-emerald-50 border-emerald-100 text-emerald-600"
               )}>
                  {item.status}
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50 border-dashed mb-4">
               <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100"><Calendar size={12} /></div>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">{item.date}</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100"><Shield size={12} /></div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Insured</span>
               </div>
            </div>

            <div className="flex items-center justify-between">
               <span className="text-[13px] font-black text-slate-900 leading-none">{item.price}</span>
               <button 
                  className="h-9 px-6 bg-[#004AAD] text-white rounded-xl text-[8.5px] font-bold uppercase tracking-widest transition-all active:scale-95 shadow-lg border border-white/10"
                >
                  Unit Details
               </button>
            </div>
          </motion.div>
        ))}

        <button 
           onClick={() => navigate('/rentals')}
           className="w-full h-11 mt-6 bg-[#0A0E17] rounded-xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl border border-white/5"
        >
           <Bike size={16} className="text-white" />
           <span className="text-white font-bold text-[9px] uppercase tracking-widest">Rent New Fleet</span>
        </button>
      </div>
    </div>
  );
};

export default BookingList;
