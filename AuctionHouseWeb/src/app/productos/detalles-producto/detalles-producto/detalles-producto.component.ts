import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../../status-service.service';
import { ethers, BigNumber  } from 'ethers';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.scss']
})
export class DetallesProductoComponent implements OnInit {

  producto = {
    id: "", nombre: "", descripcion: "",
     estado: "", categoria: "", precioInicial: 0, precioActual: 0,
     fechaInicioSubasta: "", fechaFinalSubasta: "", ultimaPuja: "", estadoSubasta: "", imagenProducto: "",
     precioEthInicial: 0, precioEthActual: 0, ultimaPujaDate: "", fechaFinalString: ""
    };

  private intervaloTiempo: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, protected stateService : StateService) { }

  recargaCache = this.stateService.getCacheRecargas();
  cacheDuration = 60000; // Duración de la caché en milisegundos (aquí, 1 minuto)
  convertedAmount = this.stateService.getFondosActuales();
  fondosSuficientes : boolean = false;

  mostrarBotonPuja() {
    const porcentaje = 0.9; // 90%
    console.log('Margen del producto:', this.producto.precioActual * porcentaje);
    this.fondosSuficientes = this.convertedAmount >= (this.producto.precioActual * porcentaje);
  }

  getEthereumPrice(): void {
    // Verifica si el precio está en caché y si el tiempo transcurrido desde la última solicitud es menor que el límite de la caché
    if ( this.recargaCache !== 0 && Date.now() - this.recargaCache < this.cacheDuration) {
     
    } else {
      console.log("Tiempo antes de la solicitud:", this.recargaCache);
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur';
    this.http.get<any>(url)
      .subscribe(response => {
        this.stateService.setCacheRecargas(Date.now()); // Actualiza el tiempo de la última solicitud
        this.stateService.setEthereumPrice(response.ethereum.eur);
        this.stateService.getFondosActuales();
      }, error => {
        console.error('Error al obtener el precio de Ethereum:', error);
      });
    }this.intervaloTiempo
  }

  iniciarIntervalo(): void {
    this.intervaloTiempo = setInterval(() => {
      this.calcularTiempoRestante();
      this.comprobarNuevasPujas();
    }, 1000); // Intervalo de actualización de 1 segundo
  }
  
  comprobarNuevasPujas() {
    if(this.producto.ultimaPujaDate != null && this.producto.ultimaPujaDate != "") {
      const params = new HttpParams().set('ultimaFechaProducto', this.producto.ultimaPujaDate);
      // Lógica para hacer la petición al backend y manejar la respuesta
      this.http.get('/auction/nuevas-pujas/' + this.producto.id, { params })
    .subscribe((response: any) => {
      if (response) {
        console.log("Nuevas pujas obtenidas.");
        this.cargarDetallesProducto(this.producto.id);
      } else {
        console.log("No hay nuevas pujas.");
      }
    });
  }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
    const idProducto = params['id'];
    console.log("Obteniendo detalles del producto: " + idProducto);
    // Llamada a la API para obtener los detalles del producto
    this.cargarDetallesProducto(idProducto);
    this.calcularTiempoRestante();
    this.iniciarIntervalo();
    });
  }

  ngOnDestroy() {
    // Detener el intervalo en el ngOnDestroy
    clearInterval(this.intervaloTiempo);
    console.log('Intervalo detenido.');
  }

  cargarDetallesProducto(idProducto: string): void {
    this.http.get<any[]>('/productos/detallesProducto/' + idProducto, { responseType: 'json' })
      .subscribe({
        next: response => {
          console.log("Detalles del producto obtenidos.");
          this.setProducto(response);
          this.mostrarBotonPuja();
          // Establecemos un valor base para la puja en ETH
          this.numeroUsuario = Number((this.producto.precioEthActual + 0.0001).toFixed(4));
        },
        error: error => 
        {
          console.error('Error al obtener la lista de productos:', error);
          window.alert("No se pudo recuperar la lista de productos."); // Manejo de error
        }
      });
  }

  numeroUsuario: number = 0;
  datosPuja = {
    monto: "",
    montoEUR: "",
    idProducto: "",
    walletUsuario: this.stateService.getAccount()
  };

 
  tiempoRestante: string = '';

  calcularTiempoRestante(): void {
    const fechaLimiteDate = new Date(this.producto.fechaFinalString);
    const fechaActual = new Date();

    const diferenciaTiempo = fechaLimiteDate.getTime() - fechaActual.getTime();

    if (diferenciaTiempo <= 0) {
      this.tiempoRestante = 'La subasta ha finalizado';
      clearInterval(this.intervaloTiempo);
      return;
    }

    const dias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenciaTiempo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenciaTiempo % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenciaTiempo % (1000 * 60)) / 1000);

    this.tiempoRestante = `${dias} días, ${horas} horas, ${minutos} minutos, ${segundos} segundos`;
  }

  // Creamos los getters y setters de los atributos del producto

  getId(): string {
    return this.producto.id;
  }

  setId(id: string): void {
    this.producto.id = id;
  }

  getNombre(): string {
    return this.producto.nombre;
  }

  setNombre(nombre: string): void {
    this.producto.nombre = nombre;
  }

  getDescripcion(): string {
    return this.producto.descripcion;
  }

  setDescripcion(descripcion: string): void {
    this.producto.descripcion = descripcion;
  }

  getEstado(): string {
    return this.producto.estado;
  }

  setEstado(estado: string): void {
    this.producto.estado = estado;
  }

  getPrecioInicial(): number {
    return this.producto.precioInicial;
  }

  setPrecioInicial(precioInicial: number): void {
    this.producto.precioInicial = precioInicial;
  }

 

  setFechaInicioSubasta(fechaInicioSubasta: string): void {
    this.producto.fechaInicioSubasta = new Date(fechaInicioSubasta).toLocaleDateString() + " " + new Date(fechaInicioSubasta).toLocaleTimeString();
  }

  getFechaFinalSubasta(): string {
    return this.producto.fechaFinalSubasta;
  }

  setFechaFinalSubasta(fechaFinalSubasta: string): void {
    this.producto.fechaFinalString = fechaFinalSubasta;
    this.producto.fechaFinalSubasta = new Date(fechaFinalSubasta).toLocaleDateString() + " " + new Date(fechaFinalSubasta).toLocaleTimeString();
  }
  getImagenProducto(): string {
    return this.producto.imagenProducto;
  }

  setImagenProducto(imagenProducto: string): void {
    this.producto.imagenProducto = imagenProducto;
  }

  getCategoria(): string {
    return this.producto.categoria;
  }

  setCategoria(categoria: string): void {
    this.producto.categoria = categoria;
  }

  getPrecioEthInicial(): number {
    return this.producto.precioEthInicial;
  }

  setPrecioEthInicial(precioEth: number): void {
    this.producto.precioEthInicial = precioEth ;
  }

  getPrecioEthActual(): number {
    return this.producto.precioEthActual;
  }

  setPrecioEthActual(precioEth: number): void {
    this.producto.precioEthActual = precioEth ;
  }

  getUltimaPuja(): string {
    return this.producto.ultimaPuja;
  }

  setUltimaPuja(ultimaPuja: string): void {
    if (ultimaPuja == null) {
      this.producto.ultimaPuja = "No hay pujas, ¡Sé el primero en pujar!";
      return;
    } else {
    this.producto.ultimaPujaDate = ultimaPuja;
    this.producto.ultimaPuja = this.obtenerFechaUltimaPuja(ultimaPuja);
    }
  }

  obtenerFechaUltimaPuja(ultimaPuja : string) {
    if (ultimaPuja) {
      return `Última puja el ${new Date(ultimaPuja).toLocaleDateString()} a las ${new Date(ultimaPuja).toLocaleTimeString()}`;
    }
    return 'Sin información de última puja'; // Mensaje por defecto si no hay datos
  }

  setProducto(producto: any) {
    this.setId(producto.id);
    this.setNombre(producto.nombre);
    this.setDescripcion(producto.descripcion);
    this.setEstado(producto.estado);
    this.setCategoria(producto.categoria);
    this.setPrecioInicial(producto.precioInicial);
    this.setFechaInicioSubasta(producto.fechaInicioSubasta);
    this.setFechaFinalSubasta(producto.fechaFinalSubasta);
    this.setImagenProducto(producto.imagenProducto);
    this.setPrecioEthInicial(producto.precioInicial);
    this.setPrecioEthActual(producto.precioActual);
    this.setUltimaPuja(producto.ultimaPuja);
  }

}