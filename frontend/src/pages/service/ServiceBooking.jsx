import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, Star, MapPin, ShieldCheck, 
  CheckCircle2, ChevronRight, Calendar, 
  Clock, Plus, CreditCard, Shield, 
  Bike, Car, Settings, Check, Zap, X,
  Lock, Loader2, History, ShieldAlert, AlertTriangle, PhoneCall, Heart,
  Home, Phone, Mail, Search, Filter, Download, FileText
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import BottomNav from '../../components/common/BottomNav';

const ServiceBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(location.state?.vehicle || null);
  const [selectedServices, setSelectedServices] = useState(location.state?.service ? [location.state?.service] : []);
  const [selectedDate, setSelectedDate] = useState('2026-04-20');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [vehicleTab, setVehicleTab] = useState('all');
  const [vehicleSearch, setVehicleSearch] = useState('');
  const [bookingMode, setBookingMode] = useState('pickup'); // 'pickup' or 'store'
  const [bookingStatus, setBookingStatus] = useState('Sent'); // 'Sent', 'Accepted', 'In-progress', 'Completed'

  const vehicles = [
    { id: 1, name: "Royal Enfield Bullet 350", type: "bike", reg: "DL 3S CC 1234", image: "https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=400" },
    { id: 2, name: "BMW M3 Competition", type: "car", reg: "HR 26 DQ 8888", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=400" },
    { id: 3, name: "KTM Duke 390", type: "bike", reg: "DL 5S AC 5678", image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=400" },
    { id: 4, name: "Mercedes C-Class", type: "car", reg: "PB 10 CF 9999", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=400" },
    { id: 5, name: "Yamaha R15 V4", type: "bike", reg: "UP 16 AS 1122", image: "https://images.unsplash.com/photo-1620939511593-376527f30058?q=80&w=400" },
  ];

  const mechanic = location.state?.mechanic || {
    id: 1,
    name: "Elite Performance Hub",
    type: "Premium Specialist",
    address: "Industrial Area, Phase-I, New Delhi",
    distance: "1.2 km",
    status: "Open Now",
    description: "Your one-stop destination for premium automotive care. We specialize in high-performance tuning, genuine parts, and precision maintenance for luxury vehicles. Our certified experts ensure top-tier reliability with state-of-the-art diagnostic tools.",
    rating: 4.9,
    reviews: 124,
    startingPrice: 999,
    image: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&q=80&w=600&h=300",
    badges: ["Authorized Center", "Premium Parts", "Certified Staff"],
    services: [
        { id: 101, name: "Maintenance Core", price: 2999, desc: "Full service & systems check" },
        { id: 102, name: "Performance Flush", price: 1899, desc: "Synthetic performance engine oil" },
        { id: 103, name: "Precision Braking", price: 1299, desc: "Fluid refill & pad optimization" },
        { id: 104, name: "Precision Tuning", price: 899, desc: "Computerized ECU optimization" },
        { id: 105, name: "Wheel Realignment", price: 599, desc: "High-precision laser balancing" }
    ]
  };

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(vehicleSearch.toLowerCase()) || v.reg.toLowerCase().includes(vehicleSearch.toLowerCase());
    const matchesTab = vehicleTab === 'all' || v.type === vehicleTab;
    return matchesSearch && matchesTab;
  });

  const slots = ["09:00 AM", "10:30 AM", "12:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"];

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
        setStep(6);
        // Simulate status progression
        setTimeout(() => setBookingStatus('Accepted'), 3000);
        setTimeout(() => setBookingStatus('In-progress'), 7000);
        setTimeout(() => setBookingStatus('Completed'), 12000);
    }, 3000);
  };

  const toggleService = (s) => {
    if (selectedServices.find(item => item.id === s.id)) {
      setSelectedServices(selectedServices.filter(item => item.id !== s.id));
    } else {
      setSelectedServices([...selectedServices, s]);
    }
  };

  const totalAmount = selectedServices.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="max-w-md mx-auto bg-[#F8FAFC] min-h-screen pb-32 font-['Outfit'] relative">
       <AnimatePresence>
          {isProcessing && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
                <div className="relative mb-8">
                   <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-24 h-24 border-b-2 border-t-2 border-[#001F3D] rounded-full" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Lock size={32} className="text-[#001F3D] animate-pulse" />
                   </div>
                </div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-[0.3em] mb-2 px-10 text-center">Securing Transaction</h3>
                <p className="text-[9px] font-medium text-slate-400 uppercase tracking-widest leading-relaxed px-12 text-center">Processing through Stripe Connect encryption...</p>
             </motion.div>
          )}
       </AnimatePresence>

       <div className="bg-[#001F3D] pt-4 pb-4 px-6 rounded-b-[1.5rem] shadow-xl relative z-10 transition-all border-b border-white/5">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
                <button 
                   onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
                   className="w-8 h-8 bg-white/5 backdrop-blur-md rounded-lg flex items-center justify-center text-white border border-white/10 active:scale-95 transition-all"
                >
                   <ChevronLeft size={16} />
                </button>
                <div className="flex flex-col">
                   <h1 className="text-[12px] font-black text-white uppercase tracking-[0.1em] leading-none">Process Studio</h1>
                   <span className="text-[#D4A017] text-[6px] font-black uppercase tracking-[0.3rem] mt-0.5">Step {step}/6</span>
                </div>
             </div>
             
             <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6].map((s) => (
                   <div key={s} className={twMerge("h-1 rounded-full transition-all", s === step ? "w-4 bg-[#D4A017]" : "w-1.5 bg-white/10")} />
                ))}
             </div>
          </div>
       </div>

       <div className="px-3 mt-6 pb-40 flex-1 flex flex-col relative z-20">
          <AnimatePresence mode="wait">
             {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col gap-2.5 overflow-hidden font-['Roboto'] font-medium">
                   <div className="h-[22%] bg-white rounded-xl overflow-hidden shadow-md border border-slate-100 relative shrink-0">
                      <img src={mechanic.image} className="w-full h-full object-cover grayscale-[0.4] opacity-90" />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded shadow-sm flex items-center gap-1 border border-white/20">
                         <span className="text-[10px] font-black text-[#001F3D]">{mechanic.rating}</span>
                         <Star size={10} fill="#001F3D" className="text-[#001F3D]" />
                      </div>
                   </div>
                   <div className="bg-white rounded-xl p-4 shadow-md border border-slate-100 flex flex-col shrink-0">
                      <div className="flex justify-between items-center mb-2">
                         <div className="max-w-[85%]">
                            <h2 className="text-[15px] font-black text-[#001F3D] uppercase tracking-tight leading-none truncate">{mechanic.name}</h2>
                            <p className="text-[7px] font-bold text-slate-300 uppercase tracking-widest mt-1">Industrial Grade Service</p>
                         </div>
                         <Heart size={14} className="text-slate-200" />
                      </div>
                      <div className="flex gap-2 pt-2 border-t border-slate-100">
                         <div className="flex-1 bg-slate-50 rounded-lg p-2.5 flex justify-between items-center">
                            <span className="text-[16px] font-black text-[#001F3D] tracking-tighter">₹{mechanic.startingPrice}</span>
                            <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Fee</span>
                         </div>
                         <div className="flex-1 bg-slate-50 rounded-lg p-2.5 flex justify-between items-center">
                            <span className="text-[16px] font-black text-[#001F3D] tracking-tighter">{mechanic.distance}</span>
                            <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Dist</span>
                         </div>
                      </div>
                   </div>
                   <div className="bg-white rounded-xl p-4 shadow-md border border-slate-100 flex flex-col gap-2 flex-1 overflow-auto">
                      <div className="flex items-center gap-2">
                         <MapPin size={10} className="text-slate-300" />
                         <p className="text-[8px] font-bold text-slate-400 uppercase truncate">{mechanic.address}</p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                         {mechanic.badges.map((b, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded border border-slate-100 text-[6px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50">{b}</span>
                         ))}
                      </div>
                      <div className="mt-1 pt-2 border-t border-slate-50">
                         <h4 className="text-[7px] font-black text-slate-300 uppercase tracking-widest mb-1">Company Profile</h4>
                         <p className="text-[9px] font-medium text-slate-500 leading-normal line-clamp-3">
                            {mechanic.description}
                         </p>
                      </div>
                   </div>
                   <button 
                      onClick={() => setStep(2)} 
                      className="w-full h-11 bg-[#001F3D] text-white rounded-xl font-black uppercase tracking-widest text-[9px] shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 shrink-0 border-b-2 border-black/20"
                   >
                      Confirm Expert <ChevronRight size={14} />
                   </button>
                </motion.div>
             )}

             {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 flex flex-col gap-4 font-['Roboto']">
                   <div>
                      <h2 className="text-[17px] font-black text-[#001F3D] uppercase tracking-tight">Enroll Your Machine</h2>
                      <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest mt-1">Found in your digital garage</p>
                   </div>
                   <div className="flex gap-2 p-1.5 bg-white rounded-xl shadow-sm border border-slate-100 font-['Roboto'] overflow-hidden">
                      {['all', 'bike', 'car'].map((t) => (
                         <button 
                            key={t}
                            onClick={() => setVehicleTab(t)}
                            className={twMerge(
                               "flex-1 py-3 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                               vehicleTab === t ? "bg-[#D4A017] text-[#001F3D] shadow-md" : "text-slate-300 hover:text-slate-500"
                            )}
                         >
                            {t}s
                         </button>
                      ))}
                   </div>
                   <div className="relative font-['Roboto']">
                      <div className="absolute inset-y-0 left-4 flex items-center text-slate-300">
                         <Search size={14} />
                      </div>
                      <input 
                         type="text" 
                         placeholder="FIND MACHINE BY NAME OR REG..." 
                         className="w-full h-12 bg-white rounded-xl pl-11 pr-4 text-[9px] font-black uppercase tracking-widest border border-slate-100 shadow-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none placeholder:text-slate-200"
                         value={vehicleSearch}
                         onChange={(e) => setVehicleSearch(e.target.value)}
                      />
                   </div>
                   <div className="grid gap-3">
                      {filteredVehicles.map((v) => (
                         <div key={v.id} onClick={() => setSelectedVehicle(v)} className={twMerge("p-3 rounded-xl border transition-all flex items-center justify-between group", selectedVehicle?.id === v.id ? "bg-white border-[#001F3D] shadow-md" : "bg-white border-slate-50 shadow-sm")}>
                            <div className="flex items-center gap-4">
                               <img src={v.image} className="w-14 h-14 rounded-lg object-cover" />
                               <div>
                                  <h4 className="text-[11px] font-bold text-[#001F3D] uppercase tracking-tight">{v.name}</h4>
                                  <p className="text-[8.5px] font-medium text-slate-400 uppercase tracking-widest leading-none mt-1">{v.reg}</p>
                                  <div className="flex items-center gap-1 mt-2">
                                     {v.type === 'bike' ? <Bike size={10} className="text-slate-300" /> : <Car size={10} className="text-slate-300" />}
                                     <span className="text-[7px] font-bold text-slate-300 uppercase tracking-widest">{v.type} Division</span>
                                  </div>
                               </div>
                            </div>
                            <div className={twMerge("w-8 h-8 rounded-full flex items-center justify-center transition-all", selectedVehicle?.id === v.id ? "bg-[#001F3D] text-white shadow-md" : "bg-slate-50 text-slate-100")}>
                               <Check size={14} />
                            </div>
                         </div>
                      ))}
                   </div>
                   <button disabled={!selectedVehicle} onClick={() => setStep(3)} className="w-full h-12 bg-[#001F3D] text-white rounded-xl font-bold uppercase tracking-widest text-[9px] shadow-xl disabled:opacity-50 transition-all active:scale-95">
                      Next: Choose Services <ChevronRight size={14} className="ml-1 inline" />
                   </button>
                </motion.div>
             )}

             {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                   <div className="bg-[#001F3D] p-3 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <img src={selectedVehicle?.image} className="w-8 h-8 rounded-lg object-cover" />
                         <h4 className="text-[8.5px] font-bold text-white uppercase tracking-widest">{selectedVehicle?.name}</h4>
                      </div>
                      <ShieldCheck size={14} className="text-white/30" />
                   </div>
                   <div className="space-y-2.5">
                      {mechanic.services.map((s) => {
                        const isSelected = selectedServices.find(item => item.id === s.id);
                        return (
                          <div key={s.id} onClick={() => toggleService(s)} className={twMerge("p-3 rounded-xl border transition-all flex items-center justify-between bg-white", isSelected ? "border-[#001F3D] shadow-md" : "border-slate-50 shadow-sm")}>
                             <div>
                                <h4 className="text-[10px] font-bold uppercase text-slate-900">{s.name}</h4>
                                <p className="text-[8px] font-medium text-slate-400 line-clamp-1">{s.desc}</p>
                                <p className="text-[11px] font-bold text-[#001F3D] mt-1.5 tracking-tight">₹{s.price}</p>
                             </div>
                             <div className={twMerge("w-7 h-7 rounded-lg flex items-center justify-center transition-all", isSelected ? "bg-[#001F3D] text-white shadow-md" : "bg-slate-50 text-slate-200")}>
                                {isSelected ? <X size={14} /> : <Plus size={14} />}
                             </div>
                          </div>
                        );
                      })}
                   </div>
                   <button disabled={selectedServices.length === 0} onClick={() => setStep(4)} className="w-full h-12 bg-[#001F3D] text-white rounded-xl font-bold uppercase tracking-widest text-[9px] shadow-lg transition-all active:scale-95">
                      Schedule Service <ChevronRight size={12} className="ml-1 inline" />
                   </button>
                </motion.div>
             )}

             {step === 4 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div>
                     <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#001F3D]/40 mb-4 px-1">Service Mode</h2>
                     <div className="grid grid-cols-2 gap-4">
                        {[
                           { id: 'pickup', name: 'Doorstep Service', sub: 'Expert Arrival', icon: ShieldCheck },
                           { id: 'store', name: 'Store', sub: 'Visit Workshop', icon: Home }
                        ].map((mode) => (
                           <motion.div 
                              key={mode.id}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setBookingMode(mode.id)}
                              className={twMerge(
                                 "relative p-3 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden",
                                 bookingMode === mode.id 
                                    ? "bg-[#001F3D] border-[#001F3D] shadow-lg" 
                                    : "bg-white border-slate-100 shadow-sm"
                              )}
                           >
                              <div className={twMerge(
                                 "w-8 h-8 rounded-lg flex items-center justify-center mb-2 transition-colors",
                                 bookingMode === mode.id ? "bg-[#D4A017] text-[#001F3D]" : "bg-slate-50 text-slate-400"
                              )}>
                                 <mode.icon size={16} />
                              </div>
                              
                              <h3 className={twMerge(
                                 "text-[10px] font-black uppercase tracking-tight leading-none",
                                 bookingMode === mode.id ? "text-white" : "text-[#001F3D]"
                              )}>
                                 {mode.name}
                              </h3>
                              <p className={twMerge(
                                 "text-[7px] font-bold uppercase tracking-widest mt-1.5 opacity-60",
                                 bookingMode === mode.id ? "text-[#D4A017]" : "text-slate-400"
                              )}>
                                 {mode.sub}
                              </p>

                              {bookingMode === mode.id && (
                                 <motion.div layoutId="modeCheck" className="absolute top-2.5 right-2.5">
                                    <div className="w-4 h-4 bg-[#D4A017] rounded-md flex items-center justify-center border border-[#001F3D]">
                                       <Check size={8} strokeWidth={4} className="text-[#001F3D]" />
                                    </div>
                                 </motion.div>
                              )}
                           </motion.div>
                        ))}
                     </div>
                  </div>
                  <div>
                     <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#001F3D]/40 mb-4 px-1">Arrival Slot</h2>
                       <div className="flex gap-4 mb-3">
                          <input type="date" defaultValue={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="flex-1 h-10 bg-white border border-slate-100 rounded-xl px-4 text-[9px] font-bold text-slate-900 shadow-sm outline-none focus:border-[#D4A017]/50 transition-all" />
                       </div>
                       <div className="grid grid-cols-2 gap-2">
                          {slots.map((s, i) => (
                             <button key={i} onClick={() => setSelectedSlot(s)} className={twMerge("h-10 rounded-xl text-[9px] font-black uppercase transition-all tracking-wider border", selectedSlot === s ? "bg-[#001F3D] text-[#D4A017] border-[#001F3D] shadow-md" : "bg-white text-slate-400 border-slate-100 shadow-sm")}>
                                {s}
                             </button>
                          ))}
                       </div>
                    </div>
                    
                    <button disabled={!selectedSlot} onClick={() => setStep(5)} className="w-full h-12 bg-[#001F3D] text-white rounded-xl font-black uppercase tracking-widest text-[9px] transition-all active:scale-95 shadow-xl border-b-2 border-black/20 mt-auto">Review Fulfillment</button>
                 </motion.div>
              )}

             {step === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
                   <div className="bg-white p-6 rounded-xl shadow-xl border border-slate-50 space-y-5">
                      <div className="flex justify-between items-center pb-4 border-b border-slate-100 font-bold">
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-['Outfit']">Grand Total</span>
                          <span className="text-2xl text-[#001F3D] tracking-tighter font-['Outfit']">₹{totalAmount}</span>
                      </div>
                      <div className="space-y-3">
                         {selectedServices.map((s) => (
                            <div key={s.id} className="flex justify-between text-[9px] font-bold uppercase text-slate-500 tracking-tight">
                               <span>{s.name}</span>
                               <span className="text-[#001F3D]">₹{s.price}</span>
                            </div>
                         ))}
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
                         <div className="flex items-center gap-3 font-bold">
                            <Calendar size={16} className="text-[#001F3D]" />
                            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tight">{selectedDate} @ {selectedSlot}</span>
                         </div>
                      </div>
                   </div>
                   <button onClick={handlePayment} className="w-full h-12 bg-[#001F3D] text-white rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95">
                      <CreditCard size={14} />
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Confirm & Pay Now</span>
                   </button>
                   <div className="flex items-center justify-center gap-2 opacity-30">
                      <ShieldCheck size={12} />
                      <p className="text-[7px] font-bold text-slate-900 uppercase tracking-[0.2em]">Secured by SSL Encryption</p>
                   </div>
                </motion.div>
             )}

             {step === 6 && (
                 <motion.div key="step6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col gap-4 font-['Roboto'] pb-40 overflow-auto no-scrollbar">
                    {/* 🕒 Real-time Booking Status Timeline */}
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                       <div className="flex justify-between items-center mb-5 px-1">
                          <h3 className="text-[10px] font-black uppercase text-[#001F3D] tracking-widest leading-none">Live Tracking</h3>
                          <span className={twMerge(
                             "px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest ring-1 ring-inset",
                             bookingStatus === 'Completed' ? "bg-emerald-50 text-emerald-600 ring-emerald-200" : "bg-[#D4A017]/10 text-[#D4A017] ring-[#D4A017]/20"
                          )}>
                             {bookingStatus}
                          </span>
                       </div>
                       
                       <div className="flex justify-between items-center relative px-2">
                          {['Sent', 'Accepted', 'In-progress', 'Completed'].map((s, i) => (
                             <React.Fragment key={s}>
                                <div className="flex flex-col items-center gap-2 relative z-10">
                                   <div className={twMerge(
                                      "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500",
                                      bookingStatus === s || (['Accepted', 'In-progress', 'Completed'].includes(bookingStatus) && i < 1) || (['In-progress', 'Completed'].includes(bookingStatus) && i < 2) || (bookingStatus === 'Completed' && i < 3)
                                         ? "bg-[#D4A017] text-[#001F3D] scale-110 shadow-lg shadow-[#D4A017]/20" 
                                         : "bg-slate-100 text-slate-300"
                                   )}>
                                      {bookingStatus === s && i < 3 ? <Loader2 size={12} className="animate-spin" /> : ((['Accepted', 'In-progress', 'Completed'].includes(bookingStatus) && i === 0) || (['In-progress', 'Completed'].includes(bookingStatus) && i === 1) || (bookingStatus === 'Completed') ? <Check size={12} strokeWidth={4} /> : <div className="w-1.5 h-1.5 bg-current rounded-full" />)}
                                   </div>
                                   <span className={twMerge(
                                      "text-[6px] font-black uppercase tracking-wider",
                                      bookingStatus === s ? "text-[#001F3D]" : "text-slate-300"
                                   )}>{s}</span>
                                </div>
                                {i < 3 && (
                                   <div className="flex-1 h-[2px] -mt-4 bg-slate-50 relative overflow-hidden">
                                      <motion.div 
                                         initial={{ width: "0%" }}
                                         animate={{ width: (['Accepted', 'In-progress', 'Completed'].includes(bookingStatus) && i === 0) || (['In-progress', 'Completed'].includes(bookingStatus) && i === 1) || (bookingStatus === 'Completed' && i === 2) ? "100%" : "0%" }}
                                         className="absolute inset-0 bg-[#D4A017]"
                                      />
                                   </div>
                                )}
                             </React.Fragment>
                          ))}
                       </div>
                    </div>

                    {bookingStatus === 'Completed' && (
                       <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#001F3D] p-5 rounded-xl border border-white/10 shadow-2xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A017]/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                          <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4 text-center">Service Completed!</h4>
                          <div className="space-y-4">
                             <div className="flex justify-center gap-2">
                                {[1,2,3,4,5].map(s => (
                                   <button key={s} className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4A017] hover:bg-[#D4A017] hover:text-[#001F3D] transition-all">
                                      <Star size={16} fill="currentColor" strokeWidth={0} />
                                   </button>
                                ))}
                             </div>
                             <p className="text-[7.5px] font-bold text-white/40 uppercase tracking-widest text-center">Rate your experience at {mechanic.name}</p>
                          </div>
                       </motion.div>
                    )}
                    {bookingMode === 'pickup' ? (
                       <div className="space-y-4">
                          <div className="bg-slate-100 h-40 rounded-2xl relative overflow-hidden shadow-inner border border-slate-200">
                             <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-60 grayscale" />
                             <div className="absolute inset-0 bg-[#001F3D]/10" />
                             <motion.div 
                                animate={{ scale: [1, 1.2, 1] }} 
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#D4A017] rounded-full border-4 border-white shadow-lg"
                             />
                             <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white opacity-90">
                                <p className="text-[7.5px] font-black text-[#001F3D] uppercase tracking-widest">En Route to Hub</p>
                             </div>
                          </div>

                          <div className="bg-white rounded-xl p-5 shadow-xl border border-slate-100 flex flex-col gap-5">
                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                   <div className="w-12 h-12 rounded-xl bg-slate-50 overflow-hidden border border-slate-100">
                                      <img src={mechanic.image} alt={mechanic.name} className="w-full h-full object-cover" />
                                   </div>
                                   <div>
                                      <h3 className="text-[14px] font-black text-[#001F3D] leading-tight uppercase">{mechanic.name}</h3>
                                      <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest italic">Assigned Specialist</p>
                                   </div>
                                </div>
                                <div className="flex gap-2">
                                   <button className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-[#D4A017] border border-slate-100"><Phone size={16} /></button>
                                   <button className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-[#D4A017] border border-slate-100"><Mail size={16} /></button>
                                </div>
                             </div>

                             <div className="grid grid-cols-2 gap-4 pt-5 border-t border-slate-50">
                                <div className="flex flex-col gap-1">
                                   <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Arrival ETA</span>
                                   <span className="text-sm font-black text-[#001F3D] uppercase">{selectedSlot || 'TBD'}</span>
                                </div>
                                <div className="flex flex-col gap-1 text-right">
                                   <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Job Value</span>
                                   <span className="text-sm font-black text-[#D4A017]">₹{totalAmount}</span>
                                </div>
                             </div>
                          </div>
                       </div>
                    ) : (
                       <div className="space-y-4">
                          <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                             <div className="h-44 relative bg-slate-900">
                                <img src={mechanic.image} className="w-full h-full object-cover opacity-80" />
                                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                                   <h3 className="text-xl font-black text-white uppercase tracking-tight">{mechanic.name}</h3>
                                   <p className="text-[8px] font-bold text-[#D4A017] uppercase tracking-[0.3em]">Flagship Outlet Branch</p>
                                </div>
                             </div>
                             <div className="p-5 space-y-4">
                                <div className="flex gap-3">
                                   <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                      <MapPin size={18} className="text-[#D4A017]" />
                                   </div>
                                   <div>
                                      <p className="text-[9px] font-black text-[#001F3D] uppercase leading-relaxed tracking-tight">{mechanic.address}</p>
                                      <p className="text-[7px] font-bold text-slate-300 uppercase mt-1">Confirmed Destination</p>
                                   </div>
                                </div>
                                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                   <div className="flex items-center gap-2">
                                      <Clock size={12} className="text-emerald-500" />
                                      <span className="text-[9px] font-black text-[#001F3D] uppercase">09:00 AM - 08:00 PM</span>
                                   </div>
                                   <span className="text-[7px] font-bold text-emerald-500 uppercase px-2 py-0.5 bg-emerald-50 rounded-md">Open Hub</span>
                                </div>
                             </div>
                          </div>
                       </div>
                    )}

                    <div className="bg-indigo-900/5 p-4 rounded-xl border border-indigo-100 flex items-center gap-3">
                       <ShieldCheck size={20} className="text-indigo-400" />
                       <p className="text-[9px] font-medium text-indigo-900 italic">
                          "Your premium service slot is {bookingStatus === 'Completed' ? 'verified & closed' : 'locked'}. The Cliq Concierge will verify your arrival status."
                       </p>
                    </div>

                     <div className="flex flex-col gap-3 mt-auto pt-4">
                        <button 
                           onClick={() => alert('Generating Digital Invoice...')}
                           className="w-full h-11 border-2 border-slate-100 rounded-xl flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-[#001F3D] active:scale-95 transition-all bg-white"
                        >
                           <Download size={14} className="text-[#D4A017]" />
                           Download Invoice
                        </button>
                        
                        <button 
                           onClick={() => navigate('/home')} 
                           className="w-full h-12 bg-[#001F3D] text-white rounded-xl text-[9px] font-black uppercase tracking-widest active:scale-95 transition-all border-b-2 border-black/40 shadow-xl"
                        >
                           Go to Dashboard
                        </button>
                     </div>
                 </motion.div>
              )}
          </AnimatePresence>
       </div>
       <BottomNav />
    </div>
  );
};

export default ServiceBooking;
