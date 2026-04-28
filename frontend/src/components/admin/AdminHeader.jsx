import React from 'react';
import { Bell, Search, User, ChevronDown, Mail, Settings, LayoutGrid } from 'lucide-react';

const AdminHeader = () => {
  return (
    <header className="h-16 bg-white/50 backdrop-blur-md border-b border-black/5 flex items-center justify-between px-8 sticky top-0 z-40 ml-60 transition-all">
      {/* Brand & Context */}
      <div className="flex items-center gap-3">
        <LayoutGrid size={18} className="text-black" />
        <h2 className="text-sm font-bold text-black tracking-tight uppercase">Terminal</h2>
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-6">
        {/* Search Input - Compact */}
        <div className="flex items-center bg-black/5 rounded-full px-4 py-1.5 w-60 transition-all focus-within:ring-1 focus-within:ring-black/10 focus-within:bg-white focus-within:shadow-sm group">
          <Search size={14} className="text-gray-400 group-focus-within:text-black transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none focus:ring-0 text-[11px] ml-2 w-full text-black placeholder:text-gray-400 font-bold uppercase tracking-widest"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <button className="p-2 text-gray-400 hover:text-black hover:bg-black/5 rounded-xl transition-all">
            <Mail size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-black hover:bg-black/5 rounded-xl transition-all relative">
            <Bell size={16} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-pink-500 rounded-full border border-white"></span>
          </button>
          <button className="p-2 text-gray-400 hover:text-black hover:bg-black/5 rounded-xl transition-all">
            <Settings size={16} />
          </button>
        </div>

        {/* User Identity - Compact */}
        <div className="flex items-center gap-2 pl-4 border-l border-black/5 group cursor-pointer">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-black/5 shadow-sm group-hover:scale-105 transition-transform">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" 
              alt="Admin" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-black text-black leading-none">L. Morgado</span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
