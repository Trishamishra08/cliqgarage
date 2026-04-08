import React from 'react';
import { Home, Bookmark, Heart, User, Bike } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Bike, label: 'Rentals', path: '/rentals' },
    { icon: Bookmark, label: 'History', path: '/bookings' },
    { icon: Heart, label: 'Saved', path: '/wishlist' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md transition-all duration-300">
      <div className="bg-[var(--card-bg)]/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-2 flex items-center justify-between shadow-2xl">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={twMerge(
                "group relative flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-500",
                isActive 
                  ? "bg-[var(--primary-color)] text-white shadow-lg shadow-[var(--primary-color)]/20 scale-105" 
                  : "text-zinc-400 hover:text-[var(--primary-color)]"
              )}
            >
              <item.icon size={20} className={twMerge("transition-transform duration-300", isActive && "scale-110")} />
              {isActive && (
                <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
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
