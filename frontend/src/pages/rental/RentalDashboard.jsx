import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import RentalBottomNav from '../../components/rental/RentalBottomNav';
import { Menu, X, Plus, Edit3, Trash2, LogOut, Bike, Clock, DollarSign, CheckCircle2, Calendar, TrendingUp, BarChart2, History } from 'lucide-react';

const RentalDashboard = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const partnerName = state?.name || 'Partner';

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('bikes');
  const [bikes, setBikes] = useState([
    { id: 1, model: 'Honda CB350', hourlyRate: 500, dailyRate: 3000, available: true },
    { id: 2, model: 'Royal Enfield 650', hourlyRate: 800, dailyRate: 4500, available: true },
  ]);
  const [bookings, setBookings] = useState([
    { id: 'BK-001', customer: 'Raj Kumar', bike: 'Honda CB350', date: '2026-04-22', time: '10:00 AM', duration: '2 hours', amount: '₹1,000', status: 'pending' },
    { id: 'BK-002', customer: 'Priya Singh', bike: 'Royal Enfield 650', date: '2026-04-21', time: '02:00 PM', duration: '1 day', amount: '₹4,500', status: 'completed' },
  ]);
  const [pricing, setPricing] = useState({ hourly: 500, daily: 3000 });
  const [availability, setAvailability] = useState({
    monday: { open: '09:00', close: '20:00', active: true },
    tuesday: { open: '09:00', close: '20:00', active: true },
    wednesday: { open: '09:00', close: '20:00', active: true },
    thursday: { open: '09:00', close: '20:00', active: true },
    friday: { open: '09:00', close: '20:00', active: true },
    saturday: { open: '10:00', close: '18:00', active: true },
    sunday: { open: '', close: '', active: false },
  });

  const handleSignOut = () => {
    setSidebarOpen(false);
    navigate('/rental/login', { replace: true });
  };

  return (
    <div className="h-screen bg-[#F4F6FB] flex flex-col overflow-hidden font-['Inter',sans-serif]">
      {/* NAVBAR */}
      <div className="bg-[#1a472a] px-4 pt-6 pb-3 shrink-0 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(true)} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
          <Menu size={15} className="text-white" />
        </button>
        <div className="flex items-center gap-2">
          <Bike size={26} className="text-[#22c55e]" />
          <div className="flex items-baseline font-black tracking-tight text-base leading-none">
            <span className="text-white">Cliq</span>
            <span className="text-[#22c55e]">Garage</span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
          <Bike size={15} className="text-white" />
        </div>
      </div>

      {/* TABS */}
      <div className="bg-white border-b border-slate-100 px-4 py-2 shrink-0 flex gap-0.5 overflow-x-auto">
        {[
          { key: 'bikes', label: 'My Bikes', icon: Bike },
          { key: 'pricing', label: 'Pricing', icon: DollarSign },
          { key: 'availability', label: 'Availability', icon: Clock },
          { key: 'bookings', label: 'Bookings', icon: Calendar },
          { key: 'earnings', label: 'Earnings', icon: TrendingUp },
          { key: 'history', label: 'History', icon: History },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-1 px-3 py-1.5 text-[9px] font-semibold whitespace-nowrap transition-all border-b-2 ${
              activeTab === key ? 'text-[#1a472a] border-[#22c55e]' : 'text-slate-400 border-transparent'
            }`}
          >
            <Icon size={10} /> {label}
          </button>
        ))}
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto px-4 py-2.5 space-y-2 pb-20">
        {/* MY BIKES */}
        {activeTab === 'bikes' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800">My Bikes</h2>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-[#22c55e] text-white text-[9px] font-bold rounded-full">
                <Plus size={12} /> Add Bike
              </button>
            </div>
            {bikes.map(bike => (
              <motion.div key={bike.id} className="bg-white rounded-lg p-3 border border-slate-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-sm">{bike.model}</h3>
                    <div className="flex gap-4 mt-2 text-[9px] text-slate-600">
                      <span>₹{bike.hourlyRate}/hr</span>
                      <span>₹{bike.dailyRate}/day</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1.5 hover:bg-slate-100 rounded"><Edit3 size={14} className="text-slate-600" /></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded"><Trash2 size={14} className="text-red-500" /></button>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${bike.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-[8px] font-bold text-slate-600">{bike.available ? 'Available' : 'Unavailable'}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* PRICING */}
        {activeTab === 'pricing' && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-800">Set Your Pricing</h2>
            <div className="bg-white rounded-lg p-4 space-y-4">
              <div>
                <label className="text-[9px] font-bold text-slate-600 uppercase">Hourly Rate (₹)</label>
                <input type="number" value={pricing.hourly} onChange={(e) => setPricing({...pricing, hourly: e.target.value})} className="w-full mt-2 px-3 py-2 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-[9px] font-bold text-slate-600 uppercase">Daily Rate (₹)</label>
                <input type="number" value={pricing.daily} onChange={(e) => setPricing({...pricing, daily: e.target.value})} className="w-full mt-2 px-3 py-2 border border-slate-200 rounded-lg text-sm" />
              </div>
              <button className="w-full py-2 bg-[#22c55e] text-white font-bold text-[9px] rounded-lg">Save Pricing</button>
            </div>
          </div>
        )}

        {/* AVAILABILITY */}
        {activeTab === 'availability' && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-800">Manage Availability</h2>
            <div className="bg-white rounded-lg p-3 space-y-2">
              {Object.entries(availability).map(([day, times]) => (
                <div key={day} className="flex items-center justify-between p-2 border border-slate-100 rounded">
                  <span className="text-[9px] font-bold text-slate-700 capitalize">{day}</span>
                  <div className="flex items-center gap-2">
                    {times.active ? (
                      <>
                        <input type="time" value={times.open} className="w-16 text-[8px] px-2 py-1 border border-slate-200 rounded" />
                        <span className="text-[8px]">to</span>
                        <input type="time" value={times.close} className="w-16 text-[8px] px-2 py-1 border border-slate-200 rounded" />
                      </>
                    ) : (
                      <span className="text-[8px] text-slate-400">Closed</span>
                    )}
                  </div>
                </div>
              ))}
              <button className="w-full py-2 bg-[#22c55e] text-white font-bold text-[9px] rounded-lg mt-3">Save Availability</button>
            </div>
          </div>
        )}

        {/* BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-800">Booking Requests</h2>
            {bookings.map(booking => (
              <motion.div key={booking.id} className="bg-white rounded-lg p-3 border border-slate-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-sm">{booking.customer}</h3>
                    <p className="text-[8px] text-slate-600 mt-1">{booking.bike} • {booking.date} {booking.time}</p>
                    <p className="text-[8px] text-slate-600">{booking.duration} • {booking.amount}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-[8px] font-bold ${booking.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                    {booking.status}
                  </div>
                </div>
                {booking.status === 'pending' && (
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 py-1.5 bg-[#22c55e] text-white text-[8px] font-bold rounded">Accept</button>
                    <button className="flex-1 py-1.5 bg-red-500 text-white text-[8px] font-bold rounded">Reject</button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* EARNINGS */}
        {activeTab === 'earnings' && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-800">Rental Earnings</h2>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-[8px] text-slate-600 font-bold">Today</p>
                <p className="text-lg font-black text-[#22c55e] mt-1">₹2,500</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-[8px] text-slate-600 font-bold">This Week</p>
                <p className="text-lg font-black text-[#22c55e] mt-1">₹12,000</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-[8px] text-slate-600 font-bold">This Month</p>
                <p className="text-lg font-black text-[#22c55e] mt-1">₹45,000</p>
              </div>
            </div>
          </div>
        )}

        {/* HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-800">Booking History</h2>
            {bookings.map(booking => (
              <motion.div key={booking.id} className="bg-white rounded-lg p-3 border border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{booking.customer}</h3>
                    <p className="text-[8px] text-slate-600 mt-1">{booking.bike} • {booking.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-800">{booking.amount}</p>
                    <p className="text-[8px] text-green-600 font-bold">Completed</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* SIDEBAR */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          >
            <motion.div
              className="w-72 h-full bg-white flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-[#1a472a]">
                <div>
                  <h2 className="font-bold text-white text-sm">{partnerName}</h2>
                  <p className="text-[8px] text-green-300 font-bold">Rental Partner</p>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="text-white">
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 p-4 space-y-2">
                <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest mb-4">Menu</p>
                {[
                  { id: 'bikes', label: 'My Bikes', icon: Bike },
                  { id: 'pricing', label: 'Pricing Setup', icon: DollarSign },
                  { id: 'availability', label: 'Availability', icon: Clock },
                  { id: 'bookings', label: 'Bookings', icon: Calendar },
                  { id: 'earnings', label: 'Earnings', icon: TrendingUp },
                  { id: 'history', label: 'History', icon: History },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[9px] font-bold transition-all ${
                      activeTab === id ? 'bg-green-100 text-[#1a472a]' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={14} /> {label}
                  </button>
                ))}
              </div>
              <button
                onClick={handleSignOut}
                className="m-4 flex items-center gap-2 px-4 py-2.5 bg-red-500 text-white rounded-lg font-bold text-[9px] w-full justify-center"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTTOM NAV */}
      <RentalBottomNav activeTab={activeTab} onNavigate={setActiveTab} />
    </div>
  );
};

export default RentalDashboard;
