import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Wrench, 
  ShoppingBag, 
  Bike, 
  BarChart3, 
  Settings, 
  LogOut,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

const AdminSidebar = () => {
  const menuItems = [
    { group: 'MAIN MENU', items: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard', color: 'bg-[#B4D4FF]' },
      { name: 'Partners', icon: Users, path: '/admin/users', color: 'bg-[#F9E2AF]' },
      { name: 'Services', icon: Wrench, path: '/admin/services', color: 'bg-[#D1B3FF]' },
      { name: 'Earnings', icon: ShoppingBag, path: '/admin/ecommerce', color: 'bg-[#FFCBA4]' },
      { name: 'Rentals', icon: BarChart3, path: '/admin/rentals', color: 'bg-[#FFB4C2]' },
    ]},
    { group: 'PREFERENCES', items: [
      { name: 'Support', icon: MessageSquare, path: '/admin/support', color: 'bg-gray-200' },
      { name: 'Settings', icon: Settings, path: '/admin/settings', color: 'bg-gray-200' },
    ]}
  ];

  return (
    <aside className="w-64 h-screen bg-white text-black fixed left-0 top-0 flex flex-col z-50 border-r border-black/10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* Branding */}
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center text-white shadow-xl rotate-3">
            <ShieldCheck size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-black">
            cliq<span className="text-gray-300 font-light">garage</span>
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-grow px-4 overflow-y-auto custom-scrollbar space-y-8 mt-2">
        {menuItems.map((group) => (
          <div key={group.group}>
            <p className="px-5 text-[10px] font-bold text-gray-300 uppercase tracking-[0.25em] mb-4">{group.group}</p>
            <ul className="space-y-1.5">
              {group.items.map((item) => (
                <li key={item.name}>
                  <NavLink to={item.path}>
                    {({ isActive }) => (
                      <div className={`
                        flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300 group
                        ${isActive 
                          ? 'bg-black text-white shadow-2xl shadow-black/20 scale-[1.02]' 
                          : 'text-gray-400 hover:text-black hover:bg-black/5'}
                      `}>
                        <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20' : item.color + ' opacity-50'} transition-all`}>
                          <item.icon size={16} className={isActive ? 'text-white' : 'text-black'} />
                        </div>
                        <span className="font-bold text-sm tracking-tight">{item.name}</span>
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]" />
                        )}
                      </div>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Profile Node */}
      <div className="p-5 m-5 bg-[#F7F2EB] rounded-[2rem] border border-black/5 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-white p-1 shadow-sm">
             <div className="w-full h-full rounded-full bg-gray-100 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" />
             </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-black leading-none">Mason Walker</span>
            <span className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-widest">ID: 8829-X</span>
          </div>
        </div>
        <button className="w-full py-2.5 bg-white rounded-xl text-[10px] font-bold uppercase tracking-widest text-black shadow-sm border border-black/5 hover:bg-black hover:text-white transition-all">
          Profile Node
        </button>
      </div>

      {/* Logout */}
      <div className="p-6 border-t border-black/5">
        <button className="flex items-center gap-4 text-gray-400 hover:text-red-500 transition-colors w-full px-5 py-3 rounded-2xl hover:bg-red-50 group">
          <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
          <span className="font-bold text-sm tracking-tight">Terminate</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
