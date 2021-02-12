import { NgModule } from '@angular/core';
import { SharedModule } from '@wl/shared';
import { LogoutConfirmationDialogComponent } from './logout-confirmation-dialog/logout-confirmation-dialog.component';

@NgModule({
  imports: [SharedModule],
  declarations: [LogoutConfirmationDialogComponent]
})
export class LogoutDialogModule {}
