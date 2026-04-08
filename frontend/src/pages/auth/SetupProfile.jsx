import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Bike, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/common/Logo';

const SetupProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    vehicleType: 'Bike',
    vehicleBrand: '',
    vehicleModel: '',
    vehicleYear: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate saving profile
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 pt-12 pb-12">
      <div className="flex justify-center mb-8">
        <Logo horizontal className="scale-110" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-grow flex flex-col"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-black text-blue-950 tracking-tight leading-tight mb-2">
            Complete <span className="text-orange-500 underline decoration-4 underline-offset-4">Profile</span>
          </h1>
          <p className="text-slate-500 font-medium">Add your vehicle details for better service</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Personal Details</h3>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-0 pointer-events-none">
                <User size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full h-12 bg-white border-b border-slate-200 text-sm font-bold focus:border-blue-950 transition-all outline-none pl-8"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-0 pointer-events-none">
                <Mail size={18} className="text-slate-400" />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full h-12 bg-white border-b border-slate-200 text-sm font-bold focus:border-blue-950 transition-all outline-none pl-8"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Vehicle Details</h3>
            
            <div className="flex gap-4">
               {['Bike', 'Car'].map((type) => (
                 <button
                   key={type}
                   type="button"
                   onClick={() => setFormData({...formData, vehicleType: type})}
                   className={`flex-1 h-12 rounded-xl font-bold text-sm transition-all ${formData.vehicleType === type ? 'bg-blue-950 text-white shadow-lg' : 'bg-slate-50 text-slate-400'}`}
                 >
                   {type}
                 </button>
               ))}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-0 pointer-events-none">
                <Bike size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Brand (e.g. Royal Enfield, Hyundai)"
                required
                className="w-full h-12 bg-white border-b border-slate-200 text-sm font-bold focus:border-blue-950 transition-all outline-none pl-8"
                value={formData.vehicleBrand}
                onChange={(e) => setFormData({...formData, vehicleBrand: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Model Name"
                  required
                  className="w-full h-12 bg-white border-b border-slate-200 text-sm font-bold focus:border-blue-950 transition-all outline-none"
                  value={formData.vehicleModel}
                  onChange={(e) => setFormData({...formData, vehicleModel: e.target.value})}
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-0 pointer-events-none">
                  <Calendar size={18} className="text-slate-400" />
                </div>
                <input
                  type="tel"
                  placeholder="Year"
                  required
                  maxLength={4}
                  className="w-full h-12 bg-white border-b border-slate-200 text-sm font-bold focus:border-blue-950 transition-all outline-none pl-8"
                  value={formData.vehicleYear}
                  onChange={(e) => setFormData({...formData, vehicleYear: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="pt-8">
             <button 
               type="submit"
               className="w-full h-16 bg-blue-950 text-white rounded-2xl flex items-center justify-center gap-3 font-black text-lg shadow-xl shadow-blue-900/20 active:scale-95 transition-all group"
             >
               Complete Setup
               <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SetupProfile;
