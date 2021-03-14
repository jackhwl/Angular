import { TestBed, async } from "@angular/core/testing";
import { TicketsComponent } from "./tickets.component";
describe("TicketsComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TicketsComponent]
    }).compileComponents();
  }));
  it("should create the app", async(() => {
    const fixture = TestBed.createComponent(TicketsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(TicketsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
  it("should render title in a h1 tag", async(() => {
    const fixture = TestBed.createComponent(TicketsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain(
      "Welcome to app!"
    );
  }));
});
