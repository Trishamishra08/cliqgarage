import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, ArrowLeft } from 'lucide-react';
import mechanicLogo from '../../assets/Screw_Driver_Spanner_And_Gear_Logo-removebg-preview.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

const MechanicOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { phone, isRegister, registerData } = location.state || {};
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setError('Enter valid 6-digit OTP');
      return;
    }

    // Mock OTP verification (replace with actual API call)
    if (otpValue === '123456') {
      if (isRegister) {
        navigate('/mechanic/setup', { 
          state: { 
            phone, 
            name: registerData?.name, 
            workshopName: registerData?.workshopName 
          } 
        });
      } else {
        navigate('/mechanic/dashboard');
      }
    } else {
      setError('Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
    }
  };

  const handleResendOTP = () => {
    setTimer(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
    // Call resend OTP API here
  };

  if (!phone) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-500">Invalid access. Please login again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Roboto'] flex flex-col">
      {/* Header */}
      <div className="relative w-full bg-[#001F3D] shrink-0" style={{ height: '22vh', borderBottomLeftRadius: '50%', borderBottomRightRadius: '50%' }}>
        <button
          onClick={() => navigate('/mechanic/login')}
          className="absolute top-6 left-6 z-20 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
        >
          <ArrowLeft size={18} className="text-white" />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-30">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-36 h-36 rounded-full bg-white shadow-[0_8px_40px_rgba(0,31,61,0.2)] flex items-center justify-center border-4 border-white"
          >
            <img src={mechanicLogo} alt="CliqGarage" className="w-28 h-28 object-contain" />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col items-center pt-24 px-7 pb-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center max-w-sm"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.35em] mb-2">Verification</p>
            <h1 className="text-3xl font-black text-[#001F3D] tracking-tight uppercase italic leading-none mb-2">
              Enter OTP
            </h1>
            <p className="text-xs font-black text-[#D4A017] uppercase tracking-[0.3em]">Partner Terminal</p>
          </motion.div>

          {/* Phone Display */}
          <motion.div variants={itemVariants} className="mb-8 flex items-center gap-2 text-slate-600">
            <Phone size={16} />
            <span className="text-sm font-bold">+91 {phone}</span>
          </motion.div>

          {/* OTP Input */}
          <form onSubmit={handleVerifyOTP} className="w-full flex flex-col items-center gap-6">
            <motion.div variants={itemVariants} className="flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength="1"
                  className="w-9 h-9 text-center text-sm font-bold border-2 border-slate-200 rounded-md focus:border-[#D4A017] focus:outline-none bg-[#F8FAFC] text-[#001F3D] transition-all"
                />
              ))}
            </motion.div>

            {error && (
              <motion.p variants={itemVariants} className="text-[#EF4444] text-[8px] font-black uppercase tracking-widest">
                {error}
              </motion.p>
            )}

            {/* Timer */}
            <motion.div variants={itemVariants} className="text-center">
              {!canResend ? (
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Resend OTP in <span className="text-[#D4A017] font-black">{timer}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-[10px] font-black text-[#001F3D] uppercase tracking-[0.2em] border-b-2 border-[#D4A017] pb-0.5 hover:text-[#D4A017] transition-colors"
                >
                  Resend OTP
                </button>
              )}
            </motion.div>

            {/* Verify Button */}
            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={otp.join('').length !== 6}
              className={`w-full py-3.5 rounded-full font-black text-xs tracking-[0.2em] uppercase transition-all duration-300 relative overflow-hidden group ${
                otp.join('').length === 6 ? 'bg-[#001F3D] text-white shadow-md' : 'bg-slate-100 text-slate-300'
              }`}
            >
              <span className="relative z-10">Verify OTP</span>
              <div className="absolute inset-0 bg-[#D4A017] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default MechanicOTP;
