import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  step: number = 1;
  username: string = '';
  email: string = '';
  otp: string = '';
  newPassword: string = '';
  error: string = '';
  loading: boolean = false;
  generatedOtp: string = '123456'; // Simulated OTP for demo purposes

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<ForgotPasswordComponent>
  ) {}

  onNextStep1(): void {
    this.error = '';
    this.loading = true;

    // Check if the username and email match a user in db.json
    this.http.get<any[]>(`http://localhost:8000/users?username=${this.username}&email=${this.email}`)
      .pipe(
        catchError(() => {
          this.error = 'User not found or email does not match.';
          this.loading = false;
          return of([]);
        })
      )
      .subscribe(users => {
        this.loading = false;
        if (users.length > 0) {
          // Simulate sending OTP (in a real app, you'd send an email)
          console.log('Simulated OTP sent:', this.generatedOtp);
          this.step = 2;
        } else {
          this.error = 'User not found or email does not match.';
        }
      });
  }

  onNextStep2(): void {
    this.error = '';
    this.loading = true;

    if (this.otp === this.generatedOtp) {
      this.loading = false;
      this.step = 3;
    } else {
      this.loading = false;
      this.error = 'Invalid OTP. Please try again.';
    }
  }

  onResetPassword(): void {
    this.error = '';
    this.loading = true;

    // Find the user and update their password
    this.http.get<any[]>(`http://localhost:8000/users?username=${this.username}`)
      .pipe(
        switchMap(users => {
          if (users.length === 0) {
            throw new Error('User not found.');
          }
          const user = users[0];
          return this.http.patch(`http://localhost:8000/users/${user.id}`, { password: this.newPassword });
        }),
        catchError(() => {
          this.error = 'Failed to reset password. Please try again.';
          this.loading = false;
          return of(null);
        })
      )
      .subscribe(response => {
        this.loading = false;
        if (response) {
          this.dialogRef.close();
        }
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}