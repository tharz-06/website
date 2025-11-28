
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validatePhone = (phone) => {
  // Indian phone number format
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

// Password strength checker
export const getPasswordStrength = (password) => {
  let strength = 0;
  const checks = [
    /.{8,}/, // At least 8 characters
    /[a-z]/, // Lowercase letter
    /[A-Z]/, // Uppercase letter
    /\d/, // Number
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/ // Special character
  ];
  
  checks.forEach(check => {
    if (check.test(password)) strength++;
  });
  
  if (strength < 2) return { level: 'weak', color: 'red' };
  if (strength < 4) return { level: 'medium', color: 'yellow' };
  return { level: 'strong', color: 'green' };
};

// Local storage helpers
export const setAuthData = (user, token = null) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('isAuthenticated', 'true');
  if (token) {
    localStorage.setItem('authToken', token);
  }
};

export const getAuthData = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const token = localStorage.getItem('authToken');
  
  return { isAuthenticated, user, token };
};

export const clearAuthData = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('authToken');
};

// Session timeout (optional)
export const setSessionTimeout = (callback, minutes = 30) => {
  const timeout = minutes * 60 * 1000; // Convert to milliseconds
  
  const resetTimer = () => {
    clearTimeout(window.sessionTimer);
    window.sessionTimer = setTimeout(() => {
      clearAuthData();
      callback();
    }, timeout);
  };
  
  // Reset timer on user activity
  ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetTimer, true);
  });
  
  // Initial timer
  resetTimer();
};

// Mock API functions (replace with real API calls)
export const loginAPI = async (email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock authentication logic
  if (email === 'demo@gtholidays.com' && password === 'password123') {
    return {
      success: true,
      user: {
        id: 1,
        name: 'Demo User',
        email: email,
        phone: '+91 98765 43210',
        profilePicture: null,
        joinedDate: new Date().toISOString()
      },
      token: 'mock_jwt_token_' + Date.now()
    };
  }
  
  // Mock failed login
  throw new Error('Invalid email or password');
};

export const signupAPI = async (userData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock validation
  if (!validateEmail(userData.email)) {
    throw new Error('Invalid email address');
  }
  
  if (!validatePassword(userData.password)) {
    throw new Error('Password must be at least 8 characters with uppercase, lowercase, and number');
  }
  
  // Mock successful signup
  return {
    success: true,
    user: {
      id: Date.now(),
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      phone: userData.phone,
      profilePicture: null,
      joinedDate: new Date().toISOString()
    },
    token: 'mock_jwt_token_' + Date.now()
  };
};

export const forgotPasswordAPI = async (email) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  if (!validateEmail(email)) {
    throw new Error('Invalid email address');
  }
  
  // Mock successful response
  return {
    success: true,
    message: 'Password reset link sent to your email'
  };
};

// Form validation helper
export const validateForm = (formData, type = 'login') => {
  const errors = {};
  
  if (type === 'login') {
    if (!formData.email) errors.email = 'Email is required';
    else if (!validateEmail(formData.email)) errors.email = 'Invalid email format';
    
    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
  }
  
  if (type === 'signup') {
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    
    if (!formData.email) errors.email = 'Email is required';
    else if (!validateEmail(formData.email)) errors.email = 'Invalid email format';
    
    if (!formData.phone) errors.phone = 'Phone number is required';
    else if (!validatePhone(formData.phone)) errors.phone = 'Invalid phone number';
    
    if (!formData.password) errors.password = 'Password is required';
    else if (!validatePassword(formData.password)) {
      errors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Demo credentials for testing
export const demoCredentials = {
  email: 'demo@gtholidays.com',
  password: 'password123'
};