import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from './user.model';
import { Router } from '@angular/router';
import { UserRepositoryService } from '../services/user-repository.service';

@Component({
    styleUrls: ['./register.component.css'],
    templateUrl: './register.component.html'
  })
  
  export class RegisterComponent {
    registerForm: FormGroup;
    firstName: FormControl;
    lastName: FormControl;
    email: FormControl;
    password: FormControl;
    saving: boolean = false;
  
    constructor(private router: Router, private userRepository: UserRepositoryService) {
      this.firstName = new FormControl('', Validators.required);
      this.lastName = new FormControl('', Validators.required);
      this.email = new FormControl('', Validators.required);
      this.password = new FormControl('', Validators.required);
  
      this.registerForm = new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      });
    }
  
  
    registerUser(user: IUser) {
      this.saving = true;
      this.userRepository.saveUser(user)
        .subscribe({
          error: () => this.saving = false,
          complete: () => this.router.navigate(['/catalog'])
        });
    }
  
    cancel() {
      this.router.navigate(['/']);
    }
  }