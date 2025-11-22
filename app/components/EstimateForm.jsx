'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useBookAppointmentMutation, usePayAndBookMutation, useVerifyPaymentMutation } from '../redux-toolkit/services/bookingApi';
import { selectCurrentUser } from '../redux-toolkit/features/authSlice';
import { BOOKING_CONFIG, getBookingType } from '../utils/bookingConfig';

export default function EstimateForm({ isOpen, onClose, service }) {
  const user = useSelector(selectCurrentUser);
  const [bookAppointment, { isLoading }] = useBookAppointmentMutation();
  const [payAndBook, { isLoading: isPaymentLoading }] = usePayAndBookMutation();
  const bookingType = getBookingType(service?.price);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    serviceDetails: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const baseData = {
        serviceId: service._id,
        userId: user?._id || '000000000000000000000000',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        serviceDetails: formData.serviceDetails || service.serviceTitle,
      };

      // For now, always use free booking (ENABLE_PAID_APPOINTMENTS = false)
      // When enabled, this will route to payment flow
      if (bookingType === 'paid' && BOOKING_CONFIG.ENABLE_PAID_APPOINTMENTS) {
        // Future: Paid appointment flow
        const paymentData = {
          ...baseData,
          amount: service.price,
        };
        await payAndBook(paymentData).unwrap();
      } else {
        // Current: Free appointment flow
        const appointmentData = {
          ...baseData,
          amount: '0',
          paymentStatus: 'free'
        };
        await bookAppointment(appointmentData).unwrap();
      }

      alert('Appointment booked successfully! Check your email for confirmation.');
      onClose();
      setFormData({ name: '', email: '', phone: '', date: '', time: '', serviceDetails: '' });
    } catch (error) {
      alert('Failed to book appointment. Please try again.');
      console.error('Booking error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-light tracking-wide">Get Free Estimate</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-black text-2xl">&times;</button>
          </div>
          <p className="text-xs text-gray-500 mt-2">{service?.serviceTitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Preferred Date *</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Preferred Time *</label>
            <input
              type="time"
              required
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Additional Details</label>
            <textarea
              value={formData.serviceDetails}
              onChange={(e) => setFormData({ ...formData, serviceDetails: e.target.value })}
              rows="3"
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black resize-none"
              placeholder="Any specific requirements..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 py-3 text-xs uppercase tracking-widest hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || isPaymentLoading}
              className="flex-1 bg-black text-white py-3 text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {(isLoading || isPaymentLoading) ? 'Booking...' : 'Book Estimate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
