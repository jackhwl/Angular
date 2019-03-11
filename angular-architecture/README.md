# Angular Architecture

This code sample demonstrates different Angular Architecture concepts.

## Running the Application

1. Install the Angular CLI: `npm install -g @angular/cli`

1. Open the `demos` folder and run `npm install`

1. Run `ng serve -o` in the `demos` folder to start the server and launch the app

## The Angular JumpStart Application

You can find an example of an application that follows the rules in this course at https://github.com/DanWahlin/Angular-JumpStart

Cloning Techniques:
// cannot handle data type
1: const custs = JSON.parse(JSON.stringify(this.customers));
2: this.clonerService.deepClone<Customer[]>(this.customers);
        import { Injectable } from '@angular/core';
        import * as clone from 'clone';

        @Injectable({
            providedIn: 'root'
        })
        export class ClonerService {

            deepClone<T>(value) {
                return clone<T>(value);
            }

        }

3: use immutable.js
import { List, Map, fromJS } from 'immutable';
immutableCustomers = List<Customer>(this.customers);
this.immutableCustomers.toArray();
return fromJS(cust).toJS() as Customer;


Rx.Observable.prototype.asObservable()
Hides the identity of an observable sequence.

Returns
(Observable): An observable sequence that hides the identity of the source sequence.

EventBus, loosely coupled communication can make maintenance more challenging, (who is triggering the event?), and must remember to unsubscribe.