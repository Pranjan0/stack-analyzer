// signup.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };

  onSubmit() {
    // Handle the form submission logic here
    console.log(this.user);
  }
}
