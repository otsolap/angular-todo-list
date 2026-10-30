import { Component, inject, signal } from '@angular/core';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { Todo } from './todo';
import { TodoForm } from './todo-form/todo-form';
import { TodoList } from './todo-list/todo-list';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  imports: [Header, TodoForm, TodoList, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly todos = inject(TodoService);

  protected readonly openCount = this.todos.openCount;
  protected readonly editing = signal<Todo | null>(null);

  protected startEdit(todo: Todo): void {
    this.editing.set(todo);
  }

  protected finishEdit(): void {
    this.editing.set(null);
  }

  protected clearRemovedEdit(id: string): void {
    if (this.editing()?.id === id) {
      this.finishEdit();
    }
  }
}
