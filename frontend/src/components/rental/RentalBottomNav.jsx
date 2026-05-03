import React from 'react';
import { motion } from 'framer-motion';
import { Bike, DollarSign, Calendar, User, LayoutGrid, BarChart2, Car } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const RentalBottomNav = ({ activeTab, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'bikes',     label: 'Fleet',     icon: Car },
    { id: 'bookings',  label: 'Bookings',  icon: Calendar },
    { id: 'earnings',  label: 'Earnings',  icon: BarChart2 },
    { id: 'profile',   label: 'Profile',   icon: User },
  ];

  const getActiveIndex = () => {
    const index = navItems.findIndex(item => item.id === activeTab);
    if (index !== -1) return index;
    // Fallbacks
    if (activeTab === 'pricing' || activeTab === 'availability') return 0;
    if (activeTab === 'history') return 4;
    return 0;
  };

  const activeIndex = getActiveIndex();
  const ActiveIcon = navItems[activeIndex].icon;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      {/* The Ultra-Light Blue Bar Container - Floating Design */}
      <div className="relative bg-white/95 backdrop-blur-xl border border-blue-50 h-20 flex items-center px-2 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        
        {/* ── The Jumping Blue Bubble (Projectile Motion) ── */}
        <div className="absolute inset-0 flex px-2 pointer-events-none">
          <motion.div
            animate={{ x: `${activeIndex * 100}%` }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="w-1/5 h-full flex items-center justify-center"
          >
            <motion.div
              key={activeIndex}
              initial={{ y: 0 }}
              animate={{ 
                y: [0, -42, 0],
                scaleX: [1, 0.8, 1.1, 1],
                scaleY: [1, 1.2, 0.9, 1]
              }}
              transition={{ 
                duration: 0.5, 
                times: [0, 0.5, 1],
                ease: ["easeOut", "easeIn"]
              }}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_10px_25px_rgba(37,99,235,0.4)] border-[5px] border-white -mt-20"
            >
              <ActiveIcon size={24} className="text-white" strokeWidth={2.5} />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Static Navigation Buttons ── */}
        {navItems.map((item, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex-1 h-full flex flex-col items-center justify-center relative z-10 pt-1"
            >
              <div className="h-7 mb-1 flex items-center justify-center">
                <item.icon 
                  size={22} 
                  className={twMerge(
                    "transition-all duration-300",
                    isActive ? "opacity-0 scale-50" : "opacity-100 text-slate-400 group-hover:text-blue-500"
                  )} 
                  strokeWidth={2} 
                />
              </div>
              <span className={twMerge(
                "text-[8px] font-black uppercase tracking-[0.05em] transition-all duration-300",
                isActive ? "text-blue-600 translate-y-1 opacity-0" : "text-slate-400"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RentalBottomNav;
