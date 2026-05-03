import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import MechanicBottomNav from '../../components/mechanic/MechanicBottomNav';
import {
  Wrench, MapPin, DollarSign, Star, Power, Bell, Home, BarChart2,
  Settings, Menu, X, Plus, Edit3, Trash2, Upload, Camera, Check,
  ToggleLeft, ToggleRight, ChevronRight, ChevronLeft, Package, Shield, LogOut,
  Clock, User, CheckCircle2, XCircle, TrendingUp, Activity,
  ArrowUpRight, Banknote, FileText, MessageSquare, ThumbsUp, ThumbsDown,
  Bike, AlertCircle, Calendar, Wallet, LayoutGrid, Mail, Phone, Image as ImageIcon, Gift, Store, Briefcase, RotateCcw,
  Trash, Search, Copy, CreditCard, Map as MapIcon
} from 'lucide-react';

import bikeImage from '../../assets/bike.png';

const initRequests = [
  { id:'REQ-1092', customer:'Suraj Chouhan', service:'Periodic Maintenance', vehicle:'Royal Enfield 650', time:'10:30 AM', location:'HSR Layout · 2.4 km', amount:'₹3,450', status:'pending' },
  { id:'REQ-1094', customer:'Ananya Sharma', service:'Brake Pad Replacement', vehicle:'TVS Apache RTR 200', time:'11:45 AM', location:'Koramangala · 4.1 km', amount:'₹1,200', status:'pending' },
  { id:'REQ-1089', customer:'Rahul Mehta', service:'Engine Oil Change', vehicle:'Honda CB300R', time:'09:00 AM', location:'Indiranagar · 1.8 km', amount:'₹850', status:'completed' },
];
const initServices = [
  { id:1, name:'Periodic Maintenance', price:'1450', duration:'120', active:true },
  { id:2, name:'Engine Oil Change', price:'850', duration:'30', active:true },
  { id:3, name:'Brake Pad Replacement', price:'600', duration:'45', active:false },
];
const initHours = [
  { day:'Monday',    open:'09:00', close:'20:30', active:true },
  { day:'Tuesday',   open:'09:00', close:'20:30', active:true },
  { day:'Wednesday', open:'09:00', close:'20:30', active:true },
  { day:'Thursday',  open:'09:00', close:'20:30', active:true },
  { day:'Friday',    open:'09:00', close:'20:30', active:true },
  { day:'Saturday',  open:'10:00', close:'18:00', active:true },
  { day:'Sunday',    open:'',      close:'',      active:false },
];
const mockRatings = [
  { id:1, customer:'Suraj Chouhan', rating:5, comment:'Excellent service! Very professional.', service:'Periodic Maintenance', date:'Apr 20' },
  { id:2, customer:'Ananya Sharma', rating:4, comment:'Good work, on time.', service:'Brake Pad Replacement', date:'Apr 18' },
  { id:3, customer:'Rahul Mehta', rating:3, comment:'Average, could be faster.', service:'Engine Oil Change', date:'Apr 15' },
];
const earningsData = [
  { label:'Today', value:'₹14,200', trend:'+12%', color:'#10B981' },
  { label:'This Week', value:'₹68,400', trend:'+8%', color:'#1E4DB7' },
  { label:'This Month', value:'₹1,84,000', trend:'+18%', color:'#F59E0B' },
];
const STATUS = {
  pending:     { label:'Pending',     cls:'bg-amber-50 text-amber-600',     dot:'bg-amber-400 animate-pulse' },
  accepted:    { label:'Accepted',    cls:'bg-blue-50 text-blue-600',       dot:'bg-blue-400' },
  in_progress: { label:'In Progress', cls:'bg-purple-50 text-purple-600',   dot:'bg-purple-400' },
  completed:   { label:'Completed',   cls:'bg-emerald-50 text-emerald-600', dot:'bg-emerald-400' },
  rejected:    { label:'Rejected',    cls:'bg-red-50 text-red-400',         dot:'bg-red-400' },
};

/* ─── LOGO ─── */
const CliqLogo = ({ size=28 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="38" r="26" fill="none" stroke="#4A9EFF" strokeWidth="5"/>
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i)=>(
      <rect key={i} x="47" y="7" width="6" height="8" rx="2"
        fill={i%2===0?'#4A9EFF':'#FF6B00'} transform={`rotate(${deg} 50 38)`}/>
    ))}
    <path d="M50 14 C35 14 23 26 23 41 C23 57 50 80 50 80 L50 14Z" fill="#2563EB"/>
    <path d="M50 14 C65 14 77 26 77 41 C77 57 50 80 50 80 L50 14Z" fill="#FF6B00"/>
    <line x1="50" y1="14" x2="50" y2="80" stroke="white" strokeWidth="1.5" opacity="0.5"/>
    <ellipse cx="36" cy="51" rx="4.5" ry="4.5" stroke="white" strokeWidth="1.5" fill="none" opacity="0.9"/>
    <ellipse cx="44" cy="51" rx="4.5" ry="4.5" stroke="white" strokeWidth="1.5" fill="none" opacity="0.9"/>
    <path d="M36 51 L40 43 L44 51" stroke="white" strokeWidth="1.5" fill="none" opacity="0.9"/>
    <rect x="53" y="47" width="15" height="7" rx="2" fill="white" opacity="0.9"/>
    <path d="M55 47 L58 41 L66 41 L69 47" fill="white" opacity="0.9"/>
    <circle cx="57" cy="54" r="1.8" fill="#FF6B00"/>
    <circle cx="65" cy="54" r="1.8" fill="#FF6B00"/>
  </svg>
);

/* ─── BOTTOM SHEET ─── */
const Sheet = ({ children, onClose }) => (
  <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
    className="fixed inset-0 z-[60] bg-black/50 flex items-end">
    <motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}}
      transition={{type:'tween',duration:0.26}}
      className="w-full bg-white rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto">
      <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4"/>
      {children}
    </motion.div>
  </motion.div>
);

