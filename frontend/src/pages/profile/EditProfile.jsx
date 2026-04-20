import React from 'react';
import { Camera, Navigation2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();

  const fields = [
    { label: 'FULL NAME', value: 'Hritik raghuwanshi' },
    { label: 'EMAIL ADDRESS', value: 'hritik45raghuwanshi@gmail.com' },
    { label: 'PHONE NUMBER', value: '6260491554' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Custom Inner Header (Image 2 style) */}
      <div className="h-16 flex items-center px-5 border-b border-slate-50 sticky top-0 bg-white z-10">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center text-slate-800">
          <ArrowLeft size={24} />
        </button>
        <h1 className="flex-grow text-center text-lg font-black text-slate-900 pr-10">Edit Profile</h1>
      </div>

      <div className="px-6 py-10 flex flex-col items-center">
        {/* Profile Avatar */}
        <div className="relative mb-10">
          <div className="w-28 h-28 bg-var(--primary-color) rounded-full flex items-center justify-center overflow-hidden border-4 border-slate-50">
             <UserLargeIcon />
          </div>
          <button className="absolute bottom-1 right-1 w-9 h-9 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 active:scale-90 transition-transform">
            <Camera size={20} />
          </button>
        </div>
        <p className="text-slate-400 font-bold text-sm mb-12">Tap icon to change photo</p>

        {/* Form Fields */}
        <div className="w-full flex flex-col gap-10">
           {fields.map((field, i) => (
             <div key={i} className="flex flex-col gap-2 relative">
                <label className="text-[11px] font-black text-slate-400 tracking-[0.2em]">{field.label}</label>
                <input 
                  type="text" 
                  defaultValue={field.value} 
                  className="w-full text-lg font-black text-slate-900 py-2 border-b-2 border-slate-100 focus:border-var(--primary-color) focus:outline-none transition-colors"
                />
             </div>
           ))}

           {/* Address Details with Auto-Detect */}
           <div className="flex flex-col gap-6 pt-4">
              <div className="flex items-center justify-between">
                 <h3 className="text-[11px] font-black text-slate-400 tracking-[0.2em] uppercase">Address Details</h3>
                 <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-var(--primary-color) rounded-lg text-[10px] font-black uppercase tracking-wider border border-blue-100 active:scale-95 transition-all">
                    <Navigation2 size={14} />
                    Auto-Detect
                 </button>
              </div>

              <div className="flex flex-col gap-8">
                 <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-black text-slate-400 tracking-[0.2em]">STREET ADDRESS</label>
                    <input 
                      type="text" 
                      placeholder="House No, Street, Area" 
                      className="w-full text-lg font-black text-slate-900 py-2 border-b-2 border-slate-100 focus:border-var(--primary-color) focus:outline-none transition-colors placeholder:text-slate-200"
                    />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                       <label className="text-[11px] font-black text-slate-400 tracking-[0.2em]">CITY</label>
                       <input 
                         type="text" 
                         placeholder="City" 
                         className="w-full text-lg font-black text-slate-900 py-2 border-b-2 border-slate-100 focus:border-var(--primary-color) focus:outline-none transition-colors placeholder:text-slate-200"
                       />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="text-[11px] font-black text-slate-400 tracking-[0.2em]">PINCODE</label>
                       <input 
                         type="text" 
                         placeholder="000000" 
                         className="w-full text-lg font-black text-slate-900 py-2 border-b-2 border-slate-100 focus:border-var(--primary-color) focus:outline-none transition-colors placeholder:text-slate-200"
                       />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Submit Button */}
        <button 
          onClick={() => navigate('/home')}
          className="w-full h-16 bg-var(--primary-color) text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] mt-16 shadow-xl shadow-var(--primary-color)/20 active:scale-[0.98] transition-all"
        >
           Save Changes
        </button>
      </div>
    </div>
  );
};

const UserLargeIcon = () => (
  <svg viewBox="0 0 24 24" width="48" height="48" fill="white">
     <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

export default EditProfile;
