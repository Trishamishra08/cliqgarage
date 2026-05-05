import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bike, Package, MapPin, Clock, 
  CheckCircle2, ArrowRight, ChevronRight, 
  ShieldCheck, Truck, Store, Map as MapIcon,
  Phone, MessageSquare, AlertCircle, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

// Mock Data for Tracking Hub
const trackingData = {
  rentals: [
    {
      id: 'CG-RENT-8821',
      asset: 'RE Himalayan 450',
      status: 'Awaiting Hub Confirmation',
      step: 1,
      hub: 'Indiranagar Premium Hub',
      address: '12th Main, Indiranagar, Bengaluru',
      timestamp: '2 mins ago',
      color: '#001F3D'
    }
  ],
  orders: [
    {
      id: 'CG-ORD-4402',
      asset: 'Carbon Fiber Helm (Pro)',
      status: 'Out for Handover',
      step: 3,
      hub: 'Logistics Hub - Sarjapur',
      address: '5th Sector, HSR Layout, Bengaluru',
      timestamp: '15 mins ago',
      color: '#D4A017'
    }
  ]
};

const UnifiedTracking = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('rentals');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const activeData = trackingData[activeTab];

  // Steps Configuration
  const steps = [
    { label: 'Authorized', desc: 'Order received by system', icon: ShieldCheck },
    { label: 'Hub Sync', desc: 'Store verifying asset availability', icon: Store },
    { label: 'In Transit', desc: 'Asset dispatched to location', icon: Truck },
    { label: 'Handover', desc: 'Ready for client pickup/delivery', icon: CheckCircle2 }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans">
      {/* 🚀 INDUSTRIAL HEADER */}
      <div className="bg-[#001F3D] pt-8 pb-8 px-6 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A017]/10 rounded-full blur-3xl" />
         
         <div className="relative z-20 flex items-center justify-between text-white mb-6">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 active:scale-95 transition-all" onClick={() => navigate(-1)}>
               <ArrowLeft size={20} />
            </div>
            <div className="text-center">
               <h1 className="text-[14px] font-black uppercase tracking-widest italic">Logistics<span className="text-[#D4A017] not-italic ml-1">Tracker</span></h1>
            </div>
            <div className="w-10 h-10 bg-[#D4A017] rounded-xl flex items-center justify-center text-[#001F3D]">
               <MapIcon size={20} />
            </div>
         </div>

         <div className="relative z-10 flex flex-col items-center">
            <p className="text-[7px] font-black text-white/40 uppercase tracking-[0.4em] leading-none">Real-Time Asset Synchronization Active</p>
         </div>

         {/* 🚀 SEGMENTED TAB SELECTOR */}
         <div className="flex bg-white/5 backdrop-blur-md rounded-full p-1 mt-8 border border-white/10 relative z-10">
            {['rentals', 'orders'].map((tab) => (
               <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={twMerge(
                     "flex-1 h-10 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300",
                     activeTab === tab ? "bg-white text-[#001F3D] shadow-lg" : "text-white/40 hover:text-white"
                   )}
               >
                  {tab === 'rentals' ? 'Fleet Assets' : 'Product Orders'}
               </button>
            ))}
         </div>
      </div>

      <div className="px-3 -mt-6 relative z-20 space-y-4">
         <AnimatePresence mode="wait">
            <motion.div 
               key={activeTab}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="space-y-4"
            >
               {activeData.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
                     {/* Asset ID Header */}
                     <div className="bg-slate-50 px-4 py-2 flex justify-between items-center border-b border-slate-100">
                        <div className="flex items-center gap-2">
                           <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">ID</span>
                           <span className="text-[10px] font-black text-[#001F3D] uppercase tracking-tighter leading-none">{item.id}</span>
                        </div>
                        <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">{item.timestamp}</span>
                     </div>

                     {/* Main Content */}
                     <div className="p-4 flex gap-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 relative group overflow-hidden">
                           {activeTab === 'rentals' ? <Bike size={32} className="text-[#001F3D]/20" /> : <Package size={32} className="text-[#D4A017]/20" />}
                           <div className="absolute inset-0 bg-[#001F3D]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex-1">
                           <h3 className="text-sm font-black text-[#001F3D] uppercase tracking-tight">{item.asset}</h3>
                           <div className="flex items-center gap-1.5 mt-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <p className="text-[9px] font-black text-emerald-600 uppercase tracking-wider">{item.status}</p>
                           </div>
                           <div className="flex items-center gap-1 mt-2 text-slate-400">
                              <MapPin size={10} />
                              <span className="text-[8px] font-bold uppercase tracking-widest">{item.hub}</span>
                           </div>
                        </div>
                        <button onClick={() => setSelectedOrder(selectedOrder === item.id ? null : item.id)} className="self-center w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 active:bg-[#001F3D] active:text-white transition-all">
                           {selectedOrder === item.id ? <ChevronRight size={18} className="rotate-90 transition-transform" /> : <ChevronRight size={18} />}
                        </button>
                     </div>

                     {/* 🚀 EXPANDED TRACKING ENGINE */}
                     {selectedOrder === item.id && (
                        <motion.div 
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           className="border-t border-slate-50 px-4 pt-2 pb-6"
                        >
                           {/* MAP INTERFACE BRIDGE */}
                           <div className="w-full h-32 bg-[#EBF1F7] rounded-xl border border-slate-100 relative overflow-hidden mb-6 mt-2">
                              <iframe
                                 src={`https://maps.google.com/maps?q=${encodeURIComponent(item.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                 width="100%"
                                 height="100%"
                                 style={{ border: 0, filter: 'grayscale(0.5) contrast(1.1) brightness(1.1)' }}
                                 allowFullScreen=""
                                 loading="lazy"
                                 title="Asset Map"
                              ></iframe>
                           </div>

                           {/* LOGISTICS TIMELINE */}
                           <div className="space-y-6 pl-4 relative">
                              <div className="absolute left-[19px] top-2 bottom-6 w-0.5 bg-slate-100 border-l border-dashed border-slate-200" />
                              {steps.map((step, idx) => {
                                 const isPassed = idx < item.step;
                                 const isCurrent = idx === item.step;
                                 return (
                                    <div key={idx} className="flex gap-5 relative group">
                                       <div className={twMerge(
                                          "w-10 h-10 rounded-full flex items-center justify-center transition-all z-10",
                                          isPassed ? "bg-emerald-500 text-white shadow-lg" : 
                                          isCurrent ? "bg-[#001F3D] text-[#D4A017] shadow-xl ring-4 ring-[#001F3D]/10" : 
                                          "bg-slate-50 text-slate-300 border border-slate-100"
                                       )}>
                                          <step.icon size={16} />
                                       </div>
                                       <div className="pt-1.5 flex-1">
                                          <h4 className={twMerge("text-[10px] font-black uppercase tracking-wider", isPassed || isCurrent ? "text-[#001F3D]" : "text-slate-300")}>
                                             {step.label}
                                          </h4>
                                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 opacity-60 leading-tight">
                                             {step.desc}
                                          </p>
                                          {isCurrent && (
                                             <div className="mt-4 p-3 bg-[#F4F7FA] border-l-2 border-[#D4A017] rounded-xl flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                   <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm"><Phone size={14} /></div>
                                                   <div>
                                                      <p className="text-[7px] font-black text-[#001F3D] uppercase">Hub Coordinator</p>
                                                      <p className="text-[8px] font-bold text-slate-400 uppercase">+91 91234 56789</p>
                                                   </div>
                                                </div>
                                                <button className="w-8 h-8 rounded-full bg-[#001F3D] text-[#D4A017] flex items-center justify-center shadow-lg active:scale-95 transition-all">
                                                   <MessageSquare size={14} />
                                                </button>
                                             </div>
                                          )}
                                       </div>
                                    </div>
                                 );
                              })}
                           </div>

                           <button className="w-full h-12 mt-6 bg-[#001F3D] text-[#D4A017] rounded-xl font-black text-[9px] uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all">
                              Download Digital Invoice
                           </button>
                        </motion.div>
                     )}
                  </div>
               ))}
            </motion.div>
         </AnimatePresence>

         {/* 🚀 QUICK TOOLS SECTION */}
         <div className="pt-4 grid grid-cols-2 gap-3">
            <button className="h-16 bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex items-center gap-3 active:scale-95 transition-all">
               <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><AlertCircle size={14} /></div>
               <div className="text-left">
                  <p className="text-[8px] font-black text-[#001F3D] uppercase tracking-tight">Need Help?</p>
                  <p className="text-[7px] font-bold text-slate-400 uppercase">Support Hub</p>
               </div>
            </button>
            <button className="h-16 bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex items-center gap-3 active:scale-95 transition-all">
               <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center"><MapIcon size={14} /></div>
               <div className="text-left">
                  <p className="text-[8px] font-black text-[#001F3D] uppercase tracking-tight">Policies</p>
                  <p className="text-[7px] font-bold text-slate-400 uppercase">Audit Guide</p>
               </div>
            </button>
         </div>
      </div>
    </div>
  );
};

export default UnifiedTracking;
