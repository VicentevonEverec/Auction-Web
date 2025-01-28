

import { Component, OnInit } from '@angular/core';
import { StateService } from '../status-service.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  carrito: any[] = [];

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.carrito = this.stateService.obtenerCarrito();
  }

  eliminarDelCarrito(index: number): void {
    this.stateService.eliminarProducto(index);
    this.carrito = this.stateService.obtenerCarrito(); // Actualiza el carrito
  }
}
