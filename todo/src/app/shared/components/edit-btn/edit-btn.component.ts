import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-btn',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './edit-btn.component.html',
  styleUrl: './edit-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBtnComponent {
  onClick = output<void>();

  onPress() {
    this.onClick.emit();
  }
}
