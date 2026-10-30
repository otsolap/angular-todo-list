import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { requiredText } from '../required-text';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoForm {
  private readonly formBuilder = inject(FormBuilder);
  private readonly todos = inject(TodoService);

  readonly todo = input<Todo | null>(null);
  readonly finished = output<void>();

  protected readonly showErrors = signal(false);
  protected readonly form = this.formBuilder.nonNullable.group({
    title: ['', [requiredText, Validators.maxLength(120)]],
  });

  constructor() {
    effect(() => {
      const todo = this.todo();
      untracked(() => this.applyTodo(todo));
    });
  }

  protected titleError(): string | null {
    const control = this.form.controls.title;
    if (!control.touched && !this.showErrors()) {
      return null;
    }
    if (control.hasError('required')) {
      return 'Enter a task.';
    }
    if (control.hasError('maxlength')) {
      return 'Use 120 characters or fewer.';
    }
    return null;
  }

  protected save(): void {
    this.showErrors.set(true);
    this.form.controls.title.markAsTouched();
    if (this.form.invalid) {
      return;
    }

    const title = this.form.controls.title.value;
    const todo = this.todo();
    if (todo === null) {
      this.todos.add(title);
      this.applyTodo(null);
      return;
    }

    this.todos.update(todo.id, title);
    this.finished.emit();
  }

  protected cancelEdit(): void {
    this.finished.emit();
  }

  private applyTodo(todo: Todo | null): void {
    this.showErrors.set(false);
    if (todo === null) {
      this.form.reset({ title: '' });
      return;
    }

    this.form.controls.title.setValue(todo.title);
    this.form.controls.title.markAsUntouched();
  }
}
