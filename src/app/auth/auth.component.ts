import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  tab = 0; //0: signIn 1: signUp
  subscription = new Subscription();
  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this.subscription = this._authService.user.subscribe((user) => {
      if (user) {
        this._router.navigate(['']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
