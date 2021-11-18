import { ConnectableObservable, interval, Subject } from 'rxjs';
import { multicast, refCount } from 'rxjs/operators';

const observable = interval(1000);

/**
 * 1. Define a new Subject.
 */
const s = new Subject();
/**
 * 2. Use the multicast operator in the pipe of the source observable.
 */
const multicasted = observable.pipe(multicast(s), refCount());
/**
 * 3. Subscribe to the multicasted observable and log out the next notification values.
 */

//  const sub = multicasted.subscribe(console.log)
//  const sub2 = multicasted.subscribe(console.log)

//  setTimeout(() => {sub.unsubscribe(); sub2.unsubscribe()}, 5000)

const sub = multicasted.subscribe(console.log);
sub.add(multicasted.subscribe(console.log));

setTimeout(() => sub.unsubscribe(), 5000);
