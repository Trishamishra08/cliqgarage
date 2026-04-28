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
    className={`${color} p-4 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer relative group border border-white/10 flex flex-col justify-between h-32`}
  >
    <div className="flex justify-between items-start">
      <div className="w-8 h-8 rounded-lg bg-white/40 flex items-center justify-center text-black shadow-sm">
        <Icon size={16} />
      </div>
      <button className="p-1.5 rounded-full bg-white/20 text-black/30 hover:bg-white hover:text-black transition-all">
        <Maximize2 size={10} />
      </button>
    </div>
    
    <div>
      <p className="text-black/40 text-[9px] font-bold uppercase tracking-widest">{title}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-xl font-black text-black leading-none">{value}</h3>
        <span className="text-black/60 text-[8px] font-bold">+{change}</span>
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
      <div className="flex flex-col gap-5 pb-10">
        
        {/* Unified Business Matrix Section */}
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-6">
          {/* Header Internal */}
          <div className="flex justify-between items-center px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white shadow-lg">
                <BarChart3 size={20} />
              </div>
              <div>
                <h1 className="text-lg font-black text-black tracking-tight leading-none uppercase">Business Summary</h1>
                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mt-1">Operational Matrix v1.2</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-gray-50 border border-black/5 rounded-full text-black hover:bg-black hover:text-white transition-all">
                <Edit2 size={16} />
              </button>
              <button className="p-2 bg-black text-white rounded-full hover:scale-110 transition-all shadow-md">
                <Zap size={16} />
              </button>
            </div>
          </div>

          {/* 6-Card Grid Internal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Revenue Variance Matrix */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-black/5 space-y-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
                  <TrendingUp size={16} />
                </div>
                <h3 className="text-sm font-black text-black uppercase tracking-tight">Revenue Variance</h3>
              </div>
              <button className="text-[9px] font-bold text-gray-400 uppercase tracking-widest hover:text-black">
                View All
              </button>
            </div>

            <div className="space-y-6">
              {[
                { label: 'Gold Service', value: 72, color: 'bg-[#F9E2AF]' },
                { label: 'Maintenance', value: 45, color: 'bg-[#B4D4FF]' },
                { label: 'Fleet Ops', value: 88, color: 'bg-[#D1B3FF]' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end px-1">
                    <span className="text-[10px] font-bold text-black uppercase">{item.label}</span>
                    <span className="text-[10px] font-black text-black">+{item.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden p-0.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, ease: "circOut", delay: 0.4 + i*0.1 }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Spotlight Card */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-black/5 flex flex-col justify-between group">
            <div className="flex justify-between items-center mb-6">
               <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Active Node</span>
               <div className="flex gap-2">
                 <button className="p-1.5 bg-gray-50 rounded-lg text-black hover:bg-black hover:text-white transition-all"><Edit2 size={14} /></button>
                 <button className="p-1.5 bg-gray-50 rounded-lg text-black hover:bg-black hover:text-white transition-all"><Maximize2 size={14} /></button>
               </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#F7F2EB] p-1 border border-black/5 mb-3 group-hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full rounded-full overflow-hidden shadow-sm ring-2 ring-white">
                   <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" />
                </div>
              </div>
              <h4 className="text-lg font-black text-black leading-tight">Mason Walker</h4>
              <p className="text-[10px] text-gray-400 font-medium mt-1 leading-tight px-4">Logistics Coordinator</p>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-8">
               {[Mail, Phone, MessageSquare].map((Icon, i) => (
                 <button key={i} className="py-2.5 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all">
                   <Icon size={16} />
                 </button>
               ))}
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
