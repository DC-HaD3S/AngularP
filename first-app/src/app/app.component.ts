import { Component } from '@angular/core';
import { AuthService } from './core/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html' ,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';
  constructor(private authService: AuthService) {
    this.authService.autoLogin(); // 🔁 Auto restore login state on reload
  }

}
