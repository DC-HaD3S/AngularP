import { Injectable } from '@angular/core';
import { HousingLocation } from '../../interface/housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  url = 'http://localhost:8000/locations'; 

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
    city: string, 
    occupation: string,
    monthlyIncome: string,
    moveInDate: string,
    pincode: string
  ): Promise<void> {
    try {
      const applications = JSON.parse(localStorage.getItem('applications') || '[]');
      const newApplication = {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        occupation,
        monthlyIncome,
        moveInDate,
        pincode
      };
      applications.push(newApplication);
      localStorage.setItem('applications', JSON.stringify(applications));

      console.log('Application saved to localStorage:', newApplication);
    } catch (error) {
      console.error('Error saving application to localStorage:', error);
    }
  }
}
