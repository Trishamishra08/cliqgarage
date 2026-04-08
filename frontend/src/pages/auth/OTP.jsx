import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, RefreshCcw } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../components/common/Logo';

const OTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [counter, setCounter] = useState(30);
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone || '9887 654 321';
  const inputRefs = useRef([]);

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.join('').length < 6) return;
    // Mock Verify and go to Setup Profile as requested
    navigate('/setup-profile');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 pt-12">
      <button 
        onClick={() => navigate(-1)}
        className="w-10 h-10 flex items-center justify-center text-slate-400 mb-6 active:scale-90"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="flex justify-center mb-12">
        <Logo className="scale-125" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-grow flex flex-col"
      >
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black text-blue-950 tracking-tight leading-tight mb-2">
            Verify <span className="text-orange-500 underline decoration-4 underline-offset-4">Identity</span>
          </h1>
          <p className="text-slate-500 font-medium">OTP sent to +91 {phone}</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-10">
          <div className="flex justify-between gap-1">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="tel"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-16 bg-slate-50 border-b-2 border-slate-200 text-2xl font-black text-blue-950 text-center focus:border-blue-950 focus:bg-white outline-none transition-all"
              />
            ))}
          </div>

          <div className="text-center">
            {counter > 0 ? (
               <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Resend OTP in <span className="text-blue-900">{counter}s</span></p>
            ) : (
              <button 
                type="button"
                className="inline-flex items-center gap-2 text-blue-900 font-black text-xs uppercase tracking-widest hover:underline"
                onClick={() => setCounter(30)}
              >
                <RefreshCcw size={14} /> Resend OTP
              </button>
            )}
          </div>

          <div className="pt-4">
             <button 
               type="submit"
               className="w-full h-16 bg-blue-950 text-white rounded-2xl flex items-center justify-center gap-3 font-black text-lg shadow-xl shadow-blue-900/20 active:scale-95 transition-all group"
             >
               Verify OTP
               <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default OTP;
