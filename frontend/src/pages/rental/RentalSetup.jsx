import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  FileText, 
  Camera, 
  Upload, 
  CheckCircle2, 
  ArrowRight, 
  User, 
  MapPin, 
  Clock,
  Check,
  AlertCircle,
  Store,
  Navigation,
  Locate,
  Info
} from 'lucide-react';

const StepIndicator = ({ currentStep, totalSteps }) => (
  <div className="flex gap-2 mb-8">
    {Array.from({ length: totalSteps }).map((_, i) => (
      <div 
        key={i} 
        className={`h-1 flex-1 rounded-full transition-all duration-500 ${
          i <= currentStep ? 'bg-[#22c55e]' : 'bg-slate-100'
        }`} 
      />
    ))}
  </div>
);

const LiveMapModal = ({ isOpen, onClose, onSelect }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-md flex items-end"
      >
        <div className="absolute inset-0" onClick={onClose} />
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          className="relative w-full h-[80vh] bg-white rounded-t-[3rem] overflow-hidden flex flex-col"
        >
          {/* Map Area */}
          <div className="flex-1 bg-slate-50 relative">
             <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(#1a472a 1px, transparent 1px), linear-gradient(90deg, #1a472a 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
             
             {/* Center Marker */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#22c55e] blur-2xl rounded-full opacity-30 animate-pulse scale-150" />
                  <div className="relative w-12 h-12 bg-white rounded-full shadow-2xl border-4 border-[#1a472a] flex items-center justify-center">
                     <MapPin size={24} className="text-[#1a472a]" />
                  </div>
                </div>
                <div className="mt-4 bg-[#1a472a] text-white px-4 py-2 rounded-xl shadow-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                  Detecting Live Location...
                </div>
             </div>

             {/* Map Controls */}
             <div className="absolute right-6 bottom-10 flex flex-col gap-3">
                <button className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#1a472a] active:scale-90 transition-all border border-slate-100">
                  <Locate size={20} />
                </button>
             </div>
          </div>

          {/* Selection Area */}
          <div className="p-8 bg-white pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-slate-50">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 shadow-sm border border-blue-100">
                  <Navigation size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-black text-[#1a472a] uppercase tracking-tight leading-none mb-1">Confirm Location</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate leading-none">Vijay Nagar Main Road, Shop #12, Indore</p>
                </div>
             </div>
             <button 
               onClick={() => {
                 onSelect("Vijay Nagar Main Road, Shop #12, Indore");
                 onClose();
               }}
               className="w-full py-4 bg-[#1a472a] text-white rounded-full font-black text-xs tracking-[0.2em] uppercase shadow-xl active:scale-95 transition-all"
             >
               Confirm Hub Location
             </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const RentalSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { phone, name, bikeModel } = location.state || {};

  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [address, setAddress] = useState("");

  const [docs, setDocs] = useState({
    aadharFront: null,
    aadharBack: null,
    license: null,
    shopImage: null,
  });

  const handleFileUpload = (key) => {
    // Simulated upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setDocs(prev => ({ ...prev, [key]: file.name }));
      }
    };
    input.click();
  };

  const steps = [
    {
      title: "Identity Verification",
      subtitle: "Secure your partner account with Govt. ID",
      content: (
        <div className="space-y-4">
          <div 
            onClick={() => handleFileUpload('aadharFront')}
            className="p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#22c55e]/30 transition-all"
          >
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-3">
              {docs.aadharFront ? <Check className="text-[#22c55e]" /> : <Camera className="text-slate-300" />}
            </div>
            <p className="text-[10px] font-black text-[#1a472a] uppercase tracking-widest mb-1">
              {docs.aadharFront || 'Aadhar Card Front'}
            </p>
            <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Click to Capture or Upload</p>
          </div>
          <div 
            onClick={() => handleFileUpload('aadharBack')}
            className="p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#22c55e]/30 transition-all"
          >
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-3">
              {docs.aadharBack ? <Check className="text-[#22c55e]" /> : <Camera className="text-slate-300" />}
            </div>
            <p className="text-[10px] font-black text-[#1a472a] uppercase tracking-widest mb-1">
              {docs.aadharBack || 'Aadhar Card Back'}
            </p>
            <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Click to Capture or Upload</p>
          </div>
        </div>
      )
    },
    {
      title: "Business Details",
      subtitle: "Tell us more about your rental hub",
      content: (
        <div className="space-y-2.5">
          {/* Shop Name Card */}
          <div className="bg-white rounded-[1.5rem] p-4 border border-slate-100 shadow-sm">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-3 px-1">Business Identity</label>
            <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3 border border-slate-100 focus-within:border-[#22c55e]/30 transition-all">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#1a472a] shadow-sm border border-slate-100">
                <Store size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Business/Shop Name"
                className="bg-transparent border-none outline-none text-sm font-bold text-[#1a472a] w-full placeholder:text-slate-300"
              />
            </div>
          </div>

          {/* Address Card with Map Trigger */}
          <div className="bg-white rounded-[1.5rem] p-4 border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-3 px-1">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Shop Location</label>
               <button 
                 onClick={() => setShowMap(true)}
                 className="text-[9px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1.5 active:scale-95 transition-all"
               >
                 <MapPin size={12} /> Set on Map
               </button>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 focus-within:border-[#22c55e]/30 transition-all">
               <textarea 
                  placeholder="Shop Address Details"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-xs font-bold text-[#1a472a] placeholder:text-slate-300 resize-none leading-relaxed"
               />
            </div>
          </div>

          {/* Photo Upload Card */}
          <div 
            onClick={() => handleFileUpload('shopImage')}
            className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[1.8rem] p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#22c55e]/40 transition-all group"
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md border border-slate-100 mb-3 group-hover:scale-110 transition-transform">
              <Camera className="text-slate-400" size={18} />
            </div>
            <p className="text-[10px] font-black text-[#1a472a] uppercase tracking-widest mb-1">
              {docs.shopImage || 'Upload Shop/Garage Photo'}
            </p>
            <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest italic">Main entrance or billboard view</p>
          </div>
        </div>
      )
    },
    {
      title: "Final Review",
      subtitle: "Double check your information",
      content: (
        <div className="space-y-3">
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#1a472a]">
              <User size={24} />
            </div>
            <div>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Partner Name</p>
              <p className="text-sm font-black text-[#1a472a] tracking-tight">{name || 'Partner'}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#1a472a]">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Documents</p>
              <p className="text-sm font-black text-[#22c55e] tracking-tight">4 Files Attached</p>
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3">
            <AlertCircle className="text-blue-500 shrink-0" size={18} />
            <p className="text-[9px] font-bold text-blue-700 leading-relaxed uppercase tracking-wider">
              By submitting, you agree to CliqGarage partner terms and background verification policy.
            </p>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowPendingModal(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white font-['Roboto'] flex flex-col overflow-hidden">
      {/* Header Bar */}
      <div className="p-6 flex items-center justify-between border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
            <ShieldCheck className="text-[#1a472a]" />
          </div>
          <div>
            <h2 className="text-sm font-black text-[#1a472a] uppercase tracking-tighter leading-none">Setup Profile</h2>
            <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1">Verification Required</p>
          </div>
        </div>
        <div className="bg-[#1a472a] px-3 py-1.5 rounded-lg">
          <p className="text-[9px] font-black text-white uppercase tracking-widest">Step {step + 1}/3</p>
        </div>
      </div>

      <div className="flex-1 px-6 py-4 flex flex-col justify-between overflow-y-auto">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="w-full"
        >
          <div className="mb-8">
            <h1 className="text-2xl font-black text-[#1a472a] tracking-tight uppercase italic mb-2 leading-none">
              {steps[step].title}
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{steps[step].subtitle}</p>
          </div>

          <StepIndicator currentStep={step} totalSteps={steps.length} />

          {steps[step].content}
        </motion.div>

        <LiveMapModal 
          isOpen={showMap} 
          onClose={() => setShowMap(false)} 
          onSelect={setAddress} 
        />

        <div className="px-8 pb-12 mt-10">
          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className={`w-full py-4 rounded-full font-black text-xs tracking-[0.2em] uppercase transition-all duration-300 relative overflow-hidden flex items-center justify-center gap-2 ${
              isSubmitting ? 'bg-slate-100 text-slate-300' : 'bg-[#1a472a] text-white shadow-xl shadow-[#1a472a]/20 active:scale-95'
            }`}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-slate-300 border-t-[#1a472a] rounded-full animate-spin" />
            ) : (
              <>
                {step === steps.length - 1 ? 'Finish & Submit' : 'Continue Step'}
                <ArrowRight size={16} />
              </>
            )}
          </button>
          
          {step > 0 ? (
            <button 
              onClick={() => setStep(step - 1)}
              className="w-full mt-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] active:scale-95 transition-all"
            >
              Back to Previous
            </button>
          ) : (
            <div className="flex flex-col gap-5 mt-5">
              <button 
                onClick={() => navigate(-1)}
                className="w-full text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] active:scale-95 transition-all"
              >
                Back to Previous
              </button>
              <button 
                onClick={() => alert("Please complete the setup to create your account first.")}
                className="w-full text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] hover:text-slate-400 transition-colors"
              >
                Already have an account? <span className="text-blue-500">Login here</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* PENDING APPROVAL MODAL */}
      <AnimatePresence>
        {showPendingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-white w-full max-w-sm rounded-[3rem] p-8 text-center relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#22c55e]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="w-24 h-24 bg-[#E6F4FF] rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-dashed border-blue-200 rounded-full"
                />
                <Clock className="text-blue-500" size={40} />
              </div>

              <h2 className="text-2xl font-black text-[#1a472a] tracking-tight uppercase italic mb-3">
                Submission Received!
              </h2>
              <div className="bg-amber-50 px-4 py-2 rounded-xl mb-6 inline-block border border-amber-100">
                <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                  Status: Verification Pending
                </p>
              </div>
              
              <p className="text-xs font-bold text-slate-500 leading-relaxed mb-8 uppercase tracking-wide">
                Your profile is now under review by our admin team. This usually takes 24-48 hours. You will be notified once your account is activated.
              </p>

              <button
                onClick={() => navigate('/rental/login')}
                className="w-full py-4 bg-[#1a472a] text-white rounded-full font-black text-[10px] tracking-[0.2em] uppercase shadow-xl shadow-[#1a472a]/20 active:scale-95 transition-all"
              >
                Got It, Thanks!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RentalSetup;
