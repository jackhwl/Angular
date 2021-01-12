import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@wl/shared';
import { HomeComponent } from './home.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { NewsletterparentComponent } from './newsletterparent/newsletterparent.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent }
];

@NgModule({
  declarations: [HomeComponent, NewsletterComponent, NewsletterparentComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: []
})
export class HomeModule {}
