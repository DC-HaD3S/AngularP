import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { Course } from '../models/course.model';
import { UserType } from '../models/user-type';
import { CourseCategory } from '../models/course-category.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private users: User[] = [
    { userid: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', gender: 'Male', userType: 1 },
    { userid: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', gender: 'Female', userType: 2 }
  ];
  private courses: Course[] = [
    { courseid: 1, courseName: 'Angular Basics', description: 'Learn Angular', level: 'Beginner', instructorid: 2, categoryid: 1 },
    { courseid: 2, courseName: 'Advanced SQL', description: 'Master SQL', level: 'Advanced', instructorid: 2, categoryid: 1 }
  ];
  private userTypes: UserType[] = [
    { id: 1, title: 'Student' },
    { id: 2, title: 'Instructor' }
  ];
  private courseCategories: CourseCategory[] = [
    { id: 1, title: 'Programming' },
    { id: 2, title: 'Database' }
  ];

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  getCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  getUserTypes(): Observable<UserType[]> {
    return of(this.userTypes);
  }

  getCourseCategories(): Observable<CourseCategory[]> {
    return of(this.courseCategories);
  }
}