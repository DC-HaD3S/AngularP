import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HousingLocation } from 'src/app/interface/housinglocation';
import { Application } from 'src/app/interface/application';
import { Observable, throwError, of, firstValueFrom } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    return firstValueFrom(
      this.http.get<HousingLocation[]>(`${this.apiUrl}/housingLocations`)
        .pipe(
          map(locations => 
            (locations ?? []).map(location => ({
              ...location,
              id: Number(location.id) // Convert id to number
            }))
          ),
          catchError((error: HttpErrorResponse) => {
            this.handleError(error);
            return of([]);
          })
        )
    );
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    return firstValueFrom(
      this.http.get<HousingLocation[]>(`${this.apiUrl}/housingLocations?id=${id}`)
        .pipe(
          map(locations => 
            locations[0] ? { ...locations[0], id: Number(locations[0].id) } : undefined // Convert id to number
          ),
          catchError(this.handleError)
        )
    );
  }

  async createHouse(house: HousingLocation): Promise<void> {
    await firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/housingLocations`, {
        ...house,
        id: Number(house.id) // Ensure id is number
      })
        .pipe(
          catchError(this.handleError)
        )
    );
  }

  async updateHouse(house: HousingLocation): Promise<void> {
    await firstValueFrom(
      this.http.put<void>(`${this.apiUrl}/housingLocations/${house.id}`, {
        ...house,
        id: Number(house.id) // Ensure id is number
      })
        .pipe(
          catchError(this.handleError)
        )
    );
  }

  async deleteHouse(id: number): Promise<void> {
    await firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/housingLocations/${id}`)
        .pipe(
          catchError(this.handleError)
        )
    );
  }

  async submitApplication(
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
      housingLocationId: housingLocationId != null ? Number(housingLocationId) : undefined, // Ensure number
      createdAt: new Date().toISOString()
    };

    await firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/applications`, application)
        .pipe(
          catchError(this.handleError)
        )
    );
  }

  async getAllApplications(): Promise<Application[]> {
    return firstValueFrom(
      this.http.get<Application[]>(`${this.apiUrl}/applications`)
        .pipe(
          map(applications => (applications ?? [])),
          catchError((error: HttpErrorResponse) => {
            this.handleError(error);
            return of([]);
          })
        )
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}