
import { FormBuilder } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { PhoneComponent } from "../phone/phone.component";

const formGroup = new FormBuilder().group({
    id: ['1'],
    type: ['home'],
    number: ['416-333-4455']
  })
  
describe('PhoneComponent with spectator', () => {
    let spectator: Spectator<PhoneComponent>;
    
    const createComponent = createComponentFactory({
        component: PhoneComponent,
        shallow: true,
    })
    let index = 1
    
    beforeEach(() => {
        spectator = createComponent({
            props: {
                formGroup,
                index,
            },
            providers: [],
            // Whether to run change detection (defaults to true)
            detectChanges: false
        })
    })

    it('should...', () => {
        expect(spectator.query('button')).toHaveText('Delete');
    });
})