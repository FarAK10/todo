import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { RootRoutes } from '../../../../core/constants/routes';
import * as UserSelectors from '../../../../store/user/user.selector'
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  router = inject(Router);
  store = inject(Store)
  userName = toSignal(this.store.select(UserSelectors.selectUserName))

  goHome() {
    this.router.navigate([RootRoutes.todos]);
  }
}
