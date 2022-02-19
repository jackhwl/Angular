import {render, screen, fireEvent} from '@testing-library/angular'
import { AppComponent } from "./app.component";
import { AppModule } from '../app.module';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
describe("AppComponent", () => {
  async function setup() {
    const container = await render(AppComponent, {
      imports: [AppModule, RouterTestingModule]
    });

    return { container }
  }
  
  it("should create the app", async () => {
    await setup();
    expect(screen.getByText(/run all tests/i)).toBeInTheDocument();
  });

  it("should render footer component", async () => {
    const { container } = await setup();
    const { debugElement } = container.fixture;
    const childComponent = debugElement.query(By.css('app-footer'));
    expect(childComponent).toBeTruthy();
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
