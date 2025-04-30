import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthState } from './store/auth/auth.state';
import { selectIsAdmin } from './store/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<{ auth: AuthState }>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectIsAdmin).pipe(
      take(1),
      map(isAdmin => {
        if (isAdmin) {
          return true;
        }
        this.router.navigate(['/']);
        return false;
      })
    );
  }
}