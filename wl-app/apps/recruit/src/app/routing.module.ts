import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'heroes',
    loadChildren: () =>
      import('./heroes/heroes.module').then(m => m.HeroesModule)
  },
  {
    path: 'villains',
    loadChildren: () =>
      import('./villains/villains.module').then(m => m.VillainsModule)
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./students/students.module').then(m => m.StudentsModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
