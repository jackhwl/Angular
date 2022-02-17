import { FormBuilder } from "@angular/forms";
import { render, screen, fireEvent } from "@testing-library/angular";

import { PhoneComponent } from "../phone/phone.component";
import { TicketsComponentsModule } from "../ticketsComponentsModule";

const formGroup = new FormBuilder().group({
  id: ['1'],
  type: ['home'],
  number: ['416-333-4455']
})

describe('PhoneComponent', () => {
  async function setup(formGroup) {
    await render(PhoneComponent, {
      imports: [TicketsComponentsModule],
      componentProperties: { 
        formGroup,
        index: formGroup.value.id.value
      }
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
    await setup(formGroup);
    expect(screen.getByRole('textbox', { name: /type/i })).toHaveValue(formGroup.value.type.value);
    expect(screen.getByRole('textbox', { name: /number/i })).toHaveValue(formGroup.value.number.value);

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
