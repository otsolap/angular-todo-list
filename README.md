# Todo list

A small Angular app for learning Angular, TypeScript, and Reactive Forms.

You can add a task, edit it, mark it done, and delete it. You can show all tasks, open tasks, or done tasks. This browser keeps the list after you refresh the page.

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

| File | Purpose |
| --- | --- |
| `src/app/todo.ts` | The `Todo` type and the filter type |
| `src/app/todo.service.ts` | Create, read, update, and delete tasks |
| `src/app/required-text.ts` | The rule that rejects an empty task |
| `src/app/app.ts` | The Reactive Form and the page logic |
| `src/app/app.html` | The page |
| `src/app/app.css` | The page styles |

This app was created with Angular CLI 22.2.5.
