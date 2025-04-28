import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HousingLocation } from 'src/app/interface/housinglocation';
import { Application } from 'src/app/interface/application';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getAllHousingLocations(): Promise<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(`${this.apiUrl}/housingLocations`)
      .pipe(
        map(locations => locations ?? []),
        catchError((error: HttpErrorResponse) => {
          this.handleError(error);
          return of([]);
        })
      )
      .toPromise()
      .then(locations => locations ?? []);
  }

  getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    return this.http.get<HousingLocation[]>(`${this.apiUrl}/housingLocations?id=${id}`)
      .pipe(
        map(locations => locations[0]),
        catchError(this.handleError)
      )
      .toPromise();
  }

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

  getAllApplications(): Promise<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/applications`)
      .pipe(
        map(applications => applications ?? []),
        catchError((error: HttpErrorResponse) => {
          this.handleError(error);
          return of([]);
        })
      )
      .toPromise()
      .then(applications => applications ?? []);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}