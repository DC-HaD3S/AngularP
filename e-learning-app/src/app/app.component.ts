import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserRole } from './enums/user-role.enum';
import { setRole } from './state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  role$: Observable<UserRole | null>;

  constructor(
    private store: Store<{ auth: { role: UserRole | null } }>,
    private router: Router
  ) {
    this.role$ = this.store.select(state => state.auth.role);
  }

  ngOnInit(): void {
    const savedRole = localStorage.getItem('role') as UserRole | null;
    if (savedRole) {
      this.store.dispatch(setRole({ role: savedRole }));
      this.router.navigate([`/${savedRole.toLowerCase()}/home`]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}