import React, { useState } from 'react';
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
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('customers');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'mechanics', label: 'Mechanics', icon: Wrench },
    { id: 'rental_partners', label: 'Rental Partners', icon: Bike },
  ];

  const userData = {
    customers: [
      { id: 'C-001', name: 'Arjun Mehra', email: 'arjun@example.com', joined: 'Oct 12, 2023', status: 'Active', bookings: 5 },
      { id: 'C-002', name: 'Kiran Devi', email: 'kiran@example.com', joined: 'Oct 15, 2023', status: 'Blocked', bookings: 2 },
      { id: 'C-003', name: 'Suresh Raina', email: 'suresh@example.com', joined: 'Oct 18, 2023', status: 'Active', bookings: 12 },
    ],
    mechanics: [
      { id: 'M-001', name: 'Pankaj Garage', type: 'Multi-brand', location: 'Okhla, Delhi', status: 'Pending', rating: 4.8 },
      { id: 'M-002', name: 'Speedy Repairs', type: 'Two-wheeler', location: 'Dwarka, Delhi', status: 'Approved', rating: 4.5 },
      { id: 'M-003', name: 'Elite Motors', type: 'Premium Bikes', location: 'Gurugram', status: 'Approved', rating: 4.9 },
    ],
    rental_partners: [
      { id: 'R-001', name: 'City Rides', fleet: 24, location: 'Saket, Delhi', status: 'Approved', revenue: '₹45,000' },
      { id: 'R-002', name: 'Bike Zone', fleet: 12, location: 'Noida Sector 62', status: 'Pending', revenue: '₹0' },
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': case 'Approved': return 'bg-green-50 text-green-600';
      case 'Pending': return 'bg-yellow-50 text-yellow-600';
      case 'Blocked': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-400';
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold text-black tracking-tight">Partner Ecosystem</h1>
            <p className="text-xs text-gray-400 font-medium">Manage and monitor business partners.</p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center bg-white border border-gray-100 rounded-xl px-4 py-2 w-64 shadow-sm focus-within:ring-1 focus-within:ring-black/5 transition-all">
              <Search size={16} className="text-gray-300" />
              <input 
                type="text" 
                placeholder={`Search ${activeTab}...`} 
                className="bg-transparent border-none focus:ring-0 text-xs ml-2 w-full text-black placeholder:text-gray-300 font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-black text-white px-5 py-2 rounded-xl font-bold text-xs shadow-lg shadow-black/10 hover:scale-[1.02] transition-all flex items-center gap-2">
              <Filter size={14} />
              Filter
            </button>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-50 px-6 bg-gray-50/30">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-[10px] font-bold uppercase tracking-widest transition-all relative ${
                  activeTab === tab.id ? 'text-black' : 'text-gray-300 hover:text-gray-500'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-6 right-6 h-0.5 bg-black rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* User Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[9px] font-bold text-gray-300 uppercase tracking-widest border-b border-gray-50">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Profile</th>
                  {activeTab === 'customers' ? (
                    <>
                      <th className="px-6 py-4">Joined</th>
                      <th className="px-6 py-4">Volume</th>
                    </>
                  ) : activeTab === 'mechanics' ? (
                    <>
                      <th className="px-6 py-4">Area</th>
                      <th className="px-6 py-4">Trust</th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-4">Fleet</th>
                      <th className="px-6 py-4">Revenue</th>
                    </>
                  )}
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence mode="popLayout">
                  {userData[activeTab].map((user) => (
                    <motion.tr 
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50/50 transition-colors group cursor-default"
                    >
                      <td className="px-6 py-4 font-mono text-[10px] font-bold text-gray-400 group-hover:text-black transition-colors">{user.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-black font-bold text-[10px] shadow-sm">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-xs text-black leading-tight">{user.name}</p>
                            <p className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter mt-0.5">{user.email || user.type || user.location}</p>
                          </div>
                        </div>
                      </td>
                      {activeTab === 'customers' ? (
                        <>
                          <td className="px-6 py-4 text-xs font-medium text-gray-500">{user.joined}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-black">{user.bookings}</span>
                              <span className="text-[9px] font-bold text-gray-300 uppercase">Hits</span>
                            </div>
                          </td>
                        </>
                      ) : activeTab === 'mechanics' ? (
                        <>
                          <td className="px-6 py-4 text-xs font-medium text-gray-500">{user.location}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1 text-yellow-500">
                              <span className="font-bold text-xs text-black">{user.rating}</span>
                              <span className="text-[10px]">★</span>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 text-xs font-bold text-black">{user.fleet} Units</td>
                          <td className="px-6 py-4 text-xs font-bold text-black">{user.revenue}</td>
                        </>
                      )}
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {user.status === 'Pending' ? (
                            <>
                              <button className="p-2 bg-white border border-gray-100 rounded-full text-green-500 hover:shadow-md transition-all" title="Approve">
                                <CheckCircle size={14} />
                              </button>
                              <button className="p-2 bg-white border border-gray-100 rounded-full text-red-500 hover:shadow-md transition-all" title="Reject">
                                <XCircle size={14} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button className="p-2 bg-white border border-gray-100 rounded-full text-gray-300 hover:text-black hover:shadow-md transition-all" title="Edit">
                                <MoreHorizontal size={14} />
                              </button>
                              <button className="p-2 bg-white border border-gray-100 rounded-full text-gray-300 hover:text-red-500 hover:shadow-md transition-all" title="Block">
                                <Slash size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
