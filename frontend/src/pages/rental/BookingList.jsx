import React from 'react';
import { motion } from 'framer-motion';
import { Bike, Calendar, Shield, MapPin, ChevronRight, ArrowLeft, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingList = () => {
  const navigate = useNavigate();

  const bookings = [
    { id: '#BK-1102', bike: 'Harley Davidson X440', date: '10 Apr - 12 Apr', status: 'Upcoming', active: true, price: '₹3,500' },
    { id: '#BK-0982', bike: 'Royal Enfield Himalayan', date: '15 Mar - 16 Mar', status: 'Completed', price: '₹1,500' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-['Outfit']">
      {/* Premium Navy Gradient Header */}
      <div 
        className="pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#004AAD] to-[#14b8a6] border-b border-white/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-[80px]" />
        
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6 border border-white/20 active:scale-90 transition-all shadow-sm">
          <ArrowLeft size={18} />
        </button>

        <div className="flex items-end justify-between relative">
          <div>
            <span className="text-[#004AAD] font-black text-[9px] uppercase tracking-[0.5em] mb-2 block">Premium Fleet</span>
            <h1 className="text-2xl font-black text-white uppercase tracking-widest leading-none">My Rentals</h1>
          </div>
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
            <Key className="text-white" size={24} />
          </div>
        </div>
      </div>

      <div className="px-6 mt-8 space-y-4">
        {bookings.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--card-bg)] p-5 rounded-2xl border border-[var(--border-color)] shadow-xl relative overflow-hidden group active:scale-[0.98] transition-all"
          >
            <div className="flex items-start justify-between mb-4">
               <div>
                  <div className="flex items-center gap-2 mb-1.5">
                     <span className={item.active ? "text-[#004AAD] font-black text-[10px] uppercase tracking-widest" : "text-zinc-500 font-black text-[10px] uppercase tracking-widest"}>
                        {item.bike}
                     </span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-zinc-500 font-bold text-[8px] uppercase tracking-widest">{item.id}</span>
                  </div>
               </div>
               <div className={`px-2.5 py-1 rounded-lg border content-center ${item.active ? "bg-blue-500/10 border-blue-500/20 text-blue-500" : "bg-green-500/10 border-green-500/20 text-green-500"}`}>
                  <span className="font-black text-[7.5px] uppercase tracking-widest">{item.status}</span>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-[var(--border-color)] border-dashed">
               <div className="flex items-center gap-2">
                  <Calendar size={12} className="text-[var(--primary-color)]" />
                  <span className="text-[9px] font-black text-[var(--text-main)] uppercase tracking-tight">{item.date}</span>
               </div>
               <div className="flex items-center gap-2">
                  <Shield size={12} className="text-zinc-400" />
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Fully Insured</span>
               </div>
            </div>

            <div className="flex items-center justify-between pt-4">
               <span className="text-lg font-black text-[var(--text-main)]">{item.price}</span>
               <button 
                  style={{ backgroundColor: '#0A0E17' }}
                  className="h-9 px-6 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl border border-white/10"
                >
                  Order Details
               </button>
            </div>
          </motion.div>
        ))}

        <button 
           onClick={() => navigate('/rentals')}
           style={{ backgroundColor: '#0A0E17' }}
           className="w-full h-16 mt-6 rounded-2xl flex items-center justify-center gap-4 group active:scale-95 transition-all shadow-2xl border border-white/5"
        >
           <Bike size={20} className="text-white" />
           <span className="text-white font-black text-[11px] uppercase tracking-widest">Rent A New Steed</span>
        </button>
      </div>
    </div>
  );
};

export default BookingList;
