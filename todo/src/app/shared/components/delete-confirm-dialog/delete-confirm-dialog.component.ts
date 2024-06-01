import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { IDeleteDialogData } from './typings/delete-dialog-data.interfac';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-confirm-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrl: './delete-confirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteConfirmDialogComponent {
  dialogData: IDeleteDialogData = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<DeleteConfirmDialogComponent>);

  close(isConfirmed: boolean) {
    console.log('isconfirmed', isConfirmed);
    this.dialogRef.close(isConfirmed);
  }
}
