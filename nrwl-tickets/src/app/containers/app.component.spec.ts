import {render, screen, fireEvent} from '@testing-library/angular'
import { async } from 'rxjs';
import { AppComponent } from "./app.component";
describe("AppComponent", () => {
  it("should create the app", async () => {
    await render(AppComponent);
    expect(screen.getByText('Run all tests')).toBeInTheDocument();
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
});
