import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { CourseCategory } from 'src/app/models/course-category.model';

@Component({
  selector: 'app-course-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'course-category-list.component.html'
})
export class CourseCategoryListComponent implements OnInit {
  courseCategories: CourseCategory[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getCourseCategories().subscribe(data => {
      this.courseCategories = data;
    });
  }
}