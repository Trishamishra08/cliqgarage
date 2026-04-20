import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import OTP from '../pages/auth/OTP';
import Welcome from '../pages/auth/Welcome';
import ServiceList from '../pages/service/ServiceList';
import ServiceBooking from '../pages/service/ServiceBooking';
import ProductList from '../pages/ecommerce/ProductList';
import BikeList from '../pages/rental/BikeList';
import BikeDetails from '../pages/rental/BikeDetails';
import Profile from '../pages/profile/Profile';
import MyVehicles from '../pages/profile/MyVehicles';
import EditProfile from '../pages/profile/EditProfile';
import SetupProfile from '../pages/auth/SetupProfile';
import RentalBooking from '../pages/rental/RentalBooking';
import ServiceHistory from '../pages/service/ServiceHistory';
import BookingList from '../pages/rental/BookingList';
import Payments from '../pages/profile/Payments';
import Wishlist from '../pages/ecommerce/Wishlist';
import SupportCenter from '../pages/support/SupportCenter';
import Repairs from '../pages/service/Repairs';
import MobileHeader from '../components/common/MobileHeader';
import BottomNav from '../components/common/BottomNav';
import ProductDetail from '../pages/ecommerce/ProductDetail';
import Cart from '../pages/ecommerce/Cart';
import Checkout from '../pages/ecommerce/Checkout';
import OrderTracking from '../pages/ecommerce/OrderTracking';
import OrderHistory from '../pages/ecommerce/OrderHistory';

const AppRoutes = () => {
  const location = useLocation();
  const introPaths = ['/'];
  const authPaths = ['/login', '/otp', '/setup-profile', '/register', ...introPaths];
  const fullScreenPaths = [
    '/home', '/ecommerce', '/history', '/bookings', '/payments', 
    '/wishlist', '/support', '/rentals', '/ecommerce/cart', 
    '/ecommerce/checkout', '/order-history'
  ];
  const hideHeaderPaths = [...fullScreenPaths, '/services', '/order-tracking'];
  const hideBottomNavPaths = [...fullScreenPaths, '/order-tracking'];
  
  const isAuth = authPaths.includes(location.pathname);
  const isFullScreen = fullScreenPaths.includes(location.pathname);
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname) || 
    location.pathname.startsWith('/services/') || 
    location.pathname.startsWith('/ecommerce/product/') ||
    location.pathname.startsWith('/order-tracking/');
  const isBookingFlow = location.pathname.startsWith('/services/');
  const shouldHideBottomNav = isBookingFlow;

  return (
    <div className="bg-[#f4f7ff] min-h-screen relative overflow-x-hidden">
      {/* Background Blobs */}
      {!isAuth && (
        <>
          <div className="fixed top-[-5%] right-[-10%] w-[400px] h-[400px] bg-[#D4A017]/15 rounded-full blur-[120px] pointer-events-none z-0" />
          <div className="fixed bottom-[5%] left-[-15%] w-[450px] h-[450px] bg-[#003B71]/10 rounded-full blur-[140px] pointer-events-none z-0" />
        </>
      )}
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {!isAuth && !shouldHideHeader && <MobileHeader />}
        <main className={twMerge("flex-grow", (!isAuth && !shouldHideHeader) && "pt-16")}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/setup-profile" element={<SetupProfile />} />
            <Route path="/services" element={<ServiceList />} />
            <Route path="/services/:id" element={<ServiceBooking />} />
            <Route path="/ecommerce" element={<ProductList />} />
            <Route path="/ecommerce/product/:id" element={<ProductDetail />} />
            <Route path="/ecommerce/cart" element={<Cart />} />
            <Route path="/ecommerce/checkout" element={<Checkout />} />
            <Route path="/order-tracking/:id" element={<OrderTracking />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/history" element={<ServiceHistory />} />
            <Route path="/bookings" element={<BookingList />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/support" element={<SupportCenter />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/vehicles" element={<MyVehicles />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/rentals" element={<RentalBooking />} />
            <Route path="/rentals/list" element={<BikeList />} />
            <Route path="/repairs" element={<Repairs />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {!isAuth && !shouldHideBottomNav && <BottomNav />}
      </div>
    </div>
  );
};

export default AppRoutes;
