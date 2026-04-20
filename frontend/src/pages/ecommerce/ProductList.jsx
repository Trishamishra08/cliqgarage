import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Heart, Search, Filter, Star, 
  ShoppingBag, Eye, ArrowRight, X, Minus, Plus,
  ShieldCheck, Truck, RotateCcw, Flame, Clock, Shield,
  MapPin, HardHat, Shirt, Lightbulb, Zap, Wrench,
  Smartphone, CreditCard, Wallet, CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import Logo from '../../components/common/Logo';

const AccessoriesStore = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('Bike');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();
  
  const categories = [
    { name: 'All', icon: Flame, vehicles: ['Bike', 'Car'] },
    { name: 'Helmets', icon: HardHat, vehicles: ['Bike'] },
    { name: 'Riding Gear', icon: Shirt, vehicles: ['Bike'] },
    { name: 'Maintenance', icon: Wrench, vehicles: ['Bike', 'Car'] },
    { name: 'Performance', icon: Zap, vehicles: ['Bike', 'Car'] },
    { name: 'Lighting', icon: Lightbulb, vehicles: ['Bike', 'Car'] },
    { name: 'Interior', icon: Shield, vehicles: ['Car'] },
    { name: 'Exteriors', icon: Flame, vehicles: ['Car'] }
  ];

  const products = [
    // Bike Accessories
    {
      id: 1,
      name: "TVS Racing Stealth-1",
      subtitle: "Carbon Fiber Edition",
      category: "Helmets",
      vehicleType: "Bike",
      price: "4,999",
      rating: 4.9,
      reviews: "1.2k",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop",
      isNew: true,
      description: "Elite carbon fiber construction with advanced aerodynamics. ECE and DOT certified for professional track and street use."
    },
    {
      id: 2,
      name: "Castrol Power-1 Pro",
      subtitle: "Synthetic Engine Oil",
      category: "Maintenance",
      vehicleType: "Bike",
      price: "899",
      rating: 4.8,
      reviews: "3.5k",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop",
      bestSeller: true,
      description: "Fully synthetic 4T engine oil designed for high-performance motorcycles. Reduces friction and ensures smooth shifts."
    },
    {
      id: 3,
      name: "Rynox Stealth Evo 3",
      subtitle: "All Season Pro Jacket",
      category: "Riding Gear",
      vehicleType: "Bike",
      price: "8,999",
      rating: 4.9,
      reviews: "2.1k",
      image: "https://images.unsplash.com/photo-1558980335-8e0c25ad75de?q=80&w=800&auto=format&fit=crop",
      bestSeller: true,
      description: "Premium Level 2 armor with dual detachable liners for year-round protection and breathability."
    },
    // Car Accessories
    {
      id: 4,
      name: "3M Ceramic Polish",
      subtitle: "Premium Paint Care",
      category: "Maintenance",
      vehicleType: "Car",
      price: "2,499",
      rating: 4.9,
      reviews: "2.1k",
      image: "https://images.unsplash.com/photo-1507133750040-4a8f5700e35f?q=80&w=800&auto=format&fit=crop",
      bestSeller: true,
      description: "Advanced ceramic coating for long-lasting paint protection and a mirror-like deep shine."
    },
    {
      id: 5,
      name: "Brembo Sport Pads",
      subtitle: "P06 High-Performance",
      category: "Performance",
      vehicleType: "Car",
      price: "12,999",
      rating: 4.8,
      reviews: "1.1k",
      image: "https://images.unsplash.com/photo-1481398734200-e2defcc1a7c0?q=80&w=800&auto=format&fit=crop",
      description: "High-friction brake pads for superior stopping power and heat dissipation. Ideal for enthusiast driving."
    },
    {
      id: 6,
      name: "7D Diamond Mats",
      subtitle: "Custom-Fit Interiors",
      category: "Interior",
      vehicleType: "Car",
      price: "3,599",
      rating: 4.7,
      reviews: "950",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      description: "Luxury custom-fit floor mats with multi-layer protection and a premium diamond-stitched finish."
    }
  ];

  const filteredProducts = products.filter(p => {
    const matchesVehicle = p.vehicleType === selectedVehicle;
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesVehicle && matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing && existing.qty > 1) {
        return prev.map(item => item.id === id ? { ...item, qty: item.qty - 1 } : item);
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const cartTotal = cart.reduce((acc, item) => acc + (parseInt(item.price.replace(',', '')) * item.qty), 0).toLocaleString();

  return (
    <div className="flex flex-col pb-24 bg-[var(--bg-color)] min-h-screen transition-colors duration-300">
      {/* Ultra-Compact Premium Header Section */}
      <div className="bg-[var(--header-color)] pt-3 pb-8 px-5 rounded-b-[2rem] shadow-2xl relative z-10 border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigate('/')}
            className="w-8 h-8 flex items-center justify-center active:scale-95 bg-white/5 rounded-lg border border-white/5"
          >
            <ArrowRight className="rotate-180 text-white" size={16} />
          </button>
          
          <div className="flex flex-col items-center">
             <h1 className="text-sm font-black text-white uppercase tracking-[0.2em] leading-none">Gear Store</h1>
             <p className="text-[var(--primary-color)] font-black text-[5px] tracking-[0.4em] uppercase mt-1 opacity-70">Premium Boutique</p>
          </div>

          <button onClick={() => setShowCart(true)} className="relative w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg text-white active:scale-95 border border-white/5">
             <ShoppingCart size={14} />
             {cart.length > 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--primary-color)] rounded-full text-[6px] font-black flex items-center justify-center text-white">{cart.length}</span>}
          </button>
        </div>

        {/* Vehicle Selection Toggle */}
        <div className="flex bg-black/40 p-1 rounded-lg border border-white/5 mx-2">
           {['Bike', 'Car'].map((type) => (
             <button
               key={type}
               onClick={() => {
                 setSelectedVehicle(type);
                 setActiveCategory('All');
               }}
               className={twMerge(
                 "flex-1 py-1.5 text-[7px] font-black uppercase tracking-[0.2em] transition-all rounded-md",
                 selectedVehicle === type ? "bg-[var(--primary-color)] text-white shadow-lg" : "text-zinc-500"
               )}
             >
               {type}
             </button>
           ))}
        </div>
      </div>

      {/* Floating Categories - Minimalist */}
      <div className="px-5 mt-3 relative z-20">
         <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            {categories.filter(c => c.vehicles.includes(selectedVehicle)).map((cat, i) => (
              <button 
                 key={i}
                 onClick={() => setActiveCategory(cat.name)}
                 className={twMerge(
                    "px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all whitespace-nowrap border",
                    activeCategory === cat.name 
                      ? "bg-[var(--primary-color)] border-[var(--primary-color)] text-white" 
                      : "bg-white/5 border-white/5 text-zinc-500 font-black"
                 )}
              >
                 <cat.icon size={10} className={activeCategory === cat.name ? "text-white" : "text-zinc-500"} />
                 <span className="font-black text-[6.5px] uppercase tracking-[0.1em]">{cat.name}</span>
               </button>
            ))}
         </div>
      </div>

      {/* Product Feed & Action Header */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-4">
           <div className="flex flex-col">
              <h2 className="text-[12px] font-black text-[#001F3D] uppercase tracking-[0.3em] leading-none">The Collection</h2>
              <div className="w-6 h-0.5 bg-[#D4A017] mt-1.5" />
           </div>
           
           <div className="flex items-center gap-3">
              <AnimatePresence>
                 {showFilters && (
                    <motion.div 
                       initial={{ width: 0, opacity: 0 }}
                       animate={{ width: 140, opacity: 1 }}
                       exit={{ width: 0, opacity: 0 }}
                       className="overflow-hidden"
                    >
                       <input 
                         type="text"
                         placeholder="SEARCH GEAR..."
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         className="w-full bg-[#001F3D]/5 border border-[#001F3D]/10 rounded-lg px-3 py-2 text-[8px] font-black uppercase text-[#001F3D] placeholder:text-slate-300 focus:outline-none"
                       />
                    </motion.div>
                 )}
              </AnimatePresence>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={twMerge(
                  "w-10 h-10 flex items-center justify-center rounded-xl transition-all border",
                  showFilters ? "bg-[#001F3D] border-[#001F3D] text-white" : "bg-white border-slate-100 text-slate-400"
                )}
              >
                <Filter size={16} />
              </button>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-10">
           {filteredProducts.map((p, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               onClick={() => navigate(`/ecommerce/product/${p.id}`)}
               className="group bg-white rounded-[1.5rem] overflow-hidden relative shadow-sm border border-slate-50 active:scale-[0.98] transition-all"
             >
                <div className="aspect-[4/5] overflow-hidden relative">
                   <img src={p.image} className="w-full h-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0" alt={p.name} />
                   <div className="absolute top-3 right-3 z-10">
                      <button className="w-7 h-7 bg-white/90 backdrop-blur-md rounded-lg flex items-center justify-center text-slate-300 hover:text-red-400">
                         <Heart size={14} />
                      </button>
                   </div>
                   
                   <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/20 to-transparent">
                      <span className="px-1.5 py-0.5 bg-white text-[#001F3D] font-black text-[5px] uppercase tracking-widest rounded-sm">{p.category}</span>
                   </div>
                </div>
                
                <div className="p-3 relative">
                   <h3 className="text-[10px] font-black text-[#001F3D] uppercase tracking-tight mb-1 leading-tight line-clamp-1">{p.name}</h3>
                   <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-[#D4A017] tracking-tight">₹{p.price}</span>
                      <div className="flex items-center gap-0.5">
                         <Star size={7} className="text-[#D4A017]" fill="#D4A017" />
                         <span className="text-[7.5px] font-black text-slate-300">{p.rating}</span>
                      </div>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Floating View Basket CTA */}
      <AnimatePresence>
         {cart.length > 0 && (
            <motion.div 
               initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
               className="fixed bottom-24 inset-x-6 z-[60]"
            >
               <button 
                  onClick={() => navigate('/ecommerce/cart')}
                  className="w-full h-14 bg-[#001F3D] text-white rounded-2xl flex items-center justify-between px-6 shadow-2xl active:scale-95 transition-all border border-white/10"
               >
                  <div className="flex items-center gap-4">
                     <div className="w-8 h-8 rounded-lg bg-[#D4A017] flex items-center justify-center text-[#001F3D]">
                        <ShoppingBag size={16} />
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-[0.2em]">{cart.length} Items Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-[12px] font-black text-[#D4A017]">₹{cartTotal}</span>
                     <ArrowRight size={14} className="text-white/40" />
                  </div>
               </button>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default AccessoriesStore;
