import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, ShoppingBag, Bike, Wrench, 
  ArrowRight, Clock, ShieldCheck, Bell, Wallet,
  Menu, Moon, Sun, Star, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VideoCarousel from '../components/home/VideoCarousel';
import LoadingScreen from '../components/common/LoadingScreen';
import Onboarding from '../components/common/Onboarding';
import Logo from '../components/common/Logo';
import { twMerge } from 'tailwind-merge';
import Sidebar from '../components/common/Sidebar';
import { useTheme } from '../context/ThemeContext';
import bulletImg from '../assets/bullet.jpg';

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
    { label: 'Repairs', icon: ShieldCheck, active: false, path: '/repairs' },
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
      title: "Royal Enfield Classic 350",
      price: "₹1,499",
      image: bulletImg,
      tag: "Cruiser",
      rating: "4.9"
    },
    {
      title: "Yamaha R15 V4 Racing",
      price: "₹999",
      image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=800",
      tag: "Sport",
      rating: "4.8"
    },
    {
      title: "TVS Apache RTR 200",
      price: "₹799",
      image: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=800",
      tag: "Naked",
      rating: "4.7"
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
        className="flex flex-col pb-24 bg-gradient-to-br from-[var(--bg-color)] via-blue-50/20 dark:via-blue-900/5 to-[var(--bg-color)] min-h-screen"
      >
        {/* Premium Unified Header Block with Teal Gradient */}
        <div className="bg-gradient-to-br from-[#0A0E17] via-[#1e1b4b] to-[#14b8a6] pt-4 pb-5 px-5 rounded-b-[2.5rem] shadow-2xl relative z-20 border-b border-white/10 mx-0">
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
        <div className="w-full mt-2 px-0 relative z-10">
           <VideoCarousel />
        </div>

        {/* Hot Deals Section */}
        <div className="mt-6">
          <div className="pl-0 pr-5 mb-4">
            <h2 className="text-sm font-black text-[var(--text-main)] uppercase tracking-[0.2em] leading-none pl-4">Hot Deals</h2>
          </div>
          
          <div className="relative w-full overflow-hidden pb-4">
            <motion.div 
              animate={{ x: [0, -600] }}
              transition={{ 
                duration: 25, 
                repeat: Infinity, 
                ease: "linear",
                repeatType: "loop"
              }}
              className="flex gap-4 pl-0"
            >
              {[1, 2, 3].map((loop) => (
                <React.Fragment key={loop}>
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
                    <div key={`${loop}-${idx}`} className="relative w-52 h-32 rounded-[2.5rem] overflow-hidden shrink-0 shadow-2xl border border-white/20 group hover:shadow-blue-500/30 hover:border-blue-500/50 transition-all">
                      <img src={deal.img} alt={deal.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" />
                      <div className={`absolute inset-0 bg-gradient-to-t ${deal.color}/90 mix-blend-multiply opacity-50`} />
                      <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent">
                        <div className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded-full border border-white/20 w-max mb-1.5">
                          <span className="text-[6.5px] font-black text-white/90 uppercase tracking-[0.2em]">{deal.code}</span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <h4 className="text-[11px] font-black text-white uppercase tracking-tight leading-tight w-2/3">{deal.title}</h4>
                            <button 
                              onClick={() => navigate('/services')}
                              className="h-6 px-3 bg-white text-[var(--primary-color)] rounded-full text-[7px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all w-max border border-white/20"
                            >
                              Claim
                            </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Ultra-Compact Quick Actions Grid */}
        <div className="pl-4 pr-6 grid grid-cols-2 gap-4 mt-2">
            <button 
              onClick={() => navigate('/services')}
              className="h-20 bg-[var(--card-bg)] hover:bg-blue-50/50 dark:hover:bg-blue-500/10 rounded-[1.75rem] p-3 flex flex-col justify-center items-center group active:scale-95 transition-all shadow-xl border border-white/5 hover:border-blue-500/20 relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-2xl -mr-8 -mt-8" />
               <Wrench size={18} className="text-[var(--primary-color)] mb-2 group-hover:scale-110 transition-transform" />
               <span className="text-[var(--text-main)] font-black text-[9px] uppercase tracking-wider text-center px-1">Book Maintenance</span>
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="h-20 bg-[var(--card-bg)] hover:bg-blue-50/50 dark:hover:bg-blue-500/10 rounded-[1.75rem] p-3 flex flex-col justify-center items-center group active:scale-95 transition-all shadow-xl border border-white/5 hover:border-blue-500/20 relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-2xl -mr-8 -mt-8" />
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

          <div className="grid grid-cols-2 gap-3.5">
            {recommendations.slice(0, 4).map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group relative h-48 overflow-hidden rounded-[2.4rem] shadow-xl border border-[#004AAD]/10 flex flex-col active:scale-[0.98] transition-all bg-[#F0F6FF]"
              >
                {/* Visual Section - Large Image */}
                <div className="relative flex-1 flex items-center justify-center p-2 overflow-hidden bg-white/50">
                   <img 
                     src={item.image} 
                     className="w-[140%] h-[140%] max-w-none object-contain mix-blend-multiply drop-shadow-xl group-hover:scale-110 transition-transform duration-700" 
                     alt={item.title} 
                   />
                   
                   {/* Floating Rating */}
                   <div className="absolute top-3 left-3 px-1.5 py-0.5 bg-white/80 backdrop-blur-md rounded-full border border-[#004AAD]/10 flex items-center gap-1">
                      <Star size={7} fill="#FF9119" className="text-[#FF9119]" />
                      <span className="text-[7px] font-black text-[#0A0E17]">{item.rating}</span>
                   </div>
                </div>

                {/* Footer Info - Semi-Circular Feel */}
                <div className="bg-[#0A0E17] px-4 py-3 min-h-[50px] flex flex-col justify-center">
                   <h3 className="font-black text-[8px] text-white uppercase tracking-widest leading-tight truncate mb-1">{item.title}</h3>
                   <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-[#14b8a6]">{item.price}</span>
                      <ChevronRight size={10} className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
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
