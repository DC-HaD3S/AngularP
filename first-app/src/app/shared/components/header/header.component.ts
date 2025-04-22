import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  authService = inject(AuthService);
  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticated$;
  isAdmin$: Observable<boolean> = this.authService.isAdmin$;

  login(): void {
    // Simulate admin login (replace with actual login form/modal later)
    this.authService.login('admin@example.com', 'admin123');
  }

  logout(): void {
    this.authService.logout();
  }
}