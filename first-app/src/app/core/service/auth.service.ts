import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, logout, autoLogin } from '../store/auth/auth.actions';
import { AuthState } from '../store/auth/auth.state';
import { selectIsAuthenticated, selectIsAdmin, selectRole } from '../store/auth/auth.selectors';
import { UserRole } from '../store/auth/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  role$: Observable<UserRole | null>;

  constructor(private store: Store<{ auth: AuthState }>) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.isAdmin$ = this.store.select(selectIsAdmin);
    this.role$ = this.store.select(selectRole);
  }

  login(email: string, password: string): void {
    this.store.dispatch(login({ email, password }));
  }

  autoLogin(): void {
    this.store.dispatch(autoLogin());
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}