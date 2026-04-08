import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/common/Logo';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    navigate('/otp', { state: { phone } });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 pt-12">
      <div className="flex justify-center mb-12">
        <Logo className="scale-125" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-grow flex flex-col"
      >
        <div className="mb-10">
          <h1 className="text-3xl font-black text-blue-950 tracking-tight leading-tight mb-2">
            Get started with <span className="text-orange-500 underline decoration-4 underline-offset-4">OTP</span>
          </h1>
          <p className="text-slate-500 font-medium">Enter your mobile number to continue</p>
        </div>

        <form onSubmit={handleSendOTP} className="space-y-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none">
              <span className="text-lg font-bold text-slate-400 mr-2">+91</span>
              <div className="w-[1px] h-6 bg-slate-200 mx-3"></div>
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter mobile number"
              maxLength={10}
              className="w-full h-16 bg-white border-b-2 border-slate-100 text-xl font-bold tracking-widest focus:border-blue-950 transition-all outline-none pl-16 placeholder:text-slate-200 placeholder:tracking-normal placeholder:font-medium"
            />
            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-500 text-xs font-bold mt-2 flex items-center gap-1"
              >
                {error}
              </motion.p>
            )}
          </div>

          <div className="pt-4">
             <button 
               type="submit"
               className="w-full h-16 bg-blue-950 text-white rounded-2xl flex items-center justify-center gap-3 font-black text-lg shadow-xl shadow-blue-900/20 active:scale-95 transition-all group"
             >
               Send OTP
               <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </form>

        <div className="mt-12 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
          By continuing, you agree to our <br/>
          <span className="text-blue-900">Terms of Service</span> & <span className="text-blue-900">Privacy Policy</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
