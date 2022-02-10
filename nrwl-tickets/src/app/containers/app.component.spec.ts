import {render, screen, fireEvent} from '@testing-library/angular'
import { AppComponent } from "./app.component";
import { AppModule } from '../app.module';
describe("AppComponent", () => {
  it("should create the app", async () => {
    await render(AppComponent, {
        //imports: [AppModule]
    });
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
