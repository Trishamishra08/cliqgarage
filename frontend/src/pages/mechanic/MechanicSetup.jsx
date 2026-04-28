import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MapPin, Store, FileText, Upload, CheckCircle2,
  ChevronRight, ChevronLeft, Clock, Shield, X, Bell, Activity
} from 'lucide-react';

/* ─── DATA ─── */
const specializations = ['Car Repair', 'Bike Repair', 'Tyre & Wheel', 'AC Service', 'Electrical', 'Denting & Painting'];

const fade = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

const MechanicSetup = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const mechanicName = state?.name || 'Partner';
  const workshopInit = state?.workshopName || 'Cliq Workshop';

  const [step, setStep] = useState(1);
  const [toast, setToast] = useState(null);
  const [shopData, setShopData] = useState({
    workshopName: workshopInit,
    address: '',
    city: '',
    pincode: '',
    experience: '',
    specialization: '',
  });

  const [docs, setDocs] = useState({ id: null, license: null, gst: null });
  const idRef = useRef(); const licRef = useRef(); const gstRef = useRef();

  const handleFile = (key, file) => setDocs(d => ({ ...d, [key]: file }));

  const showSuccessToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const step1Valid = shopData.address && shopData.city && shopData.pincode && shopData.experience && shopData.specialization;
  const step2Valid = docs.id && docs.license;

  const handleSubmit = () => {
    if (step2Valid) {
      showSuccessToast('Waiting for the admin approval');
      setTimeout(() => {
        setStep(3);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7E8] font-['Inter',sans-serif] flex flex-col overflow-x-hidden">
      
      {/* ── ULTRA MINIMAL STEP INDICATOR (No Blue, Very Clean) ── */}
      <div className="px-6 pt-10 pb-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-6 bg-[#D4E70D] rounded-full" />
          <div>
            <p className="text-[#1A1A1A] text-lg font-black uppercase tracking-tight leading-none">Step {step}</p>
            <p className="text-slate-400 text-[8px] font-black uppercase tracking-[0.2em] mt-0.5">of 03 Total</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`h-1 rounded-full transition-all duration-500 ${
                step === s ? 'w-8 bg-[#D4E70D]' : 
                step > s ? 'w-4 bg-[#10B981]' : 'w-4 bg-slate-200'
              }`} 
            />
          ))}
        </div>
      </div>

      {/* ── CONTENT BODY ── */}
      <div className="flex-1 px-5 py-2 space-y-6">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: SHOP DETAILS */}
          {step === 1 && (
            <motion.div key="s1" variants={fade} initial="hidden" animate="visible" exit="exit" className="space-y-6">
              
              <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white/60">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-9 h-9 rounded-xl bg-[#F5F7E8] flex items-center justify-center border border-[#D4E70D]/20">
                    <Store size={16} className="text-[#4D5D26]" />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-widest leading-none mb-1">Workshop Info</h3>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter">Enter your primary business details</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="relative">
                    <label className="absolute -top-2 left-4 bg-white px-2 text-[8px] font-black text-slate-400 uppercase tracking-widest z-10">Workshop Name</label>
                    <input
                      value={shopData.workshopName}
                      readOnly
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-[11px] font-bold text-slate-400 outline-none"
                    />
                  </div>

                  <div className="relative">
                    <label className="absolute -top-2 left-4 bg-white px-2 text-[8px] font-black text-slate-500 uppercase tracking-widest z-10">Full Address</label>
                    <input
                      value={shopData.address}
                      onChange={e => setShopData(d => ({ ...d, address: e.target.value }))}
                      placeholder="Street, Area, Building..."
                      className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-[12px] font-bold text-[#1A1A1A] outline-none focus:border-[#D4E70D] transition-all placeholder:text-slate-300 shadow-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="absolute -top-2 left-4 bg-white px-2 text-[8px] font-black text-slate-500 uppercase tracking-widest z-10">City</label>
                      <input
                        value={shopData.city}
                        onChange={e => setShopData(d => ({ ...d, city: e.target.value }))}
                        placeholder="City"
                        className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-[12px] font-bold text-[#1A1A1A] outline-none focus:border-[#D4E70D] transition-all placeholder:text-slate-300 shadow-sm"
                      />
                    </div>
                    <div className="relative">
                      <label className="absolute -top-2 left-4 bg-white px-2 text-[8px] font-black text-slate-500 uppercase tracking-widest z-10">Pincode</label>
                      <input
                        value={shopData.pincode}
                        onChange={e => setShopData(d => ({ ...d, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }))}
                        placeholder="000 000"
                        className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-[12px] font-bold text-[#1A1A1A] outline-none focus:border-[#D4E70D] transition-all placeholder:text-slate-300 shadow-sm text-center tracking-[0.2em]"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="absolute -top-2 left-4 bg-white px-2 text-[8px] font-black text-slate-500 uppercase tracking-widest z-10">Experience</label>
                    <div className="relative">
                      <input
                        value={shopData.experience}
                        onChange={e => setShopData(d => ({ ...d, experience: e.target.value.replace(/\D/g, '').slice(0, 2) }))}
                        placeholder="e.g. 05"
                        className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-[12px] font-bold text-[#1A1A1A] outline-none focus:border-[#D4E70D] transition-all placeholder:text-slate-300 shadow-sm pr-16"
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase">Years</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white/60">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-[#E6F4FF] flex items-center justify-center border border-[#1677FF]/10">
                    <CheckCircle2 size={16} className="text-[#1677FF]" />
                  </div>
                  <h3 className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-widest">Specialization</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {specializations.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setShopData(d => ({ ...d, specialization: s }))}
                      className={`px-5 py-3 rounded-xl text-[10px] font-bold border transition-all active:scale-95 ${
                        shopData.specialization === s
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-lg shadow-black/10'
                          : 'bg-white text-slate-500 border-slate-100 shadow-sm'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => step1Valid && setStep(2)}
                disabled={!step1Valid}
                className={`w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-4 transition-all shadow-xl ${
                  step1Valid 
                    ? 'bg-[#1A1A1A] text-white active:scale-95' 
                    : 'bg-slate-100 text-slate-300 border border-slate-50'
                }`}
              >
                Continue to Verification <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {/* STEP 2: DOCUMENTS */}
          {step === 2 && (
            <motion.div key="s2" variants={fade} initial="hidden" animate="visible" exit="exit" className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-white/60">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-9 h-9 rounded-xl bg-[#F9F0FF] flex items-center justify-center border border-[#722ED1]/10">
                    <FileText size={16} className="text-[#722ED1]" />
                  </div>
                  <h3 className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-widest">Legal Documents</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'id', label: 'Government ID', sub: 'Aadhaar / PAN', ref: idRef, required: true },
                    { key: 'license', label: 'Shop License', sub: 'Trade License', ref: licRef, required: true },
                    { key: 'gst', label: 'GST (Optional)', sub: 'Certificate', ref: gstRef, required: false },
                  ].map(({ key, label, sub, ref, required }) => (
                    <div key={key} className="relative group">
                      <input type="file" ref={ref} accept="image/*,.pdf" className="hidden" onChange={e => handleFile(key, e.target.files[0])} />
                      <button
                        type="button"
                        onClick={() => ref.current.click()}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed transition-all active:scale-[0.98] ${
                          docs[key] 
                            ? 'border-[#10B981] bg-[#F6FFED]' 
                            : 'border-slate-100 bg-slate-50 hover:border-[#D4E70D]/40'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${docs[key] ? 'bg-[#10B981] text-white' : 'bg-white text-slate-300'}`}>
                          {docs[key] ? <CheckCircle2 size={20} /> : <Upload size={18} />}
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <p className={`text-[11px] font-black uppercase tracking-tight ${docs[key] ? 'text-[#1A1A1A]' : 'text-slate-500'}`}>
                            {label} {required && <span className="text-red-400">*</span>}
                          </p>
                          <p className="text-[9px] text-slate-400 font-medium truncate mt-0.5">{docs[key] ? docs[key].name : sub}</p>
                        </div>
                        {docs[key] && (
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm" onClick={e => { e.stopPropagation(); setDocs(d => ({ ...d, [key]: null })); }}>
                            <X size={14} className="text-red-400" />
                          </div>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#FFFBE6] border border-[#FFE58F] rounded-2xl p-5 flex gap-4 shadow-sm">
                <Shield size={20} className="text-[#FADB14] shrink-0 mt-0.5" />
                <p className="text-[10px] text-[#1A1A1A] font-bold leading-relaxed uppercase tracking-tight">ISO-certified data protection active. Your files are encrypted.</p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="w-20 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 active:scale-95 transition-all shadow-sm"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!step2Valid}
                  className={`flex-1 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-4 transition-all shadow-xl ${
                    step2Valid 
                      ? 'bg-[#1A1A1A] text-white active:scale-95' 
                      : 'bg-slate-100 text-slate-300 border border-slate-50'
                  }`}
                >
                  Finalize Review <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PENDING APPROVAL */}
          {step === 3 && (
            <motion.div key="s3" variants={fade} initial="hidden" animate="visible" className="flex flex-col items-center text-center pt-6 space-y-8">
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-32 h-32 rounded-[2.5rem] bg-white flex items-center justify-center shadow-2xl relative z-10 ring-12 ring-white/20"
                >
                  <div className="w-20 h-20 rounded-[1.8rem] bg-gradient-to-br from-[#D4E70D] to-[#A8B80A] flex items-center justify-center shadow-lg">
                    <Clock size={40} className="text-[#1A1A1A]" />
                  </div>
                </motion.div>
              </div>

              <div>
                <h2 className="text-2xl font-black text-[#1A1A1A] mb-2 uppercase tracking-tight">Review In Progress</h2>
                <p className="text-[11px] text-slate-400 font-bold leading-relaxed max-w-[80%] mx-auto uppercase tracking-tighter">
                  Hey <span className="text-[#1A1A1A] font-black">{mechanicName}</span>, we are verifying your workshop profile.
                </p>
              </div>

              <div className="w-full bg-white rounded-3xl p-8 border border-white shadow-xl text-left space-y-6">
                {[
                  { label: 'Documents Submitted', status: 'COMPLETED', color: 'text-[#10B981] bg-[#F6FFED]' },
                  { label: 'Admin Verification', status: 'PROCESSING', color: 'text-[#1677FF] bg-[#E6F4FF]' },
                  { label: 'Account Activation', status: 'PENDING', color: 'text-slate-300 bg-slate-50' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <p className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-tight">{item.label}</p>
                    <span className={`text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${item.color}`}>{item.status}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#1A1A1A] rounded-2xl p-4 w-full flex items-center gap-4 shadow-xl">
                <Bell size={18} className="text-[#D4E70D]" />
                <p className="text-white/80 text-[10px] font-bold uppercase tracking-tight">SMS Alert active. We'll ping you in 24h.</p>
              </div>

              <button
                onClick={() => navigate('/mechanic/dashboard', { state: { name: mechanicName } })}
                className="w-full py-5 bg-white text-[#1A1A1A] border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] active:scale-95 transition-all shadow-md"
              >
                Dashboard Preview
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* CUSTOM SUCCESS TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[500] px-0"
          >
            <div className="bg-[#10B981] text-white py-6 px-8 shadow-2xl flex items-center justify-between border-b-4 border-[#059669]">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-none bg-white/20 flex items-center justify-center border border-white/30">
                  <CheckCircle2 size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] leading-none mb-2 opacity-80">Notification</p>
                  <p className="text-sm font-black uppercase tracking-widest leading-tight">{toast}</p>
                </div>
              </div>
              <button onClick={() => setToast(null)} className="w-10 h-10 rounded-none flex items-center justify-center hover:bg-black/10 transition-colors">
                <X size={22} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default MechanicSetup;
