import { AbstractControl, ValidationErrors } from '@angular/forms';

/** Rejects an empty value and a value that is only spaces. */
export function requiredText(control: AbstractControl): ValidationErrors | null {
  const raw: unknown = control.value;
  const value = typeof raw === 'string' ? raw.trim() : '';
  return value.length === 0 ? { required: true } : null;
}
