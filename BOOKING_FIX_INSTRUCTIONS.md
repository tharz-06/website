# 🔧 Booking Not Showing - Complete Fix Guide

## 🧪 Step 1: Test localStorage Directly

1. **Open the test file**:
   - Open `TEST_BOOKING.html` in your browser
   - Click "Create Test Booking"
   - Click "View All Bookings"
   - You should see the test order

2. **If test works**, localStorage is fine. The issue is in the React app.

3. **If test doesn't work**, localStorage might be disabled in your browser.

---

## 🔍 Step 2: Check Browser Console

1. **Open your RentCam website**
2. **Press F12** to open Developer Tools
3. **Go to Console tab**
4. **Place an order** and watch for these logs:

### ✅ Expected Logs When Placing Order:
```
🛒 Placing order with items: [...]
📝 Form data: {...}
💰 Totals: {...}
✅ Order saved successfully: {...}
📦 Total orders in storage: 1
✅ Order placed successfully! ID: 1234567890
```

### ✅ Expected Logs When Opening My Bookings:
```
📦 My Bookings - Loaded orders: [...]
📊 Total orders found: 1
✅ First order: {...}
```

### ❌ Problem Indicators:
```
⚠️ No orders found in localStorage
🔍 Raw localStorage data: null
❌ Failed to save order
❌ Error saving order: ...
```

---

## 🛠️ Step 3: Manual localStorage Check

**In browser console, type:**

```javascript
// Check if orders exist
localStorage.getItem('user_orders')

// Should return something like:
// '[{"id":1234567890,"date":"2025-10-07...","status":"pending",...}]'

// If it returns null, orders aren't being saved
```

**Create a test order manually:**

```javascript
// Copy and paste this in console:
const testOrder = {
  id: Date.now(),
  date: new Date().toISOString(),
  status: 'pending',
  items: [{
    id: 1,
    name: 'Test Camera',
    price: '₹1,000',
    image: '/test.jpg',
    category: 'cameras'
  }],
  form: {
    name: 'Test User',
    address: 'Test Address',
    phone: '1234567890',
    payment: 'cod'
  },
  totals: {
    days: 1,
    total: 1000
  }
};

localStorage.setItem('user_orders', JSON.stringify([testOrder]));

// Then refresh My Bookings page
```

---

## 🚀 Step 4: Quick Fixes

### Fix 1: Clear Everything and Start Fresh

```javascript
// In browser console:
localStorage.clear();
// Then place a new order
```

### Fix 2: Force Page Reload After Order

After placing an order:
1. Click "View My Bookings" button (green button)
2. This will reload the page and show bookings

### Fix 3: Check if Logged In

- Make sure you're logged in
- The user dropdown should show your name
- If not logged in, click "Sign In" first

---

## 🔧 Step 5: Code-Level Fixes

### Check 1: Verify Items Array

The order needs items to be saved. Check in console:

```javascript
// When placing order, you should see:
🛒 Placing order with items: [{...}]  // Should have at least 1 item

// If items is empty [], the order might not save properly
```

### Check 2: Verify Form Data

```javascript
// Should see:
📝 Form data: {name: "...", address: "...", phone: "...", payment: "..."}

// All fields should have values
```

---

## 📋 Step 6: Complete Test Flow

1. **Add to Wishlist**:
   - Go to Gear page
   - Click ❤️ on "Canon EOS R5"
   - Heart should turn red

2. **Open Wishlist**:
   - Click your profile dropdown
   - Click "Wishlist"
   - Should see Canon EOS R5

3. **Proceed to Order**:
   - Click "Proceed to Order" button
   - Should navigate to Order page
   - Should see Canon EOS R5 in items list

4. **Fill Form**:
   - Name: "John Doe"
   - Address: "123 Main St"
   - Phone: "9876543210"
   - Payment: "Cash on Delivery"

5. **Place Order**:
   - Click "Place Order"
   - Watch console for success logs
   - Should see success message

6. **View Bookings**:
   - Click green "View My Bookings" button
   - OR click profile → "My Bookings"
   - Should see your order

---

## 🐛 Common Issues & Solutions

### Issue 1: "No bookings yet" shows even after order

**Solution A**: Force refresh
```javascript
// In console:
window.location.reload();
```

**Solution B**: Check if order was saved
```javascript
// In console:
JSON.parse(localStorage.getItem('user_orders'))
// Should return array with your orders
```

### Issue 2: Order page shows no items

**Cause**: Wishlist/cart is empty

**Solution**: 
1. Go back to Gear page
2. Add items to wishlist first
3. Then proceed to order

### Issue 3: localStorage is null

**Cause**: Browser privacy settings or incognito mode

**Solution**:
1. Check if you're in incognito/private mode
2. Try regular browser window
3. Check browser settings for localStorage

### Issue 4: Console shows errors

**Common Errors**:
- `Cannot read property 'map' of undefined` → items array is missing
- `localStorage is not defined` → Browser doesn't support localStorage
- `JSON.parse error` → Corrupted data in localStorage

**Solution**: Clear localStorage and try again

---

## ✅ Verification Checklist

After placing an order, verify:

- [ ] Console shows "✅ Order saved successfully"
- [ ] Console shows "📦 Total orders in storage: 1" (or more)
- [ ] localStorage.getItem('user_orders') returns data
- [ ] My Bookings page shows the order
- [ ] Order details are correct (name, items, total)
- [ ] Order status shows "pending"
- [ ] Order date/time is shown

---

## 🎯 Final Test Script

**Copy this entire script into browser console:**

```javascript
// Complete Booking Test
console.log('🧪 Starting Booking Test...');

// 1. Check localStorage
const orders = localStorage.getItem('user_orders');
console.log('📦 Current orders:', orders);

// 2. Create test order
const testOrder = {
  id: Date.now(),
  date: new Date().toISOString(),
  status: 'pending',
  items: [{
    id: 1,
    name: 'Test Camera - Canon EOS R5',
    price: '₹5,499',
    image: '/image/test.jpg',
    category: 'cameras',
    location: 'Full-frame Mirrorless',
    deposit: '₹30,000'
  }],
  form: {
    name: 'Test User',
    address: '123 Test Street, Test City, 12345',
    phone: '9876543210',
    payment: 'cod'
  },
  totals: {
    perDaySum: 5499,
    days: 1,
    total: 5499
  }
};

// 3. Save order
const existingOrders = orders ? JSON.parse(orders) : [];
existingOrders.unshift(testOrder);
localStorage.setItem('user_orders', JSON.stringify(existingOrders));

console.log('✅ Test order created!');
console.log('📊 Total orders:', existingOrders.length);
console.log('🔍 First order:', existingOrders[0]);

// 4. Verify
const saved = JSON.parse(localStorage.getItem('user_orders'));
console.log('✅ Verification - Orders in storage:', saved.length);

alert('✅ Test order created! Now go to My Bookings page to see it.');
```

---

## 📞 Still Not Working?

If bookings still don't show after all these steps:

1. **Share console logs**: Copy all console messages
2. **Check browser**: Try different browser (Chrome, Firefox, Edge)
3. **Check localStorage**: Share output of `localStorage.getItem('user_orders')`
4. **Try test file**: Open TEST_BOOKING.html and see if that works

The console logs will tell us exactly where the problem is!
