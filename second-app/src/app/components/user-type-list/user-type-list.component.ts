import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { UserType } from 'src/app/models/user-type';
@Component({
  selector: 'app-user-type-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>User Types</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let userType of userTypes">
          <td>{{ userType.id }}</td>
          <td>{{ userType.title }}</td>
        </tr>
      </tbody>
    </table>
  `
})
export class UserTypeListComponent implements OnInit {
  userTypes: UserType[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUserTypes().subscribe(data => {
      this.userTypes = data;
    });
  }
}