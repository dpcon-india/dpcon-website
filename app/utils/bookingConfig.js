// Booking Configuration
// Toggle this to enable/disable paid appointments

export const BOOKING_CONFIG = {
  // Set to true when ready to enable paid appointments
  ENABLE_PAID_APPOINTMENTS: false,
  
  // Razorpay configuration (for future use)
  RAZORPAY_KEY_ID: 'rzp_test_2rLW2LnoSMZI7t',
  CURRENCY: 'INR',
};

/**
 * Helper function to determine booking flow
 * @param {number} amount - Service amount
 * @returns {string} - 'free' or 'paid'
 */
export const getBookingType = (amount) => {
  if (!BOOKING_CONFIG.ENABLE_PAID_APPOINTMENTS || !amount || amount === 0) {
    return 'free';
  }
  return 'paid';
};
