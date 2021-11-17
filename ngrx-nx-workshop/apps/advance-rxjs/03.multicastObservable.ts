import { ConnectableObservable, interval, Observable, Subject } from 'rxjs';
import { multicast } from 'rxjs/operators';

const observable = interval(1000);

/**
 * 1. Define a new Subject.
 */
const s = new Subject<number>();

/**
 * 2. Use the multicast operator in the pipe of the source observable.
 */
const multicasted = observable.pipe(multicast(s)) as ConnectableObservable<
  number
>;

/**
 * 3. Subscribe to the multicasted observable and log out the next notification values.
 */
const sub = multicasted.subscribe(console.log);

/**
 * 4. Connect the subject to the source observable.
 */
multicasted.connect();
