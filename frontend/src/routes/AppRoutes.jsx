import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import OTP from '../pages/auth/OTP';
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

const AppRoutes = () => {
  const location = useLocation();
  const authPaths = ['/login', '/otp', '/setup-profile', '/register'];
  const fullScreenPaths = ['/', '/ecommerce', '/history', '/bookings', '/payments', '/wishlist', '/support', '/rentals'];
  const isAuth = authPaths.includes(location.pathname);
  const isFullScreen = fullScreenPaths.includes(location.pathname);

  return (
    <div className="bg-[#f4f7ff] min-h-screen relative overflow-x-hidden">
      {/* Soft Blue Background Blobs */}
      <div className="fixed top-[-10%] right-[-10%] w-[300px] h-[300px] bg-blue-200/20 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="fixed bottom-[10%] left-[-10%] w-[250px] h-[250px] bg-blue-300/10 rounded-full blur-[80px] pointer-events-none z-0" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {!isAuth && !isFullScreen && <MobileHeader />}
        <main className={twMerge("flex-grow", (!isAuth && !isFullScreen) && "pt-16")}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/setup-profile" element={<SetupProfile />} />
            <Route path="/services" element={<ServiceList />} />
            <Route path="/services/:id" element={<ServiceBooking />} />
            <Route path="/ecommerce" element={<ProductList />} />
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
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        {!isAuth && !isFullScreen && <BottomNav />}
      </div>
    </div>
  );
};

export default AppRoutes;
