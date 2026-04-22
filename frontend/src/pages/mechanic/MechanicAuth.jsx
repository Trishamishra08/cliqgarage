import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench, ShieldCheck, ArrowRight,
  Phone, CheckCircle2, User, XCircle, ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gearLogo from '../../assets/Screw_Driver_Spanner_And_Gear_Logo-removebg-preview.png';

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } }
};

const MechanicAuth = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleOtpChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 3) otpRefs[idx + 1].current?.focus();
  };

  const handleOtpKey = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) otpRefs[idx - 1].current?.focus();
  };

  return (
    <div className="min-h-screen bg-[#0A1628] flex flex-col items-center justify-center font-['Space_Grotesk'] px-6 py-10 relative overflow-hidden">

      {/* Background glow blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-64 h-64 bg-[#FF6B00]/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-60px] right-[-60px] w-56 h-56 bg-[#1E4DB7]/30 rounded-full blur-[100px]" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm bg-[#111C2E] rounded-[32px] shadow-[0_30px_80px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden"
      >
        {/* Header band */}
        <div className="bg-gradient-to-r from-[#FF6B00] to-[#1E4DB7] h-1.5 w-full" />

        <div className="px-8 pt-8 pb-10">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-24 h-24 mb-5">
              <div className="absolute inset-0 bg-[#FF6B00]/20 rounded-full blur-2xl animate-pulse" />
              <img
                src={gearLogo}
                alt="CliqGarage"
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_20px_rgba(255,107,0,0.5)]"
              />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              CLIQ<span className="text-[#FF6B00]">GARAGE</span>
            </h1>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.35em] mt-1">Partner Terminal</p>
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">

            {/* STEP 1 — Welcome */}
            {step === 1 && (
              <motion.div key="s1" variants={fade} initial="hidden" animate="visible" exit="exit">
                <div className="text-center mb-8">
                  <h2 className="text-xl font-black text-white mb-2">Welcome Back</h2>
                  <p className="text-white/40 text-xs">Sign in to your mechanic partner account</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setStep(2)}
                    className="w-full h-13 py-3.5 bg-gradient-to-r from-[#FF6B00] to-[#e05a00] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#FF6B00]/30 active:scale-95 transition-all"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-3.5 bg-white/5 border border-white/10 text-white/70 rounded-2xl font-black text-xs uppercase tracking-[0.2em] active:scale-95 transition-all hover:bg-white/10"
                  >
                    New Registration
                  </button>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-[9px] text-white/20 uppercase tracking-widest font-bold">Authorized Partners Only</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
              </motion.div>
            )}

            {/* STEP 2 — Phone */}
            {step === 2 && (
              <motion.div key="s2" variants={fade} initial="hidden" animate="visible" exit="exit">
                <button onClick={() => setStep(1)} className="flex items-center gap-1 text-white/40 text-xs mb-6 hover:text-white/70 transition-colors">
                  <ChevronLeft size={14} /> Back
                </button>

                <div className="mb-7">
                  <h2 className="text-xl font-black text-white mb-1">Enter Phone</h2>
                  <p className="text-white/40 text-xs">We'll send an OTP to verify your number</p>
                </div>

                <div className="mb-5">
                  <div className="h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center px-4 focus-within:border-[#FF6B00]/60 transition-all">
                    <span className="text-white/40 text-sm font-bold mr-2">+91</span>
                    <div className="w-px h-5 bg-white/10 mr-3" />
                    <Phone size={14} className="text-white/30 mr-3" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="00000 00000"
                      className="flex-1 bg-transparent text-white text-sm font-bold outline-none placeholder:text-white/20"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep(3)}
                  disabled={phone.length !== 10}
                  className="w-full py-3.5 bg-gradient-to-r from-[#FF6B00] to-[#e05a00] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#FF6B00]/30 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Send OTP <ArrowRight size={14} />
                </button>
              </motion.div>
            )}

            {/* STEP 3 — OTP */}
            {step === 3 && (
              <motion.div key="s3" variants={fade} initial="hidden" animate="visible" exit="exit">
                <button onClick={() => setStep(2)} className="flex items-center gap-1 text-white/40 text-xs mb-6 hover:text-white/70 transition-colors">
                  <ChevronLeft size={14} /> Back
                </button>

                <div className="mb-7 text-center">
                  <h2 className="text-xl font-black text-white mb-1">Verify OTP</h2>
                  <p className="text-white/40 text-xs">Sent to +91 {phone.slice(0,5)} {phone.slice(5)}</p>
                </div>

                <div className="flex justify-center gap-3 mb-7">
                  {otp.map((val, i) => (
                    <input
                      key={i}
                      ref={otpRefs[i]}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={val}
                      onChange={(e) => handleOtpChange(e.target.value, i)}
                      onKeyDown={(e) => handleOtpKey(e, i)}
                      className="w-14 h-14 bg-white/5 border-2 border-white/10 rounded-2xl text-center text-xl font-black text-white outline-none focus:border-[#FF6B00] transition-all"
                    />
                  ))}
                </div>

                <button
                  onClick={() => setStep(4)}
                  disabled={otp.some(v => !v)}
                  className="w-full py-3.5 bg-gradient-to-r from-[#FF6B00] to-[#e05a00] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#FF6B00]/30 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Verify & Continue
                </button>

                <p className="text-center text-[10px] text-white/30 mt-4">
                  Didn't receive? <span className="text-[#FF6B00] font-bold cursor-pointer">Resend OTP</span>
                </p>
              </motion.div>
            )}

            {/* STEP 4 — Success */}
            {step === 4 && (
              <motion.div key="s4" variants={fade} initial="hidden" animate="visible" className="flex flex-col items-center text-center py-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 ring-8 ring-emerald-500/10"
                >
                  <CheckCircle2 size={44} className="text-emerald-400" strokeWidth={2.5} />
                </motion.div>

                <h2 className="text-2xl font-black text-white mb-2">Access Granted</h2>
                <p className="text-white/40 text-xs mb-8">Your partner account has been verified successfully.</p>

                <button
                  onClick={() => navigate('/mechanic/dashboard')}
                  className="w-full py-3.5 bg-gradient-to-r from-[#FF6B00] to-[#e05a00] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#FF6B00]/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  Go to Dashboard <ArrowRight size={14} />
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>

      {/* Footer */}
      <p className="mt-6 text-[9px] text-white/20 uppercase tracking-widest font-bold">
        © 2026 CliqGarage · Partner Protocol v2.5
      </p>
    </div>
  );
};

export default MechanicAuth;
