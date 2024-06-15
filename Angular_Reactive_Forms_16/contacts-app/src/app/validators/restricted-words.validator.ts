import { AbstractControl, ValidationErrors } from "@angular/forms";

export function restrictedWords(control: AbstractControl): ValidationErrors | null {
    return control.value.includes('foo') 
    ? { restrictedWords: true} 
    : null
}