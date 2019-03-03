import { Routes } from '@angular/router';
import { CatelogComponent } from './catelog/catelog.component';
import { RegisterComponent } from './users/register.component';
import { SignInComponent } from './users/sign-in.component';

export const appRoutes : Routes = [
  { path: 'catalog', component: CatelogComponent, },
  { path: 'users/register', component: RegisterComponent, },
  { path: 'users/sign-in', component: SignInComponent, },
];
