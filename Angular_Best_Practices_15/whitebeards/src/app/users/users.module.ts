import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register.component';
import { SignInComponent } from './sign-in.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, UsersRoutingModule, SharedModule],
  declarations: [RegisterComponent, SignInComponent],
  exports: [],
  providers: []
})

export class UsersModule {}