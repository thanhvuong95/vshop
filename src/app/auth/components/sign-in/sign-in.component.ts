import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  @Output() switchTab = new EventEmitter<number>();
  signInForm!: FormGroup;
  isSubmitted = false;
  isLoading = false;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signInForm = this._fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
        ]),
      ],
    });
  }

  signIn() {
    this.isSubmitted = true;
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.isLoading = true;
      this._authService.signIn(email, password).subscribe({
        next: () => {
          this.isLoading = false;
          this._router.navigate(['']);
        },
        error: (err) => {
          this.isLoading = false;
          this._notification.error('Error', err, {
            nzPlacement: 'topRight',
            nzDuration: 2000,
          });
        },
      });
    }
  }
}
