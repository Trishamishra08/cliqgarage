import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Bike, Car, Calendar, 
  MapPin, ShieldCheck, Upload, CreditCard, 
  CheckCircle2, ArrowRight, Gauge, Clock,
  Search, ChevronRight, Info, Shield, Zap, 
  Banknote, Lock, Loader2, User, Phone, 
  Home, Hash, AlertTriangle, ShieldAlert
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import bikeAsset from '../../assets/bullet-removebg-preview (1).png';
import carAsset from '../../assets/Side_view_of_blue_generic_unbranded_suv_car_isolated_on_white_background___Premium_Photo-removebg-preview.png';

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

  // Mock Data
  const vehiclesData = {
    bike: [
      { 
        id: 1, 
        name: "Kawasaki Ninja 400", 
        category: "Sport",
        price: 1499, 
        stats: "45 BHP • 400cc", 
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop",
        unavailableDates: ['2026-04-12', '2026-04-20']
      },
      { 
        id: 2, 
        name: "RE Himalayan 450", 
        category: "Adventure",
        price: 999, 
        stats: "40 BHP • 450cc", 
        image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=800&auto=format&fit=crop",
        unavailableDates: ['2026-04-10', '2026-04-11']
      },
      {
        id: 5,
        name: "Harley Iron 883",
        category: "Cruiser",
        price: 2499,
        stats: "50 BHP • 883cc",
        image: "https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=800&auto=format&fit=crop",
        unavailableDates: ['2026-04-15']
      }
    ],
    car: [
      { 
        id: 3, 
        name: "Thar 4x4 Luxury", 
        category: "SUV",
        price: 2499, 
        stats: "Manual • Diesel", 
        image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800&auto=format&fit=crop",
        unavailableDates: ['2026-04-11', '2026-04-12']
      },
      { 
        id: 4, 
        name: "BMW M3 Sedan", 
        category: "Sedan",
        price: 5499, 
        stats: "Auto • Petrol", 
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop",
        unavailableDates: ['2026-04-25']
      }
    ]
  };

  useEffect(() => {
    const list = vehiclesData[vehicleType].map(v => ({
      ...v,
      isAvailable: !v.unavailableDates.includes(startDate)
    }));
    setAvailableVehicles(list);
  }, [vehicleType, startDate]);

  const kmOptions = [
    { label: 'Standard', km: 150, extra: 0, desc: 'City' },
    { label: 'Extended', km: 300, extra: 500, desc: 'Long' },
    { label: 'Unlimited', km: '∞', extra: 1000, desc: 'Tours' }
  ];

  const calculateTotal = () => {
    if (!selectedVehicle) return 0;
    const extraKMPrice = kmOptions.find(o => o.label === selectedKM)?.extra || 0;
    return (selectedVehicle.price + extraKMPrice) * rentalDays;
  };

  const nextStep = () => {
    if (step === 5) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(6);
      }, 2500);
    } else {
      setStep(prev => prev + 1);
    }
  };
  const prevStep = () => setStep(prev => prev - 1);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const daysArr = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const renderCalendar = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInM = getDaysInMonth(year, month);
    const startD = getFirstDayOfMonth(year, month);
    const cells = [];

    for (let i = 0; i < startD; i++) cells.push(<div key={`empty-${i}`} className="h-8" />);
    for (let d = 1; d <= daysInM; d++) {
      const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isS = startDate === dStr;
      const isP = new Date(year, month, d) < new Date(new Date().setHours(0,0,0,0));

      cells.push(
        <button
          key={d}
          disabled={isP}
          onClick={() => { setStartDate(dStr); setShowCalendar(false); }}
          className={twMerge(
            "h-8 w-8 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center",
            isS ? "bg-[var(--primary-color)] text-white shadow-lg" : isP ? "text-slate-100 cursor-not-allowed" : "text-slate-600 hover:bg-slate-50"
          )}
        >
          {d}
        </button>
      );
    }
    return cells;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFF] via-white to-[#F0F7FF] font-['Outfit'] select-none overflow-hidden relative">
      <AnimatePresence>
        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
          >
            <div className="relative mb-6">
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-20 h-20 border-b-2 border-t-2 border-[var(--primary-color)] rounded-full" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <Lock size={28} className="text-[var(--primary-color)] animate-pulse" />
               </div>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1 px-10 text-center">Securing Transaction</h3>
            <p className="text-[9px] font-medium text-slate-400 animate-pulse">Encryption sequence active...</p>
            <div className="mt-10 w-56 h-1 bg-slate-50 rounded-full overflow-hidden">
               <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.5, ease: "easeInOut" }} className="h-full bg-[var(--primary-color)]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

       {/* Top Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-2xl z-50 flex flex-col border-b border-slate-100">
         <div className="px-5 py-2.5 flex items-center justify-between">
            <button onClick={step === 1 ? () => navigate(-1) : prevStep} className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-all">
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>
            <div className="text-center">
              <p className="text-[8px] font-bold text-[var(--primary-color)] mb-0.5 opacity-60">Step {step} of 6</p>
              <h2 className="text-xs font-bold text-slate-900 tracking-tight leading-none">
                {step === 1 ? 'Choose Tier' : step === 2 ? 'Select Vehicle' : step === 3 ? 'Configurations' : step === 4 ? 'Verification' : step === 5 ? 'Checkout' : 'Success'}
              </h2>
            </div>
            <div className="w-9 h-9 flex items-center justify-center text-slate-400 opacity-20"><Zap size={16} /></div>
         </div>
         <div className="w-full h-1 bg-slate-50 overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${(step/6) * 100}%` }} className="h-full bg-[var(--primary-color)]" />
         </div>
      </div>

      <div className="relative z-10 pt-16 pb-32 px-4 h-screen overflow-y-auto no-scrollbar">
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
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
               <div className="flex items-center gap-3 px-1">
                  <div className="flex-1 bg-white h-12 rounded-full border border-slate-100 shadow-sm flex items-center px-4 gap-3">
                     <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-[var(--primary-color)]"><MapPin size={14} /></div>
                     <div className="flex flex-col leading-none">
                        <span className="text-[7px] font-bold text-slate-300 mb-0.5">Location</span>
                        <p className="text-[10px] font-bold text-slate-900 truncate max-w-[90px]">{location}</p>
                     </div>
                  </div>
                  <button onClick={() => setShowCalendar(true)} className="flex-1 bg-white h-12 rounded-full border border-slate-100 shadow-sm flex items-center px-4 gap-3 active:bg-slate-50 transition-all">
                     <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center text-orange-600"><Calendar size={14} /></div>
                     <div className="flex flex-col leading-none">
                        <span className="text-[7px] font-bold text-slate-300 mb-0.5">Pickup Date</span>
                        <p className="text-[10px] font-bold text-slate-900">{new Date(startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</p>
                     </div>
                  </button>
               </div>

               <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
                  {['All', ...(vehicleType === 'bike' ? ['Sport', 'Adventure', 'Cruiser'] : ['Sedan', 'SUV', 'Luxury'])].map(cat => (
                     <button key={cat} onClick={() => setSelectedCategory(cat)} className={twMerge("px-5 h-8 rounded-full text-[9px] font-bold transition-all", selectedCategory === cat ? "bg-[var(--primary-color)] text-white shadow-md" : "bg-white text-slate-400 border border-slate-100")}>{cat}</button>
                  ))}
               </div>

               <div className="grid grid-cols-1 gap-4">
                  {availableVehicles.filter(v => selectedCategory === 'All' || v.category === selectedCategory).map((v) => (
                    <div key={v.id} onClick={() => v.isAvailable && (setSelectedVehicle(v), nextStep())} className={twMerge("bg-white rounded-2xl border border-slate-50 overflow-hidden transition-all relative flex flex-col group shadow-md", v.isAvailable ? "active:scale-[0.99] cursor-pointer" : "opacity-30 grayscale cursor-not-allowed")}>
                       {!v.isAvailable && (
                         <div className="absolute top-2 right-2 z-10 bg-slate-900 text-white text-[7px] font-bold px-2 py-1 rounded-full flex items-center gap-1">Occupied</div>
                       )}
                       <div className="relative w-full h-[180px] overflow-hidden bg-slate-100">
                          <img src={v.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={v.name} />
                          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                          <div className="absolute top-3 left-3 px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[7px] font-bold text-white">{v.category}</div>
                          <div className="absolute bottom-3 left-4 right-4">
                             <h4 className="text-base font-bold text-white leading-none mb-1">{v.name}</h4>
                             <p className="text-[8px] font-medium text-white/70">{v.stats}</p>
                          </div>
                       </div>
                       <div className="px-4 py-3 flex justify-between items-center bg-white">
                          <div className="flex flex-col"><span className="text-[7px] font-medium text-slate-400 mb-0.5">Rental Premium</span><div className="flex items-baseline gap-1"><span className="text-lg font-bold text-slate-900 leading-none">₹{v.price}</span><span className="text-[9px] font-medium text-slate-400">/ Day</span></div></div>
                          <div className={twMerge("w-8 h-8 rounded-full flex items-center justify-center transition-all", v.isAvailable ? "bg-[var(--primary-color)] text-white shadow-md" : "bg-slate-100 text-slate-300")}><ArrowRight size={16} /></div>
                       </div>
                    </div>
                  ))}
               </div>
            </motion.div>
          )}

          {step === 3 && selectedVehicle && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
               <div className="bg-white p-6 rounded-3xl border border-slate-50 shadow-sm relative overflow-hidden flex flex-col items-center">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50/50 rounded-full -mr-20 -mt-20 blur-3xl" />
                  <img src={selectedVehicle.image} className="w-full h-40 object-contain mb-4 relative z-10 drop-shadow-xl" alt={selectedVehicle.name} />
                  <div className="text-center relative z-10">
                     <h3 className="text-xl font-bold text-slate-900 mb-1">{selectedVehicle.name}</h3>
                     <p className="text-[10px] font-medium text-slate-400">{selectedVehicle.stats}</p>
                  </div>
               </div>
               <div className="grid gap-3">
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                     <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[var(--primary-color)]"><Clock size={18} /></div><div><p className="text-[8px] font-bold text-slate-300 mb-0.5">Rental Duration</p><p className="text-sm font-bold text-slate-900">{rentalDays} Day{rentalDays > 1 ? 's' : ''}</p></div></div>
                     <div className="flex gap-2"><button onClick={() => setRentalDays(Math.max(1, rentalDays - 1))} className="w-10 h-10 rounded-xl border border-slate-100 bg-slate-50 font-bold text-slate-600">-</button><button onClick={() => setRentalDays(rentalDays + 1)} className="w-10 h-10 rounded-xl bg-[var(--primary-color)] text-white font-bold shadow-md shadow-blue-500/20">+</button></div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                     <p className="text-[9px] font-bold text-slate-900 border-l-2 border-[var(--primary-color)] pl-3">Mileage Package</p>
                     <div className="grid grid-cols-3 gap-3">
                        {kmOptions.map(opt => (
                           <button key={opt.label} onClick={() => setSelectedKM(opt.label)} className={twMerge("p-3 rounded-xl border-2 flex flex-col items-center transition-all", selectedKM === opt.label ? "border-[var(--primary-color)] bg-blue-50/30" : "border-slate-50 opacity-40")}>
                              <span className="text-[8px] font-bold mb-1">{opt.label}</span>
                              <span className="text-sm font-bold text-slate-900">{opt.km}</span>
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-2">
               <div className="text-center">
                  <h2 className="text-xl font-bold text-slate-900">User Details</h2>
               </div>

               <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-lg space-y-5">
                  <div className="flex items-center gap-3 mb-1">
                     <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-[var(--primary-color)]"><User size={14} /></div>
                     <h3 className="text-[10px] font-bold text-slate-900">Personal Information</h3>
                  </div>
                  
                  <div className="grid gap-4">
                     {[
                       { key: 'fullName', label: 'Full Name', icon: User, ph: 'Your name' },
                       { key: 'phone', label: 'Mobile Number', icon: Phone, ph: '+91 XXXXX XXXXX' },
                       { key: 'address', label: 'Address', icon: Home, ph: 'Building, Area, Street' },
                       { key: 'pincode', label: 'Pincode', icon: Hash, ph: '6-digit code' }
                     ].map(field => (
                        <div key={field.key} className="space-y-1.5">
                           <label className="text-[8px] font-bold text-slate-400 block ml-0.5">{field.label}</label>
                           <div className="flex items-center bg-slate-50/50 border border-slate-100 rounded-xl px-4 h-12 group focus-within:border-[var(--primary-color)] transition-all">
                              <field.icon size={14} className="text-slate-300 mr-3 group-focus-within:text-[var(--primary-color)]" />
                              <input 
                                type="text" 
                                placeholder={field.ph}
                                className="bg-transparent border-none outline-none flex-1 text-[11px] font-medium placeholder:text-slate-300 text-slate-900"
                                value={userDetails[field.key]}
                                onChange={(e) => setUserDetails({ ...userDetails, [field.key]: e.target.value })}
                              />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="grid grid-cols-1 gap-2.5">
                  <p className="text-[8px] font-bold text-slate-900 ml-1">Documents Required</p>
                  {[
                    { key: 'aadhar', label: 'Aadhar Identity', ph: 'National Card' },
                    { key: 'dl', label: 'Driving License', ph: 'Operations Permit' }
                  ].map(doc => (
                    <label key={doc.key} className={twMerge("cursor-pointer p-4 rounded-2xl border border-slate-100 flex items-center justify-between transition-all", kycDocs[doc.key] ? "bg-emerald-50 border-emerald-100 shadow-sm" : "bg-white")}>
                        <input type="file" className="hidden" onChange={(e) => setKycDocs({...kycDocs, [doc.key]: e.target.files[0]})} />
                        <div className="flex items-center gap-4">
                           <div className={twMerge("w-9 h-9 rounded-full flex items-center justify-center", kycDocs[doc.key] ? "bg-emerald-500 text-white" : "bg-slate-50 text-slate-300")}>
                              {kycDocs[doc.key] ? <CheckCircle2 size={18} /> : <Upload size={16} />}
                           </div>
                           <div className="text-left font-['Outfit']">
                              <h4 className="text-[10px] font-bold text-slate-900 leading-none mb-1">{doc.label}</h4>
                              <p className="text-[7px] font-medium text-slate-400">{doc.ph}</p>
                           </div>
                        </div>
                        <ChevronRight size={14} className="text-slate-200" />
                    </label>
                  ))}
               </div>
            </motion.div>
          )}

          {step === 5 && selectedVehicle && (
            <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div className="bg-slate-900 p-6 rounded-3xl shadow-xl relative overflow-hidden text-white border border-white/5">
                   <div className="absolute bottom-0 right-0 w-40 h-40 bg-[var(--primary-color)]/20 rounded-full blur-3xl opacity-50" />
                   <h3 className="text-[10px] font-bold text-[var(--primary-color)] mb-6 relative z-10">Checkout Summary</h3>
                   <div className="space-y-4 relative z-10">
                      <div className="flex justify-between items-center text-slate-400"><span className="text-[9px] font-medium tracking-tight">Rental Duration ({rentalDays}d)</span><span className="text-sm font-bold text-white">₹{selectedVehicle.price * rentalDays}</span></div>
                      <div className="flex justify-between items-center text-slate-400"><span className="text-[9px] font-medium tracking-tight">Package ({selectedKM})</span><span className="text-sm font-bold text-white">₹{kmOptions.find(o => o.label === selectedKM)?.extra || 0}</span></div>
                      <div className="flex justify-between items-center text-slate-400"><span className="text-[9px] font-medium tracking-tight">Taxes (GST 18%)</span><span className="text-sm font-bold text-white">₹{Math.round(calculateTotal() * 0.18)}</span></div>
                      <div className="pt-6 mt-2 border-t border-white/10 flex justify-between items-end"><span className="text-xs font-bold text-[var(--primary-color)]">Net Total</span><span className="text-3xl font-bold tracking-tight text-white leading-none">₹{Math.round(calculateTotal() * 1.18)}</span></div>
                   </div>
                </div>
                <div className="grid gap-2.5">
                   <p className="text-[9px] font-bold text-slate-400 ml-1">Payment Options</p>
                   <button onClick={() => setPaymentMethod('online')} className={twMerge("w-full h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-between px-6 transition-all", paymentMethod === 'online' ? "border-[var(--primary-color)] bg-blue-50/30 shadow-md" : "opacity-60")}>
                      <div className="flex items-center gap-4 text-[var(--primary-color)]"><CreditCard size={20} /><span className="text-[10px] font-bold">Pay Online</span></div>
                      {paymentMethod === 'online' && <CheckCircle2 size={20} className="text-[var(--primary-color)]" />}
                   </button>
                   <button onClick={() => setPaymentMethod('cod')} className={twMerge("w-full h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-between px-6 transition-all", paymentMethod === 'cod' ? "border-emerald-500 bg-emerald-50/30 shadow-md" : "opacity-60")}>
                      <div className="flex items-center gap-4 text-emerald-600"><Banknote size={20} /><span className="text-[10px] font-bold">Pay At Delivery</span></div>
                      {paymentMethod === 'cod' && <CheckCircle2 size={20} className="text-emerald-600" />}
                   </button>
                </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div key="s6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center space-y-10 py-8">
                <div className="relative">
                   <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12, stiffness: 120 }} className="w-24 h-24 bg-[var(--primary-color)] text-white rounded-3xl flex items-center justify-center shadow-xl relative z-10"><CheckCircle2 size={48} strokeWidth={2.5} /></motion.div>
                   <div className="absolute inset-0 bg-[var(--primary-color)]/20 blur-3xl scale-125" />
                </div>
                <div className="space-y-4">
                   <h2 className="text-3xl font-bold text-slate-900 leading-none">Booking Confirmed</h2>
                   <p className="text-[11px] font-medium text-slate-400 max-w-[260px] mx-auto leading-relaxed">Your vehicle has been successfully reserved. We will reach out shortly for coordination.</p>
                </div>
                <button onClick={() => navigate('/')} className="w-full max-w-[240px] h-14 bg-slate-900 text-white rounded-2xl font-bold text-xs shadow-lg active:scale-95 transition-all outline-none border border-white/5">Back to Home</button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* 🚀 ACTION ANCHOR - Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-3xl border-t border-slate-50 z-50 shadow-lg">
         {step < 6 && (
            <div className="max-w-md mx-auto flex items-center gap-5">
               {step >= 3 && (
                 <div className="flex flex-col pr-6 border-r border-slate-100 leading-none">
                    <span className="text-[7px] font-bold text-slate-300 mb-1.5">Amount</span>
                    <span className="text-2xl font-bold text-[var(--primary-color)]">₹{Math.round(calculateTotal() * 1.18)}</span>
                 </div>
               )}
               <button 
                  onClick={nextStep}
                  disabled={(step === 4 && (!kycDocs.aadhar || !kycDocs.dl || !userDetails.fullName || !userDetails.phone || !userDetails.address || !userDetails.pincode))}
                  className={twMerge(
                    "flex-1 h-14 rounded-2xl font-bold text-[10px] shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all border border-white/10 font-['Outfit']",
                    (step === 4 && (!kycDocs.aadhar || !kycDocs.dl || !userDetails.fullName || !userDetails.phone || !userDetails.address || !userDetails.pincode)) 
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none border-slate-200" 
                      : "bg-[var(--primary-color)] text-white shadow-blue-500/30"
                  )}
               >
                  {step === 1 ? 'Start Exploration' : step === 2 ? 'Reserve Vehicle' : step === 3 ? 'Finalize Details' : step === 4 ? 'Save & Continue' : step === 5 ? 'Confirm Booking' : 'Confirm'}
                  <ArrowRight size={18} />
               </button>
            </div>
         )}
      </div>

      {/* Calendar Bottom Sheet */}
      <AnimatePresence>
        {showCalendar && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCalendar(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed bottom-0 inset-x-0 bg-white rounded-t-3xl z-[70] p-8 shadow-2xl">
               <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                  <div><h3 className="text-2xl font-bold text-slate-900">{monthsArr[viewDate.getMonth()]}</h3><p className="text-[10px] font-bold text-[#004AAD]">{viewDate.getFullYear()}</p></div>
                  <div className="flex gap-2"><button onClick={() => { const p = new Date(viewDate); p.setMonth(p.getMonth() - 1); setViewDate(p); }} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100"><ChevronLeft size={16} /></button><button onClick={() => { const n = new Date(viewDate); n.setMonth(n.getMonth() + 1); setViewDate(n); }} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100"><ChevronRight size={16} /></button></div>
               </div>
               <div className="grid grid-cols-7 gap-2 mb-3">{daysArr.map(d => (<div key={d} className="h-8 flex items-center justify-center text-[8px] font-bold text-slate-300">{d}</div>))}</div>
               <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
               <button onClick={() => setShowCalendar(false)} className="w-full h-14 bg-slate-900 text-white rounded-2xl font-bold text-xs mt-8 shadow-lg active:scale-95 transition-all">Set Pickup Date</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RentalBooking;
