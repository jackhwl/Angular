import { FormBuilder } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { render, screen, fireEvent } from "@testing-library/angular";
import userEvent from "@testing-library/user-event";
import { UtilService } from "src/app/services";

import { TicketsComponentsModule } from "../ticketsComponentsModule";
import { AddressComponent } from "./address.component";
const phoneFormGroup1 = new FormBuilder().group({
  id: ['1'],
  type: ['home'],
  number: ['416-333-4455']
})
const phoneFormGroup2 = new FormBuilder().group({
  id: ['2'],
  type: ['mobile'],
  number: ['647-443-1345']
})
const formGroup = new FormBuilder().group({
  id: ['a1'],
  addr1: ['3050 del mar ave'],
  addr2: ['aaa'],
  postcode: ['91770'],
  phones: new FormBuilder().array([
    phoneFormGroup1,
    phoneFormGroup2
  ])
})

describe('AddressComponent', () => {
  async function setup(formGroup, index = 3, spy = jest.fn()) {
    const container = await render(AddressComponent, {
      imports: [TicketsComponentsModule],
      providers: [
        { provide: UtilService, useValue: new UtilService(new FormBuilder())}
      ],
      componentProperties: { 
        formGroup,
        index,
        deleteAddress: {
          emit: spy
        } as any
      }
    });

    return { container }
  }

  it("should render the address component", async () => {
    await setup(formGroup);
    expect(screen.getByRole('textbox', { name: /address 1/i })).toHaveValue(formGroup.value.addr1.value);
    expect(screen.getByRole('textbox', { name: /address 2/i })).toHaveValue(formGroup.value.addr2.value);
    expect(screen.getByRole('textbox', { name: /postal code/i })).toHaveValue(formGroup.value.postcode.value);
  });

  it('renders phone component', async () => {
    const { container } = await setup(formGroup);
    const { debugElement } = container.fixture;
    const childComponent = debugElement.query(By.css('vi-phone'));
    expect(childComponent).toBeTruthy();
    const childComponents = debugElement.queryAll(By.css('vi-phone'));
    expect(childComponents).toHaveLength(formGroup.value.phones.length);
  });

  it("should emit index when delete button clicked", async () => {
    const deleteAddressSpy = jest.fn()
    const index = 5
    await setup(formGroup, index, deleteAddressSpy);
    const btn = screen.getByRole('button', { name: /delete address/i });

    userEvent.click(btn);

    expect(deleteAddressSpy).toHaveBeenCalledWith(index);
  });

});
