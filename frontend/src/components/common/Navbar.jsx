import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Bell, Menu, X, Settings, LogOut, Heart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { items: cartItems } = useSelector(state => state.cart);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Store', path: '/ecommerce' },
    { name: 'Rentals', path: '/rentals' },
  ];

  return (
    <nav 
      className={twMerge(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8',
        isScrolled ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100' : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
            <Settings className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-dark-900">
            CLIQ<span className="text-primary-600">GARAGE</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={twMerge(
                'text-[15px] font-semibold transition-colors duration-300',
                location.pathname === link.path ? 'text-primary-600' : 'text-dark-600 hover:text-primary-600'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link 
            to="/notifications" 
            className="p-2.5 text-dark-600 hover:bg-dark-50 rounded-xl transition-colors relative"
          >
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </Link>
          
          <Link 
            to="/cart" 
            className="p-2.5 text-dark-600 hover:bg-dark-50 rounded-xl transition-colors relative"
          >
            <ShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                {cartItems.length}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <Link 
              to="/profile" 
              className="flex items-center gap-3 pl-2 group"
            >
              <div className="w-10 h-10 rounded-full bg-primary-50 border-2 border-primary-100 flex items-center justify-center overflow-hidden">
                <User size={20} className="text-primary-600" />
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-[14px] font-bold text-dark-900 leading-tight">
                  {user?.name || 'Guest User'}
                </p>
                <p className="text-[12px] text-dark-400">My Account</p>
              </div>
            </Link>
          ) : (
            <Link to="/login">
              <button className="px-5 py-2.5 bg-primary-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all active:scale-95">
                Login / Join
              </button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-dark-600 hover:bg-dark-50 rounded-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-dark-50 py-4 px-6 shadow-xl fade-up">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={twMerge(
                  'text-lg font-bold p-2 rounded-xl transition-colors',
                  location.pathname === link.path ? 'bg-primary-50 text-primary-600' : 'text-dark-600 active:bg-dark-50'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-dark-50 flex items-center justify-center"></div>
            <Link 
              to="/profile" 
              className="flex items-center gap-4 p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <User size={24} className="text-dark-600" />
              <span className="text-lg font-bold text-dark-600">Profile Settings</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
