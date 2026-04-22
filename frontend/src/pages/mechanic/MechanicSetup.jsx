import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MapPin, Store, FileText, Upload, CheckCircle2,
  ChevronRight, ChevronLeft, Clock, Shield, X
} from 'lucide-react';

const fade = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.25 } },
};

const MechanicSetup = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const mechanicName = state?.name || 'Partner';
  const workshopName = state?.workshopName || '';

  const [step, setStep] = useState(1); // 1: Shop Details, 2: Documents, 3: Pending Approval

  // Step 1 state
  const [shopData, setShopData] = useState({
    address: '',
    city: '',
    pincode: '',
    experience: '',
    specialization: '',
  });

  // Step 2 state
  const [docs, setDocs] = useState({ id: null, license: null, gst: null });
  const idRef = useRef(); const licRef = useRef(); const gstRef = useRef();

  const handleFile = (key, file) => setDocs(d => ({ ...d, [key]: file }));

  const step1Valid = shopData.address && shopData.city && shopData.pincode && shopData.experience;
  const step2Valid = docs.id && docs.license;

  const specializations = ['Car Repair', 'Bike Repair', 'Tyre & Wheel', 'AC Service', 'Electrical', 'Denting & Painting'];

  return (
    <div className="min-h-screen bg-[#F4F6FB] font-['Inter',sans-serif] flex flex-col">

      {/* Top bar */}
      <div className="bg-[#0B1F3A] px-5 pt-10 pb-5 shrink-0">
        <div className="flex items-center gap-3 mb-4">
          {step > 1 && step < 3 && (
            <button onClick={() => setStep(s => s - 1)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <ChevronLeft size={16} className="text-white" />
            </button>
          )}
          <div>
            <p className="text-white/40 text-[9px] font-semibold uppercase tracking-widest">
              {step === 3 ? 'Submission Complete' : `Step ${step} of 2`}
            </p>
            <h1 className="text-white text-base font-bold">
              {step === 1 ? 'Shop Details' : step === 2 ? 'Upload Documents' : 'Under Review'}
            </h1>
          </div>
        </div>

        {/* Progress bar */}
        {step < 3 && (
          <div className="flex gap-2">
            {[1, 2].map(i => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-[#FF6B00]' : 'bg-white/15'}`} />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <AnimatePresence mode="wait">

          {/* ── STEP 1: Shop Details ── */}
          {step === 1 && (
            <motion.div key="s1" variants={fade} initial="hidden" animate="visible" exit="exit" className="space-y-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Workshop Info</p>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500 mb-1 block">Workshop Name</label>
                    <input
                      value={workshopName}
                      readOnly
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-slate-500 mb-1 block">Full Address</label>
                    <input
                      value={shopData.address}
                      onChange={e => setShopData(d => ({ ...d, address: e.target.value }))}
                      placeholder="Street, Area"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#0B1F3A] outline-none focus:border-[#FF6B00]/50 transition-all placeholder:text-slate-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-semibold text-slate-500 mb-1 block">City</label>
                      <input
                        value={shopData.city}
                        onChange={e => setShopData(d => ({ ...d, city: e.target.value }))}
                        placeholder="City"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#0B1F3A] outline-none focus:border-[#FF6B00]/50 transition-all placeholder:text-slate-300"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-500 mb-1 block">Pincode</label>
                      <input
                        value={shopData.pincode}
                        onChange={e => setShopData(d => ({ ...d, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }))}
                        placeholder="000000"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#0B1F3A] outline-none focus:border-[#FF6B00]/50 transition-all placeholder:text-slate-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-slate-500 mb-1 block">Years of Experience</label>
                    <input
                      value={shopData.experience}
                      onChange={e => setShopData(d => ({ ...d, experience: e.target.value.replace(/\D/g, '').slice(0, 2) }))}
                      placeholder="e.g. 5"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#0B1F3A] outline-none focus:border-[#FF6B00]/50 transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Specialization</p>
                <div className="flex flex-wrap gap-2">
                  {specializations.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setShopData(d => ({ ...d, specialization: s }))}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-semibold border transition-all ${
                        shopData.specialization === s
                          ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                          : 'bg-slate-50 text-slate-500 border-slate-200'
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
                className={`w-full py-3.5 rounded-2xl text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition-all ${
                  step1Valid ? 'bg-[#0B1F3A] text-white shadow-md active:scale-95' : 'bg-slate-100 text-slate-300'
                }`}
              >
                Continue <ChevronRight size={16} />
              </button>
            </motion.div>
          )}

          {/* ── STEP 2: Documents ── */}
          {step === 2 && (
            <motion.div key="s2" variants={fade} initial="hidden" animate="visible" exit="exit" className="space-y-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Required Documents</p>
                <p className="text-[10px] text-slate-400 mb-4">Upload clear photos or scanned copies</p>

                {[
                  { key: 'id', label: 'Government ID', sub: 'Aadhaar / PAN / Passport', ref: idRef, required: true },
                  { key: 'license', label: 'Shop License', sub: 'Trade / Municipal license', ref: licRef, required: true },
                  { key: 'gst', label: 'GST Certificate', sub: 'Optional but recommended', ref: gstRef, required: false },
                ].map(({ key, label, sub, ref, required }) => (
                  <div key={key} className="mb-3">
                    <input type="file" ref={ref} accept="image/*,.pdf" className="hidden" onChange={e => handleFile(key, e.target.files[0])} />
                    <button
                      type="button"
                      onClick={() => ref.current.click()}
                      className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 border-dashed transition-all ${
                        docs[key] ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:border-[#FF6B00]/40'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${docs[key] ? 'bg-emerald-100' : 'bg-white border border-slate-200'}`}>
                        {docs[key] ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Upload size={16} className="text-slate-400" />}
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-xs font-bold text-[#0B1F3A]">
                          {label} {required && <span className="text-red-400">*</span>}
                        </p>
                        <p className="text-[10px] text-slate-400">{docs[key] ? docs[key].name : sub}</p>
                      </div>
                      {docs[key] && (
                        <button type="button" onClick={e => { e.stopPropagation(); setDocs(d => ({ ...d, [key]: null })); }}>
                          <X size={14} className="text-slate-400" />
                        </button>
                      )}
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex gap-2">
                <Shield size={14} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-amber-700 font-medium">Your documents are encrypted and only used for verification purposes.</p>
              </div>

              <button
                onClick={() => step2Valid && setStep(3)}
                disabled={!step2Valid}
                className={`w-full py-3.5 rounded-2xl text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition-all ${
                  step2Valid ? 'bg-[#FF6B00] text-white shadow-md shadow-[#FF6B00]/30 active:scale-95' : 'bg-slate-100 text-slate-300'
                }`}
              >
                Submit for Review <ChevronRight size={16} />
              </button>
            </motion.div>
          )}

          {/* ── STEP 3: Pending Approval ── */}
          {step === 3 && (
            <motion.div key="s3" variants={fade} initial="hidden" animate="visible" className="flex flex-col items-center text-center pt-6 space-y-5">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.1 }}
                className="w-24 h-24 rounded-full bg-amber-50 flex items-center justify-center ring-8 ring-amber-100"
              >
                <Clock size={40} className="text-amber-500" />
              </motion.div>

              <div>
                <h2 className="text-xl font-bold text-[#0B1F3A] mb-1">Under Review</h2>
                <p className="text-sm text-slate-500">
                  Hey <span className="font-bold text-[#0B1F3A]">{mechanicName}</span>, your application has been submitted successfully.
                </p>
              </div>

              <div className="w-full bg-white rounded-2xl p-4 border border-slate-100 shadow-sm text-left space-y-3">
                {[
                  { label: 'Documents Submitted', status: 'Done', color: 'text-emerald-500 bg-emerald-50' },
                  { label: 'Admin Verification', status: 'In Progress', color: 'text-amber-500 bg-amber-50' },
                  { label: 'Account Activation', status: 'Pending', color: 'text-slate-400 bg-slate-50' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-600">{item.label}</p>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${item.color}`}>{item.status}</span>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-slate-400">Approval usually takes 24–48 hours. You'll be notified via SMS.</p>

              <button
                onClick={() => navigate('/mechanic/dashboard', { state: { name: mechanicName } })}
                className="w-full py-3.5 bg-[#0B1F3A] text-white rounded-2xl text-sm font-bold tracking-wide active:scale-95 transition-all shadow-md"
              >
                Go to Dashboard
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default MechanicSetup;
