// LocalStorage helpers for Wishlist and Cart
const WISHLIST_KEY = 'wishlist_items';
const CART_KEY = 'cart_items';

export const getWishlist = () => {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveWishlist = (items) => {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  } catch {}
};

export const toggleWishlistItem = (item) => {
  const list = getWishlist();
  const exists = list.find((i) => i.id === item.id);
  let updated;
  if (exists) {
    updated = list.filter((i) => i.id !== item.id);
  } else {
    // store minimal fields to keep storage light
    const copy = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      location: item.location,
      deposit: item.deposit || null,
    };
    updated = [copy, ...list];
  }
  saveWishlist(updated);
  return updated;
};

export const isWishlisted = (id) => {
  return getWishlist().some((i) => i.id === id);
};

export const clearWishlist = () => saveWishlist([]);

export const getCart = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveCart = (items) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {}
};

// Orders management
const ORDERS_KEY = 'user_orders';

export const getOrders = () => {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveOrder = (orderData) => {
  try {
    const orders = getOrders();
    const newOrder = {
      id: Date.now(),
      ...orderData,
      date: new Date().toISOString(),
      status: 'pending',
    };
    orders.unshift(newOrder);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    console.log('✅ Order saved successfully:', newOrder);
    console.log('📦 Total orders in storage:', orders.length);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('ordersUpdated'));
    
    return newOrder;
  } catch (error) {
    console.error('❌ Error saving order:', error);
    return null;
  }
};
