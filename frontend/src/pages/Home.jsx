import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, ShoppingBag, Bike, Wrench, 
  ArrowRight, Clock, ShieldCheck, Bell, Wallet,
  Menu, Moon, Sun, Star, ChevronRight, Search, MapPin, Navigation, Heart,
  Instagram, Twitter, Facebook
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VideoCarousel from '../components/home/VideoCarousel';
import LoadingScreen from '../components/common/LoadingScreen';
import Onboarding from '../components/common/Onboarding';
import Logo from '../components/common/Logo';
import { twMerge } from 'tailwind-merge';
import Sidebar from '../components/common/Sidebar';
import BottomNav from '../components/common/BottomNav';
import { useTheme } from '../context/ThemeContext';
import bikeImg from '../assets/categories/bike.png';
import deliveryImg from '../assets/categories/delivery.png';
import rentalImg from '../assets/categories/rental.png';
import repairsImg from '../assets/categories/repairs.png';
import outstationImg from '../assets/categories/outstation.png';
import bulletImg from '../assets/bullet.jpg';

const Home = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(!localStorage.getItem('hasOnboarded'));
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardFinished, setOnboardFinished] = useState(!!localStorage.getItem('hasOnboarded'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Initial Load
    if (localStorage.getItem('hasOnboarded')) {
      return; 
    }
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
      localStorage.setItem('hasOnboarded', 'true');
      navigate('/login');
    }, 1500);
  };

  const banners = [
    {
      title: "NEED <br/> <span className='text-[30px]'>Rental Bike?</span>",
      desc: "Flexible Pickup Locations Across The City",
      cta: "Rent Now",
      bg: "#E11D48",
      img: rentalImg,
      path: "/rentals"
    },
    {
      title: "EXPERT <br/> <span className='text-[30px]'>Mechanic?</span>",
      desc: "Certified Doorstep Service Specialists",
      cta: "Book Now",
      bg: "#FBBF24",
      img: repairsImg,
      path: "/services"
    },
    {
      title: "PREMIUM <br/> <span className='text-[30px]'>Service?</span>",
      desc: "Complete Performance Tuning & Wash",
      cta: "Explore",
      bg: "#003B71",
      img: bikeImg,
      path: "/services"
    },
    {
      title: "ROAD <br/> <span className='text-[30px]'>Assistance?</span>",
      desc: "24/7 Breakdown Support & Rescue",
      cta: "Get Help",
      bg: "#10B981",
      img: repairsImg,
      path: "/support"
    }
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { label: 'Rental', img: rentalImg, color: 'bg-blue-50', iconColor: 'bg-blue-100', path: '/rentals' },
    { label: 'Accessories', img: deliveryImg, color: 'bg-yellow-50', iconColor: 'bg-yellow-100', path: '/ecommerce' },
    { label: 'Service', img: repairsImg, color: 'bg-emerald-50', iconColor: 'bg-emerald-100', path: '/services' },
    { label: 'Tracking', img: outstationImg, color: 'bg-purple-50', iconColor: 'bg-purple-100', path: '/tracking' },
    { label: 'Road Assist', img: bikeImg, color: 'bg-orange-50', iconColor: 'bg-orange-100', path: '/assist' },
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
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800",
      tag: "Naked",
      rating: "4.7"
    },
    {
      title: "Hyundai Creta Turbo",
      price: "₹2,499",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800",
      tag: "SUV",
      rating: "4.9"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] transition-colors duration-300 relative overflow-hidden">
      <div className="bg-[var(--bg-color)] min-h-screen relative overflow-hidden">
        {/* Absolute Gradient Blobs for Home Page */}
        <div className="absolute top-[-5%] right-[-10%] w-[400px] h-[400px] bg-[#D4A017]/30 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-multiply dark:mix-blend-lighten" />
        <div className="absolute bottom-[10%] left-[-15%] w-[450px] h-[450px] bg-[#003B71]/25 rounded-full blur-[130px] pointer-events-none z-0 mix-blend-multiply dark:mix-blend-lighten" />
      <div className="absolute top-[40%] left-[10%] w-[250px] h-[250px] bg-[#D4A017]/20 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-multiply dark:mix-blend-lighten" />
      
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
        className="flex flex-col pb-24 bg-transparent min-h-screen relative z-10"
      >
        {/* Premium Unified Header Block with Mustard and Blue Gradient */}
        <div className="bg-gradient-to-br from-[#001F3D] via-[#003B71] to-[#001F3D] pt-4 pb-2 px-4 rounded-b-[1.75rem] shadow-2xl relative z-20 border-b border-white/10 mx-0">
          {/* Main Top Nav */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex justify-start">
              <Logo showText={true} horizontal={true} className="scale-90 origin-left" forceWhite={true} />
            </div>

            <div className="flex items-center justify-end gap-3.5">
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="flex items-center justify-center active:scale-95 transition-all"
              >
                <Search className="text-white" size={18} />
              </button>
              <button 
                onClick={() => navigate('/wallet')}
                className="flex items-center justify-center active:scale-95 transition-all"
              >
                <Wallet className="text-white" size={18} />
              </button>
              <button 
                onClick={toggleTheme}
                className="flex items-center justify-center active:scale-95 transition-all"
              >
                {isDarkMode ? <Sun className="text-white" size={18} /> : <Moon className="text-white" size={18} />}
              </button>
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center justify-center active:scale-95 transition-all ml-1"
              >
                <Menu className="text-white" size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 pt-6 pb-2 z-10 relative -mt-4 bg-gradient-to-b from-[#001F3D] to-transparent overflow-hidden"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                <input 
                  type="text" 
                  placeholder="Search services, bikes, rentals..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#001F3D]/50 backdrop-blur-md border border-white/20 text-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-[#D4A017] shadow-lg"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories & Video Wrapper */}
        <div className="pt-3 pb-2 -mt-2">
          {/* Compact Horizontal Category List */}
          <div className="px-3 mb-2 mt-2">
            <div className="grid grid-cols-5 gap-1.5 pb-2 pt-1">
              {categories.map((cat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => navigate(cat.path)}
                  className="bg-white rounded-[0.9rem] p-1.5 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.05)] border border-slate-50 flex flex-col items-center justify-start gap-1 active:scale-95 transition-all cursor-pointer group overflow-hidden"
                >
                  <div className={twMerge("w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 duration-500 shrink-0", cat.color)}>
                    <img 
                      src={cat.img} 
                      alt={cat.label} 
                      className="w-full h-full object-cover drop-shadow-sm" 
                    />
                  </div>
                  <span className="font-black text-[6.5px] uppercase tracking-tighter text-[#001F3D] text-center leading-none mt-0.5 truncate w-full">{cat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Video Carousel */}
          <div className="w-full mt-0 px-0 relative z-10">
             <VideoCarousel />
          </div>

          {/* Hot Deals Section */}
          <div className="mt-2 pb-1">
          <div className="pl-4 mt-2 mb-2">
            <h3 className="text-[#8B98A7] font-[900] text-[9.5px] tracking-[0.25em] uppercase mb-1 leading-none">Deals</h3>
            <h2 className="text-[18px] font-[900] text-[#0F172A] tracking-tight leading-none">Hot Deals</h2>
            <p className="text-[#8B98A7] font-bold text-[10px] mt-1.5 leading-none">Limited time offers just for you</p>
          </div>
          
          <div className="relative w-full overflow-hidden pb-4">
            <motion.div 
              animate={{ x: [0, -800] }}
              transition={{ 
                duration: 30, 
                repeat: Infinity, 
                ease: "linear",
                repeatType: "loop"
              }}
              className="flex gap-4 pl-4"
            >
              {[1, 2, 3].map((loop) => (
                <React.Fragment key={loop}>
                  {[{
                    title: "Better savings on your next ride.", 
                    subtitle: "Book quickly and save more.",
                    code: "SAVINGS", 
                    img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800",
                    bg: "bg-[#1B2534]",
                    gradient: "from-[#1B2534]",
                    btnText: "Ride Now",
                    iconColor: "text-[#64FFDA]"
                  }, {
                    title: "Flat 20% Off Maintenance & Repairs.", 
                    subtitle: "Complete care guaranteed.",
                    code: "SERVICE20", 
                    img: "https://images.unsplash.com/photo-1440115637344-80fb36cd667a?q=80&w=800",
                    bg: "bg-[#0A192F]",
                    gradient: "from-[#0A192F]",
                    btnText: "Claim Now",
                    iconColor: "text-[#D4A017]"
                  }].map((deal, idx) => (
                    <div key={`${loop}-${idx}`} className={`relative w-[80vw] h-[120px] ${deal.bg} rounded-[1rem] overflow-hidden shrink-0 shadow-lg flex group transition-all border border-white/5`}>
                       {/* Left Content */}
                       <div className="w-[60%] px-4 py-3 flex flex-col justify-center z-10 relative">
                         {/* Badge */}
                         <div className="flex items-center gap-1.5 bg-white/10 w-max px-2.5 py-1 rounded-full mb-1.5 border border-white/5">
                           <Star size={9} className={`fill-current ${deal.iconColor}`} />
                           <span className="text-[7.5px] font-black text-white/90 uppercase tracking-widest leading-none mt-0.5">{deal.code}</span>
                         </div>
                         {/* Title */}
                         <h4 className="text-[13px] font-black text-white leading-tight mb-1 pr-2 tracking-tight">{deal.title}</h4>
                         {/* Subtitle */}
                         <p className="text-[9px] font-bold text-white/50 mb-3">{deal.subtitle}</p>
                         {/* Button */}
                         <button 
                            onClick={() => navigate('/services')}
                            className="bg-white text-[#1B2534] px-4 py-1.5 rounded-full text-[9px] font-black flex items-center justify-center gap-1.5 w-max shadow-md active:scale-95 transition-transform mt-auto"
                         >
                           {deal.btnText}
                           <ArrowRight size={10} />
                         </button>
                       </div>
                       
                       {/* Right Image */}
                       <div className="absolute right-0 top-0 bottom-0 w-[45%]">
                         {/* Linear gradient overlay to blend the image seamlessly into the solid background */}
                         <div className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r ${deal.gradient} to-transparent z-10`} />
                         <img src={deal.img} alt={deal.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </div>
        </div>

        {/* New 3-Column Premium Action Cards */}
        <div className="pl-4 mt-3 mb-2">
          <h3 className="text-[#8B98A7] font-[900] text-[9.5px] tracking-[0.25em] uppercase mb-1 leading-none">Actions</h3>
          <h2 className="text-[18px] font-[900] text-[#0F172A] tracking-tight leading-none">Quick Actions</h2>
          <p className="text-[#8B98A7] font-bold text-[10px] mt-1.5 leading-none">One-tap access to core services</p>
        </div>
        <div className="pl-2 pr-4 grid grid-cols-3 gap-2.5 mt-2">
          {[
            {
              title: "Maintenance",
              subtitle: "Book now",
              icon: Wrench,
              bg: "from-[#8C9DF9] to-[#7487F5]",
              path: "/services"
            },
            {
              title: "Live Track",
              subtitle: "Real-time",
              icon: Clock,
              bg: "from-[#F2A65A] to-[#E98D32]",
              path: "/profile"
            },
            {
              title: "Road Assist",
              subtitle: "24/7 Rescue",
              icon: ShieldCheck,
              bg: "from-[#57D9A3] to-[#36C28A]",
              path: "/support"
            }
          ].map((card, i) => (
            <div 
              key={i}
              onClick={() => navigate(card.path)}
              className={`relative w-full h-[90px] rounded-[1.1rem] bg-gradient-to-br ${card.bg} overflow-hidden shadow-[0_8px_20px_-6px_rgba(0,0,0,0.15)] active:scale-95 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.3)] hover:brightness-105 flex cursor-pointer group`}
            >
              {/* Concentric Circles Effect */}
              <div className="absolute -bottom-6 -right-6 w-[80px] h-[80px] rounded-full bg-white/15 mix-blend-overlay pointer-events-none transition-transform duration-700 group-hover:scale-[1.15]" />
              <div className="absolute -bottom-10 -right-10 w-[120px] h-[120px] rounded-full bg-white/10 mix-blend-overlay pointer-events-none transition-transform duration-700 group-hover:scale-[1.15]" />
              
              {/* Content */}
              <div className="p-2.5 flex flex-col justify-between w-full h-full z-10">
                 <div>
                   <h4 className="text-white font-black text-[10px] tracking-tight leading-tight">{card.title}</h4>
                   <p className="text-white/80 font-bold text-[7px] mt-0.5">{card.subtitle}</p>
                 </div>
                 
                 <div className="self-end mt-auto">
                    <card.icon size={24} strokeWidth={2.5} className="text-white drop-shadow-xl -rotate-[15deg] group-hover:rotate-0 transition-transform duration-500" />
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promotional Banner Carousel (Reference Match) */}
        <div className="pl-4 mt-3 mb-2">
          <h3 className="text-[#8B98A7] font-[900] text-[9.5px] tracking-[0.25em] uppercase mb-1 leading-none">Featured</h3>
          <h2 className="text-[18px] font-[900] text-[#0F172A] tracking-tight leading-none">Premium Picks</h2>
          <p className="text-[#8B98A7] font-bold text-[10px] mt-1.5 leading-none">Selection from our fleet</p>
        </div>
        <div className="mt-2 w-full h-[200px] relative overflow-hidden group">
          <AnimatePresence mode="wait">
             <motion.div 
               key={currentBanner}
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -50 }}
               transition={{ duration: 0.4 }}
               onClick={() => navigate(banners[currentBanner].path)}
               className="absolute inset-0 flex flex-col justify-center cursor-pointer"
               style={{ backgroundColor: banners[currentBanner].bg }}
             >
                {/* Background Texture Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-transparent pointer-events-none z-0" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                
                {/* Full-Bleed Background Image */}
                <div className="absolute inset-0 z-0">
                   <img 
                     src={banners[currentBanner].img} 
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" 
                     alt="Promo" 
                   />
                   {/* High-Contrast Gradient Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
                </div>

                {/* Content on Top */}
                <div className="p-7 flex flex-col justify-center h-full relative z-20 w-full">
                   <div className="border-l-[6px] border-white pl-4 mb-2">
                      <h2 
                        className="text-white font-[900] text-[22px] leading-[1] tracking-tight italic uppercase drop-shadow-xl"
                        dangerouslySetInnerHTML={{ __html: banners[currentBanner].title }}
                      />
                   </div>
                   
                   <div className="flex flex-col gap-1.5 mt-1.5 ml-1">
                      <div className="flex items-center gap-2 text-white/95">
                         <Clock size={11} className="text-white" strokeWidth={3.5} />
                         <span className="text-[10px] font-black tracking-wide">000 - 1234 - 5678</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/95">
                         <MapPin size={11} className="text-white" strokeWidth={3.5} />
                         <span className="text-[10px] font-bold leading-tight">{banners[currentBanner].desc}</span>
                      </div>
                   </div>

                   <button className="mt-4 bg-black text-white px-8 py-2.5 rounded-none text-[12px] font-black w-max uppercase tracking-[0.15em] active:scale-95 transition-transform shadow-[0_10px_25px_rgba(0,0,0,0.6)] border border-white/20">
                     {banners[currentBanner].cta}
                   </button>
                </div>

                {/* Progress Indicators */}
                <div className="absolute bottom-4 left-7 flex gap-1.5 z-30">
                   {banners.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-[3px] transition-all duration-300 rounded-full ${currentBanner === i ? 'bg-white w-8' : 'bg-white/20 w-3'}`} 
                      />
                   ))}
                </div>

                {/* Logo Watermark */}
                <div className="absolute top-4 right-4 z-20 opacity-20 hidden sm:block">
                   <Logo color="#FFFFFF" className="scale-[0.6] origin-top-right" />
                </div>
             </motion.div>
          </AnimatePresence>
        </div>

        {/* Map Section */}
        <div className="mt-4 mb-3">
          <div className="px-5 mb-3 flex justify-between items-center">
            <div className="flex flex-col">
               <h3 className="text-[#8B98A7] font-[900] text-[9.5px] tracking-[0.25em] uppercase mb-1 leading-none">Map</h3>
               <h2 className="text-[#101828] font-[900] text-[19px] tracking-tight leading-none mb-1">Pin your location <span className="text-[#8B98A7]">...</span></h2>
               <p className="text-[#64748B] font-bold text-[10.5px] leading-tight mt-0.5">Pin your current location, then adjust by dr...</p>
            </div>
            <button className="bg-white px-4 py-2.5 rounded-[1.25rem] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.12)] flex items-center justify-center gap-1.5 active:scale-95 transition-transform border border-black/5 shrink-0">
               <Navigation size={13} className="text-[#475569] -rotate-45" style={{fill: 'currentColor'}} />
               <span className="text-[#0F172A] font-[900] text-[11px] tracking-widest pl-0.5">PIN</span>
            </button>
          </div>
          
          <div className="px-4">
             <div className="w-full h-[180px] rounded-[1.5rem] bg-white border-[1.5px] border-[#003B71]/10 overflow-hidden relative shadow-[0_8px_20px_-6px_rgba(0,0,0,0.1)]">
                {/* Map Embed Dummy/Iframe */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15228.324888122393!2d78.47530665!3d17.382898499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaec39c1%3A0xcfabc99fbd1a8e1!2sKoti%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="pointer-events-none opacity-80"
                ></iframe>
                
                {/* Floating Center Pin Indicator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] flex flex-col items-center justify-center pointer-events-none">
                   <div className="w-12 h-12 bg-white rounded-[1.2rem] shadow-[0_4px_15px_-2px_rgba(0,0,0,0.15)] border border-[#003B71]/10 flex items-center justify-center relative">
                       <MapPin size={24} className="text-[#003B71]" strokeWidth={2.5} />
                   </div>
                   {/* Small shadow beneath the pin */}
                   <div className="w-5 h-1.5 bg-black/10 rounded-full blur-[2px] mt-1.5" />
                </div>

                {/* Floating Pill 'Use my location' */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-[0_4px_10px_-2px_rgba(0,0,0,0.1)] border border-black/5 flex items-center gap-1.5">
                    <span className="text-[#001F3D] font-black text-[10px]">Use my location</span>
                </div>
             </div>
             
             {/* Map Footer Metadata */}
             <div className="px-2 mt-2">
                 <span className="text-[#8B98A7] font-bold text-[8px]">17.38326, 78.48511 - Google Maps</span>
             </div>
          </div>
        </div>

        {/* What do you need today? Section */}
        <div className="px-5 mt-4 mb-2">
          <h3 className="text-[#8B98A7] font-[900] text-[9.5px] tracking-[0.25em] uppercase mb-1 leading-none">Categories</h3>
          <h2 className="text-[18px] font-[900] text-[#0F172A] tracking-tight leading-none">More Services</h2>
          <p className="text-[#8B98A7] font-bold text-[10px] mt-1.5 leading-none">Explore our additional service hubs</p>
          
          <div className="flex overflow-x-auto gap-3.5 pb-2 -mx-5 px-5 scrollbar-hide mt-3">
            {/* Services Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onClick={() => navigate('/services')}
              className="bg-white dark:bg-slate-900/40 rounded-[1.25rem] p-4 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.1)] border border-slate-50 dark:border-white/5 flex flex-col relative overflow-hidden h-[115px] min-w-[155px] flex-shrink-0 cursor-pointer active:scale-[0.98] transition-all group"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={repairsImg} 
                  alt="Services" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/30 to-transparent dark:from-slate-900 dark:via-slate-900/60 z-10" />
              </div>

              <div className="relative z-20">
                <h3 className="text-[17px] font-black text-[#001F3D] dark:text-white leading-tight">Services</h3>
              </div>
              
              <button 
                className="mt-auto bg-[#FFD1A9] text-white px-3.5 py-1.2 rounded-full text-[10px] font-black flex items-center gap-1.5 w-max shadow-md relative z-20 active:scale-95 transition-transform"
              >
                Book Now <ArrowRight size={12} strokeWidth={3.5} />
              </button>
            </motion.div>

            {/* Rental Accessories Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              onClick={() => navigate('/rentals')}
              className="bg-white dark:bg-slate-900/40 rounded-[1.25rem] p-4 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.1)] border border-slate-50 dark:border-white/5 flex flex-col relative overflow-hidden h-[115px] min-w-[155px] flex-shrink-0 cursor-pointer active:scale-[0.98] transition-all group"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={rentalImg} 
                  alt="Rentals" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/30 to-transparent dark:from-slate-900 dark:via-slate-900/60 z-10" />
              </div>

              <div className="relative z-20">
                <h3 className="text-[17px] font-black text-[#001F3D] dark:text-white leading-tight">Rentals</h3>
              </div>
              
              <button 
                className="mt-auto bg-[#C2C2FF] text-white px-3.5 py-1.2 rounded-full text-[10px] font-black flex items-center gap-1.5 w-max shadow-md relative z-20 active:scale-95 transition-transform"
              >
                Rent Now <ArrowRight size={12} strokeWidth={3.5} />
              </button>
            </motion.div>

            {/* Accessories Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onClick={() => navigate('/ecommerce')}
              className="bg-white dark:bg-slate-900/40 rounded-[1.25rem] p-4 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.1)] border border-slate-50 dark:border-white/5 flex flex-col relative overflow-hidden h-[115px] min-w-[155px] flex-shrink-0 cursor-pointer active:scale-[0.98] transition-all group"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={deliveryImg} 
                  alt="Accessories" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/30 to-transparent dark:from-slate-900 dark:via-slate-900/60 z-10" />
              </div>

              <div className="relative z-20">
                <h3 className="text-[17px] font-black text-[#001F3D] dark:text-white leading-tight">Accessories</h3>
              </div>
              
              <button 
                className="mt-auto bg-[#C2FFD8] text-[#1E5128] px-3.5 py-1.2 rounded-full text-[10px] font-black flex items-center gap-1.5 w-max shadow-md relative z-20 active:scale-95 transition-transform"
              >
                Shop Now <ArrowRight size={12} strokeWidth={3.5} />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="px-5 mt-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col">
              <h3 className="text-[#8B98A7] font-[900] text-[9.5px] tracking-[0.25em] uppercase mb-1 leading-none">For You</h3>
              <h2 className="text-[18px] font-[900] text-[#0F172A] tracking-tight leading-none">Recommendations</h2>
              <p className="text-[#8B98A7] font-bold text-[10px] mt-1.5 leading-none">Based on your interests</p>
            </div>
            <button 
              onClick={() => navigate('/ecommerce')}
              className="text-[10px] font-black text-[var(--primary-color)] uppercase tracking-widest self-start mt-1"
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
                className="group w-full bg-[#282828] p-1.5 rounded-[1.25rem] shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] flex flex-col active:scale-[0.98] transition-all"
              >
                <div className="relative w-full h-[105px] flex items-center justify-center bg-[#EBEBEB] rounded-[1rem] overflow-hidden">
                   <img 
                     src={item.image} 
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                     alt={item.title} 
                   />
                   
                   {/* Favorite Icon */}
                   <button className="absolute top-1.5 right-1.5 bg-[#282828]/80 backdrop-blur-sm p-1.5 rounded-[0.6rem] flex items-center justify-center shadow-lg active:scale-90 transition-transform z-10">
                      <Heart size={10} className="text-white" strokeWidth={2.5} />
                   </button>
                </div>

                {/* Footer Info - Updated Layout */}
                <div className="pt-2 px-1 pb-1 flex flex-col flex-1">
                   <h3 className="font-[500] text-[10px] text-white tracking-tight leading-tight truncate">{item.title}</h3>
                   <span className="text-[#9CA3AF] font-[400] text-[8px] mt-0.5 tracking-wide">Premium</span>
                   
                   <div className="flex items-center justify-between mt-auto pt-1.5">
                      <span className="text-[14px] font-[700] text-white tracking-tighter leading-none">{item.price}</span>
                      <button className="bg-white p-2 rounded-[0.8rem] shadow-sm flex items-center justify-center active:scale-90 transition-transform shrink-0">
                          <ShoppingBag size={11} className="text-[#282828]" strokeWidth={2.5} />
                      </button>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
       </motion.div>
      </div>

      {/* Full-Bleed Compact Footer Section */}
      <footer className="bg-[#0F172A] pt-6 pb-20 px-8 text-white">
           <div className="flex flex-col items-center text-center mb-4">
              <Logo color="#FFFFFF" className="mb-1.5 scale-75" />
              <p className="text-slate-500 font-bold text-[10px] leading-relaxed max-w-[240px]">
                The boutique destination for premium vehicle services, rentals, and lifestyle gear.
              </p>
           </div>
           
           <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col gap-1.5">
                 <h4 className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-600 mb-0.5">Explore</h4>
                 <button onClick={() => navigate('/services')} className="text-slate-400 font-bold text-[12px] text-left hover:text-white transition-colors">Services</button>
                 <button onClick={() => navigate('/rentals')} className="text-slate-400 font-bold text-[12px] text-left hover:text-white transition-colors">Rentals</button>
                 <button onClick={() => navigate('/ecommerce')} className="text-slate-400 font-bold text-[12px] text-left hover:text-white transition-colors">Accessories</button>
              </div>
              <div className="flex flex-col gap-1.5">
                 <h4 className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-600 mb-0.5">Support</h4>
                 <button onClick={() => navigate('/support')} className="text-slate-400 font-bold text-[12px] text-left hover:text-white transition-colors">Help Center</button>
                 <button onClick={() => navigate('/profile')} className="text-slate-400 font-bold text-[12px] text-left hover:text-white transition-colors">My Profile</button>
                 <button className="text-slate-400 font-bold text-[12px] text-left hover:text-white transition-colors">Track Order</button>
              </div>
           </div>

           <div className="flex justify-center gap-3 mb-6">
              <div className="w-8 h-8 bg-slate-800/40 rounded-lg flex items-center justify-center active:scale-90 transition-transform border border-white/5">
                 <Instagram size={14} className="text-slate-500" />
              </div>
              <div className="w-8 h-8 bg-slate-800/40 rounded-lg flex items-center justify-center active:scale-90 transition-transform border border-white/5">
                 <Twitter size={14} className="text-slate-500" />
              </div>
              <div className="w-8 h-8 bg-slate-800/40 rounded-lg flex items-center justify-center active:scale-90 transition-transform border border-white/5">
                 <Facebook size={14} className="text-slate-500" />
              </div>
           </div>
           
           <div className="border-t border-white/5 pt-4 flex flex-col items-center gap-2">
              <p className="text-slate-700 font-black text-[8px] tracking-[0.2em] uppercase">© 2026 CLIQGARAGE PVT LTD</p>
              <div className="flex gap-4">
                 <span className="text-slate-800 text-[8px] font-black uppercase tracking-widest">Privacy Policy</span>
                 <span className="text-slate-800 text-[8px] font-black uppercase tracking-widest">Terms of use</span>
              </div>
           </div>
        </footer>
      <BottomNav />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </div>
  );
};

export default Home;
