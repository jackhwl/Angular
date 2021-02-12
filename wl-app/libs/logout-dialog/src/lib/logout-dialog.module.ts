import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutConfirmationDialogComponent } from './logout-confirmation-dialog/logout-confirmation-dialog.component';
import { MaterialModule } from '@wl/material';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [LogoutConfirmationDialogComponent]
})
export class LogoutDialogModule {}
