// login.component.ts

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { api_url } from '../../config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginform: any;
  url = 'http://localhost:5000';
  constructor(private http: HttpClient,private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.initForm();
  }

  initForm() {
    this.loginform = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submitForm(formdata: any) {
    console.log(formdata);

    if (this.loginform.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'OOps!!',
        text: 'Invalid Credentials ! fill correctly.'
      })

      return;
    }


    this.http.post(api_url + '/user/authenticate', formdata).subscribe((data: any) => {
      console.log(data);
      if (data) {
        if (data.status === 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Hurray!!',
            text: 'successfully logged in'
          }).then(d => {
            sessionStorage.setItem('user', JSON.stringify(data));
            this.router.navigate(['/addproduct']);
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'OOps!!',
            text: 'username or password is incorrect.'
          })
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'OOps!!',
          text: 'username or password is incorrect.'
        })
      }
    })

  }
}
