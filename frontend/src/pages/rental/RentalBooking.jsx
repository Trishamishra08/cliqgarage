import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Bike, Car, Calendar, 
  MapPin, ShieldCheck, Upload, CreditCard, 
  CheckCircle2, ArrowRight, Gauge, Clock,
  Search, ChevronRight, Info, Shield, Zap, 
  Banknote, Lock, Loader2, User, Phone, 
  Home, Hash, AlertTriangle, ShieldAlert, Star,
  Fuel, Settings2, Store
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import bikeAsset from '../../assets/bullet-removebg-preview (1).png';
import carAsset from '../../assets/Side_view_of_blue_generic_unbranded_suv_car_isolated_on_white_background___Premium_Photo-removebg-preview.png';
import hubMap from '../../assets/hub-map.png';

const RentalBooking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [vehicleType, setVehicleType] = useState('bike'); 
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [location, setLocation] = useState('Hub-04, Mumbai');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [rentalDays, setRentalDays] = useState(1);
  const [kycDocs, setKycDocs] = useState({ aadhar: null, dl: null });
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    phone: '',
    address: '',
    pincode: ''
  });
  const [selectedKM, setSelectedKM] = useState('Standard');
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [viewDate, setViewDate] = useState(new Date()); 
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isKeyboard = window.innerHeight < window.screen.height * 0.7;
      setIsKeyboardOpen(isKeyboard);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mock Data
  const vehiclesData = {
    bike: [
      { 
        id: 1, 
        name: "Kawasaki Ninja 400", 
        category: "Sport",
        price: 1499, 
        stats: "45 BHP • 400cc • Petrol", 
        image: "https://images.unsplash.com/photo-1558981403-c59899a28bc?q=80&w=600&auto=format&fit=crop",
        unavailableDates: ['2026-04-12'] 
      },
      { 
        id: 2, 
        name: "RE Himalayan 450", 
        category: "Adventure",
        price: 999, 
        stats: "40 BHP • 450cc • Manual", 
        image: "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?q=80&w=600&auto=format&fit=crop",
        unavailableDates: ['2026-04-10']
      },
      {
        id: 5,
        name: "Harley Iron 883",
        category: "Cruiser",
        price: 2499,
        stats: "50 BHP • 883cc • Petrol",
        image: "https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=800&auto=format&fit=crop",
        unavailableDates: []
      },
      {
        id: 15,
        name: "Ducati Panigale V4",
        category: "Sport",
        price: 8999,
        stats: "214 BHP • 1103cc • Desmo",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop",
        unavailableDates: []
      }
    ],
    car: [
      { 
        id: 3, 
        name: "Thar 4x4 Luxury", 
        category: "SUV",
        price: 2499, 
        stats: "Manual • Diesel • 4x4", 
        image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800&auto=format&fit=crop",
        unavailableDates: []
      },
      { 
        id: 4, 
        name: "BMW M3 Sedan", 
        category: "Sedan",
        price: 5499, 
        stats: "Auto • Petrol • Twin Turbo", 
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop",
        unavailableDates: []
      },
      { 
        id: 13, 
        name: "Porsche 911 GT3", 
        category: "Luxury",
        price: 15999, 
        stats: "Manual • Petrol • Flat-6", 
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
        unavailableDates: []
      }
    ]
  };

  const kmOptions = [
    { label: 'Standard', km: '120', extra: 0 },
    { label: 'Extended', km: '240', extra: 499 },
    { label: 'Unlimited', km: '∞', extra: 999 }
  ];

  useEffect(() => {
    const list = vehiclesData[vehicleType].map(v => ({
      ...v,
      isAvailable: !v.unavailableDates.includes(startDate)
    }));
    setAvailableVehicles(list);
  }, [vehicleType, startDate]);

  const nextStep = () => {
    if (step === 5) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(6);
      }, 2500);
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const calculateTotal = () => {
    if (!selectedVehicle) return 0;
    const base = selectedVehicle.price * rentalDays;
    const km = kmOptions.find(o => o.label === selectedKM)?.extra || 0;
    return base + km;
  };

  const daysArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const renderCalendar = () => {
    const start = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const end = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);
    
    const days = [];
    for (let i = 0; i < start.getDay(); i++) {
        days.push(<div key={`empty-${i}`} className="h-8 flex items-center justify-center text-[10px] font-bold text-slate-100 opacity-0">-</div>);
    }
    
    for (let i = 1; i <= end.getDate(); i++) {
      const dStr = `${viewDate.getFullYear()}-${(viewDate.getMonth() + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
      const isS = dStr === startDate;
      const isP = new Date(dStr) < new Date(new Date().setHours(0,0,0,0));
      
      days.push(
        <button 
          key={i} 
          onClick={() => { if(!isP) { setStartDate(dStr); setShowCalendar(false); } }}
          className={twMerge(
            "h-9 w-9 rounded-[2px] text-[10px] font-black transition-all flex items-center justify-center",
            isS ? "bg-[#001F3D] text-[#D4A017] shadow-lg" : isP ? "text-slate-100 cursor-not-allowed" : "text-slate-600 hover:bg-slate-50"
          )}
        >
          {i}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] font-sans select-none">
      <AnimatePresence>
        {isProcessing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
            <div className="relative mb-6">
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-20 h-20 border-b-2 border-t-2 border-[#001F3D] rounded-full" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <Lock size={28} className="text-[#D4A017] animate-pulse" />
               </div>
            </div>
            <h3 className="text-[10px] font-sans font-black text-slate-900 mb-1 px-10 text-center tracking-widest uppercase">Securing Transaction</h3>
            <p className="text-[8px] font-bold text-slate-400 animate-pulse tracking-[0.2em] uppercase">Encryption sequence active...</p>
            <div className="mt-10 w-56 h-1 bg-slate-50 rounded-full overflow-hidden">
               <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.5, ease: "easeInOut" }} className="h-full bg-[#001F3D]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

       {/* Top Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-2xl z-50 flex flex-col border-b border-slate-100">
         <div className="px-5 py-3 flex items-center justify-between">
            <button onClick={step === 1 ? () => navigate(-1) : prevStep} className="w-9 h-9 rounded-[2px] bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-all">
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>
            <div className="text-center">
              <p className="text-[7px] font-sans font-bold text-[#D4A017] mb-0.5 opacity-60 tracking-[0.3em]">PHASE {step}.0</p>
              <h2 className="text-[11px] font-sans font-black text-slate-900 tracking-tighter leading-none uppercase">
                {step === 1 ? 'Tier Select' : step === 2 ? 'Hub Selection' : step === 3 ? 'Configurations' : step === 4 ? 'Identity Protocol' : step === 5 ? 'Settlement' : 'Authorized'}
              </h2>
            </div>
            <div className="w-9 h-9 flex items-center justify-center text-slate-400 opacity-20"><Zap size={16} /></div>
         </div>
         <div className="w-full h-[3px] bg-slate-50 overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${(step/6) * 100}%` }} className="h-full bg-[#001F3D]" />
         </div>
      </div>

      <div className="relative z-10 pt-16 pb-60 px-4 h-screen overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: -20 }} className="space-y-0 pt-0">
              <div className="text-center pt-2 pb-4">
                 <span className="text-[var(--primary-color)] font-bold text-[9px] mb-1 block opacity-60">Premium Select</span>
                 <h2 className="text-2xl font-bold text-slate-900 leading-none relative inline-block">
                    The Collection
                    <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--primary-color)] to-transparent rounded-full" />
                 </h2>
              </div>
              <div className="flex flex-col gap-0 pt-0">
                 {[
                   { type: 'bike', label: 'Motorcycles', img: bikeAsset, desc: 'Motorcycle', entryX: -300, btnMargin: 'mt-[-0.5rem]' },
                   { type: 'car', label: 'Luxury Cars', img: carAsset, desc: 'Luxury Car', entryX: 300, btnMargin: 'mt-[-1.5rem]' }
                 ].map((t) => (
                    <div key={t.type} className="flex flex-col items-center mb-0">
                       <motion.div initial={{ x: t.entryX, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }} onClick={() => { setVehicleType(t.type); nextStep(); }} className="relative cursor-pointer group mb-0">
                          <img src={t.img} className={twMerge("w-full max-w-[280px] object-contain drop-shadow-[0_45px_45px_rgba(0,0,0,0.18)] group-hover:scale-105 transition-all duration-700", t.type === 'car' ? "max-h-48" : "max-h-44")} alt={t.label} />
                       </motion.div>
                       <motion.button initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 20 }} onClick={() => { setVehicleType(t.type); nextStep(); }} className={twMerge("h-10 px-8 rounded-full shadow-xl bg-slate-900 text-white flex items-center justify-center gap-3 active:scale-95 transition-all border border-white/10 relative overflow-hidden group font-bold text-xs tracking-tight", t.btnMargin)}>
                          <span>Select {t.desc}</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                       </motion.button>
                    </div>
                 ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
               <div className="flex items-center gap-3">
                  <div className="flex-1 bg-[#001F3D] h-12 rounded-[2px] border border-[#D4A017]/20 shadow-lg flex items-center px-4 gap-3">
                     <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#D4A017]"><MapPin size={14} /></div>
                     <div className="flex-1">
                        <span className="text-[6px] font-black text-white/40 mb-1 uppercase tracking-widest leading-none block">Location Hub</span>
                        <p className="text-[9px] font-black text-white uppercase truncate">{location}</p>
                     </div>
                  </div>
                  <button onClick={() => setShowCalendar(true)} className="flex-1 bg-white h-12 rounded-[2px] border border-slate-100 shadow-sm flex items-center px-4 gap-3 active:bg-slate-50 transition-all">
                     <div className="w-7 h-7 rounded-full bg-[#D4A017]/10 flex items-center justify-center text-[#D4A017]"><Calendar size={14} /></div>
                     <div className="flex-1 text-left">
                        <span className="text-[6px] font-black text-slate-300 mb-1 uppercase tracking-widest leading-none block">Pickup Protocol</span>
                        <p className="text-[9px] font-black text-slate-900 uppercase">{new Date(startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</p>
                     </div>
                  </button>
               </div>

               <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
                  {['All', ...(vehicleType === 'bike' ? ['Sport', 'Adventure', 'Cruiser'] : ['Sedan', 'SUV', 'Luxury'])].map(cat => (
                     <button key={cat} onClick={() => setSelectedCategory(cat)} className={twMerge("px-6 h-9 rounded-[2px] text-[9px] font-black uppercase tracking-widest transition-all border shrink-0", selectedCategory === cat ? "bg-[#001F3D] text-white border-[#001F3D] shadow-lg shadow-blue-500/10" : "bg-white text-slate-300 border-slate-50")}>{cat}</button>
                  ))}
               </div>

               {/* Sharp & Compact Industrial Fleet Showroom */}
               <div className="grid grid-cols-1 gap-px bg-slate-100 border-y border-slate-100">
                  {availableVehicles.filter(v => selectedCategory === 'All' || v.category === selectedCategory).map((v) => (
                    <motion.div 
                      key={v.id} 
                      whileTap={{ scale: 0.99 }}
                      onClick={() => v.isAvailable && (setSelectedVehicle(v), setStep(3))} 
                      className={twMerge(
                        "bg-white flex gap-4 transition-all relative overflow-hidden group p-2",
                        v.isAvailable ? "cursor-pointer" : "opacity-40 grayscale cursor-not-allowed"
                      )}
                    >
                       {/* Asset Hub (Compact & Sharp) */}
                       <div className="w-20 h-20 rounded-[2px] overflow-hidden shrink-0 relative bg-slate-50 border border-slate-100">
                          <img src={v.image} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" alt={v.name} />
                          {!v.isAvailable && (
                             <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                                <span className="text-[7px] font-black text-slate-400 rotate-[-15deg] border border-slate-200 px-1 py-0.5">UNAVAILABLE</span>
                             </div>
                          )}
                       </div>

                       {/* Data Center (High Density) */}
                       <div className="flex-grow flex flex-col justify-center">
                          <div className="mb-1.5">
                             <h4 className="text-[12px] font-black text-[#001F3D] uppercase tracking-tighter leading-none mb-1">{v.name}</h4>
                             <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">{v.stats.split('•').join(' | ')}</p>
                          </div>
                          <div className="flex items-center gap-2">
                             <span className="text-[13px] font-black text-[#001F3D] tracking-tighter">₹{v.price}</span>
                             <span className="px-1.5 py-0.5 bg-slate-50 text-[6px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">Daily Tariff</span>
                          </div>
                       </div>

                       {/* Action Hub (Sharp Interaction) */}
                       <div className="flex flex-col items-end justify-between py-0.5 shrink-0">
                          <div className={twMerge(
                             "px-2 py-0.5 rounded-[2px] text-[6px] font-black uppercase tracking-[0.2em] border",
                             v.isAvailable ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-300 border-slate-100"
                          )}>
                             {v.isAvailable ? 'READY' : 'BUSY'}
                          </div>
                          
                          <div className={twMerge(
                             "w-8 h-8 rounded-[2px] flex items-center justify-center transition-all bg-[#001F3D] text-[#D4A017] shadow-lg",
                             !v.isAvailable && "opacity-10 shadow-none"
                          )}>
                             <ArrowRight size={14} />
                          </div>
                       </div>

                       {/* Selection Overlay Indicator */}
                       <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#D4A017] scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                    </motion.div>
                  ))}
               </div>
            </motion.div>
          )}

          {step === 3 && selectedVehicle && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
               {/* Sharp Compact Asset Node */}
               <div className="bg-[#001F3D] p-5 rounded-[2px] shadow-2xl relative overflow-hidden flex gap-4 items-center border-b-2 border-[#D4A017]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A017]/10 rounded-full blur-3xl opacity-30" />
                  <div className="w-24 h-24 rounded-[2px] overflow-hidden shrink-0 border border-white/10 relative z-10 bg-black/20">
                     <img src={selectedVehicle.image} className="w-full h-full object-cover grayscale-[0.2]" alt={selectedVehicle.name} />
                  </div>
                  <div className="relative z-10">
                     <span className="text-[7px] font-black text-[#D4A017] uppercase tracking-[0.4em] mb-1.5 block">Asset Selection Protocol</span>
                     <h3 className="text-[14px] font-black text-white uppercase tracking-tighter mb-0.5">{selectedVehicle.name}</h3>
                     <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">{selectedVehicle.stats.split('•').join(' | ')}</p>
                  </div>
               </div>

               <div className="grid gap-3">
                  {/* High Density Time Protocol */}
                  <div className="bg-white p-4 rounded-[2px] border border-slate-100 shadow-sm flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[2px] bg-slate-50 border border-slate-100 flex items-center justify-center text-[#001F3D]"><Clock size={16} /></div>
                        <div>
                           <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest mb-1 leading-none">Time Protocol</p>
                           <p className="text-[13px] font-black text-[#001F3D] uppercase leading-none">{rentalDays} Day{rentalDays > 1 ? 's' : ''} Duration</p>
                        </div>
                     </div>
                     <div className="flex gap-1.5">
                        <button onClick={() => setRentalDays(Math.max(1, rentalDays - 1))} className="w-10 h-10 rounded-[2px] border border-slate-100 bg-white font-black text-[#001F3D] text-[15px] active:bg-slate-50 transition-colors">-</button>
                        <button onClick={() => setRentalDays(rentalDays + 1)} className="w-10 h-10 rounded-[2px] bg-[#001F3D] text-[#D4A017] font-black text-[15px] active:scale-95 transition-all shadow-md">+</button>
                     </div>
                  </div>

                  {/* Compact Security Pack */}
                  <div className="bg-white p-4 rounded-[2px] border border-slate-100 shadow-sm space-y-4">
                     <div className="flex items-center justify-between">
                        <h4 className="text-[8px] font-black text-[#001F3D] uppercase tracking-widest border-l-[3px] border-[#D4A017] pl-3">Logistics Protocol</h4>
                        <span className="text-[7px] font-black text-slate-300 uppercase italic">Select KM Limit</span>
                     </div>
                     <div className="grid grid-cols-3 gap-2">
                        {kmOptions.map(opt => (
                           <button key={opt.label} onClick={() => setSelectedKM(opt.label)} className={twMerge("p-2.5 rounded-[2px] border transition-all flex flex-col items-center gap-0.5", selectedKM === opt.label ? "border-[#001F3D] bg-slate-50" : "border-slate-100 opacity-40")}>
                               <span className="text-[7px] font-black text-[#001F3D] uppercase tracking-widest leading-none">{opt.label}</span>
                               <span className="text-[11px] font-black text-[#001F3D]">{opt.km}K</span>
                           </button>
                        ))}
                     </div>
                     <div className="pt-2 border-t border-slate-50 flex items-center gap-2">
                        <ShieldAlert size={10} className="text-[#D4A017]" />
                        <p className="text-[6px] font-black text-slate-300 uppercase tracking-widest">Deposit authorization required at check-in hub.</p>
                     </div>
                  </div>

                  {/* 🚀 STORE INTELLIGENCE CARD - Live Hub Status */}
                  <div className="bg-[#EBF1F7] p-4 rounded-[2px] border border-[#001F3D]/10 flex items-center justify-between mb-4 shadow-sm">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#001F3D] text-[#D4A017] rounded-[2px] flex items-center justify-center shadow-lg"><Store size={20} /></div>
                        <div>
                           <h4 className="text-[10px] font-sans font-black text-[#001F3D] uppercase tracking-wider">CLIQ Premium Hub</h4>
                           <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Indiranagar, Bengaluru • 1.2km</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="flex items-center gap-1.5 justify-end">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                           <span className="text-[7px] font-black text-emerald-600 uppercase tracking-[0.2em]">Live Hub</span>
                        </div>
                        <p className="text-[6px] font-bold text-slate-300 uppercase mt-1 tracking-widest">Asset Ready</p>
                     </div>
                  </div>

                  {/* 🚀 INTEGRATED ACTION NODE (Moved Up) */}
                  <button 
                     onClick={nextStep}
                     className="w-full h-14 bg-[#001F3D] text-[#D4A017] rounded-full font-sans font-black text-[10px] uppercase tracking-[0.3em] mt-2 shadow-xl active:scale-95 transition-all border border-[#D4A017]/20 flex items-center justify-center gap-3"
                  >
                     Authorize Configuration
                     <ArrowRight size={16} />
                  </button>
               </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pb-20">
               {/* Industrial Personal Card with Accent */}
               <div className="bg-[#EBF1F7] rounded-[2px] border-l-4 border-[#001F3D] shadow-inner p-5 space-y-5">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-[2px] bg-[#001F3D] flex items-center justify-center text-[#D4A017]"><User size={14} /></div>
                     <h3 className="text-[10px] font-sans font-black text-[#001F3D] uppercase tracking-wider">Asset Handler Profile</h3>
                  </div>
                  <div className="grid gap-4">
                     {[
                       { key: 'fullName', label: 'Authorized Name', icon: User, ph: 'Full Name' },
                       { key: 'phone', label: 'Mobile Terminal', icon: Phone, ph: '+91 XXXXX XXXXX' },
                       { key: 'address', label: 'Base Location', icon: Home, ph: 'Permanent Address' },
                       { key: 'pincode', label: 'Zone Protocol', icon: Hash, ph: 'XXXXXX' }
                     ].map(field => (
                        <div key={field.key} className="relative">
                           <input 
                                type="text" 
                                placeholder={field.ph}
                                className="w-full bg-white/60 border border-slate-200/50 rounded-[2px] px-4 pt-5 pb-1.5 text-[10px] font-bold text-[#001F3D] uppercase tracking-wide outline-none focus:border-[#D4A017] transition-all"
                                value={userDetails[field.key]}
                                onChange={(e) => setUserDetails({ ...userDetails, [field.key]: e.target.value })}
                           />
                           <label className="absolute top-1 left-4 text-[6px] font-black text-slate-400 uppercase tracking-widest">{field.label}</label>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Document Authentication Nodes */}
               <div className="grid gap-2">
                  <div className="px-1"><span className="text-[7px] font-sans font-black text-slate-400 uppercase tracking-widest">Document Authentication</span></div>
                  {[
                    { key: 'aadhar', label: 'National ID (Aadhar)', ph: 'Upload Secure Copy' },
                    { key: 'dl', label: 'Operator Permit (DL)', ph: 'Upload Operational License' }
                  ].map(doc => (
                    <label key={doc.key} className={twMerge("cursor-pointer p-4 rounded-[2px] border transition-all flex items-center justify-between", kycDocs[doc.key] ? "bg-emerald-50 border-emerald-500/20" : "bg-[#F4F7FA] border-slate-200")}>
                        <input type="file" className="hidden" onChange={(e) => setKycDocs({...kycDocs, [doc.key]: e.target.files[0]})} />
                        <div className="flex items-center gap-4">
                           <div className={twMerge("w-10 h-10 rounded-[2px] flex items-center justify-center transition-all shadow-md", kycDocs[doc.key] ? "bg-emerald-500 text-white" : "bg-white text-slate-300 border border-slate-100")}>
                              {kycDocs[doc.key] ? <CheckCircle2 size={20} /> : <Upload size={16} />}
                           </div>
                           <div className="text-left">
                              <h4 className="text-[9px] font-black text-[#001F3D] uppercase tracking-widest mb-0.5">{doc.label}</h4>
                              <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">{kycDocs[doc.key] ? 'AUDIT VERIFIED' : doc.ph}</p>
                           </div>
                        </div>
                        <div className="relative group">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#D4A017] animate-pulse" />
                        </div>
                    </label>
                  ))}
               </div>

               {/* 🚀 INTEGRATED IDENTITY TRIGGER - Softened rounded-full */}
               <div className="pt-2">
                  <button 
                     onClick={nextStep}
                     className={twMerge(
                       "w-full h-14 rounded-full font-bold text-[11px] uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-3 transition-all border",
                       (!kycDocs.aadhar || !kycDocs.dl || !userDetails.fullName || !userDetails.phone || !userDetails.address || !userDetails.pincode)
                         ? "bg-[#001F3D]/80 text-[#D4A017]/40 border-[#D4A017]/10 cursor-not-allowed grayscale-[0.5]" 
                         : "bg-[#001F3D] text-[#D4A017] border-[#D4A017]/30 active:scale-95 hover:shadow-[#D4A017]/10"
                     )}
                  >
                     Confirm Identity Protocol
                     <ArrowRight size={16} />
                  </button>
                  <p className="text-[6px] font-bold text-slate-400 text-center uppercase tracking-[0.3em] mt-3 opacity-40">All documents are stored in an encrypted vault.</p>
               </div>
            </motion.div>
          )}

          {step === 5 && selectedVehicle && (
            <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div className="bg-[#001F3D] p-6 rounded-[2px] shadow-2xl relative overflow-hidden text-white border-b-4 border-[#D4A017] mb-2">
                   <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#D4A017]/10 rounded-full blur-3xl opacity-50" />
                   <h3 className="text-[9px] font-sans font-black text-[#D4A017] uppercase tracking-[0.4em] mb-6 relative z-10">Settlement Protocol</h3>
                   <div className="space-y-3 relative z-10">
                      <div className="flex justify-between items-center"><span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Base Tariff ({rentalDays}d)</span><span className="text-sm font-black text-white">₹{selectedVehicle.price * rentalDays}</span></div>
                      <div className="flex justify-between items-center"><span className="text-[8px] font-black text-white/30 uppercase tracking-widest">KM Pack ({selectedKM})</span><span className="text-sm font-black text-white">₹{kmOptions.find(o => o.label === selectedKM)?.extra || 0}</span></div>
                      <div className="flex justify-between items-center"><span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Insurance Audit (12%)</span><span className="text-sm font-black text-white">₹{Math.round(calculateTotal() * 0.12)}</span></div>
                      <div className="pt-4 mt-2 border-t border-white/10 flex justify-between items-end">
                         <span className="text-[9px] font-sans font-black text-[#D4A017] uppercase tracking-widest">Grand Authorization</span>
                         <span className="text-3xl font-black tracking-tighter text-white leading-none">₹{Math.round(calculateTotal() * 1.12)}</span>
                      </div>
                   </div>
                </div>

                {/* 🚀 PRIMARY SETTLEMENT TRIGGER - Softened rounded-full */}
                <button 
                    onClick={nextStep}
                    className="w-full h-14 bg-[#001F3D] text-[#D4A017] rounded-full font-bold text-[11px] uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all border border-[#D4A017]/30 flex items-center justify-center gap-3 mb-4"
                >
                    Secure Booking
                    <ArrowRight size={16} />
                </button>

                <div className="grid gap-3">
                   <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest ml-1 mb-1 block">Authentication Mode</span>
                   <button onClick={() => setPaymentMethod('online')} className={twMerge("w-full h-16 rounded-[2px] flex items-center justify-between px-6 transition-all border-2", paymentMethod === 'online' ? "border-[#001F3D] bg-slate-50" : "border-slate-100")}>
                      <div className="flex items-center gap-4 text-[#001F3D] font-black uppercase text-[11px] tracking-widest"><CreditCard size={20} /> Pay Online</div>
                   </button>
                   <button onClick={() => setPaymentMethod('cod')} className={twMerge("w-full h-16 rounded-[2px] flex items-center justify-between px-6 transition-all border-2", paymentMethod === 'cod' ? "border-emerald-500 bg-emerald-50" : "border-slate-100")}>
                      <div className="flex items-center gap-4 text-emerald-600 font-black uppercase text-[11px] tracking-widest"><Banknote size={20} /> Cash on Delivery</div>
                   </button>
                </div>
            </motion.div>
          )}

          {step === 6 && selectedVehicle && (
            <motion.div key="s6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center space-y-6 py-2">
                <div className="relative mb-2">
                   <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 10, stiffness: 100 }} className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl relative z-10"><CheckCircle2 size={48} strokeWidth={2.5} /></motion.div>
                </div>
                <div className="text-center space-y-3">
                   <h2 className="text-2xl font-sans font-black text-[#001F3D] uppercase tracking-tighter leading-none">Booking<br/>Confirmed</h2>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-8">Waiting for store to confirm your order.</p>
                </div>

                {/* 🚀 LIVE HUB TRACKER - Integrated Interactive Map */}
                <div className="w-full h-44 bg-[#EBF1F7] rounded-[2px] border border-[#001F3D]/10 overflow-hidden relative shadow-inner">
                   <div className="absolute top-2 left-2 z-10">
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-slate-100">
                         <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="text-[6px] font-black text-[#001F3D] uppercase tracking-widest">Live Hub Tracker</span>
                      </div>
                   </div>
                   <iframe
                      src="https://maps.google.com/maps?q=12th%20Main%20Rd,%20HAL%202nd%20Stage,%20Indiranagar,%20Bengaluru&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: 'grayscale(0.5) contrast(1.1) brightness(1.1)' }}
                      allowFullScreen=""
                      loading="lazy"
                      title="Rental Hub Live Location"
                   ></iframe>
                </div>
                
                <div className="w-full space-y-3">
                   <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2px] p-5 shadow-sm">
                      <div className="space-y-4">
                         <div className="flex justify-between items-center"><span className="text-[8px] font-bold text-slate-400 uppercase">Asset Mode</span><span className="text-[10px] font-black text-[#001F3D] uppercase tracking-wider">{selectedVehicle.name}</span></div>
                         <div className="flex justify-between items-center"><span className="text-[8px] font-bold text-slate-400 uppercase">Total Settlement</span><span className="text-2xl font-sans font-black text-[#001F3D]">₹{Math.round(calculateTotal() * 1.12)}</span></div>
                      </div>
                   </div>

                   <div className="bg-[#F8FAFC] border border-slate-100 rounded-[2px] p-5 space-y-3">
                      <div className="flex items-center gap-2 mb-1">
                         <MapPin size={12} className="text-[#D4A017]" />
                         <span className="text-[9px] font-black text-[#001F3D] uppercase tracking-widest">Handover Hub</span>
                      </div>
                      <div className="pl-5 border-l-2 border-[#D4A017]/30">
                         <h4 className="text-[10px] font-black text-[#001F3D] uppercase">CLIQGARAGE Premium Hub</h4>
                         <p className="text-[8px] font-bold text-slate-400 uppercase leading-relaxed mt-1">12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, KA - 560038</p>
                         <p className="text-[7px] font-black text-[#001F3D] uppercase mt-2">Ph: +91 91234 56789</p>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col gap-3 w-full pt-4">
                   <button onClick={() => navigate('/order-history')} className="h-14 bg-[#001F3D] text-[#D4A017] rounded-full font-bold text-[10px] uppercase tracking-widest shadow-xl border border-[#D4A017]/20">Track in History</button>
                   <button onClick={() => navigate('/')} className="h-14 bg-white text-slate-400 rounded-full font-bold text-[10px] uppercase tracking-widest border border-slate-100 italic opacity-60">Portal Exit</button>
                </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* 🚀 ACTION ANCHOR - Floating Dock (Only for Hub Phases) */}
      {!isKeyboardOpen && (
         <div className="fixed bottom-[72px] left-3 right-3 h-14 bg-white/95 backdrop-blur-3xl border border-slate-100 z-50 rounded-[2px] shadow-2xl flex items-center px-4">
            {step < 3 && (
               <div className="w-full flex items-center justify-between gap-4">
                  {step >= 3 ? (
                    <div className="flex flex-col border-r border-slate-100 pr-4 leading-none">
                       <span className="text-[6px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Total Hub Fare</span>
                       <span className="text-sm font-black text-[#001F3D]">₹{Math.round(calculateTotal() * 1.12)}</span>
                    </div>
                  ) : <div className="w-5" />}

                  <button 
                     onClick={nextStep}
                     disabled={(step === 4 && (!kycDocs.aadhar || !kycDocs.dl || !userDetails.fullName || !userDetails.phone || !userDetails.address || !userDetails.pincode))}
                     className={twMerge(
                       "flex-1 h-9 rounded-full font-bold text-[9px] uppercase tracking-[0.1em] shadow-lg flex items-center justify-center gap-2 transition-all",
                       (step === 4 && (!kycDocs.aadhar || !kycDocs.dl || !userDetails.fullName || !userDetails.phone || !userDetails.address || !userDetails.pincode)) 
                         ? "bg-slate-50 text-slate-200 border-slate-100 cursor-not-allowed" 
                         : "bg-[#001F3D] text-[#D4A017]"
                     )}
                  >
                     {step === 1 ? 'Explore' : step === 2 ? 'Initiate' : step === 3 ? 'Authorize' : step === 4 ? 'Confirm' : step === 5 ? 'Secure' : 'Confirm'}
                     <ArrowRight size={12} />
                  </button>
               </div>
            )}
         </div>
      )}

      <AnimatePresence>
        {showCalendar && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCalendar(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed bottom-0 inset-x-0 bg-white rounded-t-[2px] z-[70] p-10 shadow-2xl">
               <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-50">
                  <div>
                     <h3 className="text-3xl font-sans font-black text-[#001F3D] uppercase tracking-tighter leading-none mb-1">{monthsArr[viewDate.getMonth()]}</h3>
                     <p className="text-[10px] font-sans font-black text-[#D4A017] uppercase tracking-[0.4em]">{viewDate.getFullYear()}</p>
                  </div>
                  <div className="flex gap-3">
                     <button onClick={() => { const p = new Date(viewDate); p.setMonth(p.getMonth() - 1); setViewDate(p); }} className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><ChevronLeft size={20} /></button>
                     <button onClick={() => { const n = new Date(viewDate); n.setMonth(n.getMonth() + 1); setViewDate(n); }} className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><ChevronRight size={20} /></button>
                  </div>
               </div>
               <div className="grid grid-cols-7 gap-3 mb-6">
                  {daysArr.map(d => (<div key={d} className="h-10 flex items-center justify-center text-[10px] font-black text-slate-200 uppercase tracking-widest">{d}</div>))}
               </div>
               <div className="grid grid-cols-7 gap-2">
                  {renderCalendar()}
               </div>
               <button onClick={() => setShowCalendar(false)} className="w-full h-16 bg-[#001F3D] text-[#D4A017] rounded-[2px] font-sans font-black text-[10px] uppercase tracking-[0.3em] mt-10 border border-[#D4A017]/20">Lock Pickup Sequence</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RentalBooking;
