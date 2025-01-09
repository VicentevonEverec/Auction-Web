import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './logo/logo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';

import { SearchFilterComponent } from './usuarios/search-filter/search-filter.component';
import { UserHeaderComponent } from './usuarios/user-header/user-header.component';
import { HowToSellComponent } from './how-to-sell/how-to-sell.component';
import { RegisterComponent } from './usuarios/register/register.component';
import { ProfileComponent } from './usuarios/profile/profile.component';
import { WalletHistoryComponent } from './usuarios/wallet-history/wallet-history.component';
import { WalletManagementComponent } from './usuarios/wallet-management/wallet-management.component';
import { AddWalletComponent } from './usuarios/add-wallet/add-wallet.component';
import { DeleteWalletComponent } from './usuarios/delete-wallet/delete-wallet.component';
import { ChangeWalletComponent } from './usuarios/change-wallet/change-wallet.component';

import { BackArrowComponent } from 'src/componentes/back-arrow/back-arrow';
import { SubastasComponent } from './subastas/subastas.component';
import { ProductosComponent } from './productos/listado-productos/productos.component';
import { DetallesProductoComponent } from './productos/detalles-producto/detalles-producto/detalles-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    HomeComponent,
    SearchFilterComponent,
    UserHeaderComponent,
    HowToSellComponent,
    RegisterComponent,
    ProfileComponent,
    WalletHistoryComponent,
    WalletManagementComponent,
    AddWalletComponent,
    DeleteWalletComponent,
    ChangeWalletComponent,
    BackArrowComponent,
    SubastasComponent,
    ProductosComponent,
    DetallesProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
