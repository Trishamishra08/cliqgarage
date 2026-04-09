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
            isS ? "bg-[#004AAD] text-white shadow-lg" : isP ? "text-slate-100 cursor-not-allowed" : "text-slate-600 hover:bg-slate-50"
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
            <div className="relative mb-8">
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-24 h-24 border-b-2 border-t-2 border-[#004AAD] rounded-full" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <Lock size={32} className="text-[#004AAD] animate-pulse" />
               </div>
            </div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-[0.3em] mb-2 px-10 text-center">Securing Transaction</h3>
            <p className="text-[9px] font-medium text-slate-400 uppercase tracking-widest animate-pulse">Encryption sequence active...</p>
            <div className="mt-12 w-64 h-1 bg-slate-50 rounded-full overflow-hidden">
               <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.5, ease: "easeInOut" }} className="h-full bg-[#004AAD]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

       {/* Top Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-2xl z-50 flex flex-col shadow-sm border-b border-slate-100 font-['Outfit']">
         <div className="px-5 py-3 flex items-center justify-between">
            <button onClick={step === 1 ? () => navigate(-1) : prevStep} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-all">
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <div className="text-center">
              <p className="text-[8px] font-black text-[#004AAD] uppercase tracking-[0.3em] mb-1">Step {step} / 6</p>
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest leading-none font-['Outfit']">
                {step === 1 ? 'Choose Tier' : step === 2 ? 'Select Vehicle' : step === 3 ? 'Configurations' : step === 4 ? 'Verification' : step === 5 ? 'Checkout' : 'Vault'}
              </h2>
            </div>
            <div className="w-10 h-10 flex items-center justify-center text-slate-400 opacity-20"><Zap size={18} /></div>
         </div>
         <div className="w-full h-1 bg-slate-50 overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${(step/6) * 100}%` }} className="h-full bg-[#004AAD]" />
         </div>
      </div>

      <div className="relative z-10 pt-20 pb-40 px-4 h-screen overflow-y-auto no-scrollbar font-['Outfit']">
        <AnimatePresence mode="wait">
          
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: -20 }} className="space-y-0 pt-0">
              <div className="text-center pt-0 pb-2">
                 <span className="text-[#004AAD] font-black text-[9px] uppercase tracking-[0.4em] mb-1 block opacity-40">Premium Select</span>
                 <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none relative inline-block">
                    THE COLLECTION
                    <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#004AAD] to-transparent rounded-full" />
                 </h2>
              </div>
              <div className="flex flex-col gap-0 pt-0">
                 {[
                   { type: 'bike', label: 'Motorcycles', img: bikeAsset, desc: 'BIKE', entryX: -300, btnMargin: 'mt-[-0.5rem]' },
                   { type: 'car', label: 'Luxury Cars', img: carAsset, desc: 'CAR', entryX: 300, btnMargin: 'mt-[-1.5rem]' }
                 ].map((t) => (
                   <div key={t.type} className="flex flex-col items-center mb-0">
                      <motion.div initial={{ x: t.entryX, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }} onClick={() => { setVehicleType(t.type); nextStep(); }} className="relative cursor-pointer group mb-0">
                         <img src={t.img} className={twMerge("w-full max-w-[320px] object-contain drop-shadow-[0_45px_45px_rgba(0,0,0,0.18)] group-hover:scale-105 transition-all duration-700", t.type === 'car' ? "max-h-52" : "max-h-48")} alt={t.label} />
                      </motion.div>
                      <motion.button initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 20 }} onClick={() => { setVehicleType(t.type); nextStep(); }} className={twMerge("h-11 px-10 rounded-full shadow-2xl bg-slate-900 text-white flex items-center justify-center gap-4 active:scale-95 transition-all border border-white/10 relative overflow-hidden group font-black uppercase text-[10px] tracking-[0.4em]", t.btnMargin)}>
                         <span>Select {t.desc}</span>
                         <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                   </div>
                 ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
               <div className="flex items-center gap-3 px-1">
                  <div className="flex-1 bg-white h-14 rounded-full border border-slate-100 shadow-sm flex items-center px-5 gap-3">
                     <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#004AAD]"><MapPin size={16} /></div>
                     <div className="flex flex-col leading-none">
                        <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest mb-1">Collection Point</span>
                        <p className="text-[11px] font-black text-slate-900 uppercase truncate max-w-[100px]">{location}</p>
                     </div>
                  </div>
                  <button onClick={() => setShowCalendar(true)} className="flex-1 bg-white h-14 rounded-full border border-slate-100 shadow-sm flex items-center px-5 gap-3 active:bg-slate-50 transition-all">
                     <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600"><Calendar size={16} /></div>
                     <div className="flex flex-col leading-none">
                        <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest mb-1">Reserve Date</span>
                        <p className="text-[11px] font-black text-slate-900 uppercase">{new Date(startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</p>
                     </div>
                  </button>
               </div>

               <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
                  {['All', ...(vehicleType === 'bike' ? ['Sport', 'Adventure', 'Cruiser'] : ['Sedan', 'SUV', 'Luxury'])].map(cat => (
                     <button key={cat} onClick={() => setSelectedCategory(cat)} className={twMerge("px-6 h-9 rounded-full text-[9px] font-black uppercase tracking-widest transition-all", selectedCategory === cat ? "bg-[#004AAD] text-white shadow-lg" : "bg-white text-slate-400 border border-slate-100")}>{cat}</button>
                  ))}
               </div>

               <div className="grid grid-cols-1 gap-5">
                  {availableVehicles.filter(v => selectedCategory === 'All' || v.category === selectedCategory).map((v) => (
                    <div key={v.id} onClick={() => v.isAvailable && (setSelectedVehicle(v), nextStep())} className={twMerge("bg-white rounded-none border-0 overflow-hidden transition-all relative flex flex-col group shadow-lg", v.isAvailable ? "active:scale-[0.99] cursor-pointer" : "opacity-30 grayscale cursor-not-allowed")}>
                       {!v.isAvailable && (
                         <div className="absolute top-2 right-2 z-10 bg-[#0A0E17]/90 text-white text-[7px] font-black uppercase px-2 py-1 flex items-center gap-1 backdrop-blur-sm"><ShieldAlert size={8} /> Occupied</div>
                       )}
                       <div className="relative w-full h-[220px] overflow-hidden bg-slate-900">
                          <img src={v.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={v.name} />
                          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                          <div className="absolute top-3 left-3 px-2 py-1 bg-white/10 backdrop-blur-md border border-white/10 font-black text-white text-[7px] uppercase tracking-[0.2em]">{v.category} Series</div>
                          <div className="absolute bottom-4 left-5 right-5">
                             <h4 className="text-xl font-black text-white uppercase tracking-tight leading-none mb-1.5">{v.name}</h4>
                             <p className="text-[8px] font-bold text-white/50 uppercase tracking-[0.3em]">{v.stats}</p>
                          </div>
                       </div>
                       <div className="px-5 py-4 flex justify-between items-center border-t border-slate-50">
                          <div className="flex flex-col"><span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Rental Premium</span><div className="flex items-baseline gap-1"><span className="text-xl font-black text-slate-900 leading-none">₹{v.price}</span><span className="text-[9px] font-bold text-slate-300 uppercase">/ Day</span></div></div>
                          <div className={twMerge("w-10 h-10 flex items-center justify-center transition-all", v.isAvailable ? "bg-[#004AAD] text-white shadow-xl group-hover:bg-slate-900" : "bg-slate-100 text-slate-300")}><ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></div>
                       </div>
                    </div>
                  ))}
               </div>
            </motion.div>
          )}

          {step === 3 && selectedVehicle && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
               <div className="bg-white p-8 border border-slate-50 shadow-sm relative overflow-hidden flex flex-col items-center">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50/50 rounded-full -mr-24 -mt-24 blur-3xl" />
                  <img src={selectedVehicle.image} className="w-full h-44 object-contain mb-6 relative z-10 drop-shadow-2xl" alt={selectedVehicle.name} />
                  <div className="text-center relative z-10">
                     <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-1.5">{selectedVehicle.name}</h3>
                     <p className="text-[10px] font-black text-[#004AAD] uppercase tracking-[0.5em]">{selectedVehicle.stats}</p>
                  </div>
               </div>
               <div className="grid gap-4 pt-4">
                  <div className="bg-white p-6 rounded-none border border-slate-100 shadow-sm flex items-center justify-between">
                     <div className="flex items-center gap-4 border-r border-slate-50 pr-8"><Clock size={20} className="text-[#004AAD]" /><div><p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Rental Window</p><p className="text-base font-black text-slate-900 uppercase">{rentalDays} Day{rentalDays > 1 ? 's' : ''}</p></div></div>
                     <div className="flex gap-2"><button onClick={() => setRentalDays(Math.max(1, rentalDays - 1))} className="w-10 h-10 border border-slate-100 rounded-none bg-slate-50 font-black text-slate-600">-</button><button onClick={() => setRentalDays(rentalDays + 1)} className="w-10 h-10 bg-[#004AAD] text-white rounded-none font-black shadow-lg shadow-blue-500/20">+</button></div>
                  </div>
                  <div className="bg-white p-6 rounded-none border border-slate-100 shadow-sm space-y-5">
                     <p className="text-[9px] font-black text-slate-900 uppercase tracking-[0.3em] border-l-2 border-[#004AAD] pl-3">Mileage Package</p>
                     <div className="grid grid-cols-3 gap-3">
                        {kmOptions.map(opt => (
                           <button key={opt.label} onClick={() => setSelectedKM(opt.label)} className={twMerge("p-4 border-2 rounded-none flex flex-col items-center transition-all", selectedKM === opt.label ? "border-[#004AAD] bg-blue-50/30 shadow-lg" : "border-slate-50 opacity-40")}>
                              <span className="text-[8px] font-black uppercase mb-1.5 tracking-widest">{opt.label}</span>
                              <span className="text-base font-black text-slate-900">{opt.km}</span>
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {/* Step 4: Verification - REDESIGNED TO BE SIMPLE & CLEAN (SERVICE PAGE STYLE) */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pt-4">
               {/* Simplified Heading - No paragraph, no italics, small tracking */}
               <div className="text-center">
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-widest font-['Outfit'] mb-0">USER DETAILS</h2>
               </div>

               {/* Proper Field Design - Clean Cards */}
               <div className="bg-white p-6 rounded-none border border-slate-100 shadow-xl space-y-6 relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="w-8 h-8 bg-blue-50 flex items-center justify-center text-[#004AAD] border border-blue-100"><User size={16} /></div>
                     <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Personal Identification</h3>
                  </div>
                  
                  <div className="grid gap-5">
                     {[
                       { key: 'fullName', label: 'FULL NAME', icon: User, ph: 'ENTER NAME' },
                       { key: 'phone', label: 'MOBILE NUMBER', icon: Phone, ph: '+91 XXXXX XXXXX' },
                       { key: 'address', label: 'COMPLETE ADDRESS', icon: Home, ph: 'BUILDING, STREET, AREA' },
                       { key: 'pincode', label: 'PINCODE', icon: Hash, ph: 'XXXXXX' }
                     ].map(field => (
                        <div key={field.key} className="space-y-2">
                           <label className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] block ml-0.5">{field.label}</label>
                           <div className="flex items-center bg-slate-50/50 border border-slate-100 rounded-none px-4 h-14 group focus-within:border-[#004AAD] transition-all">
                              <field.icon size={16} className="text-slate-300 mr-4 group-focus-within:text-[#004AAD]" />
                              <input 
                                type="text" 
                                placeholder={field.ph}
                                className="bg-transparent border-none outline-none flex-1 text-[11px] font-black uppercase placeholder:text-slate-200 text-slate-900 font-['Outfit']"
                                value={userDetails[field.key]}
                                onChange={(e) => setUserDetails({ ...userDetails, [field.key]: e.target.value.toUpperCase() })}
                              />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Clean Document Cards */}
               <div className="grid grid-cols-1 gap-3">
                  <p className="text-[8px] font-black text-slate-900 uppercase tracking-[0.4em] ml-1 mb-1">REQUISITE DOCUMENTS</p>
                  {[
                    { key: 'aadhar', label: 'AADHAR IDENTITY', ph: 'NATIONAL ID' },
                    { key: 'dl', label: 'DRIVING PERMIT', ph: 'OPERATIONS LICENSE' }
                  ].map(doc => (
                    <label key={doc.key} className={twMerge("cursor-pointer p-6 rounded-none border border-slate-100 flex items-center justify-between transition-all", kycDocs[doc.key] ? "bg-emerald-50 border-emerald-200 shadow-md" : "bg-white hover:border-[#004AAD]/20")}>
                        <input type="file" className="hidden" onChange={(e) => setKycDocs({...kycDocs, [doc.key]: e.target.files[0]})} />
                        <div className="flex items-center gap-4">
                           <div className={twMerge("w-10 h-10 rounded-none flex items-center justify-center transition-all", kycDocs[doc.key] ? "bg-emerald-500 text-white" : "bg-slate-50 text-slate-300")}>
                              {kycDocs[doc.key] ? <CheckCircle2 size={20} /> : <Upload size={18} />}
                           </div>
                           <div className="text-left font-['Outfit']">
                              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none mb-1">{doc.label}</h4>
                              <p className="text-[7px] font-bold text-slate-400 uppercase tracking-[0.2em]">{doc.ph}</p>
                           </div>
                        </div>
                        <ChevronRight size={16} className="text-slate-200" />
                    </label>
                  ))}
               </div>
            </motion.div>
          )}

          {step === 5 && selectedVehicle && (
            <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="bg-[#0A0E17] p-8 rounded-none shadow-2xl relative overflow-hidden text-white border border-white/5">
                   <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#004AAD]/20 rounded-full -mr-24 -mb-24 blur-3xl opacity-50" />
                   <h3 className="text-[11px] font-black text-[#004AAD] uppercase tracking-[0.5em] mb-8 relative z-10">SECURE VAULT SETTLEMENT</h3>
                   <div className="space-y-5 relative z-10 font-['Outfit']">
                      <div className="flex justify-between items-center opacity-40"><span className="text-[10px] font-black uppercase tracking-widest">Inventory Base ({rentalDays}D)</span><span className="text-sm font-black">₹{selectedVehicle.price * rentalDays}</span></div>
                      <div className="flex justify-between items-center opacity-40"><span className="text-[10px] font-black uppercase tracking-widest">Performance Pack ({selectedKM})</span><span className="text-sm font-black">₹{kmOptions.find(o => o.label === selectedKM)?.extra || 0}</span></div>
                      <div className="flex justify-between items-center opacity-40"><span className="text-[10px] font-black uppercase tracking-widest">Surcharge (GST 18%)</span><span className="text-sm font-black">₹{Math.round(calculateTotal() * 0.18)}</span></div>
                      <div className="pt-8 mt-4 border-t border-white/10 flex justify-between items-end"><span className="text-xs font-black uppercase tracking-widest text-[#004AAD]">Net Remittance</span><span className="text-4xl font-black tracking-tighter leading-none">₹{Math.round(calculateTotal() * 1.18)}</span></div>
                   </div>
                </div>
                <div className="grid gap-3">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] ml-2 mb-1">Settlement Terminal</p>
                   <button onClick={() => setPaymentMethod('online')} className={twMerge("w-full h-18 bg-white border-2 rounded-none flex items-center justify-between px-8 transition-all", paymentMethod === 'online' ? "border-[#004AAD] bg-blue-50/50 shadow-2xl" : "border-slate-50 opacity-50 grayscale")}>
                      <div className="flex items-center gap-5 text-[#004AAD]"><CreditCard size={24} /><span className="text-[11px] font-black uppercase tracking-[0.3em] font-['Outfit']">Stripe Secure Pay</span></div>
                      {paymentMethod === 'online' && <CheckCircle2 size={24} className="text-[#004AAD]" />}
                   </button>
                   <button onClick={() => setPaymentMethod('cod')} className={twMerge("w-full h-18 bg-white border-2 rounded-none flex items-center justify-between px-8 transition-all", paymentMethod === 'cod' ? "border-emerald-600 bg-emerald-50/50 shadow-2xl" : "border-slate-50 opacity-50 grayscale")}>
                      <div className="flex items-center gap-5 text-emerald-600"><Banknote size={24} /><span className="text-[11px] font-black uppercase tracking-[0.3em] font-['Outfit']">Arrival Remittance</span></div>
                      {paymentMethod === 'cod' && <CheckCircle2 size={24} className="text-emerald-600" />}
                   </button>
                </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div key="s6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center space-y-16 py-12">
                <div className="relative">
                   <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", damping: 10, stiffness: 100 }} className="w-32 h-32 bg-[#004AAD] text-white rounded-none flex items-center justify-center shadow-[0_30px_60px_rgba(0,74,173,0.4)] relative z-10"><CheckCircle2 size={72} strokeWidth={3} /></motion.div>
                   <div className="absolute inset-0 bg-[#004AAD]/20 blur-3xl rounded-full scale-150" />
                </div>
                <div className="space-y-6 font-['Outfit']">
                   <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">RESERVED SUCCESS.</h2>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] max-w-[320px] mx-auto leading-loose">Your selection is now encrypted in our systems. Delivery sequence initiated.</p>
                </div>
                <button onClick={() => navigate('/')} className="w-full max-w-[280px] h-16 bg-slate-900 text-white rounded-none font-black text-sm uppercase tracking-[0.5em] shadow-3xl active:scale-95 transition-all outline-none border border-white/5 font-['Outfit']">Return to Archive</button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* 🚀 ACTION ANCHOR - Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white/95 backdrop-blur-3xl border-t border-slate-50 z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
         {step < 6 && (
            <div className="max-w-md mx-auto flex items-center gap-6">
               {step >= 3 && (
                 <div className="flex flex-col pr-8 border-r border-slate-100 leading-none font-['Outfit']">
                    <span className="text-[7.5px] font-black text-slate-300 uppercase tracking-[0.4em] mb-2">Invoice</span>
                    <span className="text-3xl font-black text-[#004AAD] tracking-widest">₹{Math.round(calculateTotal() * 1.18)}</span>
                 </div>
               )}
               <button 
                  onClick={nextStep}
                  disabled={(step === 4 && (!kycDocs.aadhar || !kycDocs.dl || !userDetails.fullName || !userDetails.phone || !userDetails.address || !userDetails.pincode))}
                  className={twMerge(
                    "flex-1 h-16 rounded-none font-black text-[11px] uppercase tracking-[0.5em] shadow-2xl flex items-center justify-center gap-4 active:scale-95 transition-all border border-white/10 font-['Outfit']",
                    (step === 4 && (!kycDocs.aadhar || !kycDocs.dl || !userDetails.fullName || !userDetails.phone || !userDetails.address || !userDetails.pincode)) 
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none border-slate-200" 
                      : "bg-[#004AAD] text-white shadow-blue-500/30"
                  )}
               >
                  {step === 1 ? 'Start Exploration' : step === 2 ? 'Reserve Board' : step === 3 ? 'Finalize Build' : step === 4 ? 'Identity Secure' : step === 5 ? 'Authorize Vault' : 'Execute'}
                  <ArrowRight size={20} className="ml-1" />
               </button>
            </div>
         )}
      </div>

      {/* 🗓️ PREMIUM BOTTOM SHEET CALENDAR */}
      <AnimatePresence>
        {showCalendar && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCalendar(false)} className="fixed inset-0 bg-[#0A0E17]/80 backdrop-blur-xl z-[60]" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 40, stiffness: 400 }} className="fixed bottom-0 inset-x-0 bg-white rounded-t-none z-[70] p-10 shadow-3xl font-['Outfit']">
               <div className="flex items-center justify-between mb-10 pb-6 border-b-2 border-slate-50">
                  <div><h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-2">{monthsArr[viewDate.getMonth()]}</h3><p className="text-[11px] font-black text-[#004AAD] uppercase tracking-[0.6em] leading-none mb-0">{viewDate.getFullYear()}</p></div>
                  <div className="flex gap-2"><button onClick={() => { const p = new Date(viewDate); p.setMonth(p.getMonth() - 1); setViewDate(p); }} className="w-12 h-12 rounded-none bg-slate-50 flex items-center justify-center text-slate-800 border border-slate-100 active:scale-90 transition-all shadow-sm"><ChevronLeft size={20} /></button><button onClick={() => { const n = new Date(viewDate); n.setMonth(n.getMonth() + 1); setViewDate(n); }} className="w-12 h-12 rounded-none bg-slate-50 flex items-center justify-center text-slate-800 border border-slate-100 active:scale-90 transition-all shadow-sm"><ChevronRight size={20} /></button></div>
               </div>
               <div className="grid grid-cols-7 gap-2 mb-4 font-['Outfit']">{daysArr.map(d => (<div key={d} className="h-10 flex items-center justify-center text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">{d}</div>))}</div>
               <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>
               <button onClick={() => setShowCalendar(false)} className="w-full h-16 bg-[#0A0E17] text-white rounded-none font-black text-[12px] uppercase tracking-[0.6em] mt-12 shadow-3xl active:scale-95 transition-all underline underline-offset-8 decoration-[#004AAD] decoration-4 font-['Outfit']">Settle Sequence</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RentalBooking;
