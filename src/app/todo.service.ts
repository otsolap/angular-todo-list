import { Injectable, computed, signal } from '@angular/core';
import { Todo } from './todo';

const storageKey = 'angular-todo-list.todos';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly todos = signal<Todo[]>(readTodos());

  readonly items = this.todos.asReadonly();
  readonly openCount = computed(() => this.todos().filter((todo) => !todo.done).length);

  add(title: string): void {
    const todo: Todo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      done: false,
    };
    this.todos.update((items) => [todo, ...items]);
    this.persist();
  }

  update(id: string, title: string): void {
    const cleanTitle = title.trim();
    this.todos.update((items) =>
      items.map((todo) => (todo.id === id ? { ...todo, title: cleanTitle } : todo)),
    );
    this.persist();
  }

  toggle(id: string): void {
    this.todos.update((items) =>
      items.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
    this.persist();
  }

  remove(id: string): void {
    this.todos.update((items) => items.filter((todo) => todo.id !== id));
    this.persist();
  }

  private persist(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    localStorage.setItem(storageKey, JSON.stringify(this.todos()));
  }
}

function readTodos(): Todo[] {
  if (typeof localStorage === 'undefined') {
    return [];
  }

  const raw = localStorage.getItem(storageKey);
  if (raw === null) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(isTodo);
  } catch {
    return [];
  }
}

function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;
  return (
    typeof item['id'] === 'string' &&
    typeof item['title'] === 'string' &&
    typeof item['done'] === 'boolean'
  );
}
