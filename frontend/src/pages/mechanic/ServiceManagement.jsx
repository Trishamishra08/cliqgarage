import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Wrench, ShieldCheck, 
  Clock, DollarSign, Plus,
  Trash2, Edit3, Save, 
  AlertCircle, ChevronRight,
  Bike, Car, Zap, Power
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const ServiceManagement = () => {
  const [activeCategory, setActiveCategory] = useState('Bike');
  const [services, setServices] = useState([
    { id: 1, name: 'Periodic Maintenance', price: '₹1,450', time: '120 Mins', category: 'Bike', active: true },
    { id: 2, name: 'Engine Oil Replacement', price: '₹850', time: '30 Mins', category: 'Bike', active: true },
    { id: 3, name: 'Brake Fluid Flush', price: '₹600', time: '45 Mins', category: 'Bike', active: false },
  ]);

  const toggleService = (id) => {
    setServices(services.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans">
      {/* 🚀 INDUSTRIAL HEADER */}
      <div className="bg-[#001F3D] pt-14 pb-12 px-6 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4A017]/10 rounded-full blur-[100px]" />
         <div className="relative z-10">
            <h1 className="text-xl font-black text-white uppercase tracking-tighter italic">Asset<span className="text-[#D4A017] not-italic ml-1">Intelligence</span></h1>
            <p className="text-[8px] font-bold text-white/40 uppercase tracking-[0.3em] mt-2 text-center sm:text-left">Inventory & Pricing Control Hub</p>
         </div>

         {/* 🚀 CATEGORY SWITCHER */}
         <div className="flex bg-white/5 backdrop-blur-md rounded-full p-1 mt-8 border border-white/10 relative z-10 w-full max-w-xs mx-auto sm:mx-0">
            {['Bike', 'Car'].map((cat) => (
               <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={twMerge(
                     "flex-1 h-10 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300",
                     activeCategory === cat ? "bg-white text-[#001F3D] shadow-lg" : "text-white/40"
                   )}
               >
                  {cat === 'Bike' ? <div className="flex items-center justify-center gap-2 px-2"><Bike size={12} /> Fleet A</div> : <div className="flex items-center justify-center gap-2 px-2"><Car size={12} /> Fleet B</div>}
               </button>
            ))}
         </div>
      </div>

      <div className="px-5 -mt-6 relative z-20 space-y-4">
         {/* 🚀 ADD NEW SERVICE TRIGGER */}
         <button className="w-full h-16 bg-white rounded-[2px] border border-dashed border-[#001F3D]/20 shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all group">
            <div className="w-8 h-8 rounded-full bg-[#001F3D] text-[#D4A017] flex items-center justify-center shadow-lg group-hover:rotate-90 transition-transform">
               <Plus size={18} />
            </div>
            <span className="text-[10px] font-black text-[#001F3D] uppercase tracking-widest">Architect New Portfolio Service</span>
         </button>

         {/* 🚀 SERVICE INVENTORY LIST */}
         <div className="space-y-3">
            {services.filter(s => s.category === activeCategory).map((service) => (
               <div key={service.id} className={twMerge(
                  "bg-white rounded-[2px] shadow-lg border border-slate-100 p-4 transition-all",
                  !service.active && "opacity-60 grayscale-[0.5]"
               )}>
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <div className="flex items-center gap-2 text-slate-300 mb-1.5">
                           <Wrench size={10} />
                           <span className="text-[7px] font-black uppercase tracking-widest">Protocol ID: SRV-{service.id}09</span>
                        </div>
                        <h3 className="text-sm font-black text-[#001F3D] uppercase tracking-tight">{service.name}</h3>
                     </div>
                     <button 
                        onClick={() => toggleService(service.id)}
                        className={twMerge(
                           "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[8px] font-black uppercase tracking-widest transition-all",
                           service.active ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-slate-50 border-slate-100 text-slate-400"
                        )}
                     >
                        <Power size={10} strokeWidth={3} /> {service.active ? 'Active' : 'Dormant'}
                     </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                     <div className="p-3 bg-slate-50 border border-slate-100 rounded-[2px]">
                        <div className="flex items-center gap-2 mb-1">
                           <DollarSign size={10} className="text-[#D4A017]" />
                           <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest leading-none">Unit Pricing</p>
                        </div>
                        <p className="text-[12px] font-black text-[#001F3D] tracking-tighter">{service.price}</p>
                     </div>
                     <div className="p-3 bg-slate-50 border border-slate-100 rounded-[2px]">
                        <div className="flex items-center gap-2 mb-1">
                           <Clock size={10} className="text-[#001F3D]" />
                           <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest leading-none">Time Slot</p>
                        </div>
                        <p className="text-[12px] font-black text-[#001F3D] tracking-tighter">{service.time}</p>
                     </div>
                  </div>

                  <div className="flex gap-2">
                     <button className="flex-1 h-10 bg-[#001F3D] text-[#D4A017] rounded-[2px] font-black text-[9px] uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
                        <Edit3 size={12} /> Calibrate
                     </button>
                     <button className="w-10 h-10 bg-red-50 text-red-500 rounded-[2px] flex items-center justify-center shadow-sm active:scale-95 transition-all">
                        <Trash2 size={16} />
                     </button>
                  </div>
               </div>
            ))}
         </div>

         {/* 🚀 OPERATIONAL HOURS MODULE */}
         <div className="bg-[#001F3D] rounded-[2px] p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A017]/10 rounded-full blur-2xl" />
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 bg-[#D4A017] text-[#001F3D] rounded-full flex items-center justify-center shadow-xl"><Clock size={20} /></div>
               <div>
                  <h4 className="text-[11px] font-black text-white uppercase tracking-widest">Temporal Logistics</h4>
                  <p className="text-[8px] font-bold text-[#D4A017] uppercase tracking-[0.3em]">Managed Working Hours</p>
               </div>
            </div>
            
            <div className="space-y-3">
               {[
                  { day: 'Mon - Fri', hours: '09:00 AM - 08:30 PM', active: true },
                  { day: 'Saturday', hours: '10:00 AM - 06:00 PM', active: true },
                  { day: 'Sunday', hours: 'WORKSHOP DORMANT', active: false }
               ].map((slot, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-3 flex justify-between items-center rounded-[2px]">
                     <span className="text-[9px] font-black text-white uppercase tracking-widest">{slot.day}</span>
                     <span className={twMerge("text-[8px] font-bold uppercase tracking-widest", slot.active ? "text-white/60" : "text-red-400 font-black")}>
                        {slot.hours}
                     </span>
                  </div>
               ))}
            </div>

            <button className="w-full h-12 mt-6 bg-white/5 border border-white/20 text-white rounded-full font-black text-[9px] uppercase tracking-[0.2em] hover:bg-[#D4A017] hover:text-[#001F3D] transition-all">
               Update Temporal Schedule
            </button>
         </div>
      </div>
    </div>
  );
};

export default ServiceManagement;
