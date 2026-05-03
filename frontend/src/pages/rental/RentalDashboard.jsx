import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, X, Plus, Edit3, Trash2, LogOut, Bike, Clock, 
  DollarSign, CheckCircle2, Calendar, TrendingUp, BarChart2, 
  AlertCircle, Trash, Copy, Shield, Star, ChevronLeft, ChevronRight, User, Wallet, Bell, Search, Settings, Car, LayoutGrid, MapPin, Camera, Info, Mail, Phone, MessageSquare, Store, FileText, Image as ImageIcon, Mic, Volume2, UserPlus, Activity
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import RentalBottomNav from '../../components/rental/RentalBottomNav';
import bikeImage from '../../assets/bike.png';
import carImage from '../../assets/Side_view_of_blue_generic_unbranded_suv_car_isolated_on_white_background___Premium_Photo-removebg-preview.png';
import logo from '../../assets/logo.png';


const CliqLogo = ({ size = 24, className = "text-blue-600" }) => (
  <div className={twMerge("flex items-center justify-center", className)} style={{ width: size, height: size }}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="currentColor" />
      <path d="M50 15 L80 30 L80 70 L50 85 L20 70 L20 30 Z" fill="white" />
      <circle cx="50" cy="50" r="15" fill="currentColor" />
    </svg>
  </div>
);

const AddressModal = ({ address, onSave, onClose }) => {
  const [formData, setFormData] = useState(address || { label: '', sub: '' });

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[200] flex items-center justify-center p-6"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-md bg-white rounded-[1.5rem] p-8 shadow-2xl"
      >
        <h3 className="text-xl font-black text-[#1A1A1A] font-['Space_Grotesk'] uppercase tracking-tight mb-6 text-center">
          Edit Address
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-2">Label</label>
            <input 
              type="text" 
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="e.g. Home, Work, Shop"
              className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-[#1A1A1A] focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
            />
          </div>
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-2">Address Details</label>
            <textarea 
              rows="3"
              value={formData.sub}
              onChange={(e) => setFormData({ ...formData, sub: e.target.value })}
              placeholder="Full address details..."
              className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-[#1A1A1A] focus:ring-2 focus:ring-blue-500/20 transition-all outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4">
            <button 
              onClick={onClose}
              className="py-4 bg-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={() => onSave(formData)}
              className="py-4 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const DocumentViewModal = ({ document, onClose, onReupload }) => {
  if (!document) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[200] flex items-center justify-center p-6"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-md bg-white rounded-[2rem] overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-[#1A1A1A] font-['Space_Grotesk'] uppercase tracking-tight">{document.label}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: document.color }} />
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: document.color }}>{document.status}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 active:scale-90 transition-all">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-8">
           {document.status === 'NOT UPLOADED' ? (
             <div className="aspect-[4/3] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-6">
                <FileText size={48} className="text-slate-200 mb-4" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No document uploaded yet</p>
             </div>
           ) : (
             <div className="space-y-6">
                <div className="aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden shadow-inner relative group border border-slate-200">
                   <img 
                     src={`https://placehold.co/600x400/f8fafc/64748b?text=${document.label.replace(' ', '+')}`} 
                     alt="document" 
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                        <Search className="text-white" size={24} />
                      </div>
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Uploaded On</p>
                      <p className="text-[10px] font-bold text-[#1A1A1A]">May 01, 2026</p>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Expiry Date</p>
                      <p className="text-[10px] font-bold text-[#1A1A1A]">Dec 2030</p>
                   </div>
                </div>
             </div>
           )}
        </div>

        <div className="p-6 bg-slate-50/50 flex gap-3">
           <button 
             onClick={onClose}
             className="flex-1 py-4 bg-white border border-slate-200 text-[#1A1A1A] rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm active:scale-95 transition-all"
           >
             Close Preview
           </button>
           {document.status !== 'VERIFIED' && (
             <button 
               onClick={onReupload}
               className="flex-1 py-4 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
             >
               Re-upload
             </button>
           )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const VirtualCallModal = ({ onClose }) => {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[500] bg-[#0A0A0A] flex flex-col items-center justify-between py-24"
    >
      <div className="text-center space-y-6 pt-10">
        <div className="w-28 h-28 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-2xl relative">
          <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" />
          <Phone className="text-white" size={48} />
        </div>
        <div>
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Cliq Support</h3>
          <p className="text-blue-400 font-black text-sm tracking-[0.3em] uppercase mt-2 opacity-60">Emergency SOS Line</p>
          <p className="text-white/40 text-2xl font-mono mt-8 tracking-wider">{formatTime(seconds)}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-12 mb-10">
        {[
          { icon: Mic, label: 'Mute' },
          { icon: Volume2, label: 'Speaker' },
          { icon: UserPlus, label: 'Add' },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white border border-white/5 active:bg-white/10 transition-all shadow-sm">
              <item.icon size={22} />
            </div>
            <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em]">{item.label}</p>
          </div>
        ))}
      </div>

      <button 
        onClick={onClose}
        className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white shadow-[0_0_50px_rgba(239,68,68,0.3)] active:scale-95 transition-all mb-10"
      >
        <X size={40} />
      </button>
    </motion.div>
  );
};