/* ─── PAGE WRAPPER (For sub-pages) ─── */
const PageWrapper = ({ title, subtitle, onBack, children, action }) => (
  <div className="h-full flex flex-col pb-6">
    <div className="flex items-center gap-4 mb-6 pt-2 px-1">
      <button onClick={onBack} className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-[#1A1A1A] active:scale-90 transition-all">
        <ChevronLeft size={20} />
      </button>
      <div className="flex-1">
        <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">{subtitle || 'Mechanic Portal'}</p>
        <h2 className="text-xl font-bold text-[#1A1A1A] font-['Space_Grotesk'] leading-tight">{title}</h2>
      </div>
      {action}
    </div>
    <div className="flex-1 overflow-y-auto pr-1">
      {children}
    </div>
  </div>
);

/* ─── SERVICE MODAL ─── */
const ServiceModal = ({ service, onSave, onClose }) => {
  const [f,setF] = useState(service?{...service}:{name:'',price:'',duration:'',active:true});
  return (
    <Sheet onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-[#0B1F3A]">{service?'Edit Service':'Add Service'}</h3>
        <button onClick={onClose}><X size={16} className="text-slate-400"/></button>
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1 block">Service Name *</label>
          <input value={f.name} onChange={e=>setF(p=>({...p,name:e.target.value}))} placeholder="e.g. Engine Oil Change"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-[#0B1F3A] outline-none focus:border-[#FF6B00]/60"/>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1 block">Price (₹) *</label>
            <input value={f.price} onChange={e=>setF(p=>({...p,price:e.target.value.replace(/\D/g,'')}))} placeholder="0"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-[#0B1F3A] outline-none focus:border-[#FF6B00]/60"/>
          </div>
          <div>
            <label className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1 block">Duration (min)</label>
            <input value={f.duration} onChange={e=>setF(p=>({...p,duration:e.target.value.replace(/\D/g,'')}))} placeholder="60"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-[#0B1F3A] outline-none focus:border-[#FF6B00]/60"/>
          </div>
        </div>
        <div className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-200">
          <div>
            <p className="text-xs font-semibold text-[#0B1F3A]">Active</p>
            <p className="text-[9px] text-slate-400">Visible to customers</p>
          </div>
          <button onClick={()=>setF(p=>({...p,active:!p.active}))}>
            {f.active?<ToggleRight size={24} className="text-emerald-500"/>:<ToggleLeft size={24} className="text-slate-300"/>}
          </button>
        </div>
      </div>
      <button onClick={()=>{onSave(f);onClose();}} disabled={!f.name||!f.price}
        className={`w-full mt-4 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${f.name&&f.price?'bg-[#0B1F3A] text-white':'bg-slate-100 text-slate-300'}`}>
        {service?'Update Service':'Add Service'}
      </button>
    </Sheet>
  );
};



/* ─── BANNER MODAL ─── */
const BannerModal = ({ banner, onSave, onClose }) => {
  const [f, setF] = useState(banner ? { ...banner } : { title: '', desc: '', status: 'Active', image: '', bg: '', btn: 'VIEW DEALS' });
  const fileRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setF(p => ({ ...p, image: url, bg: url }));
    }
  };

  return (
    <Sheet onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-black text-[#1A1A1A] font-['Space_Grotesk'] uppercase tracking-tight">{banner ? 'Edit Banner' : 'New Banner'}</h3>
        <button onClick={onClose}><X size={16} className="text-slate-400"/></button>
      </div>
      <div className="space-y-4">
        <input type="file" ref={fileRef} className="hidden" onChange={handleFile} accept="image/*" />
        <button onClick={() => fileRef.current?.click()} className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-2">
          {f.image || f.bg ? (
            <img src={f.image || f.bg} className="w-full h-full object-cover" alt="banner" />
          ) : (
            <>
              <Camera size={20} className="text-slate-300" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Banner Image</p>
            </>
          )}
        </button>

        <div>
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Banner Title</label>
          <input value={f.title} onChange={e => setF(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Summer Bike Festival"
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-[11px] font-bold text-[#1A1A1A] outline-none" />
        </div>

        <div>
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Description</label>
          <textarea value={f.desc} onChange={e => setF(p => ({ ...p, desc: e.target.value }))} placeholder="Brief details about the campaign..." rows={2}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-[11px] font-bold text-[#1A1A1A] outline-none resize-none" />
        </div>
      </div>
      <button 
        onClick={() => {
          // Temporary check for "Create Account First"
          const isTempUser = true; // Simulating a temporary session
          if (isTempUser) {
            alert("Please create an account first to publish banners permanently.");
            return;
          }
          onSave(f); 
          onClose(); 
        }} 
        disabled={!f.title || !(f.image || f.bg)}
        className={`w-full mt-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all ${f.title && (f.image || f.bg) ? 'bg-[#1A1A1A] text-white' : 'bg-slate-100 text-slate-300'}`}
      >
        {banner ? 'Update Banner' : 'Publish Banner'}
      </button>
    </Sheet>
  );
};
const ProofModal = ({ onSave, onClose, onShowToast }) => {
  const ref=useRef();
  const [file,setFile]=useState(null);
  const [note,setNote]=useState('');
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      const url = URL.createObjectURL(f);
      setPreview(url);
    }
  };

  const handleSubmit = () => {
    if(!preview) return alert('Please upload a photo first');
    onSave(preview);
    onShowToast('Yay! Your service proof was successfully uploaded.');
    onClose();
  };

  return (
    <Sheet onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-black text-[#1A1A1A] font-['Space_Grotesk'] uppercase tracking-tight">Upload Completion Proof</h3>
        <button onClick={onClose}><X size={16} className="text-slate-400"/></button>
      </div>
      <input type="file" ref={ref} accept="image/*" className="hidden" onChange={handleFileChange}/>
      
      <button onClick={()=>ref.current.click()}
        className={`w-full relative h-48 rounded-[1.5rem] border-2 border-dashed overflow-hidden transition-all flex flex-col items-center justify-center gap-3 ${file?'border-emerald-400 bg-emerald-50':'border-slate-100 bg-slate-50'}`}>
        {preview ? (
          <img src={preview} className="w-full h-full object-cover" alt="preview" />
        ) : (
          <>
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
              <Camera size={18} className="text-slate-400"/>
            </div>
            <div className="text-center">
              <p className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-tight">Tap to Upload Photo</p>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">JPG, PNG supported</p>
            </div>
          </>
        )}
        {file && (
          <div className="absolute top-2 right-2 bg-[#D4E70D] p-1 rounded-full shadow-md">
            <Check size={10} className="text-black" />
          </div>
        )}
      </button>

      <textarea value={note} onChange={e=>setNote(e.target.value)} rows={2} placeholder="Add remarks for the customer (optional)..."
        className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-xs text-[#1A1A1A] outline-none resize-none my-4 shadow-inner placeholder:text-slate-300 font-medium"/>
      
      <button onClick={handleSubmit} className="w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-[#1A1A1A] text-white active:scale-95 transition-all shadow-xl">
        Submit Final Proof
      </button>
    </Sheet>
  );
};

/* ─── STATUS PICKER ─── */
const StatusPicker = ({ current, onChange, onClose }) => (
  <Sheet onClose={onClose}>
    <div className="flex items-center justify-between mb-3">
      <p className="text-xs font-bold text-[#0B1F3A]">Update Job Status</p>
      <button onClick={onClose}><X size={16} className="text-slate-400"/></button>
    </div>
    <div className="space-y-1.5">
      {['accepted','in_progress','completed','rejected'].map(s=>(
        <button key={s} onClick={()=>{onChange(s);onClose();}}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all ${current===s?'border-[#0B1F3A] bg-[#0B1F3A]/5':'border-slate-100 bg-slate-50'}`}>
          <div className={`w-2 h-2 rounded-full ${STATUS[s].dot}`}/>
          <span className="text-xs font-semibold text-[#0B1F3A]">{STATUS[s].label}</span>
          {current===s&&<CheckCircle2 size={13} className="ml-auto text-[#0B1F3A]"/>}
        </button>
      ))}
    </div>
    <button onClick={onClose} className="w-full mt-3 py-2 rounded-xl text-xs font-semibold text-slate-400 bg-slate-50">Cancel</button>
  </Sheet>
);

/* ─── HOURS MODAL ─── */
const HoursModal = ({ slot, onSave, onClose }) => {
  const [f,setF]=useState({...slot});
  return (
    <Sheet onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-[#0B1F3A]">{slot.day} Timing</h3>
        <button onClick={onClose}><X size={16} className="text-slate-400"/></button>
      </div>
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
          <span className="text-xs font-medium text-slate-600">Active Status</span>
          <button onClick={()=>setF(p=>({...p,active:!p.active}))}>
            {f.active?<ToggleRight size={28} className="text-[#0B1F3A]"/>:<ToggleLeft size={28} className="text-slate-200"/>}
          </button>
        </div>
        {f.active && (
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Open</label>
              <input type="time" value={f.open} onChange={e=>setF(p=>({...p,open:e.target.value}))} className="w-full bg-white border border-slate-100 p-2.5 rounded-xl text-xs font-bold outline-none"/>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Close</label>
              <input type="time" value={f.close} onChange={e=>setF(p=>({...p,close:e.target.value}))} className="w-full bg-white border border-slate-100 p-2.5 rounded-xl text-xs font-bold outline-none"/>
            </div>
          </div>
        )}
      </div>
      <button onClick={()=>onSave(f)} className="w-full py-3.5 bg-[#1A1A1A] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">Save Hours</button>
    </Sheet>
  );
};

/* ─── SIDEBAR CONTENT PAGES ─── */

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
               <span className="px-2 py-0.5 bg-[#D4E70D] text-[7px] font-black text-[#1A1A1A] uppercase tracking-[0.2em] rounded-md shadow-lg">Featured</span>
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
            className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-6 bg-[#D4E70D]' : 'w-1.5 bg-white/30'}`}
          />
        ))}
      </div>

      <div className="absolute top-4 left-7">
         <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-2">
            <Activity size={10} className="text-[#D4E70D]" />
            <span className="text-[7px] font-black text-white uppercase tracking-[0.2em]">Live Banners</span>
         </div>
      </div>
    </div>
  );
};

const DashboardHome = ({ name, onNavigate, banners }) => {
  return (
    <div className="space-y-6 pt-4">
      <div className="px-1">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 font-['Space_Grotesk']">Promotional Banner</p>
      </div>
      <BannerCarousel banners={banners} />

      {/* RECENT ACTIVITY SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-tighter">Recent Activity</h3>
          <button onClick={() => onNavigate('earnings')} className="text-[10px] font-bold text-[#1677FF] uppercase tracking-wider active:scale-95 transition-all">History</button>
        </div>
        <div className="space-y-3">
          {[
            { title: 'Job Completed', sub: 'REQ-1092 • Suraj Chouhan', time: '2h ago', icon: CheckCircle2, color: '#F6FFED', iconCol: '#52C41A', tab: 'jobs' },
            { title: 'New Review', sub: '5 Stars • Great service!', time: '5h ago', icon: Star, color: '#FFFBE6', iconCol: '#FADB14', tab: 'ratings' },
            { title: 'Payment Received', sub: '₹3,450 • UPI Verified', time: '1d ago', icon: BarChart2, color: '#E6F7FF', iconCol: '#1890FF', tab: 'earnings' },
          ].map((act, i) => (
            <div 
              key={i} 
              onClick={() => onNavigate(act.tab)}
              className="bg-white rounded-[1.8rem] p-4 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-white cursor-pointer active:scale-[0.98] transition-all group hover:border-[#1677FF]/20"
            >
              <div style={{ backgroundColor: act.color }} className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                <act.icon size={18} style={{ color: act.iconCol }} />
              </div>
              <div className="flex-1">
                <h4 className="text-[11px] font-bold text-[#1A1A1A] leading-tight font-['Space_Grotesk']">{act.title}</h4>
                <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-tighter font-medium">{act.sub}</p>
              </div>
              <span className="text-[8px] font-bold text-slate-300 uppercase">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const JobsContent = ({ requests, onAction, onStatusChange, onUploadProof, onShowToast, onBack }) => {
  const [proofId,setProofId]=useState(null);
  const [statusId,setStatusId]=useState(null);
  
  const content = (
    <div className="space-y-3">
      <AnimatePresence>
        {proofId&&<ProofModal onSave={img=>onUploadProof(proofId,img)} onClose={()=>setProofId(null)} onShowToast={onShowToast}/>}
        {statusId&&<StatusPicker current={requests.find(r=>r.id===statusId)?.status} onChange={s=>onStatusChange(statusId,s)} onClose={()=>setStatusId(null)}/>}
      </AnimatePresence>
      {requests.map((req,i)=>{
        const st=STATUS[req.status];
        return (
          <motion.div key={req.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
            className={`bg-white rounded-[1.8rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden transition-all ${req.status==='rejected'?'opacity-50 grayscale':''}`}>
            <div className="px-5 py-3 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${st.dot} shadow-sm`}/>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{req.id}</span>
              </div>
              <p className="text-[9px] font-bold text-slate-400 uppercase">{req.time}</p>
            </div>
            
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F5F7E8] flex items-center justify-center shadow-inner">
                    <User size={18} className="text-[#4D5D26]"/>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#1A1A1A] leading-none mb-1 font-['Space_Grotesk']">{req.customer}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{req.vehicle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base font-black text-[#1A1A1A] leading-none mb-1">{req.amount}</p>
                  <div className="flex items-center justify-end gap-1">
                    <span className="text-[7px] font-black text-slate-300 uppercase">{req.paymentMode || 'UPI'}</span>
                    <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Verified</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-[#4D5D26]/5 text-[#4D5D26] text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{req.service}</span>
                <div className="flex items-center gap-1.5 bg-slate-50 rounded-full px-3 py-1">
                  <MapPin size={10} className="text-[#4D5D26]"/>
                  <p className="text-[9px] font-bold text-slate-500">{req.location}</p>
                </div>
              </div>

              {req.proofImage && (
                <div className="mb-4 relative group">
                  <img src={req.proofImage} className="w-full h-32 object-cover rounded-2xl border border-emerald-100" alt="proof" />
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[7px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm">Verified Proof</div>
                </div>
              )}

              {req.status==='pending'?(
                <div className="flex gap-2.5">
                  <button onClick={()=>onAction(req.id,'accepted')} className="flex-1 py-3.5 bg-[#1A1A1A] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
                    <CheckCircle2 size={14}/> Accept Job
                  </button>
                  <button onClick={()=>onAction(req.id,'rejected')} className="w-12 h-12 bg-red-50 text-red-400 rounded-2xl flex items-center justify-center active:scale-95 transition-all">
                    <XCircle size={20}/>
                  </button>
                </div>
              ):req.status==='completed'?(
                <div className="space-y-2">
                  <div className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest ${st.cls} shadow-sm`}>
                    <CheckCircle2 size={14}/> Job Completed
                  </div>
                  {!req.proofImage && (
                    <button onClick={()=>setProofId(req.id)} className="w-full py-3.5 border-2 border-dashed border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                      <Upload size={14}/> Upload Proof
                    </button>
                  )}
                </div>
              ):(
                <button onClick={()=>setStatusId(req.id)} className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm transition-all active:scale-95 ${st.cls}`}>
                  {st.label} <ChevronRight size={14} className="opacity-40"/>
                </button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  if (onBack) {
    return (
      <PageWrapper title="Job Requests" subtitle="Activity" onBack={onBack}>
        {content}
      </PageWrapper>
    );
  }
  return content;
};

const ServicesContent = ({ services, onAdd, onEdit, onToggle, onDelete, onBack }) => {
  const content = (
    <div className="space-y-3">
      {!onBack && (
        <button onClick={onAdd} className="w-full py-4 bg-white/40 border-2 border-dashed border-[#4D5D26]/20 rounded-[1.8rem] flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#4D5D26] active:scale-95 transition-all">
          <Plus size={14}/> Add New Service
        </button>
      )}
      {services.map((sv,i)=>(
        <motion.div key={sv.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
          className={`bg-white rounded-[1.8rem] shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-4 flex items-center justify-between transition-all ${!sv.active?'opacity-50 grayscale':''}`}>
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm ${sv.active ? 'bg-[#F5F7E8] text-[#4D5D26]' : 'bg-slate-50 text-slate-300'}`}>
              <Wrench size={18}/>
            </div>
            <div>
              <h4 className="text-sm font-black text-[#1A1A1A] leading-tight mb-1 font-['Space_Grotesk']">{sv.name}</h4>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-black text-[#4D5D26]">₹{sv.price}</span>
                {sv.duration&&<span className="text-[9px] font-bold text-slate-400 uppercase">· {sv.duration} MIN</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>onToggle(sv.id)} className="p-1">
              {sv.active?<ToggleRight size={26} className="text-[#D4E70D]"/>:<ToggleLeft size={26} className="text-slate-200"/>}
            </button>
            <div className="flex flex-col gap-1">
              <button onClick={()=>onEdit(sv)} className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center active:scale-90 transition-all">
                <Edit3 size={12} className="text-slate-400"/>
              </button>
              <button onClick={()=>onDelete(sv.id)} className="w-8 h-8 rounded-xl bg-red-50/50 flex items-center justify-center active:scale-90 transition-all">
                <Trash2 size={12} className="text-red-300"/>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  if (onBack) {
    return (
      <PageWrapper 
        title="My Services" 
        subtitle="Management" 
        onBack={onBack}
        action={
          <button 
            onClick={onAdd}
            className="w-10 h-10 bg-[#1677FF] text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-all"
          >
            <Plus size={20} />
          </button>
        }
      >
        {content}
      </PageWrapper>
    );
  }
  return content;
};

const HoursContent = ({ hours, onEdit, onBack }) => {
  const content = (
    <div className="space-y-2.5">
      {hours.map((h,i)=>(
        <div key={i} className="bg-white rounded-[1.6rem] shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm ${h.active ? 'bg-[#F5F7E8] text-[#4D5D26]' : 'bg-slate-50 text-slate-300'}`}>
              <Clock size={18}/>
            </div>
            <div>
              <h4 className="text-sm font-black text-[#1A1A1A] leading-none mb-1 font-['Space_Grotesk'] uppercase tracking-tight">{h.day}</h4>
              <p className="text-[10px] font-black text-[#4D5D26] uppercase tracking-widest">{h.active?`${h.open} – ${h.close}`:'CLOSED'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${h.active?'bg-emerald-50 text-emerald-600':'bg-slate-50 text-slate-300'}`}>
              {h.active?'Open':'Closed'}
            </span>
            <button onClick={()=>onEdit(h)} className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center active:scale-90 transition-all">
              <Edit3 size={14} className="text-[#4D5D26]"/>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  if (onBack) {
    return (
      <PageWrapper 
        title="Working Hours" 
        subtitle="Schedule" 
        onBack={onBack}
        action={
          <button className="w-10 h-10 bg-[#1677FF] text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-all">
            <Plus size={20} />
          </button>
        }
      >
        {content}
      </PageWrapper>
    );
  }
  return content;
};

const EarningsContent = ({ onBack }) => {
  const content = (
    <div className="space-y-3">
      <div className="bg-[#0B1F3A] rounded-[2rem] p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D4E70D]/10 rounded-full blur-3xl"/>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/50 text-[9px] uppercase tracking-[0.2em] mb-1 font-black">Available for Payout</p>
            <h2 className="text-3xl font-black text-white leading-none font-['Space_Grotesk'] tracking-tighter">₹52,480</h2>
            <div className="flex items-center gap-1.5 mt-2 bg-emerald-500/10 w-fit px-2 py-0.5 rounded-full border border-emerald-500/20">
              <ArrowUpRight size={10} className="text-emerald-400"/>
              <span className="text-emerald-400 text-[8px] font-black uppercase tracking-widest">+18% this month</span>
            </div>
          </div>
          <button className="p-4 bg-[#D4E70D] text-black rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 active:scale-95 shadow-[0_8px_20px_rgba(212,231,13,0.3)] shrink-0">
            <Banknote size={14}/> Withdraw
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {earningsData.map((e,i)=>(
          <div key={i} className="bg-white rounded-2xl border border-white shadow-sm p-3 text-center">
            <p className="text-[8px] text-slate-400 font-black uppercase tracking-tighter">{e.label}</p>
            <p className="text-[12px] font-black text-[#1A1A1A] mt-1 font-['Space_Grotesk']">{e.value}</p>
            <p className="text-[8px] font-black mt-1 uppercase tracking-widest" style={{color:e.color}}>{e.trend}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-white shadow-sm p-5">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Payment History</p>
        {[
          {date:'Apr 22',desc:'Periodic Maintenance',amount:'₹3,450'},
          {date:'Apr 20',desc:'Engine Oil Change',amount:'₹850'},
          {date:'Apr 18',desc:'Brake Pad Replacement',amount:'₹1,200'},
        ].map((t,i)=>(
          <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
            <div>
              <p className="text-[11px] font-bold text-[#1A1A1A] leading-none uppercase tracking-tight">{t.desc}</p>
              <p className="text-[8px] text-slate-400 mt-1 uppercase font-bold">{t.date}</p>
            </div>
            <p className="text-[11px] font-black text-emerald-600">{t.amount}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-white shadow-sm p-5">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Commission Breakdown</p>
        {[
          {label:'Gross Earnings',value:'₹1,84,000',color:'text-[#1A1A1A]'},
          {label:'Platform Fee (12.5%)',value:'-₹23,000',color:'text-red-500'},
          {label:'Net Earnings',value:'₹1,61,000',color:'text-emerald-600'},
        ].map((r,i)=>(
          <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{r.label}</p>
            <p className={`text-[11px] font-black ${r.color}`}>{r.value}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (onBack) {
    return (
      <PageWrapper title="Earnings & Reports" subtitle="Finance" onBack={onBack}>
        {content}
      </PageWrapper>
    );
  }
  return content;
};

const RatingsContent = ({ onBack }) => {
  const avg = (mockRatings.reduce((a,r)=>a+r.rating,0)/mockRatings.length).toFixed(1);
  const content = (
    <div className="space-y-4">
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-50 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Average Rating</p>
          <div className="flex items-center gap-3">
            <h2 className="text-4xl font-black text-[#1A1A1A] font-['Space_Grotesk']">{avg}</h2>
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(v=>(
                  <Star key={v} size={14} className={v<=Math.round(avg)?'text-[#FADB14] fill-[#FADB14]':'text-slate-100'}/>
                ))}
              </div>
              <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Based on {mockRatings.length} reviews</p>
            </div>
          </div>
        </div>
        <div className="w-16 h-16 rounded-full border-[6px] border-[#F6FFED] flex items-center justify-center">
          <div className="text-[11px] font-black text-emerald-600">98%</div>
        </div>
      </div>
      <div className="space-y-3">
        {mockRatings.map((r,i)=>(
          <motion.div key={i} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-100 border border-white overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?u=${r.customer || r.user}`} alt="user" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-tight">{r.customer || r.user}</h4>
                  <p className="text-[8px] text-slate-400 font-bold uppercase">{r.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 bg-[#FFFBE6] px-2 py-1 rounded-lg border border-[#FFE58F]">
                <Star size={10} className="text-[#FADB14] fill-[#FADB14]"/>
                <span className="text-[#1A1A1A] text-[10px] font-black">{r.rating}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">"{r.comment}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (onBack) {
    return (
      <PageWrapper title="Ratings & Feedback" subtitle="Reviews" onBack={onBack}>
        {content}
      </PageWrapper>
    );
  }
  return content;
};

const DocumentsContent = ({ onBack }) => {
  const fileInputRef = useRef(null);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [docs, setDocs] = useState([
    { id: 'aadhar', label: 'Government ID (Aadhar)', status: 'Verified', color: 'text-emerald-600 bg-emerald-50', icon: Shield },
    { id: 'pan', label: 'PAN Card', status: 'Pending', color: 'text-amber-600 bg-amber-50', icon: CreditCard },
    { id: 'license', label: 'Shop Act License', status: 'Verified', color: 'text-emerald-600 bg-emerald-50', icon: Store },
    { id: 'gst', label: 'GST Certificate', status: 'Not Uploaded', color: 'text-slate-400 bg-slate-50', icon: FileText },
  ]);

  const handleDocClick = (doc) => {
    setSelectedDoc(doc);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && selectedDoc) {
      setDocs(prev => prev.map(d => 
        d.id === selectedDoc.id ? { ...d, status: 'Pending' } : d
      ));
      // In a real app, upload logic here
      console.log(`Uploading ${file.name} for ${selectedDoc.label}`);
    }
  };

  const content = (
    <div className="flex flex-col h-full">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*,application/pdf"
      />

      <div className="space-y-3 mb-8">
        {docs.map((doc, i) => (
          <div 
            key={i} 
            onClick={() => handleDocClick(doc)}
            className="bg-white p-4 rounded-2xl border border-slate-50 shadow-sm flex items-center justify-between group hover:border-[#1677FF]/30 transition-all cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#E6F4FF] group-hover:text-[#1677FF] transition-all">
                {doc.icon ? <doc.icon size={18} /> : <FileText size={18} />}
              </div>
              <div>
                <h4 className="text-[13px] font-semibold text-[#1A1A1A] leading-tight mb-1">{doc.label}</h4>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${doc.status === 'Verified' ? 'bg-emerald-500' : doc.status === 'Pending' ? 'bg-amber-500' : 'bg-slate-300'}`} />
                  <span className={`text-[9px] font-black uppercase tracking-widest ${doc.status === 'Verified' ? 'text-emerald-600' : doc.status === 'Pending' ? 'text-amber-600' : 'text-slate-400'}`}>{doc.status}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {doc.status === 'Not Uploaded' && (
                <div className="w-6 h-6 rounded-full bg-[#E6F4FF] flex items-center justify-center text-[#1677FF]">
                  <Plus size={12} strokeWidth={3} />
                </div>
              )}
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-[#1A1A1A] transition-all">
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div 
        onClick={() => fileInputRef.current?.click()}
        className="flex-1 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center p-8 text-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.01)] cursor-pointer hover:border-[#1677FF]/20 transition-all active:scale-[0.99]"
      >
        <div className="w-16 h-16 bg-[#E6F4FF] rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm">
          <Upload size={24} className="text-[#1677FF]" />
        </div>
        <h4 className="text-[14px] font-black text-[#1A1A1A] mb-2 font-['Space_Grotesk'] uppercase">Upload New Proof</h4>
        <p className="text-[10px] text-slate-400 font-bold leading-relaxed mb-8 max-w-[200px] uppercase tracking-tighter">
          Please upload clear photos of your certificates or identity proofs.
        </p>
        <button className="w-full py-4 bg-[#1A1A1A] rounded-2xl text-[10px] font-black text-white uppercase tracking-widest shadow-xl active:scale-95 transition-all">
          Choose File
        </button>
      </div>
    </div>
  );

  if (onBack) {
    return (
      <PageWrapper 
        title="My Documents" 
        subtitle="Profile" 
        onBack={onBack}
        action={
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-10 h-10 bg-[#1677FF] text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-all"
          >
            <Plus size={20} />
          </button>
        }
      >
        {content}
      </PageWrapper>
    );
  }
  return content;
};

const LiveMapContent = ({ onBack }) => {
  const [zoom, setZoom] = useState(1);
  
  const content = (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col overflow-hidden">
      {/* ── Interactive Map Area ── */}
      <div className="flex-1 relative bg-[#F4F6F2] overflow-hidden">
        {/* The Draggable Map Layer */}
        <motion.div 
          drag
          dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
          style={{ scale: zoom }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          {/* Mock Map Background */}
          <div className="absolute inset-[-100%]">
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)', 
              backgroundSize: '40px 40px' 
            }} />
            {/* Mock Streets */}
            <div className="absolute top-[35%] left-0 w-full h-12 bg-white rotate-1 shadow-sm" />
            <div className="absolute top-0 left-[50%] w-14 h-full bg-white -rotate-2 shadow-sm" />
            <div className="absolute top-[75%] left-0 w-full h-16 bg-white -rotate-1 shadow-sm" />
            <div className="absolute top-[15%] left-[20%] w-32 h-32 bg-[#E9EFE9] rounded-3xl" />
          </div>

          {/* ── Route Line ── */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <motion.path 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
              d="M 150 250 L 150 350 L 300 350 L 300 450" 
              fill="none" 
              stroke="#4D5D26" 
              strokeWidth="4" 
              strokeDasharray="8 8"
              strokeLinecap="round"
            />
          </svg>

          {/* ── Map Pins ── */}
          {/* Workshop */}
          <div className="absolute top-[230px] left-[130px] z-10">
            <div className="w-10 h-10 bg-white rounded-full shadow-2xl border-4 border-[#4D5D26] flex items-center justify-center">
              <div className="w-4 h-4 bg-[#4D5D26] rounded-sm" />
            </div>
          </div>

          {/* Real Bike Image Moving (Royal Enfield) */}
          <motion.div 
            animate={{ 
              x: [130, 230, 280],
              y: [325, 325, 400],
              rotate: [180, 90, 180]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute z-20"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#D4E70D]/40 blur-2xl rounded-full scale-150" />
              <div className="w-16 h-16 bg-white rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.15)] border-4 border-[#D4E70D] flex items-center justify-center overflow-hidden">
                <img 
                  src={bikeImage} 
                  alt="bike" 
                  className="w-full h-full object-contain scale-125"
                />
              </div>
            </div>
          </motion.div>

          {/* User Location */}
          <div className="absolute top-[430px] left-[280px] z-10">
            <div className="w-10 h-10 bg-white rounded-full shadow-2xl border-4 border-[#D4E70D] flex items-center justify-center">
              <div className="w-4 h-4 bg-[#D4E70D] rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* ── Zoom Controls ── */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
          <button onClick={() => setZoom(z => Math.min(z + 0.2, 2))} className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#4D5D26] active:scale-90 transition-all border border-slate-50 font-black text-xl">+</button>
          <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#4D5D26] active:scale-90 transition-all border border-slate-50 font-black text-xl">−</button>
        </div>

        {/* ── Header Overlay ── */}
        <div className="absolute top-4 left-6 right-6 z-40 flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-[#1A1A1A] active:scale-90 transition-all border border-slate-100">
            <ChevronLeft size={20} />
          </button>
          <div className="bg-[#001F3D] h-9 rounded-full px-5 flex items-center shadow-xl border border-white/10">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse mr-2.5" />
            <p className="text-[9px] font-black uppercase tracking-widest text-white font-['Space_Grotesk']">Live tracking</p>
          </div>
        </div>

        {/* ── Bottom Sheet (Ultra Compact & Mustard) ── */}
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="absolute bottom-0 left-0 right-0 z-50 bg-white rounded-t-[2.5rem] shadow-[0_-15px_40px_rgba(0,0,0,0.08)] flex flex-col max-h-[38%]"
        >
          {/* Handle */}
          <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto my-3 shrink-0" />
          
          <div className="flex-1 overflow-y-auto px-6 pb-8 custom-scrollbar">
            {/* Ultra-Compact Navy Blue ETA Banner */}
            <div className="bg-[#001F3D] rounded-2xl py-2 px-4 text-center mb-5 shadow-lg border border-white/5">
              <p className="text-[7px] font-black text-blue-300 uppercase tracking-[0.3em] mb-0.5 opacity-50">Estimated Arrival</p>
              <h3 className="text-[13px] font-black text-white font-['Space_Grotesk'] tracking-tighter leading-none">05:30 PM - 06:00 PM</h3>
            </div>

            <div className="flex items-center justify-between mb-5 p-3.5 bg-slate-50/50 rounded-2xl border border-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <img src="https://i.pravatar.cc/150?u=suraj" alt="mechanic" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black text-[#1A1A1A] leading-tight mb-0.5 uppercase tracking-tighter">Suraj Chouhan</h4>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Expert Mechanic</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-9 h-9 bg-white shadow-sm text-[#4D5D26] rounded-full flex items-center justify-center active:scale-90 transition-all border border-slate-50">
                  <Activity size={14} />
                </button>
                <button className="w-9 h-9 bg-[#4D5D26] text-white shadow-md rounded-full flex items-center justify-center active:scale-90 transition-all">
                  <Phone size={14} />
                </button>
              </div>
            </div>

            <div className="space-y-4 px-1 mb-5">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-[#4D5D26] bg-white flex-shrink-0" />
                  <div className="w-0.5 h-6 bg-slate-100" />
                  <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-[#D4E70D] bg-white flex-shrink-0" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-[8px] font-black text-[#1A1A1A] uppercase tracking-tighter mb-0.5">Workshop</p>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">HSR Layout, Sector 7</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-[#1A1A1A] uppercase tracking-tighter mb-0.5">Job Location</p>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">1901 Thornridge Cir. Shiloh</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-slate-50">
              <div className="flex items-center gap-3 bg-[#4D5D26]/5 p-3 rounded-2xl border border-[#4D5D26]/10">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-50">
                  <Wrench size={20} className="text-[#4D5D26]" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-tighter leading-tight">Periodic Maintenance</h4>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Honda CB350 • Req-1092</p>
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

/* ─── WALLET PAGE ─── */
const WalletContent = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col pb-6">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6 pt-2">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-xl shadow-sm border border-white flex items-center justify-center text-[#1A1A1A]">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-[#1A1A1A] font-['Space_Grotesk'] leading-tight">My Wallet</h2>
      </div>

      {/* LIQUIDITY CARD */}
      <div className="bg-[#1A1C22] rounded-[2.5rem] p-8 mb-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-2">Current Liquidity</p>
        <div className="flex items-baseline gap-1 mb-8">
          <span className="text-3xl font-bold text-white font-['Space_Grotesk']">Rs 0</span>
          <span className="text-xl font-black text-slate-500">.00</span>
        </div>
        <button className="w-full py-4 bg-gradient-to-r from-[#A0522D] to-[#CD853F] rounded-2xl flex items-center justify-center gap-2 text-xs font-black text-white uppercase tracking-widest shadow-lg active:scale-95 transition-all">
          <Plus size={16} /> Refill
        </button>
      </div>

      {/* REFER CARD */}
      <div className="bg-[#F5FDFB] rounded-[2rem] p-5 mb-8 border border-[#E0F2F1] flex items-center gap-4 group cursor-pointer active:scale-[0.98] transition-all">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-50">
          <Gift size={24} className="text-[#F37021]" />
        </div>
        <div className="flex-1">
          <h3 className="text-[13px] font-semibold text-[#1A1A1A] leading-tight mb-0.5">Refer & Earn Rs50</h3>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Invite friends to CliqGarage</p>
        </div>
        <ChevronRight size={20} className="text-[#A4D8C8] group-hover:translate-x-1 transition-transform" />
      </div>

      {/* HISTORY LOG */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-2 mb-4">
          <p className="text-[10px] font-black text-[#1A1A1A]/40 uppercase tracking-[0.25em]">History Log</p>
          <button className="text-[9px] font-black text-[#F37021] uppercase tracking-widest">View All</button>
        </div>
        <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-50 flex items-center justify-center p-10 text-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-bold text-slate-300">No transactions yet</p>
        </div>
      </div>
    </div>
  );
};

/* ─── ADDRESSES PAGE ─── */
const AddressesContent = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col pb-6">
      <div className="flex items-center gap-4 mb-6 pt-2 px-1">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-xl shadow-sm border border-white flex items-center justify-center text-[#1A1A1A]">
          <ChevronLeft size={20} />
        </button>
        <div>
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Profile</p>
          <h2 className="text-xl font-bold text-[#1A1A1A] font-['Space_Grotesk'] leading-tight">Addresses</h2>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { label: 'Home', sub: 'Vijay Nagar, Indore', icon: Home, color: '#FFF1F0', iconCol: '#FF4D4F', actions: true },
          { label: 'Work', sub: 'Add your office address', icon: Briefcase, color: '#F9F0FF', iconCol: '#722ED1', actions: false },
          { label: 'Shop Address', sub: 'Vijay Nagar Main Road · Shop #12', icon: Store, color: '#F6FFED', iconCol: '#52C41A', actions: true },
        ].map((addr, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-50 shadow-sm flex items-center gap-4">
            <div style={{ backgroundColor: addr.color }} className="w-12 h-12 rounded-xl flex items-center justify-center">
              <addr.icon size={20} style={{ color: addr.iconCol }} />
            </div>
            <div className="flex-1">
              <h4 className="text-[13px] font-semibold text-[#1A1A1A] leading-tight mb-0.5">{addr.label}</h4>
              <p className="text-[10px] text-slate-400 font-bold tracking-tight italic">{addr.sub}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#1A1A1A] transition-colors"><Edit3 size={14} /></button>
              {addr.actions && <button className="w-8 h-8 rounded-lg bg-[#FFF1F0] flex items-center justify-center text-[#FF4D4F]"><Trash2 size={14} /></button>}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-2 mb-4">
          <div>
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Landmarks</p>
            <h3 className="text-xs font-black text-[#1A1A1A] font-['Space_Grotesk']">Saved places</h3>
          </div>
          <button className="bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm text-[9px] font-black text-[#1A1A1A] uppercase tracking-widest flex items-center gap-1.5">
            <Plus size={12} /> Add
          </button>
        </div>
        <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-50 flex flex-col items-center justify-center p-8 text-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-white">
            <MapPin size={24} className="text-slate-200" />
          </div>
          <h4 className="text-[13px] font-black text-[#1A1A1A] mb-1.5">No landmarks yet</h4>
          <p className="text-[10px] text-slate-400 font-bold leading-relaxed mb-6 max-w-[200px]">
            Save places like "Gym", "Mom's house", or "Office gate".
          </p>
          <button className="px-6 py-3 bg-[#1A1A1A] rounded-xl text-[9px] font-black text-white uppercase tracking-widest shadow-lg active:scale-95 transition-all">
            + Add Landmark
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── NOTIFICATIONS PAGE ─── */
const NotificationsContent = ({ onBack, notifs, onClear, onRefresh }) => {
  return (
    <div className="h-full flex flex-col pb-6">
      <div className="flex items-center gap-4 mb-6 pt-2 px-1">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-xl shadow-sm border border-white flex items-center justify-center text-[#1A1A1A]">
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Inbox</p>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#1A1A1A] font-['Space_Grotesk'] leading-tight">Notifications</h2>
            <span className="w-5 h-5 bg-[#1A1A1A] rounded-full flex items-center justify-center text-[9px] font-black text-white">{notifs.length}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-2 mb-4 border-b border-slate-100 pb-3">
        <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.15em]">Admin & System Alerts</p>
        <div className="flex items-center gap-4">
          <button onClick={onClear} className="text-[9px] font-black text-[#FF4D4F] uppercase tracking-widest flex items-center gap-1.5 active:scale-95 transition-all"><Trash size={12} /> Clear All</button>
          <button onClick={onRefresh} className="text-[9px] font-black text-[#1890FF] uppercase tracking-widest flex items-center gap-1.5 active:scale-95 transition-all"><RotateCcw size={12} /> Refresh</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 space-y-4">
        {notifs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-2">
              <Bell size={20} className="text-slate-200" />
            </div>
            <p className="text-[10px] font-bold text-slate-300 italic">No alerts at the moment</p>
          </div>
        ) : (
          notifs.map((n, i) => (
            <div key={n.id} className="bg-white p-4 rounded-2xl border border-slate-50 shadow-sm relative group active:scale-[0.98] transition-all">
              <div className="flex justify-between items-start mb-2">
                <div className="flex gap-3">
                  <div className="w-9 h-9 bg-[#E6F7FF] rounded-lg flex items-center justify-center">
                    <Bell size={18} className="text-[#1890FF]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#1A1A1A] mb-0.5">{n.title}</h4>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{n.sub}</p>
                  </div>
                </div>
                <p className="text-[8px] text-slate-300 font-bold">{n.time}</p>
              </div>
              {n.image && (
                <div className="mt-3 rounded-xl overflow-hidden border border-slate-100 h-32 relative">
                  <img src={n.image} className="w-full h-full object-cover" alt="attachment" />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

/* ─── DELETE ACCOUNT PAGE ─── */
const DeleteAccountContent = ({ onBack }) => {
  const [selectedReason, setSelectedReason] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  if (isDeleted) {
    return (
      <div className="h-full flex flex-col items-center justify-center py-10 px-4">
        <div className="w-full max-w-sm bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-50 text-center relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#FF4D4F]" />
          
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-[#FFF1F0] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-red-50"
          >
            <Trash2 size={32} className="text-[#FF4D4F]" />
          </motion.div>
          
          <h2 className="text-xl font-black text-[#1A1A1A] font-['Space_Grotesk'] uppercase tracking-tight mb-4">Account Deleted</h2>
          <p className="text-[10px] text-slate-400 font-bold leading-relaxed mb-10 uppercase tracking-tighter">
            Your account deletion request has been submitted successfully.
          </p>

          <button 
            onClick={onBack}
            className="w-full py-4.5 bg-[#1A1A1A] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all"
          >
            Back to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col pb-6">
      <div className="flex items-center gap-4 mb-6 pt-2 px-1">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-xl shadow-sm border border-white flex items-center justify-center text-[#1A1A1A]">
          <ChevronLeft size={20} />
        </button>
        <div>
          <p className="text-[8px] font-black text-[#FF4D4F] uppercase tracking-[0.2em]">Danger Zone</p>
          <h2 className="text-xl font-bold text-[#1A1A1A] font-['Space_Grotesk'] leading-tight">Delete Account</h2>
        </div>
      </div>

      <div className="bg-[#FFF1F0] p-5 rounded-3xl border border-[#FFCCC7] mb-8 relative overflow-hidden">
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <AlertCircle size={20} className="text-[#FF4D4F]" />
          </div>
          <div className="flex-1">
            <h4 className="text-[13px] font-black text-[#1A1A1A] leading-tight mb-1">Request account deletion</h4>
            <p className="text-[9px] text-[#FF4D4F] font-black uppercase tracking-tighter mb-4">Admin approval is required</p>
            <ul className="space-y-2">
              {[
                "An admin will review your deletion request",
                "Your account stays active until the request is approved",
                "After approval, ride history, addresses, and preferences may be removed",
                "Active bookings may be cancelled after approval",
                "Rejected requests keep your account unchanged",
              ].map((text, i) => (
                <li key={i} className="flex gap-2 text-[10px] text-[#CF1322] font-bold leading-tight">
                  <span className="text-[14px] leading-[10px] mt-0.5">•</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 mb-4">Why are you leaving?</p>
        <div className="bg-white rounded-3xl p-4 border border-slate-50 shadow-sm space-y-4">
          {[
            "I use another app",
            "Too expensive",
            "Privacy concerns",
            "Technical issues",
            "Taking a break",
            "Other"
          ].map((reason, i) => (
            <button key={i} 
              onClick={() => setSelectedReason(reason)}
              className="w-full flex items-center gap-3 group text-left"
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedReason === reason ? 'border-[#FF4D4F] bg-[#FF4D4F]/5' : 'border-slate-100 group-hover:border-slate-200'}`}>
                {selectedReason === reason && <div className="w-2.5 h-2.5 rounded-full bg-[#FF4D4F]" />}
              </div>
              <span className={`text-[11px] font-black transition-colors ${selectedReason === reason ? 'text-[#FF4D4F]' : 'text-[#1A1A1A]'}`}>{reason}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 mt-6">
        <button 
          disabled={!selectedReason}
          onClick={() => setIsDeleted(true)}
          className={`w-full py-4 rounded-2xl border flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all ${selectedReason ? 'bg-white border-[#FF4D4F] text-[#FF4D4F] shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'}`}
        >
          <Trash2 size={16} /> Delete My Account
        </button>
        <button onClick={onBack} className="w-full py-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 uppercase tracking-widest active:scale-95 transition-all">
          Cancel
        </button>
      </div>
    </div>
  );
};

/* ─── EDIT PROFILE PAGE ─── */
const EditProfileContent = ({ name, onBack, onSave, onNavigate }) => {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  return (
    <div className="h-full flex flex-col pb-4">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageChange} 
        accept="image/*" 
        className="hidden" 
      />
      
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8 pt-1">
        <button onClick={onBack} className="w-9 h-9 bg-white rounded-xl shadow-sm border border-white flex items-center justify-center text-[#1A1A1A]">
          <ChevronLeft size={18} />
        </button>
        <div>
          <p className="text-[7px] font-black text-slate-400 uppercase tracking-[0.2em]">Account Settings</p>
          <h2 className="text-lg font-bold text-[#1A1A1A] font-['Space_Grotesk'] leading-tight">Your Profile</h2>
        </div>
      </div>

      {/* AVATAR SECTION */}
      <div className="flex flex-col items-center mb-4">
        <div className="relative mb-3">
          <div className="w-20 h-20 bg-[#F37021] rounded-[1.75rem] flex items-center justify-center text-white text-2xl font-black shadow-xl overflow-hidden">
            {profileImage ? (
              <img src={profileImage} className="w-full h-full object-cover" alt="profile" />
            ) : (
              name.split(' ').map(n=>n[0]).join('')
            )}
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full border-[3px] border-white flex items-center justify-center shadow-md"
          >
            <Camera size={12} className="text-[#1A1A1A]" />
          </button>
        </div>
        <div className="flex gap-2 mb-2">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 bg-white rounded-lg border border-slate-100 shadow-sm text-[8px] font-black text-[#1A1A1A] uppercase tracking-widest flex items-center gap-1.5"
          >
            <Image size={10} className="text-slate-400" /> GALLERY
          </button>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 bg-[#1A1A1A] rounded-lg shadow-md text-[8px] font-black text-white uppercase tracking-widest flex items-center gap-1.5"
          >
            <Camera size={10} className="text-white" /> CAMERA
          </button>
        </div>
        <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Change Profile Photo</p>
      </div>

      {/* FORM FIELDS */}
      <div className="space-y-2.5 mb-4">
        {[
          { label: 'Full Name', value: name, icon: User, badge: true },
          { label: 'Email Address', value: 'yourname@example.com', icon: Mail, badge: false },
          { label: 'Phone Number', value: '+91 8839044030', icon: Phone, badge: 'VERIFIED' },
        ].map((field, i) => (
          <div key={i} className="space-y-1">
            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest px-1">{field.label}</label>
            <div className="bg-white h-10 rounded-xl flex items-center px-4 shadow-sm border border-slate-50 group focus-within:border-[#F37021]/30 transition-all">
              <field.icon size={14} className="text-slate-300 mr-3" />
              <input 
                type="text" 
                defaultValue={field.value}
                className="bg-transparent border-none outline-none text-[11px] font-bold text-[#1A1A1A] w-full"
              />
              {field.badge === true && <div className="w-3.5 h-3.5 bg-[#10B981]/10 rounded-full flex items-center justify-center"><Check size={8} className="text-[#10B981]" /></div>}
              {field.badge === 'VERIFIED' && <span className="text-[6px] font-black text-[#10B981] bg-[#10B981]/10 px-1 py-0.5 rounded uppercase tracking-tighter">Verified</span>}
            </div>
          </div>
        ))}
      </div>

      {/* SHOP & VERIFICATION */}
      <div className="space-y-2 mb-4">
        <p className="text-[8px] font-black text-[#1A1A1A]/40 uppercase tracking-[0.25em] px-1">Shop & Verification</p>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onNavigate && onNavigate('address')}
            className="bg-white p-3 rounded-xl border border-slate-50 shadow-sm flex flex-col gap-2 group active:scale-95 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-[#F5F7E8] flex items-center justify-center">
              <Store size={14} className="text-[#4D5D26]" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-[#1A1A1A] leading-tight">Shop Details</p>
              <p className="text-[7px] text-slate-400 font-bold uppercase tracking-tighter">Submission</p>
            </div>
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('documents')}
            className="bg-white p-3 rounded-xl border border-slate-50 shadow-sm flex flex-col gap-2 group active:scale-95 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-[#E6F7FF] flex items-center justify-center">
              <FileText size={14} className="text-[#1890FF]" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-[#1A1A1A] leading-tight">Documents</p>
              <p className="text-[7px] text-slate-400 font-bold uppercase tracking-tighter">ID & License</p>
            </div>
          </button>
        </div>
      </div>

      {/* SAVE BUTTON */}
      <button 
        onClick={() => onSave()}
        className="w-full py-3 bg-[#1A1A1A] rounded-2xl text-[9px] font-black text-white uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all mt-auto"
      >
        Save Profile
      </button>
    </div>
  );
};

/* ─── SERVICE HISTORY PAGE ─── */
const ServicesHistoryContent = ({ onBack }) => {
  const history = [
    { id: 'SRV-8821', vehicle: 'Royal Enfield 650', service: 'Full Synthetic Oil Change', date: '22 Apr 2026', amount: '₹1,250', status: 'COMPLETED' },
    { id: 'SRV-8790', vehicle: 'Honda Activa 6G', service: 'Brake Adjustment & Wash', date: '20 Apr 2026', amount: '₹450', status: 'COMPLETED' },
    { id: 'SRV-8755', vehicle: 'KTM Duke 390', service: 'Chain Cleaning & Lube', date: '18 Apr 2026', amount: '₹300', status: 'COMPLETED' },
  ];

  return (
    <div className="h-full flex flex-col pb-6">
      <div className="flex items-center gap-4 mb-6 pt-2 px-1">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-xl shadow-sm border border-white flex items-center justify-center text-[#1A1A1A]">
          <ChevronLeft size={20} />
        </button>
        <div>
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Service Hub</p>
          <h2 className="text-xl font-bold text-[#1A1A1A] font-['Space_Grotesk'] leading-tight">My Services</h2>
        </div>
      </div>

      <div className="bg-white p-3 rounded-2xl border border-slate-50 shadow-sm flex items-center gap-3 mb-6">
        <Search size={16} className="text-slate-300" />
        <input type="text" placeholder="Search receipts or vehicles..." className="bg-transparent border-none outline-none text-xs font-bold text-[#1A1A1A] w-full" />
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-1">
        <p className="text-[8px] font-black text-[#1A1A1A]/40 uppercase tracking-[0.25em] px-2 mb-2">Recent Receipts</p>
        {history.map((srv, i) => (
          <div key={srv.id} className="bg-white p-4 rounded-2xl border border-slate-50 shadow-sm group active:scale-[0.98] transition-all">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-[8px] font-black text-slate-300 uppercase mb-1">{srv.id}</p>
                <h4 className="text-[13px] font-semibold text-[#1A1A1A] leading-tight mb-1">{srv.vehicle}</h4>
                <p className="text-[10px] text-slate-400 font-bold italic">{srv.service}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-black text-[#1A1A1A] mb-1">{srv.amount}</p>
                <span className="text-[7px] font-black text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.5 rounded uppercase tracking-tighter">Completed</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-50">
              <p className="text-[8px] font-bold text-slate-300">{srv.date}</p>
              <button className="text-[8px] font-black text-[#1890FF] uppercase tracking-widest flex items-center gap-1.5">
                <FileText size={12} /> View Receipt
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
/* ─── REFER & EARN PAGE ─── */
const ReferAndEarnContent = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('earn');
  
  return (
    <div className="h-full flex flex-col pb-6">
      <div className="flex items-center gap-4 mb-6 pt-2 px-1">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-xl shadow-sm border border-white flex items-center justify-center text-[#1A1A1A]">
          <ChevronLeft size={20} />
        </button>
        <div>
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Profile</p>
          <h2 className="text-xl font-bold text-[#1A1A1A] font-['Space_Grotesk'] leading-tight">Referrals</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        {/* PROMO CARD */}
        <div className="bg-[#1A1C22] rounded-[2.5rem] p-6 mb-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="flex justify-between items-start">
            <div className="max-w-[70%]">
              <h3 className="text-xl font-black text-white font-['Space_Grotesk'] uppercase leading-tight mb-2">Refer and Earn</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Language: EN</p>
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
              <Gift size={20} className="text-[#D4E70D]" />
            </div>
          </div>
        </div>

        {/* CODE SECTION */}
        <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-sm mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-lg font-black text-[#1A1A1A] font-['Space_Grotesk'] tracking-widest">USR4030BA18D7</p>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter mt-1 italic">Your referral code</p>
            </div>
            <button className="bg-[#1A1A1A] text-white px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 active:scale-95 transition-all">
              <Copy size={14} /> Copy
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-50 mb-6">
          <button 
            onClick={() => setActiveTab('earn')}
            className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'earn' ? 'bg-[#D4E70D] text-[#1A1A1A] shadow-sm' : 'text-slate-400'}`}
          >
            Refer and earn
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-[#D4E70D] text-[#1A1A1A] shadow-sm' : 'text-slate-400'}`}
          >
            Referral history
          </button>
        </div>

        {/* HOW IT WORKS */}
        <div className="px-1 pb-24">
          <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-widest mb-4">How it works?</h4>
          <div className="space-y-6">
            {[
              { 
                title: "Share your code", 
                desc: "The referrer user will get ₹100 instantly as a reward after a new user or driver signs up." 
              },
              { 
                title: "Ask friend to download the app", 
                desc: "Ask your friends to download the Zyder app (CliqGarage)." 
              },
              { 
                title: "Get rewarded", 
                desc: "Earn cash back when your friends register and travel with Zyder." 
              },
              { 
                title: "Friend completes 0 rides", 
                desc: "The referrer user gets ₹100 when the referred user completes 0 rides and the referred driver finishes 0 rides. The new user earns ₹100, and the new driver earns ₹100." 
              }
            ].map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-[#D4E70D] rounded-full shrink-0 mt-1.5" />
                <div>
                  <h5 className="text-[11px] font-black text-[#1A1A1A] uppercase leading-tight mb-1">{step.title}</h5>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FIXED BOTTOM ACTION */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <button className="w-full py-5 bg-[#4D5D26] text-white rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all">
          <Gift size={16} /> Refer Now
        </button>
      </div>
    </div>
  );
};

/* ─── SUPPORT PAGE ─── */
const SupportContent = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('ALL');

  return (
    <div className="h-full flex flex-col pb-6">
      <div className="flex items-center gap-4 mb-6 pt-2 px-1">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-xl shadow-sm border border-white flex items-center justify-center text-[#1A1A1A]">
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Help Center</p>
          <h2 className="text-xl font-bold text-[#1A1A1A] font-['Space_Grotesk'] leading-tight">Support Tickets</h2>
        </div>
        <button className="w-10 h-10 bg-[#1A1A1A] text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-all">
          <Plus size={20} />
        </button>
      </div>

      {/* TABS */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-slate-50 mb-8">
        {['ALL', 'OPEN', 'RESOLVED'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#4D5D26] text-white shadow-sm' : 'text-slate-400'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* EMPTY STATE */}
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-50 relative">
          <Activity size={40} className="text-slate-100" />
          <div className="absolute inset-0 flex items-center justify-center">
            <MessageSquare size={32} className="text-slate-200" />
          </div>
        </div>
        <h4 className="text-[13px] font-black text-[#1A1A1A] mb-1.5 uppercase tracking-widest font-['Space_Grotesk']">No tickets yet</h4>
        <p className="text-[10px] text-slate-400 font-bold leading-relaxed mb-8 max-w-[200px]">
          Tap <span className="text-[#1A1A1A]">+</span> to get help from our expert support team.
        </p>
      </div>
    </div>
  );
};


/* ─── ADVERTISEMENT PAGE ─── */
const AdvertisementContent = ({ onBack, banners, onAddBanner, onDeleteBanner, onUpdateBanner }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [editBanner, setEditBanner] = useState(null);

  const content = (
    <div className="space-y-4">
      <AnimatePresence>
        {(showAdd || editBanner) && (
          <BannerModal 
            banner={editBanner}
            onSave={(f) => {
              if (editBanner) onUpdateBanner(editBanner.id, f);
              else onAddBanner(f);
              setShowAdd(false);
              setEditBanner(null);
            }}
            onClose={() => {
              setShowAdd(false);
              setEditBanner(null);
            }}
          />
        )}
      </AnimatePresence>

      <div className="pt-4 grid grid-cols-2 gap-3 px-1">
        {/* Compact Add Banner Button */}
        {!onBack && (
          <button 
            onClick={() => setShowAdd(true)}
            className="h-full min-h-[10rem] border-2 border-dashed border-slate-200 rounded-none flex flex-col items-center justify-center gap-2 bg-slate-50/50 hover:bg-slate-100 hover:border-blue-200 transition-all group"
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <Plus size={20} className="text-blue-500" />
            </div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">New Ad</p>
          </button>
        )}

        {banners.map((ad, i) => (
          <motion.div 
            key={ad.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-none overflow-hidden border border-slate-100 shadow-xl shadow-blue-500/5 group relative flex flex-col"
          >
            <div className="h-20 relative overflow-hidden">
              <img src={ad.image || ad.bg} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="ad" />
              <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 flex items-center gap-1 shadow-lg">
                <div className="w-1 h-1 rounded-full bg-[#D4E70D] animate-pulse" />
                <span className="text-[6px] font-black text-white uppercase tracking-widest">
                  {ad.status || 'Active'}
                </span>
              </div>
            </div>
            
            <div className="p-2 flex-1 flex flex-col">
              <h4 className="text-[9px] font-black text-[#1A1A1A] uppercase tracking-tight mb-2 line-clamp-1 leading-tight min-h-[1.2rem]">
                {ad.title}
              </h4>
              
              <div className="mt-auto flex items-center justify-between gap-1.5 pt-2 border-t border-slate-50">
                <div className="flex gap-1">
                  <button 
                    onClick={() => onDeleteBanner(ad.id)} 
                    className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all active:scale-90 border border-red-100/50"
                  >
                    <Trash2 size={10} />
                  </button>
                  <button 
                    onClick={() => {
                      onBack && onBack(); 
                    }} 
                    className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all active:scale-90 border border-emerald-100/50"
                  >
                    <MapPin size={10} />
                  </button>
                </div>
                <button 
                  onClick={() => setEditBanner(ad)} 
                  className="flex-1 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95 border border-blue-100/50 flex items-center justify-center gap-1"
                >
                  <Edit3 size={10} /> Edit
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (onBack) {
    return (
      <PageWrapper 
        title="Ad Banners" 
        subtitle="Growth" 
        onBack={onBack}
        action={
          <button 
            onClick={() => setShowAdd(true)}
            className="w-10 h-10 bg-[#1677FF] text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-all"
          >
            <Plus size={20} />
          </button>
        }
      >
        {content}
      </PageWrapper>
    );
  }
  return content;
};

/* ─── PROFILE PAGE ─── */
const ProfileContent = ({ name, onSignOut, activeSubView, setActiveSubView, notifications, onClearNotifs, onRefreshNotifs }) => {

  if (activeSubView === 'edit') {
    return <EditProfileContent name={name} onBack={() => setActiveSubView(null)} onSave={() => setActiveSubView(null)} onNavigate={setActiveSubView} />;
  }

  if (activeSubView === 'documents') {
    return <DocumentsContent onBack={() => setActiveSubView(null)} />;
  }

  if (activeSubView === 'wallet') {
    return <WalletContent onBack={() => setActiveSubView(null)} />;
  }

  if (activeSubView === 'address') {
    return <AddressesContent onBack={() => setActiveSubView(null)} />;
  }

  if (activeSubView === 'notifications') {
    return <NotificationsContent onBack={() => setActiveSubView(null)} notifs={notifications} onClear={onClearNotifs} onRefresh={onRefreshNotifs} />;
  }

  if (activeSubView === 'services') {
    return <ServicesHistoryContent onBack={() => setActiveSubView(null)} />;
  }

  if (activeSubView === 'referral') {
    return <ReferAndEarnContent onBack={() => setActiveSubView(null)} />;
  }

  if (activeSubView === 'support') {
    return <SupportContent onBack={() => setActiveSubView(null)} />;
  }

  if (activeSubView === 'delete') {
    return <DeleteAccountContent onBack={() => setActiveSubView(null)} />;
  }

  const menuItems = [
    { icon: User, label: 'Profile Settings', sub: 'Manage your personal info', color: '#FFF1F0', iconCol: '#FF4D4F', action: () => setActiveSubView('edit') },
    { icon: Wallet, label: 'Wallet', sub: 'Balance, transactions & top-up', color: '#E6F7FF', iconCol: '#1890FF', action: () => setActiveSubView('wallet') },
    { icon: MapPin, label: 'Shop Address', sub: 'Vijay Nagar Main Road · Shop #12', color: '#F6FFED', iconCol: '#52C41A', action: () => setActiveSubView('address') },
    { icon: Shield, label: 'Documents', sub: 'Aadhar, Pan, Shop Act & more', color: '#E6F4FF', iconCol: '#1677FF', action: () => setActiveSubView('documents') },
    { icon: Bike, label: 'My Services', sub: 'History & receipts', color: '#F9F0FF', iconCol: '#722ED1', action: () => setActiveSubView('services') },
    { icon: Bell, label: 'Notifications', sub: 'Offers & safety alerts', color: '#FFF7E6', iconCol: '#FAAD14', action: () => setActiveSubView('notifications') },
    { icon: Star, label: 'Refer & Earn', sub: 'Invite friends & get rewards', color: '#FEFFE6', iconCol: '#FADB14', action: () => setActiveSubView('referral') },
    { icon: AlertCircle, label: 'Support', sub: 'Help center & ticketing', color: '#E6FFFB', iconCol: '#13C2C2', action: () => setActiveSubView('support') },
    { icon: Trash2, label: 'Delete Account', sub: 'Request account deletion', color: '#FFF1F0', iconCol: '#FF4D4F', action: () => setActiveSubView('delete') },
  ];

  return (
    <div className="pb-10 pt-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-[#1A1A1A] font-['Space_Grotesk'] leading-tight">My Account</h2>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Manage your profile & settings</p>
      </div>

      {/* PROFILE CARD (Compact & Sharp) */}
      <div className="bg-white rounded-xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] mb-6 relative overflow-hidden border border-white">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-[#1A1A1A] rounded-xl flex items-center justify-center text-white text-lg font-black shadow-lg">
              {name.split(' ').map(n=>n[0]).join('')}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#10B981] rounded-full border-[3px] border-white flex items-center justify-center shadow-sm">
              <Check size={8} className="text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-0">
              <h3 className="text-base font-black text-[#1A1A1A] font-['Space_Grotesk'] leading-none">{name}</h3>
              <div className="bg-[#FFFBE6] px-1.5 py-0.5 rounded-md border border-[#FFE58F] flex items-center gap-1">
                <Star size={9} className="text-[#FADB14] fill-[#FADB14]" />
                <span className="text-[9px] font-black text-[#1A1A1A]">4.9</span>
              </div>
            </div>
            <p className="text-[11px] text-[#4D5D26] font-bold mt-0.5 tracking-tight">+91 8839044030</p>
            <p className="text-[8px] font-black text-[#10B981] uppercase tracking-[0.15em] mt-1">Active</p>
          </div>
        </div>
      </div>

      {/* SYSTEM MENU */}
      <div className="space-y-4">
        <p className="text-[9px] font-black text-[#1A1A1A]/40 uppercase tracking-[0.25em] px-2">System Menu</p>
        <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-white">
          {menuItems.map((item, i) => (
            <button key={i} 
              onClick={() => item.action && item.action()}
              className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-all border-b border-slate-50 last:border-none group`}
            >
              <div className="flex items-center gap-4">
                <div style={{ backgroundColor: item.color }} className="w-11 h-11 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                  <item.icon size={18} style={{ color: item.iconCol }} />
                </div>
                <div className="text-left">
                  <h4 className="text-[13px] font-semibold text-[#1A1A1A] leading-tight mb-0.5">{item.label}</h4>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{item.sub}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-[#1A1A1A] transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* LOGOUT BUTTON */}
      <button 
        onClick={onSignOut}
        className="w-full mt-8 py-5 bg-[#FFF1F0] rounded-[2rem] flex items-center justify-center gap-3 text-[10px] font-black text-[#FF4D4F] uppercase tracking-[0.2em] hover:bg-red-100 transition-all active:scale-95 border border-[#FFCCC7]"
      >
        <LogOut size={14} />
        Sign Out from Session
      </button>
    </div>
  );
};

/* ─── NAV CONFIG ─── */
const NAV_ITEMS = [
  { key:'dashboard', icon:Home,         label:'Dashboard' },
  { key:'services',  icon:Wrench,       label:'My Services' },
  { key:'jobs',      icon:Package,      label:'Job Requests' },
  { key:'banners',   icon:ImageIcon,    label:'Ad Banners' },
  { key:'earnings',  icon:BarChart2,    label:'Earnings & Reports' },
  { key:'hours',     icon:Clock,        label:'Working Hours' },
  { key:'ratings',   icon:Star,         label:'Ratings & Feedback' },
  { key:'documents', icon:Shield,       label:'Documents' },
  { key:'settings',  icon:Settings,     label:'Settings' },
];

/* ─── SIDEBAR ─── */
const Sidebar = ({ name, activePage, onNavigate, onClose, onSignOut,
  requests, services, hours,
  onJobAction, onStatusChange,
  onSaveService, onToggleService, onDeleteService,
  onSaveHour,
  activeSubView, setActiveSubView, notifications, onClearNotifs, onRefreshNotifs
}) => {

  const [editSv,setEditSv]=useState(null);
  const [addSv,setAddSv]=useState(false);
  const [editHr,setEditHr]=useState(null);



  return (
    <motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}}
      transition={{type:'tween',duration:0.28}} className="fixed inset-0 z-50 flex flex-row-reverse">

      {/* Overlay background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 -z-10"
      />

      <div className="w-[70%] max-w-[250px] bg-white h-full flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.1)]">

        <AnimatePresence>
          {(addSv||editSv)&&(
            <ServiceModal service={editSv}
              onSave={f=>{onSaveService(f,editSv);setEditSv(null);setAddSv(false);}}
              onClose={()=>{setAddSv(false);setEditSv(null);}}/>
          )}
          {editHr&&(
            <HoursModal slot={editHr}
              onSave={f=>{onSaveHour(f);setEditHr(null);}}
              onClose={()=>setEditHr(null)}/>
          )}
        </AnimatePresence>

        {/* Compact Header (Updated to Soft Blue) */}
        <div className="bg-[#E6F4FF] px-4 pt-6 pb-4 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md">
                <CliqLogo size={22}/>
              </div>
              <div className="leading-none">
                <h2 className="text-[#1A1A1A] text-[13px] font-black tracking-tighter uppercase font-['Space_Grotesk']">Cliq</h2>
                <h2 className="text-[#4A9EFF] text-[13px] font-black tracking-tighter uppercase font-['Space_Grotesk']">Garage</h2>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center active:scale-90 transition-transform">
              <X size={14} className="text-[#1A1A1A]"/>
            </button>
          </div>
          
          {/* Profile card - More Compact */}
          <div className="bg-white rounded-xl p-2.5 flex items-center gap-2.5 shadow-sm border border-white">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-100">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#1A1A1A] text-[10px] font-bold leading-none truncate">{name}</p>
              <p className="text-slate-400 text-[8px] mt-0.5">Verified Partner</p>
            </div>
            <div className="flex items-center gap-0.5 bg-[#FFFBE6] px-1.5 py-0.5 rounded-md shrink-0 border border-[#FFE58F]">
              <Star size={8} className="text-[#FADB14] fill-[#FADB14]"/>
              <span className="text-[#1A1A1A] text-[9px] font-black">4.9</span>
            </div>
          </div>
        </div>

        {/* Nav list */}
        <div className="flex-1 overflow-y-auto">
          {/* Nav items */}
          <div className="px-3 py-2 space-y-0.5">
            {NAV_ITEMS.map((item,i)=>(
              <button key={i} onClick={()=>{ onNavigate(item.key); onClose(); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  activePage===item.key
                    ?'bg-[#E6F4FF] text-[#1677FF] shadow-sm border border-[#91CAFF]'
                    :'text-slate-500 hover:bg-slate-50'}`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  activePage===item.key?'bg-white/20':'bg-slate-100'}`}>
                  <item.icon size={13} className={activePage===item.key?'text-white':'text-slate-400'}/>
                </div>
                <span className="flex-1 text-left text-xs">{item.label}</span>
                <ChevronRight size={12} className={activePage===item.key?'text-white/50':'text-slate-300'}/>
              </button>
            ))}
          </div>
        </div>

        {/* Sign out */}
        <div className="px-3 pb-6 pt-2 border-t border-slate-100 shrink-0">
          <button onClick={onSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:bg-red-50 transition-all">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
              <LogOut size={14} className="text-red-400"/>
            </div>
            Sign Out
          </button>
        </div>
      </div>

      <div className="flex-1 bg-black/40" onClick={onClose}/>
    </motion.div>
  );
};

/* ─── MAIN TABS ─── */
const TABS = [
  {key:'jobs',     label:'Jobs',     icon:Package,   color:'#B3D8E8'},
  {key:'services', label:'Services', icon:Wrench,    color:'#FCE1A8'},
  {key:'hours',    label:'Hours',    icon:Clock,     color:'#ADE9E5'},
  {key:'earnings', label:'Earnings', icon:BarChart2, color:'#D1C4E9'},
];

/* ─── MAIN DASHBOARD ─── */
const MechanicDashboard = () => {
  const navigate = useNavigate();
  const mechanicName = "Suraj Chouhan";

  const [activeTab,setActiveTab]=useState('dashboard');
  const [activeSubView, setActiveSubView] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarPage, setSidebarPage] = useState('dashboard');


  // Login Success Toast on Mount
  useEffect(() => {
    setTimeout(() => {
      showToast('Login Successful');
    }, 1000);
  }, []);

  // NOTIFICATIONS STATE
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Job Request', sub: 'Suraj Chouhan requested Periodic Maintenance', time: 'Just now', image: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=800&h=400&fit=crop' },
    { id: 2, title: 'Payment Received', sub: '₹3,450 added to your wallet', time: '10 mins ago' },
    { id: 3, title: 'Profile Verified', sub: 'Your shop documents have been approved', time: '2 hours ago' },
    { id: 4, title: 'System Alert', sub: 'Maintenance scheduled for tonight', time: 'Yesterday' },
  ]);

  const handleRefreshNotifs = () => {
    const newNotif = {
      id: Date.now(),
      title: 'Update Received',
      sub: 'New features are now available in your panel',
      time: 'Just now'
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleClearNotifs = () => {
    setNotifications([]);
  };

  const [banners, setBanners] = useState([
    { id: 1, title: 'Expert Bike Engine Tuning', image: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=800&h=400&fit=crop' },
    { id: 2, title: 'Periodic Maintenance Package', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=400&fit=crop' },
  ]);

  const handleAddBanner = (data) => {
    const newBanner = { ...data, id: Date.now() };
    setBanners([newBanner, ...banners]);
  };

  const handleDeleteBanner = (id) => {
    setBanners(banners.filter(b => b.id !== id));
  };

  const handleUpdateBanner = (id, data) => {
    setBanners(banners.map(b => b.id === id ? { ...b, ...data } : b));
  };

  const openNotifications = () => {
    setActiveTab('profile');
    setActiveSubView('notifications');
  };

  const [requests,setRequests]=useState(initRequests);
  const [services,setServices]=useState(initServices);
  const [hours,setHours]=useState(initHours);
  const [editService,setEditService]=useState(null);
  const [showAddService,setShowAddService]=useState(false);
  const [editHour,setEditHour]=useState(null);
  const [toast,setToast]=useState(null);
  const showToast=(msg)=>{setToast(msg); setTimeout(()=>setToast(null),3000);};



  const handleJobAction=(id,action)=>{
    setRequests(r=>r.map(req=>req.id===id?{...req,status:action}:req));
    showToast(action==='accepted'?'Job accepted!':'Job updated!');
  };
  const handleStatusChange=(id,status)=>{
    setRequests(r=>r.map(req=>req.id===id?{...req,status}:req));
    showToast('Status updated!');
  };
  const handleSaveService=(form,orig)=>{
    if(orig) setServices(s=>s.map(sv=>sv.id===orig.id?{...sv,...form}:sv));
    else setServices(s=>[...s,{...form,id:Date.now()}]);
    showToast(orig?'Service updated!':'Service added!');
  };
  const handleSaveHour=(form)=>{
    setHours(h=>h.map(d=>d.day===form.day?form:d));
    showToast('Hours updated!');
    setEditHour(null);
  };
  const toggleService=(id)=>setServices(s=>s.map(sv=>sv.id===id?{...sv,active:!sv.active}:sv));
  const deleteService=(id)=>setServices(s=>s.filter(sv=>sv.id!==id));

  const handleUploadProof=(id,img)=>{
    setRequests(r=>r.map(req=>req.id===id?{...req,proofImage:img}:req));
  };

  const openSidebar=(page='dashboard')=>{
    setSidebarPage(page);
    setSidebarOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7E8] to-[#FFFEF7] flex flex-col overflow-y-auto font-['Inter',sans-serif]">

      <AnimatePresence>
        {sidebarOpen&&(
          <Sidebar 
            name={mechanicName} 
            activePage={activeTab} 
            onNavigate={p=>{
              if (p === 'banners') {
                setActiveTab('profile');
                setActiveSubView('banners');
              } else {
                setActiveTab(p);
                setActiveSubView(null);
              }
              setSidebarOpen(false);
            }} 
            onClose={()=>setSidebarOpen(false)}
            onSignOut={()=>{ setSidebarOpen(false); navigate('/mechanic/login', { replace: true }); }}
            requests={requests} services={services} hours={hours}
            onJobAction={handleJobAction} onStatusChange={handleStatusChange}
            onSaveService={handleSaveService} onToggleService={toggleService} onDeleteService={deleteService}
            onSaveHour={handleSaveHour}
            activeSubView={activeSubView}
            setActiveSubView={setActiveSubView}
            notifications={notifications}
            onClearNotifs={handleClearNotifs}
            onRefreshNotifs={handleRefreshNotifs}
          />
        )}
        {(showAddService||editService)&&(
          <ServiceModal service={editService}
            onSave={f=>handleSaveService(f,editService)}
            onClose={()=>{setShowAddService(false);setEditService(null);}}/>
        )}
        {editHour&&<HoursModal slot={editHour} onSave={handleSaveHour} onClose={()=>setEditHour(null)}/>}
      </AnimatePresence>

      {/* HEADER SECTION (Now only for main Dashboard) */}
      {activeTab === 'dashboard' && (
        <div className="shrink-0">
          {/* TOP HEADER */}
          <div className="px-5 pt-6 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-white">
                <img src="https://images.unsplash.com/photo-1541888941259-7927394605dd?w=100&h=100&fit=crop" className="w-full h-full object-cover" alt="avatar" />
              </div>
              <div>
                <h2 className="text-[13px] font-black text-[#1A1A1A] leading-tight font-['Space_Grotesk']">Hello, {mechanicName}</h2>
                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-tight">What would you like to do today?</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <button onClick={() => setActiveTab('earnings')} className="w-10 h-10 bg-white rounded-xl shadow-sm border border-white flex items-center justify-center text-[#1A1A1A] active:scale-90 transition-all">
                <Wallet size={18} />
              </button>
              <button onClick={openNotifications} className="w-10 h-10 bg-white rounded-xl shadow-sm border border-white flex items-center justify-center text-[#1A1A1A] relative active:scale-90 transition-all">
                <Bell size={18} />
                {notifications.length > 0 && (
                  <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
                )}
              </button>
              <button onClick={() => openSidebar()} className="w-10 h-10 bg-white rounded-xl shadow-sm border border-white flex items-center justify-center text-[#1A1A1A] active:scale-90 transition-all">
                <Menu size={20} />
              </button>
            </div>
          </div>

          {/* SEARCH & SETTINGS */}
          <div className="px-5 py-3 flex gap-2">
            <div className="flex-1 bg-white h-12 rounded-2xl flex items-center px-4 shadow-sm border border-white">
              <LayoutGrid size={18} className="text-slate-300 mr-3" />
              <input type="text" placeholder="Search jobs, services..." className="bg-transparent border-none outline-none text-xs font-medium text-[#1A1A1A] w-full placeholder:text-slate-300" />
            </div>
            <button onClick={() => setActiveTab('profile')} className="w-12 h-12 bg-[#4D5D26] rounded-2xl flex items-center justify-center text-white shadow-lg active:scale-95 transition-all">
              <Settings size={20} />
            </button>
          </div>

          {/* ACTION CATEGORIES (1x4 Grid) */}
          <div className="px-5 py-2 grid grid-cols-4 gap-3">
            {[
              { key: 'jobs', label: 'Jobs', icon: Package, color: '#B3D8E8' },
              { key: 'services', label: 'Services', icon: Wrench, color: '#FCE1A8' },
              { key: 'hours', label: 'Hours', icon: Clock, color: '#ADE9E5' },
              { key: 'earnings', label: 'Earnings', icon: BarChart2, color: '#D1C4E9' },
            ].map(({ key, label, icon: Icon, color }) => (
              <button 
                key={key} 
                onClick={() => setActiveTab(key)}
                className="flex flex-col items-center group"
              >
                <div 
                  style={{ backgroundColor: color }}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-1.5 shadow-sm transition-all border border-white/40 ${
                    activeTab === key ? 'scale-110 shadow-md ring-2 ring-[#D4E70D]' : 'opacity-70 grayscale-[20%]'
                  }`}
                >
                  <Icon size={20} strokeWidth={2.5} className="text-[#1A1A1A]" />
                </div>
                <p className={`text-[8.5px] font-black uppercase tracking-widest text-center ${
                  activeTab === key ? 'text-[#1A1A1A]' : 'text-slate-500'
                }`}>
                  {label}
                </p>
              </button>
            ))}
          </div>

          {/* LIVE TRACKING SECTION (New) */}
          <div className="px-5 pb-5 shrink-0 pt-2">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#1A1A1A] font-['Space_Grotesk']">Live Service Tracking</h3>
                <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              </div>
              <button onClick={() => setActiveTab('live_map')} className="text-[9px] font-bold text-[#4D5D26] uppercase tracking-tighter">View Full Map</button>
            </div>
            <div className="relative h-40 bg-white rounded-[2rem] overflow-hidden shadow-sm border border-white p-1">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&h=400&fit=crop')] bg-cover bg-center opacity-40 grayscale-[30%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
              
              {/* Mock Markers */}
              <motion.div 
                animate={{ y: [0, -5, 0] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-10 left-20 bg-[#4D5D26] p-1.5 rounded-full shadow-lg border-2 border-white"
              >
                <MapPin size={12} className="text-white" />
              </motion.div>
              
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }} 
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-12 right-24 bg-[#D4E70D] p-1.5 rounded-full shadow-lg border-2 border-white"
              >
                <Activity size={12} className="text-[#1A1A1A]" />
              </motion.div>

              <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-xl border border-white/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#F5F7E8] flex items-center justify-center">
                    <Bike size={14} className="text-[#4D5D26]" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-[#1A1A1A] leading-none uppercase">Suraj Chouhan</p>
                    <p className="text-[7px] text-slate-400 font-medium mt-0.5">Enroute to Workshop · 0.8 km</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-bold text-emerald-600">4 min</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      <div className="px-4 py-2.5 space-y-2 pb-32">
        {activeTab==='dashboard'&&<DashboardHome name={mechanicName} onNavigate={tab=>{setActiveTab(tab);}} banners={banners} />}
        {activeTab==='jobs'&&<JobsContent onBack={()=>setActiveTab('dashboard')} requests={requests} onAction={handleJobAction} onStatusChange={handleStatusChange} onUploadProof={handleUploadProof} onShowToast={showToast} />}
        {activeTab==='services'&&<ServicesContent onBack={()=>setActiveTab('dashboard')} services={services} onAdd={()=>setShowAddService(true)} onEdit={setEditService} onToggle={toggleService} onDelete={deleteService}/>}
        {activeTab==='hours'&&<HoursContent onBack={()=>setActiveTab('dashboard')} hours={hours} onEdit={setEditHour}/>}
        {activeTab==='earnings'&&<EarningsContent onBack={()=>setActiveTab('dashboard')} />}
        {activeTab==='ratings'&&<RatingsContent onBack={()=>setActiveTab('dashboard')} />}
        {activeTab==='documents'&&<DocumentsContent onBack={()=>setActiveTab('dashboard')} />}
        {activeTab==='live_map'&&<LiveMapContent onBack={()=>setActiveTab('dashboard')} />}
        {activeTab==='profile' && activeSubView==='banners' && (
          <AdvertisementContent 
            onBack={()=>setActiveSubView(null)} 
            banners={banners} 
            onAddBanner={handleAddBanner} 
            onDeleteBanner={handleDeleteBanner} 
            onUpdateBanner={handleUpdateBanner} 
          />
        )}
        {(activeTab==='profile'||activeTab==='settings') && !activeSubView && (
          <ProfileContent 
            name={mechanicName} 
            activeSubView={activeSubView}
            setActiveSubView={setActiveSubView}
            notifications={notifications}
            onClearNotifs={handleClearNotifs}
            onRefreshNotifs={handleRefreshNotifs}
            onSignOut={() => {
              showToast('Signing out...');
              setTimeout(() => navigate('/mechanic/login', { replace: true }), 1000);
            }}
          />
        )}
      </div>

      <MechanicBottomNav activeTab={activeTab} onNavigate={setActiveTab} />

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

export default MechanicDashboard;
