import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';
import { MatchPasswordValidator } from 'src/app/core/validators/match-password.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  @Output() switchTab = new EventEmitter<number>();
  signUpForm!: FormGroup;
  isSubmitted = false;
  isLoading = false;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _notification: NzNotificationService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this._fb.group(
      {
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('^(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
          ]),
        ],
        confirmPassword: ['', Validators.compose([Validators.required])],
      },
      {
        validator: MatchPasswordValidator(),
      }
    );
  }

  signUp() {
    this.isSubmitted = true;
    if (this.signUpForm.valid) {
      const { email, password } = this.signUpForm.value;
      this.isLoading = true;
      this._authService.signUp(email, password).subscribe({
        next: () => {
          this.isLoading = false;
          this.isSubmitted = false;
          this.signUpForm.reset();
          this._notification.success(
            'Successfully',
            'Account has been created.',
            {
              nzPlacement: 'topRight',
              nzDuration: 2000,
            }
          );
          this._router.navigate(['']);
        },
        error: (err) => {
          this.isLoading = false;
          this.isSubmitted = false;
          this._notification.error('Error', err, {
            nzPlacement: 'topRight',
            nzDuration: 2000,
          });
        },
      });
    }
  }
}
