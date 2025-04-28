import { Component, inject } from '@angular/core';
import { HousingService } from '../../core/service/housing.service';
import { HousingLocation } from '../../interface/housinglocation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingService: HousingService = inject(HousingService);
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor() {
    this.isLoading = true;
    this.housingService.getAllHousingLocations().then(
      (housingLocations: HousingLocation[]) => {
        this.housingLocationList = housingLocations;
        this.filteredLocationList = housingLocations;
        this.isLoading = false;
      },
      (error: Error) => {
        this.errorMessage = 'Failed to load housing locations. Please try again.';
        console.error('Failed to load housing locations:', error.message);
        this.isLoading = false;
      }
    );
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
}