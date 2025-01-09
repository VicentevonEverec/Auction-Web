import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../status-service.service';

import { HttpClient } from '@angular/common/http';
import { ethers } from 'ethers';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent 
{
  constructor(protected stateService : StateService, protected http : HttpClient, protected router : Router) {}

  ngOnInit() 
  {
    this.http.get(`/api/recover-user-data/${this.stateService.getAccount()}`, { responseType: 'json' })
    .subscribe({
      next: userData => {
        console.log('Datos de usuario recuperados:', userData);
        
        this.stateService.setUserData(userData);

        this.obtenerSaldo();
      },
      error: error => 
      {
        console.log('Error al recuperar datos de usuario', error);
        window.alert("No se pudieron recuperar los datos del usuario."); // Manejo de error
      }
    });
  }

  ethereumAmount = 0; // Asigna aquí el saldo de Ethereum
  convertedAmount = 0;
  ethereumPrice = this.stateService.getEthereumPrice();
  recargaCache = this.stateService.getCacheRecargas();

  async obtenerSaldo() {
    try { 

      this.getEthereumPrice();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(this.stateService.getAccount());

      // Convertir el balance de BigNumber a número
      this.ethereumAmount = parseFloat(ethers.utils.formatEther(balance));

      console.log(this.ethereumPrice !== null && this.ethereumPrice !== 0);
      if ( this.ethereumPrice !== null && this.ethereumPrice !== 0) {
        this.convertedAmount = this.ethereumAmount * this.ethereumPrice;
      }

    } catch (error) {
      console.error('El saldo actual de esta cartera es 0.');
    }
  }

  cacheDuration = 60000; // Duración de la caché en milisegundos (aquí, 1 minuto)

  getEthereumPrice(): void {
    // Verifica si el precio está en caché y si el tiempo transcurrido desde la última solicitud es menor que el límite de la caché
    if (this.ethereumPrice !== null && this.recargaCache !== 0 && Date.now() - this.recargaCache < this.cacheDuration) {
      console.log('Precio de Ethereum obtenido de la caché:', this.ethereumPrice);
    } else {
      console.log("Tiempo antes de la solicitud:", this.recargaCache);
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur';
    this.http.get<any>(url)
      .subscribe(response => {
        this.stateService.setCacheRecargas(Date.now()); // Actualiza el tiempo de la última solicitud
        this.stateService.setEthereumPrice(response.ethereum.eur);
      }, error => {
        console.error('Error al obtener el precio de Ethereum:', error);
      });
    }
  }
}
