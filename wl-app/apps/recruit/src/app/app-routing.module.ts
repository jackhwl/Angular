import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@wl/core-state';
import { NotFoundPageComponent } from './core/containers/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/jobs',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'jobs',
    loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'heroes',
    loadChildren: () =>
      import('./heroes/heroes.module').then(m => m.HeroesModule)
  },
  {
    path: 'villains',
    loadChildren: () =>
      import('./villains/villains.module').then(m => m.VillainsModule)
    //canActivate: [AuthGuard],
    //data: {claimName: 'canAccessVillains'}
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
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
