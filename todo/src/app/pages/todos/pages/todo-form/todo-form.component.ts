import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SaveBtnComponent } from '../../../../shared/components/save-btn/save-btn.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { IBaseTodoDTO, IGetTodoDTO } from '../../../../core/typings/todo';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
  tap,
} from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../../core/services/loading.service';
import { BackBtnComponent } from '../../../../shared/components/back-btn/back-btn.component';
import * as TodoActions from '../../store/todo.actions';
import * as UserSelectors from '../../../../store/user/user.selector';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SaveBtnComponent,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    BackBtnComponent,
    MatCheckboxModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  route = inject(ActivatedRoute);
  loadingService = inject(LoadingService);
  fb = inject(FormBuilder);
  store = inject(Store);

  todoForm = this.fb.group({
    title: ['', [Validators.required]],
    completed: [false, [Validators.required]],
  });

  todo$: Observable<IGetTodoDTO> = this.route.data.pipe(
    map((data) => data['todo'])
  );
  todo = toSignal(this.todo$);

  isLoading = toSignal(this.loadingService.loading$);

  userId = toSignal(this.store.select(UserSelectors.selectUserId));

  isFormValid$ = this.todoForm.statusChanges.pipe(
    distinctUntilChanged(),
    map((status) => status === 'VALID')
  );

  isFormValid = toSignal(this.isFormValid$);

  isButtonDisabled = computed(() => {
    const isFormValid = !!this.isFormValid();
    const isLoading = !!this.isLoading();
    return !isFormValid || isLoading;
  });

  isEditMode = computed(() => {
    return !!this.todo();
  });
  formTitle = computed(() => {
    return this.isEditMode() ? 'Edit todo' : 'Add todo';
  });

  buttonLabel = computed(() => {
    return this.isEditMode() ? 'edit' : 'add';
  });

  private completedValue$ = this.completedControl.valueChanges.pipe(
    distinctUntilChanged(),
    startWith(this.completedControl.value)
  );

  private completedValue = toSignal(this.completedValue$);

  completedLabel = computed(() => {
    return this.completedValue() ? 'completed' : 'not completed';
  });

  constructor() {
    effect(() => {
      this.initForm();
    });
  }

  save() {
    const userId = this.userId();
    const formValue = this.todoForm.value;
    const baseTodoDTO: IBaseTodoDTO = {
      completed: formValue.completed as boolean,
      title: formValue.title as string,
      user: userId as number,
    };
    if (this.isEditMode()) {
      this.updateTodo(baseTodoDTO);
    } else {
      this.addTodo(baseTodoDTO);
    }
  }

  private updateTodo(todoDTO: IBaseTodoDTO) {
    const todoId = this.todo()?.id as string;
    this.store.dispatch(
      TodoActions.updateTodo({ id: todoId, changes: todoDTO })
    );
  }

  private addTodo(todoDTO: IBaseTodoDTO) {
    this.store.dispatch(TodoActions.addTodo({ todo: todoDTO }));
  }

  private initForm() {
    const todo = this.todo();
    if (todo) {
      this.todoForm.patchValue(todo);
    }
  }

  get completedControl(): FormControl {
    return this.todoForm.get('completed') as FormControl;
  }
}
