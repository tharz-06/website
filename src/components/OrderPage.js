import React, { useMemo, useState, useEffect } from 'react';
import { ShoppingCart, Heart, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { getWishlist, getCart, saveCart, saveWishlist, saveOrder } from '../utils/wishlist';

const currencyToNumber = (str) => {
  if (!str) return 0;
  return parseInt(String(str).replace(/[^0-9]/g, '')) || 0;
};

const OrderPage = ({ onBack }) => {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    payment: 'cod', // 'cod' | 'online'
  });

  useEffect(() => {
    setWishlist(getWishlist());
    setCart(getCart());
  }, []);

  const items = useMemo(() => {
    // Merge cart and wishlist (unique by id); cart takes precedence
    const byId = new Map();
    [...wishlist, ...cart].forEach((i) => {
      if (!byId.has(i.id)) byId.set(i.id, i);
    });
    return Array.from(byId.values());
  }, [wishlist, cart]);

  const totals = useMemo(() => {
    const perDaySum = items.reduce((sum, it) => sum + currencyToNumber(it.price), 0);
    // Default duration 1 day per item (user can specify later per item if needed). Keeping scope minimal.
    const days = 1;
    const total = perDaySum * days;
    return { perDaySum, days, total };
  }, [items]);

  const placeOrder = (e) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.phone) return;
    
    console.log('=== ORDER PLACEMENT START ===');
    console.log('🛒 Items to order:', items);
    console.log('📝 Form data:', form);
    console.log('💰 Totals:', totals);
    
    // Check if items exist
    if (!items || items.length === 0) {
      console.error('❌ ERROR: No items in order!');
      alert('Error: No items to order. Please add items to your wishlist first.');
      return;
    }
    
    // Save order to localStorage
    console.log('💾 Saving order to localStorage...');
    const savedOrder = saveOrder({
      items: items,
      form: form,
      totals: totals,
    });
    
    if (savedOrder) {
      console.log('✅ Order saved successfully!');
      console.log('📦 Order ID:', savedOrder.id);
      console.log('📊 Order details:', savedOrder);
      
      // Verify it was saved
      const verify = localStorage.getItem('user_orders');
      console.log('🔍 Verification - localStorage now contains:', verify);
      
      alert(`✅ Order placed! ID: ${savedOrder.id}\n\nGo to "My Bookings" to see it.`);
    } else {
      console.error('❌ Failed to save order');
      alert('Error: Failed to save order. Check console for details.');
      return;
    }
    
    console.log('=== ORDER PLACEMENT END ===');
    
    // Clear cart and set placed state
    setPlaced(true);
    saveCart([]);
    setCart([]);
  };

  if (placed) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 min-h-[70vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-10 text-center">
            <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-green-600" size={56} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Your RentCam order has been placed successfully!</h2>
            <p className="text-gray-600 mb-6">We will contact you shortly with pickup/delivery details.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => {
                  // Navigate to bookings page
                  window.location.hash = 'bookings';
                  window.location.reload();
                }}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl"
              >
                View My Bookings
              </button>
              <button
                onClick={onBack}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="inline-flex items-center text-gray-700 hover:text-blue-600 font-medium">
            <ArrowLeft size={18} className="mr-2" /> Back
          </button>
          <div className="flex items-center gap-4 text-gray-600">
            <span className="inline-flex items-center"><Heart size={18} className="mr-1 text-pink-600" /> {wishlist.length}</span>
            <span className="inline-flex items-center"><ShoppingCart size={18} className="mr-1 text-blue-600" /> {cart.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Items in your Order</h3>
              {items.length === 0 ? (
                <div className="text-gray-600">No items yet. Add items to your wishlist or cart to order.</div>
              ) : (
                <div className="space-y-4">
                  {items.map((it) => (
                    <div key={it.id} className="flex items-center gap-4 border border-gray-200 rounded-xl p-3">
                      <img src={it.image} alt={it.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{it.name}</div>
                        <div className="text-sm text-gray-600 capitalize">{it.category}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-600 font-bold">{it.price}</div>
                        <div className="text-xs text-gray-500">per day</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Your Details</h3>
              <form onSubmit={placeOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">Address</label>
                  <textarea
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Full address"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Contact Number</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Phone number"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Payment Method</label>
                  <select
                    value={form.payment}
                    onChange={(e) => setForm({ ...form, payment: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="cod">Cash on Delivery</option>
                    <option value="online">Online Payment</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={items.length === 0}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-28">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                {items.map((it) => (
                  <div key={it.id} className="flex justify-between">
                    <span className="text-gray-700">{it.name}</span>
                    <span className="text-gray-800">{it.price}/day</span>
                  </div>
                ))}
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span>Duration</span>
                  <span>{totals.days} day(s)</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-green-600">₹{totals.total.toLocaleString()}</span>
                </div>
              </div>
              {items.some(i => i.deposit) && (
                <div className="mt-4 text-xs text-gray-600">
                  Note: Some items require a refundable security deposit.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderPage;
