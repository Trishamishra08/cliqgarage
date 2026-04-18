import React from 'react';
import { Home, Bookmark, Heart, User, Bike } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Bike, label: 'Rentals', path: '/rentals' },
    { icon: Heart, label: 'Saved', path: '/wishlist' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md transition-all duration-300">
      <div className="bg-[#121212]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-2 flex items-center justify-between shadow-[0_20px_40px_-5px_rgba(0,0,0,0.5)] relative">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={twMerge(
                "relative flex items-center justify-center gap-2 px-5 py-3 rounded-full transition-all duration-300 z-10",
                isActive ? "text-[#001F3D]" : "text-zinc-400 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="bottom-nav-indicator"
                  className="absolute inset-0 bg-white rounded-full -z-10 shadow-lg"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon size={20} className={twMerge("transition-transform duration-300 relative z-20", isActive && "scale-105")} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && (
                <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap animate-in fade-in relative z-20">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default BottomNav;
