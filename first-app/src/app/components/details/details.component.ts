import { Component, inject, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../core/service/housing.service';
import { HousingLocation } from '../../interface/housinglocation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../interface/api-response';
import { debounceTime } from 'rxjs/operators';
import { catchError, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements AfterViewInit {
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
    console.log('Form initialized:', this.applyForm.value);
  }

  ngAfterViewInit() {
    this.applyForm.get('city')?.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(city => {
      console.log('Debounced city value:', city);
      if (city && city.length >= 2) {
        this.fetchPincodes(city);
      } else {
        this.pincodes = [];
        this.applyForm.get('pincode')?.setValue('');
        console.log('City length < 2 or invalid, resetting pincodes');
      }
    });
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

  private fetchPincodes(city: string): void {
    const normalizedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    const apiUrl = `https://api.postalpincode.in/postoffice/${encodeURIComponent(normalizedCity)}`;

    this.http.get<ApiResponse[]>(apiUrl).pipe(
      map(response => {
        if (!response || !Array.isArray(response) || response[0]?.Status === 'Error') {
          throw new Error('Invalid API response or no data found');
        }
        const postOffices = response[0].PostOffice || [];
        return [...new Set(postOffices.map(office => office.Pincode))];
      }),
      tap(pincodes => {
        this.pincodes = pincodes;
        const pincodeControl = this.applyForm.get('pincode');
        pincodeControl?.setValue(pincodes[0] || '', { emitEvent: true });
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('API Error:', error.message, error.status, error.url);
        this.pincodes = [];
        this.applyForm.get('pincode')?.setValue('');
        this.errorMessage = `Failed to fetch pincodes for ${normalizedCity}. Status: ${error.status}. Check the city name or API availability.`;
        return of([]);
      })
    ).subscribe();
  }
}