# Quick Guide: Enable Paid Appointments

## 🚀 When You're Ready to Enable Paid Appointments

Follow these steps in order:

### Step 1: Update Configuration (1 minute)
```javascript
// File: app/utils/bookingConfig.js
export const BOOKING_CONFIG = {
  ENABLE_PAID_APPOINTMENTS: true, // ← Change this to true
  RAZORPAY_KEY_ID: 'rzp_test_2rLW2LnoSMZI7t', // Update with production key
  CURRENCY: 'INR',
};
```

### Step 2: Update EstimateForm for Razorpay (5 minutes)

Add Razorpay integration to `app/components/EstimateForm.jsx`:

```javascript
import { openRazorpayModal, convertToPaise } from '../utils/razorpayHelper';

// In handleSubmit function, replace the paid flow section:
if (bookingType === 'paid' && BOOKING_CONFIG.ENABLE_PAID_APPOINTMENTS) {
  // Step 1: Create payment order
  const paymentData = {
    ...baseData,
    amount: convertToPaise(service.price), // Convert to paise
  };
  
  const orderResponse = await payAndBook(paymentData).unwrap();
  
  // Step 2: Open Razorpay modal
  openRazorpayModal(
    {
      orderId: orderResponse.orderId,
      amount: orderResponse.amount,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      description: service.serviceTitle,
    },
    // Success callback
    async (paymentResponse) => {
      try {
        // Step 3: Verify payment
        await verifyPayment(paymentResponse).unwrap();
        alert('Payment successful! Appointment confirmed.');
        onClose();
      } catch (error) {
        alert('Payment verification failed. Please contact support.');
      }
    },
    // Failure callback
    (error) => {
      alert('Payment failed: ' + error);
    }
  );
}
```

### Step 3: Add Razorpay Script to Layout (2 minutes)

Option A - Add to `app/layout.jsx`:
```javascript
<Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
```

Option B - Let the helper load it dynamically (already implemented in razorpayHelper.js)

### Step 4: Update Backend Endpoints (if needed)

Verify these endpoints match your backend:
- `/api/pay-and-book` - Should return `{ orderId, amount, ... }`
- `/api/payment/verify` - Should accept `{ orderId, paymentId, signature }`

### Step 5: Test Payment Flow

1. Use Razorpay test cards:
   - Success: `4111 1111 1111 1111`
   - CVV: Any 3 digits
   - Expiry: Any future date

2. Test scenarios:
   - ✅ Successful payment
   - ❌ Payment failure
   - ❌ Payment cancellation
   - ✅ Free service (should still use free flow)

### Step 6: Production Checklist

Before going live:
- [ ] Replace test Razorpay key with production key
- [ ] Test with real payment (small amount)
- [ ] Verify email notifications work
- [ ] Check appointment creation in database
- [ ] Test refund flow (if applicable)
- [ ] Add error logging/monitoring

## 🔄 Rollback Plan

If something goes wrong:
```javascript
// app/utils/bookingConfig.js
export const BOOKING_CONFIG = {
  ENABLE_PAID_APPOINTMENTS: false, // ← Set back to false
  // ...
};
```

All appointments will immediately revert to free flow.

## 📊 What Changes When Enabled

| Aspect | Before (Free) | After (Paid) |
|--------|---------------|--------------|
| Services with price > 0 | Free booking | Payment required |
| Services with price = 0 | Free booking | Free booking (unchanged) |
| API endpoint | `/api/book` | `/api/pay-and-book` → `/api/payment/verify` |
| User flow | 1 step | 3 steps (order → pay → verify) |
| Email | Immediate | After payment success |

## 🐛 Troubleshooting

### Payment modal doesn't open
- Check browser console for Razorpay script errors
- Verify `RAZORPAY_KEY_ID` is correct
- Check if script is loaded: `console.log(window.Razorpay)`

### Payment succeeds but appointment not created
- Check `/api/payment/verify` endpoint response
- Verify signature validation on backend
- Check backend logs for errors

### Email not received
- Verify backend email service is configured
- Check spam folder
- Test with `/api/book` endpoint directly

## 💡 Tips

1. **Test in staging first** - Don't enable directly in production
2. **Monitor closely** - Watch for failed payments in first few days
3. **Have support ready** - Users may need help with payment issues
4. **Keep free option** - Consider keeping "Get Free Estimate" for consultations

## 📞 Need Help?

Check these files:
- `app/components/EstimateForm.jsx` - Form logic
- `app/utils/bookingConfig.js` - Feature flag
- `app/utils/razorpayHelper.js` - Payment utilities
- `app/redux-toolkit/services/bookingApi.js` - API hooks

---

**Estimated Time to Enable**: 10-15 minutes
**Risk Level**: Low (feature-flagged, easy rollback)
**Testing Required**: Yes (use test cards first)
