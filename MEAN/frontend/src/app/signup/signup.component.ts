// signup.component.ts

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupform: any;
  url = 'http://localhost:5000';
  constructor(private http: HttpClient,private fb: FormBuilder, private router: Router) {}
  
  ngOnInit(): void {
    this.initform();
  }

  initform() {
    this.signupform = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      cpassword: [''],
    })
  }

  submitForm(formdata:any) {
    console.log(formdata);
    if (this.signupform.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'OOps!!',
        text: 'Fill form correctly'
      })
      return;
    }
    this.addUser(formdata).subscribe((res) => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Success!!',
        text: 'You have successfully registered'
      }).then(data => {
        this.router.navigate(['/login']);
      })
    })
  }

  addUser(userdata: any) {
    return this.http.post(this.url + '/user/add', userdata);
  }

}
