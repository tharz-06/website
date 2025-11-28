# 🧪 Step-by-Step Booking Test

## ✅ Follow These Exact Steps:

### Step 1: Clear Everything
```javascript
// Open browser console (F12) and run:
localStorage.clear();
// Then refresh the page
```

### Step 2: Login
1. Click "Sign In" button
2. Login with your credentials
3. Verify you see your name in the header

### Step 3: Add to Wishlist
1. Go to "Gear" page
2. Find "Canon EOS R5 Body"
3. Click the ❤️ (heart) icon
4. Heart should turn RED
5. **Check console** - should see wishlist logs

### Step 4: Open Wishlist
1. Click your profile dropdown (top right)
2. Click "Wishlist"
3. Should see Canon EOS R5 in the modal
4. **Verify**: Item shows with image, name, price

### Step 5: Proceed to Order
1. In Wishlist modal, click "Proceed to Order" button
2. Should navigate to Order Page
3. **Verify**: Canon EOS R5 appears in "Items in your Order" section
4. **Check console** - should see items loaded

### Step 6: Fill Order Form
Fill ALL fields:
- **Name**: John Doe
- **Address**: 123 Main Street, City, 12345
- **Phone**: 9876543210
- **Payment**: Cash on Delivery

### Step 7: Place Order
1. Click "Place Order" button
2. **Watch console carefully** - should see:
   ```
   === ORDER PLACEMENT START ===
   🛒 Items to order: [{...}]
   📝 Form data: {...}
   💰 Totals: {...}
   💾 Saving order to localStorage...
   ✅ Order saved successfully!
   📦 Order ID: 1234567890
   🔍 Verification - localStorage now contains: [...]
   === ORDER PLACEMENT END ===
   ```
3. Should see alert: "✅ Order placed! ID: ..."
4. Click OK on alert
5. Should see success page

### Step 8: Go to My Bookings
**Option A**: Click green "View My Bookings" button

**Option B**: 
1. Click your profile dropdown
2. Click "My Bookings"

### Step 9: Verify Booking Shows
**Expected**: Should see your order with:
- Order ID
- Date/Time
- Status: "pending"
- Canon EOS R5 with image
- Your name and address
- Phone number
- Payment method
- Total: ₹5,499

**If "No bookings yet" shows**:
1. Click "Check localStorage" button (yellow box)
2. Check console for debug info
3. Click "🔄 Refresh" button

---

## 🐛 If Booking Still Doesn't Show:

### Debug Check 1: Console Logs
After placing order, console should show:
- ✅ "Order saved successfully"
- ✅ "Order ID: ..."
- ✅ "Verification - localStorage now contains: [...]"

If you see ❌ errors, copy them and share.

### Debug Check 2: Manual localStorage Check
In console, run:
```javascript
localStorage.getItem('user_orders')
```

**Should return**: String with order data like `[{"id":123...}]`
**If returns**: `null` - Order was NOT saved

### Debug Check 3: Parse and Count
In console, run:
```javascript
const orders = JSON.parse(localStorage.getItem('user_orders'));
console.log('Total orders:', orders.length);
console.log('First order:', orders[0]);
```

**Should show**: Total orders: 1 (or more)

### Debug Check 4: Items Check
When placing order, console should show:
```
🛒 Items to order: [{id: 1, name: "Canon EOS R5"...}]
```

**If shows empty array `[]`**: 
- Items weren't added to order
- Go back and add to wishlist first

---

## 📸 What to Share If Still Not Working:

1. **Screenshot of console** after placing order
2. **Console output** of:
   ```javascript
   localStorage.getItem('user_orders')
   ```
3. **Any error messages** in console (red text)
4. **Screenshot** of "No bookings yet" page

---

## ✅ Expected Full Flow:

```
1. Add to Wishlist ❤️
   ↓
2. Wishlist shows item ✅
   ↓
3. Proceed to Order
   ↓
4. Order page shows item ✅
   ↓
5. Fill form
   ↓
6. Place Order
   ↓
7. Console: "Order saved successfully" ✅
   ↓
8. Alert: "Order placed! ID: ..." ✅
   ↓
9. Success page shows ✅
   ↓
10. Go to My Bookings
   ↓
11. Order appears with details ✅
```

---

## 🎯 Quick Test (Copy to Console):

```javascript
// Run this AFTER placing an order
console.log('=== BOOKING TEST ===');
const raw = localStorage.getItem('user_orders');
console.log('1. Raw data exists:', raw !== null);
if (raw) {
  const orders = JSON.parse(raw);
  console.log('2. Total orders:', orders.length);
  console.log('3. First order ID:', orders[0]?.id);
  console.log('4. First order items:', orders[0]?.items?.length);
  console.log('5. Customer name:', orders[0]?.form?.name);
  console.log('✅ Orders are saved correctly!');
} else {
  console.log('❌ No orders found - order was not saved');
}
```

Follow these steps exactly and share the console output!
