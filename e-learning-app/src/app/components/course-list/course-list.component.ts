import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Course } from '../../models/course.model';
import { UserRole } from '../../enums/user-role.enum';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseApplyDialogComponent } from '../course-apply-dialog/course-apply-dialog.component';
import { loadCourses } from '../../state/course.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses$: Observable<Course[]>;
  error$: Observable<string | null>;
  isAdmin$: Observable<boolean>;

  constructor(
    private store: Store<{ courses: { courses: Course[], error: string | null }, auth: { role: UserRole | null } }>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.courses$ = this.store.select(state => state.courses.courses);
    this.error$ = this.store.select(state => state.courses.error);
    this.isAdmin$ = this.store.select(state => state.auth.role === UserRole.Admin);
  }


  ngOnInit(): void {
    this.store.dispatch(loadCourses());
  }

  openApplyDialog(course: Course): void {
    const dialogRef = this.dialog.open(CourseApplyDialogComponent, {
      width: '500px',
      data: { course }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.message) {
        this.snackBar.open(`✅ ${result.message}`, 'Close', {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          panelClass: ['custom-snackbar']
        });
      }
    });
  }

  viewEnrolledUsers(courseId: number): void {
    this.snackBar.open(`Viewing enrolled users for course ID: ${courseId}`, 'Close', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['custom-snackbar']
    });
  }
}