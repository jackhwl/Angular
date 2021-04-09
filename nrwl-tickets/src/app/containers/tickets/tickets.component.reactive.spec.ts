import {
  CUSTOM_ELEMENTS_SCHEMA,
  Directive,
  HostListener,
  Input,
  NO_ERRORS_SCHEMA
} from "@angular/core";
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  fakeAsync,
  TestBed,
  tick
} from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { TicketsComponent } from "./tickets.component";
import { TicketsFacade } from "../../services";
import { ReactiveFormsModule } from "@angular/forms";
import { Component } from "@angular/core";
import { ChangeDetectionStrategy } from "@angular/core";

// @Directive({
//   selector: "[routerLink]"
// })
// class FakeRouterLink {
//   @Input()
//   routerLink = "";

//   constructor(private router: Router) {}

//   @HostListener("click")
//   onClick() {
//     this.router.navigate([this.routerLink]);
//   }
// }
describe("TicketsComponent (reactive form)", () => {
  // const leftMouseButton = 0;
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
  // let router: Router;
  let component: TicketsComponent;
  let fixture: ComponentFixture<TicketsComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj("Router", ["navigateByUrl", "navigate"]);
    TestBed.configureTestingModule({
      declarations: [TicketsComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: TicketsFacade, useValue: ticketsFacadeStub },
        { provide: Router, useValue: routerSpy }
        //{ provide: ComponentFixtureAutoDetect, useValue: true },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    //await TestBed.compileComponents();
    ticketsFacade = TestBed.inject(TicketsFacade);
    //});

    //beforeEach(async () => {
    // TestBed.overrideComponent(TicketsComponent, {
    //   set: new Component({
    //     selector: "vi-tickets-root",
    //     templateUrl: "./tickets.component.html",
    //     styleUrls: ["./tickets.component.css"],
    //     changeDetection: ChangeDetectionStrategy.Default
    //   })
    // });
    fixture = TestBed.createComponent(TicketsComponent);
    component = fixture.componentInstance;
    //component.ngOnInit();
    //tick();
    //fixture.detectChanges();
    //tick(200);
    //fixture.detectChanges();
  });

  // function createNewEvent(
  //   eventName: string,
  //   bubbles = false,
  //   cancelable = false
  // ) {
  //   let evt = document.createEvent("CustomEvent");
  //   evt.initCustomEvent(eventName, bubbles, cancelable, null);
  //   return evt;
  // }

  // xit("should update the value of the search field (view to model)", fakeAsync(() => {
  //   const input = fixture.nativeElement.querySelector("input");
  //   const event = createNewEvent("input");
  //   tick(200);
  //   fixture.detectChanges();

  //   input.value = "Move";
  //   input.dispatchEvent(event);
  //   fixture.detectChanges();

  //   expect(component.form.controls.search.value).toEqual("Move");
  // }));

  xit("should update the value in the control (model to view)", () => {
    //component.search.setValue("Move");

    //const input = element.querySelector('input')
    //const input = fixture.debugElement.query(By.css('#cde'))

    //tick(200);
    fixture = TestBed.createComponent(TicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //searchInput.value = 'Amit Shah';
    //expect(searchInput).toBe(null);
    //fixture.whenStable().then(() => {
    const hostElement = fixture.nativeElement;
    const searchInput: HTMLInputElement = hostElement.querySelector("#abc");

    //const searchInput: HTMLInputElement = hostElement.querySelector('#abc'); //fixture.debugElement.query(By.css('#abc')); //.querySelector('input[id="abc"]'); //fixture.debugElement.query(By.css('#abc')); //
    //   const input = fixture.debugElement.queryAll(
    //   By.css(".cde")
    // );
    expect(searchInput.value).toEqual("aaa");
    //});
  });
});
