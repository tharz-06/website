import React, { useState, useEffect } from 'react';
import { ArrowLeft, Package, Calendar, MapPin, Phone, CreditCard, CheckCircle, Clock, XCircle } from 'lucide-react';
import { getOrders } from '../utils/wishlist';

const MyBookingsPage = ({ onBack }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load orders function
  const loadOrders = () => {
    console.log('🔄 Loading orders...');
    setLoading(true);
    
    // Direct localStorage read
    const raw = localStorage.getItem('user_orders');
    console.log('🔍 Raw localStorage:', raw);
    
    if (!raw || raw === 'null' || raw === 'undefined') {
      console.log('⚠️ No orders in localStorage');
      setOrders([]);
      setLoading(false);
      return;
    }
    
    try {
      const parsed = JSON.parse(raw);
      console.log('✅ Parsed orders:', parsed);
      console.log('📊 Total orders:', parsed.length);
      setOrders(Array.isArray(parsed) ? parsed : []);
    } catch (error) {
      console.error('❌ Error parsing orders:', error);
      setOrders([]);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    // Load immediately
    loadOrders();
    
    // Set up interval to check for updates every second
    const interval = setInterval(() => {
      const currentRaw = localStorage.getItem('user_orders');
      const currentOrders = currentRaw ? JSON.parse(currentRaw) : [];
      if (currentOrders.length !== orders.length) {
        console.log('🔄 Orders changed, reloading...');
        loadOrders();
      }
    }, 1000);
    
    // Listen for custom events
    const handleCustomUpdate = () => {
      console.log('🔄 Custom event triggered');
      loadOrders();
    };
    window.addEventListener('ordersUpdated', handleCustomUpdate);
    
    // Listen for storage events
    const handleStorageChange = (e) => {
      if (e.key === 'user_orders') {
        console.log('🔄 Storage event triggered');
        loadOrders();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('ordersUpdated', handleCustomUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [orders.length]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'pending':
        return <Clock className="text-yellow-600" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-600" size={20} />;
      default:
        return <Package className="text-blue-600" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="inline-flex items-center text-gray-700 hover:text-blue-600 font-medium">
            <ArrowLeft size={18} className="mr-2" /> Back
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">My Bookings</h1>
          <div className="w-20"></div>
        </div>

        {loading ? (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-16 text-center">
            <div className="text-6xl mb-4">⏳</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Loading bookings...</h3>
          </div>
        ) : orders.length === 0 ? (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-16 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-6">Start renting camera gear to see your orders here.</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-800 mb-2">🔍 Debug Info (Check Console F12):</p>
              <button
                onClick={() => {
                  const raw = localStorage.getItem('user_orders');
                  console.log('=== MANUAL DEBUG ===');
                  console.log('Raw data:', raw);
                  if (raw) {
                    const parsed = JSON.parse(raw);
                    console.log('Parsed:', parsed);
                    console.log('Length:', parsed.length);
                    alert(`Found ${parsed.length} orders in localStorage. Check console for details.`);
                  } else {
                    alert('No orders found in localStorage. Place an order first!');
                  }
                }}
                className="text-xs bg-yellow-200 hover:bg-yellow-300 px-3 py-1 rounded"
              >
                Check localStorage
              </button>
            </div>
            <button
              onClick={() => {
                console.log('🔄 Manual refresh clicked');
                loadOrders();
              }}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium mr-3 hover:bg-gray-300"
            >
              🔄 Refresh
            </button>
            <button
              onClick={onBack}
              className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl"
            >
              Browse Gear
            </button>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b border-gray-200">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-lg shadow">
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Order ID: #{order.id}</div>
                        <div className="text-xs text-gray-500">{formatDate(order.date)}</div>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full border font-medium capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                        <Package size={18} className="mr-2 text-blue-600" />
                        Items Ordered
                      </h4>
                      <div className="space-y-2">
                        {order.items && order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-gray-800">{item.name}</div>
                              <div className="text-xs text-gray-600">{item.price}/day</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                          <MapPin size={18} className="mr-2 text-blue-600" />
                          Delivery Details
                        </h4>
                        <div className="bg-gray-50 p-3 rounded-lg text-sm">
                          <div className="font-medium text-gray-800">{order.form?.name}</div>
                          <div className="text-gray-600 mt-1">{order.form?.address}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center text-xs text-gray-600 mb-1">
                            <Phone size={14} className="mr-1" /> Contact
                          </div>
                          <div className="text-sm font-medium text-gray-800">{order.form?.phone}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center text-xs text-gray-600 mb-1">
                            <CreditCard size={14} className="mr-1" /> Payment
                          </div>
                          <div className="text-sm font-medium text-gray-800 capitalize">{order.form?.payment === 'cod' ? 'Cash on Delivery' : 'Online'}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} />
                      <span>Duration: {order.totals?.days || 1} day(s)</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Total Amount</div>
                      <div className="text-2xl font-bold text-green-600">₹{order.totals?.total?.toLocaleString() || '0'}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyBookingsPage;
