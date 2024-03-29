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
    //tick();
    fixture.detectChanges();
  });

  let component: TicketsComponent;
  let fixture: ComponentFixture<TicketsComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  function setInputValue(selector: string, value: string) {
    fixture.detectChanges();
    tick();

    let input = fixture.debugElement.query(By.css(selector)).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event("input"));
    tick();
  }
  function sendInput(inputElement: any, text: string) {
    inputElement.value = text;
    dispatchEvent(new Event("change"));
    fixture.detectChanges();
    return fixture.whenStable();
  }

  it("navigates to tickets/new when addNew link is clicked", () => {
    const firstLink = fixture.debugElement.query(By.css("a"));

    firstLink.triggerEventHandler("click", { button: leftMouseButton });
    //tick();
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
    const search = "move";
    const fixture = TestBed.createComponent(TicketsComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    component.search.setValue(search);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      tick(200);
      fixture.detectChanges();
      expect(component.search.value).toEqual(search);
      const actualPath = routerSpy.navigate.calls.mostRecent().args[1]
        .queryParams.q;
      const expectedPath = search;
      expect(actualPath).toBe(expectedPath);
      expect(routerSpy.navigate).toHaveBeenCalled();
    });
  }));

  it("should navigate with value of search box 2", fakeAsync(() => {
    const search = "move";
    const fixture = TestBed.createComponent(TicketsComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const queryBox = fixture.debugElement.query(
        By.css('input[name="querytodo"]')
      ).nativeElement;
      queryBox.value = search;
      queryBox.dispatchEvent(new Event("input"));
      tick(200);
      fixture.detectChanges();
      expect(component.search.value).toEqual(search);
      const actualPath = routerSpy.navigate.calls.mostRecent().args[1]
        .queryParams.q;
      const expectedPath = search;
      expect(actualPath).toBe(expectedPath);
      expect(routerSpy.navigate).toHaveBeenCalled();
    });
  }));

  it("should navigate with value of routerQueryParam", fakeAsync(() => {
    const search = "move";
    const fixture = TestBed.createComponent(TicketsComponent);
    const component = fixture.componentInstance;
    spyOn(component.search, "setValue").and.callThrough();
    component.ngOnInit();
    ticketsFacade.routerQueryParam$ = of(search);
    fixture.detectChanges();
    tick(200);
    fixture.whenStable().then(() => {
      const actualPath = routerSpy.navigate.calls.mostRecent().args[1]
        .queryParams.q;
      const expectedPath = search;
      expect(actualPath).toBe(expectedPath);
      expect(component.search.setValue).toHaveBeenCalled();
      expect(component.search.setValue).toHaveBeenCalledWith(search);
    });
  }));
});
