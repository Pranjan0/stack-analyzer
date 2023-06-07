import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { api_url } from 'src/config';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent {
  productList: any;
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests() {
    this.http.get(api_url+'/product/getall').subscribe((data: any) => {
      this.productList = data.result;
      console.log(data);
    });
  }
}
