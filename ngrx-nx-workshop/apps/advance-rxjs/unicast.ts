import { Observable } from 'rxjs';

const o = new Observable(subscriber => {
  console.log('new subscriber');
  return () => {};
});

o.subscribe();
o.subscribe();

const o2 = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
  return () => {};
});

o2.subscribe({
  next: console.log,
  complete: () => console.log('A complete!')
});
o2.subscribe({
  next: console.log,
  complete: () => console.log('B complete!')
});
