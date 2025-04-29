import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { HousingService } from '../../core/service/housing.service';
import { HousingLocation } from '../../interface/housinglocation';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-manage-houses',
  templateUrl: './manage-houses.component.html',
  styleUrls: ['./manage-houses.component.css']
})
export class ManageHousesComponent implements OnInit {
  houses: HousingLocation[] = [];
  filteredHouses: HousingLocation[] = [];
  searchControl = new FormControl('');
  errorMessage: string | null = null;
  displayedColumns: string[] = ['name', 'city', 'state', 'availableUnits', 'actions'];
  @ViewChild('houseDialog') houseDialog!: TemplateRef<any>;
  houseForm!: FormGroup;
  dialogRef!: MatDialogRef<any>;
  house: HousingLocation | null = null;

  constructor(
    private housingService: HousingService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.fetchHouses();
    this.searchControl.valueChanges.subscribe(() => this.filterHouses());
    this.initForm();
  }

  initForm(house?: HousingLocation) {
    this.houseForm = this.fb.group({
      id: [house?.id || null],
      name: [house?.name || '', [Validators.required, Validators.minLength(2)]],
      city: [house?.city || '', [Validators.required, Validators.minLength(2)]],
      state: [house?.state || '', [Validators.required, Validators.minLength(2)]],
      photo: [house?.photo || '', [Validators.required, Validators.pattern(/https?:\/\/.*\.(?:png|jpg|jpeg|gif)/i)]],
      availableUnits: [house?.availableUnits || 0, [Validators.required, Validators.min(0)]],
      wifi: [house?.wifi || false],
      laundry: [house?.laundry || false]
    });
  }

  fetchHouses() {
    this.housingService.getAllHousingLocations().then(
      (houses: HousingLocation[]) => {
        this.houses = houses;
        this.filterHouses();
      },
      (error: Error) => {
        this.errorMessage = 'Failed to load houses. Please try again.';
        console.error('Failed to load houses:', error.message);
      }
    );
  }

  filterHouses() {
    const searchName = this.searchControl.value || '';
    if (!searchName) {
      this.filteredHouses = this.houses;
    } else {
      this.filteredHouses = this.houses.filter(house =>
        house.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
  }

  openHouseDialog(house?: HousingLocation) {
    this.house = house || null;
    this.initForm(house);
    this.dialogRef = this.dialog.open(this.houseDialog, {
      width: '500px'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (house) {
          this.updateHouse(result);
        } else {
          this.createHouse(result);
        }
      }
    });
  }

  createHouse(house: HousingLocation) {
    this.housingService.createHouse(house).then(
      () => {
        this.fetchHouses();
        this.snackBar.open('House created successfully', 'Close', { duration: 3000 });
      },
      (error: Error) => {
        this.errorMessage = 'Failed to create house. Please try again.';
        console.error('Failed to create house:', error.message);
      }
    );
  }

  updateHouse(house: HousingLocation) {
    this.housingService.updateHouse(house).then(
      () => {
        this.fetchHouses();
        this.snackBar.open('House updated successfully', 'Close', { duration: 3000 });
      },
      (error: Error) => {
        this.errorMessage = 'Failed to update house. Please try again.';
        console.error('Failed to update house:', error.message);
      }
    );
  }

  deleteHouse(id: number) {
    if (confirm('Are you sure you want to delete this house?')) {
      this.housingService.deleteHouse(id).then(
        () => {
          this.fetchHouses();
          this.snackBar.open('House deleted successfully', 'Close', { duration: 3000 });
        },
        (error: Error) => {
          this.errorMessage = 'Failed to delete house. Please try again.';
          console.error('Failed to delete house:', error.message);
        }
      );
    }
  }

  save() {
    if (this.houseForm.valid) {
      this.dialogRef.close(this.houseForm.value);
    }
  }
}