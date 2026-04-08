import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Shield, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark-950 text-white pt-12 mt-auto border-t border-dark-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2.5 bg-primary-600 rounded-xl">
                <Shield size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                CLIQ<span className="text-primary-500">GARAGE</span>
              </span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed max-w-sm">
              Your one-stop reliable platform for vehicle servicing, accessories store, and bike rentals. Trusted by over 50k+ vehicle owners.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="p-2.5 bg-dark-900 hover:bg-primary-600 rounded-xl transition-all duration-300">
                  <Icon size={20} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold">Services</h4>
            <ul className="flex flex-col gap-4 text-dark-400">
              <li><Link to="/services" className="hover:text-primary-400 transition-colors">Vehicle Repairs</Link></li>
              <li><Link to="/services" className="hover:text-primary-400 transition-colors">Emergency Assistance</Link></li>
              <li><Link to="/services" className="hover:text-primary-400 transition-colors">Periodic Maintenance</Link></li>
              <li><Link to="/services" className="hover:text-primary-400 transition-colors">Pickup & Drop Service</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold">Support</h4>
            <ul className="flex flex-col gap-4 text-dark-400">
              <li><Link to="/faq" className="hover:text-primary-400 transition-colors">Help Center</Link></li>
              <li><Link to="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold">Get In Touch</h4>
            <ul className="flex flex-col gap-4 text-dark-400">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-500" />
                <span>+91 9887 654 432</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-500" />
                <span>support@cliqgarage.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-primary-500" />
                <span>123 Garage Lane, Silicon City, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-8 border-t border-dark-900 flex flex-col md:flex-row items-center justify-between text-dark-500 text-xs">
          <p>© 2024 CLIQGARAGE. All rights reserved.</p>
          <div className="flex items-center gap-1 mt-4 md:mt-0">
            <span>Made with</span>
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>for vehicle lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
