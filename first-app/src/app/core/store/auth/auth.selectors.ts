import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
import { UserRole } from './user-role.enum';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectIsAdmin = createSelector(
  selectAuthState,
  (state: AuthState) => state.role === UserRole.Admin
);

export const selectRole = createSelector(
  selectAuthState,
  (state: AuthState) => state.role
);

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);