import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PackagesSection from './components/PackagesSection';
import WeatherSection from './components/WeatherSection';
import RecommendationsSection from './components/RecommendationsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import BookingModal from './components/BookingModal';
import PaymentModal from './components/PaymentModal';
import SuccessModal from './components/SuccessModal';
import PackageDetailsModal from './components/PackageDetailsModal';
import LoginPage from './components/LoginPage';
import WishlistModal from './components/WishlistModal';
import OrderPage from './components/OrderPage';
import MyBookingsPage from './components/MyBookingsPage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';

const TravelWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPackageDetailsModal, setShowPackageDetailsModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [bookingsRefreshKey, setBookingsRefreshKey] = useState(0);
  
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');
    
    if (authStatus === 'true' && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLocationSearch = (location) => {
    setSelectedLocation(location);
    setActiveSection('packages');
  };

  const handleViewDetails = (pkg) => {
    setSelectedPackage(pkg);
    setShowPackageDetailsModal(true);
  };

  const handleBookNow = (pkg) => {
    // Check if user is authenticated before booking
    if (!isAuthenticated) {
      setShowLoginModal(true);
      setSelectedPackage(pkg); // Store package for after login
      return;
    }

    setSelectedPackage(pkg);
    setShowBookingModal(true);
    setShowPackageDetailsModal(false);
  };

  const handleBookingConfirm = (data) => {
    setBookingData(data);
    setShowBookingModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    // Save booking to My Bookings
    if (selectedPackage && bookingData) {
      console.log('💾 Saving booking from payment success...');
      
      // Import saveOrder function
      const { saveOrder } = require('./utils/wishlist');
      
      // Create order object
      const orderData = {
        items: [{
          id: selectedPackage.id,
          name: selectedPackage.name,
          price: selectedPackage.price,
          image: selectedPackage.image,
          category: selectedPackage.category,
          location: selectedPackage.location,
          deposit: selectedPackage.deposit || null,
        }],
        form: {
          name: bookingData.name,
          address: bookingData.email, // Using email as address placeholder
          phone: bookingData.phone,
          payment: 'online', // Since payment was completed
        },
        totals: {
          perDaySum: parseInt(selectedPackage.price.replace(/[^0-9]/g, '')) || 0,
          days: bookingData.rentalDays || 1,
          total: (parseInt(selectedPackage.price.replace(/[^0-9]/g, '')) || 0) * (bookingData.rentalDays || 1) * parseInt(bookingData.quantity || 1),
        },
      };
      
      const saved = saveOrder(orderData);
      if (saved) {
        console.log('✅ Booking saved to My Bookings! ID:', saved.id);
      } else {
        console.error('❌ Failed to save booking');
      }
    }
    
    setShowPaymentModal(false);
    setShowSuccessModal(true);
    
    // Refresh bookings page
    setBookingsRefreshKey(Date.now());
  };

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setShowLoginModal(false);
    
    // If there was a package selected before login, proceed to booking
    if (selectedPackage) {
      setShowBookingModal(true);
    }
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setActiveSection('home');
    closeAllModals();
  };

  const closeAllModals = () => {
    setShowBookingModal(false);
    setShowPaymentModal(false);
    setShowSuccessModal(false);
    setShowPackageDetailsModal(false);
    setShowLoginModal(false);
    setSelectedPackage(null);
    setBookingData(null);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero onLocationSearch={handleLocationSearch} />;
      case 'packages':
        return <PackagesSection 
          onBookNow={handleBookNow} 
          onViewDetails={handleViewDetails}
          selectedLocation={selectedLocation} 
        />;
      case 'weather':
        return <WeatherSection />;
      case 'recommendations':
        return <RecommendationsSection />;
      case 'about':
        return <AboutSection />;
      case 'contact':
        return <ContactSection />;
      case 'order':
        return <OrderPage onBack={() => setActiveSection('home')} />;
      case 'bookings':
        return <MyBookingsPage key={bookingsRefreshKey} onBack={() => setActiveSection('home')} />;
      case 'profile':
        return <ProfilePage onBack={() => setActiveSection('home')} user={user} onUpdateUser={handleUpdateUser} />;
      case 'settings':
        return <SettingsPage onBack={() => setActiveSection('home')} />;
      default:
        return <Hero onLocationSearch={handleLocationSearch} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isAuthenticated={isAuthenticated}
        user={user}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={handleLogout}
        onWishlistClick={() => setShowWishlistModal(true)}
        onMyBookingsClick={() => {
          // Force refresh by incrementing key
          setBookingsRefreshKey(Date.now());
          setActiveSection('bookings');
        }}
        onProfileClick={() => setActiveSection('profile')}
        onSettingsClick={() => setActiveSection('settings')}
      />
      
      {renderSection()}
      
      {/* Login Modal */}
      {showLoginModal && (
        <LoginPage
          onClose={closeAllModals}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      
      {/* Modals */}
      {showPackageDetailsModal && (
        <PackageDetailsModal 
          package={selectedPackage}
          onClose={closeAllModals}
          onBookNow={handleBookNow}
        />
      )}
      
      {showBookingModal && (
        <BookingModal 
          package={selectedPackage}
          onClose={closeAllModals}
          onConfirm={handleBookingConfirm}
        />
      )}
      
      {showPaymentModal && (
        <PaymentModal 
          package={selectedPackage}
          bookingData={bookingData}
          onClose={closeAllModals}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
      
      {showSuccessModal && (
        <SuccessModal onClose={closeAllModals} />
      )}

      {showWishlistModal && (
        <WishlistModal 
          onClose={() => setShowWishlistModal(false)}
          onProceedToOrder={() => {
            setShowWishlistModal(false);
            setActiveSection('order');
          }}
        />
      )}
    </div>
  );
};

export default TravelWebsite;