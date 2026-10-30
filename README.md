# Todo list

A small Angular app for learning Angular, TypeScript, and Reactive Forms.

You can add a task, edit it, mark it done, and delete it. You can show all tasks, open tasks, or done tasks.

## Live app

The live app is at https://angular-todo-list.otsolappalainen.workers.dev/.

## Saved tasks

The tasks are saved in `localStorage`. This is not the browser cache.

`TodoService` writes the list after you add, edit, mark, or delete a task. The key is `angular-todo-list.todos`. The value is a JSON list.

The list stays in this browser after you refresh the page. It is not sent to a server. Another browser does not have the same list. If you clear this site's data, the tasks are gone.

The app uses Angular 22, TypeScript 6, and Reactive Forms from `@angular/forms`.

## Run the app

```bash
npm start
```

Open http://localhost:4200/.

## Build the app

```bash
npm run build
```

The build output goes in `dist/`.

## Project files

The root component is the page shell. The header, the footer, the form, and the task list are their own components.

| File | Purpose |
| --- | --- |
| `src/app/app.html` | The shell: header, task page, and footer |
| `src/app/app.ts` | The open-task count and the task being edited |
| `src/app/app.css` | The shell styles |
| `src/app/header/` | The site header |
| `src/app/footer/` | The site footer |
| `src/app/todo-form/` | Add a task or edit the selected task |
| `src/app/todo-list/` | Show, filter, complete, and delete tasks |
| `src/app/todo.ts` | The `Todo` type and the filter type |
| `src/app/todo.service.ts` | Create, read, update, and delete tasks |
| `src/app/required-text.ts` | The rule that rejects an empty task |

This app was created with Angular CLI 22.2.5.
