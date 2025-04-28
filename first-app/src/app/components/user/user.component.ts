import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HousingService } from '../../core/service/housing.service';
import { Application } from '../../interface/application';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  applications: Application[] = [];
  errorMessage: string | null = null;
  isLoading: boolean = false;

  cardConfig = {
    fields: {
      lastName: 'Last Name',
      email: 'Email',
      monthlyIncome: 'Monthly Income'
    },
    titleField: 'firstName',
    subtitleField: 'city',
    formatTitle: (data: Application) => `${data.firstName} ${data.lastName}`,
  };

  constructor(private router: Router, private housingService: HousingService) {}

  ngOnInit() {
    this.isLoading = true;
    this.housingService.getAllApplications().then(
      (applications: Application[]) => {
        this.applications = applications;
        this.isLoading = false;
      },
      (error: Error) => {
        this.errorMessage = 'Failed to load user applications. Please try again.';
        console.error('Failed to load applications:', error.message);
        this.isLoading = false;
      }
    );
  }


}