import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  Bike, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  FileText,
  AlertTriangle,
  History,
  TrendingUp,
  MapPin,
  ChevronRight,
  MoreHorizontal,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const RentalManagement = () => {
  const [activeView, setActiveView] = useState('approvals');

  const pendingApprovals = [
    { id: 'LST-701', partner: 'City Rides', model: 'Royal Enfield 350', rate: '₹1,200/day', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=200&auto=format&fit=crop' },
    { id: 'LST-702', partner: 'Bike Zone', model: 'KTM Duke 200', rate: '₹900/day', image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=200&auto=format&fit=crop' },
  ];

  const activeRentals = [
    { id: 'BR-4001', customer: 'Amit P.', partner: 'City Rides', bike: 'Classic 350', status: 'In Use', pickup: 'Oct 23', return: 'Oct 26' },
    { id: 'BR-4002', customer: 'Sonia R.', partner: 'Go Wheels', bike: 'Activa 6G', status: 'Late', pickup: 'Oct 20', return: 'Oct 24' },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold text-black tracking-tight">Fleet & Rentals</h1>
            <p className="text-xs text-gray-400 font-medium">Approve listings and monitor operations.</p>
          </div>
          <button className="bg-black text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-black/10 hover:scale-[1.02] transition-all flex items-center gap-2">
            <MapPin size={16} />
            Add partner
          </button>
        </div>

        {/* Performance Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black p-6 rounded-2xl text-white relative overflow-hidden group shadow-xl shadow-black/10">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-1000">
              <Bike size={80} />
            </div>
            <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest mb-1">Fleet Scale</p>
            <h4 className="text-2xl font-bold mb-4 tracking-tight">452 <span className="text-white/20 text-[10px] uppercase tracking-widest ml-1 font-medium">Units</span></h4>
            <div className="flex items-center gap-1.5 text-[9px] text-green-400 font-bold uppercase tracking-widest bg-green-400/10 px-2.5 py-1.5 rounded-lg w-fit shadow-sm">
              <TrendingUp size={12} />
              <span>+12 New</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-black transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-300 text-[9px] font-bold uppercase tracking-widest mb-1">Live Rentals</p>
                <h4 className="text-2xl font-bold text-black tracking-tight">84</h4>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 text-black group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                <History size={18} />
              </div>
            </div>
            <div className="text-[9px] text-gray-300 font-bold uppercase tracking-widest mt-6 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              72% Utilization
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-red-500 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-300 text-[9px] font-bold uppercase tracking-widest mb-1">Resolution</p>
                <h4 className="text-2xl font-bold text-red-600 tracking-tight">₹8,450</h4>
              </div>
              <div className="p-3 rounded-xl bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all shadow-sm group-hover:shake">
                <ShieldAlert size={18} />
              </div>
            </div>
            <button className="text-[9px] font-bold text-red-600 flex items-center gap-1.5 mt-6 uppercase tracking-widest hover:underline group-hover:translate-x-1 transition-transform">
              Resolve Ledger <ChevronRight size={12} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-50 px-6 bg-gray-50/30 overflow-x-auto no-scrollbar">
            {[
              { id: 'approvals', label: 'Approvals', count: 2, icon: CheckCircle2 },
              { id: 'monitoring', label: 'Monitor', count: null, icon: Eye },
              { id: 'penalties', label: 'Penalty', count: 5, icon: AlertTriangle },
              { id: 'partners', label: 'Partners', count: null, icon: MapPin },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest relative transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeView === tab.id ? 'text-black' : 'text-gray-300 hover:text-gray-500'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
                {tab.count && (
                  <span className="w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold ring-2 ring-white shadow-sm">
                    {tab.count}
                  </span>
                )}
                {activeView === tab.id && (
                  <motion.div layoutId="rentalTabUnderline" className="absolute bottom-0 left-6 right-6 h-0.5 bg-black rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeView === 'approvals' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-black tracking-tight">Listing Requests</h3>
                  <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Awaiting Review</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {pendingApprovals.map((item) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-gray-50/50 rounded-2xl border border-transparent hover:bg-white hover:border-gray-100 hover:shadow-md transition-all group"
                    >
                      <div className="flex gap-4">
                        <div className="w-24 h-24 rounded-xl overflow-hidden shadow-sm relative shrink-0">
                          <img src={item.image} alt={item.model} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="space-y-0.5">
                            <div className="flex justify-between items-start">
                              <span className="text-[8px] font-mono font-bold text-gray-300 uppercase tracking-tighter">{item.id}</span>
                              <span className="text-[7px] font-bold text-black bg-yellow-400 px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm">Review</span>
                            </div>
                            <h4 className="text-xs font-bold text-black mt-1 leading-tight">{item.model}</h4>
                            <p className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter">{item.partner}</p>
                            <p className="text-sm font-bold text-black mt-1 tracking-tight">{item.rate}</p>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <button className="flex-1 bg-black text-white text-[9px] font-bold py-2 rounded-lg hover:shadow-md transition-all uppercase tracking-widest">Approve</button>
                            <button className="px-3 border border-gray-100 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><XCircle size={14} /></button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeView === 'monitoring' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[9px] font-bold text-gray-300 uppercase tracking-widest border-b border-gray-50">
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Unit</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Span</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {activeRentals.map((rental) => (
                      <tr key={rental.id} className="hover:bg-gray-50/50 transition-colors group cursor-default">
                        <td className="px-6 py-4 font-mono text-[9px] font-bold text-gray-300 group-hover:text-black transition-colors">{rental.id}</td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-xs text-black leading-tight">{rental.customer}</p>
                          <p className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter mt-0.5">{rental.partner}</p>
                        </td>
                        <td className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">{rental.bike}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-full shadow-sm ${
                            rental.status === 'In Use' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600 animate-pulse'
                          }`}>
                            {rental.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-[10px] font-bold text-gray-300 tracking-tighter">{rental.pickup} - {rental.return}</p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 bg-white border border-gray-100 rounded-full text-gray-300 hover:text-black opacity-0 group-hover:opacity-100 transition-all hover:shadow-sm"><MoreHorizontal size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeView === 'penalties' && (
              <div className="flex flex-col items-center justify-center py-16 bg-red-50/20 rounded-2xl border border-dashed border-red-100">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
                  <ShieldAlert size={32} className="text-red-500" />
                </div>
                <h4 className="text-lg font-bold text-red-900 tracking-tight">Damage Control</h4>
                <p className="text-xs text-red-900/40 max-w-[200px] text-center mt-2 font-medium">Global assessment interface for liabilities.</p>
                <button className="mt-8 px-6 py-3 bg-red-600 text-white text-[9px] font-bold rounded-xl shadow-lg shadow-red-600/20 hover:scale-105 transition-transform uppercase tracking-widest flex items-center gap-2">
                  Open Terminal <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default RentalManagement;
