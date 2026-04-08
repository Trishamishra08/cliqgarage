import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, ShoppingBag, Bike, Wrench, 
  ArrowRight, Clock, ShieldCheck, Bell, Wallet,
  Menu, Moon, Sun
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VideoCarousel from '../components/home/VideoCarousel';
import LoadingScreen from '../components/common/LoadingScreen';
import Onboarding from '../components/common/Onboarding';
import Logo from '../components/common/Logo';
import { twMerge } from 'tailwind-merge';
import Sidebar from '../components/common/Sidebar';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardFinished, setOnboardFinished] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Initial Load
    const timer = setTimeout(() => {
      setLoading(false);
      setShowOnboarding(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setLoading(true); // Trigger loading again
    setTimeout(() => {
      setLoading(false);
      setOnboardFinished(true);
    }, 1500);
  };

  const categories = [
    { label: 'All', icon: Settings, active: true, path: '/' },
    { label: 'Service', icon: Wrench, active: false, path: '/services' },
    { label: 'Store', icon: ShoppingBag, active: false, path: '/ecommerce' },
    { label: 'Rentals', icon: Bike, active: false, path: '/rentals' },
    { label: 'Repairs', icon: ShieldCheck, active: false, path: '/services' },
  ];

  const offers = [
    {
      title: "Get ₹500 OFF",
      desc: "On your first booking",
      code: "CLIQ500",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2674&auto=format&fit=crop"
    },
    {
      title: "Flat 20% OFF",
      desc: "Comprehensive Service",
      code: "SERVICE20",
      image: "https://images.unsplash.com/photo-1551522435-a13afa10f103?q=80&w=2670&auto=format&fit=crop"
    }
  ];

  const recommendations = [
    {
      title: "TVS Racing Stealth-1",
      price: "₹4,999",
      image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=800",
      tag: "Helmets"
    },
    {
      title: "Castrol Power-1 Ultimate",
      price: "₹899",
      image: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=800",
      tag: "Maintenance"
    },
    {
      title: "HJG Dual Tone LED",
      price: "₹1,599",
      image: "https://images.unsplash.com/photo-1616422285623-13ff0167c95c?q=80&w=800",
      tag: "Lighting"
    },
    {
      title: "Rynox Stealth Evo 3",
      price: "₹8,999",
      image: "https://images.unsplash.com/photo-1558980335-8e0c25ad75de?q=80&w=800",
      tag: "Riding Gear"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-color)] transition-colors duration-300">
      <AnimatePresence>
        {loading && <LoadingScreen key="loading" />}
        {showOnboarding && !loading && !onboardFinished && (
          <Onboarding 
            key="onboarding" 
            onComplete={handleOnboardingComplete} 
          />
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: (!loading && onboardFinished) ? 1 : 0 }}
        className="flex flex-col pb-24 bg-[var(--bg-color)] min-h-screen"
      >
        {/* Premium Unified Header Block with Teal Gradient */}
        <div className="bg-gradient-to-br from-[#004AAD] via-[#004AAD] to-[#14b8a6] pt-4 pb-5 px-5 rounded-b-[2.5rem] shadow-2xl relative z-20 border-b border-white/10 mx-0">
          {/* Main Top Nav */}
          <div className="flex items-center justify-between mb-5">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="w-10 h-10 flex items-center justify-start active:scale-95 transition-all"
            >
              <Menu className="text-white" size={24} />
            </button>
            <Logo showText={true} horizontal={true} className="scale-90" forceWhite={true} />
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-end active:scale-95 transition-all"
            >
              {isDarkMode ? <Sun className="text-white" size={20} /> : <Moon className="text-white" size={20} />}
            </button>
          </div>

          <div className="flex items-center justify-between px-1">
            {categories.map((cat, i) => (
                <div key={i} onClick={() => navigate(cat.path)} className="flex flex-col items-center gap-1.5 group cursor-pointer">
                  <div className={twMerge(
                    "w-10 h-10 rounded-full border transition-all flex items-center justify-center",
                    cat.active 
                      ? "bg-white text-[#0A0E17] border-white shadow-lg shadow-white/10 scale-110" 
                      : "bg-white/15 border-white/10 text-white/70 group-hover:text-white group-hover:bg-white/20"
                  )}>
                    <cat.icon size={16} />
                  </div>
                  <span className={twMerge(
                    "text-[7px] font-black uppercase tracking-widest", 
                    cat.active ? "text-white" : "text-white/60 group-hover:text-white"
                  )}>{cat.label}</span>
                </div>
            ))}
          </div>
        </div>
        
        {/* Video Carousel */}
        <div className="w-full mt-4">
           <VideoCarousel />
        </div>

        {/* Hot Deals Section */}
        <div className="mt-6">
          <div className="px-5 mb-4">
            <h2 className="text-sm font-black text-[var(--text-main)] uppercase tracking-[0.2em] leading-none">Hot Deals</h2>
          </div>
          
          <div className="flex gap-4 overflow-x-auto px-5 pb-4 no-scrollbar">
            {[{
              title: "Flat 20% Off", 
              code: "SERVICE20", 
              img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800",
              color: "from-blue-600 to-indigo-600"
            }, {
              title: "Get ₹500 Off", 
              code: "CLIQ500", 
              img: "https://images.unsplash.com/photo-1440115637344-80fb36cd667a?q=80&w=800",
              color: "from-orange-600 to-red-600"
            }].map((deal, idx) => (
              <div key={idx} className="relative w-64 h-36 rounded-3xl overflow-hidden shrink-0 shadow-xl border border-white/20 group">
                <img src={deal.img} alt={deal.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className={`absolute inset-0 bg-gradient-to-t ${deal.color}/80 mix-blend-multiply opacity-60`} />
                <div className="absolute inset-0 p-5 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <div className="px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 w-max mb-2">
                    <span className="text-[7.5px] font-black text-white/90 uppercase tracking-widest">{deal.code}</span>
                  </div>
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <h4 className="text-base font-black text-white uppercase tracking-tight leading-none">{deal.title}</h4>
                      <p className="text-[8px] font-bold text-white/60 uppercase tracking-widest mt-1">On your first booking</p>
                    </div>
                    <button 
                      onClick={() => navigate('/services')}
                      className="h-7 px-4 bg-white text-[var(--primary-color)] rounded-xl text-[8px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all mb-0.5 border border-white/20"
                    >
                      Claim
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ultra-Compact Quick Actions Grid */}
        <div className="px-5 grid grid-cols-2 gap-4 mt-8">
            <button 
              onClick={() => navigate('/services')}
              className="h-20 bg-[var(--card-bg)] rounded-[1.75rem] p-3 flex flex-col justify-center items-center group active:scale-95 transition-all shadow-xl border border-white/5 relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--primary-color)]/5 rounded-full blur-2xl -mr-8 -mt-8" />
               <Wrench size={18} className="text-[var(--primary-color)] mb-2 group-hover:scale-110 transition-transform" />
               <span className="text-[var(--text-main)] font-black text-[9px] uppercase tracking-wider text-center px-1">Book Maintenance</span>
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="h-20 bg-[var(--card-bg)] rounded-[1.75rem] p-3 flex flex-col justify-center items-center group active:scale-95 transition-all shadow-xl border border-white/5 relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-16 h-16 bg-zinc-500/5 rounded-full blur-2xl -mr-8 -mt-8" />
               <Clock size={18} className="text-[var(--text-dim)] group-hover:text-[var(--primary-color)] mb-2 group-hover:scale-110 transition-transform" />
               <span className="text-[var(--text-main)] font-black text-[9px] uppercase tracking-wider text-center px-1">Live Tracking</span>
            </button>
        </div>

        {/* Recommendations Section */}
        <div className="px-5 mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-black text-[var(--text-main)] uppercase tracking-[0.2em] leading-none">Recommendations</h2>
            <button 
              onClick={() => navigate('/ecommerce')}
              className="text-[10px] font-black text-[var(--primary-color)] uppercase tracking-widest"
            >
              See All
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {recommendations.slice(0, 3).map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative w-full h-44 rounded-sm overflow-hidden bg-[var(--card-bg)] border border-white/5 shadow-xl"
              >
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={item.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
                   <span className="text-[var(--primary-color)] text-[8px] font-black uppercase tracking-[0.3em] mb-2">{item.tag}</span>
                   <h3 className="font-black text-xs uppercase tracking-widest leading-none mb-2">{item.title}</h3>
                   <div className="flex items-center justify-between">
                      <p className="text-white/60 font-bold text-[9px] uppercase tracking-widest">{item.price}</p>
                      <button 
                        onClick={() => navigate('/ecommerce')}
                        className="h-7 px-4 bg-white text-[var(--primary-color)] rounded-none text-[8px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                      >
                        View
                      </button>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </div>
  );
};

export default Home;
