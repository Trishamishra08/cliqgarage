import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Bike, Car, Calendar, 
  MapPin, ShieldCheck, Upload, CreditCard, 
  CheckCircle2, ArrowRight, Gauge, Clock,
  Search, ChevronRight, Info, Shield, Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const RentalBooking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [vehicleType, setVehicleType] = useState('bike'); // Default to bike
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [location, setLocation] = useState('Hub-04 (Main Outlet)');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [rentalDays, setRentalDays] = useState(1);
  const [kycDocs, setKycDocs] = useState({ aadhar: null, dl: null });
  const [selectedKM, setSelectedKM] = useState('Standard');

  // Reliable boutique images
  const vehicles = {
    bike: [
      { 
        id: 1, 
        name: "Kawasaki Ninja 400", 
        category: "Sport",
        price: 1499, 
        stats: "45 BHP • 400cc", 
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop",
        desc: "Precision engineering meets raw street power. The ultimate urban sport experience."
      },
      { 
        id: 2, 
        name: "RE Himalayan 450", 
        category: "Adventure",
        price: 999, 
        stats: "40 BHP • 450cc", 
        image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=800&auto=format&fit=crop",
        desc: "Built for all roads, and no roads. Navigate the toughest terrain with ease."
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
        desc: "Rugged dominance in a premium wrapper. Go anywhere, do anything in style."
      },
      { 
        id: 4, 
        name: "BMW M3 Sedan", 
        category: "Sedan",
        price: 5499, 
        stats: "Auto • Petrol", 
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop",
        desc: "The sheer driving machine. Experience track-focused luxury for the streets."
      }
    ]
  };

  const kmOptions = [
    { label: 'Standard', km: 150, extra: 0, desc: 'City rides' },
    { label: 'Extended', km: 300, extra: 500, desc: 'Long trips' },
    { label: 'Unlimited', km: '∞', extra: 1000, desc: 'Road trips' }
  ];

  const calculateTotal = () => {
    if (!selectedVehicle) return 0;
    const extraKMPrice = kmOptions.find(o => o.label === selectedKM)?.extra || 0;
    return (selectedVehicle.price + extraKMPrice) * rentalDays;
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Outfit'] select-none overflow-hidden relative">
      {/* Fixed Premium Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-2xl z-50 flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b border-slate-100">
         <div className="px-5 py-3 flex items-center justify-between">
           <button 
             onClick={step === 1 ? () => navigate(-1) : prevStep}
             className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
           >
             <ChevronLeft size={18} strokeWidth={2.5} />
           </button>
           <div className="text-center">
             <p className="text-[8px] font-black text-[#004AAD] uppercase tracking-[0.3em] mb-1">Step {step} of 6</p>
             <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest leading-none">
               {step === 1 ? 'Choose Tier' : step === 2 ? 'Select Vehicle' : step === 3 ? 'Configure' : step === 4 ? 'Verification' : step === 5 ? 'Checkout' : 'Done'}
             </h2>
           </div>
           <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all">
             <Info size={18} />
           </button>
         </div>
         {/* Integrated Progress Line */}
         <div className="w-full h-1 bg-slate-50">
           <motion.div initial={{ width: 0 }} animate={{ width: `${(step/6) * 100}%` }} className="h-full bg-gradient-to-r from-[#004AAD] to-[#0066FF] transition-all duration-700" />
         </div>
      </div>

      <div className="relative z-10 pt-14 pb-32 px-4 h-screen overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          
          {/* Step 1: Selection - FIXED IMAGES & HIGHLIGHTING */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 pt-4">
              <div className="text-center py-2">
                 <span className="text-[#004AAD] font-black text-[8px] uppercase tracking-[0.5em] mb-1 block underline underline-offset-4 decoration-[#14b8a6]">Choose Tier</span>
                 <h2 className="text-2xl font-black text-slate-900 uppercase leading-none tracking-tight">The Collection</h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                 {[
                   { type: 'bike', label: 'Motorcycles', img: vehicles.bike[0].image, desc: 'Sport / Gear / Adventure' },
                   { type: 'car', label: 'Luxury Cars', img: vehicles.car[1].image, desc: 'Sedans / SUVs / Electric' }
                 ].map((t) => (
                   <motion.button
                     key={t.type}
                     whileTap={{ scale: 0.98 }}
                     onClick={() => { setVehicleType(t.type); nextStep(); }}
                     className={twMerge(
                        "group relative h-40 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 border-2",
                        vehicleType === t.type ? "border-[#004AAD] scale-[1.02]" : "border-transparent"
                     )}
                   >
                     <img src={t.img} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
                     <div className={twMerge(
                        "absolute inset-0 transition-all duration-500 p-6 flex flex-col justify-end",
                        vehicleType === t.type ? "bg-gradient-to-t from-[#004AAD]/90 via-[#004AAD]/20 to-transparent" : "bg-gradient-to-t from-black/80 via-transparent to-transparent"
                     )}>
                        <h3 className="text-2xl font-black text-white uppercase tracking-widest">{t.label}</h3>
                        <p className="text-white/60 text-[8px] font-black uppercase tracking-widest mt-1">{t.desc}</p>
                        {vehicleType === t.type && (
                           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                              <CheckCircle2 size={14} className="text-[#004AAD]" />
                           </motion.div>
                        )}
                     </div>
                   </motion.button>
                 ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: List - Proper filtering */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 pt-2">
               <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-[#004AAD]/5 flex items-center justify-center text-[#004AAD]"><MapPin size={18} /></div>
                     <div><p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">Pickup Location</p><p className="text-xs font-black text-slate-900 uppercase">{location}</p></div>
                  </div>
                  <button className="text-[9px] font-black text-[#004AAD] uppercase tracking-widest px-3 py-1.5 bg-[#004AAD]/5 rounded-lg active:scale-95 transition-all">Change</button>
               </div>

               {/* Horizontal Category Filters */}
               <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                  {['All', ...(vehicleType === 'bike' ? ['Sport', 'Adventure', 'Cruiser'] : ['Sedan', 'SUV', 'Luxury'])].map(cat => (
                     <button 
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={twMerge(
                           "whitespace-nowrap px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                           selectedCategory === cat 
                              ? "bg-[#004AAD] text-white shadow-lg shadow-[#004AAD]/30" 
                              : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
                        )}
                     >
                        {cat}
                     </button>
                  ))}
               </div>

               <div className="grid gap-3">
                  {vehicles[vehicleType].filter(v => selectedCategory === 'All' || v.category === selectedCategory).map((v) => (
                    <motion.div key={v.id} whileTap={{ scale: 0.98 }} onClick={() => { setSelectedVehicle(v); nextStep(); }} className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-slate-100 flex p-2 gap-3 items-center group hover:border-[#004AAD]/30 transition-all cursor-pointer">
                       <div className="w-28 h-24 relative rounded-xl overflow-hidden bg-slate-50">
                          <img src={v.image} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                       </div>
                       <div className="flex-1 py-1 pr-2 flex flex-col justify-center">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-xs font-black text-slate-900 uppercase leading-tight">{v.name}</h4>
                            <span className="text-[8px] px-1.5 py-0.5 bg-slate-100 text-slate-500 font-bold uppercase rounded">{v.category}</span>
                          </div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase mb-3">{v.stats}</p>
                          <div className="flex justify-between items-end mt-auto">
                            <div className="flex flex-col">
                              <span className="text-[8px] font-bold text-slate-400 uppercase mb-0.5">Rent</span>
                              <span className="text-base font-black text-[#004AAD] leading-none">₹{v.price}<span className="text-[8px] opacity-50 ml-1">/ Day</span></span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#004AAD] group-hover:text-white transition-colors">
                              <ArrowRight size={14} className={twMerge("text-slate-400 group-hover:text-white")} />
                            </div>
                          </div>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </motion.div>
          )}

          {/* Step 3: Configure */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3 pt-1">
               <div className="relative h-44 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  <img src={selectedVehicle.image} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-5 flex flex-col justify-end">
                     <h3 className="text-xl font-black text-white uppercase tracking-widest leading-none mb-2">{selectedVehicle.name}</h3>
                     <div className="flex items-center gap-2"><span className="px-2 py-0.5 bg-[#14b8a6] text-white text-[7px] font-black uppercase rounded">{selectedVehicle.stats}</span></div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xl border border-white/20">
                     <span className="text-[10px] font-black text-[#004AAD]">₹{selectedVehicle.price}<span className="opacity-40 text-[7px] ml-0.5">/Day</span></span>
                  </div>
               </div>
               <div className="bg-white p-5 rounded-3xl shadow-xl border border-slate-50 space-y-5">
                  <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                     <div className="flex items-center gap-3"><Calendar size={18} className="text-[#14b8a6]" /><div><p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Rental Duration</p><p className="text-[11px] font-black text-slate-900 uppercase">{rentalDays} Day{rentalDays > 1 ? 's' : ''}</p></div></div>
                     <div className="flex items-center gap-3"><button onClick={() => setRentalDays(Math.max(1, rentalDays - 1))} className="w-8 h-8 rounded bg-white border border-slate-200 shadow-sm">-</button><button onClick={() => setRentalDays(rentalDays + 1)} className="w-8 h-8 rounded bg-[#004AAD] text-white shadow-lg">+</button></div>
                  </div>
                  <div className="space-y-3">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Mileage Pack</p>
                     <div className="grid grid-cols-3 gap-2">
                        {kmOptions.map((opt) => (
                           <button key={opt.label} onClick={() => setSelectedKM(opt.label)} className={twMerge("p-2 rounded-2xl border-2 flex flex-col items-center transition-all", selectedKM === opt.label ? "bg-[#004AAD]/5 border-[#004AAD] text-[#004AAD]" : "bg-slate-50 border-transparent text-slate-400")}>
                              <span className="text-[8px] font-black uppercase">{opt.label}</span>
                              <span className="text-sm font-black my-1">{opt.km}</span>
                              <span className="text-[6px] font-bold uppercase opacity-50">{opt.desc}</span>
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {/* Step 4-6 (Condensed Boilerplate for Flow) */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 pt-2">
               <div className="text-center py-4"><h3 className="text-xl font-black text-slate-900 uppercase">KYC Center</h3><p className="text-[9px] font-bold text-slate-400 mt-2">Upload documentation to proceed</p></div>
               <div className="grid grid-cols-1 gap-4">
                  {['aadhar', 'dl'].map(doc => (
                    <label key={doc} className={twMerge("cursor-pointer p-8 rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center gap-3", kycDocs[doc] ? "bg-emerald-50 border-emerald-500" : "bg-white border-slate-100")}>
                       <input type="file" className="hidden" onChange={(e) => setKycDocs({...kycDocs, [doc]: e.target.files[0]})} />
                       {kycDocs[doc] ? <CheckCircle2 size={32} className="text-emerald-600" /> : <Upload size={24} className="text-[#004AAD]" />}
                       <span className="text-xs font-black text-slate-900 uppercase">{doc} check</span>
                    </label>
                  ))}
               </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 pt-2">
                <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl border border-slate-100">
                   <h3 className="text-lg font-black text-slate-900 uppercase mb-6">Payment Info</h3>
                   <div className="space-y-4">
                      <div className="flex justify-between items-center"><span className="text-xs font-bold text-slate-500 uppercase">Subtotal</span><span className="font-black">₹{selectedVehicle.price * rentalDays}</span></div>
                      <div className="flex justify-between items-center"><span className="text-xs font-bold text-slate-500 uppercase">Tax</span><span className="font-black">₹{Math.round(selectedVehicle.price * rentalDays * 0.18)}</span></div>
                      <div className="flex justify-between items-center pt-4 border-t border-slate-100"><span className="text-sm font-black">Total Payable</span><span className="text-2xl font-black text-[#0066FF]">₹{Math.round(selectedVehicle.price * rentalDays * 1.18)}</span></div>
                   </div>
                </div>
                <button className="w-full h-16 bg-white rounded-2xl border border-slate-100 shadow-xl flex items-center justify-between px-6">
                   <div className="flex items-center gap-4"><CreditCard size={20} className="text-blue-600" /><span className="text-xs font-black uppercase text-slate-900">Credit Card / UPI</span></div>
                   <ChevronRight size={18} className="text-slate-300" />
                </button>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div key="s6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center space-y-8 pt-10">
                <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-2xl shadow-emerald-500/30"><CheckCircle2 size={48} strokeWidth={3} /></div>
                <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Done!</h2>
                <div className="w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-50"><button onClick={() => navigate('/')} className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest">Done</button></div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* COMPACT FIX: PERSISTENT BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white/80 backdrop-blur-2xl border-t border-slate-100 z-50 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
         {step < 6 && (
            <div className="max-w-md mx-auto flex items-center gap-4">
               {step >= 3 && (
                 <div className="flex flex-col leading-none border-r border-slate-100 pr-4">
                    <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Payment</span>
                    <span className="text-lg font-black text-[#004AAD]">₹{calculateTotal()}</span>
                 </div>
               )}
               <button 
                  onClick={nextStep}
                  disabled={(step === 4 && (!kycDocs.aadhar || !kycDocs.dl))}
                  className={twMerge(
                    "flex-1 h-14 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all outline-none",
                    (step === 4 && (!kycDocs.aadhar || !kycDocs.dl)) ? "bg-slate-100 text-slate-300 cursor-not-allowed" : "bg-gradient-to-r from-[#004AAD] to-[#0066FF] text-white shadow-blue-500/20"
                  )}
               >
                  {step === 1 ? 'Start Browsing' : step === 2 ? 'Select Steed' : step === 3 ? 'Verify Details' : step === 4 ? 'Secure Pay' : 'Confirm'}
                  <ArrowRight size={16} />
               </button>
            </div>
         )}
      </div>

      {/* Old Progress Line removed as it's integrated above */}
    </div>
  );
};

export default RentalBooking;
