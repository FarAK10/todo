import { RouterModule } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { IToast } from '../../typings/toast.interface';
@Component({
  selector: 'toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit {
  toast = input.required<IToast>();

  ngOnInit(): void {}
}
