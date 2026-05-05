import React from 'react';
import { Wrench, LayoutGrid, MessageSquare, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const navItems = [
  { icon: Wrench,       label: 'Jobs',     path: '/home'     },
  { icon: LayoutGrid,   label: 'Services', path: '/services' },
  { icon: MessageSquare,label: 'Chat',     path: '/support'  },
  { icon: User,         label: 'Profile',  path: '/profile'  },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate  = useNavigate();

  // Find the active index based on the current URL
  const activeIndex = (() => {
    const exact = navItems.findIndex(i => i.path === location.pathname);
    if (exact !== -1) return exact;
    const sub = navItems.findIndex(
      i => i.path !== '/home' && location.pathname.startsWith(i.path)
    );
    return sub !== -1 ? sub : 0;
  })();

  const ActiveIcon = navItems[activeIndex].icon;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* White Bar Container with Rounded Top Corners */}
      <div className="relative bg-white border-t border-black/5 h-16 flex items-center px-4 rounded-t-[2.5rem] shadow-[0_-15px_40px_rgba(0,0,0,0.08)]">
        
        {/* ── The Jumping Gradient Bubble ── */}
        <div className="absolute inset-0 flex px-4 pointer-events-none">
          <motion.div
            animate={{ x: `${activeIndex * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="w-1/4 h-full flex items-center justify-center"
          >
            <motion.div
              key={activeIndex}
              initial={{ y: 0, scale: 1 }}
              animate={{ 
                y: [0, -38, 0],
                scaleX: [1, 0.7, 1.2, 1],
                scaleY: [1, 1.3, 0.8, 1]
              }}
              transition={{ duration: 0.5, ease: "easeInOut", times: [0, 0.4, 0.8, 1] }}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#6366f1] via-[#8b5cf6] to-[#a855f7] flex items-center justify-center shadow-[0_15px_30px_rgba(99,102,241,0.4)] border-[6px] border-white -mt-12"
            >
              <ActiveIcon size={26} className="text-white" strokeWidth={3} />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Static Navigation Buttons ── */}
        {navItems.map((item, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className="flex-1 h-full flex flex-col items-center justify-center relative z-10 pt-1"
            >
              <item.icon 
                size={22} 
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

export default BottomNav;
