const BASE_URL = process.env.REACT_APP_API_URL || 'https://api.dpconindia.com/api/';

export const API_ENDPOINTS = {
    // Authentication
    SIGNUP: '/profiles/signup',
    VERIFY_OTP: '/profiles/verify-otp',
    LOGIN: '/profiles/login',
    LOGIN_USER: '/profiles/login-user',
    GENERATE_OTP: '/profiles/gen-otp',
    FORGOT_PASSWORD: '/profiles/forgot-password',
    RESET_PASSWORD: '/profiles/tokens/reset-password',
    VALIDATE_TOKEN: '/profiles/tokens/validate',

    // Profile Management
    GET_PROFILE: (id) => `/profiles/${id}`,
    UPDATE_PROFILE: (id) => `/profiles/${id}`,
    CHANGE_PASSWORD: '/profiles/change-password',

    // Services
    GET_SERVICES: '/service',
    GET_SERVICE: (id) => `/service/${id}`,
    GET_SERVICES_BY_CATEGORY: (id) => `/service-cat/${id}`,

    // Categories
    GET_CATEGORIES: '/categories',
    GET_CATEGORY: (id) => `/category/${id}`,
    GET_SUBCATEGORIES: (id) => `/getSubCategoriesByCategoryId/${id}`,

    // Bookings
    CREATE_BOOKING: '/bookings',
    GET_USER_BOOKINGS: (id) => `/bookings/customer/${id}`,
    GET_BOOKING: (id) => `/bookings/${id}`,
    UPDATE_BOOKING: (id) => `/bookings/${id}`,

    // Service Bookings
    CREATE_SERVICE_BOOKING: '/service-bookings',
    UPDATE_SERVICE_BOOKING: (id) => `/service-bookings/${id}`,

    // Payment
    CREATE_PAYMENT_ORDER: '/payment/create-order',
    VERIFY_PAYMENT: '/payment/verify',

    // Appointments
    BOOK_APPOINTMENT: '/book',
    GET_USER_APPOINTMENTS: (id) => `/user/${id}`,
    UPDATE_APPOINTMENT: (id) => `/update/${id}`,
    DELETE_APPOINTMENT: (id) => `/delete/${id}`,
    PAY_AND_BOOK: '/pay-and-book',

    // Reviews
    CREATE_REVIEW: '/review',
    GET_REVIEWS: '/review',
    GET_REVIEW: (id) => `/review/${id}`,
    UPDATE_REVIEW: (id) => `/review/${id}`,
    DELETE_REVIEW: (id) => `/review/${id}`,

    // Notifications
    GET_NOTIFICATIONS: (id) => `/notifications/${id}`,
    GET_NOTIFICATION_COUNT: (id) => `/notifications/count/${id}`,
    MARK_NOTIFICATION_READ: (id) => `/notifications/${id}`,
    MARK_ALL_READ: (id) => `/notifications/user/${id}`,

    // Content
    GET_BLOGS: '/blogs',
    GET_BLOG_BY_SLUG: (slug) => `/blogs/${slug}`,
    GET_BLOG_BY_ID: (id) => `/getBlogById/${id}`,
    GET_TESTIMONIALS: '/testimonial',
    GET_ACTIVE_TESTIMONIALS: '/testimonial-s-true',
    CONTACT_US: '/contact',
    SUBSCRIBE: '/subscribe'
};

export default BASE_URL;