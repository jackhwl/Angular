import { fromEvent, throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, finalize, mergeMap, tap } from 'rxjs/operators';

const message = document.getElementById('message') as HTMLDivElement;
const login = document.getElementById('login') as HTMLFormElement;
const email = document.getElementById('email') as HTMLInputElement;
const password = document.getElementById('password') as HTMLInputElement;

fromEvent(login, 'submit')
  .pipe(
    tap(event => event.preventDefault()),
    mergeMap(event =>
      ajax
        .post('https://reqres.in/api/login', {
          email: email.value,
          password: password.value
        })
        .pipe(
          catchError(error => {
            message.classList.remove('hidden');
            return throwError(error);
          }),
          finalize(() =>
            setTimeout(() => message.classList.add('hidden'), 5000)
          )
        )
    )
  )
  .subscribe({
    error: e => console.error('observer', e),
    next: value => console.log('next', value),
    complete: () => console.log('complete')
  });
