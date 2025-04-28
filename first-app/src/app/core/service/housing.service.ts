import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HousingLocation } from 'src/app/interface/housinglocation';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private apiUrl = 'http://localhost:8000'; // Adjust if your json-server runs on a different port

  constructor(private http: HttpClient) {}

  // Method to get all housing locations
  getAllHousingLocations(): Promise<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(`${this.apiUrl}/housingLocations`)
      .pipe(
        map(locations => locations ?? []), // Ensure empty array if response is null/undefined
        catchError((error: HttpErrorResponse) => {
          this.handleError(error);
          return of([]); // Return empty array on error to maintain type consistency
        })
      )
      .toPromise()
      .then(locations => locations ?? []); // Additional safeguard for Promise resolution
  }

  // Existing method to get housing location by ID
  getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    return this.http.get<HousingLocation[]>(`${this.apiUrl}/housingLocations?id=${id}`)
      .pipe(
        map(locations => locations[0]),
        catchError(this.handleError)
      )
      .toPromise();
  }

  // Existing method to submit application
  submitApplication(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    occupation: string,
    monthlyIncome: string,
    moveInDate: string,
    pincode: string,
    housingLocationId?: number
  ): Promise<void> {
    const application = {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      occupation,
      monthlyIncome,
      moveInDate,
      pincode,
      housingLocationId,
      createdAt: new Date().toISOString()
    };

    return this.http.post<void>(`${this.apiUrl}/applications`, application)
      .pipe(
        catchError(this.handleError)
      )
      .toPromise();
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}