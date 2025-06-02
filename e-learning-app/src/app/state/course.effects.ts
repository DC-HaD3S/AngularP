import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CourseService } from '../services/course.service';
import { loadCourses, loadCoursesSuccess, loadCoursesFailure } from './course.actions';

@Injectable()
export class CourseEffects {
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCourses),
      mergeMap(() =>
        this.courseService.getCourses().pipe(
          map(courses => loadCoursesSuccess({ courses })),
          catchError(error => of(loadCoursesFailure({ error: 'Failed to load courses.' })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private courseService: CourseService
  ) {}
}