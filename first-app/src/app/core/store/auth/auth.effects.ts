import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { login, loginSuccess, loginFailure, logout, autoLogin, autoLoginSuccess } from './auth.actions';
import { Router } from '@angular/router';
import { UserRole } from './user-role.enum';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ email, password }) => {
        if (email === 'admin@123.com' && password === 'admin123') {
          return of(loginSuccess({ role: UserRole.Admin, user: { email } }));
        } else if (email === 'user@123.com' && password === 'user123') {
          return of(loginSuccess({ role: UserRole.User, user: { email } }));
        } else {
          return of(loginFailure({ error: 'Invalid credentials' }));
        }
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ role, user }) => {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('role', role);
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          localStorage.clear();
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(autoLogin),
      mergeMap(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        const role = localStorage.getItem('role') as UserRole | null;
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

        if (isAuthenticated && user && role) {
          return of(autoLoginSuccess({ isAuthenticated, role, user }));
        } else {
          return of();
        }
      }),
      catchError(() => of())
    )
  );
}