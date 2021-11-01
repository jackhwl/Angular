import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CartEffects } from './effects';
import { CART_FEATURE_KEY, reducer } from './reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(CART_FEATURE_KEY, reducer),
    EffectsModule.forFeature([CartEffects])
  ]
})
export class CartModule {}
