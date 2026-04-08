import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowLeft, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const navigate = useNavigate();

  const items = [
    { title: 'MT Hummer Helmet', price: '₹5,250', img: 'https://images.unsplash.com/photo-1621685123223-2fb92bf84436?q=80&w=800' },
    { title: 'HJG Dual Tone Aux', price: '₹1,500', img: 'https://images.unsplash.com/photo-1616422285623-13ff0167c95c?q=80&w=800' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-color)] pb-24">
      <div 
        style={{ backgroundColor: '#0A0E17' }}
        className="pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden border-b border-white/5"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-[80px]" />
        
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6 border border-white/20"><ArrowLeft size={18} /></button>

        <div className="flex items-end justify-between relative">
          <div>
            <span className="text-white/50 font-black text-[9px] uppercase tracking-[0.4em] mb-2 block">Your Collection</span>
            <h1 className="text-2xl font-black text-white uppercase tracking-widest leading-none">Wishlist</h1>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
            <Heart className="text-white" size={24} fill="white" />
          </div>
        </div>
      </div>

      <div className="px-6 mt-8 space-y-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--card-bg)] p-3 rounded-2xl border border-[var(--border-color)] flex items-center gap-4 relative overflow-hidden shadow-xl"
          >
             <div className="w-20 h-20 rounded-xl overflow-hidden border border-[var(--border-color)]">
                <img src={item.img} className="w-full h-full object-cover grayscale-[0.2]" alt={item.title} />
             </div>
             <div className="flex-grow">
                <h4 className="text-[10px] font-black text-[var(--text-main)] uppercase tracking-widest mb-1">{item.title}</h4>
                <div className="flex items-center gap-1 mb-2">
                   <Star size={8} fill="#FFD700" className="text-[#FFD700]" />
                   <span className="text-[8px] font-bold text-zinc-500">4.8</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
               <span className="text-sm font-black text-[var(--text-main)]">{item.price}</span>
               <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center border border-red-500/20 active:scale-95 transition-all">
                     <Trash2 size={14} />
                  </button>
                  <button className="h-8 px-4 bg-[#004AAD] text-white rounded-lg text-[8px] font-black uppercase tracking-widest flex items-center gap-2 active:scale-95 transition-all shadow-lg">
                     <ShoppingCart size={12} />
                     Move to Cart
                  </button>
               </div>
            </div>
             </div>
          </motion.div>
        ))}

        <button 
           onClick={() => navigate('/store')}
           className="w-full h-14 mt-6 bg-[#004AAD]/5 border border-[#004AAD]/20 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all group"
        >
           <ShoppingCart size={16} className="text-[#004AAD]" />
           <span className="text-[#004AAD] font-black text-[9px] uppercase tracking-widest">Continue Shopping</span>
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
