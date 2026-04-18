import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, Calendar, Clock, Star, MapPin, ShieldCheck, Zap } from 'lucide-react';
import Button from '../../components/common/Button';

const BikeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [duration, setDuration] = useState(24); // hours

  // Dummy data
  const bike = {
    id: 1,
    name: "Yamaha R15 V4",
    type: "Sport",
    pricePerHour: 99,
    pricePerDay: 999,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=1200&auto=format&fit=crop",
    specs: {
      engine: "155cc",
      mileage: "45 kmpl",
      topSpeed: "140 kmph",
      weight: "142 kg"
    }
  };

  const calculateFare = () => {
    if (duration >= 24) {
      return (Math.ceil(duration / 24) * bike.pricePerDay);
    }
    return (duration * bike.pricePerHour);
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-32">
      {/* Header */}
      <div className="relative h-[40vh]">
        <img src={bike.image} className="w-full h-full object-cover" alt="Bike" />
        <div className="absolute top-6 left-6">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-dark-900 shadow-xl border border-white"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-[var(--primary-color)]/30 border border-slate-50">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[10px] font-black tracking-widest text-[var(--primary-color)] uppercase mb-2 block">{bike.type}</span>
              <h1 className="text-3xl font-black text-dark-950 uppercase tracking-tighter leading-none">{bike.name}</h1>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
              <Star size={14} className="text-var(--secondary-color) fill-var(--secondary-color)" />
              <span className="text-sm font-black text-amber-800">{bike.rating}</span>
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-4 gap-2 mb-8">
            {Object.entries(bike.specs).map(([label, val]) => (
              <div key={label} className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col items-center">
                <span className="text-[8px] font-black text-dark-300 uppercase tracking-widest mb-1">{label}</span>
                <span className="text-[10px] font-black text-dark-800 uppercase">{val}</span>
              </div>
            ))}
          </div>

          {/* Fare Calculator */}
          <div className="flex flex-col gap-4 mb-8">
             <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-widest text-dark-400">Duration</h3>
                <span className="text-sm font-black text-[var(--primary-color)]">{duration} Hours</span>
             </div>
             <input 
               type="range" 
               min="1" 
               max="72" 
               step="1"
               value={duration}
               onChange={(e) => setDuration(parseInt(e.target.value))}
               className="w-full accent-[var(--primary-color)] h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
             />
             <div className="flex items-center justify-between text-[8px] font-black text-dark-300 uppercase tracking-[0.3em]">
                <span>1 HR</span>
                <span>24 HRS</span>
                <span>72 HRS</span>
             </div>
          </div>

          {/* Total Fare */}
          <div className="bg-[var(--primary-color)]/5 border-[var(--primary-color)]/10 flex items-center justify-between mb-8 transition-all">
             <div>
                <p className="text-[10px] font-black text-[var(--primary-color)] uppercase tracking-widest leading-none mb-1">Total Fare</p>
                <p className="text-3xl font-black text-dark-950 tracking-tighter">₹{calculateFare()}</p>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-black text-dark-400 uppercase tracking-[0.2em] leading-none mb-1">Inclusive of</p>
                <p className="text-[9px] font-bold text-dark-600 uppercase">GST & Insurance</p>
             </div>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-3 mb-8">
             {[
               { icon: ShieldCheck, text: 'RSA Included' },
               { icon: Zap, text: 'Express Delivery' },
               { icon: MapPin, text: 'Anywhere Pickup' }
             ].map((feat, i) => (
               <div key={i} className="flex items-center gap-3 text-dark-600">
                  <feat.icon size={16} className="text-[var(--primary-color)]" />
                  <span className="text-[11px] font-bold uppercase tracking-tight">{feat.text}</span>
               </div>
             ))}
          </div>

          {/* Action */}
          <Button className="w-full h-16 rounded-[1.5rem] flex items-center justify-center gap-3 text-[12px] font-black uppercase tracking-widest shadow-2xl shadow-lavender-600/30">
            Confirm Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BikeDetails;
