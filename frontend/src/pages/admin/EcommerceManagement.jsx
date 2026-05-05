import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  ShoppingBag, 
  Package, 
  Truck, 
  RefreshCcw, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit2, 
  Trash2,
  Tag,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Ban,
  Tickets
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminEcommerceManagement = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'inventory', label: 'Inventory SKU', icon: Package },
    { id: 'orders', label: 'Order Tracking', icon: Truck },
    { id: 'refunds', label: 'Refund Control', icon: RefreshCcw },
    { id: 'coupons', label: 'Discount Engine', icon: Tickets },
  ];

  const [ecommerceData, setEcommerceData] = useState({
    inventory: [
      { id: 'SKU-001', name: 'Engine Oil XL', category: 'Lubricants', stock: 45, price: '₹450', status: 'In Stock' },
      { id: 'SKU-002', name: 'Brake Pad Set', category: 'Brakes', stock: 12, price: '₹1,200', status: 'Low Stock' },
    ],
    orders: [
      { id: 'ORD-001', customer: 'Rahul K.', items: 3, total: '₹2,450', status: 'Shipped', date: 'Oct 24' },
    ],
    refunds: [
      { id: 'RF-001', orderId: 'ORD-002', customer: 'Amit S.', amount: '₹1,200', status: 'Pending', reason: 'Defective' },
    ],
    coupons: [
      { id: 'CP-001', code: 'DIWALI50', discount: '50%', usage: '120/500', status: 'Active' },
    ]
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      if (tab === 'orders') setActiveTab('orders');
      else if (tab === 'refunds') setActiveTab('refunds');
      else if (tab === 'coupons') setActiveTab('coupons');
      else setActiveTab(tab);
    } else {
      setActiveTab('inventory');
    }
  }, [location]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': case 'Shipped': case 'Active': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Low Stock': case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Out of Stock': case 'Rejected': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-50 text-gray-400 border-gray-100';
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-5">
        
        {/* Header Section */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-black/5 shadow-sm">
          <div className="space-y-1">
            <h1 className="text-xl font-black text-black tracking-tighter uppercase font-serif">Commerce Terminal</h1>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Global Logistics & Inventory</p>
          </div>
          <div className="flex gap-3">
             <div className="flex items-center bg-gray-50 border border-black/5 rounded-lg px-4 py-1.5 w-64 group focus-within:bg-white focus-within:shadow-md transition-all">
               <Search size={14} className="text-gray-300 group-focus-within:text-black" />
               <input 
                 type="text" 
                 placeholder="Search SKU/Orders..." 
                 className="bg-transparent border-none focus:ring-0 text-[10px] ml-2 w-full text-black placeholder:text-gray-300 font-bold uppercase tracking-widest"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
             </div>
             <button className="bg-black text-white px-5 py-1.5 rounded-lg font-black text-[10px] uppercase tracking-widest shadow-lg shadow-black/10 hover:scale-105 transition-all flex items-center gap-2">
               <Plus size={14} />
               Add Product
             </button>
          </div>
        </div>

        {/* Commerce Hub Matrix */}
        <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden min-h-[500px]">
          <div className="flex border-b border-gray-100 px-4 bg-gray-50/50 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-4 text-[9px] font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${
                  activeTab === tab.id ? 'text-black' : 'text-gray-400 hover:text-black'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="commerceTabUnderline" className="absolute bottom-0 left-5 right-5 h-0.5 bg-black rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                 <tr className="text-[8px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 bg-gray-50/20">
                    <th className="px-6 py-3">Vector ID</th>
                    <th className="px-6 py-3">Product & Details</th>
                    <th className="px-6 py-3">Metrics</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                 <AnimatePresence mode="popLayout">
                   {ecommerceData[activeTab]?.filter(item => (item.name || item.customer || item.code).toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                     <motion.tr 
                       key={item.id}
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       exit={{ opacity: 0 }}
                       className="hover:bg-gray-50/80 transition-colors group cursor-pointer"
                     >
                       <td className="px-6 py-4 font-mono text-[9px] font-black text-gray-300 group-hover:text-black">{item.id}</td>
                       <td className="px-6 py-4">
                         <div>
                            <p className="font-black text-xs text-black uppercase tracking-tight leading-tight">{item.name || item.customer || item.code}</p>
                            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{item.category || item.date || item.reason || 'Commerce Asset'}</p>
                         </div>
                       </td>
                       <td className="px-6 py-4">
                          <div className="flex flex-col gap-0.5">
                             <span className="text-[10px] font-black text-black uppercase">{item.price || item.total || item.amount || item.discount || 'N/A'}</span>
                             <span className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">{item.stock ? item.stock + ' Units' : item.items ? item.items + ' Items' : item.usage || 'Market Value'}</span>
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded-md text-[7px] font-black uppercase tracking-widest border ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                       </td>
                       <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-1.5 opacity-100 transition-opacity">
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
      </div>
    </AdminLayout>
  );
};

export default AdminEcommerceManagement;
