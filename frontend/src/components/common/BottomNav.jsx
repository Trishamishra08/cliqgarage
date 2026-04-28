import React from 'react';
import { Wrench, LayoutGrid, MessageSquare, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <div className="relative bg-[#111111]/95 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] h-16 flex items-center shadow-[0_24px_48px_rgba(0,0,0,0.55)]">
        
        {/* ── The Jumping Bubble Layer ── */}
        <div className="absolute inset-0 flex px-2 pointer-events-none">
          <motion.div
            animate={{ x: `${activeIndex * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="w-1/4 h-full flex items-center justify-center"
          >
            <motion.div
              key={activeIndex} // Triggers the jump on every index change
              initial={{ y: 0, scale: 1 }}
              animate={{ 
                y: [0, -48, 0],
                scaleX: [1, 0.7, 1.2, 1],
                scaleY: [1, 1.3, 0.8, 1]
              }}
              transition={{ duration: 0.5, ease: "easeInOut", times: [0, 0.4, 0.8, 1] }}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#3B82F6] to-[#7C3AED] border-4 border-[#111111] flex items-center justify-center shadow-[0_12px_24px_rgba(59,130,246,0.5)]"
            >
              <ActiveIcon size={22} className="text-white" strokeWidth={3} />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Static Navigation Buttons ── */}
        {navItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => navigate(item.path)}
            className="flex-1 h-full flex flex-col items-center justify-center relative z-10"
          >
            <item.icon size={20} className="text-zinc-500" strokeWidth={2} />
            <span className="text-[8px] font-black uppercase tracking-[0.1em] mt-1 text-zinc-600">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
