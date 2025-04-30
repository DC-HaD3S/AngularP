import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../core/store/auth/auth.state';
import { selectIsAuthenticated, selectIsAdmin } from '../../../core/store/auth/auth.selectors';
import { logout } from '../../../core/store/auth/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated$: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(private store: Store<{ auth: AuthState }>, private router: Router) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.isAdmin$ = this.store.select(selectIsAdmin); 
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}