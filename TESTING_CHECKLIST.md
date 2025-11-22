# Appointment Booking - Testing Checklist

## 🧪 Pre-Deployment Testing

### 1. Visual Testing
- [ ] Navigate to any service detail page (e.g., `/services/[any-service-slug]`)
- [ ] Verify "Get Free Estimate" button appears next to "Book This Service"
- [ ] Button styling matches design (border, hover effects)
- [ ] Both buttons are properly aligned

### 2. Modal Functionality
- [ ] Click "Get Free Estimate" button
- [ ] Modal opens with backdrop overlay
- [ ] Modal is centered on screen
- [ ] Modal is scrollable if content overflows
- [ ] Service title appears in modal header
- [ ] Click backdrop → Modal closes
- [ ] Click X button → Modal closes
- [ ] Press ESC key → Modal closes (if implemented)

### 3. Form Validation
- [ ] Try submitting empty form → Should show validation errors
- [ ] Name field: Required, accepts text
- [ ] Email field: Required, validates email format
- [ ] Phone field: Optional, accepts numbers
- [ ] Date field: Required, shows date picker
- [ ] Try selecting past date → Should be blocked
- [ ] Time field: Required, shows time picker
- [ ] Additional details: Optional, accepts multiline text

### 4. Form Submission (Free Appointment)
- [ ] Fill all required fields with valid data
- [ ] Click "Book Estimate"
- [ ] Button shows "Booking..." during submission
- [ ] Button is disabled during submission
- [ ] Success: Alert shows "Appointment booked successfully!"
- [ ] Success: Modal closes automatically
- [ ] Success: Form resets (fields cleared)
- [ ] Check email for confirmation (backend sends it)

### 5. Error Handling
- [ ] Disconnect internet → Try submitting
- [ ] Should show error message
- [ ] Modal should stay open
- [ ] Form data should be preserved
- [ ] Reconnect → Try again → Should work

### 6. Responsive Design
- [ ] Test on mobile (< 768px)
  - [ ] Modal fits screen
  - [ ] Form fields are usable
  - [ ] Buttons are tappable
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (> 1024px)

### 7. Browser Compatibility
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browsers

## 🔧 Developer Testing

### 8. Redux DevTools
- [ ] Open Redux DevTools
- [ ] Click "Get Free Estimate"
- [ ] Submit form
- [ ] Verify action: `bookingApi/executeQuery/pending`
- [ ] Verify action: `bookingApi/executeQuery/fulfilled`
- [ ] Check payload structure matches backend requirements

### 9. Network Tab
- [ ] Open browser DevTools → Network tab
- [ ] Submit appointment form
- [ ] Verify POST request to `/api/book`
- [ ] Check request payload:
  ```json
  {
    "serviceId": "...",
    "userId": "000000000000000000000000",
    "name": "...",
    "date": "...",
    "time": "...",
    "serviceDetails": "...",
    "amount": "0",
    "paymentStatus": "free"
  }
  ```
- [ ] Verify response status: 200 or 201
- [ ] Check response contains appointment data

### 10. Console Errors
- [ ] Open browser console
- [ ] Navigate through entire flow
- [ ] Verify no errors or warnings
- [ ] Check for any React warnings

### 11. Configuration Testing
- [ ] Check `app/utils/bookingConfig.js`
- [ ] Verify `ENABLE_PAID_APPOINTMENTS: false`
- [ ] Verify Razorpay key is present
- [ ] Test `getBookingType()` function:
  ```javascript
  getBookingType(0) // Should return 'free'
  getBookingType(1000) // Should return 'free' (flag is off)
  ```

## 📊 Backend Verification

### 12. Database Check
- [ ] Submit test appointment
- [ ] Check database for new appointment record
- [ ] Verify all fields are saved correctly
- [ ] Verify `paymentStatus: 'free'`
- [ ] Verify `amount: '0'`

### 13. Email Verification
- [ ] Use real email address in form
- [ ] Submit appointment
- [ ] Check inbox for confirmation email
- [ ] Verify email contains:
  - [ ] User name
  - [ ] Service title
  - [ ] Date and time
  - [ ] Appointment details
- [ ] Check spam folder if not in inbox

## 🚀 Production Readiness

### 14. Performance
- [ ] Modal opens quickly (< 100ms)
- [ ] Form submission completes in reasonable time
- [ ] No layout shifts when modal opens
- [ ] No memory leaks (check DevTools Memory tab)

### 15. Accessibility
- [ ] Tab through form fields → Proper focus order
- [ ] Required fields have proper labels
- [ ] Error messages are readable
- [ ] Modal can be closed with keyboard
- [ ] Color contrast is sufficient

### 16. Edge Cases
- [ ] Submit form multiple times quickly → Should handle gracefully
- [ ] Open multiple modals (if possible) → Should prevent
- [ ] Very long service title → Should not break layout
- [ ] Very long service details → Should handle properly
- [ ] Special characters in name → Should accept
- [ ] International characters → Should accept

## 🔄 Future Testing (When Paid Appointments Enabled)

### 17. Payment Flow (After Enabling)
- [ ] Set `ENABLE_PAID_APPOINTMENTS: true`
- [ ] Select service with price > 0
- [ ] Submit form
- [ ] Verify Razorpay modal opens
- [ ] Use test card: 4111 1111 1111 1111
- [ ] Complete payment
- [ ] Verify payment verification call
- [ ] Verify appointment created with payment details
- [ ] Check email confirmation

### 18. Payment Error Handling
- [ ] Test payment failure
- [ ] Test payment cancellation
- [ ] Test network error during payment
- [ ] Verify proper error messages

## ✅ Sign-Off Checklist

Before marking as complete:
- [ ] All visual tests passed
- [ ] All functional tests passed
- [ ] No console errors
- [ ] Email confirmation received
- [ ] Database record created
- [ ] Responsive design works
- [ ] Documentation reviewed
- [ ] Code reviewed
- [ ] Ready for deployment

## 📝 Test Results Template

```
Test Date: ___________
Tester: ___________
Environment: [ ] Local [ ] Staging [ ] Production

Results:
- Visual Tests: [ ] Pass [ ] Fail
- Modal Tests: [ ] Pass [ ] Fail
- Form Validation: [ ] Pass [ ] Fail
- Submission: [ ] Pass [ ] Fail
- Email: [ ] Pass [ ] Fail
- Responsive: [ ] Pass [ ] Fail

Issues Found:
1. ___________
2. ___________

Notes:
___________
```

## 🐛 Known Issues / Limitations

Current implementation:
- Uses placeholder userId for guest users
- Alert-based notifications (can be upgraded to toast)
- Email field collected but not sent to backend
- No appointment history view yet
- No reschedule/cancel functionality yet

These are not blockers for deployment but can be enhanced later.

---

**Minimum Required Tests:** 1-7, 12-13  
**Recommended Tests:** All except 17-18 (future)  
**Time Required:** 30-45 minutes for complete testing
