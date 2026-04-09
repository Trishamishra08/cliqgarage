import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Star, MapPin, Clock, 
  Shield, ChevronRight, Zap, Car, Bike, 
  LifeBuoy, Wrench, ArrowLeft, Settings,
  CheckCircle2, Info, Droplets, Gauge, 
  Battery, Wind, Snowflake, Scissors, 
  History, ShieldAlert, AlertTriangle, PhoneCall
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const ServiceList = () => {
  const navigate = useNavigate();
  const [vehicleType, setVehicleType] = useState('car'); // 'car' or 'bike'
  const [searchQuery, setSearchQuery] = useState('');

  const carServices = [
    { name: 'General Service', icon: Settings, desc: 'Full checkup' },
    { name: 'Engine Repair', icon: Wrench, desc: 'Performance' },
    { name: 'Oil Change', icon: Droplets, desc: 'Synthetic oil' },
    { name: 'Brake Check', icon: Gauge, desc: 'Pads & fluid' },
    { name: 'Battery', icon: Battery, desc: 'Health & replace' },
    { name: 'AC Repair', icon: Snowflake, desc: 'Gas refill' },
    { name: 'Alignment', icon: LifeBuoy, desc: 'Balancing' },
    { name: 'Car Detailing', icon: Droplets, desc: 'Wash & wax' },
    { name: 'Dent & Paint', icon: Scissors, desc: 'Body work' },
    { name: 'Emergency', icon: ShieldAlert, desc: '24/7 Support' },
  ];

  const bikeServices = [
    { name: 'General Service', icon: Settings, desc: 'Routine care' },
    { name: 'Engine Tune-Up', icon: Zap, desc: 'Performance' },
    { name: 'Oil Change', icon: Droplets, desc: 'Engine flush' },
    { name: 'Brake Repair', icon: Gauge, desc: 'Drum & disc' },
    { name: 'Chain Care', icon: History, desc: 'Lube & clean' },
    { name: 'Tyre & Puncture', icon: LifeBuoy, desc: 'Nitrogen' },
    { name: 'Battery', icon: Battery, desc: 'Replacement' },
    { name: 'Bike Wash', icon: Droplets, desc: 'Foam cleaning' },
    { name: 'Accident Repair', icon: AlertTriangle, desc: 'Claims help' },
    { name: 'Emergency', icon: ShieldAlert, desc: 'Roadside' },
  ];

  const currentServices = vehicleType === 'car' ? carServices : bikeServices;

  const handleServiceClick = (serviceName) => {
    navigate('/services/1', { state: { vehicle: vehicleType, service: serviceName } });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-40 font-['Outfit']">
      {/* 🚀 Compact Streamlined Header */}
      <div className="pt-4 pb-2 px-6 rounded-b-[2rem] shadow-2xl relative overflow-hidden bg-[#0A0E17] border-b border-[#004AAD]/40">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#004AAD]/20 rounded-full -mr-24 -mt-24 blur-[80px]" />
        
        <div className="flex items-center justify-between mb-1 relative z-20">
           <button onClick={() => navigate('/')} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white border border-white/10 active:scale-95 transition-all">
              <ArrowLeft size={14} />
           </button>
           <div className="text-center">
              <span className="text-[#004AAD] text-[7px] font-bold uppercase tracking-[0.4em] block mb-0.5">Elite Solutions</span>
              <h1 className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">Service Hub</h1>
           </div>
           <div className="w-8 h-8 bg-[#004AAD]/10 rounded-lg flex items-center justify-center text-[#004AAD] border border-[#004AAD]/20">
              <Settings size={14} />
           </div>
        </div>

        {/* Compressed & Professional Selection Area */}
        <div className="relative z-20 flex justify-center gap-14 mt-1">
           {['car', 'bike'].map((type) => (
             <motion.div 
               key={type}
               onClick={() => setVehicleType(type)}
               whileTap={{ scale: 0.95 }}
               className={twMerge(
                  "flex flex-col items-center gap-2.5 cursor-pointer transition-all duration-500",
                  vehicleType === type ? "scale-105 opacity-100" : "opacity-40 scale-90"
               )}
             >
                <div className={twMerge(
                   "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-2xl",
                   vehicleType === type ? "bg-white border-[#004AAD]" : "bg-white/5 border-white/10"
                )}>
                   {type === 'car' ? (
                     <Car size={18} className={vehicleType === 'car' ? "text-[#004AAD]" : "text-white/40"} />
                   ) : (
                     <Bike size={18} className={vehicleType === 'bike' ? "text-[#004AAD]" : "text-white/40"} />
                   )}
                </div>
                <span className={twMerge(
                  "text-[8px] font-black uppercase tracking-[0.2em] mb-4",
                  vehicleType === type ? "text-white" : "text-white/40"
                )}>FOR {type}</span>
             </motion.div>
           ))}
        </div>
      </div>

      {/* 🔍 Professional Search */}
      <div className="px-6 -mt-4 relative z-30">
        <div className="bg-white/95 backdrop-blur-2xl rounded-xl shadow-2xl border border-white flex items-center px-4 h-10">
          <Search size={14} className="text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder={`SEARCH ${vehicleType.toUpperCase()} SERVICES...`}
            className="flex-1 bg-transparent border-none focus:outline-none text-[8px] font-semibold text-slate-900 placeholder:text-slate-300 uppercase tracking-widest"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Filter size={14} className="text-[#004AAD]" />
        </div>
      </div>

      {/* 🏎️ Grid with Balanced Weight */}
      <div className="mt-6 px-5">
         <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-[8px] font-bold text-[#0A0E17]/40 uppercase tracking-[0.4em]">Available Support</h2>
            <div className="h-px bg-[#004AAD]/10 flex-1 ml-4" />
         </div>

         <div className="grid grid-cols-2 gap-3">
            <AnimatePresence mode="wait">
               {currentServices.map((service, i) => (
                 <motion.div
                   key={`${vehicleType}-${service.name}`}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: i * 0.02 }}
                   onClick={() => handleServiceClick(service.name)}
                   className="bg-white p-3.5 rounded-[1.8rem] border border-white shadow-sm flex flex-col group active:scale-[0.96] transition-all hover:shadow-xl"
                 >
                    <div className="flex items-start justify-between mb-2">
                        <div className="w-8 h-8 rounded-lg bg-[#F0F6FF] flex items-center justify-center text-[#004AAD] group-hover:bg-[#004AAD] group-hover:text-white transition-all duration-300">
                           <service.icon size={16} />
                        </div>
                        <ChevronRight size={10} className="text-slate-200 group-hover:text-[#004AAD]" />
                    </div>
                    <h3 className="text-[8px] font-bold text-slate-900 uppercase tracking-[0.15em] leading-tight mb-0.5">{service.name}</h3>
                    <p className="text-[7px] font-medium text-slate-400 uppercase tracking-tight line-clamp-1">{service.desc}</p>
                 </motion.div>
               ))}
            </AnimatePresence>
         </div>
      </div>

      {/* 🚨 Tighter Emergency SOS 🚨 */}
      <div className="mt-8 px-5">
         <div 
           onClick={() => handleServiceClick('Emergency Rescue')}
           className="bg-[#0A0E17] rounded-[1.8rem] p-4 text-white relative overflow-hidden flex items-center shadow-xl border border-white/5 group cursor-pointer active:scale-95 transition-all"
         >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#004AAD]/20 rounded-full -mr-12 -mt-12 blur-2xl" />
            
            <div className="relative z-10 flex-1 flex flex-col">
               <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                  <span className="text-[7px] font-bold uppercase tracking-[0.3em] text-white/50">Emergency Rescue</span>
               </div>
               <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] leading-none mb-1">Breakdown SOS</h3>
               <p className="text-[7px] font-medium text-white/40 uppercase tracking-widest mb-3 italic">Arrival in <span className="text-white not-italic font-bold">20-25 Mins</span></p>
               
               <div className="flex gap-2">
                  <button className="h-7 px-4 bg-white text-[#0A0E17] rounded-lg text-[7.5px] font-bold uppercase tracking-widest shadow-xl">
                     Call Help
                  </button>
                  <div className="h-7 w-7 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
                     <PhoneCall size={10} />
                  </div>
               </div>
            </div>

            <div className="relative z-10">
               <div className="w-12 h-12 bg-[#004AAD]/10 rounded-xl border border-[#004AAD]/30 flex items-center justify-center backdrop-blur-md">
                  <ShieldAlert size={24} className="text-[#004AAD]" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ServiceList;
