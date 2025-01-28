import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StateService } from '../../status-service.service';

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  estado: string;
  precioInicial: string;
  precioActual: string;
  fechaInicioSubasta: string;
  fechaFinalSubasta: string;
  estadoSubasta: string;
  imagenProducto: string;
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  producto: Producto = {
    id: '',
    nombre: '',
    descripcion: '',
    estado: '',
    precioInicial: '',
    precioActual: '',
    fechaInicioSubasta: '',
    fechaFinalSubasta: '',
    estadoSubasta: '',
    imagenProducto: ''
  };

  listaProductos: Producto[] = [];

  constructor(private http: HttpClient, private router: Router, private stateService: StateService) {}

  ngOnInit(): void {
    console.log("Obteniendo lista de productos...");
    this.stateService.setFondosActuales();
    this.http.get<Producto[]>('/productos/listaProductos', { responseType: 'json' })
      .subscribe({
        next: response => {
          this.listaProductos = response;
        },
        error: error => {
          console.error('Error al obtener la lista de productos:', error);
          window.alert("No se pudo recuperar la lista de productos.");
        }
      });
  }

  obtenerDetallesProducto(idProducto: string): void {
    this.router.navigate(['/detalles-producto', idProducto]);
  }

  agregarAlCarrito(producto: Producto): void {
    this.stateService.agregarProducto(producto);
    window.alert(`${producto.nombre} ha sido agregado al carrito.`);
  }
}
