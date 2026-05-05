import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Download, 
  Calendar,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Wrench,
  Bike,
  DollarSign,
  ArrowRight,
  Activity,
  Target,
  Zap,
  Box,
  Layers,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ReportsAnalytics = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('performance');
  const [timeRange, setTimeRange] = useState('This Month');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) setActiveTab(tab);
    else setActiveTab('performance');
  }, [location]);

  const tabs = [
    { id: 'performance', label: 'Performance Matrix', icon: Activity },
    { id: 'revenue', label: 'Financial Vectors', icon: DollarSign },
    { id: 'users', label: 'User Dynamics', icon: Users },
    { id: 'system', label: 'System Pulse', icon: Cpu },
  ];

  const globalVitals = [
    { label: 'Booking Velocity', value: '+24%', status: 'up', icon: Activity, color: 'text-emerald-500' },
    { label: 'Commission Yield', value: '₹42,890', status: 'up', icon: Target, color: 'text-blue-500' },
    { label: 'User Retention', value: '88%', status: 'up', icon: Users, color: 'text-purple-500' },
    { label: 'System Uptime', value: '99.9%', status: 'up', icon: Zap, color: 'text-amber-500' },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-5">
        
        {/* Header Section */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-black/5 shadow-sm">
          <div className="space-y-1">
            <h1 className="text-xl font-black text-black tracking-tighter uppercase font-serif">Intelligence Terminal</h1>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Global platform vitals & financial vectors</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-gray-50 border border-black/5 px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-black hover:bg-white transition-all shadow-sm">
              <Calendar size={14} />
              {timeRange}
              <ChevronDown size={12} className="text-gray-300" />
            </button>
            <button className="bg-black text-white px-5 py-1.5 rounded-lg font-black text-[9px] shadow-lg shadow-black/10 hover:scale-[1.02] transition-all flex items-center gap-2 uppercase tracking-widest">
              <Download size={14} />
              Export XML
            </button>
          </div>
        </div>

        {/* Tactical Vitals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {globalVitals.map((stat, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-black/5 relative group overflow-hidden shadow-sm hover:border-black transition-all">
              <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity rotate-12">
                <stat.icon size={60} />
              </div>
              <p className="text-gray-300 text-[8px] font-black uppercase mb-1.5 tracking-[0.2em] leading-none">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h4 className="text-lg font-black text-black leading-none uppercase tracking-tight">{stat.value}</h4>
                <div className={`flex items-center text-[7px] font-black uppercase ${stat.color}`}>
                  {stat.status === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  <span className="ml-0.5">Optimum</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabbed Intelligence Hub */}
        <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-100 px-4 bg-gray-50/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-4 text-[9px] font-black uppercase tracking-widest relative transition-all ${
                  activeTab === tab.id ? 'text-black' : 'text-gray-400 hover:text-black'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="analyticsUnderline" className="absolute bottom-0 left-5 right-5 h-0.5 bg-black rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'performance' && (
                <motion.div key="perf" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-6 border border-black/5 rounded-xl bg-gray-50/20">
                     <div className="flex justify-between items-start mb-8">
                       <div className="space-y-1">
                         <h3 className="font-black text-black text-xs uppercase font-serif">Booking Distribution</h3>
                         <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Platform vertical hits</p>
                       </div>
                       <BarChart3 size={16} className="text-gray-300" />
                     </div>
                     <div className="space-y-6">
                        {[
                          { label: 'Mechanic Node', value: '45%', hits: '1,240', color: 'bg-black' },
                          { label: 'Rental Node', value: '30%', hits: '890', color: 'bg-gray-400' },
                          { label: 'E-Commerce SKU', value: '25%', hits: '640', color: 'bg-gray-200' },
                        ].map((item, idx) => (
                          <div key={idx}>
                             <div className="flex justify-between items-end mb-2">
                               <span className="text-[9px] font-black text-black uppercase tracking-widest">{item.label}</span>
                               <span className="font-black text-[8px] text-gray-400 uppercase tracking-tighter">{item.hits} Units</span>
                             </div>
                             <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: item.value }} className={`${item.color} h-full rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]`} />
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>
                  <div className="p-6 border border-black/5 rounded-xl bg-gray-50/20">
                     <div className="flex justify-between items-start mb-6">
                        <div className="space-y-1">
                          <h3 className="font-black text-black text-xs uppercase font-serif">Node Leaderboard</h3>
                          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Top performance units</p>
                        </div>
                        <Target size={16} className="text-gray-300" />
                     </div>
                     <div className="space-y-3">
                        {[
                          { name: 'Speedy Repairs', jobs: 142, rating: 4.8 },
                          { name: 'Pankaj Garage', jobs: 98, rating: 4.5 },
                          { name: 'Elite Motors', jobs: 64, rating: 4.9 },
                        ].map((mech, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-white border border-black/5 rounded-lg group hover:border-black transition-all shadow-sm">
                             <div className="flex items-center gap-3">
                                <div className="w-7 h-7 bg-black text-white rounded-md flex items-center justify-center font-black text-[9px]">
                                  {idx + 1}
                                </div>
                                <div>
                                   <p className="font-black text-[10px] text-black uppercase tracking-tight leading-tight">{mech.name}</p>
                                   <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">{mech.jobs} Tasks Committed</p>
                                </div>
                             </div>
                             <div className="text-[9px] font-black text-amber-500 uppercase tracking-widest">
                                {mech.rating} ★
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'revenue' && (
                <motion.div key="rev" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {[
                        { label: 'Gross Platform Volume', value: '₹12,45,890', change: '+18%' },
                        { label: 'Commission Revenue', value: '₹1,86,880', change: '+22%' },
                        { label: 'Node Disbursal', value: '₹10,59,010', change: '+15%' },
                      ].map((item, i) => (
                        <div key={i} className="p-5 bg-gray-50/50 rounded-xl border border-black/5 group hover:border-black transition-all">
                           <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2">{item.label}</p>
                           <h4 className="text-xl font-black text-black uppercase tracking-tight font-serif">{item.value}</h4>
                           <p className="text-[7px] font-black text-emerald-500 uppercase tracking-[0.2em] mt-4">{item.change} Momentum</p>
                        </div>
                      ))}
                   </div>
                </motion.div>
              )}

              {activeTab === 'system' && (
                <motion.div key="sys" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-12">
                   <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-black/20 group hover:rotate-90 transition-transform duration-500">
                      <Cpu size={32} />
                   </div>
                   <h3 className="text-lg font-black text-black uppercase tracking-tight font-serif">Protocol Resonance</h3>
                   <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-2 max-w-[250px] text-center leading-relaxed">System latency is synchronized at 42ms. All nodes report green status.</p>
                   <button className="mt-10 px-10 py-3 bg-black text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all">
                      Initiate Deep Trace
                   </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReportsAnalytics;
