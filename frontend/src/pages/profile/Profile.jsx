import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, BookOpen, Heart, Wallet, Gift, Bell, Settings, 
  HelpCircle, ChevronRight, Edit3, LogOut, X
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const sections = [
    {
      title: 'TRAVEL & STAYS',
      items: [
        { icon: BookOpen, label: 'My Bookings', path: '/services' },
        { icon: Heart, label: 'Saved Places', path: '/' },
        { icon: Wallet, label: 'View Wallet', path: '/' },
      ]
    },
    {
      title: 'GROW WITH RUKKO',
      items: [
        { icon: Gift, label: 'Refer & Earn', path: '/' },
      ]
    },
    {
      title: 'APP SETTINGS',
      items: [
        { icon: Bell, label: 'Notifications', path: '/', badge: 2 },
        { icon: Settings, label: 'Settings', path: '/' },
        { icon: HelpCircle, label: 'Need Help?', path: '/' },
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="px-5 h-16 flex items-center justify-between border-b border-slate-50">
        <Logo small />
        <button className="w-10 h-10 flex items-center justify-center text-slate-400">
           <X size={24} />
        </button>
      </div>

      {/* Profile Card */}
      <div className="px-5 py-6">
        <div className="bg-blue-900 rounded-[2.5rem] p-6 flex items-center gap-5 relative overflow-hidden shadow-lg shadow-blue-900/20">
           <div className="relative w-20 h-20 shrink-0">
              <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center border-2 border-white/20 overflow-hidden">
                 <User size={40} className="text-white" />
              </div>
              <Link to="/profile/edit" className="absolute bottom-0 right-0 w-8 h-8 bg-white/20 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white">
                 <Edit3 size={14} />
              </Link>
           </div>
           <div className="flex-grow">
              <h2 className="text-xl font-black text-white leading-tight">{user?.name || 'Hritik raghuwanshi'}</h2>
              <p className="text-sm font-bold text-white/60 mt-0.5">{user?.phone || '6260491554'}</p>
           </div>
           <Link to="/profile/edit" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white border border-white/10 active:scale-95 transition-all">
              <Edit3 size={18} />
           </Link>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="flex flex-col gap-8 px-5 py-4">
         {sections.map((section, idx) => (
           <div key={idx} className="flex flex-col gap-4">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{section.title}</h3>
              <div className="flex flex-col gap-6">
                 {section.items.map((item, i) => (
                   <button key={i} className="flex items-center justify-between group active:scale-[0.98] transition-all">
                      <div className="flex items-center gap-5">
                         <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-900 transition-all">
                            <item.icon size={20} />
                         </div>
                         <span className="text-base font-black text-slate-800 tracking-tight">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-3">
                         {item.badge && (
                           <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
                              {item.badge}
                           </span>
                         )}
                         <ChevronRight size={18} className="text-slate-300" />
                      </div>
                   </button>
                 ))}
              </div>
           </div>
         ))}
      </div>

      {/* Logout Footer */}
      <div className="mt-auto px-5 pt-8 pb-12 border-t border-slate-50">
         <button 
           onClick={handleLogout}
           className="flex items-center gap-4 text-slate-400 font-bold text-sm hover:text-red-500 transition-colors"
         >
            <LogOut size={18} />
            <span>Sign out from account</span>
         </button>
      </div>
    </div>
  );
};

const Logo = ({ small }) => (
  <div className="flex items-center gap-2">
     <div className="w-8 h-8 rounded-lg bg-blue-900 flex items-center justify-center text-white overflow-hidden p-1">
        <svg viewBox="0 0 100 100" fill="currentColor">
           <path d="M50 0 L100 50 L50 100 L0 50 Z" />
        </svg>
     </div>
     <div className="flex flex-col leading-none">
        <span className="text-lg font-black tracking-tighter text-blue-950 uppercase">RUKKO<span className="text-blue-600">.</span></span>
        <span className="text-[6px] font-bold text-slate-400 uppercase tracking-widest">RUKKO. BOOK KARO. RELAX KARO.</span>
     </div>
  </div>
);
export default Profile;
