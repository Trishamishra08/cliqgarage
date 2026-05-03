import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, User, Settings, Package, Heart, CreditCard, 
  HelpCircle, LogOut, ChevronRight, Star, History, Wrench, Bike, Clock 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { icon: User, label: 'Profile Settings', desc: 'Account & Identity', path: '/profile' },
    { icon: Package, label: 'Accessories Store', desc: 'Gear & parts', path: '/ecommerce' },
    { icon: History, label: 'Service History', desc: 'Past maintenance', path: '/history' },
    { icon: Bike, label: 'My Rentals', desc: 'Book your elite steed', path: '/rentals' },
    { icon: CreditCard, label: 'Payments', desc: 'Manage methods', path: '/payments' },
    { icon: Heart, label: 'Wishlist', desc: 'Your saved items', path: '/wishlist' },
    { icon: HelpCircle, label: 'Support center', desc: 'Help & feedback', path: '/support' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Balanced Premium Sidebar Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[75%] z-[70]"
          >
            <div className="flex flex-col h-full bg-[var(--bg-color)] shadow-2xl border-l border-white/5">
              {/* Profile Header */}
              <div className="bg-gradient-to-br from-[#500724] via-[#831843] to-[#500724] p-5 rounded-br-[2.5rem] relative overflow-hidden shadow-2xl border-b border-white/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                
                <div className="flex items-center gap-3 relative">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 p-1 backdrop-blur-md border border-white/30 shadow-2xl">
                    <div className="w-full h-full rounded-xl bg-white flex items-center justify-center overflow-hidden">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
                    </div>
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <h3 className="text-white font-black text-xs uppercase tracking-widest leading-none truncate">Johan Das</h3>
                    <span className="text-white/60 text-[7.5px] font-black uppercase tracking-[0.25em] mt-1.5 flex items-center gap-1.5 whitespace-nowrap">
                      <Star size={8} fill="white" className="text-white" /> Pro Rider
                    </span>
                  </div>
                </div>

                <button 
                  onClick={onClose}
                  className="absolute top-5 right-5 w-7 h-7 rounded-full bg-black/10 flex items-center justify-center text-white active:scale-90"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="px-4 py-5 overflow-y-auto no-scrollbar">
                <div className="grid gap-0.5">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        navigate(item.path);
                        onClose();
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-lg text-[var(--text-dim)] hover:text-[#9D174D] hover:bg-[#9D174D]/5 transition-all group active:scale-[0.98]"
                    >
                      <div className="w-8 h-8 rounded-lg bg-zinc-100/50 dark:bg-white/5 flex items-center justify-center group-hover:bg-[#9D174D] text-[#9D174D] group-hover:text-white transition-all border border-black/5 dark:border-white/5 shadow-sm">
                        <item.icon size={15} />
                      </div>
                      <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px] font-black uppercase tracking-[0.15em]">{item.label}</span>
                        <span className="text-[7.5px] font-bold uppercase text-zinc-400 dark:text-zinc-500 mt-0.5">{item.desc}</span>
                      </div>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight size={13} className="text-[#9D174D]" />
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="mt-3 p-3 bg-gradient-to-br from-zinc-900 to-black rounded-2xl relative overflow-hidden shadow-xl border border-white/5">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#9D174D]/10 rounded-full -mr-10 -mt-10 blur-2xl" />
                  
                  <div className="relative z-10 flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-0.5">
                         <HelpCircle className="text-[#9D174D]" size={12} />
                         <h4 className="text-white font-black text-[9px] uppercase tracking-widest">Elite Support</h4>
                      </div>
                      <p className="text-white/30 text-[6px] font-bold uppercase tracking-widest leading-none">Emergency Roadside Assistance</p>
                    </div>
                    
                    <button className="px-5 h-9 bg-gradient-to-r from-[#9D174D] to-[#500724] rounded-xl text-white text-[8px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all border border-white/10 shrink-0">
                      Connect
                    </button>
                  </div>
                </div>

                <div className="mt-3 border-t border-white/5 pt-3">
                  <button 
                    onClick={() => {
                      localStorage.removeItem('hasOnboarded');
                      navigate('/login');
                      onClose();
                    }}
                    className="flex items-center gap-3 p-3 w-full rounded-xl text-red-500/80 hover:bg-red-500/5 transition-all active:scale-95 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all border border-red-500/10">
                      <LogOut size={14} />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.15em]">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
