import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, MapPin, Clock, Shield, ChevronRight, Zap, Car, Bike, LifeBuoy } from 'lucide-react';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';
import { twMerge } from 'tailwind-merge';

const ServiceList = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Bike', icon: Bike },
    { name: 'Car', icon: Car },
    { name: 'General', icon: Wrench },
    { name: 'Emergency', icon: LifeBuoy },
    { name: 'Maintenance', icon: Clock },
  ];

  const mechanics = [
    {
      id: 1,
      name: "Elite Auto Care",
      type: "Car & Bike Specialist",
      rating: 4.8,
      reviews: 120,
      priceRange: "₹499 - ₹2999",
      distance: "2.4 km",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2672&auto=format&fit=crop",
      services: ["Periodic Service", "Brakes", "Engine Oil", "Tires"],
      isPremium: true
    },
    {
      id: 2,
      name: "ProBike Masters",
      type: "Bike Only",
      rating: 4.5,
      reviews: 85,
      priceRange: "₹299 - ₹1499",
      distance: "1.8 km",
      image: "https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=2670&auto=format&fit=crop",
      services: ["Chain Lube", "Air Filter", "Clutch Plate", "Tuning"],
      isPremium: false
    },
    {
      id: 3,
      name: "Roadside Rescue",
      type: "Emergency Service",
      rating: 4.9,
      reviews: 240,
      priceRange: "₹999 onwards",
      distance: "0.5 km",
      image: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=2574&auto=format&fit=crop",
      services: ["Towing", "Battery Jumpstart", "Flat Tire", "Key Locked"],
      isPremium: true,
      emergency: true
    },
    {
      id: 4,
      name: "Royal Motors",
      type: "Luxury Car Expert",
      rating: 4.7,
      reviews: 156,
      priceRange: "₹1999 - ₹9999",
      distance: "4.2 km",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2670&auto=format&fit=crop",
      services: ["Full Detail", "Ceramic Coating", "Engine Scan", "AC Service"],
      isPremium: true
    }
  ];

  const filteredMechanics = mechanics.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         m.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || m.type.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
        <div className="relative w-full flex-grow">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-dark-400">
             <Search size={24} />
          </div>
          <input 
            type="text" 
            placeholder="Search mechanics, services, or locations..."
            className="w-full h-16 pl-16 pr-6 bg-white border-2 border-slate-100 rounded-[2rem] focus:border-primary-500 focus:outline-none focus:ring-0 shadow-sm transition-all text-dark-800 font-medium placeholder:text-dark-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="h-16 px-8 bg-white border-2 border-slate-100 rounded-[2rem] flex items-center gap-3 text-dark-800 font-bold hover:border-primary-500 transition-all shadow-sm">
           <Filter size={20} /> Filters
        </button>
      </div>

      {/* Categories Scroller */}
      <div className="flex items-center gap-4 mb-4 overflow-x-auto pb-4 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={twMerge(
              "flex flex-col items-center gap-2 min-w-[70px] transition-all",
              activeCategory === cat.name ? "scale-110" : "opacity-60"
            )}
          >
             <div className={twMerge(
               "w-14 h-14 rounded-2xl flex items-center justify-center border transition-all shadow-sm",
               activeCategory === cat.name ? "bg-lavender-600 border-lavender-600 text-white" : "bg-white border-slate-100 text-dark-500"
             )}>
                <cat.icon size={20} dropShadow />
             </div>
             <span className="text-[10px] font-bold uppercase tracking-tight">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Main Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        <AnimatePresence>
          {filteredMechanics.map((mechanic, i) => (
            <motion.div
              layout
              key={mechanic.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col md:flex-row bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Section */}
              <div className="w-full md:w-56 h-64 md:h-auto relative overflow-hidden shrink-0">
                <img 
                  src={mechanic.image} 
                  alt={mechanic.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {mechanic.emergency && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    Emergency
                  </div>
                )}
                {mechanic.isPremium && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    Premium
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="flex-grow p-8 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                   <div>
                     <h3 className="text-2xl font-black text-dark-900 tracking-tight leading-tight group-hover:text-primary-600 transition-colors uppercase">{mechanic.name}</h3>
                     <p className="text-dark-400 text-sm font-bold tracking-widest uppercase mt-1">{mechanic.type}</p>
                   </div>
                   <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-xl">
                      <Star size={16} fill="#f59e0b" className="text-amber-500" />
                      <span className="text-sm font-black text-amber-700">{mechanic.rating}</span>
                   </div>
                </div>

                <div className="flex flex-wrap gap-2 py-2">
                   {mechanic.services.map((s, idx) => (
                     <span key={idx} className="px-3 py-1 bg-slate-50 text-dark-500 text-[10px] font-bold uppercase rounded-lg border border-slate-100">
                        {s}
                     </span>
                   ))}
                </div>

                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                   <div className="flex flex-col">
                      <p className="text-xs text-dark-400 font-bold uppercase tracking-widest leading-none mb-1">Estimated Cost</p>
                      <p className="text-xl font-black text-dark-900">{mechanic.priceRange}</p>
                   </div>
                   <div className="flex items-center gap-4 text-dark-400 text-sm font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={16} className="text-primary-500" />
                        <span>{mechanic.distance}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} className="text-primary-500" />
                        <span>20 min</span>
                      </div>
                   </div>
                </div>

                <div className="mt-2">
                   <Button className="w-full h-14 rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
                      View details & Book <ChevronRight size={18} />
                   </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredMechanics.length === 0 && (
         <div className="py-24 text-center">
            <h3 className="text-3xl font-black text-dark-900 mb-4">No results found</h3>
            <p className="text-dark-400 text-lg">Try adjusting your filters or search query.</p>
         </div>
      )}
    </div>
  );
};

export default ServiceList;
