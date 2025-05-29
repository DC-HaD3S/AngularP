import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
import { CourseListComponent } from './course-list/course-list.component';
import { UserTypeListComponent } from './user-type-list/user-type-list.component';
import { CourseCategoryListComponent } from './course-category-list/course-category-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserListComponent,
    CourseListComponent,
    UserTypeListComponent,
    CourseCategoryListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
