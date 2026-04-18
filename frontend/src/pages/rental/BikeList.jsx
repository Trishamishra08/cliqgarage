import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bike, Car, Shield, MapPin, Star, ArrowRight, ArrowLeft, Search, SlidersHorizontal, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const BikeList = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('select'); // 'select' or 'dashboard'
  const [vehicleType, setVehicleType] = useState('Bike');
  const [searchQuery, setSearchQuery] = useState('');

  const vehicles = [
    {
      id: 1,
      name: "Kawasaki Ninja 400",
      class: "Bike",
      category: "Sport",
      price: "₹149",
      period: "hour",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=800&auto=format&fit=crop",
      features: ["ABS", "Bluetooth", "Traction"],
      available: true
    },
    {
      id: 2,
      name: "BMW M3 Competition",
      class: "Car",
      category: "Luxury",
      price: "₹2,499",
      period: "hour",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop",
      features: ["M-Sport", "Surround", "Launch"],
      available: true
    },
    {
       id: 3,
       name: "Himalayan 450",
       class: "Bike",
       category: "Adventure",
       price: "₹99",
       period: "hour",
       rating: 4.8,
       image: "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?q=80&w=800&auto=format&fit=crop",
       features: ["Luggage", "GPS", "Dual-ABS"],
       available: true
    },
    {
       id: 4,
       name: "Thar RWD Dark",
       class: "Car",
       category: "SUV",
       price: "₹499",
       period: "hour",
       rating: 4.7,
       image: "https://images.unsplash.com/photo-1627448843940-083f23a1f33f?q=80&w=800&auto=format&fit=crop",
       features: ["4x4 Style", "Convertible", "Diesel"],
       available: true
    }
  ];

  const filteredItems = vehicles.filter(v => 
    v.class === vehicleType && 
    v.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--bg-color)] pb-24 font-['Outfit']">
      <AnimatePresence mode="wait">
        {view === 'select' ? (
          <motion.div 
            key="select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -50 }}
            className="min-h-screen flex flex-col px-6 pt-20"
          >
             <div className="mb-12">
                <span className="text-[var(--primary-color)] font-black text-[10px] uppercase tracking-[0.5em] mb-3 block">Premium Fleet</span>
                <h1 className="text-4xl font-black text-[var(--text-main)] uppercase tracking-tight leading-none mb-4">Choose Your<br/>Experience</h1>
                <p className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-widest leading-relaxed">Select vehicle tier to browse our<br/>exclusive boutique collection</p>
             </div>

             <div className="flex flex-col gap-4">
                <motion.button 
                   whileTap={{ scale: 0.98 }}
                   onClick={() => { setVehicleType('Bike'); setView('dashboard'); }}
                   className="relative h-44 rounded-3xl overflow-hidden group shadow-2xl"
                >
                   <img src="https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=800" className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/20 to-transparent flex flex-col justify-end p-6">
                      <h2 className="text-2xl font-black text-white uppercase tracking-widest">Motorcycles</h2>
                      <span className="text-white/40 text-[8px] font-black uppercase tracking-[0.3em] mt-1">Sport / Gear / Adventure</span>
                   </div>
                   <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                      <Bike size={20} />
                   </div>
                </motion.button>

                <motion.button 
                   whileTap={{ scale: 0.98 }}
                   onClick={() => { setVehicleType('Car'); setView('dashboard'); }}
                   className="relative h-44 rounded-3xl overflow-hidden group shadow-2xl"
                >
                   <img src="https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800" className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/20 to-transparent flex flex-col justify-end p-6">
                      <h2 className="text-2xl font-black text-white uppercase tracking-widest">Luxury Cars</h2>
                      <span className="text-white/40 text-[8px] font-black uppercase tracking-[0.3em] mt-1">SUVs / Sedans / Electric</span>
                   </div>
                   <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                      <Car size={20} />
                   </div>
                </motion.button>
             </div>
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            {/* Deep Navy Header */}
            <div className="bg-[var(--header-color)] pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden border-b border-white/5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary-color)]/10 rounded-full -mr-32 -mt-32 blur-[80px]" />
              <div className="flex items-center justify-between mb-8 relative z-10">
                 <button onClick={() => setView('select')} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white border border-white/10 active:scale-90 transition-all"><ArrowLeft size={18} /></button>
                 <h2 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Showroom Dashboard</h2>
                 <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white border border-white/10"><Search size={16} /></div>
              </div>

              <div className="relative z-10 flex items-end justify-between">
                 <div>
                    <span className="text-[var(--primary-color)] font-black text-[9px] uppercase tracking-[0.4em] mb-2 block">{vehicleType} Collection</span>
                    <h1 className="text-3xl font-black text-white uppercase tracking-widest leading-none mb-4">The Fleet</h1>
                 </div>
                 <div className="bg-white/5 p-1 rounded-xl border border-white/10 flex gap-1 mb-2">
                    <button onClick={() => setVehicleType('Bike')} className={twMerge("px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest", vehicleType === 'Bike' ? "bg-[var(--secondary-color)] text-white" : "text-white/40")}>Bike</button>
                    <button onClick={() => setVehicleType('Car')} className={twMerge("px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest", vehicleType === 'Car' ? "bg-[var(--secondary-color)] text-white" : "text-white/40")}>Car</button>
                 </div>
              </div>
            </div>

            <div className="px-6 mt-8 space-y-6">
               <div className="grid grid-cols-1 gap-6 pb-24">
                  {filteredItems.map((v, i) => (
                    <motion.div
                      key={i}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[var(--card-bg)] rounded-[2rem] border border-[var(--border-color)] overflow-hidden shadow-2xl relative group active:scale-[0.98] transition-all"
                    >
                       <div className="h-44 relative">
                          <img src={v.image} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
                          <div className="absolute top-4 left-4">
                             <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[7px] font-black text-white uppercase tracking-widest border border-white/10">{v.category}</span>
                          </div>
                          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg border border-[var(--primary-color)]/20">
                             <Star size={9} fill="#D4A017" className="text-[#D4A017]" />
                             <span className="text-[10px] font-black text-[var(--header-color)]">{v.rating}</span>
                          </div>
                       </div>

                       <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                             <div>
                                <h4 className="text-xl font-black text-[var(--text-main)] uppercase tracking-widest leading-none mb-2">{v.name}</h4>
                                <div className="flex items-center gap-1.5 text-zinc-500">
                                   <MapPin size={10} className="text-[var(--primary-color)]" />
                                   <span className="text-[8px] font-black uppercase tracking-widest">Available @ Hub-04</span>
                                </div>
                             </div>
                             <div className="text-right">
                                <div className="flex items-baseline gap-1 leading-none">
                                   <span className="text-xl font-black text-[var(--primary-color)]">{v.price}</span>
                                   <span className="text-[8px] font-bold text-zinc-400 capitalize">/hr</span>
                                </div>
                             </div>
                          </div>

                          <div className="flex items-center gap-2 mb-6 pt-4 border-t border-dashed border-[var(--border-color)]">
                             {v.features.map((f, idx) => (
                               <div key={idx} className="flex items-center gap-1 opacity-70">
                                  <Zap size={9} className="text-[var(--primary-color)]" />
                                  <span className="text-[8px] font-black text-zinc-500 uppercase tracking-tight">{f}</span>
                               </div>
                             ))}
                          </div>

                          <button 
                             onClick={() => navigate(`/rentals/${v.id}`)}
                             className="w-full h-14 bg-[var(--header-color)] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all"
                          >
                             Reserve Vehicle
                             <ArrowRight size={14} />
                          </button>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BikeList;
