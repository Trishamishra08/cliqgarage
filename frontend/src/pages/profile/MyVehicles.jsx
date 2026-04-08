import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Car, Bike, ShieldCheck, Zap } from 'lucide-react';
import Button from '../../components/common/Button';

const MyVehicles = () => {
  const [vehicles, setVehicles] = useState([
    { id: 1, name: "Honda City", number: "KA 05 MN 1234", type: "Car", brand: "Honda" },
    { id: 2, name: "Yamaha MT-15", number: "KA 05 MN 5678", type: "Bike", brand: "Yamaha" }
  ]);

  const removeVehicle = (id) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  return (
    <div className="px-6 pb-32 pt-28 max-w-md mx-auto min-h-screen bg-slate-50 font-sans">
      <div className="flex flex-col gap-2 mb-8">
         <span className="text-[10px] font-black tracking-widest text-lavender-600 uppercase">Step 1: Your Profile</span>
         <h1 className="text-4xl font-black text-dark-950 uppercase tracking-tighter leading-none">Garages</h1>
         <p className="text-xs font-bold text-dark-400 uppercase tracking-widest mt-1">Manage your registered vehicles.</p>
      </div>

      <div className="flex flex-col gap-4">
        <AnimatePresence>
          {vehicles.map((v, i) => (
            <motion.div
              layout
              key={v.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-6 rounded-[2rem] border border-white shadow-xl shadow-lavender-100/10 flex items-center justify-between group"
            >
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-lavender-50 flex items-center justify-center text-lavender-600 transition-all group-hover:bg-lavender-600 group-hover:text-white">
                     {v.type === 'Car' ? <Car size={24} /> : <Bike size={24} />}
                  </div>
                  <div className="flex flex-col">
                     <h3 className="text-[13px] font-black uppercase text-dark-950 tracking-tighter">{v.name}</h3>
                     <p className="text-[12px] font-black text-lavender-600 tracking-[0.2em]">{v.number}</p>
                     <div className="flex items-center gap-1 mt-1">
                        <ShieldCheck size={10} className="text-emerald-500" />
                        <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">Insured</span>
                     </div>
                  </div>
               </div>
               
               <div className="flex items-center gap-2">
                  <button className="p-2.5 rounded-xl bg-slate-100 text-dark-400 hover:text-lavender-600 transition-all active:scale-90">
                     <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => removeVehicle(v.id)}
                    className="p-2.5 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all active:scale-90"
                  >
                     <Trash2 size={16} />
                  </button>
               </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-20 border-3 border-dashed border-slate-200 rounded-[2rem] flex items-center justify-center gap-3 text-dark-300 font-black uppercase tracking-widest hover:border-lavender-300 hover:text-lavender-400 transition-all"
        >
           <Plus size={24} /> Add vehicle
        </motion.button>
      </div>

      <div className="mt-12 bg-dark-950 p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
         {/* Abstract background graphics */}
         <div className="absolute -top-10 -right-10 w-40 h-40 bg-lavender-600 opacity-20 blur-3xl rounded-full" />
         
         <div className="relative z-10">
            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Smart Assist</h3>
            <p className="text-[10px] font-bold text-dark-300 uppercase leading-relaxed tracking-widest">Our AI learns your vehicle health to predict servicing needs.</p>
            <div className="mt-6">
               <Button className="h-11 px-8 rounded-xl text-[10px] bg-white text-dark-950 flex items-center gap-2">
                 ENABLE NOW <Zap size={12} className="fill-lavender-600 text-lavender-600" />
               </Button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MyVehicles;
