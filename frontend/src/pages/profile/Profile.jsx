import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, History, Bike, Wallet, Gift, Bell, Settings, 
  HelpCircle, ChevronRight, Edit3, LogOut, X,
  ShieldCheck, Star, Package, Heart, CreditCard, ChevronLeft
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

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
      title: 'Activity Hub',
      items: [
        { icon: History, label: 'Service History', desc: 'Maintenance Logs', path: '/history' },
        { icon: Bike, label: 'My Rentals', desc: 'Active & Past Bookings', path: '/bookings' },
        { icon: Heart, label: 'Wishlist', desc: 'Saved Automotive Gear', path: '/wishlist' },
      ]
    },
    {
      title: 'Financials',
      items: [
        { icon: CreditCard, label: 'Payment Methods', desc: 'UPI & Card Terminals', path: '/payments' },
        { icon: Wallet, label: 'Cliq Credits', desc: 'Redeem & Top-up', path: '/payments' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Settings, label: 'Account Settings', desc: 'Security & Profile', path: '/profile/edit' },
        { icon: HelpCircle, label: 'Support Center', desc: 'FAQ & Emergency Helplines', path: '/support', badge: 'SOS' },
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-24 font-['Outfit']">
      {/* 🚀 Premium Branding Header */}
      <div className="px-6 pt-10 pb-5 bg-[var(--header-color)] flex items-center justify-between sticky top-0 z-40 border-b border-white/5">
          <button 
             onClick={() => navigate(-1)}
             className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white border border-white/10"
          >
             <ChevronLeft size={16} />
          </button>
          <div className="text-center">
             <span className="text-[7px] font-bold tracking-[0.3em] text-[var(--primary-color)] uppercase block mb-0.5 italic">Pilot Terminal</span>
             <h2 className="text-[10px] font-semibold text-white uppercase tracking-widest leading-none">Your Profile</h2>
          </div>
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[var(--primary-color)] border border-white/10">
             <ShieldCheck size={14} />
          </div>
       </div>

      {/* High-Impact Profile Card */}
      <div className="px-5 py-6">
        <div className="bg-gradient-to-br from-[var(--primary-color)] to-[#0066FF] rounded-[4rem] p-7 flex items-center gap-6 relative overflow-hidden shadow-2xl shadow-[var(--primary-color)]/20 border border-white/10">
           <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />
           
           <div className="relative w-22 h-22 shrink-0">
              <div className="w-full h-full bg-white/15 p-1.5 rounded-full backdrop-blur-md border border-white/20 shadow-2xl">
                 <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white/10">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Johan" alt="avatar" className="scale-110" />
                 </div>
              </div>
              <motion.div whileTap={{ scale: 0.9 }} className="absolute bottom-0 right-0 w-6 h-6 bg-white text-[var(--primary-color)] rounded-full flex items-center justify-center shadow-lg border border-[var(--primary-color)]/10 cursor-pointer">
                 <Edit3 size={10} />
              </motion.div>
           </div>

           <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1.5">
                 <h2 className="text-xl font-black text-white leading-none tracking-tight uppercase italic">{user?.name || 'Johan Das'}</h2>
                 <div className="w-3.5 h-3.5 bg-white/20 rounded-full flex items-center justify-center"><Star size={7} fill="white" className="text-white" /></div>
              </div>
              <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em] leading-none mb-4">{user?.phone || 'Elite Pilot'}</p>
              
              <div className="flex gap-2">
                 <div className="px-3 py-1 bg-emerald-500 text-white rounded-full flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                    <span className="text-[6.5px] font-black uppercase tracking-widest">Active Pilot</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Dynamic Menu Aggregator */}
      <div className="flex flex-col gap-9 px-5 py-4">
         {sections.map((section, idx) => (
           <div key={idx} className="flex flex-col gap-4">
              <h3 className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.4em] px-1 italic">{section.title}</h3>
              <div className="flex flex-col gap-2">
                 {section.items.map((item, i) => (
                   <motion.button 
                     key={i} 
                     onClick={() => navigate(item.path)}
                     className="flex items-center justify-between p-3.5 bg-white border border-slate-50 rounded-2xl group active:scale-[0.98] transition-all shadow-sm"
                   >
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-50 group-hover:bg-[var(--primary-color)]/5 group-hover:text-[var(--primary-color)] transition-all">
                            <item.icon size={18} />
                         </div>
                         <div className="text-left">
                           <span className="text-[10px] font-bold text-[var(--primary-color)] uppercase tracking-tight block leading-none mb-1">{item.label}</span>
                           <span className="text-[7.5px] font-semibold text-slate-400 uppercase tracking-widest leading-none">{item.desc}</span>
                         </div>
                      </div>
                      <div className="flex items-center gap-3">
                         {item.badge && (
                           <span className="px-2 py-0.5 bg-red-50 text-red-500 text-[7px] font-black rounded-full border border-red-100 uppercase tracking-widest">
                              {item.badge}
                           </span>
                         )}
                         <ChevronRight size={14} className="text-slate-200 group-hover:text-[var(--primary-color)] transition-colors" />
                      </div>
                   </motion.button>
                 ))}
              </div>
           </div>
         ))}
      </div>

      {/* Sign Out Terminal */}
      <div className="mt-auto px-5 pt-8 pb-12">
         <button 
           onClick={handleLogout}
           className="w-full h-12 flex items-center justify-center gap-4 bg-white border border-red-50 text-red-400 rounded-2xl hover:bg-red-50 transition-colors active:scale-[var(--primary-color)] group"
         >
            <LogOut size={16} className="group-hover:rotate-12 transition-transform" />
            <span className="text-[9px] font-black uppercase tracking-widest">De-authenticate Terminal</span>
         </button>
      </div>
    </div>
  );
};

export default Profile;
