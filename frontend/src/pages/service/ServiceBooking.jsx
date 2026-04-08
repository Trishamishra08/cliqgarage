import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, MapPin, ShieldCheck, CheckCircle2, ChevronRight, Calendar, Clock, Plus, CreditCard, Shield } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const ServiceBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Service, 2: Slot, 3: Payment, 4: Confirm
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const mechanic = {
    id: 1,
    name: "Elite Auto Care",
    type: "Premium Specialist",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2672&auto=format&fit=crop",
    services: [
        { id: 101, name: "Full Service", price: 2999 },
        { id: 102, name: "Oil Change", price: 899 },
        { id: 103, name: "Brake Flush", price: 499 }
    ]
  };

  const slots = [
    "09:00 AM", "10:30 AM", "12:00 PM", "02:30 PM", "04:00 PM"
  ];

  const toggleService = (s) => {
    if (selectedServices.find(item => item.id === s.id)) {
      setSelectedServices(selectedServices.filter(item => item.id !== s.id));
    } else {
      setSelectedServices([...selectedServices, s]);
    }
  };

  const totalAmount = selectedServices.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-32">
       {/* Header */}
       <div className="px-6 pt-12 pb-6 bg-white border-b border-slate-50 flex items-center justify-between sticky top-0 z-40">
          <button 
             onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
             className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-blue-950 active:scale-95 transition-all outline-none"
          >
             <ChevronLeft size={20} />
          </button>
          <div className="flex flex-col items-center">
             <span className="text-[9px] font-black tracking-widest text-blue-600 uppercase">Step {step} of 4</span>
             <h2 className="text-[11px] font-black text-blue-950 uppercase tracking-[0.2em]">Service Booking</h2>
          </div>
          <div className="w-10" />
       </div>

       <div className="px-6 py-8">
          <AnimatePresence mode="wait">
             {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-8"
                >
                   {/* Mechanic Info Card */}
                   <div className="bg-slate-50 p-6 rounded-[2.5rem] flex flex-col gap-6">
                      <div className="flex gap-4 items-center">
                         <img src={mechanic.image} className="w-20 h-20 rounded-2xl object-cover" alt="Mechanic" />
                         <div className="flex flex-col">
                            <h3 className="text-xl font-black text-blue-950 uppercase tracking-tight leading-none">{mechanic.name}</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 mb-2">{mechanic.type}</p>
                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-50 rounded-lg w-fit">
                               <Star size={12} className="text-amber-500 fill-amber-500" />
                               <span className="text-[10px] font-black text-amber-800">{mechanic.rating}</span>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Service Selection */}
                   <div className="flex flex-col gap-4">
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-2">Choose Services</h3>
                      {mechanic.services.map((s, i) => {
                        const isSelected = selectedServices.find(item => item.id === s.id);
                        return (
                          <div 
                            key={i} 
                            onClick={() => toggleService(s)}
                            className={twMerge(
                              "p-6 rounded-3xl border transition-all cursor-pointer flex items-center justify-between group",
                              isSelected ? "bg-blue-950 border-blue-950 text-white shadow-xl shadow-blue-900/20" : "bg-white border-slate-100 text-blue-950"
                            )}
                          >
                             <div className="flex flex-col text-left">
                                <h4 className={twMerge("text-sm font-black uppercase tracking-tight", isSelected ? "text-white" : "text-blue-950")}>{s.name}</h4>
                                <p className={twMerge("text-xs font-bold", isSelected ? "text-blue-300" : "text-blue-600")}>₹{s.price}</p>
                             </div>
                             <div className={twMerge(
                               "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
                               isSelected ? "bg-white border-white text-blue-950" : "border-slate-100 text-slate-300"
                             )}>
                                <Plus size={16} strokeWidth={3} />
                             </div>
                          </div>
                        );
                      })}
                   </div>

                   <button 
                      disabled={selectedServices.length === 0}
                      onClick={() => setStep(2)}
                      className="w-full h-18 bg-blue-950 text-white rounded-2xl shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2 text-[12px] font-black uppercase tracking-widest disabled:opacity-50"
                   >
                     Select Time Slot <ChevronRight size={18} />
                   </button>
                </motion.div>
             )}

             {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-8"
                >
                   <div className="bg-slate-50 p-8 rounded-[2.5rem]">
                      <h3 className="text-lg font-black text-blue-950 uppercase tracking-tighter mb-6 flex items-center gap-3">
                         <Calendar className="text-blue-600" size={24} /> Available Slots
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                         {slots.map((s, i) => (
                            <button
                               key={i}
                               onClick={() => setSelectedSlot(s)}
                               className={twMerge(
                                 "h-14 rounded-2xl flex items-center justify-center text-[11px] font-black uppercase tracking-widest transition-all",
                                 selectedSlot === s ? "bg-blue-950 text-white shadow-xl scale-105" : "bg-white text-slate-400 border border-slate-100"
                               )}
                            >
                               {s}
                            </button>
                         ))}
                      </div>
                   </div>

                   <button 
                      disabled={!selectedSlot}
                      onClick={() => setStep(3)}
                      className="w-full h-18 bg-blue-950 text-white rounded-2xl shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2 text-[12px] font-black uppercase tracking-widest"
                   >
                     Continue To Payment <ChevronRight size={18} />
                   </button>
                </motion.div>
             )}

             {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-8"
                >
                   <div className="bg-slate-50 p-8 rounded-[2.5rem] flex flex-col gap-6">
                      <h3 className="text-lg font-black text-blue-950 uppercase tracking-tighter flex items-center gap-3">
                         <CreditCard className="text-blue-600" size={24} /> Payment Summary
                      </h3>
                      
                      <div className="space-y-3">
                         {selectedServices.map((s, i) => (
                           <div key={i} className="flex justify-between items-center text-sm font-bold text-slate-600">
                              <span>{s.name}</span>
                              <span>₹{s.price}</span>
                           </div>
                         ))}
                         <div className="h-px bg-slate-200 my-2" />
                         <div className="flex justify-between items-center text-lg font-black text-blue-950 uppercase">
                            <span>Total</span>
                            <span>₹{totalAmount}</span>
                         </div>
                      </div>

                      <div className="bg-white p-4 rounded-2xl border border-slate-200">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Vehicle Selected</p>
                         <p className="text-sm font-black text-blue-950 uppercase">Royal Enfield Interceptor 650</p>
                      </div>
                   </div>

                   <button 
                      onClick={() => setStep(4)}
                      className="w-full h-18 bg-blue-950 text-white rounded-2xl shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2 text-[12px] font-black uppercase tracking-widest"
                   >
                     Pay ₹{totalAmount} <ChevronRight size={18} />
                   </button>
                </motion.div>
             )}

             {step === 4 && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col gap-8"
                >
                   <div className="bg-white p-8 rounded-[3rem] shadow-2xl flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 border-4 border-white shadow-lg">
                         <CheckCircle2 size={48} strokeWidth={2.5} />
                      </div>
                      <h2 className="text-2xl font-black text-blue-950 uppercase tracking-tighter mb-2 leading-none">Booking Confirmed</h2>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Booking ID: #CG9821PR</p>
                      
                      <div className="w-full h-px bg-slate-50 my-8" />
                      
                      <div className="w-full flex flex-col gap-5">
                         <div className="flex items-center justify-between text-left">
                            <div className="flex flex-col">
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Slot</p>
                               <p className="text-[11px] font-black text-blue-950 uppercase tracking-tight">{selectedSlot}</p>
                            </div>
                            <div className="flex flex-col text-right">
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Amount Paid</p>
                               <p className="text-[11px] font-black text-blue-950 uppercase tracking-tight">₹{totalAmount}</p>
                            </div>
                         </div>
                      </div>

                      <div className="mt-12 w-full flex flex-col gap-3">
                         <button 
                            onClick={() => navigate('/bookings')}
                            className="w-full h-16 bg-blue-950 text-white rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center"
                         >
                            Track Status
                         </button>
                         <button 
                           onClick={() => navigate('/')}
                           className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-950 transition-all p-4"
                         >
                            Back to Home
                         </button>
                      </div>
                   </div>
                </motion.div>
             )}
          </AnimatePresence>
       </div>
    </div>
  );
};

export default ServiceBooking;
