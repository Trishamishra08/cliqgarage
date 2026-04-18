import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import mercedesCar from '../../assets/Bright_Yellow_Mercedes_Car_Wallpaper_For_iPhone_And_Android__Sporty_Luxury_Aesthetic_Style-removebg-preview.png';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError('Please enter a valid mobile number');
      return;
    }
    setError('');
    navigate('/otp', { state: { phone } });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-['Roboto'] overflow-hidden">
      {/* Top Section - Tightly Grouped */}
      <div className="relative w-full h-[34vh] flex flex-col items-center justify-center pt-0">
        {/* Dark Semi-circle - Shifted Up significantly */}
        <div className="absolute top-0 w-[240%] h-[380px] bg-[#0F172A] rounded-b-[100%] -translate-y-[60%] left-[-70%]" />
        
        {/* Mustang Car Image - Compact fit */}
        <motion.div 
          initial={{ y: 30, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-[95%] max-w-[360px] flex justify-center -mt-10"
        >
          <img 
            src={mercedesCar}
            alt="Mustard Mercedes" 
            className="w-full h-auto drop-shadow-[0_30px_30px_rgba(0,0,0,0.3)]"
          />
        </motion.div>
      </div>

      {/* Main Content Area - Increased breathing room */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex-grow flex flex-col items-center mt-16 relative z-20"
      >
        {/* Welcome Text - Single Line Styling with more margin */}
        <motion.div variants={itemVariants} className="mt-8 text-center px-6">
          <h1 className="text-[24px] font-normal text-slate-800 tracking-tight whitespace-nowrap">
            Welcome to <span className="text-[#0F172A] font-black uppercase tracking-tight italic">CLIQ</span>
            <span className="text-[#D4A017] font-black uppercase tracking-tight italic text-[26px]">GARAGE</span>
          </h1>
        </motion.div>

        {/* Form Section - Interactive and Spaced */}
        <motion.form 
          onSubmit={handleSendOTP}
          variants={itemVariants}
          className="w-full px-8 mt-10 flex flex-col items-center max-w-sm relative z-30"
        >
          {/* Refined Compact Phone Input - Guaranteed Working */}
          <div className="w-full relative flex items-center bg-[#F8FAFC] border border-slate-200 rounded-full px-5 h-14 shadow-inner focus-within:ring-2 focus-within:ring-[#D4A017]/20 focus-within:border-[#D4A017] transition-all duration-300">
            <div className="flex items-center gap-1.5 text-slate-700 font-bold border-r border-slate-200 pr-3 mr-3 cursor-pointer">
              <span className="text-[9px] text-[#D4A017]">▼</span>
              <span className="text-sm">+91</span>
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="00000 00000"
              className="flex-1 bg-transparent text-[#0F172A] text-base font-bold outline-none placeholder:text-slate-300 w-full"
            />
          </div >
          
          {error && (
            <p className="text-[#EF4444] text-[10px] mt-2 font-black uppercase tracking-wider">{error}</p>
          )}

          {/* Action Button - New label and visible disabled state */}
          <motion.button 
            type="submit"
            disabled={phone.length !== 10}
            whileTap={phone.length === 10 ? { scale: 0.98 } : {}}
            className={`w-full mt-10 h-14 rounded-full font-black text-base transition-all duration-500 flex items-center justify-center gap-2 relative overflow-hidden group ${
              phone.length === 10 
              ? 'bg-[#0F172A] text-white shadow-xl shadow-[#0F172A]/20 cursor-pointer' 
              : 'bg-[#0F172A]/5 text-slate-300 cursor-not-allowed border border-slate-100'
            }`}
          >
            <span className="relative z-10 tracking-[0.1em] uppercase text-xs">Explore CLIQGARAGE</span>
            {phone.length === 10 && (
              <div className="absolute inset-0 bg-[#D4A017] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            )}
          </motion.button>

          {/* Registration Link */}
          <motion.div 
            variants={itemVariants}
            className="mt-6 flex flex-col items-center gap-1"
          >
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">New user?</p>
            <button 
              type="button"
              onClick={() => navigate('/register')}
              className="text-[11px] font-black text-[#0F172A] uppercase tracking-[0.2em] border-b-2 border-[#D4A017] pb-0.5 active:scale-95 transition-transform"
            >
              Create Account
            </button>
          </motion.div>
        </motion.form>

        {/* Mini Footer */}
        <motion.div variants={itemVariants} className="mt-auto mb-10 text-center text-[8px] text-slate-400 font-black uppercase tracking-[0.2em] leading-loose">
          By continuing you agree to the <br/>
          <span className="text-slate-500 border-b border-slate-100">Terms of Service</span> & <span className="text-slate-500 border-b border-slate-100">Privacy Policy</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
