import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Trash2, ShoppingBag, ArrowRight,
  Star, Heart, Package, Zap, ExternalLink, Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const Wishlist = () => {
  const navigate = useNavigate();

  const items = [
    {
      id: 1,
      name: "TVS Racing Stealth-1",
      subtitle: "Carbon Fiber Edition",
      category: "Helmets",
      price: "4,999",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Rynox Stealth Evo 3",
      subtitle: "All Season Pro Jacket",
      category: "Riding Gear",
      price: "8,999",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1558980335-8e0c25ad75de?q=80&w=800&auto=format&fit=crop",
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32 font-['Outfit']">
      {/* 🚀 Compact Header */}
      <div className="px-6 pt-10 pb-5 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-40 backdrop-blur-xl bg-white/80">
          <button 
             onClick={() => navigate(-1)}
             className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100"
          >
             <ChevronLeft size={16} />
          </button>
          <div className="text-center">
             <span className="text-[7px] font-bold tracking-[0.3em] text-[#004AAD] uppercase block mb-0.5">Curated Picks</span>
             <h2 className="text-[10px] font-semibold text-slate-900 uppercase tracking-widest leading-none">Your Wishlist</h2>
          </div>
          <div className="w-8 h-8 rounded-lg bg-[#004AAD] flex items-center justify-center text-white border border-[#004AAD] shadow-lg shadow-[#004AAD]/20">
             <Heart size={14} fill="white" />
          </div>
       </div>

       <div className="px-5 py-6">
          <div className="flex items-center justify-between mb-6 px-1">
             <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{items.length} SAVED ITEMS</h3>
             <button className="text-[8px] font-bold text-[#004AAD] uppercase flex items-center gap-1.5 focus:outline-none">
                <Trash2 size={10} /> Clear All
             </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
             {items.map((item, idx) => (
               <motion.div 
                 key={item.id}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="bg-white p-3 rounded-2xl border border-slate-50 flex gap-4 shadow-sm relative group overflow-hidden"
               >
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-slate-50">
                     <img src={item.image} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500" alt={item.name} />
                  </div>

                  <div className="flex-grow flex flex-col justify-between py-1">
                     <div>
                        <div className="flex items-center justify-between mb-0.5">
                           <span className="text-[7px] font-bold text-[#004AAD] uppercase tracking-widest leading-none">{item.category}</span>
                           <div className="flex items-center gap-0.5">
                              <Star size={7} className="text-[#FFD700]" fill="#FFD700" />
                              <span className="text-[7px] font-black text-slate-400">{item.rating}</span>
                           </div>
                        </div>
                        <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-tight line-clamp-1">{item.name}</h4>
                        <p className="text-[7.5px] font-semibold text-slate-400 uppercase tracking-widest leading-none mt-1">{item.subtitle}</p>
                     </div>

                     <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-[#004AAD]">₹{item.price}</span>
                        <div className="flex items-center gap-2">
                           <button className="w-7 h-7 bg-slate-50 text-slate-300 rounded-lg flex items-center justify-center border border-slate-100 hover:text-red-500 hover:bg-red-50 transition-all">
                              <Trash2 size={12} />
                           </button>
                           <button className="h-7 px-4 bg-[#0A0E17] text-white rounded-lg text-[7px] font-black uppercase tracking-widest active:scale-95 transition-all">
                              Move To Bag
                           </button>
                        </div>
                     </div>
                  </div>
               </motion.div>
             ))}
          </div>

          <div className="mt-10 pt-10 border-t border-slate-100">
             <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4 border border-slate-100">
                   <Package size={24} />
                </div>
                <h4 className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em] mb-4">You've reached the end</h4>
                <button 
                  onClick={() => navigate('/ecommerce')}
                  className="h-11 px-8 bg-[#004AAD] text-white rounded-xl text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-[#004AAD]/20 active:scale-95 transition-all"
                >
                   <ShoppingBag size={14} /> Continue Shopping
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Wishlist;
