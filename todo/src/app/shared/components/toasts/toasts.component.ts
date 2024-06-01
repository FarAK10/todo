import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { ToastComponent } from './toast/toast.component';
import { ToastService } from './services/toast.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'toasts',
  standalone: true,
  imports: [ToastComponent, CommonModule],
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastsComponent implements OnInit {
  toastService = inject(ToastService);
  destroyRef = inject(DestroyRef);
  clearToasts$ = this.toastService.clearToasts$.pipe(
    takeUntilDestroyed(this.destroyRef)
  );
  toasts$ = this.toastService.toasts$;
  ngOnInit() {
    this.clearToasts$.subscribe();
  }
}
