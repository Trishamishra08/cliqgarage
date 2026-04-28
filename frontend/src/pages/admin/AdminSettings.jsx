import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Settings as SettingsIcon, Save, Bell, Shield, Database, Globe, ArrowRight } from 'lucide-react';

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-10">
        
        {/* Header Section */}
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-black">System Terminal</h1>
            <p className="text-sm text-gray-400">Configure global platform protocols and security parameters.</p>
          </div>
          <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-black/10 hover:scale-[1.02] transition-all active:scale-95 flex items-center gap-2">
            <Save size={18} />
            Commit Changes
          </button>
        </div>

        <div className="max-w-4xl space-y-10">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="p-10 border-b border-gray-50 bg-gray-50/30">
              <h3 className="font-black text-black text-xl">Core Protocol Config</h3>
              <p className="text-[11px] font-bold text-gray-300 uppercase tracking-widest mt-1">Platform-wide global variables</p>
            </div>
            
            <div className="p-10 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Platform Identity</label>
                  <input type="text" defaultValue="CLIQGARAGE" className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-2xl px-6 py-4 text-sm font-black text-black transition-all outline-none" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Support Terminal</label>
                  <input type="email" defaultValue="ops@cliqgarage.com" className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-2xl px-6 py-4 text-sm font-black text-black transition-all outline-none" />
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-black uppercase tracking-[0.3em] flex items-center gap-3">
                  <div className="w-6 h-[1px] bg-black/10" />
                  Signal Parameters
                  <div className="flex-1 h-[1px] bg-black/10" />
                </h4>
                <div className="flex items-center justify-between p-8 bg-gray-50/50 rounded-3xl border border-transparent hover:border-gray-100 transition-all">
                  <div>
                    <p className="text-sm font-black text-black">Encryption Signal</p>
                    <p className="text-[11px] font-medium text-gray-400">Broadcast all system events to secondary relay terminals</p>
                  </div>
                  <div className="w-14 h-8 bg-black rounded-full relative cursor-pointer shadow-lg shadow-black/20">
                    <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-black uppercase tracking-[0.3em] flex items-center gap-3">
                  <div className="w-6 h-[1px] bg-black/10" />
                  Security Protocol
                  <div className="flex-1 h-[1px] bg-black/10" />
                </h4>
                <div className="flex items-center justify-between p-8 bg-gray-50/50 rounded-3xl border border-transparent hover:border-gray-100 transition-all">
                  <div>
                    <p className="text-sm font-black text-black">Dual-Layer Auth</p>
                    <p className="text-[11px] font-medium text-gray-400">Enforce biometric or MFA on all administrative nodes</p>
                  </div>
                  <div className="w-14 h-8 bg-gray-200 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-black rounded-[2rem] text-white group cursor-pointer hover:scale-[1.02] transition-all shadow-2xl shadow-black/20 overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <Database size={100} />
              </div>
              <div className="flex items-center gap-6 relative z-10">
                <div className="p-4 bg-white/10 rounded-2xl group-hover:bg-white group-hover:text-black transition-all">
                  <Database size={24} />
                </div>
                <div>
                  <h4 className="font-black text-lg">Relay Backup</h4>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-1">Status: Synced 2m ago</p>
                </div>
              </div>
            </div>
            <div className="p-8 bg-white rounded-[2rem] border border-gray-100 group cursor-pointer hover:border-black transition-all shadow-sm relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700">
                <Globe size={100} />
              </div>
              <div className="flex items-center gap-6 relative z-10">
                <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-black group-hover:text-white transition-all">
                  <Globe size={24} />
                </div>
                <div>
                  <h4 className="font-black text-lg text-black">Neural API Keys</h4>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">Manage external synapses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
