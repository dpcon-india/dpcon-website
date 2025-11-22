import { useSelector, useDispatch } from 'react-redux';
import { 
  useLoginMutation, 
  useSignupMutation, 
  useVerifyOtpMutation,
  useGenerateOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from '../redux-toolkit/services/authApi';
import { 
  setCredentials, 
  logout, 
  setLoading, 
  setError, 
  clearError,
  selectCurrentUser,
  selectCurrentToken,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from '../redux-toolkit/features/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  
  // Selectors
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  
  // API Mutations
  const [loginMutation] = useLoginMutation();
  const [signupMutation] = useSignupMutation();
  const [verifyOtpMutation] = useVerifyOtpMutation();
  const [generateOtpMutation] = useGenerateOtpMutation();
  const [forgotPasswordMutation] = useForgotPasswordMutation();
  const [resetPasswordMutation] = useResetPasswordMutation();
  
  // Auth Actions
  const login = async (credentials) => {
    try {
      dispatch(setLoading(true));
      const result = await loginMutation(credentials).unwrap();
      
      if (result.profile) {
        dispatch(setCredentials({
          user: result.profile,
          token: result.profile.token
        }));
        return { success: true, data: result };
      }
      
      throw new Error('Invalid response format');
    } catch (error) {
      dispatch(setError(error.message || 'Login failed'));
      return { success: false, error: error.message };
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  const signup = async (userData) => {
    try {
      dispatch(setLoading(true));
      const result = await signupMutation(userData).unwrap();
      
      if (result.user && result.token) {
        dispatch(setCredentials({
          user: result.user,
          token: result.token
        }));
        return { success: true, data: result };
      }
      
      return { success: true, data: result, requiresOtp: true };
    } catch (error) {
      dispatch(setError(error.message || 'Signup failed'));
      return { success: false, error: error.message };
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  const verifyOtp = async (otpData) => {
    try {
      dispatch(setLoading(true));
      const result = await verifyOtpMutation(otpData).unwrap();
      
      if (result.user && result.token) {
        dispatch(setCredentials({
          user: result.user,
          token: result.token
        }));
      }
      
      return { success: true, data: result };
    } catch (error) {
      dispatch(setError(error.message || 'OTP verification failed'));
      return { success: false, error: error.message };
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  const generateOtp = async (phoneData) => {
    try {
      dispatch(setLoading(true));
      const result = await generateOtpMutation(phoneData).unwrap();
      return { success: true, data: result };
    } catch (error) {
      dispatch(setError(error.message || 'OTP generation failed'));
      return { success: false, error: error.message };
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  const forgotPassword = async (emailData) => {
    try {
      dispatch(setLoading(true));
      const result = await forgotPasswordMutation(emailData).unwrap();
      return { success: true, data: result };
    } catch (error) {
      dispatch(setError(error.message || 'Password reset request failed'));
      return { success: false, error: error.message };
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  const resetPassword = async (resetData) => {
    try {
      dispatch(setLoading(true));
      const result = await resetPasswordMutation(resetData).unwrap();
      return { success: true, data: result };
    } catch (error) {
      dispatch(setError(error.message || 'Password reset failed'));
      return { success: false, error: error.message };
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  const logoutUser = () => {
    dispatch(logout());
  };
  
  const clearAuthError = () => {
    dispatch(clearError());
  };
  
  return {
    // State
    user,
    token,
    isAuthenticated,
    loading,
    error,
    
    // Actions
    login,
    signup,
    verifyOtp,
    generateOtp,
    forgotPassword,
    resetPassword,
    logout: logoutUser,
    clearError: clearAuthError,
  };
};