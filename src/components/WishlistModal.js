import React, { useEffect, useState } from 'react';
import { X, Trash2, Heart, ShoppingCart } from 'lucide-react';
import { getWishlist, toggleWishlistItem, clearWishlist, getCart, saveCart } from '../utils/wishlist';

const WishlistModal = ({ onClose, onProceedToOrder }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getWishlist());
  }, []);

  const handleToggle = (item) => {
    const updated = toggleWishlistItem(item);
    setItems(updated);
  };

  const handleClear = () => {
    clearWishlist();
    setItems([]);
  };

  const moveAllToCart = () => {
    const cart = getCart();
    const merged = [...items, ...cart.filter(c => !items.some(i => i.id === c.id))];
    saveCart(merged);
    onProceedToOrder();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Your Wishlist</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
              <X size={24} />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">💜</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No items in wishlist</h3>
              <p className="text-gray-600">Tap the heart icon on any item to add it here.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {items.map(item => (
                  <div key={item.id} className="border border-gray-200 rounded-xl p-4 flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600 capitalize">{item.category}</p>
                      <p className="text-green-600 font-semibold">{item.price} <span className="text-sm text-gray-600">/day</span></p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleToggle(item)} className="px-3 py-2 rounded-lg bg-pink-50 text-pink-700 border border-pink-200 hover:bg-pink-100">
                        <Heart size={18} />
                      </button>
                      <button onClick={() => handleToggle(item)} className="px-3 py-2 rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-100">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                <button onClick={handleClear} className="w-full md:w-auto px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium">Clear Wishlist</button>
                <button onClick={moveAllToCart} className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl flex items-center">
                  <ShoppingCart size={18} className="mr-2" /> Proceed to Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistModal;
