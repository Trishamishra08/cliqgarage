import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import MechanicBottomNav from '../../components/mechanic/MechanicBottomNav';
import {
  Wrench, MapPin, DollarSign, Star, Power, Bell, Home, BarChart2,
  Settings, Menu, X, Plus, Edit3, Trash2, Upload, Camera,
  ToggleLeft, ToggleRight, ChevronRight, Package, Shield, LogOut,
  Clock, User, CheckCircle2, XCircle, TrendingUp, Activity,
  ArrowUpRight, Banknote, FileText, MessageSquare, ThumbsUp, ThumbsDown,
  Bike, AlertCircle, Calendar
} from 'lucide-react';

/* ─── DATA ─── */
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

/* ─── HOURS MODAL ─── */
const HoursModal = ({ slot, onSave, onClose }) => {
  const [f,setF] = useState({...slot});
  return (
    <Sheet onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-[#0B1F3A]">{slot.day} Hours</h3>
        <button onClick={onClose}><X size={16} className="text-slate-400"/></button>
      </div>
      <div className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-200 mb-3">
        <p className="text-xs font-semibold text-[#0B1F3A]">Open on {slot.day}</p>
        <button onClick={()=>setF(p=>({...p,active:!p.active}))}>
          {f.active?<ToggleRight size={24} className="text-emerald-500"/>:<ToggleLeft size={24} className="text-slate-300"/>}
        </button>
      </div>
      {f.active&&(
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1 block">Opens At</label>
            <input type="time" value={f.open} onChange={e=>setF(p=>({...p,open:e.target.value}))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-[#0B1F3A] outline-none"/>
          </div>
          <div>
            <label className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1 block">Closes At</label>
            <input type="time" value={f.close} onChange={e=>setF(p=>({...p,close:e.target.value}))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-[#0B1F3A] outline-none"/>
          </div>
        </div>
      )}
      <button onClick={()=>{onSave(f);onClose();}}
        className="w-full mt-4 py-2.5 rounded-xl text-sm font-bold bg-[#0B1F3A] text-white active:scale-95 transition-all">
        Save Hours
      </button>
    </Sheet>
  );
};

/* ─── PROOF MODAL ─── */
const ProofModal = ({ onClose }) => {
  const ref=useRef(); const [file,setFile]=useState(null); const [note,setNote]=useState('');
  return (
    <Sheet onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-[#0B1F3A]">Upload Completion Proof</h3>
        <button onClick={onClose}><X size={16} className="text-slate-400"/></button>
      </div>
      <input type="file" ref={ref} accept="image/*" className="hidden" onChange={e=>setFile(e.target.files[0])}/>
      <button onClick={()=>ref.current.click()}
        className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 border-dashed mb-3 transition-all ${file?'border-emerald-400 bg-emerald-50':'border-slate-200 bg-slate-50'}`}>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${file?'bg-emerald-100':'bg-white border border-slate-200'}`}>
          {file?<CheckCircle2 size={16} className="text-emerald-500"/>:<Camera size={14} className="text-slate-400"/>}
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-[#0B1F3A]">{file?file.name:'Upload Photo / Document'}</p>
          <p className="text-[9px] text-slate-400">{file?'Tap to change':'JPG, PNG, PDF'}</p>
        </div>
      </button>
      <textarea value={note} onChange={e=>setNote(e.target.value)} rows={2} placeholder="Add remarks (optional)..."
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#0B1F3A] outline-none resize-none mb-4"/>
      <button onClick={onClose} className="w-full py-2.5 rounded-xl text-sm font-bold bg-[#0B1F3A] text-white active:scale-95 transition-all">
        Submit Proof
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

/* ─── SIDEBAR CONTENT PAGES ─── */

const DashboardHome = ({ name, onNavigate }) => (
  <div className="space-y-2">
    <div className="bg-[#0B1F3A] rounded-xl p-3 relative overflow-hidden">
      <div className="absolute -top-3 -right-3 w-14 h-14 bg-[#FF6B00]/20 rounded-full blur-xl"/>
      <p className="text-white/50 text-[8px] uppercase tracking-widest mb-0.5">Today's Earnings</p>
      <h2 className="text-lg font-bold text-white">₹14,200 <span className="text-[9px] text-emerald-400">+12%</span></h2>
      <div className="grid grid-cols-3 gap-1.5 mt-2">
        {[{l:'Done',v:'28'},{l:'Pending',v:'3'},{l:'Cancelled',v:'1'}].map((s,i)=>(
          <div key={i} className="bg-white/10 rounded-lg p-1.5 text-center">
            <p className="text-white font-bold text-xs">{s.v}</p>
            <p className="text-white/40 text-[7px]">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-2 gap-1.5">
      {[
        {key:'services',icon:Wrench,label:'My Services',sub:'3 active'},
        {key:'jobs',icon:Package,label:'Job Requests',sub:'2 pending'},
        {key:'earnings',icon:BarChart2,label:'Earnings',sub:'₹52,480'},
        {key:'hours',icon:Clock,label:'Working Hours',sub:'Mon–Sat'},
        {key:'ratings',icon:Star,label:'Ratings',sub:'4.9 ⭐'},
        {key:'documents',icon:Shield,label:'Documents',sub:'2 verified'},
      ].map((item,i)=>(
        <button key={i} onClick={()=>onNavigate(item.key)}
          className="bg-white rounded-xl border border-slate-100 shadow-sm px-2.5 py-2 flex items-center gap-2 active:scale-95 transition-all text-left">
          <div className="w-6 h-6 rounded-lg bg-[#0B1F3A]/8 flex items-center justify-center shrink-0">
            <item.icon size={12} className="text-[#0B1F3A]"/>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-[#0B1F3A] leading-none truncate">{item.label}</p>
            <p className="text-[8px] text-slate-400 mt-0.5">{item.sub}</p>
          </div>
        </button>
      ))}
    </div>
  </div>
);

const JobsContent = ({ requests, onAction, onStatusChange }) => {
  const [proofId,setProofId]=useState(null);
  const [statusId,setStatusId]=useState(null);
  return (
    <div className="space-y-2">
      <AnimatePresence>
        {proofId&&<ProofModal onClose={()=>setProofId(null)}/>}
        {statusId&&<StatusPicker current={requests.find(r=>r.id===statusId)?.status} onChange={s=>onStatusChange(statusId,s)} onClose={()=>setStatusId(null)}/>}
      </AnimatePresence>
      {requests.map((req,i)=>{
        const st=STATUS[req.status];
        return (
          <motion.div key={req.id} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}}
            className={`bg-white rounded-xl border shadow-sm overflow-hidden ${req.status==='rejected'?'opacity-55':''}`}>
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-50">
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${st.dot}`}/>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{req.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[7px] text-slate-400">{req.time}</span>
                {req.status!=='pending'&&req.status!=='rejected'&&(
                  <button onClick={()=>setStatusId(req.id)} className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full ${st.cls}`}>
                    {st.label} ▾
                  </button>
                )}
              </div>
            </div>
            <div className="p-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <User size={11} className="text-slate-400"/>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#0B1F3A] leading-none">{req.customer}</p>
                    <p className="text-[8px] text-slate-400">{req.vehicle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-[#0B1F3A]">{req.amount}</p>
                  <p className="text-[7px] text-emerald-500 font-semibold">Verified</p>
                </div>
              </div>
              <span className="inline-block bg-[#FF6B00]/10 text-[#FF6B00] text-[7px] font-semibold px-1.5 py-0.5 rounded-full mb-1.5">{req.service}</span>
              <div className="flex items-center gap-1 bg-slate-50 rounded-lg px-2 py-1 mb-2">
                <MapPin size={8} className="text-[#1E4DB7] shrink-0"/>
                <p className="text-[8px] font-medium text-slate-600">{req.location}</p>
              </div>
              {req.status==='pending'?(
                <div className="flex gap-1.5">
                  <button onClick={()=>onAction(req.id,'accepted')} className="flex-1 py-1.5 bg-[#0B1F3A] text-white rounded-lg text-[8px] font-semibold flex items-center justify-center gap-1 active:scale-95">
                    <CheckCircle2 size={10}/> Accept
                  </button>
                  <button onClick={()=>onAction(req.id,'rejected')} className="w-8 h-8 bg-red-50 text-red-400 rounded-lg flex items-center justify-center border border-red-100 active:scale-95">
                    <XCircle size={13}/>
                  </button>
                </div>
              ):req.status==='completed'?(
                <div className="space-y-1">
                  <div className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-[8px] font-bold ${st.cls}`}>
                    <CheckCircle2 size={10}/> Completed
                  </div>
                  <button onClick={()=>setProofId(req.id)} className="w-full py-1.5 border border-dashed border-slate-200 rounded-lg text-[8px] font-semibold text-slate-400 flex items-center justify-center gap-1">
                    <Upload size={8}/> Upload Proof (optional)
                  </button>
                </div>
              ):(
                <div className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-[8px] font-bold ${st.cls}`}>
                  {st.label}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const ServicesContent = ({ services, onAdd, onEdit, onToggle, onDelete }) => (
  <div className="space-y-2">
    <button onClick={onAdd} className="w-full py-2 border-2 border-dashed border-[#0B1F3A]/20 rounded-xl flex items-center justify-center gap-1.5 text-[10px] font-semibold text-[#0B1F3A]/50 active:scale-95 transition-all">
      <Plus size={12}/> Add New Service
    </button>
    {services.map((sv,i)=>(
      <motion.div key={sv.id} initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}}
        className={`bg-white rounded-xl border border-slate-100 shadow-sm px-3 py-2.5 flex items-center justify-between ${!sv.active?'opacity-50':''}`}>
        <div>
          <p className="text-xs font-bold text-[#0B1F3A] leading-none">{sv.name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[9px] font-semibold text-[#FF6B00]">₹{sv.price}</span>
            {sv.duration&&<span className="text-[8px] text-slate-400">· {sv.duration} min</span>}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={()=>onToggle(sv.id)}>
            {sv.active?<ToggleRight size={20} className="text-emerald-500"/>:<ToggleLeft size={20} className="text-slate-300"/>}
          </button>
          <button onClick={()=>onEdit(sv)} className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
            <Edit3 size={10} className="text-slate-400"/>
          </button>
          <button onClick={()=>onDelete(sv.id)} className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center border border-red-100">
            <Trash2 size={10} className="text-red-400"/>
          </button>
        </div>
      </motion.div>
    ))}
  </div>
);

const HoursContent = ({ hours, onEdit }) => (
  <div className="space-y-1.5">
    {hours.map((h,i)=>(
      <div key={i} className="bg-white rounded-xl border border-slate-100 shadow-sm px-3 py-2.5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-[#0B1F3A] leading-none">{h.day}</p>
          <p className="text-[9px] text-slate-400 mt-0.5">{h.active?`${h.open} – ${h.close}`:'Closed'}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full ${h.active?'bg-emerald-50 text-emerald-600':'bg-slate-100 text-slate-400'}`}>
            {h.active?'Open':'Closed'}
          </span>
          <button onClick={()=>onEdit(h)} className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
            <Edit3 size={10} className="text-slate-400"/>
          </button>
        </div>
      </div>
    ))}
  </div>
);

const EarningsContent = () => (
  <div className="space-y-3">
    <div className="bg-[#0B1F3A] rounded-xl p-3 relative overflow-hidden">
      <div className="absolute -top-3 -right-3 w-14 h-14 bg-[#FF6B00]/20 rounded-full blur-xl"/>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/50 text-[8px] uppercase tracking-widest mb-0.5">Available for Payout</p>
          <h2 className="text-xl font-bold text-white leading-none">₹52,480</h2>
          <div className="flex items-center gap-1 mt-0.5">
            <ArrowUpRight size={9} className="text-emerald-400"/>
            <span className="text-emerald-400 text-[9px] font-semibold">+18% this month</span>
          </div>
        </div>
        <button className="px-3 py-2 bg-[#FF6B00] text-white rounded-xl text-[10px] font-bold flex items-center gap-1.5 active:scale-95 shrink-0">
          <Banknote size={11}/> Withdraw
        </button>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-1.5">
      {earningsData.map((e,i)=>(
        <div key={i} className="bg-white rounded-xl border border-slate-100 shadow-sm p-2 text-center">
          <p className="text-[7px] text-slate-400 font-medium">{e.label}</p>
          <p className="text-[10px] font-bold text-[#0B1F3A] mt-0.5">{e.value}</p>
          <p className="text-[7px] font-semibold mt-0.5" style={{color:e.color}}>{e.trend}</p>
        </div>
      ))}
    </div>
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-2.5">
      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Payment History</p>
      {[
        {date:'Apr 22',desc:'Periodic Maintenance',amount:'₹3,450'},
        {date:'Apr 20',desc:'Engine Oil Change',amount:'₹850'},
        {date:'Apr 18',desc:'Brake Pad Replacement',amount:'₹1,200'},
      ].map((t,i)=>(
        <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
          <div>
            <p className="text-[10px] font-semibold text-[#0B1F3A] leading-none">{t.desc}</p>
            <p className="text-[7px] text-slate-400 mt-0.5">{t.date}</p>
          </div>
          <p className="text-[10px] font-bold text-emerald-600">{t.amount}</p>
        </div>
      ))}
    </div>
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-2.5">
      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Commission Breakdown</p>
      {[
        {label:'Gross Earnings',value:'₹1,84,000',color:'text-[#0B1F3A]'},
        {label:'Platform Fee (12.5%)',value:'-₹23,000',color:'text-red-500'},
        {label:'Net Earnings',value:'₹1,61,000',color:'text-emerald-600'},
      ].map((r,i)=>(
        <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
          <p className="text-[9px] text-slate-500 font-medium">{r.label}</p>
          <p className={`text-[10px] font-bold ${r.color}`}>{r.value}</p>
        </div>
      ))}
    </div>
  </div>
);

const RatingsContent = () => {
  const avg = (mockRatings.reduce((a,r)=>a+r.rating,0)/mockRatings.length).toFixed(1);
  return (
    <div className="space-y-3">
      <div className="bg-[#0B1F3A] rounded-2xl p-4 flex items-center gap-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-white">{avg}</p>
          <div className="flex gap-0.5 mt-1 justify-center">
            {[1,2,3,4,5].map(s=>(
              <Star key={s} size={10} className={s<=Math.round(avg)?'text-amber-400 fill-amber-400':'text-white/20'}/>
            ))}
          </div>
          <p className="text-white/40 text-[8px] mt-1">{mockRatings.length} reviews</p>
        </div>
        <div className="flex-1 space-y-1">
          {[5,4,3,2,1].map(star=>{
            const count=mockRatings.filter(r=>r.rating===star).length;
            const pct=Math.round((count/mockRatings.length)*100);
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-[8px] text-white/50 w-3">{star}</span>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{width:`${pct}%`}}/>
                </div>
                <span className="text-[8px] text-white/40 w-5">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="space-y-2">
        {mockRatings.map((r,i)=>(
          <div key={i} className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
            <div className="flex items-start justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
                  <User size={12} className="text-slate-400"/>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0B1F3A] leading-none">{r.customer}</p>
                  <p className="text-[8px] text-slate-400">{r.service}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s=>(
                  <Star key={s} size={9} className={s<=r.rating?'text-amber-400 fill-amber-400':'text-slate-200'}/>
                ))}
              </div>
            </div>
            <p className="text-[10px] text-slate-600 leading-relaxed">{r.comment}</p>
            <p className="text-[8px] text-slate-400 mt-1">{r.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const DocumentsContent = () => {
  const ref=useRef(); const [file,setFile]=useState(null);
  return (
    <div className="space-y-2">
      {[
        {label:'Government ID',status:'Verified',color:'text-emerald-600 bg-emerald-50'},
        {label:'Shop License',status:'Verified',color:'text-emerald-600 bg-emerald-50'},
        {label:'GST Certificate',status:'Pending',color:'text-amber-600 bg-amber-50'},
      ].map((doc,i)=>(
        <div key={i} className="bg-white rounded-xl border border-slate-100 shadow-sm px-3 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
              <FileText size={14} className="text-slate-400"/>
            </div>
            <p className="text-xs font-bold text-[#0B1F3A]">{doc.label}</p>
          </div>
          <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${doc.color}`}>{doc.status}</span>
        </div>
      ))}
      <input type="file" ref={ref} accept="image/*,.pdf" className="hidden" onChange={e=>setFile(e.target.files[0])}/>
      <button onClick={()=>ref.current.click()}
        className={`w-full flex items-center gap-2 p-3 rounded-xl border-2 border-dashed transition-all ${file?'border-emerald-400 bg-emerald-50':'border-slate-200 bg-slate-50'}`}>
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${file?'bg-emerald-100':'bg-white border border-slate-200'}`}>
          {file?<CheckCircle2 size={14} className="text-emerald-500"/>:<Upload size={13} className="text-slate-400"/>}
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-[#0B1F3A]">{file?file.name:'Upload New Document'}</p>
          <p className="text-[9px] text-slate-400">JPG, PNG, PDF supported</p>
        </div>
      </button>
    </div>
  );
};

const SettingsContent = ({ name }) => (
  <div className="space-y-3">
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3">
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Profile</p>
      {[{label:'Name',value:name},{label:'Phone',value:'+91 98765 43210'},{label:'Workshop',value:'Auto Care Center'},{label:'City',value:'Bangalore'}].map((f,i)=>(
        <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
          <p className="text-[9px] text-slate-400 font-medium">{f.label}</p>
          <p className="text-xs font-semibold text-[#0B1F3A]">{f.value}</p>
        </div>
      ))}
    </div>
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3">
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Notifications</p>
      {['New Job Requests','Job Reminders','Payment Alerts','Rating Alerts'].map((item,i)=>(
        <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
          <p className="text-xs font-semibold text-[#0B1F3A]">{item}</p>
          <ToggleRight size={20} className="text-emerald-500"/>
        </div>
      ))}
    </div>
  </div>
);

/* ─── NAV CONFIG ─── */
const NAV_ITEMS = [
  { key:'dashboard', icon:Home,         label:'Dashboard' },
  { key:'services',  icon:Wrench,       label:'My Services' },
  { key:'jobs',      icon:Package,      label:'Job Requests' },
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
  onSaveHour }) => {

  const [editSv,setEditSv]=useState(null);
  const [addSv,setAddSv]=useState(false);
  const [editHr,setEditHr]=useState(null);

  const renderContent = () => {
    switch(activePage) {
      case 'jobs':      return <JobsContent requests={requests} onAction={onJobAction} onStatusChange={onStatusChange}/>;
      case 'services':  return <ServicesContent services={services} onAdd={()=>setAddSv(true)} onEdit={setEditSv} onToggle={onToggleService} onDelete={onDeleteService}/>;
      case 'hours':     return <HoursContent hours={hours} onEdit={setEditHr}/>;
      case 'earnings':  return <EarningsContent/>;
      case 'ratings':   return <RatingsContent/>;
      case 'documents': return <DocumentsContent/>;
      case 'settings':  return <SettingsContent name={name}/>;
      default:          return <DashboardHome name={name} onNavigate={onNavigate}/>;
    }
  };

  const pageTitle = NAV_ITEMS.find(n=>n.key===activePage)?.label || 'Dashboard';

  return (
    <motion.div initial={{x:'-100%'}} animate={{x:0}} exit={{x:'-100%'}}
      transition={{type:'tween',duration:0.28}} className="fixed inset-0 z-50 flex">

      <div className="w-[80%] max-w-[300px] bg-white h-full flex flex-col shadow-2xl">

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

        {/* ── Header ── */}
        <div className="bg-[#0B1F3A] px-4 pt-6 pb-3 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CliqLogo size={24}/>
              <div className="flex items-baseline font-black text-sm leading-none">
                <span className="text-[#4A9EFF]">Cliq</span>
                <span className="text-[#FF6B00]">Garage</span>
              </div>
            </div>
            <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
              <X size={14} className="text-white"/>
            </button>
          </div>
          {/* Profile card */}
          <div className="bg-white/10 rounded-2xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FF6B00]/30 flex items-center justify-center shrink-0">
              <User size={18} className="text-white"/>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-bold leading-none truncate">{name}</p>
              <p className="text-white/50 text-[9px] mt-0.5">Verified Partner</p>
            </div>
            <div className="flex items-center gap-0.5 bg-white/10 px-2 py-1 rounded-lg shrink-0">
              <Star size={9} className="text-amber-400 fill-amber-400"/>
              <span className="text-white text-[10px] font-bold">4.9</span>
            </div>
          </div>
        </div>

        {/* ── Nav list ── */}
        <div className="flex-1 overflow-y-auto">
          {/* Nav items */}
          <div className="px-3 py-2 space-y-0.5">
            {NAV_ITEMS.map((item,i)=>(
              <button key={i} onClick={()=>{ onNavigate(item.key); onClose(); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  activePage===item.key
                    ?'bg-[#0B1F3A] text-white shadow-md'
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

        {/* ── Sign out ── */}
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
  {key:'jobs',     label:'Jobs',     icon:Package},
  {key:'services', label:'Services', icon:Wrench},
  {key:'hours',    label:'Hours',    icon:Clock},
  {key:'earnings', label:'Earnings', icon:BarChart2},
];

/* ─── MAIN DASHBOARD ─── */
const MechanicDashboard = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const mechanicName = state?.name || 'Partner';

  const [sidebarOpen,setSidebarOpen]=useState(false);
  const [sidebarPage,setSidebarPage]=useState('dashboard');
  const [isOnline,setIsOnline]=useState(true);
  const [activeTab,setActiveTab]=useState('jobs');

  const [requests,setRequests]=useState(initRequests);
  const [services,setServices]=useState(initServices);
  const [hours,setHours]=useState(initHours);
  const [editService,setEditService]=useState(null);
  const [showAddService,setShowAddService]=useState(false);
  const [editHour,setEditHour]=useState(null);

  const handleJobAction=(id,action)=>setRequests(r=>r.map(req=>req.id===id?{...req,status:action}:req));
  const handleStatusChange=(id,status)=>setRequests(r=>r.map(req=>req.id===id?{...req,status}:req));
  const handleSaveService=(form,orig)=>{
    if(orig) setServices(s=>s.map(sv=>sv.id===orig.id?{...sv,...form}:sv));
    else setServices(s=>[...s,{...form,id:Date.now()}]);
  };
  const handleSaveHour=(form)=>setHours(h=>h.map(d=>d.day===form.day?form:d));
  const toggleService=(id)=>setServices(s=>s.map(sv=>sv.id===id?{...sv,active:!sv.active}:sv));
  const deleteService=(id)=>setServices(s=>s.filter(sv=>sv.id!==id));

  const openSidebar=(page='dashboard')=>{setSidebarPage(page);setSidebarOpen(true);};

  return (
    <div className="h-screen bg-[#F4F6FB] flex flex-col overflow-hidden font-['Inter',sans-serif]">

      <AnimatePresence>
        {sidebarOpen&&(
          <Sidebar name={mechanicName} activePage={activeTab} onNavigate={p=>{setActiveTab(p);setSidebarOpen(false);}} onClose={()=>setSidebarOpen(false)}
            onSignOut={()=>{ setSidebarOpen(false); navigate('/mechanic/login', { replace: true }); }}
            requests={requests} services={services} hours={hours}
            onJobAction={handleJobAction} onStatusChange={handleStatusChange}
            onSaveService={handleSaveService} onToggleService={toggleService} onDeleteService={deleteService}
            onSaveHour={handleSaveHour}/>
        )}
        {(showAddService||editService)&&(
          <ServiceModal service={editService}
            onSave={f=>handleSaveService(f,editService)}
            onClose={()=>{setShowAddService(false);setEditService(null);}}/>
        )}
        {editHour&&<HoursModal slot={editHour} onSave={handleSaveHour} onClose={()=>setEditHour(null)}/>}
      </AnimatePresence>

      {/* NAVBAR */}
      <div className="bg-[#0B1F3A] px-4 pt-6 pb-3 shrink-0 flex items-center justify-between">
        <button onClick={()=>openSidebar()} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
          <Menu size={15} className="text-white"/>
        </button>
        <div className="flex items-center gap-2">
          <CliqLogo size={26}/>
          <div className="flex items-baseline font-black tracking-tight text-base leading-none">
            <span className="text-[#4A9EFF]">Cliq</span>
            <span className="text-[#FF6B00]">Garage</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center relative">
            <Bell size={13} className="text-white/70"/>
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#FF6B00] rounded-full"/>
          </button>
          <button onClick={()=>setIsOnline(v=>!v)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[8px] font-bold uppercase tracking-wider transition-all border ${
              isOnline?'bg-emerald-500/20 text-emerald-400 border-emerald-500/30':'bg-white/10 text-white/40 border-white/10'}`}>
            <Power size={8}/> {isOnline?'Online':'Offline'}
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="bg-[#0B1F3A] px-4 pb-3 shrink-0">
        <div className="bg-white/8 border border-white/10 rounded-xl p-3 relative overflow-hidden">
          <div className="absolute -top-3 -right-3 w-14 h-14 bg-[#FF6B00]/20 rounded-full blur-xl"/>
          <div className="flex items-start justify-between mb-2 relative z-10">
            <div>
              <p className="text-white/50 text-[8px] font-semibold uppercase tracking-widest">Hey, {mechanicName} 👋</p>
              <h2 className="text-lg font-bold text-white mt-0.5">₹14,200 <span className="text-[9px] text-emerald-400">+12%</span></h2>
              <p className="text-white/40 text-[7px]">Today's earnings</p>
            </div>
            <button onClick={()=>setActiveTab('ratings')} className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg">
              <Star size={9} className="text-amber-400 fill-amber-400"/>
              <span className="text-white font-bold text-xs">4.9</span>
            </button>
          </div>
          <div className="grid grid-cols-3 gap-1.5 relative z-10">
            {[{l:'Done',v:'28'},{l:'Pending',v:'3'},{l:'Cancelled',v:'1'}].map((s,i)=>(
              <div key={i} className="bg-white/8 border border-white/10 rounded-lg p-1.5 text-center">
                <p className="text-white font-bold text-xs">{s.v}</p>
                <p className="text-white/40 text-[7px] mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="bg-white px-4 pt-1.5 pb-0 shrink-0 border-b border-slate-100">
        <div className="flex gap-0.5">
          {TABS.map(({key,label,icon:Icon})=>(
            <button key={key} onClick={()=>setActiveTab(key)}
              className={`flex items-center gap-1 px-3 py-1.5 text-[9px] font-semibold whitespace-nowrap transition-all border-b-2 ${
                activeTab===key?'text-[#0B1F3A] border-[#FF6B00]':'text-slate-400 border-transparent'}`}>
              <Icon size={10}/> {label}
            </button>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto px-4 py-2.5 space-y-2 pb-24">
        {activeTab==='dashboard'&&<DashboardHome name={mechanicName} onNavigate={tab=>{setActiveTab(tab);}}/>}
        {activeTab==='jobs'&&<JobsContent requests={requests} onAction={handleJobAction} onStatusChange={handleStatusChange}/>}
        {activeTab==='services'&&<ServicesContent services={services} onAdd={()=>setShowAddService(true)} onEdit={setEditService} onToggle={toggleService} onDelete={deleteService}/>}
        {activeTab==='hours'&&<HoursContent hours={hours} onEdit={setEditHour}/>}
        {activeTab==='earnings'&&<EarningsContent/>}
        {activeTab==='ratings'&&<RatingsContent/>}
        {activeTab==='documents'&&<DocumentsContent/>}
        {activeTab==='settings'&&<SettingsContent name={mechanicName}/>}
      </div>

      {/* BOTTOM NAV */}
      <MechanicBottomNav activeTab={activeTab} onNavigate={setActiveTab} />
    </div>
  );
};

export default MechanicDashboard;
