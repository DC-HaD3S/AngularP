import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class InstructorListComponent  {
  instructors = [
    { id: 1, name: 'John Doe', email: 'john@example.com', qualifications: 'PhD in CS', yearsOfExperience: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', qualifications: 'MSc in IT', yearsOfExperience: 3 }
  ]; 


}