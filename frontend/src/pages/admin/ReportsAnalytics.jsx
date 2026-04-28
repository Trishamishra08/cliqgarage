import React, { useState } from 'react';
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
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ReportsAnalytics = () => {
  const [activeView, setActiveView] = useState('performance');
  const [timeRange, setTimeRange] = useState('This Month');

  const globalVitals = [
    { label: 'Booking Velocity', value: '+24%', status: 'up', icon: Activity },
    { label: 'Commission Yield', value: '₹42,890', status: 'up', icon: Target },
    { label: 'User Retention', value: '88%', status: 'up', icon: Users },
    { label: 'System Uptime', value: '99.9%', status: 'up', icon: Zap },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-2">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold text-black tracking-tight leading-none">Intelligence Terminal</h1>
            <p className="text-[11px] text-gray-400 font-medium">Global platform vitals, financial vectors, and performance reports.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest text-black hover:bg-gray-50 transition-all shadow-sm">
              <Calendar size={14} />
              {timeRange}
              <ChevronDown size={12} className="text-gray-300" />
            </button>
            <button className="bg-black text-white px-5 py-2 rounded-xl font-bold text-[11px] shadow-lg shadow-black/10 hover:scale-[1.02] transition-all flex items-center gap-2 uppercase tracking-widest">
              <Download size={14} />
              Export
            </button>
          </div>
        </div>

        {/* Global Growth Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {globalVitals.map((stat, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 relative group overflow-hidden shadow-sm hover:border-black transition-all">
              <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rotate-12">
                <stat.icon size={60} />
              </div>
              <p className="text-gray-300 text-[9px] font-bold uppercase mb-1.5 tracking-[0.2em] leading-none">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h4 className="text-xl font-bold text-black leading-none">{stat.value}</h4>
                <div className={`flex items-center text-[9px] font-bold uppercase ${stat.status === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.status === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex border-b border-gray-100 px-1 gap-8">
          {[
            { id: 'performance', label: 'Performance Matrix' },
            { id: 'revenue', label: 'Financial Vectors' },
            { id: 'users', label: 'User Dynamics' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`pb-3 text-[10px] font-bold uppercase tracking-widest relative transition-all ${
                activeView === tab.id ? 'text-black' : 'text-gray-300 hover:text-gray-500'
              }`}
            >
              {tab.label}
              {activeView === tab.id && (
                <motion.div layoutId="analyticsUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeView === 'performance' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Vertical Distribution */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="font-bold text-black text-base">Booking Distribution</h3>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-0.5">By platform vertical</p>
                  </div>
                  <BarChart3 size={18} className="text-gray-300" />
                </div>
                <div className="space-y-6">
                  {[
                    { label: 'Mechanic Services', value: '45%', count: '1,240 Hits', color: 'bg-black' },
                    { label: 'Bike Rentals', value: '30%', count: '890 Hits', color: 'bg-gray-400' },
                    { label: 'E-Commerce', value: '25%', count: '640 Hits', color: 'bg-gray-200' },
                  ].map((item, idx) => (
                    <div key={idx} className="group">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] font-bold text-black uppercase tracking-widest">{item.label}</span>
                        <span className="font-bold text-[10px] text-gray-400">{item.count}</span>
                      </div>
                      <div className="w-full bg-gray-50 h-1.5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: item.value }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className={`${item.color} h-full rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mechanic Performance */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-black text-base">Mechanic Performance</h3>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-0.5">Top performing nodes</p>
                  </div>
                  <PieChart size={18} className="text-gray-300" />
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Speedy Repairs', jobs: 142, rating: 4.8 },
                    { name: 'Pankaj Garage', jobs: 98, rating: 4.5 },
                    { name: 'Elite Motors', jobs: 64, rating: 4.9 },
                  ].map((mech, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl hover:bg-white hover:border-gray-100 border border-transparent transition-all group shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold text-[10px]">
                          #{idx + 1}
                        </div>
                        <div>
                          <p className="font-bold text-xs text-black">{mech.name}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{mech.jobs} Units Done</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500 font-bold text-xs">
                        {mech.rating} <span className="text-[10px]">★</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'revenue' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="font-bold text-black text-base">Revenue & Commission Logic</h3>
                  <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-0.5">Fiscal vectors by category</p>
                </div>
                <DollarSign size={18} className="text-gray-300" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: 'Gross Volume', value: '₹12,45,890', trend: '+18%' },
                  { label: 'Commission Yield', value: '₹1,86,880', trend: '+22%' },
                  { label: 'Partner Payouts', value: '₹10,59,010', trend: '+15%' },
                ].map((item, i) => (
                  <div key={i} className="p-5 bg-gray-50 rounded-xl border border-gray-100 shadow-sm group hover:border-black transition-all">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{item.label}</p>
                    <h4 className="text-xl font-bold text-black leading-none mb-4">{item.value}</h4>
                    <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-md">{item.trend} Growth</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeView === 'users' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black p-8 rounded-2xl text-white relative overflow-hidden shadow-xl shadow-black/10">
                <div className="absolute -top-4 -right-4 opacity-10 rotate-12"><Users size={80} /></div>
                <h4 className="text-base font-bold mb-1">User Activity Sync</h4>
                <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] mb-8">Real-time platform resonance</p>
                <div className="grid grid-cols-2 gap-8 mb-4">
                  <div>
                    <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest mb-1">MAU</p>
                    <p className="text-xl font-bold">12,450</p>
                  </div>
                  <div>
                    <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest mb-1">Avg Session</p>
                    <p className="text-xl font-bold">4m 32s</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-100">
                  <Activity size={24} className="text-black" />
                </div>
                <h4 className="text-sm font-bold text-black uppercase tracking-tight">System Pulse</h4>
                <p className="text-[10px] text-gray-400 font-medium max-w-[180px] mt-1 leading-relaxed">Latency is currently within optimal parameters (42ms).</p>
                <button className="mt-6 px-6 py-2 border border-black rounded-lg text-[10px] font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all shadow-sm">
                  Deep Trace
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AdminLayout>
  );
};

const Zap = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export default ReportsAnalytics;
