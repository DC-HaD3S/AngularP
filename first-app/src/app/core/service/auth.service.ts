import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$: Observable<boolean> = this.isAdminSubject.asObservable();

  login(email: string, password: string): void {
    if (email === 'admin@example.com' && password === 'admin123') {
      this.isAuthenticatedSubject.next(true);
      this.isAdminSubject.next(true);
      console.log('Admin logged in');
    }
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.isAdminSubject.next(false);
    console.log('Logged out');
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  isAdmin(): boolean {
    return this.isAdminSubject.value;
  }
}