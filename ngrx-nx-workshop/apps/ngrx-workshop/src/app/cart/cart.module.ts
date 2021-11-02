import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CartEffects } from './effects';
import { CART_FEATURE_KEY, reducer } from './reducer';

@NgModule({
  imports: [
    MatSnackBarModule,
    StoreModule.forFeature(CART_FEATURE_KEY, reducer),
    EffectsModule.forFeature([CartEffects])
  ]
})
export class CartModule {}
