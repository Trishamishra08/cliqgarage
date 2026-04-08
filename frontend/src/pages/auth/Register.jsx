import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, ArrowRight, ShieldCheck, Mail, User, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Mock registration
    navigate('/otp', { state: { phone: formData.phone } });
  };

  return (
    <div className="min-h-screen py-12 px-6 flex items-center justify-center bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-[120px] opacity-40 -translate-y-1/2 translate-x-1/4"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white p-10 md:p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-[2rem] mb-6 shadow-xl shadow-primary-200">
             <UserPlus className="text-white" size={36} />
          </div>
          <h2 className="text-4xl font-black text-dark-900 tracking-tighter mb-3 leading-tight">Join the Community</h2>
          <p className="text-dark-400 font-medium tracking-tight">Create an account to start your journey with CLIQGARAGE</p>
        </div>

        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <InputField
              label="Full Name"
              placeholder="Arjun Verma"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <InputField
            label="Email Address"
            type="email"
            placeholder="arjun@email.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <InputField
            label="Phone Number"
            type="tel"
            placeholder="9887 654 321"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
            maxLength={10}
          />

          <div className="md:col-span-2 flex items-center gap-3 p-4 bg-primary-50/50 rounded-2xl border border-primary-100/50">
             <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white shrink-0">
               <ShieldCheck size={16} />
             </div>
             <p className="text-[11px] text-primary-800 leading-tight">By creating an account, you agree to our Terms of Use and Privacy Policy. We'll send an OTP to verify your mobile.</p>
          </div>

          <div className="md:col-span-2 mt-4">
             <Button type="submit" className="w-full h-16 rounded-2xl text-lg flex items-center justify-center gap-3 group">
               Register Now <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
             </Button>
          </div>
        </form>

        <p className="mt-12 text-center text-sm font-bold text-dark-500">
          Already have an account? {' '}
          <Link to="/login" className="text-primary-600 font-black hover:underline underline-offset-4">Sign In Instead</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
