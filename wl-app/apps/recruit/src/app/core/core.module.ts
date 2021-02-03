import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@wl/shared';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SecurityService } from '@wl/core-data';

import { AppComponent } from './containers/app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { NotFoundPageComponent } from './containers/not-found-page.component';

export const COMPONENTS = [
  AppComponent,
  HeaderComponent,
  SidenavListComponent,
  NotFoundPageComponent
];

@NgModule({
  imports: [
    RouterModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule
  ],
  declarations: COMPONENTS,
  providers: [SecurityService],
  exports: [SharedModule, TranslateModule, ...COMPONENTS]
})
export class CoreModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
