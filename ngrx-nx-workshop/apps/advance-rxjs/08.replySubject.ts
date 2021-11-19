import { ReplaySubject, fromEvent } from 'rxjs';
import { map, scan } from 'rxjs/operators';

/**
 * 1. Create a new ReplaySubject and specify the generic type
 *    `number`.
 */
const replySubject = new ReplaySubject<number>();
/**
 * 2. Use the `fromEvent` creation operator to add an event
 *    listener to both the `add` and `sub` buttons.
 *    Within the `pipe()` for each mouse event use the `map()`
 *    operator to map to either `1` or `-1` appropriately.
 *    Finally, subscribe to both event listener Observables
 *    and set the `ReplaySubject` instance as the Observer.
 */
const add = document.getElementById('add') as HTMLButtonElement;
const sub = document.getElementById('sub') as HTMLButtonElement;
fromEvent(add, 'click')
  .pipe(map(() => 1))
  .subscribe(replySubject);

fromEvent(sub, 'click')
  .pipe(map(() => -1))
  .subscribe(replySubject);

/**
 * 3. Use the `EventTarget.addEventListener` to add a click
 *    event listener to the `calc` button.
 * 4. In the callback function, subscribe to the `ReplaySubject`
 *    instance.
 *    Within the `pipe()` use the `scan()` operator to sum
 *    the next notifications values.
 *    Within the `subscribe()` method set the `value` property
 *    for the `sum` input element to the next notification
 *    value emitted.
 */
const sum = document.getElementById('sum') as HTMLInputElement;
const calc = document.getElementById('calc') as HTMLButtonElement;
calc.addEventListener('click', () =>
  replySubject
    .pipe(scan<number, number>((prev, value) => prev + value, 0))
    .subscribe(v => (sum.value = v.toString()))
);
