import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbacks = [
    { id: 1, courseId: 1, rating: 4, comments: 'Great course, very informative!' },
    { id: 2, courseId: 2, rating: 5, comments: 'Loved the JavaScript basics.' }
  ]; 

  ngOnInit(): void {
    
  }
}