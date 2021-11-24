import { fromEvent, throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap, tap } from 'rxjs/operators';

/**
 * DOM elements
 */
const login = document.getElementById('login') as HTMLFormElement;
const email = document.getElementById('email') as HTMLInputElement;
const password = document.getElementById('password') as HTMLInputElement;

/**
 * 1. Use the `fromEvent()` operator to add an event listener
 *    to the `login` form element's `submit` event.
 * 2. Use the `tap()` operator to invoke the `preventDefault()`
 *    method on the SubmitEvent object.
 * 3. Use the `mergeMap()` operator and if the value of the
 *    `login` or `password` input elements is falsey then throw
 *    an error using the `throwError()` operator.
 *    If the values are truthy then use the `ajax.pos()` method
 *    to post the email and password values to the API.
 * 4. Subscribe to the Observable and provide an Observer.
 */
const o = fromEvent(login, 'submit').pipe(
  tap(event => event.preventDefault()),
  mergeMap(() =>
    !email.value || !password.value
      ? throwError(new Error('email password required!'))
      : ajax.post('https://reqres.in/api/login', {
          email: email.value,
          password: password.value
        })
  )
);

o.subscribe({
  error: e => console.log('err:', e),
  next: v => console.log('next: ', v),
  complete: () => console.log('done')
});
