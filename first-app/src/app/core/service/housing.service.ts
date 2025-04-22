import { Injectable } from '@angular/core';
import { HousingLocation } from '../../interface/housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  url = 'http://localhost:8000/locations';
  applicationUrl = 'http://localhost:8000/application';

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  async submitApplication(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    occupation: string,
    monthlyIncome: string,
    moveInDate: string
  ): Promise<void> {
    try {
      const response = await fetch(this.applicationUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          address,
          occupation,
          monthlyIncome,
          moveInDate
        })
      });
      if (!response.ok) {
        throw new Error('Failed to submit application');
      }
      console.log('Application submitted successfully:', {
        firstName,
        lastName,
        email,
        phone,
        address,
        occupation,
        monthlyIncome,
        moveInDate
      });
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  }
}