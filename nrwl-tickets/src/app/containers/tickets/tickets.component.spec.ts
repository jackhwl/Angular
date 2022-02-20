import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event'
import * as TicketsSelectors from "../../reducers/ticket.selectors";
import { RouterTestingModule } from '@angular/router/testing';
import { TicketListPageActions } from 'src/app/actions';
import { TicketsComponentsModule } from '../ticketsComponentsModule';
import { TicketsComponent } from './tickets.component';
import { UtilService } from 'src/app/services';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { selectQueryParam } from 'src/app/reducers/router.selectors';
import { of } from 'rxjs';
import { RouterLinkWithHref } from '@angular/router';

const q: string = '0'
let service: UtilService = new UtilService(new FormBuilder());

describe('TicketsComponent', () => {
  async function setup(q: string, id: string = undefined, loaded = true) {
    const container = await render(TicketsComponent, {
      imports: [TicketsComponentsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: UtilService, useValue: service}, 
        provideMockStore({ 
          selectors: [
            { selector: selectQueryParam('q'), 
              value: q
            },
            {
              selector: TicketsSelectors.getLoaded,
              value: loaded
            }
          ]
        })
      ],      
      componentProperties: { 
        //listForm: service.generateTicketSearchForm(q),
        routerQueryParam$: of(q),
        routerRouteParamId$: of(id)
      }
    });

    const store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();
    return { container, dispatchSpy: store.dispatch };
  }
  
  it("should render ticket component in list mode by default", async() => {
    await setup('');
    expect(screen.getByRole('link', { name: /add new ticket/i})).toHaveAttribute('href', '/new');
    expect(screen.getByRole('textbox', { name: /search/i })).toHaveValue('');
  });

  it("should render ticket component in edit mode if have id in url", async() => {
    await setup('', '0');
    expect(screen.queryByRole('link', { name: /add new ticket/i})).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: /search/i })).not.toBeInTheDocument();
  });

  xit("should dispatch TicketListPageActions.filterParamChanged() action", async () => {
    const { container, dispatchSpy } = await setup('');
    const component = container.fixture.componentInstance;
    component.ngOnInit();
    container.fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(TicketListPageActions.filterParamChanged({q: ''}));
  });

  xit("should render ticket list component", async () => {
    const { container } = await setup('');
    const { debugElement } = container.fixture;
    const component = container.fixture.componentInstance;
    component.ngOnInit();
    container.fixture.detectChanges();
    const childComponent = debugElement.query(By.css('vi-ticket-list'));
    expect(childComponent).toBeTruthy();


    // const childComponents = debugElement.queryAll(By.css('vi-ticket-list'));
    // expect(childComponents).toHaveLength(ticketVm.addresses.length);
  });
})

// describe('TicketsComponent', () => {
//   // let component: TicketsComponent;
//   // let store = provideMockStore({ initialState })[0]
//   // ;
//   // let fb: FormBuilder;
//   // let service: UtilService = new UtilService(fb);

//   // beforeEach(() => {
//   //   component = new TicketsComponent(store, service);
//   // })

//   it("should render the list", async () => {
//     const component = await render(TicketsComponent, {
//       imports: [TicketsComponentsModule],
//       providers
//     });
//     userEvent.click(screen.getByRole('link'))
//     expect(store.dispatch).toHaveBeenCalledWith(TicketActions.deleteTicket({id: '0'}));

//     expect(component).toBe('')

//   });
//})