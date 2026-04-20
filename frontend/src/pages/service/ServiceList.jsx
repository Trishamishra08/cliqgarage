import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Star, MapPin, Clock, 
  Shield, ChevronRight, Zap, Car, Bike, 
  LifeBuoy, Wrench, ArrowLeft, Settings,
  CheckCircle2, Info, Droplets, Gauge, 
  Battery, Wind, Snowflake, Scissors, 
  History, ShieldAlert, AlertTriangle, PhoneCall, Heart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import BottomNav from '../../components/common/BottomNav';

const ServiceList = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('car');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'general', name: 'General Service', icon: Wrench },
    { id: 'periodic', name: 'Periodic Service', icon: Clock },
    { id: 'engine', name: 'Engine Works', icon: Settings },
    { id: 'body', name: 'Body Shop', icon: Scissors },
    { id: 'oil', name: 'Oil Service', icon: Droplets },
    { id: 'custom', name: 'Custom Tuning', icon: Gauge },
  ];

  const mechanics = [
    {
      id: 1,
      name: "Elite Performance Hub",
      rating: 4.9,
      distance: "1.2 km",
      location: "Industrial Area, New Delhi",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=400",
      startingPrice: 999,
      type: "Store"
    },
    {
      id: 2,
      name: "FastFix Auto Care",
      rating: 4.7,
      distance: "3.5 km",
      location: "Sector 62, Gurgaon",
      image: "https://images.unsplash.com/photo-1517524008436-bbdb53c57d59?q=80&w=400",
      startingPrice: 299,
      type: "Store"
    },
    {
      id: 3,
      name: "The Bike Smith",
      rating: 4.8,
      distance: "2.1 km",
      location: "Majnu ka Tilla, Delhi",
      image: "https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=400",
      startingPrice: 499,
      type: "Store"
    }
  ];

  const filteredMechanics = mechanics.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-40 font-['Outfit']">
      {/* 🏗️ Branded Top Bar */}
      <div className="bg-[#001F3D] pt-8 pb-12 px-6 rounded-b-[2.5rem] shadow-lg relative z-10">
         <div className="flex items-center justify-between text-white">
            <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10" onClick={() => navigate(-1)}>
               <ArrowLeft size={20} />
            </div>
            <div className="text-center">
               <span className="text-[#D4A017] text-[7px] font-black uppercase tracking-[0.4rem] block mb-1">CliqGarage</span>
               <h1 className="text-[14px] font-black uppercase tracking-widest">Service Hub</h1>
            </div>
            <div className="w-10 h-10 bg-[#D4A017] rounded-2xl flex items-center justify-center text-[#001F3D]">
               <Settings size={20} />
            </div>
         </div>
      </div>

      {/* 🏷️ Minimalist Horizontal Category Pills (As per image) */}
      <div className="px-5 -mt-6 relative z-20">
         <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
            <motion.button
               onClick={() => setActiveCategory('all')}
               className={twMerge(
                  "whitespace-nowrap px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                  activeCategory === 'all' ? "bg-[#001F3D] text-white shadow-xl" : "bg-white text-slate-400 border border-slate-100 shadow-sm"
               )}
            >
               All
            </motion.button>
            {categories.map((cat) => (
               <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={twMerge(
                     "whitespace-nowrap px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-sm",
                     activeCategory === cat.id ? "bg-[#001F3D] text-white shadow-xl" : "bg-white text-slate-400 border border-slate-100"
                  )}
               >
                  {cat.name.split(' ')[0]}
               </motion.button>
            ))}
         </div>
      </div>

      {/* 🛠️ Specialist Listing Hub */}
      <div className="px-5 mt-10 space-y-4">
         <div className="flex items-center justify-between mb-2">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3rem] text-slate-300">Local Experts</h2>
            <Filter size={14} className="text-[#D4A017]" />
         </div>

         {filteredMechanics.map((mech) => (
            <motion.div 
               key={mech.id}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               onClick={() => navigate(`/services/${mech.id}`)}
               className="bg-white rounded-[2rem] p-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-50 flex items-center gap-4 group active:scale-[0.98] transition-all relative"
            >
               {/* 📸 Compact Shop Image */}
               <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden bg-slate-50 shrink-0 shadow-inner">
                  <img src={mech.image} className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700" alt={mech.name} />
               </div>
               
               {/* 📝 Intelligence Section */}
               <div className="flex-1 min-w-0 pr-10">
                  <div className="mb-2">
                     <div className="flex items-center justify-between mb-0.5">
                        <h3 className="text-[11px] font-black text-[#001F3D] uppercase tracking-tight truncate w-full">{mech.name}</h3>
                     </div>
                     <p className="text-[7.5px] font-bold text-slate-400 leading-tight line-clamp-1 italic uppercase tracking-wider opacity-60">
                        {mech.id === 1 ? "Performance Overhaul Facility" : 
                         mech.id === 2 ? "High-Speed Interval Specialists" :
                         "Dedicated Performance Custom Hub"}
                     </p>
                  </div>
                  
                  <div className="flex items-baseline gap-1">
                     <span className="text-[7px] font-bold text-slate-300 uppercase tracking-widest">Starts at</span>
                     <span className="text-[14px] font-black text-[#001F3D] tracking-tighter">₹{mech.startingPrice}</span>
                  </div>
               </div>

               {/* 🏷️ Micro Badge (Top Right) */}
               <div className="absolute top-3 right-4">
                  <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                     <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-[6px] font-black text-emerald-600 uppercase tracking-widest leading-none">Ready</span>
                  </div>
               </div>

               {/* 🛒 Micro Action (Bottom Right) */}
               <div className="absolute bottom-3 right-3">
                  <button className="w-9 h-9 bg-[#001F3D] text-[#D4A017] rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all group-hover:bg-[#D4A017] group-hover:text-[#001F3D]">
                     <ChevronRight size={16} strokeWidth={4} />
                  </button>
               </div>
            </motion.div>
         ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default ServiceList;
