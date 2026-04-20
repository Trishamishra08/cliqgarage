import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, Calendar, Clock, Star, MapPin, ShieldCheck, Zap, Shield, ArrowRight, CheckCircle2, History } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const BikeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [duration, setDuration] = useState(1); // 1-7 days
  const [unit, setUnit] = useState('Day'); // 'Hour' or 'Day'
  const [hasInsurance, setHasInsurance] = useState(true);
  const [location, setLocation] = useState('Boutique Hub-01');

  // Dummy data
  const bike = {
    id: 1,
    name: "Kawasaki Ninja 400",
    cat: "Sport Premium",
    p_hour: 149,
    p_day: 1499,
    deposit: 5000,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1558981403-c59899a28bc?q=80&w=1200&auto=format&fit=crop",
    specs: { eng: "399cc", pwr: "45hp", wgt: "168kg" }
  };

  const calculateTotal = () => {
    const base = unit === 'Day' ? duration * bike.p_day : duration * bike.p_hour;
    const insurance = hasInsurance ? (unit === 'Day' ? duration * 199 : duration * 49) : 0;
    return base + insurance;
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-32 font-['Outfit'] relative overflow-x-hidden">
      {/* 🏎️ Cinematic Vehicle Preview */}
      <div className="relative h-[35vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          src={bike.image} 
          className="w-full h-full object-cover grayscale-[0.2] contrast-125 transition-all duration-1000" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001F3D] via-transparent to-transparent opacity-80" />
        
        <div className="absolute top-4 left-6 right-6 flex items-center justify-between z-50">
          <button onClick={() => navigate(-1)} className="w-8 h-8 bg-white/10 backdrop-blur-md rounded border border-white/20 flex items-center justify-center text-white"><ChevronLeft size={16} /></button>
          <div className="text-center">
            <p className="text-[7px] font-black text-[#D4A017] uppercase tracking-[0.4em] italic mb-0.5">Vehicle Specification</p>
            <h1 className="text-sm font-black text-white uppercase tracking-tighter shrink-0">{bike.name}</h1>
          </div>
          <button className="w-8 h-8 bg-white/10 backdrop-blur-md rounded border border-white/20 flex items-center justify-center text-[#D4A017]"><Info size={16} /></button>
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
           <div className="flex gap-2">
              {Object.entries(bike.specs).map(([k, v]) => (
                <div key={k} className="bg-white/10 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/10 flex flex-col items-center">
                   <span className="text-[6px] font-black text-white/50 uppercase tracking-widest leading-none mb-1">{k}</span>
                   <span className="text-[8px] font-black text-[#D4A017] uppercase">{v}</span>
                </div>
              ))}
           </div>
           <div className="bg-[#D4A017] px-3 py-1.5 rounded flex items-center gap-1.5 shadow-xl">
              <Star size={10} fill="#001F3D" className="text-[#001F3D]" />
              <span className="text-[9px] font-black text-[#001F3D]">{bike.rating}</span>
           </div>
        </div>
      </div>

      <div className="px-5 mt-4 space-y-3 relative z-20">
        {/* 🛂 Rental Configuration Hub */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xl relative overflow-hidden">
           <div className="flex items-center justify-between mb-5">
              <div>
                 <h2 className="text-[10px] font-black text-[#001F3D] uppercase tracking-widest leading-none mb-1">Configuration Terminal</h2>
                 <p className="text-[7px] font-bold text-slate-300 uppercase italic">Set duration & tier</p>
              </div>
              <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
                 {['Hour', 'Day'].map(u => (
                   <button key={u} onClick={() => { setUnit(u); setDuration(1); }} className={twMerge("px-3 py-1 rounded text-[7px] font-black uppercase tracking-widest transition-all", unit === u ? "bg-[#001F3D] text-[#D4A017]" : "text-slate-300")}>{u}</button>
                 ))}
              </div>
           </div>

           {/* Duration Slider */}
           <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <Clock size={12} className="text-[#D4A017]" />
                   <span className="text-[9px] font-black text-[#001F3D] uppercase tracking-widest">Selected Period</span>
                 </div>
                 <span className="text-[10px] font-black text-[#001F3D]">{duration} {unit}{duration > 1 ? 's' : ''}</span>
              </div>
              <input 
                type="range" min="1" max={unit === 'Day' ? 14 : 12} step="1" 
                value={duration} onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-100 rounded-full appearance-none accent-[#001F3D] cursor-pointer"
              />
              <div className="flex justify-between text-[6px] font-black text-slate-300 uppercase tracking-widest italic">
                 <span>Min 1 {unit}</span>
                 <span>Max {unit === 'Day' ? '14 Days' : '12 Hours'}</span>
              </div>
           </div>

           {/* Location & Calendar */}
           <div className="grid grid-cols-2 gap-3 pt-6 border-t border-slate-50">
              <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                 <div className="flex items-center gap-2 mb-2">
                    <MapPin size={10} className="text-[#D4A017]" />
                    <span className="text-[7px] font-black text-[#001F3D] uppercase tracking-widest">Collection</span>
                 </div>
                 <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-transparent text-[8px] font-black text-slate-500 uppercase outline-none">
                    {['Boutique Hub-01', 'City Terminal', 'Airport Suite'].map(loc => <option key={loc} value={loc}>{loc}</option>)}
                 </select>
              </div>
              <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-100 relative group">
                 <div className="flex items-center gap-2 mb-2">
                    <Calendar size={10} className="text-[#D4A017]" />
                    <span className="text-[7px] font-black text-[#001F3D] uppercase tracking-widest">Availability</span>
                 </div>
                 <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className={twMerge("w-2 h-2 rounded-sm", i < 4 ? "bg-emerald-400" : "bg-slate-200")} />)}
                 </div>
                 <span className="text-[6px] font-black text-emerald-500 uppercase italic mt-1 block">Live: Ready</span>
              </div>
           </div>
        </div>

        {/* 📑 Dynamic Settlement Ledger */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xl">
           <div className="flex items-center justify-between mb-5">
              <h4 className="text-[10px] font-black text-[#001F3D] uppercase tracking-widest">Fulfillment Ledger</h4>
              <History size={14} className="text-slate-100" />
           </div>

           <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                 <span>Base Tariff ({duration} {unit})</span>
                 <span className="font-black text-[#001F3D]">₹{unit === 'Day' ? duration * bike.p_day : duration * bike.p_hour}</span>
              </div>
              <div className="flex justify-between items-center text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                 <span>Boutique Insurance (Inc.)</span>
                 <span className="font-black text-emerald-500">₹0.00</span>
              </div>
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-2">
                   <Shield size={10} className="text-[#D4A017]" />
                   <span className="text-[8px] font-black text-[#001F3D] uppercase tracking-widest">Security Protocol</span>
                 </div>
                 <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest italic">Optional: ₹{bike.deposit}</span>
              </div>
           </div>

           <div className="bg-[#001F3D] p-4 rounded-xl flex items-center justify-between shadow-2xl">
              <div>
                 <p className="text-[7px] font-black text-white/40 uppercase tracking-widest mb-1">Authorization Amount</p>
                 <p className="text-2xl font-black text-white tracking-tighter">₹{calculateTotal()}</p>
              </div>
              <div className="text-right">
                 <p className="text-[7px] font-black text-[#D4A017] uppercase tracking-widest italic mb-1">Instant Hold</p>
                 <div className="flex items-center gap-1 text-[8px] font-bold text-white uppercase">
                    <CheckCircle2 size={10} className="text-emerald-400" /> Secure
                 </div>
              </div>
           </div>
        </div>

        {/* 🛂 Reservation Trigger */}
        <button 
           onClick={() => navigate('/rentals/confirm', { state: { total: calculateTotal(), name: bike.name } })}
           className="w-full h-14 bg-[#001F3D] text-[#D4A017] rounded-xl flex items-center justify-center gap-4 shadow-2xl active:scale-95 transition-all group"
        >
           <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Confirm Reservation</span>
              <span className="text-[6px] font-bold text-white/50 uppercase tracking-widest italic">Authorized Gateway Initiation</span>
           </div>
           <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-center text-[7px] font-bold text-slate-300 uppercase tracking-[0.4em] py-4 italic">ClivVault Encryption #RZ-99 Active</p>
      </div>
    </div>
  );
};

export default BikeDetails;
