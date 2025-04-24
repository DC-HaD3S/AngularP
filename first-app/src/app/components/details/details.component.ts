import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../core/service/housing.service';
import { HousingLocation } from '../../interface/housinglocation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../interface/api-response';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  fb = inject(FormBuilder);
  private http = inject(HttpClient);
  housingLocation: HousingLocation | undefined;
  errorMessage: string | null = null;
  pincodes: string[] = [];

  applyForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    city: ['', [Validators.required, Validators.minLength(2)]],
    pincode: ['', [Validators.required]],
    occupation: ['', [Validators.required]],
    monthlyIncome: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    moveInDate: ['', [Validators.required]]
  });

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then(
      housingLocation => {
        this.housingLocation = housingLocation;
        if (!housingLocation) {
          this.errorMessage = `Housing location with ID ${housingLocationId} not found. Check json-server and db.json 'locations' endpoint.`;
        }
      },
      error => {
        this.errorMessage = `Failed to load housing location (ID: ${housingLocationId}). Ensure json-server is running on port 8000 and db.json has the 'locations' endpoint.`;
        console.error('DetailsComponent error:', error);
      }
    );
    console.log('Form initialized:', this.applyForm.value); // for Debugging Log form state on initialization
  }

  submitApplication() {
    if (this.applyForm.valid) {
      this.housingService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.email ?? '',
        this.applyForm.value.phone ?? '',
        this.applyForm.value.address ?? '',
        this.applyForm.value.city ?? '',
        this.applyForm.value.occupation ?? '',
        this.applyForm.value.monthlyIncome ?? '',
        this.applyForm.value.moveInDate ?? '',
        this.applyForm.value.pincode ?? ''
      ).then(
        () => this.applyForm.reset(),
        error => this.errorMessage = 'Failed to submit application. Please try again.'
      );
    }
  }

  onCityChange() {
    console.log('onCityChange called with city:', this.applyForm.get('city')?.value); //For Debugging, Log when method is called
    const city = this.applyForm.get('city')?.value;
    if (city && city.length >= 2) {
      this.fetchPincodes(city);
    } else {
      this.pincodes = [];
      this.applyForm.get('pincode')?.setValue('');
      console.log('City length < 2 or invalid, resetting pincodes');
    }
  }

  private fetchPincodes(city: string) {
    const normalizedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    console.log('Original city:', city);
    console.log('Normalized city:', normalizedCity);
    const apiUrl = `/postoffice/postoffice/${encodeURIComponent(normalizedCity)}`;
    console.log('Fetching pincodes for URL:', apiUrl);
    this.http.get<ApiResponse[]>(apiUrl).subscribe({
      next: (response: ApiResponse[]) => {
        console.log('Raw API Response:', JSON.stringify(response, null, 2));
        if (response && response.length > 0) {
          console.log('Response[0]:', response[0]);
          console.log('Status:', response[0].Status);
          console.log('PostOffice:', response[0].PostOffice);
          if (response[0].Status === 'Success' && response[0].PostOffice && response[0].PostOffice.length > 0) {
            this.pincodes = [...new Set(response[0].PostOffice.map(office => office.Pincode))];
            console.log('Pincodes extracted:', this.pincodes);
            if (this.pincodes.length > 0) {
              this.applyForm.get('pincode')?.setValue(this.pincodes[0], { emitEvent: true });
              console.log('Set pincode to:', this.pincodes[0]);
            } else {
              this.applyForm.get('pincode')?.setValue('');
              console.log('PostOffice array is empty despite Success status');
            }
          } else {
            this.pincodes = [];
            this.applyForm.get('pincode')?.setValue('');
            console.log('API status not Success or PostOffice is null/empty');
          }
        } else {
          this.pincodes = [];
          this.applyForm.get('pincode')?.setValue('');
          console.log('Invalid or empty API response');
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching pincodes:', error);
        this.pincodes = [];
        this.applyForm.get('pincode')?.setValue('');
      }
    });
  }
}