import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IGetTodoDTO } from '../../../../core/typings/todo';
import { CommonModule } from '@angular/common';
import { DeleteBtnComponent } from '../../../../shared/components/delete-btn/delete-btn.component';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { IDeleteDialogData } from '../../../../shared/components/delete-confirm-dialog/typings/delete-dialog-data.interfac';
import { DeleteConfirmDialogComponent } from '../../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [MatCardModule, CommonModule, DeleteBtnComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  todo = input.required<IGetTodoDTO>();
  router = inject(Router);
  route = inject(ActivatedRoute);

  viewDetails() {
    const id = this.todo().id;
    this.router.navigate([id], { relativeTo: this.route });
  }
}
