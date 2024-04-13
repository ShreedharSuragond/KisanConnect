import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './my_components/home/home.component';
import { ItemDetailAdminComponent } from './my_components/item-detail-admin/item-detail-admin.component';
import { LoginComponent } from './my_components/login/login.component';
import { ProductDetailsMainComponent } from './my_components/product-details-main/product-details-main.component';
import { ProductDetailsComponent } from './my_components/product-details/product-details.component';
import { RegisterComponent } from './my_components/register/register.component';
import { ResetpasswordComponent } from './my_components/resetpassword/resetpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent,
    ItemDetailAdminComponent,
    ProductDetailsComponent,
    ProductDetailsMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
