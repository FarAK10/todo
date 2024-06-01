import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SaveBtnComponent } from '../../shared/components/save-btn/save-btn.component';
import { ILoginDTO, ILoginResponse } from '../../core/typings/auth.dto';
import { AuthApiClient } from '../../core/services/auth.client';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../shared/components/toasts/services/toast.service';
import { ToastComponent } from '../../shared/components/toasts/components/toast/toast.component';
import { IToast } from '../../shared/components/toasts/typings/toast.interface';
import { ToastKeys } from './constants/toast-keys';
import { ToastsComponent } from '../../shared/components/toasts/toasts.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    SaveBtnComponent,
    ToastsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ToastService],
})
export class LoginComponent {
  authClient = inject(AuthApiClient);
  authService = inject(AuthService);
  toastService = inject(ToastService);
  fb = inject(FormBuilder);

  toastKeys = signal([ToastKeys.loginError, ToastKeys.loginSuccess]);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit(): void {}

  login(): void {
    const loginDTo = this.loginForm.value as ILoginDTO;
    this.authClient.login(loginDTo).subscribe({
      next: (res: ILoginResponse) => {
        this.onSuccess(res);
      },
      error: (err) => {
        this.onErrorResponse(err);
      },
    });
  }

  get loginControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  private onErrorResponse(err: any): void {
    const errorMessage = (err.status = 400 ? err.error.message : err.message);
    const toast: IToast = {
      key: ToastKeys.loginError,
      type: 'error',
      message: errorMessage,
    };

    this.toastService.addToast(toast);
  }

  private onSuccess(res: ILoginResponse): void {
    this.authService.setAccessToken(res.token);
    const toast: IToast = {
      key: ToastKeys.loginSuccess,
      type: 'success',
      message: 'Login succes',
    };
    console.log(toast);
    this.toastService.addToast(toast);
  }
}
