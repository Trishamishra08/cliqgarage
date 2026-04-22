import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Home, TrendingUp, MessageSquare, User } from 'lucide-react';

const MechanicBottomNav = ({ activeTab, onNavigate }) => {
  const navItems = [
    { id: 'jobs', label: 'Jobs', icon: Wrench },
    { id: 'services', label: 'Services', icon: Home },
    { id: 'earnings', label: 'Earnings', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const getActiveIcon = () => {
    if (activeTab === 'dashboard') return TrendingUp;
    const activeItem = navItems.find(item => item.id === activeTab);
    return activeItem ? activeItem.icon : TrendingUp;
  };

  const ActiveIcon = getActiveIcon();

  const handleNavClick = (itemId) => {
    onNavigate(itemId);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-2 py-2 z-40">
      <div className="flex items-center justify-center gap-16 relative h-20 max-w-full">
        {/* Left items */}
        <div className="flex gap-10 flex-1 justify-center">
          {navItems.slice(0, 2).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0 relative"
              >
                {/* Always visible icon in background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon
                    size={24}
                    className="text-slate-400"
                  />
                </div>

                {/* Animated icon on top */}
                <motion.div
                  animate={isActive ? { 
                    x: `calc(50vw - 120px)`,
                    y: -80,
                    scale: 0,
                    opacity: 0
                  } : { 
                    x: 0, 
                    y: 0,
                    scale: 1,
                    opacity: 1
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="origin-center relative z-10"
                >
                  <Icon
                    size={24}
                    className={`transition-all ${
                      isActive ? 'text-slate-800' : 'text-slate-400'
                    }`}
                  />
                </motion.div>

                {!isActive && (
                  <span className="text-[7px] font-bold uppercase tracking-tight text-slate-300 whitespace-nowrap relative z-20">
                    {item.label}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Center item - Dynamic Icon */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -top-8 z-50"
        >
          <motion.button
            onClick={() => handleNavClick('dashboard')}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg transition-shadow cursor-pointer flex-shrink-0"
            whileHover={{ boxShadow: '0 12px 24px rgba(59, 130, 246, 0.4)' }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              key={activeTab}
            >
              <ActiveIcon size={28} className="text-white" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Right items */}
        <div className="flex gap-10 flex-1 justify-center">
          {navItems.slice(2).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0 relative"
              >
                {/* Always visible icon in background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon
                    size={24}
                    className="text-slate-400"
                  />
                </div>

                {/* Animated icon on top */}
                <motion.div
                  animate={isActive ? { 
                    x: `calc(-50vw + 120px)`,
                    y: -80,
                    scale: 0,
                    opacity: 0
                  } : { 
                    x: 0, 
                    y: 0,
                    scale: 1,
                    opacity: 1
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="origin-center relative z-10"
                >
                  <Icon
                    size={24}
                    className={`transition-all ${
                      isActive ? 'text-slate-800' : 'text-slate-400'
                    }`}
                  />
                </motion.div>

                {!isActive && (
                  <span className="text-[7px] font-bold uppercase tracking-tight text-slate-300 whitespace-nowrap relative z-20">
                    {item.label}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MechanicBottomNav;
