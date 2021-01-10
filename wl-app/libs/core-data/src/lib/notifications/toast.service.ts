import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isE2E } from './e2e-check';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(
    public snackBar: MatSnackBar,
    private translateService: TranslateService
  ) {}

  openSnackBar(message: string, action: string) {
    if (isE2E) {
      console.log(`${message} - ${action}`);
    } else {
      this.snackBar.open(message, action, {
        duration: 2000
      });
    }
  }

  open(i18_key: string, action: string, interpolateParams?: Object) {
    if (isE2E) {
      this.translateService
        .get(i18_key, interpolateParams)
        .subscribe(i18_value => console.log(`${i18_value} - ${action}`));
    } else {
      this.translateService
        .get(i18_key, interpolateParams)
        .subscribe(i18_value =>
          this.snackBar.open(i18_value, action, { duration: 2000 })
        );
    }
  }
}
