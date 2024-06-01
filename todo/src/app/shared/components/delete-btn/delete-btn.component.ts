import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-delete-btn',
  standalone: true,
  imports: [CommonModule, MatIcon, MatButtonModule],
  templateUrl: './delete-btn.component.html',
  styleUrl: './delete-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteBtnComponent {
  onClick = output<void>();

  onPress() {
    this.onClick.emit();
  }
}
