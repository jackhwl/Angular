import {
  CUSTOM_ELEMENTS_SCHEMA,
  Directive,
  HostListener,
  Input
} from "@angular/core";
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { TicketsComponent } from "./tickets.component";
import { TicketsFacade } from "../../services";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Directive({
  selector: "[routerLink]"
})
class FakeRouterLink {
  @Input()
  routerLink = "";

  constructor(private router: Router) {}

  @HostListener("click")
  onClick() {
    this.router.navigate([this.routerLink]);
  }
}
describe("TicketsComponent (reactive form)", () => {
  const leftMouseButton = 0;
  const tickets = [
    {
      id: 0,
      description: "Install a monitor arm",
      assigneeId: 111,
      completed: false
    },
    {
      id: 1,
      description: "Move the desk to the new location",
      assigneeId: 222,
      completed: false
    }
  ];
  const ticketsFacadeStub = {
    allTicketVms$: of(tickets),
    mutations$: of(false),
    selectTicketById() {},
    loadFilterTicketsByRoute() {},
    loadUsers() {},
    loadTickets() {}
  };
  let ticketsFacade: TicketsFacade;
  let router: Router;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj("Router", ["navigateByUrl", "navigate"]);
    TestBed.configureTestingModule({
      declarations: [TicketsComponent, FakeRouterLink],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: TicketsFacade, useValue: ticketsFacadeStub },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    await TestBed.compileComponents();
    ticketsFacade = TestBed.inject(TicketsFacade);
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(TicketsComponent);
    component = fixture.componentInstance;
    //tick();
    fixture.detectChanges();
    // //tick();
    // fixture.detectChanges();
  });

  let component: TicketsComponent;
  let fixture: ComponentFixture<TicketsComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  function createNewEvent(
    eventName: string,
    bubbles = false,
    cancelable = false
  ) {
    let evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
  }

  it("should update the value of the search field (view to model)", () => {
    const input = fixture.nativeElement.querySelector("input");
    const event = createNewEvent("input");

    input.value = "Move";
    input.dispatchEvent(event);

    expect(component.search.value).toEqual("Move");
  });

  it("should update the value in the control (model to view)", () => {
    component.search.setValue("Move");
    const input = fixture.nativeElement.querySelector("input");

    expect(input.value).toBe("Move");
  });
});
