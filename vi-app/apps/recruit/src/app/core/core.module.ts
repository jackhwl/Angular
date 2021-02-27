import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedCommonModule } from '@vi/shared/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//import { SecurityAuthGuard, SecurityService } from '@wl/core-data';

import { AppComponent } from './containers/app.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { NotFoundPageComponent } from './components/not-found-page.component';
import { NavItemComponent } from './components/nav-item.component';
import { SidenavComponent } from './components/sidenav.component';
import { ToolbarComponent } from './components/toolbar.component';
import { AuthFacade } from '@vi/shared/auth';

export const COMPONENTS = [
  AppComponent,
  HeaderComponent,
  SidenavListComponent,

  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,

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
    SharedCommonModule
  ],
  declarations: COMPONENTS,
  providers: [AuthFacade], //SecurityService, SecurityAuthGuard,
  exports: [SharedCommonModule, TranslateModule, ...COMPONENTS]
})
export class CoreModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
