'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useBookAppointmentMutation, usePayAndBookMutation, useVerifyPaymentMutation } from '../redux-toolkit/services/bookingApi';
import { selectCurrentUser } from '../redux-toolkit/features/authSlice';
import { BOOKING_CONFIG, getBookingType } from '../utils/bookingConfig';
import Input from './Input';
import Button from './Button';

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
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm">
      <div className="bg-white max-w-md w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl transform transition-all duration-300 scale-100">
        <div className="border-b border-gray-200 p-4 sm:p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-light tracking-wide">Get Free Estimate</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-black text-2xl">&times;</button>
          </div>
          <p className="text-xs text-gray-500 mt-2">{service?.serviceTitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <Input
            label="Name *"
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <Input
            label="Email *"
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <Input
            label="Phone"
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <Input
            label="Preferred Date *"
            id="date"
            name="date"
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
          />

          <Input
            label="Preferred Time *"
            id="time"
            name="time"
            type="time"
            required
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">Additional Details</label>
            <textarea
              value={formData.serviceDetails}
              onChange={(e) => setFormData({ ...formData, serviceDetails: e.target.value })}
              rows="3"
              className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-[#00296b] focus:ring-1 focus:ring-[#00296b] resize-none"
              placeholder="Any specific requirements..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button type="button" onClick={onClose} variant="secondary">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || isPaymentLoading}>
              {(isLoading || isPaymentLoading) ? 'Booking...' : 'Book Estimate'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
