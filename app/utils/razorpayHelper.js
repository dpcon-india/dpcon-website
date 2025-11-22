// Razorpay Payment Helper
// This file contains utilities for Razorpay integration (for future use)

import { BOOKING_CONFIG } from './bookingConfig';

/**
 * Load Razorpay script dynamically
 * @returns {Promise<boolean>}
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Open Razorpay payment modal
 * @param {Object} orderData - Order details from backend
 * @param {Function} onSuccess - Success callback
 * @param {Function} onFailure - Failure callback
 */
export const openRazorpayModal = async (orderData, onSuccess, onFailure) => {
  const isLoaded = await loadRazorpayScript();
  
  if (!isLoaded) {
    onFailure('Failed to load payment gateway');
    return;
  }

  const options = {
    key: BOOKING_CONFIG.RAZORPAY_KEY_ID,
    amount: orderData.amount,
    currency: BOOKING_CONFIG.CURRENCY,
    name: 'DPCON India',
    description: orderData.description || 'Service Booking',
    order_id: orderData.orderId,
    handler: function (response) {
      onSuccess({
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        signature: response.razorpay_signature,
      });
    },
    prefill: {
      name: orderData.customerName,
      email: orderData.customerEmail,
      contact: orderData.customerPhone,
    },
    theme: {
      color: '#000000',
    },
    modal: {
      ondismiss: function() {
        onFailure('Payment cancelled by user');
      }
    }
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};

/**
 * Convert amount to paise (Razorpay requires amount in smallest currency unit)
 * @param {number} amount - Amount in rupees
 * @returns {number} - Amount in paise
 */
export const convertToPaise = (amount) => {
  return Math.round(amount * 100);
};

/**
 * Convert paise to rupees
 * @param {number} paise - Amount in paise
 * @returns {number} - Amount in rupees
 */
export const convertToRupees = (paise) => {
  return paise / 100;
};
