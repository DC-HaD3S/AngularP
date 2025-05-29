import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserRole } from '../../enums/user-role.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isAdmin$: Observable<boolean>;

  constructor(private store: Store<{ auth: { role: UserRole | null } }>) {
    this.isAdmin$ = this.store.select(state => state.auth.role === UserRole.Admin);
  }
}