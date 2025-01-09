import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Wallet, ethers } from 'ethers';
import { StateService } from '../../status-service.service';
import { state } from '@angular/animations';

@Component({
  selector: 'app-change-wallet',
  templateUrl: './change-wallet.component.html',
  styleUrls: ['./change-wallet.component.scss']
})
export class ChangeWalletComponent {
  
    constructor(protected router: Router, private http: HttpClient, private stateService : StateService) { }
  
    walletHistory: string[] = [];
    walletsWithValues: { wallet: string, ethereumAmount: number, convertedAmount: number | null }[] = [];
    changeWalletInfo = {
    currentWallet : this.stateService.getAccount(),
    walletAddress: ""
    }
  
    ngOnInit() {
      this.http.get<string[]>(`/api/wallet-history/${this.stateService.getAccount()}`, { responseType: 'json' })
        .subscribe({
          next: walletHistoryRetrieved => {
            console.log('Historial de carteras:', walletHistoryRetrieved);
            
            this.walletHistory = walletHistoryRetrieved;
            this.retrieveWalletsValues();
          },
          error: error => 
          {
            console.log('Error al recuperar el historial de carteras', error);
            window.alert("No se pudo recuperar el historial de carteras."); // Manejo de error
          }
        });
    }

    changeWallet(wallet: string): void {
      const confirmacion = confirm("¿Estás seguro de que quieres que esta cartera sea tu principal?");
      if (!confirmacion) {
        this.router.navigate(['/wallet-management']);
        return;
      }
    
      this.changeWalletInfo.walletAddress = wallet;
    
      // Datos que enviamos
      console.log(this.changeWalletInfo.walletAddress);
    
      this.http.post('/api/changeWallet', this.changeWalletInfo, { responseType: 'text' })
        .subscribe({
          next: async response => {
            console.log('Cartera cambiada correctamente: ', response);
            window.alert('Cartera cambiada correctamente: ' + response);
            this.stateService.setWallet(this.changeWalletInfo.walletAddress);
    
            // Indicar al usuario que cambie manualmente en Metamask
            confirm("La cartera se ha cambiado correctamente. Por favor, cambie manualmente a la nueva cartera en Metamask.");
    
            // Recargar la página para que se actualice el historial de carteras
            window.location.reload();
          },
          error: error => {
            console.error('Error al cambiar la cartera: ', error);
            window.alert('Error al cambiar la cartera: ' + error.error);
          }
        });
    }
    
  
    isAutofillEnabled: boolean = false;
  
    async autofillWallet() 
    {
      this.isAutofillEnabled = true;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const account =  await provider.send("eth_requestAccounts", []);
      this.changeWalletInfo.walletAddress = account[0];
      this.isAutofillEnabled = false;
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
        }, error => {
          console.error('Error al obtener el precio de Ethereum:', error);
        });
      }
    }
}
