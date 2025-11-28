import React, { useState } from 'react';
import { X, Eye, EyeOff, User, Mail, Lock, Phone, MapPin, Camera } from 'lucide-react';

const LoginPage = ({ onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: ''
  });

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock authentication - replace with real API call
      const mockUser = {
        id: 1,
        name: loginData.email.split('@')[0],
        email: loginData.email,
        profilePicture: null
      };
      
      // Store user data in localStorage (replace with proper token handling)
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('isAuthenticated', 'true');
      
      setIsLoading(false);
      onLoginSuccess(mockUser);
    }, 2000);
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newUser = {
        id: Date.now(),
        name: `${signupData.firstName} ${signupData.lastName}`,
        email: signupData.email,
        phone: signupData.phone,
        profilePicture: null
      };
      
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('isAuthenticated', 'true');
      
      setIsLoading(false);
      onLoginSuccess(newUser);
    }, 2000);
  };

  // Handle Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Password reset link sent to your email!');
      setActiveTab('login');
    }, 2000);
  };

  // Floating elements animation
  const FloatingElement = ({ icon: Icon, className, delay = 0 }) => (
    <div className={`absolute ${className} animate-bounce opacity-20`} style={{ animationDelay: `${delay}s` }}>
      <Icon size={24} className="text-blue-300" />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 z-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background Elements */}
      <FloatingElement icon={Camera} className="top-20 left-20" delay={0} />
      <FloatingElement icon={MapPin} className="top-40 right-32" delay={1} />
      <FloatingElement icon={Camera} className="bottom-32 left-40" delay={2} />
      <FloatingElement icon={MapPin} className="bottom-20 right-20" delay={0.5} />
      
      {/* Background Blur Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>

      {/* Main Container */}
      <div className="relative bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/20">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10 p-2 rounded-full hover:bg-gray-100"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center pt-12 pb-8 px-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <Camera size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome to LensRent Hub
          </h1>
          <p className="text-gray-600">Rent pro cameras, lenses & gear</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-100 rounded-2xl mx-8 p-1 mb-8">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'login'
                ? 'bg-white text-blue-600 shadow-md transform scale-105'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'signup'
                ? 'bg-white text-blue-600 shadow-md transform scale-105'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="px-8 pb-8 space-y-6">
            <div className="relative">
              <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                placeholder="Enter your email"
              />
            </div>
            
            <div className="relative">
              <Lock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setActiveTab('forgot')}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        )}

        {/* Signup Form */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignup} className="px-8 pb-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={signupData.firstName}
                  onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  placeholder="First Name"
                />
              </div>
              <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={signupData.lastName}
                  onChange={(e) => setSignupData({...signupData, lastName: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="relative">
              <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={signupData.email}
                onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                placeholder="Email Address"
              />
            </div>

            <div className="relative">
              <Phone size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                required
                value={signupData.phone}
                onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                placeholder="Phone Number"
              />
            </div>

            <div className="relative">
              <Lock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={signupData.password}
                onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <Lock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={signupData.confirmPassword}
                onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <label className="flex items-start">
              <input type="checkbox" required className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1" />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the <span className="text-blue-600 hover:text-blue-800 font-medium">Terms & Conditions</span> and <span className="text-blue-600 hover:text-blue-800 font-medium">Privacy Policy</span>
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        )}

        {/* Forgot Password Form */}
        {activeTab === 'forgot' && (
          <div className="px-8 pb-8 space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Reset Your Password</h3>
              <p className="text-gray-600 text-sm">Enter your email address and we'll send you a link to reset your password</p>
            </div>

            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={forgotPasswordData.email}
                  onChange={(e) => setForgotPasswordData({...forgotPasswordData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  placeholder="Enter your email"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending Reset Link...
                  </span>
                ) : (
                  'Send Reset Link'
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="w-full text-gray-600 hover:text-gray-800 font-medium py-2"
              >
                Back to Login
              </button>
            </form>
          </div>
        )}

        {/* Social Login Options */}
        {(activeTab === 'login' || activeTab === 'signup') && (
          <div className="px-8 pb-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-3 px-4 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300 hover:scale-105">
                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="ml-2">Google</span>
              </button>

              <button className="w-full inline-flex justify-center py-3 px-4 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300 hover:scale-105">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;