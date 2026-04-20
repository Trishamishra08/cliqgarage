import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bike, MapPin, Star, ArrowRight, ChevronLeft, Search, Zap, Calendar, Users, Fuel, Settings2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const BikeList = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('All');

  const fleet = [
    { id: 1, name: "Kawasaki Ninja 400", type: "Sport", p: "1499", stat: "Available", img: "https://images.unsplash.com/photo-1558981403-c59899a28bc?q=80&w=600&auto=format&fit=crop", eng: "400cc", gear: "6-Speed", fuel: "Petrol" },
    { id: 2, name: "RE Himalayan 450", type: "Adventure", p: "1299", stat: "Occupied", img: "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?q=80&w=600&auto=format&fit=crop", eng: "450cc", gear: "Manual", fuel: "Petrol" },
    { id: 3, name: "BMW M3 Competition", type: "Luxury", p: "4999", stat: "Available", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=600&auto=format&fit=crop", eng: "3.0L V6", gear: "Auto", fuel: "Petrol" },
    { id: 4, name: "Mahindra Thar 4x4", type: "SUV", p: "1999", stat: "Available", img: "https://images.unsplash.com/photo-1627448843940-083f23a1f33f?q=80&w=600&auto=format&fit=crop", eng: "2.2L mHawk", gear: "Manual", fuel: "Diesel" }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-28 font-['Outfit'] relative overflow-x-hidden">
      {/* 🧭 Showroom Navigation Console */}
      <div className="bg-[#001F3D] pt-4 pb-6 px-6 rounded-b-2xl shadow-2xl relative z-10 border-b border-[#D4A017]/30">
         <div className="flex items-center justify-between mb-6">
            <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white border border-white/10 active:scale-95 transition-all"><ChevronLeft size={16} /></button>
            <div className="text-center">
               <p className="text-[6px] font-black text-[#D4A017] uppercase tracking-[0.4em] mb-0.5 italic">Protocol Step 2/6</p>
               <h1 className="text-[11px] font-black text-white uppercase tracking-tighter">Fleet Selection</h1>
            </div>
            <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#D4A017] border border-white/10"><Zap size={14} /></button>
         </div>

         <div className="grid grid-cols-2 gap-2 mb-6">
            <div className="bg-white/5 p-2 px-3 rounded-xl border border-white/5 flex items-center gap-3">
               <MapPin size={12} className="text-[#D4A017]" />
               <div className="flex flex-col">
                  <span className="text-[5px] font-black text-white/30 uppercase tracking-widest">Hub-04 Terminal</span>
                  <span className="text-[7px] font-black text-white uppercase">Mumbai, MH</span>
               </div>
            </div>
            <div className="bg-white/5 p-2 px-3 rounded-xl border border-white/5 flex items-center gap-3">
               <Calendar size={12} className="text-[#D4A017]" />
               <div className="flex flex-col">
                  <span className="text-[5px] font-black text-white/30 uppercase tracking-widest">Selected Date</span>
                  <span className="text-[7px] font-black text-white uppercase">20 APR 2026</span>
               </div>
            </div>
         </div>

         <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            {['All', 'Sport', 'Adventure', 'SUV', 'Luxury'].map(t => (
              <button key={t} onClick={() => setCategory(t)} className={twMerge("px-5 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all border shrink-0", category === t ? "bg-[#D4A017] text-[#001F3D] border-[#D4A017]" : "bg-white/5 text-white/40 border-white/5")}>{t}</button>
            ))}
         </div>
      </div>

      {/* 🚀 High-Density Horizontal Fleet */}
      <div className="px-5 mt-4 space-y-2.5">
         {fleet.filter(v => category === 'All' || v.type === category).map((v) => (
           <motion.div 
             key={v.id}
             whileTap={{ scale: 0.98 }}
             onClick={() => navigate(`/rentals/${v.id}`)}
             className={twMerge(
               "bg-white rounded-xl border p-2 flex gap-3 transition-all cursor-pointer relative overflow-hidden",
               v.stat === 'Occupied' ? "opacity-60 grayscale-[0.5] border-slate-100" : "border-white shadow-lg shadow-slate-200/40"
             )}
           >
              {/* Asset Preview */}
              <div className="w-28 h-24 rounded-lg overflow-hidden shrink-0 relative">
                 <img src={v.img} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                 <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded text-[5px] font-black text-white uppercase tracking-widest border border-white/10">
                    {v.type}
                 </div>
              </div>

              {/* Data Node */}
              <div className="flex-grow flex flex-col justify-between py-0.5">
                 <div className="flex justify-between items-start">
                    <div>
                       <h3 className="text-[11px] font-black text-[#001F3D] uppercase tracking-tighter leading-none mb-1">{v.name}</h3>
                       <div className="flex gap-2 opacity-50">
                          <div className="flex items-center gap-0.5 text-[6px] font-black text-slate-500 uppercase">
                             <Settings2 size={7} /> {v.gear}
                          </div>
                          <div className="flex items-center gap-0.5 text-[6px] font-black text-slate-500 uppercase">
                             <Fuel size={7} /> {v.fuel}
                          </div>
                       </div>
                    </div>
                    <div className={twMerge("px-2 py-0.5 rounded text-[5px] font-black uppercase tracking-widest", v.stat === 'Available' ? "bg-emerald-50/50 text-emerald-600" : "bg-slate-50 text-slate-400")}>
                       {v.stat}
                    </div>
                 </div>

                 <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-0.5 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                       <Star size={7} fill="#D4A017" className="text-[#D4A017]" />
                       <span className="text-[7px] font-black text-[#001F3D]">5.0</span>
                    </div>
                    <span className="text-[6px] font-black text-slate-300 uppercase tracking-widest italic">{v.eng} Protocol</span>
                 </div>

                 <div className="flex items-center justify-between pt-1 border-t border-slate-50">
                    <div className="flex items-baseline gap-0.5 leading-none">
                       <span className="text-[12px] font-black text-[#001F3D]">₹{v.p}</span>
                       <span className="text-[7px] font-bold text-slate-300">/day</span>
                    </div>
                    <div className="w-6 h-6 bg-[#001F3D] rounded-full flex items-center justify-center text-[#D4A017] shadow-lg active:scale-90 transition-transform">
                       <ArrowRight size={12} />
                    </div>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>

      <div className="px-10 py-10 flex flex-col items-center">
         <p className="text-[7px] font-black text-slate-300 uppercase tracking-[0.5em] mb-2 italic">Authorized Fleet Maintenance System</p>
         <div className="h-px w-20 bg-slate-100" />
      </div>
    </div>
  );
};

export default BikeList;
