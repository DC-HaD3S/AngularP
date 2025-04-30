import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from './core/store/auth/auth.state';
import { autoLogin } from './core/store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'homes';

  constructor(private store: Store<{ auth: AuthState }>) {
    this.store.dispatch(autoLogin());
  }
}