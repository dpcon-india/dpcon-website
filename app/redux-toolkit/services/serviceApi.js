import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../common/headers';
import { API_ENDPOINTS } from '../../utils/endPoint';

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery,
  tagTypes: ['Service', 'Category', 'Review', 'Notification', 'Content'],
  endpoints: (builder) => ({
    // Services
    getServices: builder.query({
      query: () => API_ENDPOINTS.GET_SERVICES,
      providesTags: ['Service'],
    }),
    
    getService: builder.query({
      query: (id) => API_ENDPOINTS.GET_SERVICE(id),
      providesTags: ['Service'],
    }),
    
    getServicesByCategory: builder.query({
      query: (categoryId) => API_ENDPOINTS.GET_SERVICES_BY_CATEGORY(categoryId),
      providesTags: ['Service'],
    }),
    
    // Categories
    getCategories: builder.query({
      query: () => API_ENDPOINTS.GET_CATEGORIES,
      providesTags: ['Category'],
    }),
    
    getCategory: builder.query({
      query: (id) => API_ENDPOINTS.GET_CATEGORY(id),
      providesTags: ['Category'],
    }),
    
    getSubcategories: builder.query({
      query: (categoryId) => API_ENDPOINTS.GET_SUBCATEGORIES(categoryId),
      providesTags: ['Category'],
    }),
    
    // Reviews
    createReview: builder.mutation({
      query: (reviewData) => ({
        url: API_ENDPOINTS.CREATE_REVIEW,
        method: 'POST',
        body: reviewData,
      }),
      invalidatesTags: ['Review'],
    }),
    
    getReviews: builder.query({
      query: () => API_ENDPOINTS.GET_REVIEWS,
      providesTags: ['Review'],
    }),
    
    getReview: builder.query({
      query: (id) => API_ENDPOINTS.GET_REVIEW(id),
      providesTags: ['Review'],
    }),
    
    updateReview: builder.mutation({
      query: ({ id, ...reviewData }) => ({
        url: API_ENDPOINTS.UPDATE_REVIEW(id),
        method: 'PUT',
        body: reviewData,
      }),
      invalidatesTags: ['Review'],
    }),
    
    deleteReview: builder.mutation({
      query: (id) => ({
        url: API_ENDPOINTS.DELETE_REVIEW(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Review'],
    }),
    
    // Notifications
    getNotifications: builder.query({
      query: (userId) => API_ENDPOINTS.GET_NOTIFICATIONS(userId),
      providesTags: ['Notification'],
    }),
    
    getNotificationCount: builder.query({
      query: (userId) => API_ENDPOINTS.GET_NOTIFICATION_COUNT(userId),
      providesTags: ['Notification'],
    }),
    
    markNotificationRead: builder.mutation({
      query: ({ id, isRead }) => ({
        url: API_ENDPOINTS.MARK_NOTIFICATION_READ(id),
        method: 'PUT',
        body: { isRead },
      }),
      invalidatesTags: ['Notification'],
    }),
    
    markAllNotificationsRead: builder.mutation({
      query: (userId) => ({
        url: API_ENDPOINTS.MARK_ALL_READ(userId),
        method: 'PUT',
        body: {},
      }),
      invalidatesTags: ['Notification'],
    }),
    
    // Content
    getBlogs: builder.query({
      query: () => API_ENDPOINTS.GET_BLOGS,
      providesTags: ['Content'],
    }),
    
    getBlogBySlug: builder.query({
      query: (slug) => API_ENDPOINTS.GET_BLOG_BY_SLUG(slug),
      providesTags: ['Content'],
    }),
    
    getBlogById: builder.query({
      query: (id) => API_ENDPOINTS.GET_BLOG_BY_ID(id),
      providesTags: ['Content'],
    }),
    
    getTestimonials: builder.query({
      query: () => API_ENDPOINTS.GET_TESTIMONIALS,
      providesTags: ['Content'],
    }),
    
    getActiveTestimonials: builder.query({
      query: () => API_ENDPOINTS.GET_ACTIVE_TESTIMONIALS,
      providesTags: ['Content'],
    }),
    
    contactUs: builder.mutation({
      query: (contactData) => ({
        url: API_ENDPOINTS.CONTACT_US,
        method: 'POST',
        body: contactData,
      }),
    }),
    
    subscribe: builder.mutation({
      query: (subscriptionData) => ({
        url: API_ENDPOINTS.SUBSCRIBE,
        method: 'POST',
        body: subscriptionData,
      }),
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceQuery,
  useGetServicesByCategoryQuery,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetSubcategoriesQuery,
  useCreateReviewMutation,
  useGetReviewsQuery,
  useGetReviewQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetNotificationsQuery,
  useGetNotificationCountQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
  useGetBlogsQuery,
  useGetBlogBySlugQuery,
  useGetBlogByIdQuery,
  useGetTestimonialsQuery,
  useGetActiveTestimonialsQuery,
  useContactUsMutation,
  useSubscribeMutation,
} = serviceApi;