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

  login(email: string, password: string): boolean {
    if (email === 'admin@123.com' && password === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('isAdmin', 'true');
      this.isAuthenticatedSubject.next(true);
      this.isAdminSubject.next(true);
      console.log('Admin logged in');
      return true;
    }
    else if (email === 'user@123.com' && password === 'user123') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('isAdmin', 'false');
      this.isAuthenticatedSubject.next(true);
      this.isAdminSubject.next(false);
      console.log('Admin logged in');
      return true;
    }
    else{
      return false;
    }
  }
  
  autoLogin(): void {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
    this.isAuthenticatedSubject.next(isAuthenticated);
    this.isAdminSubject.next(isAdmin);
  }
  
  logout(): void {
    localStorage.clear();
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