const WithdrawalModal = ({ amount, onClose, onComplete }) => {
  const [step, setStep] = useState(0);
  const steps = ["Initializing Transfer", "Verifying KYC Details", "Processing via UPI Gateway", "Finalizing Settlement"];

  useEffect(() => {
    if (step < steps.length) {
      const timer = setTimeout(() => setStep(step + 1), 1500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
        onClose();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, onComplete, onClose, steps.length]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[300] flex items-center justify-center p-6"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} 
        animate={{ scale: 1, y: 0 }} 
        className="relative bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl text-center"
      >
        {step < steps.length ? (
          <>
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
              <DollarSign className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-black text-[#1A1A1A] uppercase tracking-tighter mb-2">Processing Payout</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-8">{steps[step]}</p>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: `${(step / steps.length) * 100}%` }} 
                className="h-full bg-blue-600" 
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-emerald-500" size={40} />
            </div>
            <h3 className="text-xl font-black text-[#1A1A1A] uppercase tracking-tighter mb-2">Transfer Successful</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">₹{amount} settled to your bank</p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

const BannerModal = ({ banner, onSave, onClose }) => {
  const [formData, setFormData] = useState(banner || { title: '', image: '', status: 'Active' });
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData({ ...formData, image: url });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[200] flex items-center justify-center p-6"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-md bg-white rounded-[1.5rem] p-8 shadow-2xl"
      >
        <h3 className="text-xl font-black text-[#1A1A1A] font-['Space_Grotesk'] uppercase tracking-tight mb-6 text-center">
          {banner ? 'Edit Banner' : 'New Ad Banner'}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-2">Banner Title</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Summer Special"
              className="w-full bg-[#F8FAFF] border border-blue-50/50 rounded-2xl py-4 px-6 text-xs font-bold text-[#1A1A1A] focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
            />
          </div>

          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-2">Banner Image</label>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-video bg-[#F8FAFF] border-2 border-dashed border-blue-100/50 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50/30 transition-all group overflow-hidden"
            >
              {formData.image ? (
                <img src={formData.image} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm mb-2 group-hover:scale-110 transition-transform">
                    <ImageIcon size={18} className="text-blue-500" />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Image File</p>
                  <p className="text-[8px] text-slate-300 font-bold uppercase mt-1 tracking-tighter">Recommended: 800x400</p>
                </>
              )}
            </div>
          </div>
          
          <div className="pt-4">
            <button 
              onClick={() => {
                // Temporary check for "Create Account First"
                const isTempUser = true; // Simulating a temporary session
                if (isTempUser) {
                  alert("Please create an account first to publish banners permanently.");
                  return;
                }
                onSave(formData);
              }}
              disabled={!formData.title || !formData.image}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all border border-blue-500 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
            >
              {banner ? 'Update Banner' : 'Publish Banner'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AdBannersContent = ({ onBack, banners, onAdd, onEdit, onDelete }) => {
  return (
    <PageWrapper 
      title="Ad Banners" 
      subtitle="Marketing" 
      onBack={onBack}
      action={
        <button onClick={onAdd} className="w-11 h-11 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all">
          <Plus size={22} />
        </button>
      }
    >
      <div className="pt-4 grid grid-cols-2 gap-3 px-1">
        {banners.map((ad, i) => (
          <motion.div 
            key={ad.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-none overflow-hidden border border-slate-100 shadow-xl shadow-blue-500/5 group relative flex flex-col"
          >
            <div className="h-20 relative overflow-hidden">
              <img src={ad.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="ad" />
              <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 flex items-center gap-1 shadow-lg">
                <div className="w-1 h-1 rounded-full bg-[#D4E70D] animate-pulse" />
                <span className="text-[6px] font-black text-white uppercase tracking-widest">Active</span>
              </div>
            </div>
            
            <div className="p-2 flex-1 flex flex-col">
              <h4 className="text-[9px] font-black text-[#1A1A1A] uppercase tracking-tight mb-2 line-clamp-1 leading-tight min-h-[1.2rem]">
                {ad.title}
              </h4>
              
              <div className="mt-auto flex items-center justify-between gap-1.5 pt-2 border-t border-slate-50">
                <div className="flex gap-1">
                  <button 
                    onClick={() => onDelete(ad.id)} 
                    className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all active:scale-90 border border-red-100/50"
                  >
                    <Trash2 size={10} />
                  </button>
                  <button 
                    onClick={() => onNavigate('live_map')} 
                    className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all active:scale-90 border border-emerald-100/50"
                  >
                    <MapPin size={10} />
                  </button>
                </div>
                <button 
                  onClick={() => onEdit(ad)} 
                  className="flex-1 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95 border border-blue-100/50 flex items-center justify-center gap-1"
                >
                  <Edit3 size={10} /> Edit
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  );
};

/* ─── UI COMPONENTS ─── */

const PageWrapper = ({ title, subtitle, children, onBack, action }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }} 
    animate={{ opacity: 1, x: 0 }} 
    exit={{ opacity: 0, x: -20 }}
    className="h-full flex flex-col bg-[#F0F4F8]"
  >
    <div className="flex items-center justify-between mb-4 pt-1 -ml-2">
      <div className="flex items-center gap-1">
        <button onClick={onBack} className="p-2 text-[#1A1A1A] active:scale-95 transition-all">
          <ChevronLeft size={22} />
        </button>
        <div>
          <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.25em] leading-none mb-1 opacity-60">{subtitle}</p>
          <h2 className="text-lg font-black text-[#1A1A1A] font-['Space_Grotesk'] leading-none uppercase tracking-tighter">{title}</h2>
        </div>
      </div>
      {action}
    </div>
    <div className="flex-1 overflow-y-auto pb-20">
      {children}
    </div>
  </motion.div>
);

const BannerCarousel = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (!banners || banners.length === 0) return null;

  return (
    <div className="relative h-44 rounded-none overflow-hidden mb-6 shadow-2xl group -mx-4 w-[calc(100%+2rem)]">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ x: '100%', opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 1 }}
          transition={{ 
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 }
          }}
          className="absolute inset-0"
        >
          <img 
            src={banners[currentIndex].image} 
            className="w-full h-full object-cover" 
            alt={banners[currentIndex].title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-7 right-7">
            <div className="flex items-center gap-2 mb-2">
               <span className="px-2 py-0.5 bg-blue-600 text-[7px] font-black text-white uppercase tracking-[0.2em] rounded-md shadow-lg">Featured</span>
               <div className="h-px w-8 bg-white/20" />
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight leading-none mb-1 font-['Space_Grotesk']">
              {banners[currentIndex].title}
            </h3>
            <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Sponsored by CliqGarage</p>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Indicators */}
      <div className="absolute bottom-6 right-7 flex gap-1.5">
        {banners.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentIndex(i)}
            className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`}
          />
        ))}
      </div>

      <div className="absolute top-4 left-7">
         <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-2">
            <Activity size={10} className="text-blue-400" />
            <span className="text-[7px] font-black text-white uppercase tracking-[0.2em]">Live Banners</span>
         </div>
      </div>
    </div>
  );
};

const DashboardHome = ({ onNavigate, banners }) => {
  return (
    <div className="space-y-6 pb-32 pt-4">
      <div className="px-1">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 font-['Space_Grotesk']">Promotional Banner</p>
      </div>
      <BannerCarousel banners={banners} />
      {/* HORIZONTAL CATEGORIES */}
      <div className="flex gap-5 overflow-x-auto pb-6 pt-2 no-scrollbar -mx-6 px-6">
        {[
          { label: 'All', image: bikeImage, color: '#007AFF' },
          { label: 'Cars', image: carImage, color: '#007AFF' },
          { label: 'Bikes', image: bikeImage, color: '#007AFF' },
        ].map((cat, i) => (
          <div key={i} onClick={() => onNavigate('bikes')} className="flex-shrink-0 flex flex-col items-center group cursor-pointer">
            <div className={twMerge(
              "w-20 h-20 rounded-[2rem] p-2 transition-all group-hover:scale-105 active:scale-95 mb-3 border-2",
              i === 0 ? "bg-blue-600 border-blue-400 shadow-xl shadow-blue-600/20" : "bg-white border-slate-100 shadow-sm"
            )}>
              <div className="w-full h-full rounded-[1.5rem] bg-white/10 flex items-center justify-center overflow-hidden">
                <img src={cat.image} alt={cat.label} className="w-full h-full object-contain scale-110" />
              </div>
            </div>
            <p className={twMerge(
              "text-[10px] font-black uppercase tracking-widest",
              i === 0 ? "text-blue-600" : "text-slate-400"
            )}>{cat.label}</p>
          </div>
        ))}
      </div>

      {/* RECENT ACTIVITY SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-tighter">Recent Activity</h3>
          <button onClick={() => onNavigate('history')} className="text-[10px] font-bold text-blue-600 uppercase tracking-wider active:scale-95 transition-all">View All</button>
        </div>
        <div className="space-y-3">
          {[
            { title: 'New Booking', sub: 'BK-1092 • Honda CB350', time: 'Just now', icon: Calendar, color: '#E6F4FF', iconCol: '#1677FF', tab: 'bookings' },
            { title: 'Payment Received', sub: '₹4,500 • UPI Verified', time: '2h ago', icon: BarChart2, color: '#F0F5FF', iconCol: '#2F54EB', tab: 'earnings' },
            { title: 'Bike Returned', sub: 'Royal Enfield 650 • Safe', time: '5h ago', icon: Bike, color: '#F6FFED', iconCol: '#52C41A', tab: 'bikes' },
          ].map((act, i) => (
            <div 
              key={i} 
              onClick={() => onNavigate(act.tab)}
              className="bg-white rounded-[2rem] p-4 flex items-center gap-4 shadow-sm border border-slate-100 cursor-pointer active:scale-[0.98] transition-all group hover:border-blue-100"
            >
              <div style={{ backgroundColor: act.color }} className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 border border-white/50 shadow-sm">
                <act.icon size={13} style={{ color: act.iconCol }} />
              </div>
              <div className="flex-1">
                <h4 className="text-[11px] font-bold text-[#1A1A1A] leading-tight">{act.title}</h4>
                <p className="text-[8px] text-slate-400 mt-1 font-medium uppercase tracking-widest">{act.sub}</p>
              </div>
              <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── CONTENT COMPONENTS ─── */

const FleetContent = ({ bikes, onAdd, onEdit, onDelete, onBack }) => {
  const [fleetTab, setFleetTab] = useState('bikes');
  const filteredFleet = bikes.filter(v => fleetTab === 'all' || (fleetTab === 'bikes' && v.type === 'bike') || (fleetTab === 'cars' && v.type === 'car'));

  const content = (
    <div className="space-y-4 pb-10">
      <div className="flex bg-blue-50/50 p-1 rounded-xl border border-blue-100 mb-2">
        {['bikes', 'cars'].map((t) => (
          <button 
            key={t}
            onClick={() => setFleetTab(t)}
            className={twMerge(
              "flex-1 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all",
              fleetTab === t ? "bg-blue-600 text-white shadow-md" : "text-slate-400"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Fleet Stats Overview */}
      <div className="grid grid-cols-2 gap-3 mb-2">
        <div className="bg-[#001F3D] rounded-2xl p-4 shadow-lg border border-white/5">
          <p className="text-[7px] font-black text-blue-300/60 uppercase tracking-widest mb-1">Total Active</p>
          <div className="flex items-baseline gap-1.5">
            <h4 className="text-xl font-black text-white font-['Space_Grotesk'] tracking-tighter">08</h4>
            <span className="text-[8px] font-bold text-blue-400 uppercase tracking-widest">Vehicles</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">Under Service</p>
          <div className="flex items-baseline gap-1.5">
            <h4 className="text-xl font-black text-[#1A1A1A] font-['Space_Grotesk'] tracking-tighter">02</h4>
            <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Units</span>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {filteredFleet.map((vehicle, i) => (
          <motion.div 
            key={vehicle.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex items-center justify-between group hover:border-blue-100 transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-200/30 to-transparent pointer-events-none" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100">
                <img src={vehicle.type === 'car' ? carImage : bikeImage} alt={vehicle.model} className="w-full h-full object-contain scale-110" />
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-[#1A1A1A] leading-none mb-1.5">{vehicle.model}</h4>
                <div className="flex items-center gap-2">
                  <p className="text-[9px] font-black text-blue-600 tracking-tighter uppercase">₹{vehicle.hourlyRate}<span className="text-[6px] opacity-60 ml-0.5">/hr</span></p>
                  <div className="w-1 h-1 rounded-full bg-slate-200" />
                  <p className="text-[9px] font-black text-slate-400 tracking-tighter uppercase">₹{vehicle.dailyRate}<span className="text-[6px] opacity-60 ml-0.5">/day</span></p>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className={`px-1.5 py-0.5 rounded-lg flex items-center gap-1 ${vehicle.available ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                    <div className={`w-1 h-1 rounded-full ${vehicle.available ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`} />
                    <span className="text-[6px] font-black uppercase tracking-widest">
                      {vehicle.available ? 'Available' : 'On Rent'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <button onClick={() => onEdit(vehicle)} className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center active:scale-90 transition-all text-blue-600 border border-blue-100/50 shadow-sm">
                <Edit3 size={13} />
              </button>
              <button onClick={() => onDelete(vehicle.id)} className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center active:scale-90 transition-all text-red-400 border border-red-100/50 shadow-sm">
                <Trash2 size={13} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <PageWrapper 
      title="My Fleet" 
      subtitle="Management" 
      onBack={onBack}
      action={
        <button onClick={onAdd} className="w-11 h-11 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 active:scale-90 transition-all border border-blue-500">
          <Plus size={22} strokeWidth={3} />
        </button>
      }
    >
      {content}
    </PageWrapper>
  );
};

const BookingsContent = ({ bookings, onAccept, onReject, onBack }) => {
  const content = (
    <div className="space-y-2.5">
      {bookings.map((booking, i) => (
        <motion.div 
          key={booking.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 relative overflow-hidden group hover:border-blue-100 transition-all"
        >
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{booking.id}</span>
            </div>
            <div className={twMerge(
              "px-2.5 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest",
              booking.status === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
            )}>
              {booking.status}
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                <Calendar size={16} className="text-blue-600" />
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-[#1A1A1A] leading-none mb-1">{booking.customer}</h4>
                <p className="text-[9px] text-slate-400 font-medium uppercase tracking-tight">{booking.vehicle || booking.bike}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[12px] font-black text-[#1A1A1A] font-['Space_Grotesk'] tracking-tighter">₹{booking.amount}</p>
              <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest mt-0.5">{booking.date}</p>
            </div>
          </div>

          {booking.status === 'pending' && (
            <div className="flex gap-2 mt-3 pt-3 border-t border-slate-50">
              <button onClick={() => onReject(booking.id)} className="flex-1 py-2.5 bg-slate-50 text-slate-500 rounded-xl text-[9px] font-bold uppercase tracking-widest active:scale-95 transition-all border border-slate-100">Reject</button>
              <button onClick={() => onAccept(booking.id)} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-blue-600/20 border border-blue-500">Accept</button>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );

  return (
    <PageWrapper 
      title="Bookings" 
      subtitle="Requests" 
      onBack={onBack}
    >
      {content}
    </PageWrapper>
  );
};

const PricingContent = ({ pricing, onUpdate, onBack }) => {
  const [activeType, setActiveType] = useState('bike');

  const handleRateChange = (rateType, value) => {
    onUpdate({
      ...pricing,
      [activeType]: {
        ...pricing[activeType],
        [rateType]: value
      }
    });
  };

  return (
    <PageWrapper title="Pricing" subtitle="Setup" onBack={onBack}>
      <div className="space-y-6">
        {/* Type Toggle */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
          {['bike', 'car'].map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={twMerge(
                "flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeType === type ? "bg-white text-blue-600 shadow-lg shadow-blue-600/5" : "text-slate-400"
              )}
            >
              {type}s
            </button>
          ))}
        </div>

        {/* Informative Header */}
        <div className="bg-blue-600 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
            <Info size={14} /> Pricing Strategy
          </h4>
          <p className="text-[10px] font-medium text-white/80 leading-relaxed uppercase tracking-tight">
            Competitive pricing increases booking chances by <span className="font-black text-white">45%</span>. 
            Set reasonable hourly rates for short trips and attractive daily rates for longer rentals.
          </p>
        </div>

        {/* Compact Pricing Cards */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Hourly Rate', key: 'hourly', sub: 'Short Rides' },
            { label: 'Daily Rate', key: 'daily', sub: '24h Rental' },
          ].map((field) => (
            <div key={field.key} className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-50 flex flex-col items-center">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-4">{field.label}</p>
              <div className="relative w-full">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-sm font-black text-blue-500 font-['Space_Grotesk']">₹</span>
                <input 
                  type="number" 
                  value={pricing[activeType][field.key]} 
                  onChange={(e) => handleRateChange(field.key, e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-xl font-black text-[#1A1A1A] font-['Space_Grotesk'] pl-4 text-center" 
                />
              </div>
              <p className="text-[7px] text-slate-300 font-bold uppercase mt-3 tracking-tighter">{field.sub}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[2rem] p-5 border border-slate-50 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center">
              <Zap className="text-orange-500" size={16} />
            </div>
            <p className="text-[10px] font-black text-[#1A1A1A] uppercase tracking-widest">Revenue Forecast</p>
          </div>
          <p className="text-[9px] text-slate-400 font-medium leading-relaxed uppercase tracking-tight mb-2">
            Estimated weekly earnings with these rates:
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-[#1A1A1A] font-['Space_Grotesk']">₹{(pricing[activeType].daily * 4).toLocaleString()}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">/ Week</span>
          </div>
        </div>

        <button 
          onClick={() => showToast(`${activeType.charAt(0).toUpperCase() + activeType.slice(1)} pricing plan updated!`)}
          className="w-full py-4 bg-[#1A1A1A] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
        >
          Save {activeType} Pricing
        </button>
      </div>
    </PageWrapper>
  );
};

const EarningsContent = ({ name, onBack, onOpenWallet, onWithdraw }) => {
  return (
    <PageWrapper title="Earnings" subtitle="Finance" onBack={onBack}>
      <div className="space-y-6 px-4 pb-10">
        {/* Premium Virtual Debit Card - Compact & Modern */}
        <div className="bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] rounded-[2rem] p-7 relative overflow-hidden shadow-2xl border border-white/10 h-[220px] flex flex-col justify-between transition-all hover:shadow-blue-500/20">
          {/* Subtle Glassmorphic Overlays */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-[80px]" />
          
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-[12px] font-black text-white uppercase tracking-widest leading-none">Cliq Garage</p>
              <p className="text-[7px] font-bold text-white/60 uppercase tracking-[0.3em] mt-1">Premium Partner Card</p>
            </div>
            <div className="text-right">
              <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Available Balance</p>
              <div className="flex items-baseline gap-0.5 justify-end">
                <span className="text-3xl font-black text-white font-['Space_Grotesk'] tracking-tighter leading-none">₹45,280</span>
                <span className="text-xs font-black text-white/20 tracking-tighter leading-none">.00</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-5">
            {/* Golden Chip Design */}
            <div className="w-12 h-9 bg-gradient-to-br from-[#D4AF37] via-[#FFD700] to-[#CFB53B] rounded-lg shadow-inner relative overflow-hidden flex items-center justify-center border border-black/10">
              <div className="w-full h-full opacity-30 border-r border-b border-black/20" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)', backgroundSize: '6px 6px' }} />
              <div className="absolute w-8 h-6 border border-black/10 rounded-sm" />
            </div>
            <p className="text-[20px] font-medium text-white font-mono tracking-[0.2em] drop-shadow-lg">**** **** **** 4030</p>
          </div>

          <div className="relative z-10 flex justify-between items-end">
            <div className="flex gap-10">
              <div>
                <p className="text-[7px] font-black text-white/30 uppercase tracking-[0.2em] mb-1 font-['Inter']">Card Holder</p>
                <p className="text-[14px] font-black text-white uppercase tracking-wider font-['Space_Grotesk']">{name}</p>
              </div>
              <div>
                <p className="text-[7px] font-black text-white/30 uppercase tracking-[0.2em] mb-1 font-['Inter']">Valid Thru</p>
                <p className="text-[12px] font-black text-white uppercase tracking-wider font-['Space_Grotesk']">12/28</p>
              </div>
            </div>
            <div className="flex -space-x-3 opacity-90 drop-shadow-lg">
              <div className="w-10 h-10 rounded-full bg-[#EB001B] border border-white/20 shadow-xl" />
              <div className="w-10 h-10 rounded-full bg-[#F79E1B]/90 backdrop-blur-sm border border-white/20 shadow-xl" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <button 
            onClick={onOpenWallet}
            className="py-4 bg-white text-[#1A1A1A] rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-black/5 active:scale-95 transition-all border border-slate-100 flex items-center justify-center gap-2.5"
          >
            <Wallet size={15} className="text-blue-600" /> Wallet
          </button>
          <button 
            onClick={onWithdraw}
            className="py-4 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all border border-blue-500 flex items-center justify-center gap-2.5"
          >
            <DollarSign size={15} /> Withdraw
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-2.5 mt-2">
          {[
            { label: 'Today', value: '₹2,500', trend: '+12%', color: '#1677FF' },
            { label: 'This Week', value: '₹12k', trend: '+18%', color: '#2F54EB' },
            { label: 'This Month', value: '₹45k', trend: '+22%', color: '#722ED1' },
          ].map((e, i) => (
            <div key={i} className="bg-white rounded-[1.5rem] border border-slate-50 shadow-sm p-4 text-center flex flex-col items-center justify-center">
              <p className="text-[7px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2">{e.label}</p>
              <p className="text-[13px] font-black text-[#1A1A1A] font-['Space_Grotesk'] tracking-tight leading-none mb-1.5">{e.value}</p>
              <div className="bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
                <p className="text-[7px] font-black uppercase tracking-widest" style={{ color: e.color }}>{e.trend}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

const ProfileContent = ({ name, profileImage, onSignOut, activeSubView, setActiveSubView, setActiveTab }) => {
  const menuItems = [
    { icon: User, label: 'Profile Settings', sub: 'Manage your personal info', color: '#EBF2FF', iconCol: '#2563EB', action: () => setActiveSubView('profile_edit') },
    { icon: Wallet, label: 'Earnings & Wallet', sub: 'Payouts & transaction history', color: '#EBF2FF', iconCol: '#2563EB', action: () => setActiveTab('earnings') },
    { icon: MapPin, label: 'Business Address', sub: 'Vijay Nagar Main Road · Shop #12', color: '#EBF2FF', iconCol: '#2563EB', action: () => setActiveSubView('address') },
    { icon: Shield, label: 'Fleet Documents', sub: 'RC, Insurance & Permits', color: '#EBF2FF', iconCol: '#2563EB', action: () => setActiveSubView('documents') },
    { icon: Bell, label: 'Notifications', sub: 'Booking alerts & safety updates', color: '#EBF2FF', iconCol: '#2563EB', action: () => setActiveSubView('notifications') },
    { icon: Star, label: 'Partner Rewards', sub: 'Clubs & loyalty benefits', color: '#EBF2FF', iconCol: '#2563EB', action: () => setActiveSubView('rewards') },
    { icon: Info, label: 'Support & Help', sub: 'Contact center & ticketing', color: '#EBF2FF', iconCol: '#2563EB', action: () => setActiveSubView('support') },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="pt-4 pb-6">
        <h2 className="text-2xl font-black text-[#1A1A1A] font-['Space_Grotesk'] leading-tight mb-1.5 uppercase tracking-tight">My Account</h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Manage your profile & settings</p>
      </div>

      <div className="bg-white rounded-xl p-4 mb-4 relative overflow-hidden shadow-xl shadow-blue-500/5 border border-slate-50 w-full">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50/50 to-transparent pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="relative">
            <div className="w-16 h-16 rounded-xl bg-[#1A1A1A] flex items-center justify-center text-white text-xl font-black shadow-xl overflow-hidden border border-white/10">
              {profileImage ? (
                <img src={profileImage} className="w-full h-full object-cover" alt="profile" />
              ) : (
                name.split(' ').map(n => n[0]).join('')
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-[3px] border-white flex items-center justify-center shadow-lg">
              <CheckCircle2 size={10} className="text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-black text-[#1A1A1A] font-['Space_Grotesk'] leading-none uppercase tracking-tight">{name || partnerName}</h3>
              <div className="bg-[#FFFBE6] px-2 py-0.5 rounded-lg flex items-center gap-1 border border-[#FFE58F]">
                <Star size={9} className="text-[#FADB14] fill-[#FADB14]" />
                <span className="text-[10px] font-black text-[#1A1A1A]">4.9</span>
              </div>
            </div>
            <p className="text-[12px] font-bold text-slate-400 mb-1.5 tracking-tight">+91 8839044030</p>
            <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active Partner
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 pb-24">
        <div>
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.25em] mb-4 px-1">System Menu</p>
          <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm w-full">
            {menuItems.map((item, i) => (
              <button 
                key={i} 
                onClick={item.action}
                className={twMerge(
                  "w-full flex items-center justify-between py-3.5 px-5 group hover:bg-blue-50/50 transition-all active:scale-[0.99]",
                  i !== menuItems.length - 1 && "border-b border-slate-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div style={{ backgroundColor: item.color }} className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-white">
                    <item.icon size={16} style={{ color: item.iconCol }} />
                  </div>
                  <div className="text-left">
                    <p className="text-[13px] font-bold text-[#1A1A1A] leading-tight mb-1">{item.label}</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight opacity-80">{item.sub}</p>
                  </div>
                </div>
                <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-transform group-hover:text-blue-400" />
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={() => setActiveSubView('banners')}
          className="w-full bg-blue-600 p-4 rounded-xl flex items-center justify-between shadow-lg shadow-blue-600/20 border border-blue-500 group active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingUp size={16} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-[11px] font-black text-white uppercase tracking-wider">Promotion Ads</p>
              <p className="text-[8px] text-blue-100 font-bold uppercase tracking-widest">Growth & Visibility</p>
            </div>
          </div>
          <ChevronRight size={14} className="text-white/50 group-hover:translate-x-1 transition-transform" />
        </button>

        <button 
          onClick={onSignOut}
          className="w-full py-4 bg-red-50 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 border border-red-100/50 active:scale-95 transition-all shadow-sm"
        >
          <LogOut size={16} /> Sign Out Account
        </button>
      </div>
    </div>
  );
};

const LiveTrackingView = ({ onBack }) => {
  const [zoom, setZoom] = useState(1);
  const content = (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col overflow-hidden">
      {/* ── Interactive Map Area ── */}
      <div className="flex-1 relative bg-[#F0F4F8] overflow-hidden">
        {/* The Draggable Map Layer */}
        <motion.div 
          drag
          dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
          style={{ scale: zoom }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          {/* Mock Map Background Layer - Unique Blue Grid */}
          <div className="absolute inset-[-100%]">
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#D6E4F0 1px, transparent 1px), linear-gradient(90deg, #D6E4F0 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
            <div className="absolute top-[20%] left-0 w-full h-8 bg-white/60 rotate-1 shadow-sm" />
            <div className="absolute top-0 left-[35%] w-12 h-full bg-white/60 -rotate-2 shadow-sm" />
            <div className="absolute top-[70%] left-0 w-full h-12 bg-white/60 -rotate-1 shadow-sm" />
          </div>

          {/* ── Route Line (SVG) ── */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <motion.path 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
              d="M 120 250 L 180 350 L 280 350 L 320 450" 
              fill="none" 
              stroke="#001F3D" 
              strokeWidth="4" 
              strokeDasharray="10 10"
              strokeLinecap="round"
            />
          </svg>

          {/* ── Map Pins ── */}
          {/* Origin Pin */}
          <div className="absolute top-[220px] left-[100px] z-10">
            <div className="w-10 h-10 bg-white rounded-full shadow-2xl border-4 border-[#001F3D] flex items-center justify-center">
              <div className="w-4 h-4 bg-[#001F3D] rounded-sm" />
            </div>
          </div>

          {/* Real Bike Image Moving (Royal Enfield) */}
          <motion.div 
            animate={{ 
              x: [100, 200, 300],
              y: [300, 300, 400],
              rotate: [180, 90, 180]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute z-20"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full scale-150" />
              <div className="w-16 h-16 bg-white rounded-full shadow-2xl border-4 border-blue-600 flex items-center justify-center overflow-hidden">
                <img 
                  src={bikeImage} 
                  alt="bike" 
                  className="w-full h-full object-contain scale-110"
                />
              </div>
            </div>
          </motion.div>

          {/* Destination Pin */}
          <div className="absolute top-[430px] left-[300px] z-10">
            <div className="w-10 h-10 bg-white rounded-full shadow-2xl border-4 border-emerald-500 flex items-center justify-center">
              <div className="w-4 h-4 bg-emerald-500 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* ── Zoom Controls ── */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
          <button onClick={() => setZoom(z => Math.min(z + 0.2, 2))} className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-blue-600 active:scale-90 transition-all border border-blue-50 font-black text-xl">+</button>
          <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-blue-600 active:scale-90 transition-all border border-blue-50 font-black text-xl">−</button>
        </div>

        {/* ── Header Overlay ── */}
        <div className="absolute top-4 left-6 right-6 z-40 flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-[#1A1A1A] active:scale-90 transition-all border border-blue-50">
            <ChevronLeft size={20} />
          </button>
          <div className="bg-[#001F3D] h-9 rounded-full px-5 flex items-center shadow-xl border border-white/10">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse mr-2.5" />
            <p className="text-[9px] font-black uppercase tracking-widest text-white font-['Space_Grotesk']">Tracking Active Rentals</p>
          </div>
        </div>

        {/* ── Bottom Sheet (Compact Peek) ── */}
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="absolute bottom-0 left-0 right-0 z-50 bg-white rounded-t-[2.5rem] shadow-[0_-15px_40px_rgba(0,0,0,0.08)] flex flex-col max-h-[38%]"
        >
          {/* Handle */}
          <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto my-3 shrink-0" />
          
          <div className="flex-1 overflow-y-auto px-6 pb-8 custom-scrollbar">
            {/* Navy Blue ETA Banner */}
            <div className="bg-[#001F3D] rounded-2xl py-3 px-4 text-center mb-5 shadow-lg border border-white/5">
              <p className="text-[7px] font-black text-blue-300 uppercase tracking-[0.3em] mb-1 opacity-50">Estimated Completion</p>
              <h3 className="text-[15px] font-black text-white font-['Space_Grotesk'] tracking-tighter leading-none">15 - 20 Minutes</h3>
            </div>

            <div className="flex items-center justify-between mb-5 p-3.5 bg-slate-50/50 rounded-2xl border border-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <img src="https://i.pravatar.cc/150?u=raj" alt="customer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black text-[#1A1A1A] leading-tight mb-0.5 uppercase tracking-tighter">Raj Kumar</h4>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Active Customer</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-9 h-9 bg-white shadow-sm text-blue-600 rounded-full flex items-center justify-center active:scale-90 transition-all border border-blue-50">
                  <MessageSquare size={14} />
                </button>
                <button className="w-9 h-9 bg-blue-600 text-white shadow-md rounded-full flex items-center justify-center active:scale-90 transition-all">
                  <Phone size={14} />
                </button>
              </div>
            </div>

            <div className="space-y-4 px-1 mb-5">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-blue-600 bg-white flex-shrink-0 shadow-sm" />
                  <div className="w-0.5 h-6 bg-blue-50" />
                  <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-emerald-500 bg-white flex-shrink-0 shadow-sm" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-[8px] font-black text-[#1A1A1A] uppercase tracking-tighter mb-0.5">Pick-up Point</p>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Sector 4, Main Road</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-[#1A1A1A] uppercase tracking-tighter mb-0.5">Destination Hub</p>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">HSR Layout, Sector 7</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-slate-50">
              <div className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-50">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-50">
                  <Bike size={20} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-tighter leading-tight">Honda CB350</h4>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">BK-1092 • 2 Hours Rental</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
  return content;
};

const AddVehicleModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({ model: '', hourly: '', daily: '', type: 'bike' });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="fixed inset-0 z-[100] flex items-end"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div 
            initial={{ y: "100%" }} 
            animate={{ y: 0 }} 
            exit={{ y: "100%" }} 
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full bg-white rounded-t-[2.5rem] p-8 shadow-2xl pb-12"
          >
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-8" />
            <h3 className="text-xl font-black text-[#1A1A1A] font-['Space_Grotesk'] uppercase tracking-tight mb-6 text-center">Add New Vehicle</h3>
            
            <div className="space-y-6">
              {/* Type Selector */}
              <div className="flex gap-2 p-1 bg-slate-50 rounded-xl">
                {['bike', 'car'].map((t) => (
                  <button 
                    key={t}
                    onClick={() => setFormData({ ...formData, type: t })}
                    className={twMerge(
                      "flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2",
                      formData.type === t ? "bg-white shadow-md text-blue-600" : "text-slate-400"
                    )}
                  >
                    {t === 'bike' ? <Bike size={14} /> : <Car size={14} />}
                    {t}
                  </button>
                ))}
              </div>

              <div className="flex justify-center mb-4">
                 <div className="w-28 h-28 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden group">
                    <img src={formData.type === 'car' ? carImage : bikeImage} className="w-full h-full object-contain opacity-40 group-hover:opacity-60 transition-opacity" />
                 </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">Bike Model Name</label>
                <input 
                  type="text" 
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  placeholder="e.g. Royal Enfield 650"
                  className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-[#1A1A1A] focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">Hourly Rate (₹)</label>
                  <input 
                    type="number" 
                    value={formData.hourly}
                    onChange={(e) => setFormData({ ...formData, hourly: e.target.value })}
                    placeholder="500"
                    className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-[#1A1A1A] focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">Daily Rate (₹)</label>
                  <input 
                    type="number" 
                    value={formData.daily}
                    onChange={(e) => setFormData({ ...formData, daily: e.target.value })}
                    placeholder="3000"
                    className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-[#1A1A1A] focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  />
                </div>
              </div>

              <button 
                onClick={() => { 
                  if (formData.model && formData.hourly && formData.daily) {
                    onAdd(formData); 
                    setFormData({ model: '', hourly: '', daily: '', type: 'bike' });
                    onClose(); 
                  }
                }}
                className="w-full py-4 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/30 active:scale-95 transition-all mt-4 border border-blue-500"
              >
                Confirm Add to Fleet
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ─── MAIN DASHBOARD ─── */

const RentalDashboard = () => {
  const navigate = useNavigate();
  const partnerName = "Manish Gupta";

  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSubView, setActiveSubView] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [editBanner, setEditBanner] = useState(null);
  const [toast, setToast] = useState(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const fileInputRef = useRef(null);
  const docInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState('pending'); // 'pending', 'approved', 'rejected'

  const [notifications, setNotifications] = useState([
    { title: 'New Job Request', sub: 'SURAJ CHOUHAN REQUESTED PERIODIC MAINTENANCE', time: 'Just now', icon: Bell },
    { title: 'Payment Received', sub: '₹3,450 ADDED TO YOUR WALLET', time: '10 mins ago', icon: Wallet },
    { title: 'Profile Verified', sub: 'YOUR SHOP DOCUMENTS HAVE BEEN APPROVED', time: '2 hours ago', icon: Shield },
    { title: 'System Alert', sub: 'MAINTENANCE SCHEDULED FOR TONIGHT', time: 'Yesterday', icon: Settings },
  ]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    showToast(`Code ${code} copied!`);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    showToast("Inbox cleared successfully");
  };

  const handleDocUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      showToast(`${file.name} uploaded successfully`);
      setSelectedDocument(prev => prev ? { ...prev, status: 'VERIFIED' } : null);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      showToast('Login Successful');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const [banners, setBikesBanners] = useState([
    { id: 1, title: 'Summer Bike Rental Special', image: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=800&h=400&fit=crop' },
    { id: 2, title: 'SUV Weekend Getaway', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=400&fit=crop' },
  ]);

  const handleAddBanner = (data) => {
    const newBanner = { ...data, id: Date.now() };
    setBikesBanners([newBanner, ...banners]);
  };

  const handleUpdateBanner = (data) => {
    setBikesBanners(banners.map(b => b.id === data.id ? data : b));
  };

  const handleDeleteBanner = (id) => {
    setBikesBanners(banners.filter(b => b.id !== id));
  };
  
  const [bikes, setBikes] = useState([
    { id: 1, model: 'Honda CB350', hourlyRate: 500, dailyRate: 3000, available: true, type: 'bike' },
    { id: 2, model: 'Royal Enfield 650', hourlyRate: 800, dailyRate: 4500, available: false, type: 'bike' },
    { id: 3, model: 'BMW X5 Rental', hourlyRate: 1500, dailyRate: 12000, available: true, type: 'car' },
    { id: 4, model: 'Swift Dzire', hourlyRate: 600, dailyRate: 3500, available: true, type: 'car' },
  ]);
  
  const [bookings, setBookings] = useState([
    { id: 'BK-1092', customer: 'Raj Kumar', bike: 'Honda CB350', date: 'May 02', time: '10:00 AM', duration: '2 Hours', amount: '₹1,000', status: 'pending' },
    { id: 'BK-1090', customer: 'Priya Singh', bike: 'Royal Enfield 650', date: 'May 01', time: '02:00 PM', duration: '1 Day', amount: '₹4,500', status: 'completed' },
  ]);
  
  const [pricing, setPricing] = useState({ 
    bike: { hourly: 500, daily: 3000 },
    car: { hourly: 1500, daily: 10000 }
  });
  
  const [userAddresses, setUserAddresses] = useState([
    { label: 'Home', sub: 'Vijay Nagar, Indore', icon: MapPin, color: '#FFF1F0', iconCol: '#FF4D4F' },
    { label: 'Work', sub: 'Add your office address', icon: Wallet, color: '#F0F5FF', iconCol: '#2F54EB' },
    { label: 'Shop Address', sub: 'Vijay Nagar Main Road · Shop #12', icon: Store, color: '#F6FFED', iconCol: '#52C41A' },
  ]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [supportCategory, setSupportCategory] = useState(null);

  /* ── HANDLERS ── */
  const handleAddBike = (data) => {
    const newBike = {
      id: Date.now(),
      model: data.model,
      hourlyRate: parseInt(data.hourly),
      dailyRate: parseInt(data.daily),
      type: data.type,
      available: true
    };
    setBikes([newBike, ...bikes]);
  };

  const handleEditBike = (bike) => {
    showToast(`Editing ${bike.model}...`);
    // Future: Open edit modal
  };

  const handleDeleteBike = (id) => {
    const bike = bikes.find(b => b.id === id);
    setBikes(bikes.filter(b => b.id !== id));
    showToast(`${bike?.model || 'Vehicle'} removed from fleet`);
  };

  const handleUpdateAddress = (updatedData) => {
    if (editingAddress && editingAddress.index !== undefined) {
      setUserAddresses(userAddresses.map((addr, i) => i === editingAddress.index ? { ...addr, ...updatedData } : addr));
      showToast("Address updated successfully");
    } else {
      const newAddr = {
        label: updatedData.label || 'New Address',
        sub: updatedData.sub || 'Details not provided',
        icon: MapPin,
        color: '#F8FAFF',
        iconCol: '#1677FF'
      };
      setUserAddresses([...userAddresses, newAddr]);
      showToast("New address added");
    }
    setEditingAddress(null);
  };

  const handleDeleteAddress = (index) => {
    setUserAddresses(userAddresses.filter((_, i) => i !== index));
    showToast("Address deleted");
  };

  const handleAcceptBooking = (id) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'accepted' } : b));
  };

  const handleRejectBooking = (id) => {
    setBookings(bookings.filter(b => b.id !== id));
  };

  const handleSignOut = () => {
    navigate('/rental/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col font-['Inter']">
      {/* HEADER */}
      {activeTab === 'dashboard' && (
        <div className="px-6 pt-4 space-y-5 shrink-0">
          {/* COMPACT HEADER */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-[1.1rem] bg-white p-0.5 shadow-md border border-white shrink-0 overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="avatar" className="w-full h-full rounded-[0.9rem] object-cover" />
                ) : (
                  <img src={`https://ui-avatars.com/api/?name=${partnerName}&background=E6F4FF&color=1677FF&bold=true`} alt="avatar" className="w-full h-full rounded-[0.9rem] object-cover" />
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-black text-[#1A1A1A] leading-tight font-['Space_Grotesk'] tracking-tighter uppercase">Hello, {partnerName.split(' ')[0]}</h2>
                  {verificationStatus === 'approved' && <CheckCircle2 size={12} className="text-emerald-500" />}
                </div>
                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-none">Rental Partner Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => {
                  setActiveTab('profile');
                  setActiveSubView('notifications');
                }}
                className="p-2 text-slate-400 relative active:scale-95 transition-all"
              >
                <Bell size={22} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F0F4F8]" />
              </button>
              <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-800 active:scale-95 transition-all">
                <Menu size={22} />
              </button>
            </div>
          </div>

          {verificationStatus === 'pending' && (
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm border border-amber-50">
                <Clock size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-amber-900 uppercase tracking-tighter">Verification Pending</p>
                <p className="text-[8px] font-bold text-amber-700/60 uppercase tracking-widest mt-1">Admin will approve your shop soon</p>
              </div>
              <div className="bg-amber-100 px-2.5 py-1 rounded-lg">
                <p className="text-[7px] font-black text-amber-600 uppercase">Awaiting</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="flex-1 bg-[#F8FAFF] h-11 rounded-xl shadow-sm border border-blue-50/50 flex items-center px-4 gap-2.5 group focus-within:border-blue-200 transition-all">
              <Search size={16} className="text-slate-300 group-focus-within:text-blue-500" />
              <input type="text" placeholder="Search fleet or bookings..." className="bg-transparent border-none outline-none text-[10px] font-bold text-[#1A1A1A] w-full placeholder:text-slate-300 placeholder:font-black uppercase tracking-tight" />
            </div>
            <button 
              onClick={() => setActiveTab('profile')}
              className="w-11 h-11 bg-[#001F3D] rounded-xl shadow-lg flex items-center justify-center text-white active:scale-95 transition-all"
            >
              <Settings size={18} />
            </button>
          </div>

          {/* ACTION CATEGORIES */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { key: 'bikes', label: 'Fleet', icon: Car, color: '#007AFF', iconColor: '#FFFFFF' },
              { key: 'bookings', label: 'Bookings', icon: Calendar, color: '#5856D6', iconColor: '#FFFFFF' },
              { key: 'pricing', label: 'Pricing', icon: DollarSign, color: '#AF52DE', iconColor: '#FFFFFF' },
              { key: 'earnings', label: 'Earnings', icon: BarChart2, color: '#FF2D55', iconColor: '#FFFFFF' },
            ].map(({ key, label, icon: Icon, color, iconColor }) => (
              <button key={key} onClick={() => setActiveTab(key)} className="flex flex-col items-center group">
                <div style={{ backgroundColor: color }} className="w-12 h-12 rounded-2xl flex items-center justify-center mb-1.5 shadow-lg shadow-black/5 border border-white/20 group-hover:scale-110 transition-transform">
                  <Icon size={20} style={{ color: iconColor }} />
                </div>
                <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">{label}</p>
              </button>
            ))}
          </div>

          {/* LIVE TRACKING SECTION */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-[#1A1A1A] font-['Space_Grotesk']">Live Tracking</h3>
                <div className="flex h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              </div>
              <button onClick={() => setActiveTab('live_map')} className="text-[9px] font-black text-blue-600 uppercase tracking-widest border-b border-blue-100 pb-0.5">View Full Map</button>
            </div>
            <div className="relative h-44 bg-[#EBF1F7] rounded-[2rem] overflow-hidden shadow-inner border-2 border-white p-1">
              {/* Modern City Grid Style Map */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(90deg, #2563EB 1px, transparent 1px)', backgroundSize: '25px 25px' }} />
              <div className="absolute top-[20%] left-0 w-full h-4 bg-white/40 rotate-2" />
              <div className="absolute top-0 left-[40%] w-6 h-full bg-white/40 -rotate-3" />
              
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400 blur-xl rounded-full opacity-50" />
                  <div className="relative bg-white p-2 rounded-full shadow-xl border-2 border-blue-500">
                    <img src={logo} alt="logo" className="w-4 h-4 object-contain" />
                  </div>
                </div>
              </motion.div>
              
              <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md p-2 rounded-2xl border border-white shadow-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <img src={logo} alt="logo" className="w-4 h-4 object-contain brightness-0 invert" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-[#1A1A1A] leading-none uppercase tracking-tighter">Honda CB350</p>
                    <p className="text-[6px] text-slate-400 font-bold mt-0.5 uppercase tracking-widest">En Route • 2.4 KM Left</p>
                  </div>
                </div>
                <div className="bg-blue-50 px-1.5 py-0.5 rounded-lg">
                  <p className="text-[6px] font-black text-blue-600 uppercase">12m ETA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT AREA */}
      <div className="flex-1 overflow-y-auto px-6 pt-2">
        {activeTab === 'dashboard' && <DashboardHome name={partnerName} onNavigate={setActiveTab} banners={banners} />}
        {activeTab === 'bikes' && <FleetContent bikes={bikes} onAdd={() => verificationStatus === 'approved' ? setShowAddModal(true) : showToast("Account verification pending")} onEdit={handleEditBike} onDelete={handleDeleteBike} onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'bookings' && <BookingsContent bookings={bookings} onAccept={handleAcceptBooking} onReject={handleRejectBooking} onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'pricing' && <PricingContent pricing={pricing} onUpdate={setPricing} onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'earnings' && (
          <EarningsContent 
            name={partnerName} 
            onBack={() => setActiveTab('dashboard')} 
            onOpenWallet={() => {
              setActiveTab('profile');
              setActiveSubView('wallet');
            }}
            onWithdraw={() => setShowWithdrawModal(true)}
          />
        )}
        {activeTab === 'profile' && (
          activeSubView === 'banners' ? (
            <AdBannersContent 
              onBack={() => setActiveSubView(null)} 
              banners={banners} 
              onAdd={() => setShowBannerModal(true)}
              onEdit={(b) => { setEditBanner(b); setShowBannerModal(true); }}
              onDelete={handleDeleteBanner}
            />
          ) : activeSubView === 'profile_edit' ? (
            <PageWrapper title="Edit Profile" subtitle="Account" onBack={() => setActiveSubView(null)}>
              <div className="space-y-4">
                <div className="flex flex-col items-center mb-4">
                  <div className="relative">
                    <div 
                      className="w-20 h-20 bg-[#1A1A1A] rounded-[1.8rem] flex items-center justify-center text-white text-2xl font-black shadow-2xl mb-3 overflow-hidden border-4 border-white"
                    >
                      {profileImage ? (
                        <img src={profileImage} className="w-full h-full object-cover" alt="profile" />
                      ) : (
                        partnerName.split(' ').map(n => n[0]).join('')
                      )}
                    </div>
                    <div 
                      className="absolute bottom-3 right-0 w-8 h-8 bg-white rounded-full shadow-lg border border-slate-50 flex items-center justify-center transition-transform"
                    >
                      <Camera size={14} className="text-[#1A1A1A]" />
                    </div>
                  </div>

                  <div className="flex gap-3 mb-4">
                    <button 
                      onClick={() => {
                        fileInputRef.current?.removeAttribute('capture');
                        fileInputRef.current?.click();
                      }}
                      className="bg-white px-5 py-2 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-2 active:scale-95 transition-all"
                    >
                      <Image size={14} className="text-blue-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]">Gallery</span>
                    </button>
                    <button 
                      onClick={() => {
                        fileInputRef.current?.setAttribute('capture', 'environment');
                        fileInputRef.current?.click();
                      }}
                      className="bg-[#1A1A1A] text-white px-5 py-2 rounded-2xl shadow-xl flex items-center gap-2 active:scale-95 transition-all"
                    >
                      <Camera size={14} className="text-white" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">Camera</span>
                    </button>
                  </div>

                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handlePhotoChange} 
                    accept="image/*" 
                    className="hidden" 
                  />
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Full Name', value: partnerName, icon: User },
                    { label: 'Email Address', value: 'manish.gupta@example.com', icon: Mail },
                    { label: 'Phone Number', value: '+91 8839044030', icon: Phone },
                  ].map((field, i) => (
                    <div key={i}>
                      <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1 px-1">{field.label}</label>
                      <div className="bg-white h-10 rounded-lg flex items-center px-4 shadow-sm border border-slate-100 focus-within:border-blue-200 transition-all">
                        <field.icon size={14} className="text-slate-300 mr-3" />
                        <input type="text" defaultValue={field.value} className="bg-transparent border-none outline-none text-[11px] font-bold text-[#1A1A1A] w-full" />
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => {
                    showToast("Profile Updated Successfully");
                    setActiveSubView(null);
                  }} 
                  className="w-full py-3.5 bg-[#1A1A1A] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all mt-4"
                >
                  Save Profile Changes
                </button>
              </div>
            </PageWrapper>
          ) : activeSubView === 'wallet' ? (
            <PageWrapper title="My Wallet" subtitle="Liquidity" onBack={() => setActiveSubView(null)}>
              <div className="space-y-6">
                <div className="bg-[#1A1B1E] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Current Liquidity</p>
                  <h2 className="text-4xl font-bold mb-8 font-['Space_Grotesk'] tracking-tight">Rs 0<span className="text-blue-400/50">.00</span></h2>
                  <button className="w-full py-4 bg-gradient-to-r from-[#D48C45] to-[#B07034] rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">
                    <Plus size={14} /> REFILL
                  </button>
                </div>
                <div 
                  onClick={() => setActiveSubView('rewards')}
                  className="bg-white rounded-[2rem] p-4 flex items-center gap-4 border border-slate-50 shadow-sm cursor-pointer active:scale-[0.98] transition-all"
                >
                  <div className="w-10 h-10 bg-orange-50 rounded-2xl flex items-center justify-center">
                    <Star className="text-orange-500" size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#1A1A1A]">Refer & Earn Rs50</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Invite friends to cliqgarage</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-200" />
                </div>
                <div className="pt-4">
                  <div className="flex items-center justify-between px-1 mb-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">History Log</p>
                    <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">View All</p>
                  </div>
                  <div className="bg-white/50 border border-dashed border-slate-200 rounded-[2rem] p-12 text-center">
                    <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">No transactions yet</p>
                  </div>
                </div>
              </div>
            </PageWrapper>
          ) : activeSubView === 'address' ? (
              <PageWrapper 
                title="Addresses" 
                subtitle="Profile" 
                onBack={() => setActiveSubView(null)}
                action={
                  <button 
                    onClick={() => setEditingAddress({ label: '', sub: '' })}
                    className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
                  >
                    <Plus size={20} />
                  </button>
                }
              >
              <div className="space-y-4">
                {userAddresses.map((addr, i) => (
                  <div key={i} className="bg-white rounded-[2rem] p-4 flex items-center gap-4 border border-slate-50 shadow-sm group">
                    <div style={{ backgroundColor: addr.color }} className="w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105">
                      <addr.icon size={18} style={{ color: addr.iconCol }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#1A1A1A]">{addr.label}</p>
                      <p className="text-[10px] text-slate-400 font-medium leading-tight">{addr.sub}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setEditingAddress({ ...addr, index: i })}
                        className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 active:scale-90 transition-all border border-slate-100 hover:bg-white hover:text-blue-500"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDeleteAddress(i)}
                        className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-400 active:scale-90 transition-all border border-red-100/50 hover:bg-white hover:text-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </PageWrapper>
          ) : activeSubView === 'documents' ? (
            <PageWrapper 
              title="My Documents" 
              subtitle="Profile" 
              onBack={() => setActiveSubView(null)}
              action={
                <button 
                  onClick={() => setActiveTab('profile')}
                  className="w-12 h-12 bg-[#001F3D] rounded-2xl flex items-center justify-center text-white shadow-lg active:scale-90 transition-all"
                >
                  <Settings size={20} />
                </button>
              }
            >
              <div className="space-y-4">
                {[
                  { label: 'Government ID (Aadhar)', status: 'VERIFIED', icon: Shield, color: '#10B981' },
                  { label: 'PAN Card', status: 'PENDING', icon: FileText, color: '#F59E0B' },
                  { label: 'Shop Act License', status: 'VERIFIED', icon: Store, color: '#10B981' },
                  { label: 'GST Certificate', status: 'NOT UPLOADED', icon: FileText, color: '#94A3B8' },
                ].map((doc, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedDocument(doc)}
                    className="bg-white rounded-[2rem] p-4 flex items-center gap-4 border border-slate-50 shadow-sm group cursor-pointer active:scale-[0.98] transition-all hover:border-blue-100"
                  >
                    <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      <doc.icon size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#1A1A1A] mb-0.5">{doc.label}</p>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: doc.color }} />
                        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: doc.color }}>{doc.status}</p>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-400 transition-colors" />
                  </div>
                ))}
                <div 
                  onClick={() => docInputRef.current?.click()}
                  className="bg-white rounded-[2rem] p-8 border border-dashed border-slate-200 mt-6 flex flex-col items-center cursor-pointer active:scale-[0.98] transition-all hover:bg-blue-50/20 hover:border-blue-200 group"
                >
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm border border-blue-100">
                    <Plus className="text-blue-600" size={24} />
                  </div>
                  <p className="text-[10px] font-black text-[#1A1A1A] uppercase tracking-widest">Upload New Proof</p>
                </div>
              </div>
            </PageWrapper>
          ) : activeSubView === 'notifications' ? (
            <PageWrapper title="Notifications" subtitle="Inbox" onBack={() => setActiveSubView(null)}>
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1 mb-6">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">Admin & System Alerts</p>
                  <div className="flex items-center gap-3 ml-2">
                    <button 
                      onClick={handleClearNotifications}
                      className="text-[9px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-1.5 active:scale-95 transition-all whitespace-nowrap"
                    >
                      <Trash2 size={12} /> Clear All
                    </button>
                    <button 
                      onClick={() => showToast("Checking for new alerts...")}
                      className="text-[9px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1.5 active:scale-95 transition-all whitespace-nowrap"
                    >
                      <Clock size={12} /> Refresh
                    </button>
                  </div>
                </div>
                {notifications.length > 0 ? notifications.map((notif, i) => (
                  <div 
                    key={i} 
                    onClick={() => {
                      setNotifications(notifications.filter((_, idx) => idx !== i));
                      showToast(`Notification removed`);
                    }}
                    className="bg-white rounded-[2rem] p-4 flex items-start gap-4 border border-slate-50 shadow-sm cursor-pointer active:scale-[0.98] transition-all hover:border-blue-100 group"
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                      <notif.icon size={16} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1.5">
                        <p className="text-sm font-bold text-[#1A1A1A]">{notif.title}</p>
                        <p className="text-[9px] font-bold text-slate-300 uppercase">{notif.time}</p>
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight leading-tight">{notif.sub}</p>
                      {i === 0 && <div className="mt-3 aspect-video bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300 text-[10px] font-bold uppercase tracking-widest">Attachment</div>}
                    </div>
                  </div>
                )) : (
                  <div className="bg-white/50 border border-dashed border-slate-200 rounded-[2rem] p-20 text-center">
                    <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">No notifications left</p>
                  </div>
                )}
              </div>
            </PageWrapper>
          ) : activeSubView === 'rewards' ? (
            <PageWrapper title="Referrals" subtitle="Profile" onBack={() => setActiveSubView(null)}>
              <div className="space-y-4">
                <div className="bg-[#1A1B1E] rounded-[1.5rem] p-6 text-white relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent" />
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-black font-['Space_Grotesk'] uppercase tracking-tight">Refer and Earn</h2>
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center"><Star className="text-orange-400" size={16} /></div>
                  </div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Language: English (Global)</p>
                </div>

                <div className="bg-white rounded-2xl p-4 flex items-center justify-between border border-slate-100 shadow-sm">
                  <div>
                    <h3 className="text-sm font-black text-[#1A1A1A] tracking-wider uppercase mb-0.5">USR4030BA18D7</h3>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest italic">Your Referral Code</p>
                  </div>
                  <button 
                    onClick={() => handleCopyCode('USR4030BA18D7')}
                    className="px-4 py-2.5 bg-[#1A1A1A] text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg active:scale-95 transition-all"
                  >
                    <Copy size={11} /> COPY
                  </button>
                </div>

                <div className="bg-slate-100/50 p-1 rounded-xl flex gap-1">
                  <button className="flex-1 py-2.5 bg-[#D9F110] text-[#1A1A1A] rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm">Invite Now</button>
                  <button 
                    onClick={() => showToast("Loading referral history...")}
                    className="flex-1 py-2.5 text-slate-400 rounded-lg text-[9px] font-black uppercase tracking-widest active:bg-slate-50 transition-colors"
                  >
                    History
                  </button>
                </div>

                <div className="pt-2">
                  <h4 className="text-[10px] font-black text-[#1A1A1A] uppercase tracking-[0.15em] mb-4 px-1 border-l-2 border-blue-600 pl-3">How it works?</h4>
                  <div className="space-y-3">
                    {[
                      { title: 'Share Your Code', sub: 'The referrer user will get ₹100 instantly as a reward after a new user signs up.' },
                      { title: 'Friend Downloads App', sub: 'Ask your friends to download the CliqGarage app using your link.' },
                      { title: 'Get Rewarded', sub: 'Earn cash rewards once they complete their first successful rental.' },
                    ].map((step, i) => (
                      <div key={i} className="flex gap-4 p-3 bg-white rounded-xl border border-slate-50 shadow-sm">
                        <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 text-[10px] font-black border border-blue-100/50">{i + 1}</div>
                        <div className="space-y-0.5">
                          <p className="text-[9px] font-black text-[#1A1A1A] uppercase tracking-wider">{step.title}</p>
                          <p className="text-[8px] text-slate-400 font-bold leading-relaxed">{step.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PageWrapper>
          ) : activeSubView === 'support' ? (
            <PageWrapper title="Support" subtitle={supportCategory ? supportCategory.label : "Help Center"} onBack={() => supportCategory ? setSupportCategory(null) : setActiveSubView(null)}>
              <div className="space-y-4">
                {supportCategory ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="bg-white rounded-2xl p-4 border border-slate-50 shadow-sm">
                      <div className="flex items-center gap-4 mb-5">
                        <div style={{ backgroundColor: supportCategory.color }} className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm">
                          <supportCategory.icon size={20} style={{ color: supportCategory.iconCol }} />
                        </div>
                        <div>
                          <h3 className="text-[15px] font-black text-[#1A1A1A] uppercase tracking-widest">{supportCategory.label} Issues</h3>
                          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">Direct Assistance</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1 px-1">Common Questions</p>
                        {[
                          { q: `How to manage ${supportCategory.label.toLowerCase()}?`, a: `You can manage all your ${supportCategory.label.toLowerCase()} directly from the main dashboard tabs.` },
                          { q: `Report an issue with ${supportCategory.label.toLowerCase()}`, a: `If you encounter any errors, please click the "Chat Now" button below to speak with our technical team.` },
                          { q: `Estimated resolution time`, a: "Most queries are resolved within 2-4 business hours." },
                        ].map((faq, idx) => (
                          <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 group hover:border-blue-200 transition-colors cursor-pointer">
                            <p className="text-[13px] font-bold text-[#1A1A1A] mb-1 group-hover:text-blue-600">{faq.q}</p>
                            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{faq.a}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => setShowCallModal(true)}
                      className="w-full py-4 bg-blue-600 text-white rounded-xl text-[12px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <Phone size={16} /> Call for {supportCategory.label} Support
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        type="text" 
                        placeholder="How can we help?" 
                        className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-[#1A1A1A] placeholder:text-slate-300 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all shadow-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Bookings', icon: Calendar, color: '#EBF2FF', iconCol: '#2563EB' },
                        { label: 'Payments', icon: Wallet, color: '#F0F5FF', iconCol: '#2F54EB' },
                        { label: 'Account', icon: User, color: '#F6FFED', iconCol: '#52C41A' },
                        { label: 'Technical', icon: Settings, color: '#FFF1F0', iconCol: '#FF4D4F' },
                      ].map((cat, i) => (
                        <button 
                          key={i} 
                          onClick={() => setSupportCategory(cat)}
                          style={{ backgroundColor: cat.color }}
                          className="rounded-2xl p-4 border border-white/50 shadow-sm flex items-center gap-3 active:scale-95 transition-all group hover:opacity-80"
                        >
                          <cat.icon size={18} style={{ color: cat.iconCol }} className="shrink-0" />
                          <p className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-widest truncate">{cat.label}</p>
                        </button>
                      ))}
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-50 shadow-sm">
                      <div className="flex items-center justify-between mb-5 px-1">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Recent Tickets</p>
                        <button onClick={() => showToast("Loading all tickets...")} className="text-[11px] font-bold text-blue-600 uppercase tracking-widest active:scale-95 transition-all">View All</button>
                      </div>
                      <div className="space-y-4">
                        {[
                          { id: '#TKT-9021', title: 'Payment Reflected Twice', status: 'In Progress', color: '#F59E0B' },
                          { id: '#TKT-8902', title: 'Document Verification', status: 'Resolved', color: '#10B981' },
                        ].map((ticket, i) => (
                          <div 
                            key={i} 
                            onClick={() => showToast(`Ticket ${ticket.id}: ${ticket.title}`)}
                            className="flex items-center justify-between py-2.5 px-2 border-b border-slate-50 last:border-0 cursor-pointer hover:bg-slate-50 rounded-xl transition-all active:scale-[0.98]"
                          >
                            <div>
                              <p className="text-xs font-bold text-[#1A1A1A] mb-0.5">{ticket.title}</p>
                              <p className="text-[9px] font-bold text-slate-400 uppercase">{ticket.id}</p>
                            </div>
                            <div className="px-2.5 py-1 rounded-lg border" style={{ backgroundColor: `${ticket.color}10`, borderColor: `${ticket.color}20` }}>
                              <p className="text-[8px] font-black uppercase tracking-widest" style={{ color: ticket.color }}>{ticket.status}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button 
                        onClick={() => setShowCallModal(true)} 
                        className="w-full py-4 bg-[#1A1A1A] text-white rounded-[1.5rem] text-[13px] font-black uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all border border-black/10 flex items-center justify-center gap-3"
                      >
                        <Phone size={18} className="text-blue-500" /> Call Support Center
                      </button>
                    </div>
                  </>
                )}
              </div>
            </PageWrapper>
          ) : activeSubView ? (
            <PageWrapper 
              title={activeSubView.charAt(0).toUpperCase() + activeSubView.slice(1)} 
              subtitle="Settings" 
              onBack={() => setActiveSubView(null)}
            >
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-50 shadow-sm">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100"
                >
                  <Settings className="text-blue-600" size={32} />
                </motion.div>
                <h4 className="text-sm font-black text-[#1A1A1A] uppercase tracking-widest mb-2 font-['Space_Grotesk']">{activeSubView} Module</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight leading-relaxed">
                  This section is currently being synchronized with your partner profile. 
                  Please check back shortly for full access.
                </p>
                <button 
                  onClick={() => setActiveSubView(null)}
                  className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
                >
                  Return to Profile
                </button>
              </div>
            </PageWrapper>
          ) : (
            <ProfileContent 
              name={partnerName} 
              profileImage={profileImage}
              onSignOut={handleSignOut} 
              activeSubView={activeSubView} 
              setActiveSubView={setActiveSubView}
              setActiveTab={setActiveTab}
            />
          )
        )}
        {activeTab === 'live_map' && <LiveTrackingView onBack={() => setActiveTab('dashboard')} />}
      </div>

      {/* SIDEBAR (Right Hand Side) */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSidebarOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-[75%] max-w-[280px] bg-white h-full shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Sidebar Header (Soft Blue) */}
              <div className="bg-[#E6F4FF] px-4 pt-6 pb-4 shrink-0 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-lg border border-white">
                      <img src={logo} alt="logo" className="w-7 h-7 object-contain" />
                    </div>
                    <div className="leading-tight">
                      <h2 className="text-[#1A1A1A] text-[14px] font-black tracking-tighter uppercase font-['Space_Grotesk']">Cliq</h2>
                      <h2 className="text-blue-500 text-[14px] font-black tracking-tighter uppercase font-['Space_Grotesk'] leading-none">Garage</h2>
                    </div>
                  </div>
                  <button onClick={() => setSidebarOpen(false)} className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center active:scale-90 transition-all border border-slate-100">
                    <X size={16} className="text-slate-400" />
                  </button>
                </div>

                {/* Profile Card - Compact Professional View */}
                <div className="bg-white rounded-2xl p-3 flex items-center gap-3 shadow-xl shadow-blue-500/5 border border-white">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center text-white text-[11px] font-black shadow-md overflow-hidden border border-white ring-2 ring-blue-50/50">
                    {profileImage ? (
                      <img src={profileImage} className="w-full h-full object-cover" alt="profile" />
                    ) : (
                      partnerName.split(' ').map(n => n[0]).join('')
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#1A1A1A] text-[12px] font-black leading-tight truncate font-['Space_Grotesk'] uppercase tracking-tight">{partnerName}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                      <p className="text-blue-600 text-[8px] font-black uppercase tracking-widest opacity-90">Verified Partner</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg shrink-0 border border-amber-100">
                    <Star size={10} className="text-amber-500 fill-amber-500" />
                    <span className="text-[#1A1A1A] text-[10px] font-black">4.9</span>
                  </div>
                </div>
              </div>

              {/* Nav List - Breathable Spacing */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
                  { id: 'bikes', label: 'Fleet Management', icon: Car },
                  { id: 'bookings', label: 'Bookings List', icon: Calendar },
                  { id: 'banners', label: 'Ad Banners', icon: ImageIcon },
                  { id: 'pricing', label: 'Pricing Setup', icon: DollarSign },
                  { id: 'earnings', label: 'Earnings Report', icon: BarChart2 },
                  { id: 'profile', label: 'Account Settings', icon: User },
                ].map((item) => (
                  <button key={item.id} onClick={() => { 
                    if (item.id === 'banners') {
                      setActiveTab('profile');
                      setActiveSubView('banners');
                    } else {
                      setActiveTab(item.id); 
                    }
                    setSidebarOpen(false); 
                  }} className={twMerge(
                    "w-full flex items-center gap-4 px-4 py-2.5 rounded-2xl text-[12px] font-bold transition-all group",
                    activeTab === item.id 
                      ? "bg-[#E6F4FF] text-[#1677FF] shadow-sm border border-[#91CAFF]" 
                      : "text-slate-500 hover:bg-slate-50 hover:px-5"
                  )}>
                    <div className={twMerge(
                      "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all shadow-sm",
                      activeTab === item.id ? "bg-white" : "bg-slate-50 group-hover:bg-white"
                    )}>
                      <item.icon size={15} className={activeTab === item.id ? 'text-[#1677FF]' : 'text-slate-400'} />
                    </div>
                    <span className="flex-1 text-left tracking-tight">{item.label}</span>
                    <ChevronRight size={14} className={twMerge(
                      "transition-all",
                      activeTab === item.id ? "text-blue-400" : "text-slate-200 group-hover:translate-x-1"
                    )} />
                  </button>
                ))}
              </div>

              <div className="p-4 border-t border-slate-50">
                <button onClick={handleSignOut} className="w-full py-3 bg-red-50/50 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all border border-red-100/30">
                  <LogOut size={14} className="text-red-400" /> Sign Out Session
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AddVehicleModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        onAdd={handleAddBike} 
      />

      {showBannerModal && (
        <BannerModal 
          banner={editBanner}
          onSave={(data) => {
            if (editBanner) handleUpdateBanner({ ...editBanner, ...data });
            else handleAddBanner(data);
            setShowBannerModal(false);
            setEditBanner(null);
          }}
          onClose={() => {
            setShowBannerModal(false);
            setEditBanner(null);
          }}
        />
      )}
      
      <AnimatePresence>
        {editingAddress && (
          <AddressModal 
            address={editingAddress} 
            onSave={handleUpdateAddress} 
            onClose={() => setEditingAddress(null)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCallModal && (
          <VirtualCallModal onClose={() => setShowCallModal(false)} />
        )}

        {showWithdrawModal && (
          <WithdrawalModal 
            amount="45,280" 
            onClose={() => setShowWithdrawModal(false)} 
            onComplete={() => showToast("Settlement completed successfully")}
          />
        )}

        {selectedDocument && (
          <DocumentViewModal 
            document={selectedDocument} 
            onClose={() => setSelectedDocument(null)} 
            onReupload={() => docInputRef.current?.click()}
          />
        )}
      </AnimatePresence>

      <RentalBottomNav activeTab={activeTab} onNavigate={setActiveTab} />

      <input 
        type="file" 
        ref={docInputRef} 
        onChange={handleDocUpload} 
        className="hidden" 
        accept=".pdf,.jpg,.jpeg,.png"
      />

      {/* CUSTOM TOAST (Top Pop-up, Green, Sharp Corners) */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[500] px-0"
          >
            <div className="bg-[#10B981] text-white py-5 px-6 shadow-2xl flex items-center justify-between border-b-4 border-[#059669]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-none bg-white/20 flex items-center justify-center border border-white/30">
                  <CheckCircle2 size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] leading-none mb-1.5 opacity-80">Notification</p>
                  <p className="text-xs font-black uppercase tracking-widest leading-tight">{toast}</p>
                </div>
              </div>
              <button onClick={() => setToast(null)} className="w-8 h-8 rounded-none flex items-center justify-center hover:bg-black/10 transition-colors">
                <X size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RentalDashboard;
