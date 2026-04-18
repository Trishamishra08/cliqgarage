import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, Delete } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const OTP = () => {
  const [otp, setOtp] = useState([]);
  const [counter, setCounter] = useState(110); // 01:50 formatted
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone || '9887 654 321';

  // Timer logic
  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleKeyPress = (num) => {
    if (otp.length < 4) {
      const newOtp = [...otp, num];
      setOtp(newOtp);
      if (newOtp.length === 4) {
        // Auto-verify simulation
        setTimeout(() => navigate('/setup-profile'), 500);
      }
    }
  };

  const handleDelete = () => {
    setOtp(otp.slice(0, -1));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-['Roboto'] overflow-hidden overflow-y-hidden">
      {/* Header - More Compact */}
      <div className="w-full px-6 pt-8 flex items-center">
        <button onClick={() => navigate(-1)} className="text-[#0F172A] active:scale-95 transition-transform">
          <ArrowLeft size={24} />
        </button>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex-grow flex flex-col items-center px-6"
      >
        {/* Top Icon Circle - Smaller & Closer */}
        <motion.div variants={itemVariants} className="mt-2">
          <div className="w-24 h-24 bg-[#0F172A] rounded-full flex items-center justify-center shadow-xl shadow-slate-100">
            <Mail size={40} className="text-[#10B981]" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Title Section - Tight Spacing */}
        <motion.div variants={itemVariants} className="mt-6 text-center">
          <h1 className="text-xl text-slate-800">
            Verification <span className="font-black">Code</span>
          </h1>
          <p className="mt-2 text-slate-400 text-[10px] font-semibold leading-normal max-w-[180px] mx-auto">
            Please type the verification code sent to <br/>
            <span className="text-slate-800 font-bold tracking-tight">+91 {phone}</span>
          </p>
        </motion.div>

        {/* OTP Circles - Compact Gap */}
        <motion.div variants={itemVariants} className="mt-8 flex gap-3">
          {[0, 1, 2, 3].map((index) => (
            <div 
              key={index}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                otp.length === index 
                ? 'border-[#10B981] ring-4 ring-[#10B981]/5 bg-white' 
                : otp[index] !== undefined 
                  ? 'border-slate-100 bg-slate-50' 
                  : 'border-slate-100 bg-white'
              }`}
            >
              {otp[index] !== undefined && (
                <span className="text-lg font-black text-[#0F172A]">{otp[index]}</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Timer - Tight position */}
        <motion.div variants={itemVariants} className="mt-4">
          <p className="text-slate-400 font-bold text-xs tracking-widest">
            {formatTime(counter)}
          </p>
        </motion.div>

        {/* Custom Dialpad - Compact Grid and Higher position */}
        <motion.div 
          variants={itemVariants} 
          className="mt-6 w-full pb-6 grid grid-cols-3 gap-y-2 gap-x-8 max-w-[240px]"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num)}
              className="h-10 text-xl font-normal text-slate-800 active:bg-slate-50 rounded-full transition-colors"
            >
              {num}
            </button>
          ))}
          <div /> 
          <button
            onClick={() => handleKeyPress(0)}
            className="h-10 text-xl font-normal text-slate-800 active:bg-slate-50 rounded-full transition-colors"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="h-10 flex items-center justify-center text-slate-800 active:bg-slate-50 rounded-full transition-colors"
          >
            <div className="w-7 h-7 bg-[#0F172A] rounded-full flex items-center justify-center">
              <ArrowLeft size={14} className="text-white" />
            </div>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OTP;
