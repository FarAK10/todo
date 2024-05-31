import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  OnInit,
  output,
} from '@angular/core';
import { SubmitButtonStyle } from '../../typings/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-save-btn',
  templateUrl: './save-btn.component.html',
  styleUrls: ['./save-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class SaveBtnComponent {
  isDisabled = input<boolean>(false);
  isError = input<boolean>(false);
  onClick = output<void>();

  styles = computed<SubmitButtonStyle>(() => ({
    error: this.isError(),
    blocked: this.isDisabled(),
  }));
}
