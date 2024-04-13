import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ItemDetail } from 'src/app/model/item-detail.model';
import { ItemDetailService } from 'src/app/service/item-detail.service';

@Component({
  selector: 'app-product-details-main',
  templateUrl: './product-details-main.component.html',
  styleUrls: ['./product-details-main.component.css']
})
export class ProductDetailsMainComponent implements OnInit {
  productDetails: ItemDetail[]=[];

  constructor(private itemdetailService: ItemDetailService, private router:Router) { }

  ngOnInit(): void {
    this.getProductDetails();
  }

  //Get products
  getProductDetails() {
    this.itemdetailService.getProductDetails().subscribe(
      (data: ItemDetail[]) => {
        console.log(data);
        this.productDetails = data;
        console.log(this.productDetails);

      },
      (error: any) => {
        console.error('Error fetching product details:', error);
      }
    )
  }

  navigateToProdetail(productId: any){
    this.router.navigate(['/prd-details', productId]);
  }

}
