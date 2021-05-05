import {
  CUSTOM_ELEMENTS_SCHEMA,
  Directive,
  HostListener,
  Input,
  NO_ERRORS_SCHEMA
} from "@angular/core";
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Router, RouterLinkWithHref } from "@angular/router";
import { of } from "rxjs";
import { TicketsComponent } from "./tickets.component";
import { TicketsFacade } from "../../services";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

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

@Directive({
  selector: "[routerLink]"
})
export class RouterLinkDirectiveStub {
  @Input("routerLink") linkParams: any;
  navigatedTo: any = null;

  @HostListener("click")
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
describe("TicketsComponent (route)", () => {
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
    routerRouteParamId$: of(undefined),
    selectTicketById() {},
    loadFilterTicketsByRoute() {},
    loadUsers() {},
    loadTickets() {}
  };
  let ticketsFacade: TicketsFacade;
  let router: Router;
  let linkDes: any;
  let routerLinks: any;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj("Router", ["navigateByUrl", "navigate"]);
    TestBed.configureTestingModule({
      declarations: [TicketsComponent, FakeRouterLink],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: TicketsFacade, useValue: ticketsFacadeStub },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    TestBed.compileComponents();
    ticketsFacade = TestBed.inject(TicketsFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsComponent);
    component = fixture.componentInstance;
    //tick();
    fixture.detectChanges();
    //tick();
    //fixture.detectChanges();
    //const injector = fixture.debugElement.injector;

    linkDes = fixture.debugElement.queryAll(
      By.directive(RouterLinkDirectiveStub)
    );
    routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
  });

  let component: TicketsComponent;
  let fixture: ComponentFixture<TicketsComponent>;
  let routerSpy: any;

  function createNewEvent(
    eventName: string,
    bubbles = false,
    cancelable = false
  ) {
    let evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
  }

  it("can get RouterLinks from template", () => {
    expect(routerLinks.length).toBe(1);
    expect(routerLinks[0].linkParams).toBe("/tickets/new");
  });

  it("navigates to tickets/new when addNew link is clicked", () => {
    const firstLink = fixture.debugElement.query(By.css("a"));

    firstLink.triggerEventHandler("click", { button: leftMouseButton });

    fixture.detectChanges();

    const expectedPath = "/tickets/new";
    const actualPath = routerSpy.navigate.calls
      .mostRecent()
      .args[0][0].join("/");
    expect(actualPath).toBe(expectedPath);
    expect(routerSpy.navigate.calls.allArgs()[0][0][0]).toEqual(
      jasmine.objectContaining(["/tickets", "new"])
    );
  });

  it("should navigate with value of search box 1", fakeAsync(() => {
    const searchKey = "move";
    const fixture = TestBed.createComponent(TicketsComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    component.search.setValue(searchKey);
    tick(200);

    expect(component.search.value).toEqual(searchKey);
    const actualPath = routerSpy.navigate.calls.mostRecent().args[1].queryParams
      .q;
    const expectedPath = searchKey;
    expect(actualPath).toBe(expectedPath);
    expect(routerSpy.navigate).toHaveBeenCalled();
  }));

  it("should navigate with value of search box 2", fakeAsync(() => {
    const searchKey = "move";
    component.ngOnInit();

    const queryBox = fixture.nativeElement.querySelector("input");
    queryBox.value = searchKey;
    const event = createNewEvent("input");
    queryBox.dispatchEvent(event);
    tick(200);

    expect(component.search.value).toEqual(searchKey);
    const actualPath = routerSpy.navigate.calls.mostRecent().args[1].queryParams
      .q;
    const expectedPath = searchKey;
    expect(actualPath).toBe(expectedPath);
    expect(routerSpy.navigate).toHaveBeenCalled();
  }));

  it("should navigate with value of routerQueryParam", fakeAsync(() => {
    const search = "move";
    spyOn(component.search, "setValue").and.callThrough();
    ticketsFacade.routerQueryParam$ = of(search);
    component.ngOnInit();
    tick(200);
    const actualPath = routerSpy.navigate.calls.mostRecent().args[1].queryParams
      .q;
    const expectedPath = search;
    expect(actualPath).toBe(expectedPath);
    expect(component.search.setValue).toHaveBeenCalled();
    expect(component.search.setValue).toHaveBeenCalledWith(search);
  }));
});
