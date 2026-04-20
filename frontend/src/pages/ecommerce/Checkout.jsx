import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, CreditCard, ShieldCheck, MapPin, 
  Truck, ArrowRight, Wallet, Smartphone,
  CheckCircle2, Lock, Receipt, Globe
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const Checkout = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('online');

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      if (selectedMethod === 'cod') {
         setTimeout(() => navigate('/ecommerce'), 2500); 
      } else {
         setTimeout(() => navigate('/order-tracking/CLQ-9901'), 2500);
      }
    }, selectedMethod === 'cod' ? 1200 : 3500);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-10 font-['Outfit'] relative overflow-x-hidden">
      <AnimatePresence>
        {isProcessing && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/95 backdrop-blur-xl">
              <div className="relative mb-8 flex items-center justify-center">
                 <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="w-20 h-20 border-b-2 border-[#D4A017] rounded-full" />
                 <div className="absolute"><Lock size={20} className="text-[#001F3D]" /></div>
              </div>
              <h3 className="text-[10px] font-black text-[#001F3D] uppercase tracking-[0.3em] text-center">
                {selectedMethod === 'cod' ? 'Verifying Request' : 'Authorizing Gateway'}
              </h3>
              <p className="text-[7px] font-bold text-slate-300 uppercase mt-2 italic">PCI-DSS Encrypted Channel</p>
           </motion.div>
        )}

        {success && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-[#D4A017] text-[#001F3D]">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6"><CheckCircle2 size={32} /></motion.div>
              <h2 className="text-[16px] font-black uppercase tracking-widest leading-none mb-2">Order Finalized</h2>
              <p className="text-[8px] font-black uppercase tracking-widest opacity-60">
                {selectedMethod === 'cod' ? 'Redirecting to Unit Hub' : 'Redirecting to Live Tracking'}
              </p>
           </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#001F3D] pt-10 pb-6 px-6 rounded-b-[2rem] shadow-xl relative z-10">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="w-9 h-9 bg-white/10 rounded-xl border border-white/10 flex items-center justify-center text-white"><ChevronLeft size={18} /></button>
          <div className="text-center">
            <h1 className="text-[12px] font-black text-white uppercase tracking-[0.2em] leading-none mb-1">Payment Terminal</h1>
             <p className="text-[#D4A017] text-[6px] font-black uppercase tracking-[0.3em]">Direct Vault Settlement</p>
          </div>
          <div className="w-9" />
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        <div>
           <h3 className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-3 px-1">Arrival Terminal</h3>
           <div className="bg-white p-4 rounded-[1.8rem] border border-slate-50 flex items-start gap-4">
              <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-[#D4A017] shrink-0"><MapPin size={16} /></div>
              <div className="flex-1">
                 <h4 className="text-[10px] font-black text-[#001F3D] uppercase leading-none mb-1">Corporate Hub</h4>
                 <p className="text-[8px] font-bold text-slate-400 uppercase italic">Plot 42, Sector 18, Gurugram, India</p>
              </div>
           </div>
        </div>

        <div>
           <h3 className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-3 px-1">Gateway Entrance</h3>
           <div className="grid gap-2">
              {[
                { id: 'online', name: 'Online Payment', icon: Globe, desc: 'UPI, Wallet, Cards' },
                { id: 'cod', name: 'Cash on Delivery', icon: Truck, desc: 'Pay at Doorstep' }
              ].map((method) => (
                <button key={method.id} onClick={() => setSelectedMethod(method.id)}
                   className={twMerge("p-3.5 rounded-2xl border transition-all flex items-center justify-between", selectedMethod === method.id ? "bg-[#001F3D] border-[#001F3D] shadow-lg" : "bg-white border-slate-50")}
                >
                   <div className="flex items-center gap-3">
                      <div className={twMerge("w-8 h-8 rounded-xl flex items-center justify-center", selectedMethod === method.id ? "bg-[#D4A017] text-[#001F3D]" : "bg-slate-50 text-slate-300")}><method.icon size={16} /></div>
                      <div>
                        <span className={twMerge("text-[9px] font-black uppercase tracking-widest block leading-none", selectedMethod === method.id ? "text-white" : "text-[#001F3D]")}>{method.name}</span>
                        <span className={twMerge("text-[6px] font-bold uppercase tracking-tighter opacity-50 block mt-1", selectedMethod === method.id ? "text-[#D4A017]" : "text-slate-300")}>{method.desc}</span>
                      </div>
                   </div>
                   <div className={twMerge("w-3.5 h-3.5 rounded-full border-2 transition-all", selectedMethod === method.id ? "bg-[#D4A017] border-[#001F3D]" : "border-slate-100")} />
                </button>
              ))}
           </div>
        </div>

        <div className="bg-white p-5 rounded-[2rem] border border-slate-50">
           <div className="space-y-2 mb-4">
              <div className="flex justify-between text-[7px] font-bold text-slate-300 uppercase tracking-widest"><span>Release Amount</span><span className="text-slate-600 font-black">₹5,898.00</span></div>
              <div className="flex justify-between text-[7px] font-bold text-slate-300 uppercase tracking-widest"><span>Logistics Fee</span><span className="text-emerald-500 font-black">PROMO</span></div>
              <div className="h-px bg-slate-50 my-2" />
              <div className="flex justify-between items-center text-[#001F3D]">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">Settlement</span>
                 <span className="text-[18px] font-black tracking-tighter">₹5,898.00</span>
              </div>
           </div>
           <button onClick={handlePay} className="w-full h-11 bg-[#001F3D] text-[#D4A017] rounded-xl font-black text-[9px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 active:scale-95 transition-all">Authorize Release <ArrowRight size={12} /></button>
        </div>

        <div className="flex items-center justify-center gap-2 opacity-30 pt-4">
           <Lock size={10} /><p className="text-[6px] font-black uppercase tracking-[0.3em]">PCI-DSS Compliant Backend</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
