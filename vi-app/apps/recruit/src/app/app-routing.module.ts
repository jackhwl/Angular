import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { SecurityAuthGuard } from '@wl/core-data';
import { AuthGuard } from '@vi/shared/auth';
import { NotFoundPageComponent } from './core/components/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/students',
    pathMatch: 'full'
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  // },
  {
    path: 'books',
    loadChildren: () => import('@vi/books').then(m => m.BooksModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'jobs',
  //   loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule),
  //   canActivate: [SecurityAuthGuard]
  //   //data: {claimName: 'canAccessJobs'}
  // },
  // {
  //   path: 'heroes',
  //   loadChildren: () =>
  //     import('./heroes/heroes.module').then(m => m.HeroesModule)
  // },
  {
    path: 'villains',
    loadChildren: () => import('@vi/villains').then(m => m.VillainsModule)
    //canActivate: [AuthGuard],
    //data: {claimName: 'canAccessVillains'}
  },
  {
    path: 'students',
    loadChildren: () => import('@vi/students').then(m => m.StudentsModule)
  },
  // {
  //   path: 'signin',
  //   loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  // },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
