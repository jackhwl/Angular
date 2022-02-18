import { FormBuilder } from "@angular/forms";
import { render, screen } from "@testing-library/angular";
import userEvent from "@testing-library/user-event";

import { PhoneComponent } from "../phone/phone.component";
import { TicketsComponentsModule } from "../ticketsComponentsModule";

const formGroup = new FormBuilder().group({
  id: ['1'],
  type: ['home'],
  number: ['416-333-4455']
})

describe('PhoneComponent', () => {
  async function setup(formGroup, index = 3, spy = jest.fn()) {
    await render(PhoneComponent, {
      imports: [TicketsComponentsModule],
      componentProperties: { 
        formGroup,
        index,
        deletePhone: {
          emit: spy
        } as any
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
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it("should emit index when delete phone button clicked", async () => {
    const deletePhoneSpy = jest.fn()
    const index = 5
    await setup(formGroup, index, deletePhoneSpy);
    const btn = screen.getByRole('button', { name: /delete/i });

    userEvent.click(btn);

    expect(deletePhoneSpy).toHaveBeenCalledWith(index);
  });
});