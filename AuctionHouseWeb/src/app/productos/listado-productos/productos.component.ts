import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StateService } from '../../status-service.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  listaProductos: {id : string, nombre: string, descripcion: string,
     estado: string, precioInicial: string, precioActual: string,
      fechaInicioSubasta: string, fechaFinalSubasta: string,
       estadoSubasta: string, imagenProducto: string}[] = [];

  constructor(private http: HttpClient, private router : Router, private stateService : StateService) { }

  ngOnInit(): void {
    this.listaProductos = [];
    console.log("Obteniendo lista de productos...");
    this.stateService.setFondosActuales();
    // Llamada a la API para obtener la lista de productos
    this.http.get<any[]>('/productos/listaProductos', { responseType: 'json' })
      .subscribe({
        next: response => {
          this.listaProductos = response;
        },
        error: error => 
        {
          console.error('Error al obtener la lista de productos:', error);
          window.alert("No se pudo recuperar la lista de productos."); // Manejo de error
        }
      });
  }

  obtenerDetallesProducto(idProducto: string): void {
    this.router.navigate(['/detalles-producto', idProducto]);
  }
}
