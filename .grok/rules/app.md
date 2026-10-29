# Angular todo list

## Commands

- Start the app with `npm start`. Open http://localhost:4200/.
- Build with `npm run build`.

## TypeScript

- Type everything. `any` and `unknown` are only acceptable when the structure cannot be reliably determined (e.g. backend responses: `Record<string, any>`).
- Narrow that value with a type guard before the rest of the code uses it.
- Do not use a cast when a real type is possible.

## Angular

- Use Reactive Forms from `@angular/forms` for forms.
- Use `inject()` for dependencies.
- Keep the task list in a signal.
- Keep template-only members `protected`.
- Keep the Angular 2025 file names already used in `src/app/`.

## Styles

- Use the brand tokens in `src/styles/brand.css`.
- Headings use Hind Guntur. Body text uses Poppins.
- The page background is blue. The text is white.
- The primary action button is orange. The selected filter is teal.
