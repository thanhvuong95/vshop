import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { map, Observable, take } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _notification: NzNotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._authService.user.pipe(
      take(1),
      map((user) => {
        if (user) {
          return true;
        }
        this._notification.error('Error', 'You are not logged in.', {
          nzPlacement: 'topRight',
          nzDuration: 2000,
        });
        return false;
      })
    );
  }
}
