import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Wrench, 
  ShoppingBag, 
  Bike, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Lock,
  Cpu,
  FlaskConical,
  Server,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';

const menuItems = [
  { 
    group: 'CORE', 
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin/dashboard'
  },
  { 
    group: 'USER COMMAND', 
    name: 'User Management',
    icon: Users,
    subItems: [
      { name: 'Manage Customers', path: '/admin/users' },
      { name: 'KYC Verification', path: '/admin/users?tab=kyc' },
      { name: 'Feedback & Reports', path: '/admin/users?tab=feedback' },
      { name: 'Promo Banners', path: '/admin/users?tab=banners' },
    ]
  },
  { 
    group: 'MECHANIC HUB', 
    name: 'Mechanic Ops',
    icon: Wrench,
    subItems: [
      { name: 'Service Providers', path: '/admin/services' },
      { name: 'Quotes & Tenders', path: '/admin/services?tab=quotes' },
      { name: 'Node Locations', path: '/admin/services?tab=locations' },
      { name: 'Performance Audit', path: '/admin/services?tab=stats' },
    ]
  },
  { 
    group: 'RENTAL SYSTEM', 
    name: 'Bike Rental',
    icon: Bike,
    subItems: [
      { name: 'Fleet Partners', path: '/admin/rentals' },
      { name: 'Booking Monitor', path: '/admin/rentals?tab=bookings' },
      { name: 'Liability Claims', path: '/admin/rentals?tab=claims' },
      { name: 'Penalty Control', path: '/admin/rentals?tab=penalties' },
    ]
  },
  { 
    group: 'COMMERCE', 
    name: 'E-Commerce',
    icon: ShoppingBag,
    subItems: [
      { name: 'Inventory SKU', path: '/admin/ecommerce' },
      { name: 'Order Tracking', path: '/admin/ecommerce?tab=orders' },
      { name: 'Refund Control', path: '/admin/ecommerce?tab=refunds' },
      { name: 'Discount Engine', path: '/admin/ecommerce?tab=coupons' },
    ]
  },
  { 
    group: 'ANALYTICS', 
    name: 'Intelligence',
    icon: BarChart3,
    subItems: [
      { name: 'Global Vitals', path: '/admin/reports' },
      { name: 'Financial Vectors', path: '/admin/reports?tab=revenue' },
      { name: 'System Pulse', path: '/admin/reports?tab=system' },
    ]
  },
  { 
    group: 'TECHNICAL', 
    name: 'Security & QA',
    icon: ShieldCheck,
    subItems: [
      { name: 'Role Control', path: '/admin/settings' },
      { name: 'Security Node', path: '/admin/settings?tab=security' },
      { name: 'Relay Sync', path: '/admin/settings?tab=database' },
    ]
  }
];

const AdminSidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  // Auto-expand the active sub-menu based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find(item => 
      item.subItems?.some(sub => currentPath.startsWith(sub.path.split('?')[0]))
    );
    if (activeItem) {
      setOpenSubmenu(activeItem.name);
    }
  }, [location.pathname]);

  const toggleSubmenu = (name) => {
    if (isCollapsed) {
      onToggle();
      setOpenSubmenu(name);
    } else {
      setOpenSubmenu(openSubmenu === name ? null : name);
    }
  };

  return (
    <aside 
      className={`h-screen bg-[#0F172A] text-white fixed left-0 top-0 flex flex-col z-50 border-r border-white/5 shadow-2xl transition-all duration-500 ease-in-out ${isCollapsed ? 'w-20' : 'w-72'}`}
    >
      {/* Branding & Toggle */}
      <div className={`flex items-center justify-between transition-all duration-500 ${isCollapsed ? 'p-3 justify-center' : 'py-3 px-4 pr-2'}`}>
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <NavLink to="/admin/dashboard" className="flex items-center gap-3 overflow-hidden group">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3"
              >
                <img src={logo} className="w-12 h-12 object-contain group-hover:scale-110 transition-transform" alt="Logo" />
                <div className="flex flex-col min-w-0">
                  <span className="text-xl font-black tracking-tighter text-white leading-none uppercase font-serif whitespace-nowrap">
                    CLIQ<span className="text-slate-400">GARAGE</span>
                  </span>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mt-1 truncate">Terminal Admin</span>
                </div>
              </motion.div>
            </NavLink>
          )}
        </AnimatePresence>
        
        <button 
          onClick={onToggle}
          className={`transition-all text-gray-400 hover:text-white flex-shrink-0 p-1`}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <Menu size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className={`flex-grow overflow-y-auto custom-scrollbar transition-all duration-500 ${isCollapsed ? 'px-2' : 'px-4'}`}>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.name} className="space-y-1">
              {!isCollapsed && (
                <p className="px-5 text-[11px] font-black text-gray-500 uppercase tracking-[0.3em] mt-3 mb-1.5">{item.group}</p>
              )}
              
              {item.subItems ? (
                <div key={`container-${item.name}`}>
                  <button 
                    onClick={() => toggleSubmenu(item.name)}
                    className={`
                      w-full flex items-center rounded-xl transition-all duration-300 group relative
                      ${isCollapsed ? 'justify-center py-3.5 px-0' : 'gap-4 px-5 py-3'}
                      ${openSubmenu === item.name ? 'bg-white/5 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                    `}
                  >
                    <item.icon size={22} className={openSubmenu === item.name ? 'text-white' : 'text-gray-400 group-hover:text-white'} />
                    {!isCollapsed && (
                      <>
                        <span className="font-roboto font-bold text-[15px] tracking-tight whitespace-nowrap">{item.name}</span>
                        <ChevronRight size={16} className={`ml-auto transition-transform duration-300 ${openSubmenu === item.name ? 'rotate-90' : ''}`} />
                      </>
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {openSubmenu === item.name && !isCollapsed && (
                      <motion.ul 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-black/10 rounded-xl mx-1 mt-1 py-1"
                      >
                        {item.subItems.map((sub) => (
                          <li key={sub.name}>
                            <NavLink 
                              to={sub.path}
                              className={({ isActive }) => `
                                flex items-center px-8 py-2.5 text-[13px] font-bold tracking-tight transition-all
                                ${isActive ? 'text-white bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                              `}
                            >
                              {sub.name}
                            </NavLink>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink to={item.path} key={item.path}>
                  {({ isActive }) => (
                    <div className={`
                      flex items-center rounded-xl transition-all duration-300 group relative
                      ${isCollapsed ? 'justify-center py-3.5 px-0' : 'gap-4 px-5 py-3'}
                      ${isActive 
                        ? 'bg-white text-black shadow-2xl shadow-white/10 scale-[1.02]' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'}
                    `}>
                      <item.icon size={isActive ? 22 : 20} className={isActive ? 'text-black' : 'text-gray-400 group-hover:text-white'} />
                      {!isCollapsed && (
                        <span className="font-roboto font-bold text-[15px] tracking-tight whitespace-nowrap">{item.name}</span>
                      )}
                      {isActive && !isCollapsed && (
                        <motion.div layoutId="activeIndicator" className="ml-auto w-1 h-5 bg-black rounded-full" />
                      )}
                    </div>
                  )}
                </NavLink>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className={`p-4 border-t border-white/5 mt-auto transition-all duration-500 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <button className={`flex items-center transition-colors rounded-xl hover:bg-red-500/10 group ${isCollapsed ? 'p-3' : 'gap-4 px-5 py-4 w-full text-gray-400 hover:text-red-400'}`}>
          <LogOut size={22} className={`${isCollapsed ? 'text-gray-400 hover:text-red-400' : 'group-hover:translate-x-1'} transition-transform`} />
          {!isCollapsed && (
            <span className="font-roboto font-black text-[14px] uppercase tracking-widest">Terminate</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
