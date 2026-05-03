import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, LayoutGrid, User, Home, Package, BarChart2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const MechanicBottomNav = ({ activeTab, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'jobs',      label: 'Jobs',      icon: Package },
    { id: 'services',  label: 'Services',  icon: Wrench },
    { id: 'earnings',  label: 'Earnings',  icon: BarChart2 },
    { id: 'profile',   label: 'Profile',   icon: User },
  ];

  const getActiveIndex = () => {
    const index = navItems.findIndex(item => item.id === activeTab);
    if (index !== -1) return index;
    if (activeTab === 'dashboard') return 0;
    if (activeTab === 'settings') return 3;
    return 0;
  };

  const activeIndex = getActiveIndex();
  const ActiveIcon = navItems[activeIndex].icon;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* The Ultra-Light Mustard Bar Container */}
      <div className="relative bg-[#FFFEF7] border-t border-black/5 h-20 flex items-center px-4 shadow-[0_-10px_30px_rgba(0,0,0,0.06)]">
        
        {/* ── The Jumping Blue Bubble (Projectile Motion) ── */}
        <div className="absolute inset-0 flex px-4 pointer-events-none">
          <motion.div
            animate={{ x: `${activeIndex * 100}%` }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="w-1/5 h-full flex items-center justify-center"
          >
            <motion.div
              key={activeIndex}
              initial={{ y: 0 }}
              animate={{ 
                y: [0, -38, 0],
                scaleX: [1, 0.8, 1.1, 1],
                scaleY: [1, 1.2, 0.9, 1]
              }}
              transition={{ 
                duration: 0.5, 
                times: [0, 0.5, 1],
                ease: ["easeOut", "easeIn"]
              }}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-400 via-indigo-400 to-purple-500 flex items-center justify-center shadow-[0_8px_20px_rgba(59,130,246,0.3)] border-[6px] border-[#FFFEF7] -mt-16"
            >
              <ActiveIcon size={28} className="text-white" strokeWidth={2} />
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
              className="flex-1 h-full flex flex-col items-center justify-center relative z-10"
            >
              <item.icon 
                size={26} 
                className={twMerge(
                  "mb-1 transition-opacity duration-300",
                  isActive ? "opacity-0" : "opacity-100 text-black"
                )} 
                strokeWidth={2} 
              />
              <span className="text-[10px] font-bold uppercase tracking-wider text-black">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MechanicBottomNav;
