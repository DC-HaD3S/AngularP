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

  cardConfig = (id: string) => ({
    fields: {},
    titleField: 'name',
    subtitleField: 'city',
    imageField: 'photo',
    button: { label: 'Learn More', link: ['/details', id] }
  });

  constructor() {
    this.housingService.getAllHousingLocations().then(
      (housingLocations: HousingLocation[]) => {
        this.housingLocationList = housingLocations;
        this.filteredLocationList = housingLocations;
      },
      (error: Error) => {
        this.errorMessage = 'Failed to load housing locations. Please try again.';
        console.error('Failed to load housing locations:', error.message);
      }
    );
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}