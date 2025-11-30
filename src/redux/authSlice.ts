import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// --- CONFIGURATION ---
const TOKEN_KEY = 'visualise_token';
const USER_KEY = 'visualise_user';

// Mock JWT token - In production, this would come from your backend API
const MOCK_JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFuYWx5dGljcyBVc2VyIiwiZW1haWwiOiJ1c2VyQGFyYWFkaWdpdC5pbyIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Helper to get initial state from cookies
const getInitialState = (): AuthState => {
  if (typeof window !== 'undefined') {
    const token = Cookies.get(TOKEN_KEY);
    const userStr = Cookies.get(USER_KEY);
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        return {
          user,
          token,
          isAuthenticated: true,
          loading: false,
          error: null,
        };
      } catch {
        // Invalid user data, clear cookies
        Cookies.remove(TOKEN_KEY);
        Cookies.remove(USER_KEY);
      }
    }
  }
  return {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      
      // Store in cookies (expires in 7 days)
      if (typeof window !== 'undefined') {
        Cookies.set(TOKEN_KEY, action.payload.token, { expires: 7, secure: true, sameSite: 'strict' });
        Cookies.set(USER_KEY, JSON.stringify(action.payload.user), { expires: 7, secure: true, sameSite: 'strict' });
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      
      // Clear cookies
      if (typeof window !== 'undefined') {
        Cookies.remove(TOKEN_KEY);
        Cookies.remove(USER_KEY);
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Mock login function - Replace with actual API call later
export const mockLogin = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(loginStart());
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation - Replace with actual API call
    if (email === 'admin@visualise.io' && password === 'admin123') {
      const user: User = {
        id: '1',
        name: 'Admin User',
        email: 'admin@visualise.io',
        role: 'admin',
        avatar: 'AU',
      };
      dispatch(loginSuccess({ user, token: MOCK_JWT_TOKEN }));
      return { success: true };
    } else if (email && password) {
      // Accept any other email/password for demo purposes
      const user: User = {
        id: '2',
        name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email,
        role: 'user',
        avatar: email.substring(0, 2).toUpperCase(),
      };
      dispatch(loginSuccess({ user, token: MOCK_JWT_TOKEN }));
      return { success: true };
    } else {
      dispatch(loginFailure('Invalid email or password'));
      return { success: false, error: 'Invalid email or password' };
    }
  };
};

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
