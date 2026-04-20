import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import mercedesCar from '../../assets/Bright_Yellow_Mercedes_Car_Wallpaper_For_iPhone_And_Android__Sporty_Luxury_Aesthetic_Style-removebg-preview.png';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [registerData, setRegisterData] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  const handleSendOTP = (e) => {
    e.preventDefault();
    const currentPhone = isLogin ? phone : registerData.phone;
    if (!currentPhone || currentPhone.length < 10) {
      setError('Please enter a valid mobile number');
      return;
    }
    setError('');
    navigate('/otp', { state: { phone: currentPhone, isRegistering: !isLogin } });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Roboto'] overflow-x-hidden relative">
      <motion.div
        animate={{ x: isLogin ? '0%' : '-50%' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex w-[200%] min-h-screen"
      >
        {/* LOGIN PAGE */}
        <div className="w-1/2 h-full flex flex-col items-center">
          {/* Top Section */}
          <div className="relative w-full h-[32vh] flex flex-col items-center justify-center pt-0 shrink-0">
            <div className="absolute top-0 w-[240%] h-[380px] bg-[#0F172A] rounded-b-[100%] -translate-y-[60%] left-[-70%] pointer-events-none" />
            <motion.div 
              initial={{ y: 30, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-[90%] max-w-[340px] flex justify-center -mt-8"
            >
              <img src={mercedesCar} alt="Mustard Mercedes" className="w-full h-auto drop-shadow-[0_30px_30px_rgba(0,0,0,0.3)] pointer-events-none" />
            </motion.div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isLogin ? "visible" : "hidden"}
            className="w-full flex-grow flex flex-col items-center px-8 mt-12 pb-6 relative z-20"
          >
            <motion.div variants={itemVariants} className="text-center mb-6">
              <h1 className="text-[20px] font-normal text-slate-800 tracking-tight whitespace-nowrap">
                Welcome to <span className="text-[#0F172A] font-black uppercase tracking-tight italic">CLIQ</span>
                <span className="text-[#D4A017] font-black uppercase tracking-tight italic text-[22px]">GARAGE</span>
              </h1>
            </motion.div>

            <form onSubmit={handleSendOTP} className="w-full max-w-sm flex flex-col items-center gap-4">
              <motion.div variants={itemVariants} className="w-full relative flex items-center bg-[#F8FAFC] border border-slate-200 rounded-full px-5 h-12 shadow-sm focus-within:border-[#D4A017]/50 focus-within:ring-4 focus-within:ring-[#D4A017]/5 transition-all duration-300">
                <div className="flex items-center gap-1.5 text-slate-700 font-bold border-r border-slate-200 pr-3 mr-3">
                  <span className="text-[9px] text-[#D4A017]">▼</span>
                  <span className="text-sm">+91</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="00000 00000"
                  className="flex-1 bg-transparent text-[#0F172A] text-xs font-bold outline-none placeholder:text-slate-300"
                />
              </motion.div>

              {error && isLogin && (
                <p className="text-[#EF4444] text-[10px] mt-2 font-black uppercase tracking-wider">{error}</p>
              )}

              <motion.button 
                variants={itemVariants}
                type="submit"
                disabled={phone.length !== 10}
                className={`w-full mt-2 h-12 rounded-full font-black text-base transition-all duration-500 flex items-center justify-center gap-2 relative overflow-hidden group ${
                  phone.length === 10 ? 'bg-[#0F172A] text-white shadow-xl shadow-[#0F172A]/20' : 'bg-[#0F172A]/5 text-slate-400 border border-slate-200'
                }`}
              >
                <span className="relative z-10 tracking-[0.1em] uppercase text-xs">Explore CLIQGARAGE</span>
                <div className="absolute inset-0 bg-[#D4A017] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.button>

              <motion.div variants={itemVariants} className="mt-4 flex flex-col items-center gap-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">New user?</p>
                <button type="button" onClick={() => navigate('/register')} className="text-[11px] font-black text-[#0F172A] uppercase tracking-[0.2em] border-b-2 border-[#D4A017] pb-0.5">
                  Create Account
                </button>
              </motion.div>

              <div className="mt-8 text-center text-[8px] text-slate-400 font-black uppercase tracking-[0.2em] leading-loose">
                By continuing you agree to the <br/>
                <span className="text-slate-500 border-b border-slate-100">Terms of Service</span> & <span className="text-slate-500 border-b border-slate-100">Privacy Policy</span>
              </div>
            </form>
          </motion.div>
        </div>

        {/* REGISTER PAGE */}
        <div className="w-1/2 h-full flex-shrink-0 flex flex-col items-center">
          {/* Top Section - Unified Design */}
          <div className="relative w-full h-[32vh] flex flex-col items-center justify-center pt-0 shrink-0">
            <div className="absolute top-0 w-[240%] h-[380px] bg-[#0F172A] rounded-b-[100%] -translate-y-[60%] left-[-70%] pointer-events-none" />
            <div className="relative z-10 w-[90%] max-w-[340px] flex justify-center -mt-8">
              <img src={mercedesCar} alt="Mustard Mercedes" className="w-full h-auto drop-shadow-[0_30px_30px_rgba(0,0,0,0.3)] pointer-events-none" />
            </div>
          </div>          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={!isLogin ? "visible" : "hidden"}
            className="w-full flex-grow flex flex-col items-center px-8 mt-12 pb-6 relative z-20"
          >
            <motion.div variants={itemVariants} className="text-center mb-6">
              <h1 className="text-[20px] font-normal text-slate-800 tracking-tight whitespace-nowrap">
                Join <span className="text-[#0F172A] font-black uppercase tracking-tight italic">CLIQ</span>
                <span className="text-[#D4A017] font-black uppercase tracking-tight italic text-[22px]">GARAGE</span>
              </h1>
            </motion.div>

            <form onSubmit={handleSendOTP} className="w-full max-w-sm flex flex-col items-center gap-2">
              <motion.div variants={itemVariants} className="w-full relative flex items-center bg-[#F8FAFC] border border-slate-200 rounded-full px-6 h-12 shadow-sm focus-within:border-[#D4A017]/50 focus-within:ring-4 focus-within:ring-[#D4A017]/5 transition-all duration-300">
                <input
                  type="text"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  placeholder="FULL NAME"
                  className="flex-1 bg-transparent text-[#0F172A] text-xs font-black uppercase tracking-widest outline-none placeholder:text-slate-400 text-left"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full relative flex items-center bg-[#F8FAFC] border border-slate-200 rounded-full px-6 h-12 shadow-sm focus-within:border-[#D4A017]/50 focus-within:ring-4 focus-within:ring-[#D4A017]/5 transition-all duration-300">
                <input
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  placeholder="EMAIL ADDRESS"
                  className="flex-1 bg-transparent text-[#0F172A] text-xs font-black uppercase tracking-widest outline-none placeholder:text-slate-400 text-left"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full relative flex items-center bg-[#F8FAFC] border border-slate-200 rounded-full px-5 h-12 shadow-sm focus-within:border-[#D4A017]/50 focus-within:ring-4 focus-within:ring-[#D4A017]/5 transition-all duration-300">
                <div className="flex items-center gap-1.5 text-slate-700 font-bold border-r border-slate-200 pr-3 mr-3">
                  <span className="text-[9px] text-[#D4A017]">▼</span>
                  <span className="text-sm">+91</span>
                </div>
                <input
                  type="tel"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  placeholder="PHONE NUMBER"
                  className="flex-1 bg-transparent text-[#0F172A] text-xs font-bold outline-none placeholder:text-slate-400 text-left"
                />
              </motion.div>

              {error && !isLogin && (
                <p className="text-[#EF4444] text-[10px] mt-0 font-black uppercase tracking-wider">{error}</p>
              )}

              <motion.button 
                variants={itemVariants}
                type="submit"
                disabled={!registerData.name || !registerData.email || registerData.phone.length !== 10}
                className={`w-full mt-2 h-12 rounded-full font-black text-base transition-all duration-500 flex items-center justify-center gap-2 relative overflow-hidden group ${
                  (registerData.name && registerData.email && registerData.phone.length === 10)
                  ? 'bg-[#0F172A] text-white shadow-xl shadow-[#0F172A]/20' : 'bg-[#0F172A]/5 text-slate-400 border border-slate-200'
                }`}
              >
                <span className="relative z-10 tracking-[0.1em] uppercase text-xs">Register Now</span>
                <div className="absolute inset-0 bg-[#D4A017] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.button>

              <motion.div variants={itemVariants} className="mt-2 flex flex-col items-center gap-0.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Already a member?</p>
                <button type="button" onClick={() => navigate('/login')} className="text-[11px] font-black text-[#0F172A] uppercase tracking-[0.2em] border-b-2 border-[#D4A017] pb-0.5">
                  Sign In Instead
                </button>
              </motion.div>

              <div className="mt-4 text-center text-[8px] text-slate-400 font-black uppercase tracking-[0.2em] leading-loose">
                By continuing you agree to the <br/>
                <span className="text-slate-500 border-b border-slate-100">Terms of Service</span> & <span className="text-slate-500 border-b border-slate-100">Privacy Policy</span>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
