import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Wrench, ShieldAlert, Sparkles, 
  MapPin, Clock, Search, ChevronRight,
  ShieldCheck, Info, Zap, AlertCircle,
  Phone, Navigation, Settings, HelpCircle,
  X, CheckCircle2, Siren, PenTool as Tool,
  ArrowRight, CreditCard, Banknote, Star,
  Award, MessageSquare, Briefcase, Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const Repairs = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('home'); 
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [isProcessing, setIsProcessing] = useState(false);

  const nearbyMechanics = [
    {
      id: 1,
      name: "Rajesh Kumar",
      shopName: "AutoFix Premium Care",
      distance: "0.8 km",
      phone: "+91 98765-43210",
      rating: 4.9,
      experience: "12+ Years",
      specialty: "Superbikes & Luxury",
      status: "Available",
      arrival: "15 mins",
      reviews: 124,
      bio: "Expert in performance tuning and emergency onsite repairs for premium motorcycles."
    },
    {
      id: 2,
      name: "Suresh Mistri",
      shopName: "Royal Enfield Specialist",
      distance: "1.2 km",
      phone: "+91 88776-55443",
      rating: 4.7,
      experience: "15+ Years",
      specialty: "RE & Vintage",
      status: "Busy",
      arrival: "25 mins",
      reviews: 89,
      bio: "Master mechanic for all Royal Enfield models with genuine parts guarantee."
    },
    {
      id: 3,
      name: "Vikram Singh",
      shopName: "The Gearhead Hub",
      distance: "2.5 km",
      phone: "+91 77665-44332",
      rating: 4.8,
      experience: "8+ Years",
      specialty: "Transmission & Engine",
      status: "Available",
      arrival: "35 mins",
      reviews: 210,
      bio: "Specializes in complex engine overhauls and transmission repairs."
    }
  ];

  const repairCategories = [
    { label: 'Diagnostic', icon: Zap, desc: 'Full System Scan', color: 'emerald' },
    { label: 'Engine', icon: Settings, desc: 'Major & Minor Repairs', color: 'blue' },
    { label: 'Electrical', icon: AlertCircle, desc: 'Wiring & ECU Issues', color: 'orange' },
    { label: 'Performance', icon: Tool, desc: 'Custom Tuning', color: 'purple' }
  ];

  const handleBack = () => {
    if (view === 'home') navigate('/');
    else if (view === 'emergency') setView('home');
    else if (view === 'details') setView('emergency');
    else if (view === 'payment') setView('details');
    else if (view === 'success') setView('home');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] pb-10 font-['Outfit'] select-none relative overflow-x-hidden">
      {/* 🔐 Processing Overlay (Real Payment Effect) */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
          >
            <div className="relative mb-8">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 className="w-24 h-24 border-b-2 border-t-2 border-[#004AAD] rounded-full"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <Lock size={32} className="text-[#004AAD] animate-pulse" />
               </div>
            </div>
            
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-[0.3em] mb-2 px-10 text-center">Securing Transaction</h3>
            <p className="text-[9px] font-medium text-slate-400 uppercase tracking-widest animate-pulse">Processing through Stripe Connect...</p>
            
            <div className="mt-12 w-64 h-1 bg-slate-50 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 2.5, ease: "easeInOut" }}
                 className="h-full bg-[#004AAD]"
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Dynamic Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-2xl z-50 flex flex-col shadow-sm border-b border-slate-100">
         <div className="px-5 py-3 flex items-center justify-between">
           <button onClick={handleBack} className="w-10 h-10 rounded-none bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100">
             <ArrowLeft size={18} strokeWidth={2.5} />
           </button>
           <div className="text-center">
             <p className="text-[8px] font-black text-[#004AAD] uppercase tracking-[0.3em] mb-1 italic">CliqGarage</p>
             <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest leading-none">
               {view === 'home' ? 'Repair Centre' : view === 'emergency' ? 'SOS: Emergency' : view === 'details' ? 'Mechanic Profile' : view === 'payment' ? 'Secure Checkout' : 'Status'}
             </h2>
           </div>
           <button onClick={() => setView('home')} className="w-10 h-10 rounded-none flex items-center justify-center text-slate-400">
             <X size={18} />
           </button>
         </div>
      </div>

      <div className="relative z-10 pt-16 px-4">
        <AnimatePresence mode="wait">
          
          {/* 1. HOME VIEW */}
          {view === 'home' && (
            <motion.div key="v-home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
               <div className="bg-[#0A0E17] p-5 rounded-none shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent animate-pulse" />
                  <div className="relative z-10">
                     <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-none bg-red-600 flex items-center justify-center text-white animate-bounce shadow-lg shadow-red-600/30"><Siren size={20} /></div>
                           <div><h3 className="text-sm font-black text-white uppercase tracking-widest leading-none mb-1">Breakdown?</h3><p className="text-[9px] font-bold text-red-500 uppercase tracking-[0.2em]">Emergency Assistance</p></div>
                        </div>
                        <a href="tel:+919876543210" className="text-[10px] font-black text-white bg-red-600 px-3 py-1.5 rounded-none flex items-center gap-2 tracking-widest">CALL SOS</a>
                     </div>
                     <p className="text-[10px] text-slate-400 font-medium mb-5 leading-relaxed">Stranded on the road? Tap below to find nearby mechanics and get instant help sent to your location.</p>
                     <button onClick={() => setView('emergency')} className="w-full h-12 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-none font-black text-[10px] uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3">FIND NEARBY MECHANICS <ArrowRight size={14} /></button>
                  </div>
               </div>
               <div className="px-1 text-left"><h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Premium Services</h3><div className="h-0.5 w-12 bg-[#004AAD] mt-1" /></div>
               <div className="grid grid-cols-2 gap-2">
                  {repairCategories.map((cat) => (
                     <div key={cat.label} onClick={() => alert(`${cat.label} Flow Coming Soon!`)} className="bg-white p-3 rounded-none border border-slate-100 shadow-sm group hover:border-[#004AAD]/50 transition-all cursor-pointer active:scale-95">
                        <div className={twMerge("w-8 h-8 rounded-none flex items-center justify-center mb-3 transition-colors", cat.color === 'emerald' ? "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600" : cat.color === 'blue' ? "bg-blue-50 text-blue-600 group-hover:bg-blue-600" : cat.color === 'orange' ? "bg-orange-50 text-orange-600 group-hover:bg-orange-600" : "bg-purple-50 text-purple-600 group-hover:bg-purple-600")}>
                           <cat.icon size={16} className="group-hover:text-white" />
                        </div>
                        <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1">{cat.label}</h4>
                        <p className="text-[7px] font-bold text-slate-400 uppercase leading-none tracking-wider">{cat.desc}</p>
                     </div>
                  ))}
               </div>
            </motion.div>
          )}

          {/* 2. EMERGENCY SOS LIST */}
          {view === 'emergency' && (
            <motion.div key="v-sos" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
               <div className="bg-white p-4 rounded-none shadow-xl border border-slate-100 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600 mx-auto mb-3"><MapPin size={24} /></motion.div>
                  <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-1">Locating Nearby Experts</h3>
                  <div className="mt-2 flex items-center justify-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /><span className="text-[7px] font-black text-emerald-600 uppercase tracking-widest">GPS TRACKING ACTIVE</span></div>
               </div>
               <div className="space-y-3">
                  {nearbyMechanics.map((m) => (
                     <div key={m.id} onClick={() => { setSelectedMechanic(m); setView('details'); }} className="bg-white p-4 rounded-none shadow-sm border border-slate-100 flex flex-col gap-4 group active:scale-[0.98] transition-all cursor-pointer">
                        <div className="flex justify-between items-start">
                           <div className="flex gap-3">
                              <div className="w-12 h-12 bg-slate-50 flex items-center justify-center text-[#004AAD] rounded-none border border-slate-100"><Tool size={20} /></div>
                              <div>
                                 <h4 className="text-[11px] font-black text-slate-900 uppercase">{m.name}</h4>
                                 <p className="text-[9px] font-bold text-[#004AAD] mt-0.5">{m.phone}</p>
                                 <div className="flex items-center gap-2 mt-2">
                                    <span className="text-[8px] font-black text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5">{m.distance}</span>
                                    <span className="text-[8px] font-black text-slate-400 uppercase italic">Shop: {m.shopName}</span>
                                 </div>
                              </div>
                           </div>
                           <div className="text-right">
                              <span className="text-[10px] font-black text-[#004AAD]">{m.rating} ★</span>
                              <p className="text-[7px] font-bold text-slate-400 uppercase mt-1.5">{m.arrival}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </motion.div>
          )}

          {/* 3. MECHANIC DETAILS VIEW */}
          {view === 'details' && selectedMechanic && (
            <motion.div key="v-details" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
               <div className="bg-white p-5 rounded-none shadow-2xl border border-slate-100 text-center">
                  <div className="w-20 h-20 bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-[#004AAD] mx-auto mb-3 rounded-none shadow-inner"><Tool size={32} strokeWidth={1.5} /></div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{selectedMechanic.name}</h3>
                  <p className="text-[9px] font-bold text-[#004AAD] uppercase tracking-widest mb-3 italic">{selectedMechanic.specialty} Specialist</p>
                  <div className="flex justify-center gap-5 py-3 border-y border-slate-50">
                     <div className="text-center"><p className="text-[8px] font-bold text-slate-400 uppercase mb-0.5">XP</p><p className="text-[10px] font-black text-slate-900">{selectedMechanic.experience}</p></div>
                     <div className="text-center"><p className="text-[8px] font-bold text-slate-400 uppercase mb-0.5">RATING</p><p className="text-[10px] font-black text-slate-900">{selectedMechanic.rating} ★</p></div>
                     <div className="text-center"><p className="text-[8px] font-bold text-slate-400 uppercase mb-0.5">REVIEWS</p><p className="text-[10px] font-black text-slate-900">{selectedMechanic.reviews}</p></div>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed px-2 mt-4">"{selectedMechanic.bio}"</p>
                  <div className="mt-6 grid grid-cols-2 gap-2">
                     <a href={`tel:${selectedMechanic.phone}`} className="h-10 bg-slate-900 text-white flex items-center justify-center gap-2 text-[8px] font-black uppercase rounded-none tracking-widest"><Phone size={12} /> CALL</a>
                     <button onClick={() => setView('payment')} className="h-10 bg-[#004AAD] text-white flex items-center justify-center gap-2 text-[8px] font-black uppercase rounded-none tracking-widest shadow-lg shadow-blue-500/20">BOOK NOW <ArrowRight size={12} /></button>
                  </div>
               </div>
            </motion.div>
          )}

          {/* 4. SECURE PAYMENT VIEW */}
          {view === 'payment' && selectedMechanic && (
            <motion.div key="v-pay" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
               <div className="bg-white p-4 rounded-none shadow-2xl border border-slate-100">
                  <h3 className="text-[10px] font-black text-slate-900 uppercase mb-4 tracking-widest">Order Summary</h3>
                  <div className="space-y-3">
                     <div className="flex justify-between items-center"><span className="text-[9px] font-bold text-slate-500 uppercase">Visiting Charge</span><span className="text-xs font-black">₹299</span></div>
                     <div className="flex justify-between items-center"><span className="text-[9px] font-bold text-slate-500 uppercase">Labour (Estimated)</span><span className="text-[10px] font-black italic text-slate-400">TBD at site</span></div>
                     <div className="flex justify-between items-center pt-3 border-t border-slate-100"><span className="text-[10px] font-black uppercase tracking-widest">Total Payable</span><span className="text-lg font-black text-[#004AAD]">₹299</span></div>
                  </div>
               </div>

               <div className="space-y-2">
                  <p className="px-1 text-[8px] font-black text-slate-400 uppercase tracking-widest">Payment Method</p>
                  <button onClick={() => setPaymentMethod('online')} className={twMerge("w-full h-12 bg-white border-2 rounded-none flex items-center justify-between px-6 transition-all", paymentMethod === 'online' ? "border-[#004AAD] bg-blue-50/50 shadow-lg" : "border-slate-100")}>
                     <div className="flex items-center gap-3 text-[#004AAD]"><CreditCard size={16} /><span className="text-[9px] font-black uppercase tracking-widest">Pay Online Now</span></div>
                     {paymentMethod === 'online' && <CheckCircle2 size={16} className="text-[#004AAD]" />}
                  </button>
                  <button onClick={() => setPaymentMethod('cod')} className={twMerge("w-full h-12 bg-white border-2 rounded-none flex items-center justify-between px-6 transition-all", paymentMethod === 'cod' ? "border-emerald-500 bg-emerald-50/50 shadow-lg" : "border-slate-100")}>
                     <div className="flex items-center gap-3 text-emerald-600"><Banknote size={16} /><span className="text-[9px] font-black uppercase tracking-widest">Cash On Delivery</span></div>
                     {paymentMethod === 'cod' && <CheckCircle2 size={16} className="text-emerald-600" />}
                  </button>
               </div>

               <button 
                 onClick={() => {
                   setIsProcessing(true);
                   setTimeout(() => {
                     setIsProcessing(false);
                     setView('success');
                   }, 2500);
                 }} 
                 className="w-full h-11 bg-[#004AAD] text-white rounded-none font-black text-[10px] uppercase tracking-[0.4em] shadow-xl active:scale-95 transition-all mt-2"
               >
                 CONFIRM BOOKING
               </button>
            </motion.div>
          )}

          {/* 5. SUCCESS VIEW */}
          {view === 'success' && (
            <motion.div key="v-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center pt-2 px-4">
               <div className="w-20 h-20 bg-emerald-500 text-white rounded-none flex items-center justify-center shadow-2xl shadow-emerald-500/30 mb-4 animate-bounce shrink-0"><CheckCircle2 size={40} strokeWidth={3} /></div>
               <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-1 italic">On The Way!</h2>
               <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest leading-relaxed mb-6 max-w-[200px]">{selectedMechanic.name} has been dispatched to your location.</p>
               <div className="bg-white p-5 rounded-none border border-slate-100 shadow-xl w-full">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-12 h-12 bg-slate-50 flex items-center justify-center text-[#004AAD]"><Phone size={20} /></div>
                     <div className="text-left"><p className="text-[8px] font-bold text-slate-400 uppercase">Emergency Contact</p><p className="text-sm font-black text-slate-900">{selectedMechanic.phone}</p></div>
                  </div>
                  <button onClick={() => navigate('/')} className="w-full h-12 bg-slate-900 text-white rounded-none text-[10px] font-black uppercase tracking-widest">Back to Dashboard</button>
               </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default Repairs;
