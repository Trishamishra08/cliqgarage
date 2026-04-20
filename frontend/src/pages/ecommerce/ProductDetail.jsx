import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ShoppingCart, Heart, Star, 
  ShieldCheck, Truck, RotateCcw, 
  ChevronRight, ArrowRight, Check,
  Share2, Shield, Info, Zap
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  // Mock Data (Shared with ProductList)
  const products = [
    {
      id: 1,
      name: "TVS Racing Stealth-1",
      subtitle: "Carbon Fiber Edition",
      category: "Helmets",
      price: "4,999",
      rating: 4.9,
      reviews: "1.2k",
      images: [
        "https://images.unsplash.com/photo-1621622340332-9c3f4e1f720f?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1558981403-c59899a28bc?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&q=80&w=800"
      ],
      description: "Elite carbon fiber construction with advanced aerodynamics. ECE and DOT certified for professional track and street use. Features multi-density EPS, emergency release system, and pinlock-ready visor.",
      availability: "In Stock (12 Units left)",
      specs: [
        { label: "Material", value: "Carbon Pro" },
        { label: "Weight", value: "1150g ± 50g" },
        { label: "Cert", value: "ECE 22.06 / DOT" },
        { label: "Closure", value: "Double D-Ring" }
      ],
      colors: ["#1F1F1F", "#D4A017", "#B22222"]
    }
    // ... other products would fetch by ID
  ];

  const product = products.find(p => p.id === parseInt(id)) || products[0];

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24 font-['Outfit'] relative overflow-x-hidden">
      {/* 🚀 Slick Compact Overlays */}
      <div className="fixed top-0 inset-x-0 z-50 px-5 pt-8 flex items-center justify-between pointer-events-none">
        <button 
          onClick={() => navigate(-1)}
          className="w-9 h-9 bg-[#001F3D]/90 backdrop-blur-xl rounded-xl shadow-lg border border-white/10 flex items-center justify-center text-[#D4A017] active:scale-90 transition-all pointer-events-auto"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2 pointer-events-auto">
          <button className="w-9 h-9 bg-white/90 backdrop-blur-xl rounded-xl shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 active:scale-90 transition-all">
            <Heart size={16} />
          </button>
          <button 
             onClick={() => navigate('/ecommerce/cart')}
             className="w-9 h-9 bg-[#001F3D]/90 backdrop-blur-xl rounded-xl shadow-lg border border-white/10 flex items-center justify-center text-[#D4A017] active:scale-90 transition-all relative"
          >
            <ShoppingCart size={16} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4A017] rounded-full text-[8px] font-bold flex items-center justify-center text-[#001F3D] border-2 border-[#001F3D]">2</span>
          </button>
        </div>
      </div>

      {/* 📸 Visual Terminal - High Density */}
      <div className="relative h-[240px] bg-white rounded-b-[2.5rem] shadow-sm overflow-hidden border-b border-slate-100/50">
        <AnimatePresence mode="wait">
          <motion.img 
            key={activeImage}
            src={product.images[activeImage]} 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full h-full object-contain p-6"
          />
        </AnimatePresence>
        
        {/* Pagination Micro Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1 px-2 py-1 bg-black/5 rounded-full">
          {product.images.map((_, i) => (
            <button key={i} onClick={() => setActiveImage(i)} className={twMerge("h-1 rounded-full transition-all duration-300", activeImage === i ? "w-4 bg-[#D4A017]" : "w-1 bg-slate-200")} />
          ))}
        </div>
      </div>

      {/* 📝 Info Hub - Extreme Density */}
      <div className="px-5 -mt-6 relative z-10">
         <div className="bg-white rounded-[1.8rem] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50">
            <div className="flex justify-between items-start mb-2.5 border-b border-slate-50 pb-2.5">
               <div>
                  <h1 className="text-[17px] font-black text-[#001F3D] uppercase tracking-tighter leading-none mb-1">{product.name}</h1>
                  <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest italic">{product.subtitle}</p>
               </div>
               <div className="text-right">
                  <div className="text-[17px] font-black text-[#001F3D] tracking-tighter leading-none mb-0.5">₹{product.price}</div>
                  <div className="flex items-center gap-1 justify-end">
                     <Star size={8} fill="#D4A017" className="text-[#D4A017]" />
                     <span className="text-[8px] font-black text-[#001F3D]">{product.rating}</span>
                  </div>
               </div>
            </div>

            {/* Matrix Block */}
            <div className="grid grid-cols-2 gap-2 mb-3">
               {product.specs.map((item, idx) => (
                  <div key={idx} className="px-3 py-1.5 bg-slate-50/30 rounded-xl flex items-center justify-between border border-slate-50">
                     <span className="text-[6.5px] font-black text-slate-300 uppercase tracking-widest">{item.label}</span>
                     <span className="text-[7.5px] font-black text-[#001F3D] uppercase">{item.value}</span>
                  </div>
               ))}
            </div>

            {/* Narrative Micro Block */}
            <div className="mb-3">
               <h3 className="text-[7px] font-black uppercase tracking-widest text-[#D4A017] mb-1 px-1 opacity-70">Logistics & Tech</h3>
               <p className="text-[9px] font-bold text-slate-400 leading-tight uppercase tracking-tight opacity-90 px-1 italic">
                  "{product.description}"
               </p>
            </div>

            {/* Stock & Color Hub */}
            <div className="flex items-center justify-between pt-2.5 border-t border-slate-50">
               <div className="flex gap-1.5">
                  {product.colors.map((color, i) => (
                     <button key={i} onClick={() => setActiveColor(i)} className={twMerge("w-4 h-4 rounded-lg border transition-all p-0.5", activeColor === i ? "border-[#D4A017] scale-110" : "border-transparent")}>
                        <div className="w-full h-full rounded-[3px]" style={{ backgroundColor: color }} />
                     </button>
                  ))}
               </div>
               <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                     <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-[6px] font-black text-emerald-600 uppercase tracking-widest leading-none">In Stock</span>
                  </div>
                  <span className="text-[6px] font-bold text-slate-300 uppercase tracking-tighter">12 Units Ready</span>
               </div>
            </div>
         </div>
         
         {/* 💳 Elevated Action Hub (Above Bot Nav) */}
         <div className="mt-3 mb-24 flex gap-2">
           <button className="w-11 h-11 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-300 active:scale-95 transition-all">
             <Share2 size={14} />
           </button>
           <button 
             onClick={() => {
               if (!isAdded) {
                 setIsAdded(true);
                 setTimeout(() => navigate('/ecommerce/cart'), 1200);
               } else {
                 navigate('/ecommerce/cart');
               }
             }}
             className={twMerge(
               "flex-1 h-11 rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-lg transition-all duration-500 flex items-center justify-center gap-2",
               isAdded ? "bg-emerald-500 text-white" : "bg-[#001F3D] text-[#D4A017] active:scale-95"
             )}
           >
             {isAdded ? (
               <>Secured - Entering Hub <Loader2 size={10} className="animate-spin" /></>
             ) : (
               <>Initiate Selection <ArrowRight size={10} strokeWidth={4} /></>
             )}
           </button>
         </div>
      </div>
    </div>
  );
};

export default ProductDetail;
