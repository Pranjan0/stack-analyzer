import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { api_url } from 'src/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productform: any;
  constructor(private http: HttpClient,private fb: FormBuilder, private router: Router) {}
  
  ngOnInit(): void {
    this.initform();
  }

  initform() {
    this.productform = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      image: [''],
    })
  }

  submitForm(formdata:any) {
    console.log(formdata);
    if (this.productform.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'OOps!!',
        text: 'Fill form correctly'
      })
      return;
    }
    this.addProduct(formdata).subscribe((res) => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Success!!',
        text: 'Added Product successfully'
      }).then(d => {
        // this.router.navigate(['/login']);
      })
    })
  }

  addProduct(userdata: any) {
    return this.http.post(api_url + '/product/add', userdata);
  }
}
