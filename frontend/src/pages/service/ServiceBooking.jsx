import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, Star, MapPin, ShieldCheck, 
  CheckCircle2, ChevronRight, Calendar, 
  Clock, Plus, CreditCard, Shield, 
  Bike, Car, Settings, Check, Zap, X,
  Lock, Loader2
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const ServiceBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const passedVehicle = location.state?.vehicle; 
  const passedService = location.state?.service;

  const [step, setStep] = useState(passedVehicle ? 2 : 1); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const vehicles = [
    { id: 1, name: "Royal Enfield Bullet 350", type: "bike", reg: "DL 3S CC 1234", image: "https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=400" },
    { id: 2, name: "BMW M3 Competition", type: "car", reg: "HR 26 DQ 8888", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=400" }
  ];

  const mechanic = {
    id: 1,
    name: "Elite Performance Hub",
    type: "Premium Specialist",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800",
    services: [
        { id: 101, name: "Maintenance Core", price: 2999, desc: "Full service & systems check" },
        { id: 102, name: "Performance Flush", price: 1899, desc: "Synthetic performance engine oil" },
        { id: 103, name: "Precision Braking", price: 1299, desc: "Fluid refill & pad optimization" },
        { id: 104, name: "Precision Tuning", price: 899, desc: "Computerized ECU optimization" }
    ]
  };

  const slots = ["09:00 AM", "10:30 AM", "12:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"];

  useEffect(() => {
    if (passedVehicle) {
      const match = vehicles.find(v => v.type === passedVehicle);
      if (match) setSelectedVehicle(match);
      setStep(2);
    }
  }, [passedVehicle]);

  useEffect(() => {
    if (passedService) {
        const core = mechanic.services[0];
        setSelectedServices([core]);
    }
  }, [passedService]);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate real payment delay
    setTimeout(() => {
        setIsProcessing(false);
        setStep(5);
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
  const displayStep = passedVehicle ? step - 1 : step;
  const totalSteps = passedVehicle ? 3 : 4;

  return (
    <div className="max-w-md mx-auto bg-[#F8FAFC] min-h-screen pb-32 font-['Outfit'] relative">
       {/* 🔐 Processing Overlay (Real Payment Effect) */}
       <AnimatePresence>
          {isProcessing && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
             >
                <div className="relative mb-8">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                     className="w-24 h-24 border-b-2 border-t-2 border-[var(--primary-color)] rounded-full"
                   />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Lock size={32} className="text-[var(--primary-color)] animate-pulse" />
                   </div>
                </div>
                
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-[0.3em] mb-2 px-10 text-center">Securing Transaction</h3>
                <p className="text-[9px] font-medium text-slate-400 uppercase tracking-widest animate-breath">Processing through Stripe Connect...</p>
                
                <div className="mt-12 w-64 h-1 bg-slate-50 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 3, ease: "easeInOut" }}
                     className="h-full bg-[var(--primary-color)]"
                   />
                </div>
             </motion.div>
          )}
       </AnimatePresence>

       {/* Header */}
       <div className="px-6 pt-8 pb-3 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-40 backdrop-blur-xl bg-white/80">
          <button 
             onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
             className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100"
          >
             <ChevronLeft size={16} />
          </button>
          <div className="text-center">
             <span className="text-[7px] font-bold tracking-[0.3em] text-[var(--primary-color)] uppercase block mb-0.5 italic">Hub Terminal</span>
             <h2 className="text-[9px] font-semibold text-slate-900 uppercase tracking-widest leading-none">Process {displayStep < 1 ? 1 : displayStep} / {totalSteps}</h2>
          </div>
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100">
             <Shield size={14} />
          </div>
       </div>

       <div className="px-5 pt-2 pb-5">
          <AnimatePresence mode="wait">
             {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                   <h3 className="text-lg font-semibold text-slate-900 uppercase tracking-tight">Select Vehicle</h3>
                   <div className="grid gap-3">
                      {vehicles.map((v) => (
                         <div key={v.id} onClick={() => setSelectedVehicle(v)} className={twMerge("p-3.5 rounded-2xl border transition-all flex items-center gap-4", selectedVehicle?.id === v.id ? "bg-white border-[var(--primary-color)] shadow-lg" : "bg-white border-slate-100")}>
                            <img src={v.image} className="w-12 h-12 rounded-lg object-cover" />
                            <div className="flex-1">
                               <h4 className="text-[11px] font-bold text-slate-900 uppercase">{v.name}</h4>
                               <p className="text-[8px] font-medium text-slate-400 uppercase tracking-widest leading-none mt-1">{v.reg}</p>
                            </div>
                         </div>
                      ))}
                   </div>
                   <button onClick={() => setStep(2)} className="w-full h-11 bg-[var(--primary-color)] text-white rounded-xl font-bold uppercase tracking-widest text-[9px]">Continue</button>
                </motion.div>
             )}

             {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                   {selectedVehicle && (
                      <div className="bg-[var(--header-color)] p-2.5 rounded-xl flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <img src={selectedVehicle.image} className="w-8 h-8 rounded-lg object-cover" />
                            <h4 className="text-[8px] font-semibold text-white uppercase tracking-widest">{selectedVehicle.name}</h4>
                         </div>
                      </div>
                   )}

                   <div className="space-y-2.5">
                      {mechanic.services.map((s) => {
                        const isSelected = selectedServices.find(item => item.id === s.id);
                        return (
                          <div 
                            key={s.id} 
                            onClick={() => toggleService(s)}
                            className={twMerge(
                              "p-3.5 rounded-2xl border transition-all flex items-center justify-between bg-white",
                              isSelected ? "border-[var(--primary-color)] shadow-md" : "border-slate-50"
                            )}
                          >
                             <div>
                                <h4 className="text-[10px] font-bold uppercase text-slate-900">{s.name}</h4>
                                <p className="text-[8px] font-medium text-slate-400">{s.desc}</p>
                                <p className="text-[11px] font-bold text-[var(--primary-color)] mt-1.5 font-['Outfit'] tracking-tight">₹{s.price}</p>
                             </div>
                             <div className={twMerge("w-7 h-7 rounded-lg flex items-center justify-center transition-all", isSelected ? "bg-[var(--primary-color)] text-white" : "bg-slate-50 text-slate-200")}>
                                {isSelected ? <X size={14} /> : <Plus size={14} />}
                             </div>
                          </div>
                        );
                      })}
                   </div>

                   <button disabled={selectedServices.length === 0} onClick={() => setStep(3)} className="w-full h-11 bg-[var(--primary-color)] text-white rounded-xl font-bold uppercase tracking-widest text-[9px] shadow-lg">
                      Schedule Service <ChevronRight size={12} className="ml-1 inline" />
                   </button>
                </motion.div>
             )}

             {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                   <div className="bg-white p-5 rounded-3xl border border-slate-50 shadow-sm">
                      <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4">Select Date</h3>
                      <input type="date" defaultValue={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full h-11 bg-slate-50 border-none rounded-xl px-4 text-[10px] font-bold" />
                   </div>
                   <div className="bg-white p-5 rounded-3xl border border-slate-50 shadow-sm">
                      <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4">Select Slot</h3>
                      <div className="grid grid-cols-2 gap-2">
                         {slots.map((s, i) => (
                            <button key={i} onClick={() => setSelectedSlot(s)} className={twMerge("h-11 rounded-xl text-[9px] font-bold uppercase transition-all", selectedSlot === s ? "bg-[var(--primary-color)] text-white shadow-lg" : "bg-slate-50 text-slate-400 border border-slate-50")}>
                               {s}
                            </button>
                         ))}
                      </div>
                   </div>
                   <button disabled={!selectedSlot} onClick={() => setStep(4)} className="w-full h-11 bg-[var(--primary-color)] text-white rounded-xl font-bold uppercase tracking-widest text-[9px]">Review Order</button>
                </motion.div>
             )}

             {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
                   <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-50 space-y-5">
                      <div className="flex items-center gap-4 pb-4 border-b border-slate-50">
                          <img src={selectedVehicle?.image} className="w-12 h-12 rounded-xl object-cover" />
                          <div>
                             <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">Selected Vehicle</p>
                             <h4 className="text-[10px] font-bold text-slate-900 uppercase">{selectedVehicle?.name}</h4>
                          </div>
                      </div>
                      <div className="space-y-2">
                         {selectedServices.map((s) => (
                            <div key={s.id} className="flex justify-between text-[9px] font-bold uppercase text-slate-500">
                               <span>{s.name}</span>
                               <span className="text-slate-900 font-['Outfit']">₹{s.price}</span>
                            </div>
                         ))}
                         <div className="pt-4 mt-2 border-t border-slate-100 flex justify-between items-center px-1 font-bold">
                            <span className="text-[10px] uppercase text-slate-400">Total</span>
                            <span className="text-2xl text-[var(--primary-color)] font-['Outfit'] tracking-tighter">₹{totalAmount}</span>
                         </div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <Calendar size={16} className="text-[var(--primary-color)]" />
                            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tight">{selectedDate} @ {selectedSlot}</span>
                         </div>
                      </div>
                   </div>
                   <button 
                      onClick={handlePayment}
                      className="w-full h-12 bg-[var(--primary-color)] text-white rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                   >
                      <CreditCard size={14} />
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Confirm & Pay Now</span>
                   </button>
                   <div className="flex items-center justify-center gap-2">
                      <ShieldCheck size={12} className="text-[var(--primary-color)]" />
                      <p className="text-[7.5px] font-bold text-slate-300 uppercase tracking-[0.2em] italic">Stripe Secure Encryption</p>
                   </div>
                </motion.div>
             )}

             {step === 5 && (
                <motion.div 
                   key="step5" 
                   initial={{ opacity: 0, scale: 0.8 }} 
                   animate={{ opacity: 1, scale: 1 }} 
                   className="flex flex-col items-center pt-2"
                >
                   <div className="w-full bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50 flex flex-col items-center text-center relative overflow-hidden">
                      <div className="absolute top-0 inset-x-0 h-1.5 bg-[var(--primary-color)]" />
                      
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 10, stiffness: 100 }}
                        className="w-20 h-20 rounded-full bg-[var(--primary-color)] flex items-center justify-center text-white mb-8 shadow-2xl shadow-[var(--primary-color)]/30"
                      >
                         <CheckCircle2 size={44} strokeWidth={2.5} />
                      </motion.div>

                      <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tighter mb-2 italic px-2">ORDER PLACED</h2>
                      <p className="text-[9px] font-bold text-[#004AAD] uppercase tracking-[0.4em] mb-8 italic">VERIFIED BY CLIQGARAGE</p>
                      
                      <div className="w-full h-px bg-slate-50 mb-8" />
                      
                      <div className="w-full space-y-4 mb-10 px-2">
                         <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 px-1 uppercase tracking-widest font-['Outfit']">
                            <span>Amount Paid</span>
                            <span className="text-slate-900">₹{totalAmount}</span>
                         </div>
                         <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 px-1 uppercase tracking-widest font-['Outfit']">
                            <span>Booking ID</span>
                            <span className="text-slate-900">#SVC-{(Math.random()*9000).toFixed(0)}</span>
                         </div>
                      </div>

                      <button onClick={() => navigate('/')} className="w-full h-11 bg-[var(--header-color)] text-white rounded-xl text-[9px] font-bold uppercase tracking-widest active:scale-95 transition-all">
                         Back to Dashboard
                      </button>
                   </div>
                </motion.div>
             )}
          </AnimatePresence>
       </div>
    </div>
  );
};

export default ServiceBooking;
