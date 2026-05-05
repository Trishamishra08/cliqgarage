import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-[#F7F2EB] min-h-screen flex font-sans selection:bg-black selection:text-white">
      {/* Sidebar - Fixed Node */}
      <AdminSidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />

      {/* Primary Content Container */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-500">
        <AdminHeader isCollapsed={isCollapsed} />
        
        <main className={`flex-1 p-6 transition-all duration-500 animate-in fade-in slide-in-from-bottom-2 duration-700 ${isCollapsed ? 'ml-20' : 'ml-72'}`}>
          <div className="max-w-[1300px] mx-auto">
            {children}
          </div>
        </main>

        <footer className={`py-4 px-8 border-t border-black/5 text-gray-400 text-[9px] font-bold uppercase tracking-[0.3em] flex justify-between items-center bg-transparent transition-all duration-500 ${isCollapsed ? 'ml-20' : 'ml-72'}`}>
          <span>&copy; {new Date().getFullYear()} CLIQGARAGE • TERMINAL v1.2</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Compliance</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
