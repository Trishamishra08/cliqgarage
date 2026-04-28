import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  ShoppingBag, 
  Package, 
  Truck, 
  RotateCcw, 
  Tag, 
  Search, 
  Plus, 
  MoreHorizontal,
  ChevronRight,
  TrendingDown,
  Layers,
  ArrowRight,
  Filter,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EcommerceManagement = () => {
  const [activeTab, setActiveTab] = useState('inventory');

  const products = [
    { id: 'P-501', name: 'Premium Engine Oil', category: 'Lubricants', price: '₹499', stock: 124, status: 'In Stock' },
    { id: 'P-502', name: 'Performance Sprocket', category: 'Parts', price: '₹2,499', stock: 8, status: 'Low Stock' },
    { id: 'P-503', name: 'LED Headlight', category: 'Electrical', price: '₹899', stock: 45, status: 'In Stock' },
    { id: 'P-504', name: 'Brake Pads', category: 'Brakes', price: '₹350', stock: 0, status: 'Out of Stock' },
  ];

  const orders = [
    { id: 'ORD-2021', customer: 'Rahul S.', items: 3, total: '₹2,150', status: 'Shipped', date: 'Oct 24' },
    { id: 'ORD-2022', customer: 'Sita M.', items: 1, total: '₹499', status: 'Processing', date: 'Oct 25' },
    { id: 'ORD-2023', customer: 'Vikram A.', items: 2, total: '₹1,200', status: 'Delivered', date: 'Oct 22' },
  ];

  const returns = [
    { id: 'RET-101', customer: 'Karan J.', product: 'LED Headlight', reason: 'Defective', status: 'Pending', date: 'Oct 23' },
    { id: 'RET-102', customer: 'Anjali P.', product: 'Brake Pads', reason: 'Wrong Size', status: 'Refunded', date: 'Oct 21' },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold text-black tracking-tight leading-none">Shop & Logistics</h1>
            <p className="text-xs text-gray-400 font-medium">Manage catalog, order lifecycle, and supply chain.</p>
          </div>
          <button className="bg-black text-white px-5 py-2.5 rounded-xl font-bold text-[11px] shadow-lg shadow-black/10 hover:scale-[1.02] transition-all active:scale-95 flex items-center gap-2 uppercase tracking-widest">
            <Plus size={16} />
            New product
          </button>
        </div>

        {/* Dynamic Vitals */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Inventory', value: '1,240', icon: Package, color: 'text-blue-500' },
            { label: 'Active Orders', value: '45', icon: Truck, color: 'text-orange-500' },
            { label: 'Returns', value: '02', icon: RotateCcw, color: 'text-red-500' },
            { label: 'Promos', value: '08', icon: Tag, color: 'text-purple-500' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-black transition-all">
              <div className={`p-2.5 rounded-lg bg-gray-50 ${item.color} group-hover:bg-black group-hover:text-white transition-all shadow-sm`}>
                <item.icon size={18} />
              </div>
              <div>
                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-0.5">{item.label}</p>
                <p className="text-base font-bold text-black leading-none">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-50 px-6 bg-gray-50/30 overflow-x-auto no-scrollbar">
            {[
              { id: 'inventory', label: 'Inventory', icon: Package },
              { id: 'orders', label: 'Orders', icon: Truck },
              { id: 'returns', label: 'Returns', icon: RotateCcw },
              { id: 'discounts', label: 'Discounts', icon: Tag },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest relative transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id ? 'text-black' : 'text-gray-300 hover:text-gray-500'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="ecommerceTabUnderline" className="absolute bottom-0 left-6 right-6 h-0.5 bg-black rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="p-5">
            <AnimatePresence mode="wait">
              {activeTab === 'inventory' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <div className="flex items-center bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5 w-64 shadow-sm focus-within:ring-1 focus-within:ring-black/5 transition-all">
                      <Search size={14} className="text-gray-300" />
                      <input type="text" placeholder="Filter inventory..." className="bg-transparent border-none focus:ring-0 text-[11px] ml-2 w-full text-black placeholder:text-gray-300 font-medium" />
                    </div>
                    <button className="flex items-center gap-2 border border-gray-100 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all shadow-sm">
                      <Layers size={14} />
                      Categories
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[9px] font-bold text-gray-300 uppercase tracking-widest border-b border-gray-50">
                          <th className="px-6 py-3">SKU</th>
                          <th className="px-6 py-3">Product</th>
                          <th className="px-6 py-3">Price</th>
                          <th className="px-6 py-3">Stock</th>
                          <th className="px-6 py-3">Status</th>
                          <th className="px-6 py-3"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {products.map((prod) => (
                          <tr key={prod.id} className="hover:bg-gray-50/50 transition-colors group cursor-default">
                            <td className="px-6 py-3 font-mono text-[10px] font-bold text-gray-400 group-hover:text-black transition-colors">{prod.id}</td>
                            <td className="px-6 py-3">
                              <div>
                                <p className="font-bold text-xs text-black leading-tight">{prod.name}</p>
                                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter mt-0.5">{prod.category}</p>
                              </div>
                            </td>
                            <td className="px-6 py-3 font-bold text-xs text-black">{prod.price}</td>
                            <td className="px-6 py-3">
                              <span className="text-[10px] font-bold text-black">{prod.stock} U</span>
                            </td>
                            <td className="px-6 py-3">
                              <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                                prod.status === 'In Stock' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                              }`}>
                                {prod.status}
                              </span>
                            </td>
                            <td className="px-6 py-3 text-right">
                              <button className="p-1.5 text-gray-300 hover:text-black opacity-0 group-hover:opacity-100 transition-all"><MoreHorizontal size={14} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[9px] font-bold text-gray-300 uppercase tracking-widest border-b border-gray-50">
                        <th className="px-6 py-3">Order ID</th>
                        <th className="px-6 py-3">Customer</th>
                        <th className="px-6 py-3">Payload</th>
                        <th className="px-6 py-3">Total</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-gray-50/50 transition-colors group cursor-default">
                          <td className="px-6 py-4 font-mono text-[10px] font-bold text-gray-400 group-hover:text-black">{ord.id}</td>
                          <td className="px-6 py-4 text-xs font-bold text-black">{ord.customer}</td>
                          <td className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{ord.items} Items</td>
                          <td className="px-6 py-4 text-xs font-bold text-black">{ord.total}</td>
                          <td className="px-6 py-4">
                            <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                              ord.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                            }`}>
                              {ord.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-[10px] font-bold text-gray-300 uppercase">{ord.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}

              {activeTab === 'returns' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  {returns.map((ret) => (
                    <div key={ret.id} className="p-4 bg-gray-50/50 rounded-xl border border-transparent hover:bg-white hover:border-gray-100 transition-all group flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-lg ${ret.status === 'Pending' ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-500'} shadow-sm`}>
                          <RotateCcw size={18} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-mono text-[9px] font-bold text-gray-300 uppercase tracking-widest">{ret.id}</span>
                            <span className={`text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full ${
                              ret.status === 'Pending' ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'
                            }`}>
                              {ret.status}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-black">{ret.product}</h4>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5">{ret.customer} • {ret.reason}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-300 uppercase mb-2">{ret.date}</p>
                        <button className="bg-black text-white px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2">
                          Review <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'discounts' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center group hover:border-black transition-all cursor-pointer bg-gray-50/30">
                    <div className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Tag size={20} className="text-gray-300 group-hover:text-black transition-colors" />
                    </div>
                    <h4 className="text-sm font-bold text-black uppercase tracking-tight">Flash Campaign</h4>
                    <p className="text-[9px] text-gray-400 mt-1 font-medium">Generate strategic promo codes.</p>
                  </div>
                  <div className="bg-black p-6 rounded-2xl text-white relative overflow-hidden shadow-xl shadow-black/10">
                    <div className="absolute -top-4 -right-4 opacity-10 rotate-12"><Tag size={60} /></div>
                    <h4 className="text-base font-bold mb-0.5">Active Promotion</h4>
                    <p className="text-white/40 text-[9px] mb-6 font-bold uppercase tracking-[0.2em]">DIWALI2023 • 20% OFF</p>
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest">
                        <span className="text-white/40">Efficiency</span>
                        <span>124/500 Used</span>
                      </div>
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                        <div className="bg-white w-[25%] h-full shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
                      </div>
                    </div>
                    <button className="w-full py-2.5 bg-white text-black rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 hover:scale-[1.02]">
                      Manage <ArrowRight size={12} />
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

export default EcommerceManagement;
