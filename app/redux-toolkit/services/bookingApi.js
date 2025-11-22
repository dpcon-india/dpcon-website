import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../common/headers';
import { API_ENDPOINTS } from '../../utils/endPoint';

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery,
  tagTypes: ['Booking', 'Appointment', 'Payment'],
  endpoints: (builder) => ({
    // Bookings
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: API_ENDPOINTS.CREATE_BOOKING,
        method: 'POST',
        body: bookingData,
      }),
      invalidatesTags: ['Booking'],
    }),
    
    getUserBookings: builder.query({
      query: (userId) => API_ENDPOINTS.GET_USER_BOOKINGS(userId),
      providesTags: ['Booking'],
    }),
    
    getBooking: builder.query({
      query: (id) => API_ENDPOINTS.GET_BOOKING(id),
      providesTags: ['Booking'],
    }),
    
    updateBooking: builder.mutation({
      query: ({ id, ...bookingData }) => ({
        url: API_ENDPOINTS.UPDATE_BOOKING(id),
        method: 'PUT',
        body: bookingData,
      }),
      invalidatesTags: ['Booking'],
    }),
    
    // Appointments
    bookAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: API_ENDPOINTS.BOOK_APPOINTMENT,
        method: 'POST',
        body: appointmentData,
      }),
      invalidatesTags: ['Appointment'],
    }),
    
    getUserAppointments: builder.query({
      query: (userId) => API_ENDPOINTS.GET_USER_APPOINTMENTS(userId),
      providesTags: ['Appointment'],
    }),
    
    updateAppointment: builder.mutation({
      query: ({ id, ...appointmentData }) => ({
        url: API_ENDPOINTS.UPDATE_APPOINTMENT(id),
        method: 'PUT',
        body: appointmentData,
      }),
      invalidatesTags: ['Appointment'],
    }),
    
    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: API_ENDPOINTS.DELETE_APPOINTMENT(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Appointment'],
    }),
    
    // Payment
    createPaymentOrder: builder.mutation({
      query: (orderData) => ({
        url: API_ENDPOINTS.CREATE_PAYMENT_ORDER,
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Payment'],
    }),
    
    verifyPayment: builder.mutation({
      query: (paymentData) => ({
        url: API_ENDPOINTS.VERIFY_PAYMENT,
        method: 'POST',
        body: paymentData,
      }),
      invalidatesTags: ['Payment'],
    }),
    
    payAndBook: builder.mutation({
      query: (paymentBookingData) => ({
        url: API_ENDPOINTS.PAY_AND_BOOK,
        method: 'POST',
        body: paymentBookingData,
      }),
      invalidatesTags: ['Payment', 'Appointment'],
    }),
    
    // Service Bookings
    createServiceBooking: builder.mutation({
      query: (serviceBookingData) => ({
        url: API_ENDPOINTS.CREATE_SERVICE_BOOKING,
        method: 'POST',
        body: serviceBookingData,
      }),
      invalidatesTags: ['Booking'],
    }),
    
    updateServiceBooking: builder.mutation({
      query: ({ id, ...serviceBookingData }) => ({
        url: API_ENDPOINTS.UPDATE_SERVICE_BOOKING(id),
        method: 'PUT',
        body: serviceBookingData,
      }),
      invalidatesTags: ['Booking'],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetUserBookingsQuery,
  useGetBookingQuery,
  useUpdateBookingMutation,
  useBookAppointmentMutation,
  useGetUserAppointmentsQuery,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
  useCreatePaymentOrderMutation,
  useVerifyPaymentMutation,
  usePayAndBookMutation,
  useCreateServiceBookingMutation,
  useUpdateServiceBookingMutation,
} = bookingApi;