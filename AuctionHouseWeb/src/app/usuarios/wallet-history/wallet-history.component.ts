import { Component } from '@angular/core';
import { StateService } from '../../status-service.service';

import { HttpClient } from '@angular/common/http';

import { ethers } from 'ethers';

@Component({
  selector: 'app-wallet-history',
  templateUrl: './wallet-history.component.html',
  styleUrls: ['./wallet-history.component.scss']
})
export class WalletHistoryComponent 
{
  currentWallet = this.stateService.getAccount();
  walletHistory: string[] = [];
  walletsWithValues: { wallet: string, ethereumAmount: number, convertedAmount: number | null }[] = [];

  constructor(protected stateService: StateService, protected http: HttpClient) {
    this.retrieveWalletHistory();
  }

  retrieveWalletHistory() {
    this.http.get<string[]>(`/api/wallet-history/${this.stateService.getAccount()}`, { responseType: 'json' })
      .subscribe({
        next: walletHistoryRetrieved => {
          console.log('Historial de carteras:', walletHistoryRetrieved);
          this.walletHistory = walletHistoryRetrieved;
          this.retrieveWalletsValues();
        },
        error: error => {
          console.log('Error al recuperar el historial de carteras', error);
          window.alert("No se pudo recuperar el historial de carteras."); // Manejo de error
        }
      });
  }

  ethereumPrice = this.stateService.getEthereumPrice();
  cacheRecargas = this.stateService.getCacheRecargas();

  async retrieveWalletsValues() {

    this.getEthereumPrice();

    for (const wallet of this.walletHistory) {
      const walletValues = { wallet: wallet, ethereumAmount: 0, convertedAmount: 0 };

      try { 
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(wallet);

        walletValues.ethereumAmount = parseFloat(ethers.utils.formatEther(balance));

        if (this.ethereumPrice !== null && this.ethereumPrice !== 0) {
          walletValues.convertedAmount = walletValues.ethereumAmount * this.ethereumPrice;
        }
        
      } catch (error) {
        console.error('El saldo actual de esta cartera es 0.');
      }

      this.walletsWithValues.push(walletValues);
    }
  }

  cacheDuration = 60000; // Duración de la caché en milisegundos (aquí, 1 minuto)

  getEthereumPrice(): void {
    // Verifica si el precio está en caché y si el tiempo transcurrido desde la última solicitud es menor que el límite de la caché
    if (this.ethereumPrice !== null && this.cacheRecargas !== 0 && Date.now() - this.cacheRecargas < this.cacheDuration) {
      console.log('Precio de Ethereum obtenido de la caché:', this.ethereumPrice);
    } else {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur';
    this.http.get<any>(url)
      .subscribe(response => {
        this.stateService.setCacheRecargas(Date.now()); // Actualiza el tiempo de la última solicitud
        this.stateService.setEthereumPrice(response.ethereum.eur);
        console.log('Precio de Ethereum actualizado:', this.ethereumPrice);
      }, error => {
        console.error('Error al obtener el precio de Ethereum:', error);
      });
    }
  }

}
