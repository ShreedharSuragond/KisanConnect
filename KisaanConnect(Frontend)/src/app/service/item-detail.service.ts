import { Injectable } from '@angular/core';
import { ItemDetail } from '../model/item-detail.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const NAV_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})


export class ItemDetailService {

  constructor(private _Http: HttpClient) {}

  sendProductDetail(product: ItemDetail):Observable<any>{
    return this._Http.post(`${NAV_URL}/products`, product);
  }

  getProductDetails():Observable<any>{
    return this._Http.get(`${NAV_URL}/products/details`);
  }

  deleteProducts(productIds: number[]): Observable<any> {
    console.log(productIds);
    return this._Http.post(`${NAV_URL}/products/delete`, productIds);
  }

  updateProduct(product: ItemDetail): Observable<any> {
    return this._Http.put(`${NAV_URL}/products/${product.id}`, product);
  }
  
  // For getting the product detail of the one product with the product Id
  getProductDetailsById(productId: number):Observable<ItemDetail>{
    return this._Http.get<ItemDetail>(`${NAV_URL}/product/details/${productId}`);
  }

}
