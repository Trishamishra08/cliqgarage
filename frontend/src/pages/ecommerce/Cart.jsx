import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Trash2, Plus, Minus, 
  ArrowRight, ShieldCheck, ShoppingBag,
  Zap, CreditCard, Receipt
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    {
       id: 1,
       name: "STEALTH-1 PRO",
       subtitle: "Carbon Series",
       price: 4999,
       qty: 1,
       image: "https://images.unsplash.com/photo-1621622340332-9c3f4e1f720f?auto=format&fit=crop&q=80&w=400"
    }
  ]);

  const updateQty = (id, delta) => {
    setItems(items.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };

  const removeItem = (id) => setItems(items.filter(item => item.id !== id));

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const gst = Math.floor(subtotal * 0.18);
  const total = subtotal + gst;

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-80 font-['Outfit'] relative">
      {/* 🚀 Sleek Header */}
      <div className="bg-[#001F3D] pt-10 pb-8 px-6 rounded-b-[2.5rem] shadow-xl relative z-10">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="w-9 h-9 bg-white/10 rounded-xl border border-white/10 flex items-center justify-center text-white"><ChevronLeft size={18} /></button>
          <div className="text-center">
            <h1 className="text-[12px] font-black text-white uppercase tracking-[0.2em] mb-1">Basket Terminal</h1>
            <p className="text-[#D4A017] text-[6px] font-black uppercase tracking-[0.3em] font-['Roboto']">{items.length} Tracked Units</p>
          </div>
          <button className="w-9 h-9 opacity-0"><Trash2 size={16} /></button>
        </div>
      </div>

      {/* 🛒 High-Contrast Cards */}
      <div className="px-5 mt-8 space-y-4">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div key={item.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#FFFAEC] p-3.5 rounded-[2rem] border-2 border-[#D4A017]/10 shadow-[0_4px_20px_rgba(212,160,23,0.05)] flex items-center gap-4 relative"
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white shrink-0 border border-[#D4A017]/20 shadow-sm">
                 <img src={item.image} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0 pr-10">
                <h4 className="text-[10px] font-black text-[#001F3D] uppercase tracking-tight truncate mb-1">{item.name}</h4>
                <div className="flex items-center justify-between">
                   <span className="text-[14px] font-black text-[#001F3D]">₹{item.price.toLocaleString()}</span>
                   <div className="flex items-center gap-3 bg-white px-2 py-1.5 rounded-xl border border-[#D4A017]/10">
                      <button onClick={() => updateQty(item.id, -1)} className="w-4 h-4 flex items-center justify-center text-slate-300"><Minus size={10} strokeWidth={4}/></button>
                      <span className="text-[10px] font-black text-[#001F3D]">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-4 h-4 flex items-center justify-center text-[#D4A017]"><Plus size={10} strokeWidth={4}/></button>
                   </div>
                </div>
              </div>
              <button onClick={() => removeItem(item.id)} className="absolute top-4 right-4 w-8 h-8 bg-white/50 rounded-xl flex items-center justify-center text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={12} /></button>
            </motion.div>
          ))}
        </AnimatePresence>

        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 opacity-30">
            <ShoppingBag size={40} className="mb-4 text-[#001F3D]" />
            <p className="text-[10px] font-black uppercase tracking-widest">Basket Terminal Offline</p>
          </div>
        )}
      </div>

      {/* 🧾 Detached Action Terminal */}
      {items.length > 0 && (
        <div className="fixed bottom-36 inset-x-0 px-6 z-40 flex flex-col gap-3">
           {/* Summary Card */}
           <div className="bg-white rounded-[2rem] p-5 shadow-[0_-15px_40px_rgba(0,0,0,0.06)] border border-slate-50">
              <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                 <div className="flex justify-between text-[7px] font-bold uppercase tracking-widest text-slate-300"><span>Subtotal</span><span className="text-slate-600">₹{subtotal.toLocaleString()}</span></div>
                 <div className="flex justify-between text-[7px] font-bold uppercase tracking-widest text-slate-300"><span>Compliance</span><span className="text-slate-600">₹{gst.toLocaleString()}</span></div>
                 <div className="flex justify-between text-[7px] font-bold uppercase tracking-widest text-[#D4A017]"><span>Logistics</span><span className="italic font-black text-[#001F3D]">PROMO</span></div>
                 <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-[#001F3D] pt-1 mt-1 border-t border-slate-50">
                    <span>Total Due</span>
                    <span className="text-[14px]">₹{total.toLocaleString()}</span>
                 </div>
              </div>
           </div>

           {/* Detached Button */}
           <button onClick={() => navigate('/ecommerce/checkout')} 
             className="w-full h-14 bg-[#001F3D] text-[#D4A017] rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl shadow-[#001F3D]/30 active:scale-95 transition-all border-b-4 border-[#D4A017]/20"
           >
              Execute Orders <ArrowRight size={14} strokeWidth={3} />
           </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
