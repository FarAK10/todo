import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
} from '@angular/core';
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from './services/toast.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';

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

  clearToast = toSignal(this.toastService.clearToasts$);
  toasts$ = this.toastService.toasts$;

  ngOnInit() {
    this.clearToast();
  }
}
