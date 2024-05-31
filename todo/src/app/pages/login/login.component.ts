import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SaveBtnComponent } from '../../shared/components/save-btn/save-btn.component';
import { ILoginDTO } from '../../core/typings/login.dto';
import { AuthApiClient } from '../../core/services/auth-api.client';
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  authClient = inject(AuthApiClient);
  fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    email: [''],
    password: [''],
  });

  onSubmit(): void {}

  login(): void {
    const loginDTo = this.loginForm.value as ILoginDTO;
    console.log(loginDTo, 'loginDTo');

    this.authClient.login(loginDTo).subscribe((v) => console.log(v));
  }

  get loginControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
