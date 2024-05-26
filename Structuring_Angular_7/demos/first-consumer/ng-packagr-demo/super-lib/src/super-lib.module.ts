import { NgModule } from '@angular/core';
import { SuperLibComponent } from './super-lib.components';

@NgModule({
    declarations: [SuperLibComponent],
    exports: [SuperLibComponent]
})

export class SuperLibModule {}