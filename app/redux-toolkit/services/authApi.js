import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../common/headers';
import { API_ENDPOINTS } from '../../utils/endPoint';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['User', 'Auth', 'Profile'],
  endpoints: (builder) => ({
    // Authentication Endpoints
    signup: builder.mutation({
      query: (userData) => ({
        url: API_ENDPOINTS.SIGNUP,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Auth'],
    }),
    
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: API_ENDPOINTS.VERIFY_OTP,
        method: 'POST',
        body: otpData,
      }),
      invalidatesTags: ['Auth'],
    }),
    
    login: builder.mutation({
      query: (credentials) => ({
        url: API_ENDPOINTS.LOGIN,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: API_ENDPOINTS.LOGIN_USER,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    
    generateOtp: builder.mutation({
      query: (phoneData) => ({
        url: API_ENDPOINTS.GENERATE_OTP,
        method: 'POST',
        body: phoneData,
      }),
    }),
    
    forgotPassword: builder.mutation({
      query: (emailData) => ({
        url: API_ENDPOINTS.FORGOT_PASSWORD,
        method: 'POST',
        body: emailData,
      }),
    }),
    
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: API_ENDPOINTS.RESET_PASSWORD,
        method: 'POST',
        body: resetData,
      }),
    }),
    
    validateResetToken: builder.query({
      query: (token) => `${API_ENDPOINTS.VALIDATE_TOKEN}?token=${token}`,
    }),
    
    // Profile Management
    getProfile: builder.query({
      query: (id) => API_ENDPOINTS.GET_PROFILE(id),
      providesTags: ['Profile'],
    }),
    
    updateProfile: builder.mutation({
      query: ({ id, ...profileData }) => ({
        url: API_ENDPOINTS.UPDATE_PROFILE(id),
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['Profile'],
    }),
    
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: API_ENDPOINTS.CHANGE_PASSWORD,
        method: 'POST',
        body: passwordData,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useVerifyOtpMutation,
  useLoginMutation,
  useLoginUserMutation,
  useGenerateOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useValidateResetTokenQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = authApi;