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
              <h2 className="text-[10px] font-black text-[var(--text-main)] uppercase tracking-[0.3em] leading-none">Featured Gear</h2>
              <div className="w-5 h-0.5 bg-[var(--primary-color)] mt-1" />
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
                         placeholder="SEARCH..."
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[8px] font-black uppercase text-white placeholder:text-zinc-600 focus:outline-none"
                       />
                    </motion.div>
                 )}
              </AnimatePresence>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={twMerge(
                  "w-9 h-9 flex items-center justify-center rounded-xl transition-all border",
                  showFilters ? "bg-[var(--primary-color)] border-[var(--primary-color)] text-white" : "bg-white/5 border-white/5 text-zinc-500"
                )}
              >
                <Filter size={14} />
              </button>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
           {filteredProducts.map((p, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               onClick={() => setSelectedProduct(p)}
               className="group bg-[var(--card-bg)] rounded-md overflow-hidden relative shadow-sm border border-[var(--border-color)] active:scale-[0.98] transition-all"
             >
                <div className="aspect-square overflow-hidden relative">
                   <img src={p.image} className="w-full h-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0" alt={p.name} />
                   <div className="absolute top-1.5 left-1.5 z-10">
                      <span className="px-1.5 py-0.5 bg-black/60 text-white font-black text-[5px] uppercase tracking-widest">{p.category}</span>
                   </div>
                   
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(p);
                        }}
                        className="w-8 h-8 bg-[var(--primary-color)] text-white shadow-xl flex items-center justify-center active:scale-95 transition-all transform scale-75 group-hover:scale-100"
                      >
                         <Plus size={16} />
                      </button>
                   </div>
                </div>
                
                <div className="p-1.5 relative">
                   <h3 className="text-[7.5px] font-black text-[var(--text-main)] uppercase tracking-widest mb-0.5 leading-tight line-clamp-1">{p.name}</h3>
                   <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black text-[var(--primary-color)] tracking-tight">₹{p.price}</span>
                      <div className="flex items-center gap-0.5">
                         <Star size={6} className="text-[#FFD700]" fill="#FFD700" />
                         <span className="text-[6px] font-black text-[var(--text-dim)]">{p.rating}</span>
                      </div>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-[var(--bg-color)] flex flex-col"
          >
             <div className="relative h-[45vh] w-full">
                <img src={selectedProduct.image} className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--bg-color)] to-transparent" />
                <div className="absolute top-10 left-5 right-5 flex items-center justify-between">
                   <button onClick={() => setSelectedProduct(null)} className="w-10 h-10 bg-[var(--card-bg)] shadow-xl rounded-xl flex items-center justify-center text-[var(--text-main)] border border-[var(--border-color)] active:scale-90"><X size={20}/></button>
                   <button className="w-10 h-10 bg-[var(--card-bg)] shadow-xl rounded-xl flex items-center justify-center text-zinc-400 border border-[var(--border-color)]"><Heart size={18}/></button>
                </div>
             </div>

              <div className="flex-grow bg-[var(--bg-color)] px-5 pb-6 flex flex-col overflow-y-auto no-scrollbar">
                 <div className="flex items-start justify-between mb-4 mt-2">
                    <div className="flex-1">
                       <span className="text-[var(--primary-color)] font-black text-[8px] uppercase tracking-[0.4em] mb-1 block leading-none">{selectedProduct.category}</span>
                       <h2 className="text-xl font-black text-[var(--text-main)] uppercase tracking-[0.1em] leading-tight mb-1">{selectedProduct.name}</h2>
                       <p className="text-[var(--text-dim)] font-black text-[9px] uppercase tracking-widest opacity-60">{selectedProduct.subtitle}</p>
                    </div>
                    <div className="text-right">
                       <div className="text-xl font-black text-[var(--primary-color)] leading-none tracking-tighter">₹{selectedProduct.price}</div>
                       <div className="flex items-center gap-1 justify-end mt-2">
                          <Star size={11} className="text-[#FFD700]" fill="#FFD700" />
                          <span className="text-[11px] font-black text-[var(--text-dim)]">{selectedProduct.rating}</span>
                       </div>
                    </div>
                 </div>

                 <div className="bg-[var(--card-bg)] p-4 rounded-lg border border-[var(--border-color)] mb-5">
                    <h4 className="text-[7px] font-black text-[var(--text-dim)] uppercase tracking-[0.3em] mb-2.5">Editorial Description</h4>
                    <p className="text-[var(--text-main)] text-[10px] leading-[1.6] font-black uppercase tracking-tight opacity-80">
                       {selectedProduct.description} Engineered for peak performance, ensuring maximum protection and efficiency for high-octane automotive builds.
                    </p>
                 </div>

                 <div className="mb-6">
                    <h4 className="text-[7px] font-black text-[var(--text-dim)] uppercase tracking-[0.3em] mb-3">Specifications</h4>
                    <div className="grid grid-cols-2 gap-2">
                       {[
                         { label: "Material", value: "Carbon Pro" },
                         { label: "Weight", value: "850g - 1.2kg" },
                         { label: "Cert", value: "ECE / DOT" },
                         { label: "Warranty", value: "24 MONTHS" }
                       ].map((spec, idx) => (
                         <div key={idx} className="bg-[var(--card-bg)] p-3 rounded-lg border border-[var(--border-color)]">
                            <div className="text-[7px] text-[var(--text-dim)] font-black uppercase mb-1 tracking-widest">{spec.label}</div>
                            <div className="text-[9px] text-[var(--text-main)] font-black uppercase tracking-widest">{spec.value}</div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="mt-auto pt-4 flex gap-3">
                    <button 
                      onClick={() => setSelectedProduct(null)}
                      className="w-14 h-14 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl flex items-center justify-center text-[var(--text-dim)] active:scale-95 transition-all"
                    >
                       <X size={22} />
                    </button>
                    <button 
                       onClick={() => {
                          addToCart(selectedProduct);
                          setSelectedProduct(null);
                          setShowCart(true);
                       }}
                       className="flex-1 h-14 bg-[var(--primary-color)] text-white rounded-xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(144,172,175,0.3)] active:scale-95 transition-all"
                    >
                       Add To Basket
                       <ArrowRight size={14} />
                    </button>
                 </div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {showCart && (
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            className="fixed inset-0 z-[110] bg-[var(--bg-color)] flex flex-col"
          >
             <div className="px-6 pt-12 pb-6 border-b border-[var(--border-color)] flex items-center justify-between">
                <button onClick={() => setShowCart(false)} className="w-10 h-10 bg-[var(--card-bg)] rounded-xl flex items-center justify-center border border-[var(--border-color)]"><X size={20} className="text-[var(--text-main)]" /></button>
                <h2 className="text-sm font-black text-[var(--text-main)] uppercase tracking-[0.2em]">Your Basket</h2>
                <div className="w-10" />
             </div>
             <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.map((item, i) => (
                  <div key={i} className="flex gap-4 items-center bg-[var(--card-bg)] p-4 rounded-xl border border-[var(--border-color)]">
                     <div className="w-16 h-16 rounded-lg overflow-hidden border border-[var(--border-color)]"><img src={item.image} className="w-full h-full object-cover" /></div>
                     <div className="flex-grow">
                        <h4 className="text-[10px] font-black text-[var(--text-main)] uppercase tracking-wider mb-1">{item.name}</h4>
                        <div className="flex items-center justify-between mt-2">
                           <span className="text-[10px] font-black text-[var(--primary-color)]">₹{item.price}</span>
                           <div className="flex items-center gap-3 bg-[var(--bg-color)] px-3 py-1.5 rounded-lg border border-[var(--border-color)]">
                              <button onClick={() => removeFromCart(item.id)} className="text-[var(--text-dim)]"><Minus size={12} /></button>
                              <span className="text-[10px] font-black text-[var(--text-main)]">{item.qty}</span>
                              <button onClick={() => addToCart(item)} className="text-[var(--primary-color)]"><Plus size={12} /></button>
                           </div>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
             {cart.length > 0 && (
               <div className="p-8 bg-[var(--card-bg)] border-t border-[var(--border-color)] rounded-t-[3rem]">
                  <div className="flex items-center justify-between mb-8">
                     <span className="text-[8px] font-black text-[var(--text-dim)] uppercase tracking-[0.3em]">Total Value</span>
                     <span className="text-xl font-black text-[var(--text-main)]">₹{cartTotal}</span>
                  </div>
                   <button 
                     onClick={() => {
                        setShowCart(false);
                        setShowPayment(true);
                     }}
                     className="w-full h-14 bg-[var(--primary-color)] text-white rounded-none font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl active:scale-95 transition-all"
                   >
                      Proceed to Payment
                   </button>
                </div>
             )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Orchestration Layer */}
      <AnimatePresence>
        {showPayment && (
          <motion.div 
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            className="fixed inset-0 z-[120] bg-[var(--bg-color)] flex flex-col"
          >
             <div className="px-6 pt-12 pb-6 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--header-color)]">
                <button onClick={() => setShowPayment(false)} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10"><X size={20} className="text-white" /></button>
                <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">Secure Checkout</h2>
                <div className="w-10" />
             </div>

             <div className="flex-grow overflow-y-auto p-6 no-scrollbar">
                {/* Order Summary Summary */}
                <div className="bg-[var(--card-bg)] p-5 rounded-2xl border border-[var(--border-color)] mb-6">
                   <h4 className="text-[8px] font-black text-[var(--text-dim)] uppercase tracking-[0.3em] mb-4">Review Order</h4>
                   <div className="space-y-3">
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-black text-[var(--text-main)] uppercase tracking-wider">Subtotal</span>
                         <span className="text-[10px] font-black text-[var(--text-main)]">₹{cartTotal}</span>
                      </div>
                      <div className="flex justify-between items-center text-zinc-500">
                         <span className="text-[10px] font-black uppercase tracking-wider">Estimated GST (18%)</span>
                         <span className="text-[10px] font-black">₹{Math.floor(cartTotal * 0.18)}</span>
                      </div>
                      <div className="flex justify-between items-center text-zinc-500">
                         <span className="text-[10px] font-black uppercase tracking-wider">Logistics (Express)</span>
                         <span className="text-[10px] font-black text-[var(--primary-color)]">FREE</span>
                      </div>
                      <div className="h-px bg-[var(--border-color)] my-2" />
                      <div className="flex justify-between items-center">
                         <span className="text-xs font-black text-[var(--text-main)] uppercase tracking-widest">Total Payable</span>
                         <span className="text-lg font-black text-[var(--primary-color)]">₹{cartTotal + Math.floor(cartTotal * 0.18)}</span>
                      </div>
                   </div>
                </div>

                {/* Delivery Address */}
                <div className="mb-6">
                   <h4 className="text-[8px] font-black text-[var(--text-dim)] uppercase tracking-[0.3em] mb-3 px-1">Shipping Terminal</h4>
                   <div className="bg-[var(--card-bg)] p-4 rounded-xl border border-[var(--primary-color)]/30 flex items-start gap-3">
                      <div className="w-8 h-8 bg-[var(--primary-color)]/10 rounded-lg flex items-center justify-center text-[var(--primary-color)]"><Truck size={16} /></div>
                      <div>
                         <p className="text-[10px] font-black text-[var(--text-main)] uppercase tracking-wider mb-1">Office - Work Hub</p>
                         <p className="text-[9px] font-bold text-[var(--text-dim)] uppercase leading-relaxed max-w-[180px]">Plot 42, Sector 18, Gurugram, India - 122015</p>
                      </div>
                      <button className="ml-auto text-[var(--primary-color)] font-black text-[8px] uppercase tracking-widest">Edit</button>
                   </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-8">
                   <h4 className="text-[8px] font-black text-[var(--text-dim)] uppercase tracking-[0.3em] mb-4 px-1">Gateway Entry</h4>
                   <div className="grid grid-cols-1 gap-3">
                      {[
                        { id: 'upi', label: 'UPI (PhonePe/GPay)', icon: Smartphone },
                        { id: 'card', label: 'Debit/Credit Card', icon: CreditCard },
                        { id: 'wallet', label: 'E-Wallet (Paytm)', icon: Wallet }
                      ].map((method) => (
                        <button key={method.id} className="group h-14 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl px-4 flex items-center gap-4 active:scale-[0.98] active:bg-[var(--primary-color)]/5 transition-all">
                           <div className="w-9 h-9 border border-[var(--border-color)] rounded-lg flex items-center justify-center text-[var(--text-dim)] group-hover:text-[var(--primary-color)]">
                              <method.icon size={18} />
                           </div>
                           <span className="text-[10px] font-black text-[var(--text-main)] uppercase tracking-widest">{method.label}</span>
                           <div className="ml-auto w-4 h-4 rounded-full border border-[var(--border-color)] group-active:border-[var(--primary-color)] group-active:bg-[var(--primary-color)] transition-all" />
                        </button>
                      ))}
                   </div>
                </div>
             </div>

             <div className="p-8 bg-[var(--card-bg)] border-t border-[var(--border-color)]">
                <button 
                   onClick={() => {
                      setPaymentSuccess(true);
                      setTimeout(() => {
                        setCart([]);
                        setShowPayment(false);
                        setPaymentSuccess(false);
                        navigate('/');
                      }, 2500);
                   }}
                   className="w-full h-16 bg-[var(--primary-color)] text-white rounded-xl font-black text-[11px] uppercase tracking-[0.4em] shadow-[0_20px_50px_rgba(144,172,175,0.4)] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                   Finalize & Pay
                   <ArrowRight size={16} />
                </button>
                <p className="text-center text-[7px] font-bold text-zinc-500 uppercase tracking-widest mt-4 opacity-50 flex items-center justify-center gap-1.5">
                   <ShieldCheck size={10} />
                   Secure 256-Bit SSL Encryption Active
                </p>
             </div>

             {/* Success Animation Overlay */}
             <AnimatePresence>
                 {paymentSuccess && (
                    <motion.div 
                       initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                       className="absolute inset-0 z-[130] bg-[var(--primary-color)] flex flex-col items-center justify-center text-white p-10 text-center"
                    >
                       <motion.div 
                         initial={{ scale: 0, rotate: -45 }}
                         animate={{ scale: 1, rotate: 0 }}
                         className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-8 border-4 border-white/30 shadow-2xl"
                       >
                          <CheckCircle size={48} className="text-white" />
                       </motion.div>
                       <h2 className="text-2xl font-black uppercase tracking-[0.2em] mb-4">Payment Recieved</h2>
                       <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-80 leading-relaxed max-w-[200px]">
                          Your automotive essentials are being prepared for dispatch. Redirecting to hub...
                       </p>
                    </motion.div>
                 )}
             </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccessoriesStore;
