import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, User, Mail, MapPin, Bike, Car, Calendar, ArrowRight, Check, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/common/Logo';

const SetupProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    vehicleType: 'Bike',
    vehicleBrand: '',
    vehicleModel: '',
    vehicleYear: ''
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('hasOnboarded', 'true');
    navigate('/home');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col font-['Roboto'] overflow-x-hidden selection:bg-[#D4A017]/30 pb-10">
      {/* Premium Decorative Elements */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4A017]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-32 h-32 bg-[#0F172A]/5 rounded-full blur-3xl -ml-16 pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full h-full flex flex-col px-6 pt-4 pb-4 relative z-10"
      >
        {/* Top Header - centered logo */}
        <motion.div variants={itemVariants} className="relative flex items-center justify-center mb-12 h-10">
          <button 
            onClick={() => navigate(-1)} 
            className="absolute left-0 h-9 w-9 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#0F172A] active:scale-95 transition-transform"
          >
            <ArrowLeft size={18} />
          </button>
          
          <Logo horizontal={true} className="scale-100" forceDark={true} />
          
          <div className="absolute right-0 h-9 w-9 rounded-xl shadow-sm flex items-center justify-center bg-white text-[10px] font-black text-[#0F172A]">
             2/2
          </div>
        </motion.div>

        {/* Title Section - Moved lower */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-xl font-black text-slate-900 leading-tight mb-0.5">
            Complete <span className="text-[#D4A017]">Setup</span>
          </h1>
          <div className="flex items-center gap-2">
             <div className="w-4 h-1 bg-[#D4A017] rounded-full" />
             <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Help us personalize your garage</p>
          </div>
        </motion.div>

        {/* Profile Identity - Functional Image Upload */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="relative group p-1 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageChange} 
            />
            <div 
              onClick={handleImageClick}
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-[1.8rem] bg-slate-100 flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
               {avatar ? (
                 <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
               ) : (
                 <User size={32} className="text-slate-300" />
               )}
            </div>
            <button 
              type="button" 
              onClick={handleImageClick}
              className="absolute -bottom-1 -right-1 bg-[#0F172A] p-2 rounded-2xl text-white shadow-lg border-2 border-white active:scale-90 transition-transform cursor-pointer"
            >
               <Camera size={12} strokeWidth={2.5} />
            </button>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="flex-grow flex flex-col pt-2">
          {/* Card Based Layout */}
          <div className="bg-white rounded-[2rem] p-4 shadow-2xl shadow-slate-200/30 border border-white space-y-3.5">
            {/* Field: Identity */}
            <motion.div variants={itemVariants} className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 Personal Identity
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-900 outline-none border border-slate-100 focus:border-[#D4A017]/40 focus:bg-white transition-all placeholder:text-slate-300 shadow-inner"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-900 outline-none border border-slate-100 focus:border-[#D4A017]/40 focus:bg-white transition-all placeholder:text-slate-300 shadow-inner"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </motion.div>

            {/* Field: Address */}
            <motion.div variants={itemVariants} className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 Pickup Address
              </label>
              <input
                type="text"
                placeholder="Where should we pick up your vehicle?"
                required
                className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-900 outline-none border border-slate-100 focus:border-[#D4A017]/40 focus:bg-white transition-all placeholder:text-slate-300 shadow-inner"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </motion.div>

            {/* Field: Vehicle Details */}
            <motion.div variants={itemVariants} className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 Vehicle Details
              </label>
              <div className="grid grid-cols-6 gap-2">
                 <div className="col-span-2 flex bg-slate-100 p-1 rounded-xl">
                   {['Bike', 'Car'].map((type) => (
                     <button
                       key={type}
                       type="button"
                       onClick={() => setFormData({...formData, vehicleType: type})}
                       className={`flex-1 flex items-center justify-center h-7 rounded-lg transition-all ${formData.vehicleType === type ? 'bg-white text-[#D4A017] shadow-sm' : 'text-slate-400'}`}
                     >
                       {type === 'Bike' ? <Bike size={14} /> : <Car size={14} />}
                     </button>
                   ))}
                 </div>
                 <input
                  type="text"
                  placeholder="Brand"
                  className="col-span-4 bg-slate-50 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-900 outline-none border border-slate-100 focus:border-[#D4A017]/40 focus:bg-white transition-all placeholder:text-slate-300 shadow-inner"
                  value={formData.vehicleBrand}
                  onChange={(e) => setFormData({...formData, vehicleBrand: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                 <input
                  type="text"
                  placeholder="Model Name"
                  className="bg-slate-50 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-900 outline-none border border-slate-100 focus:border-[#D4A017]/40 focus:bg-white transition-all placeholder:text-slate-300 shadow-inner"
                  value={formData.vehicleModel}
                  onChange={(e) => setFormData({...formData, vehicleModel: e.target.value})}
                />
                <input
                  type="tel"
                  placeholder="Year"
                  maxLength={4}
                  className="bg-slate-50 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-900 outline-none border border-slate-100 focus:border-[#D4A017]/40 focus:bg-white transition-all placeholder:text-slate-300 shadow-inner"
                  value={formData.vehicleYear}
                  onChange={(e) => setFormData({...formData, vehicleYear: e.target.value})}
                />
              </div>
            </motion.div>
          </div>

          {/* Optimized Action Footer */}
          <motion.div variants={itemVariants} className="mt-auto pt-3 flex flex-col items-center">
            <button 
              type="submit"
              className="w-full h-12 bg-[#0F172A] text-white rounded-[1.2rem] flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-slate-200 active:scale-[0.98] transition-all group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10 flex items-center gap-2">
                 Join the Garage <ArrowRight size={14} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <p className="mt-2.5 text-[7px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 text-center">
               <ShieldCheck size={10} className="text-[#D4A017]" /> Secure boutique registration
            </p>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default SetupProfile;
