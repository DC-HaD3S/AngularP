import { UserRole } from './user-role.enum';

export interface AuthState {
  isAuthenticated: boolean;
  role: UserRole | null;
  user: { email: string } | null;
  error: string | null;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  role: null,
  user: null,
  error: null
};