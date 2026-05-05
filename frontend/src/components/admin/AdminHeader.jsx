import React from 'react';
import { Bell, Search, User, ChevronDown, Settings, LayoutGrid } from 'lucide-react';

const AdminHeader = ({ isCollapsed }) => {
  return (
    <header className={`h-16 bg-white/80 backdrop-blur-xl border-b border-black/5 flex items-center justify-between px-8 sticky top-0 z-40 transition-all duration-500 ${isCollapsed ? 'ml-20' : 'ml-72'}`}>
      {/* Brand & Context */}
      <div className="flex items-center gap-4">
        <div className="p-2 bg-black text-white rounded-lg shadow-lg">
          <LayoutGrid size={18} />
        </div>
        <div className="flex flex-col">
          <h2 className="text-sm font-black text-black tracking-tighter uppercase font-serif">Admin Panel</h2>
          <span className="text-[7px] font-bold text-gray-400 uppercase tracking-[0.3em]">System Overview</span>
        </div>
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-8">
        {/* Search Input - Professional */}
        <div className="flex items-center bg-gray-100/80 rounded-xl px-5 py-2 w-80 transition-all focus-within:ring-2 focus-within:ring-black/5 focus-within:bg-white focus-within:shadow-md group border border-transparent focus-within:border-black/5">
          <Search size={15} className="text-gray-400 group-focus-within:text-black transition-colors" />
          <input 
            type="text" 
            placeholder="SEARCH RECORDS..." 
            className="bg-transparent border-none focus:ring-0 text-[10px] ml-3 w-full text-black placeholder:text-gray-400 font-bold uppercase tracking-widest font-roboto"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2.5 text-gray-400 hover:text-black hover:bg-black/5 rounded-xl transition-all relative">
            <Bell size={18} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2.5 text-gray-400 hover:text-black hover:bg-black/5 rounded-xl transition-all">
            <Settings size={18} />
          </button>
        </div>

        {/* User Identity - Elevated */}
        <div className="flex items-center gap-3 pl-6 border-l border-black/5 group cursor-pointer hover:opacity-80 transition-opacity">
          <div className="flex flex-col text-right">
            <span className="text-xs font-black text-black leading-none font-roboto">L. Morgado</span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Super Admin</span>
          </div>
          <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-black/5 shadow-md group-hover:shadow-lg transition-all duration-300">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" 
              alt="Admin" 
              className="w-full h-full object-cover"
            />
          </div>
          <ChevronDown size={14} className="text-gray-400 group-hover:text-black transition-colors" />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
