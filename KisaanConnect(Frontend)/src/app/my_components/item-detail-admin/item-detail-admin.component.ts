import { AfterViewInit, ChangeDetectorRef, Component, IterableDiffers, OnInit } from '@angular/core';
import 'datatables.net';
import $ from 'jquery';
import { ItemDetail } from 'src/app/model/item-detail.model';
import { ItemDetailService } from 'src/app/service/item-detail.service';


@Component({
  selector: 'app-item-detail-admin',
  templateUrl: './item-detail-admin.component.html',
  styleUrls: ['./item-detail-admin.component.css']
})
export class ItemDetailAdminComponent implements OnInit, AfterViewInit {
  selectedProductIds: number[]=[];
  displayVariantTable: number=NaN;
  product = new ItemDetail()
  newFeature: string = '';
  productDetails: ItemDetail[] = [];
  showAddProductPage: boolean = false;
  updateProductDetails: boolean = false;


  constructor(private itemdetailService: ItemDetailService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getProductDetails();
  }

  ngAfterViewInit(): void {
    this.initDataTable1();
  }

  initDataTable1(): void {
    $('#example').DataTable().destroy();
    $(document).ready(() => {
      $('#example').DataTable();
    });
  }

  AddProductPage() {
    this.showAddProductPage = !this.showAddProductPage;
    if (!this.showAddProductPage) {
      this.initDataTable1();
    }
  }

  VariantTable(productId: number): void {
    if (this.displayVariantTable === productId) {
      this.displayVariantTable = NaN;
    } else {
      this.displayVariantTable = productId;
      setTimeout(() => {
        const tableId = 'tablevariant' + productId;
        const table = document.getElementById(tableId);
        if (table) {
          table.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }

  addVolumeVariant() {
    this.product.productVariants.push({ variant: "", quantity: NaN, price: NaN, discount: NaN });
  }

  removeVolumeVariant(index: number) {
    this.product.productVariants.splice(index, 1);
  }

  addFeature() {
    if (this.newFeature.trim() !== '') {
      this.product.features.push(this.newFeature.trim());
      this.newFeature = '';
    }
  }

  isProductSelected(productId: number) {
    return this.selectedProductIds.includes(productId);
  }

  toggleProductSelection(productId: number) {
    if (this.isProductSelected(productId)) {
      this.selectedProductIds = this.selectedProductIds.filter(id => id !== productId);
    } else {
      this.selectedProductIds.push(productId);
    }
  }

  //Get products
  getProductDetails() {
    this.itemdetailService.getProductDetails().subscribe(
      (data: ItemDetail[]) => {
        console.log(data);
        this.productDetails = data;
        this.initDataTable1();
      },
      (error: any) => {
        console.error('Error fetching product details:', error);
      }
    )
  }


  submitForm() {
    if (this.updateProductDetails) {
      this.updateProduct();
      this.updateProductDetails=false;
    } else {
      this.addProduct();
    }
    this.product=new ItemDetail();
  }

  //Add Products
  addProduct() {
    this.itemdetailService.sendProductDetail(this.product).subscribe(
      (response: any) => {
        this.getProductDetails();
        this.AddProductPage();
        alert(response.status);
      },
      (error: any) => {
        console.error('Error adding product:', error);
        alert(error);
      }
    );
  }

  //update product detail
  updateProduct() {
    this.itemdetailService.updateProduct(this.product).subscribe(
      (response: any) => {
        this.getProductDetails();
        this.AddProductPage();
        alert(response.status);
      },
      (error: any) => {
        console.error('Error updating product:', error);
        alert(error);
      }
    );
  }

  // Delete products
  deleteSelectedProducts() {
    this.itemdetailService.deleteProducts(this.selectedProductIds).subscribe(
      (response) => {
        // Handle successful deletion
        console.log(response.status);
        alert(response.status);
        this.selectedProductIds = [];
        this.getProductDetails();
      },
      (error) => {
        console.error('Error deleting products:', error);
      }
    );
  }

  //for updating the product details
  updateSelectedProducts() {
  if (this.selectedProductIds.length === 1) {
    const productId = this.selectedProductIds[0];
    this.itemdetailService.getProductDetails().subscribe(
      (products: ItemDetail[]) => {
        const selectedProduct = products.find(product => +product.id === productId);
        if (selectedProduct) {
          this.product = { ...selectedProduct };
          this.showAddProductPage = true;
          this.updateProductDetails= true;
        } else {
          console.error('Product not found');
        }
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  } else {
    alert('Please select a single product to update.');
  }
}

}
