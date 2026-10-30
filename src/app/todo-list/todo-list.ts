import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { Todo, TodoFilter } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoList {
  private readonly todos = inject(TodoService);

  readonly editingId = input<string | null>(null);
  readonly edited = output<Todo>();
  readonly removed = output<string>();

  protected readonly filters = ['all', 'open', 'done'] as const;
  protected readonly filterLabels: Record<TodoFilter, string> = {
    all: 'All',
    open: 'Open',
    done: 'Done',
  };

  protected readonly filter = signal<TodoFilter>('all');

  protected readonly visibleItems = computed(() => {
    const mode = this.filter();
    return this.todos.items().filter((todo) => {
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
    if (this.todos.items().length === 0) {
      return 'No tasks yet. Add one above.';
    }
    if (this.filter() === 'open') {
      return 'No open tasks.';
    }
    return 'No done tasks.';
  });

  protected selectFilter(next: TodoFilter): void {
    this.filter.set(next);
  }

  protected edit(todo: Todo): void {
    this.edited.emit(todo);
  }

  protected toggle(id: string): void {
    this.todos.toggle(id);
  }

  protected remove(id: string): void {
    this.todos.remove(id);
    this.removed.emit(id);
  }
}
