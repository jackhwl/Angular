import { Routes } from '@angular/router';
import { CatelogComponent } from './components/catelog.component';
import { RegisterComponent } from './components/sign-in';
import { SignInComponent } from './components/sign-in';

export const appRoutes : Routes = [
  { path: 'catalog', component: CatelogComponent, },
  { path: 'users/register', component: RegisterComponent, },
  { path: 'users/sign-in', component: SignInComponent, },
];
