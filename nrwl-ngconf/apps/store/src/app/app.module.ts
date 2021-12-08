import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { StoreUiSharedModule } from '@nrwl-ngconf/store/ui-shared';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatCardModule,
    StoreUiSharedModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {
          path: 'game/:id',
          loadChildren: () =>
            import('@nrwl-ngconf/store/feature-game-detail').then(
              module => module.StoreFeatureGameDetailModule
            )
        }
      ],
      { initialNavigation: 'enabledBlocking' }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
