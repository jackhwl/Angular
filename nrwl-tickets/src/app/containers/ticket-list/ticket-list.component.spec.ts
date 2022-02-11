import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { render, screen, fireEvent } from '@testing-library/angular';
import { Ticket_vm } from 'src/app/models/model';

import { TicketListComponent } from './ticket-list.component';
import * as TicketsVmSelectors from "../../reducers/ticket-vm.selectors";
import * as TicketsSelectors from "../../reducers/ticket.selectors";
import { MaterialModule } from 'src/app/material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';

const tickets: Ticket_vm[] = [{
  id: '0',
  description: "Install a monitor arm",
  assigneeId: 111,
  completed: false,
  addresses: [],
  assignees: []
  },
   {
  id: '1',
  description: "aaa",
  assigneeId: 222,
  completed: false,
  addresses: [],
  assignees: []
}];
describe('TicketListComponent', () => {
  it("should render the list", async () => {
    await render(TicketListComponent, {
        imports: [MaterialModule, RouterTestingModule],
        providers: [
          {provide: APP_BASE_HREF, useValue: '/'},
          provideMockStore({ 
            selectors: [{
              selector: TicketsVmSelectors.getFilterTicketsVmByRoute,
              value: tickets
            },
            {
              selector: TicketsSelectors.getLoaded,
              value: true
            }
          ]
          })
        ]
    });

    const store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();

    expect(screen.getAllByText('Edit')).toHaveLength(tickets.length);
  });
//   xit(`should have as title 'app'`, async () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app.title).toEqual("app");
//   });
//   xit("should render title in a h1 tag", async () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector("h1").textContent).toContain(
//       "Welcome to app!"
//     );
//   });

})