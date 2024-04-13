import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemDetail } from 'src/app/model/item-detail.model';
import { ItemDetailService } from 'src/app/service/item-detail.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  backgroundImageUrl: string = '../../../assets/images/flower4.jpeg';
  productDetail: ItemDetail | null = null;

  constructor(private itemdetailService: ItemDetailService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      this.getProductDetail(productId);
    });
  }
  changeBackgroundImage(newImageUrl: string) {
    this.backgroundImageUrl = newImageUrl;
  }
  getProductDetail(productId: number): void {
    this.itemdetailService.getProductDetailsById(productId).subscribe(
      (productDetail: ItemDetail) => {
        this.productDetail = productDetail;
        console.log('Product Detail:', this.productDetail);
      },
      (error) => {
        console.error('Error fetching the product Details', error);
      }
    );
  }
}
