import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  Users, 
  Wrench, 
  Bike, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  Slash,
  UserCheck,
  ArrowRight,
  MoreHorizontal,
  ChevronRight,
  ShieldCheck,
  FileText,
  Image as ImageIcon,
  Ban
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserManagement = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('customers');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    } else {
      setActiveTab('customers');
    }
  }, [location]);

  const tabs = [
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'mechanics', label: 'Mechanics', icon: Wrench },
    { id: 'rental_partners', label: 'Rental Partners', icon: Bike },
    { id: 'kyc', label: 'KYC Queue', icon: ShieldCheck },
    { id: 'feedback', label: 'Feedback & Reports', icon: MessageSquare },
    { id: 'banners', label: 'Banners', icon: ImageIcon },
  ];

  const [users, setUsers] = useState({
    customers: [
      { id: 'C-001', name: 'Arjun Mehra', email: 'arjun@example.com', phone: '+91 9876543210', joined: 'Oct 12, 2023', status: 'Active', bookings: 5, address: 'HSR Layout, Bangalore', kyc: 'Verified' },
      { id: 'C-002', name: 'Kiran Devi', email: 'kiran@example.com', phone: '+91 8877665544', joined: 'Oct 15, 2023', status: 'Blocked', bookings: 2, address: 'Saket, Delhi', kyc: 'Not Verified' },
    ],
    mechanics: [
      { id: 'M-001', name: 'Pankaj Garage', type: 'Multi-brand', phone: '+91 7766554433', location: 'Okhla, Delhi', status: 'Pending', rating: 4.8, shopId: 'SH-001', regDate: 'Nov 01, 2023' },
    ],
    rental_partners: [
      { id: 'R-001', name: 'City Rides', fleet: 24, phone: '+91 4433221100', location: 'Saket, Delhi', status: 'Approved', revenue: '₹45,000', manager: 'John Doe', since: 'Jan 2023' },
    ],
    kyc: [
      { id: 'K-001', name: 'Vikram Singh', type: 'Mechanic', document: 'Trade License', submitted: '2 hours ago', status: 'Pending' },
    ],
    feedback: [
      { id: 'F-001', name: 'Rahul Verma', title: 'Delayed Service', type: 'Complaint', submitted: '1 hour ago', status: 'Open' },
      { id: 'F-002', name: 'Sanya Malhotra', title: 'Great Experience', type: 'Appreciation', submitted: '5 hours ago', status: 'Resolved' },
    ],
    banners: [
      { id: 'B-001', title: 'Diwali Offer', location: 'Home Page', status: 'Active', clicks: 1240 },
    ]
  });

  const handleAction = (tab, id, newStatus) => {
    setUsers(prev => ({
      ...prev,
      [tab]: prev[tab].map(u => u.id === id ? { ...u, status: newStatus } : u)
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': case 'Approved': case 'Resolved': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Pending': case 'Open': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Blocked': case 'Rejected': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-50 text-gray-400 border-gray-100';
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-5">
        
        {/* Header Section */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-black/5 shadow-sm">
          <div className="space-y-1">
            <h1 className="text-xl font-black text-black tracking-tighter uppercase font-serif">Partner Ecosystem</h1>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Unified Management Interface</p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center bg-gray-50 border border-black/5 rounded-lg px-4 py-1.5 w-64 focus-within:bg-white focus-within:shadow-md transition-all group">
              <Search size={14} className="text-gray-400 group-focus-within:text-black" />
              <input 
                type="text" 
                placeholder={`Search ${activeTab}...`} 
                className="bg-transparent border-none focus:ring-0 text-[10px] ml-2 w-full text-black placeholder:text-gray-300 font-bold uppercase tracking-widest"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-black text-white px-4 py-1.5 rounded-lg font-black text-[10px] uppercase tracking-widest shadow-lg shadow-black/10 hover:scale-105 transition-all flex items-center gap-2">
              <Filter size={12} />
              Filter
            </button>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-100 px-4 bg-gray-50/50 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-[9px] font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${
                  activeTab === tab.id ? 'text-black' : 'text-gray-400 hover:text-black'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-5 right-5 h-0.5 bg-black rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[8px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 bg-gray-50/20">
                  <th className="px-6 py-3">Identifier</th>
                  <th className="px-6 py-3">Details</th>
                  <th className="px-6 py-3">Metrics</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence mode="popLayout">
                  {users[activeTab]?.filter(u => (u.name || u.title).toLowerCase().includes(searchTerm.toLowerCase())).map((user) => (
                    <motion.tr 
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50/80 transition-colors group cursor-pointer"
                      onClick={() => setSelectedUser(user)}
                    >
                      <td className="px-6 py-3 font-mono text-[9px] font-black text-gray-300 group-hover:text-black">{user.id}</td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-black text-[10px] shadow-md uppercase">
                            {(user.name || user.title).charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-xs text-black leading-tight uppercase tracking-tight">{user.name || user.title}</p>
                            <p className="text-[8px] font-bold text-gray-400 mt-0.5 uppercase tracking-tighter">{user.email || user.location || user.type}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] font-black text-black uppercase">{user.bookings || user.fleet || user.clicks || user.type || 'N/A'}</span>
                          <span className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">
                            {activeTab === 'customers' ? 'Orders' : 
                             activeTab === 'banners' ? 'Interactions' : 
                             activeTab === 'mechanics' ? 'Capacity' : 'Velocity'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`px-2 py-0.5 rounded-md text-[7px] font-black uppercase tracking-[0.2em] border ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <div className="flex justify-end gap-1.5 opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                           <button className="w-7 h-7 bg-gray-50 text-gray-400 rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm border border-black/5">
                             <Edit2 size={10} />
                           </button>
                           <button className="w-7 h-7 bg-gray-50 text-gray-400 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm border border-black/5">
                             <Ban size={10} />
                           </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selectedUser && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedUser(null)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
              />
              <motion.div 
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-[450px] bg-white z-[101] shadow-2xl p-6 flex flex-col"
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center font-black text-lg shadow-xl uppercase">
                      {(selectedUser.name || selectedUser.title).charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-black tracking-tight uppercase font-serif">{selectedUser.name || selectedUser.title}</h2>
                      <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Profile Insight</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                    <XCircle size={20} className="text-gray-300" />
                  </button>
                </div>

                <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                  <div className="grid grid-cols-2 gap-4">
                     {[
                       { label: 'Identity ID', value: selectedUser.id },
                       { label: 'Status', value: selectedUser.status, type: 'status' },
                       { label: 'Primary Contact', value: selectedUser.phone || 'N/A' },
                       { label: 'Access Point', value: selectedUser.email || 'System' }
                     ].map((item, i) => (
                       <div key={i} className="p-3 bg-gray-50 rounded-xl border border-black/5">
                         <p className="text-[7px] font-black text-gray-400 uppercase mb-1 tracking-widest">{item.label}</p>
                         {item.type === 'status' ? (
                           <span className={`text-[8px] font-black uppercase tracking-widest ${getStatusColor(item.value)}`}>{item.value}</span>
                         ) : (
                           <p className="text-[10px] font-bold text-black uppercase">{item.value}</p>
                         )}
                       </div>
                     ))}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-[9px] font-black text-black uppercase tracking-widest border-b border-black/5 pb-2 font-serif">Security & Governance</h3>
                    <div className="grid grid-cols-1 gap-2">
                       <button className="flex items-center justify-between p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all group">
                         <div className="flex items-center gap-2">
                           <Ban size={14} />
                           <span className="text-[10px] font-black uppercase">Restrict Node Access</span>
                         </div>
                         <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                       </button>
                       <button className="flex items-center justify-between p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all group">
                         <div className="flex items-center gap-2">
                           <UserCheck size={14} />
                           <span className="text-[10px] font-black uppercase">Approve Credentials</span>
                         </div>
                         <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                       </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-[9px] font-black text-black uppercase tracking-widest border-b border-black/5 pb-2 font-serif">Operational Records</h3>
                    <div className="p-4 bg-gray-50 rounded-xl border border-black/5 space-y-4">
                       <div className="flex justify-between items-center">
                         <span className="text-[9px] font-bold text-gray-400 uppercase">Last Activity</span>
                         <span className="text-[9px] font-black text-black">OCT 24, 14:32</span>
                       </div>
                       <div className="flex justify-between items-center">
                         <span className="text-[9px] font-bold text-gray-400 uppercase">System Integrity</span>
                         <span className="text-[9px] font-black text-emerald-600 uppercase">OPTIMAL</span>
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
