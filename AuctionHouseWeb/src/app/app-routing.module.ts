import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HowToSellComponent } from './how-to-sell/how-to-sell.component';
import { RegisterComponent } from './usuarios/register/register.component';

import { ProfileComponent } from './usuarios/profile/profile.component';
import { WalletHistoryComponent } from './usuarios/wallet-history/wallet-history.component';
import { WalletManagementComponent } from './usuarios/wallet-management/wallet-management.component';

import { AddWalletComponent } from './usuarios/add-wallet/add-wallet.component';
import { DeleteWalletComponent } from './usuarios/delete-wallet/delete-wallet.component';
import { ChangeWalletComponent } from './usuarios/change-wallet/change-wallet.component';
import { SubastasComponent } from './subastas/subastas.component';
import { ProductosComponent } from './productos/listado-productos/productos.component';
import { DetallesProductoComponent } from './productos/detalles-producto/detalles-producto/detalles-producto.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'how-to-sell', component: HowToSellComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'wallet-history', component: WalletHistoryComponent },
  { path: 'wallet-management', component: WalletManagementComponent },
  { path: 'add-wallet', component: AddWalletComponent },
  { path: 'delete-wallet', component: DeleteWalletComponent },
  { path: 'change-wallet', component: ChangeWalletComponent },
  { path: 'subastas', component: SubastasComponent },
  { path: 'catalogo-productos', component: ProductosComponent },
  { path: 'detalles-producto/:id', component: DetallesProductoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
