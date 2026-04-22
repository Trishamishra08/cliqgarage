import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Phone, Bike } from 'lucide-react';
import rentalLogo from '../../assets/Bright_Yellow_Mercedes_Car_Wallpaper_For_iPhone_And_Android__Sporty_Luxury_Aesthetic_Style-removebg-preview.png';

const Section = ({ children }) => (
  <div className="w-1/2 flex-shrink-0 flex flex-col min-h-screen">
    <div
      className="relative w-full bg-[#1a472a] shrink-0"
      style={{ height: '22vh', borderBottomLeftRadius: '50%', borderBottomRightRadius: '50%' }}
    >
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-30">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-36 h-36 rounded-full bg-white shadow-[0_8px_40px_rgba(26,71,42,0.2)] flex items-center justify-center border-4 border-white"
        >
          <Bike size={80} className="text-[#1a472a]" />
        </motion.div>
      </div>
    </div>
    <div className="flex-grow flex flex-col items-center pt-24 px-7 pb-8">
      {children}
    </div>
  </div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

const RentalLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [registerData, setRegisterData] = useState({ name: '', bikeModel: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (phone.length !== 10) { setError('Enter valid 10-digit number'); return; }
    navigate('/rental/otp', { state: { phone, isRegister: false } });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerData.name || phone.length !== 10) { setError('Fill all fields'); return; }
    navigate('/rental/otp', { state: { phone, isRegister: true, registerData } });
  };

  return (
    <div className="min-h-screen bg-white font-['Roboto'] overflow-x-hidden">
      <motion.div
        animate={{ x: isLogin ? '0%' : '-50%' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex w-[200%] min-h-screen"
      >
        {/* LOGIN */}
        <Section active={isLogin}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLogin ? 'visible' : 'hidden'}
            className="w-full flex flex-col items-center"
          >
            {/* Heading */}
            <motion.div variants={itemVariants} className="text-center mb-8 mt-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.35em] mb-2">Welcome to</p>
              <h1 className="text-3xl font-black text-[#1a472a] tracking-tight uppercase italic leading-none mb-2">
                CliqGarage
              </h1>
              <p className="text-xs font-black text-[#22c55e] uppercase tracking-[0.3em]">Rental Partner</p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleLogin} className="w-full flex flex-col items-center gap-4 mt-2">
              <motion.div variants={itemVariants} className="w-full flex items-center bg-[#F8FAFC] border border-slate-200 rounded-full px-5 h-13 py-3 shadow-sm focus-within:border-[#22c55e]/60 transition-all">
                <div className="flex items-center gap-2 text-slate-400 border-r border-slate-200 pr-3 mr-3">
                  <Phone size={15} />
                  <span className="text-xs font-black">+91</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="00000 00000"
                  className="flex-1 bg-transparent text-[#1a472a] text-sm font-bold outline-none placeholder:text-slate-300"
                />
              </motion.div>

              {error && isLogin && (
                <p className="text-[#EF4444] text-[8px] font-black uppercase tracking-widest">{error}</p>
              )}

              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={phone.length !== 10}
                className={`w-full py-3.5 rounded-full font-black text-xs tracking-[0.2em] uppercase transition-all duration-300 relative overflow-hidden group ${
                  phone.length === 10 ? 'bg-[#1a472a] text-white shadow-md' : 'bg-slate-100 text-slate-300'
                }`}
              >
                <span className="relative z-10">Authorize Access</span>
                <div className="absolute inset-0 bg-[#22c55e] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.button>

              <motion.div variants={itemVariants} className="mt-5 flex flex-col items-center gap-1.5">
                <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">New Partner?</p>
                <button type="button" onClick={() => { setIsLogin(false); setError(''); }} className="text-[10px] font-black text-[#1a472a] uppercase tracking-[0.2em] border-b-2 border-[#22c55e] pb-0.5">
                  Sign Up
                </button>
              </motion.div>
            </form>
          </motion.div>
        </Section>

        {/* REGISTER */}
        <Section active={!isLogin}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={!isLogin ? 'visible' : 'hidden'}
            className="w-full flex flex-col items-center"
          >
            {/* Heading */}
            <motion.div variants={itemVariants} className="text-center mb-8 mt-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.35em] mb-2">Welcome to</p>
              <h1 className="text-3xl font-black text-[#1a472a] tracking-tight uppercase italic leading-none mb-2">
                CliqGarage
              </h1>
              <p className="text-xs font-black text-[#22c55e] uppercase tracking-[0.3em]">New Rental Partner</p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleRegister} className="w-full flex flex-col items-center gap-3 mt-2">
              <motion.div variants={itemVariants} className="w-full flex items-center bg-[#F8FAFC] border border-slate-200 rounded-full px-5 py-3 shadow-sm">
                <Bike size={15} className="text-slate-300 mr-3" />
                <input
                  type="text"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  placeholder="Your Name"
                  className="flex-1 bg-transparent text-[#1a472a] text-sm font-bold outline-none placeholder:text-slate-300"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full flex items-center bg-[#F8FAFC] border border-slate-200 rounded-full px-5 py-3 shadow-sm">
                <Bike size={15} className="text-slate-300 mr-3" />
                <input
                  type="text"
                  value={registerData.bikeModel}
                  onChange={(e) => setRegisterData({ ...registerData, bikeModel: e.target.value })}
                  placeholder="Bike Model"
                  className="flex-1 bg-transparent text-[#1a472a] text-sm font-bold outline-none placeholder:text-slate-300"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full flex items-center bg-[#F8FAFC] border border-slate-200 rounded-full px-5 py-3 shadow-sm">
                <div className="flex items-center gap-2 text-slate-400 border-r border-slate-200 pr-3 mr-3">
                  <Phone size={15} />
                  <span className="text-xs font-black">+91</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="00000 00000"
                  className="flex-1 bg-transparent text-[#1a472a] text-sm font-bold outline-none placeholder:text-slate-300"
                />
              </motion.div>

              {error && !isLogin && (
                <p className="text-[#EF4444] text-[8px] font-black uppercase tracking-widest">{error}</p>
              )}

              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={!registerData.name || phone.length !== 10}
                className={`w-full h-11 rounded-full font-black text-[10px] tracking-[0.2em] uppercase transition-all duration-300 relative overflow-hidden group ${
                  registerData.name && phone.length === 10 ? 'bg-[#1a472a] text-white shadow-md' : 'bg-slate-100 text-slate-300'
                }`}
              >
                <span className="relative z-10">Join Network</span>
                <div className="absolute inset-0 bg-[#22c55e] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.button>

              <motion.div variants={itemVariants} className="mt-4 flex flex-col items-center gap-1">
                <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Already a Partner?</p>
                <button type="button" onClick={() => { setIsLogin(true); setError(''); }} className="text-[9px] font-black text-[#1a472a] uppercase tracking-[0.2em] border-b-2 border-[#22c55e] pb-0.5">
                  Sign In
                </button>
              </motion.div>
            </form>
          </motion.div>
        </Section>
      </motion.div>
    </div>
  );
};

export default RentalLogin;
