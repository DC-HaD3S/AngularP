import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../core/service/housing.service';
import { HousingLocation } from '../../interface/housinglocation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  fb = inject(FormBuilder);
  housingLocation: HousingLocation | undefined;
  errorMessage: string | null = null;

  applyForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    occupation: ['', [Validators.required, Validators.minLength(2)]],
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
  }

  submitApplication() {
    if (this.applyForm.valid) {
      this.housingService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.email ?? '',
        this.applyForm.value.phone ?? '',
        this.applyForm.value.address ?? '',
        this.applyForm.value.occupation ?? '',
        this.applyForm.value.monthlyIncome ?? '',
        this.applyForm.value.moveInDate ?? ''
      ).then(
        () => this.applyForm.reset(),
        error => this.errorMessage = 'Failed to submit application. Please try again.'
      );
    }
  }
}