import { Component } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shop';
  openCart = false;

  constructor(private _authService: AuthService) {
    this._authService.autoLogin();
  }
}
