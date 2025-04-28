import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAdmin$.pipe(
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