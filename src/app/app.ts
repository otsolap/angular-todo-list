import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { requiredText } from './required-text';
import { Todo, TodoFilter } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly formBuilder = inject(FormBuilder);
  private readonly todos = inject(TodoService);

  protected readonly items = this.todos.items;
  protected readonly openCount = this.todos.openCount;
  protected readonly filters = ['all', 'open', 'done'] as const;
  protected readonly filterLabels: Record<TodoFilter, string> = {
    all: 'All',
    open: 'Open',
    done: 'Done',
  };

  protected readonly filter = signal<TodoFilter>('all');
  protected readonly editingId = signal<string | null>(null);
  protected readonly showErrors = signal(false);

  protected readonly form = this.formBuilder.nonNullable.group({
    title: ['', [requiredText, Validators.maxLength(120)]],
  });

  protected readonly visibleItems = computed(() => {
    const mode = this.filter();
    return this.items().filter((todo) => {
      if (mode === 'open') {
        return !todo.done;
      }
      if (mode === 'done') {
        return todo.done;
      }
      return true;
    });
  });

  protected readonly emptyMessage = computed(() => {
    if (this.items().length === 0) {
      return 'No tasks yet. Add one above.';
    }
    if (this.filter() === 'open') {
      return 'No open tasks.';
    }
    return 'No done tasks.';
  });

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

  protected selectFilter(next: TodoFilter): void {
    this.filter.set(next);
  }

  protected save(): void {
    this.showErrors.set(true);
    this.form.controls.title.markAsTouched();
    if (this.form.invalid) {
      return;
    }

    const title = this.form.controls.title.value;
    const id = this.editingId();
    if (id === null) {
      this.todos.add(title);
    } else {
      this.todos.update(id, title);
    }
    this.clearForm();
  }

  protected edit(todo: Todo): void {
    this.editingId.set(todo.id);
    this.showErrors.set(false);
    this.form.controls.title.setValue(todo.title);
    this.form.controls.title.markAsUntouched();
  }

  protected cancelEdit(): void {
    this.clearForm();
  }

  protected toggle(id: string): void {
    this.todos.toggle(id);
  }

  protected remove(id: string): void {
    if (this.editingId() === id) {
      this.clearForm();
    }
    this.todos.remove(id);
  }

  private clearForm(): void {
    this.editingId.set(null);
    this.showErrors.set(false);
    this.form.reset({ title: '' });
  }
}
