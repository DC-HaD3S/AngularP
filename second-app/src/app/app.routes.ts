import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { UserTypeListComponent } from './components/user-type-list/user-type-list.component';
import { CourseCategoryListComponent } from './components/course-category-list/course-category-list.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UserListComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'user-types', component: UserTypeListComponent },
  { path: 'course-categories', component: CourseCategoryListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];