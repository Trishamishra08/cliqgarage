import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  Wrench, 
  Settings, 
  AlertCircle, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  Percent,
  Clock,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceManagement = () => {
  const [activeTab, setActiveTab] = useState('categories');

  const categories = [
    { id: 1, name: 'General Service', description: 'Periodic maintenance & oil change', price: '₹599', bookings: 1240, status: 'Active' },
    { id: 2, name: 'Engine Repair', description: 'Major engine work & overhaul', price: 'Inspection', bookings: 450, status: 'Active' },
    { id: 3, name: 'Brake & Clutch', description: 'Brake pads & clutch assembly', price: '₹399', bookings: 890, status: 'Active' },
    { id: 4, name: 'Electricals', description: 'Battery & wiring repairs', price: '₹299', bookings: 670, status: 'Inactive' },
  ];

  const disputes = [
    { id: 'DIS-101', customer: 'Amit K.', mechanic: 'Speedy Repairs', reason: 'Overcharging', status: 'Open', date: 'Oct 24, 2023' },
    { id: 'DIS-102', customer: 'Sita R.', mechanic: 'Elite Motors', reason: 'Poor Quality', status: 'Resolved', date: 'Oct 22, 2023' },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold text-black tracking-tight">Services & Operations</h1>
            <p className="text-xs text-gray-400 font-medium">Configure catalog and manage bookings.</p>
          </div>
          <button className="bg-black text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-black/10 hover:scale-[1.02] transition-all flex items-center gap-2">
            <Plus size={16} />
            Add category
          </button>
        </div>

        {/* Analytics Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Commission', value: '15%', icon: Percent },
            { label: 'Categories', value: '12', icon: Wrench },
            { label: 'Resolved', value: '98%', icon: CheckCircle2 },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-black transition-all">
              <div>
                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">{item.label}</p>
                <h4 className="text-xl font-bold text-black">{item.value}</h4>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 text-black group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                <item.icon size={18} />
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-50 px-6 bg-gray-50/30">
            {['categories', 'bookings', 'disputes', 'config'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest relative transition-all ${
                  activeTab === tab ? 'text-black' : 'text-gray-300 hover:text-gray-500'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="serviceTabUnderline" className="absolute bottom-0 left-6 right-6 h-0.5 bg-black rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'categories' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="p-5 border border-gray-100 rounded-2xl hover:border-black hover:shadow-md transition-all group relative">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-sm font-bold text-black mb-1">{cat.name}</h4>
                        <p className="text-[11px] text-gray-400 font-medium leading-relaxed max-w-[200px]">{cat.description}</p>
                      </div>
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
                        cat.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-300'
                      }`}>
                        {cat.status}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">Price:</span>
                        <span className="text-xs font-bold text-black">{cat.price}</span>
                      </div>
                      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                        <button className="p-2 bg-white border border-gray-100 rounded-full text-gray-300 hover:text-black hover:shadow-md transition-all"><Edit2 size={14} /></button>
                        <button className="p-2 bg-white border border-gray-100 rounded-full text-gray-300 hover:text-red-500 hover:shadow-md transition-all"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'disputes' && (
              <div className="space-y-3">
                {disputes.map((dis) => (
                  <div key={dis.id} className="p-5 bg-gray-50/50 rounded-2xl border border-transparent hover:bg-white hover:border-gray-100 hover:shadow-md transition-all group flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className={`p-3 rounded-xl ${dis.status === 'Open' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'} shadow-sm`}>
                        <AlertCircle size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-mono text-[9px] font-bold text-gray-300 uppercase">{dis.id}</span>
                          <span className={`text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full ${
                            dis.status === 'Open' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                          }`}>
                            {dis.status}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-black">{dis.reason}</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5">{dis.customer} • {dis.mechanic}</p>
                      </div>
                    </div>
                    <button className="bg-black text-white px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2">
                      Review <ArrowRight size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'config' && (
              <div className="max-w-md mx-auto py-4 space-y-6">
                <div className="text-center space-y-1 mb-6">
                  <h3 className="text-xl font-bold text-black">Commission Engine</h3>
                  <p className="text-xs text-gray-400 font-medium">Define take-rates for each vertical.</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Mechanic Vertical', value: 15 },
                    { label: 'Rental Vertical', value: 20 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-gray-50/50 rounded-2xl border border-gray-100 shadow-sm">
                      <p className="text-xs font-bold text-black">{item.label}</p>
                      <div className="flex items-center gap-3">
                        <input 
                          type="number" 
                          defaultValue={item.value} 
                          className="w-16 bg-white border border-gray-100 rounded-xl px-3 py-2 text-center font-bold text-sm text-black focus:ring-1 focus:ring-black outline-none transition-all shadow-sm" 
                        />
                        <span className="text-gray-300 font-bold text-sm">%</span>
                      </div>
                    </div>
                  ))}
                  <button className="w-full bg-black text-white py-3.5 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:shadow-lg transition-all active:scale-[0.98] mt-2">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ServiceManagement;
