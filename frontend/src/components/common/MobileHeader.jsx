import React, { useState } from 'react';
import { Search, User, Wallet, UserCircle } from 'lucide-react';
import Logo from './Logo';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const MobileHeader = ({ showMenu = true }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--header-color)] dark:bg-[var(--header-color)]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-white/5 transition-colors duration-300">
        <div className="flex items-center gap-3">
          {showMenu && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="w-10 h-10 flex flex-col items-start justify-center gap-1 text-white active:scale-95 bg-white/10 dark:bg-white/5 rounded-xl px-2.5 border border-white/10"
            >
              <div className="w-5 h-0.5 bg-white rounded-full" />
              <div className="w-3.5 h-0.5 bg-[var(--primary-color)] rounded-full" />
              <div className="w-4 h-0.5 bg-white rounded-full" />
            </button>
          )}
        </div>

        <div className="absolute left-[47%] -translate-x-1/2 w-max">
          <Logo horizontal className="scale-[1.05]" />
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 bg-white/10 dark:bg-white/5 rounded-xl flex items-center justify-center text-white border border-white/10 active:scale-95"
          >
            <UserCircle size={18} />
          </button>
        </div>
      </div>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </>
  );
};

export default MobileHeader;
