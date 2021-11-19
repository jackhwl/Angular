import { BehaviorSubject, fromEvent } from 'rxjs';
import { map, scan } from 'rxjs/operators';

/**
 * 1. Create a new BehaviorSubject, specify the generic type
 *    `number`, and set the seed value to `0`.
 */
const behaviorSubject = new BehaviorSubject<number>(0);
/**
 * 2. Use the `scan()` operator to sum the values emitted
 *    by the BehaviorSubject.
 *
 * 3. Subscribe to the BehaviorSubject and set the value
 *    property for the `sum` input.
 */
const sum = document.getElementById('sum') as HTMLInputElement;
behaviorSubject
  .pipe(scan<number, number>((prev, value) => prev + value, 0))
  .subscribe(v => (sum.value = v.toString()));

/**
 * 4. Use the `fromEvent()` operator to add an event listener to
 *    both the `add` and `sub` button elements.
 *
 * 5. Use the `map()` operator to map the MouseEvent to either a
 *    positive 1 or a negative 1 for the add and subtract buttons
 *    respectively.
 *
 * 6. Subscribe to the event stream for both buttons  and set the
 *    Observer to the `BehaviorSubject` instance.
 */
const add = document.getElementById('add') as HTMLButtonElement;
const sub = document.getElementById('sub') as HTMLButtonElement;
fromEvent(add, 'click')
  .pipe(map(() => 1))
  .subscribe(behaviorSubject);

fromEvent(sub, 'click')
  .pipe(map(() => -1))
  .subscribe(behaviorSubject);
