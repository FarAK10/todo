import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { filter, map, Observable, take, tap } from 'rxjs';
import { IGetTodoDTO } from '../../../../core/typings/todo';
import { toSignal } from '@angular/core/rxjs-interop';
import { DeleteBtnComponent } from '../../../../shared/components/delete-btn/delete-btn.component';
import { EditBtnComponent } from '../../../../shared/components/edit-btn/edit-btn.component';
import { DeleteConfirmDialogComponent } from '../../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { IDeleteDialogData } from '../../../../shared/components/delete-confirm-dialog/typings/delete-dialog-data.interfac';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import * as TodoActions from '../../store/todo.actions';
import * as TodoSelectors from '../../store/todo.selectors';
import { Store } from '@ngrx/store';
import { BackBtnComponent } from '../../../../shared/components/back-btn/back-btn.component';
@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DeleteBtnComponent,
    EditBtnComponent,
    RouterModule,
    MatDialogModule,
    BackBtnComponent,
  ],
})
export class TodoDetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  dialog = inject(MatDialog);
  store = inject(Store);
  constructor() {}

  todo$: Observable<IGetTodoDTO> = this.route.data.pipe(
    map((data) => data['todo'])
  );

  todo = toSignal(this.todo$);

  completedText = computed(() =>
    this.todo()?.completed ? 'completed' : 'not completed'
  );

  ngOnInit() {}

  deleteTodo(): void {
    const title = `Delete Todo?`;
    const subtitle = `Are you sure to delete ${this.todo()?.title}?`;
    const data: IDeleteDialogData = {
      title,
      subtitle,
    };
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, { data });
    dialogRef
      .afterClosed()
      .pipe(
        filter((isConfirmed) => isConfirmed),
        tap(() => {
          const id = this.todo()?.id as string;
          this.store.dispatch(TodoActions.deleteTodo({ id }));
        }),
        take(1)
      )
      .subscribe();
  }
}
