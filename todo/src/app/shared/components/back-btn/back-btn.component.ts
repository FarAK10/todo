import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-back-btn',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './back-btn.component.html',
  styleUrl: './back-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackBtnComponent {
  private location = inject(Location);

  goBack() {
    this.location.back();
  }
}
