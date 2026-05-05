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

import UnifiedTracking from '../pages/tracking/UnifiedTracking';
import MechanicLogin from '../pages/mechanic/MechanicLogin';
import MechanicOTP from '../pages/mechanic/MechanicOTP';
import MechanicDashboard from '../pages/mechanic/MechanicDashboard';
import MechanicSetup from '../pages/mechanic/MechanicSetup';
import ServiceManagement from '../pages/mechanic/ServiceManagement';
import RentalLogin from '../pages/rental/RentalLogin';
import RentalOTP from '../pages/rental/RentalOTP';
import RentalDashboard from '../pages/rental/RentalDashboard';
import RentalSetup from '../pages/rental/RentalSetup';

// Admin Module
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagement from '../pages/admin/UserManagement';
import AdminServiceManagement from '../pages/admin/ServiceManagement';
import EcommerceManagement from '../pages/admin/EcommerceManagement';
import RentalManagement from '../pages/admin/RentalManagement';
import ReportsAnalytics from '../pages/admin/ReportsAnalytics';
import AdminSettings from '../pages/admin/AdminSettings';

const AppRoutes = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Define path groups for cleaner logic
  const isAuthPage = ['/', '/login', '/register', '/otp', '/setup-profile'].includes(pathname) || 
                     pathname.startsWith('/mechanic/login') || 
                     pathname.startsWith('/mechanic/otp') ||
                     pathname.startsWith('/mechanic/setup') ||
                     pathname.startsWith('/mechanic/setup') ||
                     pathname.startsWith('/rental/login') ||
                     pathname.startsWith('/rental/otp') ||
                     pathname.startsWith('/rental/setup');

  const isDashboardPage = ['/home', '/mechanic/dashboard', '/rental/dashboard'].includes(pathname) || pathname.startsWith('/admin');
  
  const isEcommercePage = pathname.startsWith('/ecommerce') || pathname === '/order-history';
  const isServicePage = pathname.startsWith('/services') || pathname === '/history' || pathname === '/repairs';
  const isRentalPage = pathname.startsWith('/rentals') || pathname === '/bookings';
  const isProfilePage = pathname.startsWith('/profile') || pathname === '/payments' || pathname === '/wishlist' || pathname === '/support';
  const isAdminPage = pathname.startsWith('/admin');

  const shouldHideHeader = isAuthPage || isDashboardPage || isAdminPage || pathname === '/services' || pathname.startsWith('/services/') || pathname === '/ecommerce' || pathname.startsWith('/ecommerce/product/') || pathname.startsWith('/order-tracking/') || pathname === '/tracking';
  const shouldHideBottomNav = isAuthPage || isDashboardPage || isAdminPage || pathname.startsWith('/services/');

  return (
    <div className="bg-[#f4f7ff] min-h-screen relative overflow-x-hidden">
      {/* Background Blobs */}
      {!isAuthPage && (
        <>
          <div className="fixed top-[-5%] right-[-10%] w-[400px] h-[400px] bg-[#D4A017]/15 rounded-full blur-[120px] pointer-events-none z-0" />
          <div className="fixed bottom-[5%] left-[-15%] w-[450px] h-[450px] bg-[#003B71]/10 rounded-full blur-[140px] pointer-events-none z-0" />
        </>
      )}
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {!shouldHideHeader && <MobileHeader />}
        
        <main className={twMerge("flex-grow", !shouldHideHeader && "pt-16")}>
          <Routes>
            {/* Landing & Auth */}
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/setup-profile" element={<SetupProfile />} />

            {/* Core Pages */}
            <Route path="/home" element={<Home />} />
            
            {/* Services Module */}
            <Route path="/services" element={<ServiceList />} />
            <Route path="/services/:id" element={<ServiceBooking />} />
            <Route path="/history" element={<ServiceHistory />} />
            <Route path="/repairs" element={<Repairs />} />
            
            {/* E-commerce Module */}
            <Route path="/ecommerce" element={<ProductList />} />
            <Route path="/ecommerce/product/:id" element={<ProductDetail />} />
            <Route path="/ecommerce/cart" element={<Cart />} />
            <Route path="/ecommerce/checkout" element={<Checkout />} />
            <Route path="/order-tracking/:id" element={<OrderTracking />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/wishlist" element={<Wishlist />} />
            
            {/* Rental Module */}
            <Route path="/rentals" element={<RentalBooking />} />
            <Route path="/rentals/list" element={<BikeList />} />
            <Route path="/rentals/:id" element={<BikeDetails />} />
            <Route path="/bookings" element={<BookingList />} />
            
            {/* Profile & Support */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/vehicles" element={<MyVehicles />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/support" element={<SupportCenter />} />
            <Route path="/tracking" element={<UnifiedTracking />} />

            {/* Mechanic Module */}
            <Route path="/mechanic" element={<Navigate to="/mechanic/login" replace />} />
            <Route path="/mechanic/login" element={<MechanicLogin />} />
            <Route path="/mechanic/otp" element={<MechanicOTP />} />
            <Route path="/mechanic/setup" element={<MechanicSetup />} />
            <Route path="/mechanic/dashboard" element={<MechanicDashboard />} />
            <Route path="/mechanic/services" element={<ServiceManagement />} />

            {/* Rental Partner Module */}
            <Route path="/rental" element={<Navigate to="/rental/login" replace />} />
            <Route path="/rental/login" element={<RentalLogin />} />
            <Route path="/rental/otp" element={<RentalOTP />} />
            <Route path="/rental/setup" element={<RentalSetup />} />
            <Route path="/rental/dashboard" element={<RentalDashboard />} />

            {/* Admin Module */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/services" element={<AdminServiceManagement />} />
            <Route path="/admin/ecommerce" element={<EcommerceManagement />} />
            <Route path="/admin/rentals" element={<RentalManagement />} />
            <Route path="/admin/reports" element={<ReportsAnalytics />} />
            <Route path="/admin/settings" element={<AdminSettings />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {!shouldHideBottomNav && <BottomNav />}
      </div>
    </div>
  );
};

export default AppRoutes;
