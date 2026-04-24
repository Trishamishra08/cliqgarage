import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Settings, Bike, ShoppingBag, ArrowRight } from 'lucide-react';
import welcomeBg from '../../assets/welcome_bg.jpg';
import Logo from '../../components/common/Logo';

const Welcome = () => {
  const navigate = useNavigate();



  return (
    <div className="fixed inset-0 bg-[#0F172A] flex items-center justify-center overflow-hidden font-['Roboto']">
      <div className="relative w-full h-full flex flex-col pt-12">
        {/* Background Layer */}
        <div className="absolute inset-0">
          <img 
            src={welcomeBg} 
            alt="CLIQGARAGE Welcome" 
            className="w-full h-full object-cover lg:object-contain bg-[#1F4D4D]" 
          />
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        </div>

        {/* Content Container */}
        <div className="relative z-20 flex-grow flex flex-col h-full">
            {/* Top Header Section */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="px-6 flex flex-col items-center pt-16"
            >
              {/* Quick Actions Icons */}
              <div className="flex gap-10 mb-8">
                {[
                  { icon: Settings, label: 'Service' },
                  { icon: Bike, label: 'Rental' },
                  { icon: ShoppingBag, label: 'Store' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#0F172A]/15 backdrop-blur-md border border-[#0F172A]/10 flex items-center justify-center shadow-sm">
                      <item.icon size={14} className="text-[#0F172A]" />
                    </div>
                    <span className="text-[7px] font-black uppercase tracking-[0.2em] text-[#0F172A]/70">{item.label}</span>
                  </div>
                ))}
              </div>

            {/* Main Branding */}
            <div className="text-center">
              <h1 className="text-white text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none italic drop-shadow-2xl">
                WELCOME TO <br />
                <span className="text-[#0F172A] tracking-normal drop-shadow-none">CLIQGARAGE</span>
              </h1>
            </div>
          </motion.div>

          {/* Bottom CTA Section */}
          <div className="mt-auto pb-24 px-8 w-full max-w-sm mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <button
                onClick={() => navigate('/login')}
                className="w-full h-16 bg-[#0F172A] text-white border border-white/10 text-xs font-black uppercase tracking-[0.3em] rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.5)] active:scale-95 transition-all flex items-center justify-center gap-4 group"
              >
                <span className="group-hover:text-[#D4A017] transition-colors">Get Started</span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D4A017] group-hover:text-[#0F172A] transition-all">
                  <ArrowRight size={14} />
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
