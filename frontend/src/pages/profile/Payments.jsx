import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Plus, CreditCard, Wallet, 
  Smartphone, ShieldCheck, ChevronRight, 
  Trash2, Star, Zap, Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const Payments = () => {
  const navigate = useNavigate();

  const savedMethods = [
    { id: 1, type: 'UPI', label: 'GPay / cliq@okhdfc', icon: Smartphone, default: true },
    { id: 2, type: 'Card', label: 'HDFC Bank •••• 8812', icon: CreditCard, expiry: '09/28' },
    { id: 3, type: 'Wallet', label: 'Paytm Wallet', icon: Wallet }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32 font-['Outfit']">
      {/* 🚀 Compact Header */}
      <div className="px-6 pt-10 pb-5 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-40 backdrop-blur-xl bg-white/80">
          <button 
             onClick={() => navigate(-1)}
             className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100"
          >
             <ChevronLeft size={16} />
          </button>
          <div className="text-center">
             <span className="text-[7px] font-bold tracking-[0.3em] text-[#004AAD] uppercase block mb-0.5">Financial Hub</span>
             <h2 className="text-[10px] font-semibold text-slate-900 uppercase tracking-widest leading-none">Payment Methods</h2>
          </div>
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#004AAD] border border-slate-100 shadow-sm">
             <Zap size={14} fill="currentColor" />
          </div>
       </div>

       <div className="px-5 py-6">
          {/* Main Wallet Balance */}
          <div className="bg-[#0A0E17] rounded-[2.2rem] p-7 text-white relative overflow-hidden mb-8 border border-white/5 shadow-2xl">
             <div className="absolute top-0 right-0 w-40 h-40 bg-[#004AAD]/20 rounded-full -mr-20 -mt-20 blur-3xl opacity-60" />
             <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#004AAD] mb-2 px-1">Active Balance</p>
                <div className="flex items-baseline gap-2 mb-6">
                   <h1 className="text-3xl font-bold tracking-tighter italic">₹4,250.00</h1>
                   <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Available</span>
                </div>
                <div className="flex gap-2">
                   <button className="h-10 px-6 bg-white text-[#0A0E17] rounded-xl text-[9px] font-bold uppercase tracking-widest active:scale-95 transition-all shadow-xl">
                      Add Credits
                   </button>
                   <button className="h-10 w-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                      <History size={14} />
                   </button>
                </div>
             </div>
          </div>

          <div className="flex items-center justify-between mb-5 px-1">
             <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Saved Channels</h3>
             <button className="text-[8px] font-bold text-[#004AAD] uppercase flex items-center gap-1.5">
                <Plus size={10} /> Add New
             </button>
          </div>

          <div className="space-y-3">
             {savedMethods.map((method) => (
                <div 
                   key={method.id}
                   className="bg-white p-4 rounded-2xl border border-slate-50 flex items-center justify-between group active:scale-[0.98] transition-all"
                >
                   <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-50 group-hover:bg-[#004AAD]/5 group-hover:text-[#004AAD] transition-all">
                         <method.icon size={20} />
                      </div>
                      <div>
                         <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-tight">{method.label}</h4>
                            {method.default && (
                               <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 text-[6px] font-bold uppercase tracking-widest rounded-full border border-emerald-100">Primary</span>
                            )}
                         </div>
                         <p className="text-[8px] font-semibold text-slate-400 uppercase tracking-widest">{method.type} {method.expiry && `• Exp ${method.expiry}`}</p>
                      </div>
                   </div>
                   <button className="w-8 h-8 rounded-lg border border-slate-50 flex items-center justify-center text-slate-200 group-hover:text-slate-400 transition-colors">
                      <ChevronRight size={14} />
                   </button>
                </div>
             ))}
          </div>

          <div className="mt-10 p-6 rounded-[2rem] bg-white border border-slate-100 flex items-center gap-4 shadow-sm">
             <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                <ShieldCheck size={22} />
             </div>
             <div>
                <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-tight mb-0.5">Secured Encryption</h4>
                <p className="text-[8px] font-medium text-slate-400 uppercase tracking-widest leading-relaxed">Transactions are handled through bank-grade SSL certified gateways.</p>
             </div>
          </div>
       </div>

       {/* Footer Branding */}
       <div className="mt-6 flex flex-col items-center gap-2 opacity-30">
          <Lock size={12} className="text-slate-400" />
          <p className="text-[7px] font-bold text-slate-400 uppercase tracking-[0.4em]">Powered by Stripe Connect</p>
       </div>
    </div>
  );
};

export default Payments;
