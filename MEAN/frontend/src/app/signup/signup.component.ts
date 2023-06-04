// signup.component.ts

import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name = new FormControl();
  email = new FormControl();
  password = new FormControl();

  onSubmit() {
    // Handle the form submission logic here
    console.log(this.name);
  }
}
