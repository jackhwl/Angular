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
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { TicketsComponent } from "./tickets.component";
import { TicketsFacade } from "../../services";
import { FormsModule } from "@angular/forms";

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
const leftMouseButton = 0;
describe("TicketsComponent (route)", () => {
  function advance() {
    //tick();
    fixture.detectChanges();
  }

  function clickAddNew() {
    const firstLink = fixture.debugElement.query(By.css("a"));

    firstLink.triggerEventHandler("click", { button: leftMouseButton });
  }

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
    loadTickets() {}
  };
  let ticketsFacade: TicketsFacade;
  let router: Router;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj("Router", ["navigateByUrl", "navigate"]);
    routeSpy = { queryParams: of({ id: "test" }) };
    TestBed.configureTestingModule({
      declarations: [TicketsComponent, FakeRouterLink],
      imports: [FormsModule],
      providers: [
        { provide: TicketsFacade, useValue: ticketsFacadeStub },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: routeSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    await TestBed.compileComponents();
    ticketsFacade = TestBed.inject(TicketsFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsComponent);
    component = fixture.componentInstance;
    advance();
    advance();
  });

  let component: TicketsComponent;
  let fixture: ComponentFixture<TicketsComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let routeSpy: any;

  it("navigates to tickets/new when addNew link is clicked", () => {
    clickAddNew();
    advance();

    const expectedPath = "/tickets/new";
    const actualPath = routerSpy.navigate.calls
      .mostRecent()
      .args[0][0].join("/");
    expect(actualPath).toBe(expectedPath);
  });
});
