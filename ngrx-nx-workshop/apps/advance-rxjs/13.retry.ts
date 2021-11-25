import { fromEvent, throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, finalize, map, mergeMap, retry } from 'rxjs/operators';

/** The UserResponse represents the shape of the response from the API. */
interface UserResponse {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
}

/** The random function returns a random integer inclusively between `min` and `max`. */
function random(max: number, min: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const output = document.getElementById('output') as HTMLTextAreaElement;
const btn = document.getElementById('btn') as HTMLButtonElement;

/**
 * 1. After the `map()` operator that returns a random integer between 10 and 15,
 *    use the `mergeMap()` operator, which will receive the `id` of the user to
 *    fetch.
 * 2. Within the `mergeMap()` operator use the `ajax.getJSON()` method to make
 *    an HTTP GET request to the API for the specified user id.
 * 3. Use the `map()` operator to map the response to its `data` property.
 * 4. Use the `catchError()` operator to catch an error, and update the `output`
 *    textarea's `value` with the error's `message` property value.
 *    Then, rethrow the error using the `throwError()` operator.
 * 5. Use the `retry()` operator to retry errors from the API and to prevent
 *    the Observable of the click events from completion via the error notification.
 * 6. Use the `finalize()` operator to add the `cursor-not-allowed` and `opacity-50`
 *    classes to the `btn` element when the retry count has extinguished.
 */

/**
 * Hints:
 * - Note the `next()` callback function in the Observer.
 *   You can use similar code in the `catchError()` callback function
 *   in order to update the textarea value and scroll the textarea
 *   to the bottom.
 * - Use the `Element.classList` property on the `btn` element to add
 *   the necessary classes.
 */

fromEvent(btn, 'click')
  .pipe(
    map(() => random(10, 15)),
    mergeMap(id =>
      ajax.getJSON<UserResponse>(`https://reqres.in/api/users/${id}`).pipe(
        map(response => response.data),
        catchError(error => {
          output.value += `\n\n${JSON.stringify(error.message, null, 2)}`;
          output.scrollTop = output.scrollHeight;
          return throwError(error);
        })
      )
    ),
    retry(4),
    finalize(() => {
      btn.classList.add('cursor-not-allowed');
      btn.classList.add('opacity-50');
    })
  )
  .subscribe({
    error: e => console.error('observer', e),
    next: value => {
      output.value += `\n\n${JSON.stringify(value, null, 2)}`;
      output.scrollTop = output.scrollHeight;
    },
    complete: () => console.log('complete')
  });
