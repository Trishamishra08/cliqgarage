import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Bike, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Edit2,
  MapPin,
  Calendar,
  MoreHorizontal,
  ChevronRight,
  ArrowUpRight,
  Target,
  Zap,
  MousePointer2,
  Maximize2,
  Layers,
  Archive,
  AlertCircle,
  PauseCircle,
  BarChart3,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, change, icon: Icon, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className={`${color} p-2.5 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer relative group border border-white/5 flex flex-col justify-between h-24`}
  >
    <div className="flex justify-between items-start">
      <div className="w-7 h-7 rounded-md bg-white/40 flex items-center justify-center text-black shadow-sm">
        <Icon size={14} />
      </div>
      <button className="p-1 rounded-full bg-white/20 text-black/30 hover:bg-white hover:text-black transition-all">
        <Maximize2 size={8} />
      </button>
    </div>
    
    <div>
      <p className="text-black/50 text-[8px] font-black uppercase tracking-widest leading-tight">{title}</p>
      <div className="flex items-baseline gap-1.5 mt-0.5">
        <h3 className="text-lg font-black text-black leading-none">{value}</h3>
        <span className="text-black/60 text-[7px] font-bold">+{change}</span>
      </div>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Sales', value: '₹1,284', change: '30%', icon: DollarSign, color: 'bg-[#F9E2AF]', delay: 0 },
    { title: 'Total Making', value: '₹42,215', change: '30%', icon: Layers, color: 'bg-[#B4D4FF]', delay: 0.05 },
    { title: 'Today\'s Sales', value: '₹124', change: '30%', icon: ShoppingBag, color: 'bg-[#D1B3FF]', delay: 0.1 },
    { title: 'Order not Initiated', value: '₹3,842', change: '30%', icon: Archive, color: 'bg-[#FFCBA4]', delay: 0.15 },
    { title: 'Delayed Orders', value: '₹845.84', change: '30%', icon: AlertCircle, color: 'bg-[#F4A7B9]', delay: 0.2 },
    { title: 'Jobs on Hold', value: '₹45.82', change: '30%', icon: PauseCircle, color: 'bg-[#FFB4C2]', delay: 0.25 },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4 pb-4 -mt-2">
        
        {/* Unified Business Matrix Section */}
        <div className="bg-white p-4 rounded-xl border border-black/5 shadow-sm space-y-4">
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center shadow-lg">
                <BarChart3 size={16} />
              </div>
              <div>
                <h1 className="text-base font-black text-black tracking-tighter leading-none uppercase font-serif">Business Summary</h1>
                <p className="text-[7px] font-bold text-gray-300 uppercase tracking-[0.3em] mt-1">Operational Matrix v1.2</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              <button className="p-1.5 bg-gray-50 border border-black/5 rounded-lg text-black hover:bg-black hover:text-white transition-all shadow-sm">
                <Edit2 size={12} />
              </button>
              <button className="px-3 py-1.5 bg-black text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-md flex items-center gap-2">
                <Zap size={12} />
                Relay Mode
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Intelligence Terminal with Graph */}
          <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow-sm border border-black/5 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center text-white">
                  <TrendingUp size={14} />
                </div>
                <h3 className="text-xs font-black text-black uppercase tracking-tight font-serif">Market Intelligence</h3>
              </div>
              <div className="flex gap-2">
                 <button className="px-2 py-1 bg-black text-white text-[7px] font-black uppercase rounded">Live</button>
                 <button className="px-2 py-1 bg-gray-50 text-gray-400 text-[7px] font-black uppercase rounded">History</button>
              </div>
            </div>

            {/* Simulated Vector Graph */}
            <div className="relative h-48 w-full bg-gray-50/30 rounded-xl border border-black/5 flex items-end justify-between p-4 overflow-hidden group">
               <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <TrendingUp size={150} className="-rotate-12" />
               </div>
               
               {[65, 45, 78, 52, 90, 65, 82, 45, 60, 85, 70, 95].map((val, i) => (
                 <div key={i} className="flex flex-col items-center gap-2 w-full max-w-[20px] h-full justify-end">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${val}%` }}
                      transition={{ delay: 0.5 + (i * 0.05), duration: 1, ease: "circOut" }}
                      className={`w-full rounded-t-sm transition-all duration-500 hover:scale-110 cursor-pointer ${i === 11 ? 'bg-black shadow-[0_0_15px_rgba(0,0,0,0.2)]' : 'bg-black/10 hover:bg-black/40'}`}
                    />
                    <span className="text-[6px] font-black text-gray-300">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                 </div>
               ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
               {[
                 { label: 'Booking Velocity', val: '+24%', color: 'text-emerald-500' },
                 { label: 'Node Resonance', val: '98.2', color: 'text-black' },
                 { label: 'Latency Node', val: '42ms', color: 'text-amber-500' },
                 { label: 'Active Synapse', val: '1.2k', color: 'text-blue-500' },
               ].map((item, i) => (
                 <div key={i} className="space-y-1">
                    <p className="text-[7px] font-black text-gray-300 uppercase tracking-widest">{item.label}</p>
                    <p className={`text-xs font-black uppercase ${item.color}`}>{item.val}</p>
                 </div>
               ))}
            </div>
          </div>

          {/* User Spotlight & Tactical Actions */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-black/5 flex flex-col justify-between group overflow-hidden">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                 <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Active Operator</span>
                 <div className="flex gap-1.5">
                   <button className="p-1.5 bg-gray-50 rounded-lg text-black hover:bg-black hover:text-white transition-all shadow-sm"><Edit2 size={12} /></button>
                   <button className="p-1.5 bg-gray-50 rounded-lg text-black hover:bg-black hover:text-white transition-all shadow-sm"><Maximize2 size={12} /></button>
                 </div>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-xl bg-black p-0.5 border border-black/10 mb-3 group-hover:rotate-6 transition-transform duration-500 shadow-xl shadow-black/20">
                  <div className="w-full h-full rounded-xl overflow-hidden ring-1 ring-white/20">
                     <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                  </div>
                </div>
                <h4 className="text-base font-black text-black leading-tight font-serif uppercase tracking-tight">Mason Walker</h4>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1 font-roboto">Logistics Strategist</p>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-4">
                 <button className="flex items-center justify-between p-3 bg-gray-50 border border-black/5 rounded-lg hover:bg-black hover:text-white transition-all group/btn">
                    <div className="flex items-center gap-3">
                       <MessageSquare size={14} className="text-gray-400 group-hover/btn:text-white" />
                       <span className="text-[9px] font-black uppercase tracking-widest">Direct Synapse</span>
                    </div>
                    <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                 </button>
                 <button className="flex items-center justify-between p-3 bg-gray-50 border border-black/5 rounded-lg hover:bg-black hover:text-white transition-all group/btn">
                    <div className="flex items-center gap-3">
                       <Mail size={14} className="text-gray-400 group-hover/btn:text-white" />
                       <span className="text-[9px] font-black uppercase tracking-widest">Relay Protocol</span>
                    </div>
                    <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                 </button>
              </div>
            </div>

            <button className="w-full mt-6 py-3 bg-black text-white text-[9px] font-black uppercase tracking-[0.3em] rounded-lg shadow-xl shadow-black/20 hover:scale-[1.02] active:scale-95 transition-all">
               Node Control Center
            </button>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
