import { interval, Subject } from 'rxjs';
import { publish, refCount } from 'rxjs/operators';

const observable = interval(1000);

/**
 * 1. Create a new Subject.
 */

/**
 * 2. Use the publish operator to create a ConnectableObservable,
 *    and use the refCount operator
 */
const multicasted = observable.pipe(publish(), refCount());

/**
 * 3. Subscribe to the multicasted observable and keep a reference
 *    to the Subscription that is reterned.
 */
const sub = multicasted.subscribe(console.log);
sub.add(multicasted.subscribe(console.log));

/**
 * 4. After 5000 milliseconds unsubscribe from the multicasted observable.
 */

setTimeout(() => sub.unsubscribe(), 5000);
