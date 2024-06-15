import { AbstractControl, ValidationErrors } from "@angular/forms";

export function restrictedWords(words: string[]) {
  return (control: AbstractControl): ValidationErrors | null => {
    const invalidWords = words
      .map(w => control.value.includes(w) ? w : null)
      .filter(w => w != null)
    return invalidWords.length > 0
      ? { restrictedWords: invalidWords.join(', ')} 
      : null
  }
}