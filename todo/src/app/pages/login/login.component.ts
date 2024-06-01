import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  computed,
  effect,
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

import {
  distinctUntilChanged,
  finalize,
  map,
  startWith,
  take,
  tap,
} from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { RootRoutes } from '../../core/constants/routes';
import { Store } from '@ngrx/store';
import * as UserActions from '../../store/user/user.actions';
import * as UserSelectors from '../../store/user/user.selector';
import { LoadingService } from '../../core/services/loading.service';

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
  router = inject(Router);
  store = inject(Store);
  fb = inject(FormBuilder);
  loadingService = inject(LoadingService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  private isFormValid$ = this.loginForm.statusChanges.pipe(
    map((status) => status === 'VALID'),
    startWith(this.loginForm.valid),
    distinctUntilChanged()
  );

  isLoading = toSignal(this.loadingService.loading$);
  isFormValid = toSignal(this.isFormValid$);

  isButtonDisabled = computed(() => {
    const formValid = !!this.isFormValid();
    const loading = !!this.isLoading();
    return !formValid || loading;
  });
  constructor() {}
  onSubmit(): void {}

  login(): void {
    const loginDTo = this.loginForm.value as ILoginDTO;
    this.store.dispatch(UserActions.login(loginDTo));
  }

  get loginControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
