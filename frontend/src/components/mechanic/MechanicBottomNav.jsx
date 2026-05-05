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
      {/* White Bar Container with Rounded Top Corners */}
      <div className="relative bg-white border-t border-black/5 h-16 flex items-center px-4 rounded-t-[2.5rem] shadow-[0_-15px_40px_rgba(0,0,0,0.08)]">
        
        {/* ── The Jumping Gradient Bubble ── */}
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
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#6366f1] via-[#8b5cf6] to-[#a855f7] flex items-center justify-center shadow-[0_15px_30px_rgba(99,102,241,0.4)] border-[6px] border-white -mt-12"
            >
              <ActiveIcon size={28} className="text-white" strokeWidth={2.5} />
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
              <item.icon 
                size={24} 
                className={twMerge(
                  "mb-1 transition-all duration-300",
                  isActive ? "opacity-0 scale-50" : "opacity-100 text-[#111827]"
                )} 
                strokeWidth={2} 
              />
              <span className={twMerge(
                "text-[9px] font-black uppercase tracking-wider transition-colors duration-300",
                isActive ? "text-[#6366f1]" : "text-[#111827]"
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

export default MechanicBottomNav;
