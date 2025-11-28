import React, { useState } from 'react';
import { Menu, X, Camera, User, LogOut, Settings, BookOpen, Heart, ChevronDown } from 'lucide-react';

const Header = ({ 
  activeSection, 
  setActiveSection, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen,
  isAuthenticated,
  user,
  onLoginClick,
  onLogout,
  onWishlistClick,
  onMyBookingsClick,
  onProfileClick,
  onSettingsClick 
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'packages', label: 'Gear' },
    { id: 'weather', label: 'How It Works' },
    { id: 'recommendations', label: 'Top Picks' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const getUserInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-40 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg mr-3">
              <Camera className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LensRent Hub
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Rent pro cameras, lenses & gear.</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-gray-100 ${
                  activeSection === item.id
                    ? 'text-blue-600 bg-blue-50 shadow-md'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Auth Section & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            
            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 px-4 py-2 rounded-xl border border-blue-200 transition-all duration-300 hover:shadow-md"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {getUserInitials(user?.name)}
                    </span>
                  </div>
                  <span className="hidden md:block text-gray-700 font-medium">
                    {user?.name?.split(' ')[0] || 'User'}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`text-gray-500 transition-transform duration-200 ${
                      showUserDropdown ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* User Dropdown */}
                {showUserDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-medium text-gray-800">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    
                    <div className="py-1">
                      <button 
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => {
                          if (onProfileClick) onProfileClick();
                          setShowUserDropdown(false);
                        }}
                      >
                        <User size={16} className="mr-3" />
                        Profile
                      </button>
                      <button 
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => {
                          if (onMyBookingsClick) onMyBookingsClick();
                          setShowUserDropdown(false);
                        }}
                      >
                        <BookOpen size={16} className="mr-3" />
                        My Bookings
                      </button>
                      <button 
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => {
                          if (onWishlistClick) onWishlistClick();
                          setShowUserDropdown(false);
                        }}
                      >
                        <Heart size={16} className="mr-3" />
                        Wishlist
                      </button>
                      <button 
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => {
                          if (onSettingsClick) onSettingsClick();
                          setShowUserDropdown(false);
                        }}
                      >
                        <Settings size={16} className="mr-3" />
                        Settings
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-100 py-1">
                      <button 
                        onClick={() => {
                          onLogout();
                          setShowUserDropdown(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <LogOut size={16} className="mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
              >
                <User size={20} />
                <span className="hidden sm:block">Sign In</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-2xl border-b border-gray-200">
            <nav className="py-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-6 py-4 font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Auth Section */}
              {isAuthenticated ? (
                <div className="mt-4 pt-4 border-t border-gray-200 px-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {getUserInitials(user?.name)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={onLogout}
                    className="flex items-center text-red-600 font-medium py-2"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t border-gray-200 px-6">
                  <button
                    onClick={() => {
                      onLoginClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <User size={20} />
                    <span>Sign In</span>
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}

        {/* Click outside to close dropdown */}
        {showUserDropdown && (
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setShowUserDropdown(false)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;