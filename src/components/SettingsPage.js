import React, { useState } from 'react';
import { ArrowLeft, Bell, Lock, Globe, Moon, Trash2, Shield, CreditCard } from 'lucide-react';

const SettingsPage = ({ onBack }) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotions: false,
    darkMode: false,
    language: 'en',
  });

  const handleToggle = (key) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    localStorage.setItem('user_settings', JSON.stringify(updated));
  };

  const handleClearData = (type) => {
    if (window.confirm(`Are you sure you want to clear all ${type}?`)) {
      switch (type) {
        case 'wishlist':
          localStorage.removeItem('wishlist_items');
          alert('Wishlist cleared successfully!');
          break;
        case 'cart':
          localStorage.removeItem('cart_items');
          alert('Cart cleared successfully!');
          break;
        case 'orders':
          localStorage.removeItem('user_orders');
          alert('Order history cleared successfully!');
          break;
        default:
          break;
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="inline-flex items-center text-gray-700 hover:text-blue-600 font-medium">
            <ArrowLeft size={18} className="mr-2" /> Back
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Settings</h1>
          <div className="w-20"></div>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Bell size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Notifications</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-800">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive updates via email</p>
                </div>
                <button
                  onClick={() => handleToggle('emailNotifications')}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.emailNotifications ? 'translate-x-7' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-800">SMS Notifications</p>
                  <p className="text-sm text-gray-600">Receive updates via SMS</p>
                </div>
                <button
                  onClick={() => handleToggle('smsNotifications')}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    settings.smsNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.smsNotifications ? 'translate-x-7' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-800">Order Updates</p>
                  <p className="text-sm text-gray-600">Get notified about order status</p>
                </div>
                <button
                  onClick={() => handleToggle('orderUpdates')}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    settings.orderUpdates ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.orderUpdates ? 'translate-x-7' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-800">Promotions & Offers</p>
                  <p className="text-sm text-gray-600">Receive promotional emails</p>
                </div>
                <button
                  onClick={() => handleToggle('promotions')}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    settings.promotions ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.promotions ? 'translate-x-7' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Moon size={24} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Appearance</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-800">Dark Mode</p>
                  <p className="text-sm text-gray-600">Switch to dark theme</p>
                </div>
                <button
                  onClick={() => handleToggle('darkMode')}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    settings.darkMode ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.darkMode ? 'translate-x-7' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-2 rounded-lg">
                <Shield size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Privacy & Security</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <Lock size={20} className="text-gray-600" />
                  <span className="font-semibold text-gray-800">Change Password</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCard size={20} className="text-gray-600" />
                  <span className="font-semibold text-gray-800">Payment Methods</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-100 p-2 rounded-lg">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Data Management</h3>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => handleClearData('wishlist')}
                className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
              >
                <span className="font-semibold text-red-700">Clear Wishlist</span>
                <Trash2 size={18} className="text-red-600" />
              </button>
              <button
                onClick={() => handleClearData('cart')}
                className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
              >
                <span className="font-semibold text-red-700">Clear Cart</span>
                <Trash2 size={18} className="text-red-600" />
              </button>
              <button
                onClick={() => handleClearData('orders')}
                className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
              >
                <span className="font-semibold text-red-700">Clear Order History</span>
                <Trash2 size={18} className="text-red-600" />
              </button>
            </div>
          </div>

          {/* Language */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Globe size={24} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Language</h3>
            </div>
            <select
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="te">తెలుగు (Telugu)</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsPage;
