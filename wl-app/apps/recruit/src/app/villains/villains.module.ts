import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@wl/material';
import { VillainsComponent } from './villains/villains.component';
import { RouterModule, Routes } from '@angular/router';
import { VillainDetailComponent } from './villain-detail/villain-detail.component';
import { VillainListComponent } from './villain-list/villain-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VillainFacade } from '@wl/core-state';
import { ModalComponent } from '../modal/modal.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: VillainsComponent }
];

@NgModule({
  declarations: [
    VillainsComponent,
    VillainDetailComponent,
    VillainListComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ],
  providers: [VillainFacade]
})
export class VillainsModule {}

// // required for AOT compilation
// export function httpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }

// class CustomLoader implements TranslateLoader {
//     getTranslation(lang: string): Observable<any> {
//         return Observable.of({KEY: 'value'});
//     }
// }
