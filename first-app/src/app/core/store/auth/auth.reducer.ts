import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import { loginSuccess, loginFailure, logout, autoLoginSuccess } from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, { role, user }) => ({
    ...state,
    isAuthenticated: true,
    role,
    user,
    error: null
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    role: null,
    user: null,
    error
  })),
  on(logout, state => ({
    ...state,
    isAuthenticated: false,
    role: null,
    user: null,
    error: null
  })),
  on(autoLoginSuccess, (state, { isAuthenticated, role, user }) => ({
    ...state,
    isAuthenticated,
    role,
    user,
    error: null
  }))
);