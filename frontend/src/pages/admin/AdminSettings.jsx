import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  Settings as SettingsIcon, 
  Save, 
  Bell, 
  Shield, 
  Database, 
  Globe, 
  ArrowRight,
  ShieldCheck,
  Lock,
  Cpu,
  RefreshCw,
  Key,
  Smartphone,
  Server
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSettings = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) setActiveTab(tab);
    else setActiveTab('general');
  }, [location]);

  const tabs = [
    { id: 'general', label: 'Core Protocol', icon: Cpu },
    { id: 'security', label: 'Security Node', icon: ShieldCheck },
    { id: 'database', label: 'Relay Sync', icon: Database },
    { id: 'integrations', label: 'External Synapse', icon: Globe },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-5">
        
        {/* Header Section */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-black/5 shadow-sm">
          <div className="space-y-1">
            <h1 className="text-xl font-black text-black tracking-tighter uppercase font-serif">System Terminal</h1>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Global Protocol & Infrastructure Settings</p>
          </div>
          <button className="bg-black text-white px-8 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest shadow-xl shadow-black/10 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <Save size={14} />
            Commit Changes
          </button>
        </div>

        <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden min-h-[600px]">
          <div className="flex border-b border-gray-100 px-4 bg-gray-50/50 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-4 text-[9px] font-black uppercase tracking-widest relative transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'text-black' : 'text-gray-400 hover:text-black'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="settingsTabUnderline" className="absolute bottom-0 left-5 right-5 h-0.5 bg-black rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="p-8 max-w-3xl">
            <AnimatePresence mode="wait">
              {activeTab === 'general' && (
                <motion.div key="gen" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-10">
                   <div className="space-y-6">
                      <h4 className="text-[10px] font-black text-black uppercase tracking-[0.3em] flex items-center gap-3">
                        <div className="w-6 h-[1px] bg-black/10" />
                        Identity Parameters
                        <div className="flex-1 h-[1px] bg-black/10" />
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-[8px] font-black text-gray-300 uppercase tracking-widest ml-1">Platform Alias</label>
                            <input type="text" defaultValue="CLIQGARAGE" className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-xl px-4 py-3 text-[11px] font-black text-black transition-all outline-none uppercase tracking-widest shadow-sm focus:shadow-md" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[8px] font-black text-gray-300 uppercase tracking-widest ml-1">Operational Node</label>
                            <input type="text" defaultValue="ops@cliqgarage.com" className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-xl px-4 py-3 text-[11px] font-black text-black transition-all outline-none lowercase tracking-tight shadow-sm focus:shadow-md" />
                         </div>
                      </div>
                   </div>

                   <div className="space-y-6 pt-4">
                      <h4 className="text-[10px] font-black text-black uppercase tracking-[0.3em] flex items-center gap-3">
                        <div className="w-6 h-[1px] bg-black/10" />
                        Relay Configuration
                        <div className="flex-1 h-[1px] bg-black/10" />
                      </h4>
                      <div className="flex items-center justify-between p-6 bg-gray-50/50 rounded-xl border border-black/5 hover:border-black transition-all group">
                         <div>
                            <p className="text-[10px] font-black text-black uppercase tracking-tight">Active Pulse Tracking</p>
                            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Broadcast system metrics to central intelligence</p>
                         </div>
                         <div className="w-10 h-5 bg-black rounded-full relative cursor-pointer">
                            <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                         </div>
                      </div>
                   </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div key="sec" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                   {[
                     { label: 'Admin Dual-Factor', sub: 'Enforce MFA on all administrative nodes', active: true, icon: Smartphone },
                     { label: 'Biometric Protocol', sub: 'Neural-face ID on mobile admin terminals', active: false, icon: Lock },
                     { label: 'Geo-Fencing Node', sub: 'Restrict admin access to verified operational IP blocks', active: true, icon: Server },
                   ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between p-6 bg-gray-50/50 rounded-xl border border-black/5 hover:border-black transition-all group">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:bg-black group-hover:text-white transition-all">
                              <item.icon size={18} />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-black uppercase tracking-tight">{item.label}</p>
                              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">{item.sub}</p>
                           </div>
                        </div>
                        <div className={`w-10 h-5 ${item.active ? 'bg-black' : 'bg-gray-200'} rounded-full relative cursor-pointer transition-colors`}>
                           <div className={`absolute ${item.active ? 'right-1' : 'left-1'} top-1 w-3 h-3 bg-white rounded-full shadow-sm`} />
                        </div>
                     </div>
                   ))}
                </motion.div>
              )}

              {activeTab === 'database' && (
                <motion.div key="db" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="flex flex-col items-center justify-center py-12">
                   <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-black/20 group hover:rotate-180 transition-transform duration-700">
                      <RefreshCw size={32} />
                   </div>
                   <h3 className="text-lg font-black text-black uppercase tracking-tight font-serif">Relay Synchronization</h3>
                   <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-2 max-w-[250px] text-center">Platform state is currently 100% synchronized with global backup nodes.</p>
                   <div className="mt-8 flex gap-3">
                      <button className="px-6 py-2 bg-black text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg shadow-black/10 hover:scale-105 transition-all">
                         Backup Relay
                      </button>
                      <button className="px-6 py-2 border border-black text-black rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                         Flush Cache
                      </button>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
