import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Package, Truck, 
  MapPin, CheckCircle2, Clock, 
  RotateCcw, ShieldCheck, Phone,
  AlertTriangle, X, ArrowRight, Loader2,
  Navigation, Info, Ban
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('none'); // 'return' or 'cancel'
  const [requestStatus, setRequestStatus] = useState('none');

  const steps = [
    { title: 'Secured', desc: 'Vault Authorized', time: '10:30 AM', status: 'completed' },
    { title: 'Assembled', desc: 'Sector-18 Hub', time: '12:45 PM', status: 'completed' },
    { title: 'En Route', desc: 'Live Logistics', time: '02:00 PM', status: 'current' },
    { title: 'Arrival', desc: 'Direct Delivery', time: '--:--', status: 'pending' },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20 font-['Outfit'] relative overflow-x-hidden">
      {/* 🚀 Ultra-Compact Identity Header */}
      <div className="bg-[#001F3D] pt-3 pb-4 px-6 rounded-b shadow-xl relative z-10 border-b border-[#D4A017]/30">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/order-history')} className="w-7 h-7 bg-white/10 rounded border border-white/10 flex items-center justify-center text-white backdrop-blur-md active:scale-95 transition-all"><ChevronLeft size={14} /></button>
          <div className="text-center">
            <h1 className="text-[10px] font-black text-white uppercase tracking-[0.2em] leading-none mb-1">Transit Control</h1>
            <div className="flex items-center justify-center gap-1">
              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
              <p className="text-[#D4A017] text-[5px] font-black uppercase tracking-[0.3em]">{id || 'CLQ-9901'}</p>
            </div>
          </div>
          <button className="w-7 h-7 bg-white/10 rounded flex items-center justify-center text-[#D4A017] border border-white/5"><Info size={14} /></button>
        </div>
      </div>

      <div className="relative z-20 flex flex-col gap-2 mt-2">
        {/* 🗺️ Full-Width Edge-to-Edge Map Terminal */}
        <div className="bg-slate-900 h-64 w-full relative overflow-hidden border-y border-white/10 shadow-2xl">
           <div className="absolute inset-0 grayscale contrast-125 brightness-50 z-0">
             <iframe 
               width="100%" 
               height="100%" 
               frameBorder="0" 
               scrolling="no" 
               marginHeight="0" 
               marginWidth="0" 
               src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Mumbai,India+(Logistics%20Center)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
               style={{ filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
               className="pointer-events-none"
             ></iframe>
           </div>
           <div className="absolute inset-0 bg-gradient-to-t from-[#001F3D] via-transparent to-[#001F3D]/30 z-10" />
           
           <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-20">
              <motion.path 
                initial={{ pathLength: 0 }} 
                animate={{ pathLength: 1 }} 
                transition={{ duration: 4, repeat: Infinity }}
                d="M 50,40 Q 150,80 250,120" 
                stroke="#D4A017" 
                strokeWidth="1.5" 
                fill="none" 
                strokeDasharray="4,4" 
              />
           </svg>

           <motion.div animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 2 }} 
             className="absolute top-[35%] left-[15%] w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-lg" 
           />
           
           <motion.div 
             animate={{ x: [0, 140], y: [0, 70] }} 
             transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
             className="absolute top-[35%] left-[15%] z-20"
           >
              <div className="bg-[#D4A017] p-1 rounded-md border border-white shadow-xl flex items-center gap-1.5">
                 <Truck size={10} className="text-[#001F3D]" />
                 <span className="text-[5px] font-black text-[#001F3D] uppercase whitespace-nowrap tracking-tighter">In Transit</span>
              </div>
           </motion.div>

           <div className="absolute top-[65%] left-[75%] w-3 h-3 bg-[#001F3D] rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <MapPin size={6} className="text-white" />
           </div>

           <div className="absolute top-3 right-4 bg-white/10 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
              <p className="text-[6px] font-black text-white uppercase tracking-widest whitespace-nowrap">ETA: 14M</p>
           </div>
        </div>

        <div className="px-5 space-y-2">
          {/* 🛣️ Compact Logistics Stepper */}
          <div className="bg-white p-4 rounded-xl border border-slate-50 shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4A017]/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none" />
             <div className="space-y-4 relative">
                <div className="absolute left-[9px] top-1 bottom-1 w-[1px] bg-slate-100" />
                {steps.map((step, i) => (
                   <div key={i} className="flex gap-3 relative group items-start">
                      <div className={twMerge(
                         "w-5 h-5 rounded flex items-center justify-center relative z-10 transition-all duration-700 shadow-sm",
                         step.status === 'completed' ? "bg-emerald-500 text-white" : 
                         step.status === 'current' ? "bg-[#D4A017] text-[#001F3D] scale-105 shadow-md ring-1 ring-[#D4A017]/20" : 
                         "bg-slate-50 text-slate-100 border border-slate-100"
                      )}>
                         {step.status === 'completed' ? <CheckCircle2 size={10} strokeWidth={3} /> : (step.status === 'current' ? <Navigation size={10} className="animate-pulse" /> : <Clock size={8} />)}
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-start">
                            <h4 className={twMerge("text-[8px] font-black uppercase tracking-widest leading-none", step.status === 'pending' ? "text-slate-300" : "text-[#001F3D]")}>{step.title}</h4>
                            {step.time !== '--:--' && <span className="text-[6px] font-black text-slate-200 uppercase tracking-tighter shrink-0 ml-2">{step.time}</span>}
                         </div>
                         <p className="text-[6px] font-bold text-slate-300 uppercase tracking-tighter mt-1">{step.desc}</p>
                         {step.status === 'current' && (
                           <div className="mt-1.5 flex items-center gap-1.5 opacity-80">
                             <span className="text-[5px] font-black text-[#D4A017] uppercase tracking-[0.2em] italic animate-pulse">Live</span>
                             <div className="flex gap-0.5">
                               <div className="w-0.5 h-1.5 bg-[#D4A017] rounded-full animate-bounce delay-100" />
                               <div className="w-0.5 h-1.5 bg-[#D4A017] rounded-full animate-bounce delay-200" />
                             </div>
                           </div>
                         )}
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* 🛂 Ultra-Compact Hub */}
          <div className="bg-white p-4 rounded-xl border border-slate-50 shadow-lg">
             <div className="flex items-center justify-between mb-3">
                <div>
                   <h4 className="text-[8px] font-black text-[#001F3D] uppercase tracking-widest leading-none mb-1">Support Portal</h4>
                   <p className="text-[6px] font-bold text-slate-300 uppercase italic leading-none">Resolution Access Active</p>
                </div>
                <ShieldCheck size={14} className="text-slate-100" />
             </div>
             
             <div className="flex gap-2">
                <button onClick={() => { setActionType('return'); setShowActionModal(true); }} className="flex-1 h-8 bg-slate-50/50 rounded-lg flex items-center justify-center gap-2 text-[6px] font-black uppercase tracking-widest text-slate-400 active:scale-95 transition-all">
                   <RotateCcw size={8} /> Return
                </button>
                <button onClick={() => { setActionType('cancel'); setShowActionModal(true); }} className="flex-1 h-8 bg-slate-50/50 rounded-lg flex items-center justify-center gap-2 text-[6px] font-black uppercase tracking-widest text-rose-300 active:scale-95 transition-all">
                   <Ban size={8} /> Cancel
                </button>
                <button className="w-8 h-8 bg-[#001F3D] text-[#D4A017] rounded-lg flex items-center justify-center shadow-md active:scale-95 transition-all shrink-0">
                   <Phone size={12} />
                </button>
             </div>
             
             {requestStatus === 'pending' && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-2.5 bg-amber-50/50 border border-amber-100/30 rounded-lg">
                   <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle size={10} className="text-amber-500" />
                      <p className="text-[7px] font-black text-amber-700 uppercase leading-none">Pending Audit</p>
                   </div>
                   <div className="flex gap-4">
                      {['Init', 'Audit', 'S-Off'].map((l, i) => (
                        <div key={i} className="flex items-center gap-1.5 opacity-80">
                          <div className={twMerge("w-1 h-1 rounded-full", i === 0 ? "bg-emerald-400" : i === 1 ? "bg-[#D4A017] animate-pulse" : "bg-slate-200")} />
                          <span className={twMerge("text-[5px] font-black uppercase tracking-widest", i === 2 ? "text-slate-200" : "text-[#001F3D]")}>{l}</span>
                        </div>
                      ))}
                   </div>
                </motion.div>
             )}
          </div>
        </div>
      </div>

      {/* ⚠️ Decision Hub Modal */}
      <AnimatePresence>
        {showActionModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] bg-[#001F3D]/95 backdrop-blur-md flex items-end p-4">
             <motion.div initial={{ y: 200 }} animate={{ y: 0 }} exit={{ y: 200 }} className="w-full bg-white rounded-t-2xl p-6 shadow-2xl relative">
                <div className="flex justify-between items-center mb-6">
                   <div>
                     <h3 className="text-sm font-black text-[#001F3D] uppercase tracking-tighter mb-1">{actionType === 'return' ? 'Return Protocol' : 'Cancellation Request'}</h3>
                     <p className="text-[7px] font-bold text-slate-300 uppercase tracking-widest italic leading-none">Subject to Boutique Compliance</p>
                   </div>
                   <button onClick={() => setShowActionModal(false)} className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 transition-colors"><X size={16} /></button>
                </div>
                
                <div className="grid gap-2 mb-6">
                   {(actionType === 'return' ? ['Quality Deviation', 'Compatibility Issue', 'Other Detail'] : ['Selection Reversal', 'Alternative Asset Found', 'Logistics Constraint']).map(reason => (
                      <button key={reason} className="w-full h-11 bg-slate-50/50 rounded-lg text-[8px] font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between px-4 border border-transparent hover:border-[#D4A017] transition-all">
                         {reason} <ArrowRight size={12} />
                      </button>
                   ))}
                </div>
                
                <button onClick={() => { setRequestStatus('pending'); setShowActionModal(false); }}
                  className="w-full h-12 bg-[#001F3D] text-[#D4A017] rounded-lg font-black text-[9px] uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all"
                > Confirm Protocol Submission </button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderTracking;
