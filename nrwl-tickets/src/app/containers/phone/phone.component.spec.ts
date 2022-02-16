import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { FormBuilder, FormControl, FormGroup, FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { render, screen, fireEvent } from "@testing-library/angular";

import { PhoneComponent } from "../phone/phone.component";
import { TicketsComponentsModule } from "../ticketsComponentsModule";

describe('PhoneComponent', () => {
  let fg = new FormGroup({
    id: new FormControl('1'),
    type: new FormControl('home'),
    number: new FormControl('416-333-4455')
  })
  async function setup() {
    //'<vi-phone [formGroup]="phoneformGroup" [index]="index" (deletePhone)="deletePhone(formGroup.controls.phones, $event)" ></vi-phone>'
    await render(PhoneComponent, {
      //excludeComponentDeclaration: true,
      //declarations: [PhoneComponent],
      imports: [TicketsComponentsModule, RouterTestingModule],
      componentProperties: { 
        formGroup: fg,
        index: 2
      },
      // schemas: [NO_ERRORS_SCHEMA] 
    });

    // temp.fixture.componentInstance.formGroup.setValue({
    //   id: '2',
    //   type: 'mobile',
    //   number: '333'
    // });
    // //temp.fixture.componentInstance.index = 2;
    // temp.fixture.detectChanges();

    // return {temp}
  }

  it("should render the phone component", async () => {

    //console.log(fg)
    await setup();
    expect(screen.getByRole('textbox', { name: /type/i })).toHaveValue('home');
    //let label = await temp.findByText(/home/i);

    //expect(label).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /number/i })).toHaveValue('416-333-4455');

  });
});

// describe("PhoneComponent", () => {
//   let component: PhoneComponent;
//   let fixture: ComponentFixture<PhoneComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [PhoneComponent]
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(PhoneComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it("should create", () => {
//     expect(component).toBeTruthy();
//   });
// });
