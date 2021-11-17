import { Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

interface UserResponse {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
}

const user = ajax
  .getJSON<UserResponse>('https://reqres.in/api/users/2')
  .pipe(map(response => response.data));

/**
 * 1. Subscribe to the `user$` observable multiple times.
 *
 * Multiple subscribers to a cold observable create multiple
 * independent executions of the observerable.
 *
 * Since our cold observable is performing a fetch request
 * if we look at the network tab in the developer tools we
 * will see multiple requests.
 */
user.subscribe(console.log);
user.subscribe(console.log);
/**
 * 2. Comment out the subscriptions to the observable above
 *    and use a Subject to multicast.
 */
const subject = new Subject<UserResponse['data']>();
subject.subscribe(console.log);
subject.subscribe(console.log);
/**
 * 3. Bonus: use the subject as the observer.
 */
user.subscribe(subject);

// use subject turned a cold observable into hot observable
