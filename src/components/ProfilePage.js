import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Edit2, Save } from 'lucide-react';

const ProfilePage = ({ onBack, user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    joinedDate: user?.joinedDate || new Date().toISOString(),
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        joinedDate: user.joinedDate || new Date().toISOString(),
      });
    }
  }, [user]);

  const handleSave = () => {
    // Update user data in localStorage
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    if (onUpdateUser) onUpdateUser(updatedUser);
    setIsEditing(false);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getUserInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="inline-flex items-center text-gray-700 hover:text-blue-600 font-medium">
            <ArrowLeft size={18} className="mr-2" /> Back
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">My Profile</h1>
          <div className="w-20"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {getUserInitials(formData.name)}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">{formData.name}</h2>
              <p className="text-blue-100">{formData.email}</p>
            </div>

            {/* Profile Details */}
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium"
                  >
                    <Edit2 size={16} className="mr-2" /> Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg font-medium"
                    >
                      <Save size={16} className="mr-2" /> Save Changes
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <User size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="font-semibold text-gray-800">{formData.name}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Mail size={20} className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-600 mb-1 block">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="font-semibold text-gray-800">{formData.email}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Phone size={20} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-600 mb-1 block">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter phone number"
                      />
                    ) : (
                      <p className="font-semibold text-gray-800">{formData.phone || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <MapPin size={20} className="text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-600 mb-1 block">Address</label>
                    {isEditing ? (
                      <textarea
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your address"
                        rows="2"
                      />
                    ) : (
                      <p className="font-semibold text-gray-800">{formData.address || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="bg-pink-100 p-2 rounded-lg">
                    <Calendar size={20} className="text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-600 mb-1 block">Member Since</label>
                    <p className="font-semibold text-gray-800">{formatDate(formData.joinedDate)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
