import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.services'; // Fixed typo in import path
import { UserRole } from '../../enums/user-role.enum';
import { setRole } from '../../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (success) => {
        if (success) {
          const role = this.username === 'admin' ? UserRole.Admin : UserRole.User;
          this.store.dispatch(setRole({ role }));
          localStorage.setItem('role', role); // Save role to localStorage
          this.router.navigate([`/${role.toLowerCase()}/home`]);
        } else {
          this.error = 'Invalid username or password';
        }
      },
      error: () => {
        this.error = 'Login failed. Please try again.';
      }
    });
  }
}