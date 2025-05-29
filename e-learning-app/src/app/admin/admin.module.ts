import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FeedbackListComponent } from '../components/feedback-list/feedback-list.component';
import { InstructorListComponent } from '../components/instructor-list/instructor-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FeedbackListComponent,
    InstructorListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }