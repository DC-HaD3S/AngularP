import { Component, inject } from '@angular/core';
import { HousingService } from '../../core/service/housing.service';
import { HousingLocation } from '../../interface/housinglocation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingService = inject(HousingService);
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  errorMessage: string | null = null;

  constructor() {
    this.housingService.getAllHousingLocations().then(
      (housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
        if (!housingLocationList.length) {
          this.errorMessage = 'No housing locations found. Ensure json-server is running and db.json has the "locations" endpoint.';
        }
      },
      error => {
        this.errorMessage = 'Failed to load housing locations. Ensure json-server is running on port 8000 and db.json has the "locations" endpoint.';
        console.error('HomeComponent error:', error);
      }
    );
  }

  filterResults(searchText: string) {
    if (!searchText) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter(location =>
      location?.city?.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}