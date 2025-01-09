import { Component } from '@angular/core';
import { StateService } from '../../status-service.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete-wallet',
  templateUrl: './delete-wallet.component.html',
  styleUrls: ['./delete-wallet.component.scss']
})
export class DeleteWalletComponent {

  constructor(protected stateService : StateService, protected http : HttpClient) { }

  walletHistory: string[] = [];

  deleteWalletInfo = {
    currentWallet : this.stateService.getAccount(),
    walletAddress: ""
    }

  ngOnInit() {
    this.http.get<string[]>(`/api/wallet-history/${this.stateService.getAccount()}`, { responseType: 'json' })
      .subscribe({
        next: walletHistoryRetrieved => {
          console.log('Historial de carteras:', walletHistoryRetrieved);
          
          this.walletHistory = walletHistoryRetrieved;
        },
        error: error => 
        {
          console.log('Error al recuperar el historial de carteras', error);
          window.alert("No se pudo recuperar el historial de carteras."); // Manejo de error
        }
      });
  }

  fillDeleteWalletInfo(walletAddress: string)
  {
    this.deleteWalletInfo.walletAddress = walletAddress;
  }

  deleteWallet() 
  {
    const confirmacion = confirm("¿Estás seguro de que quieres borrar esta cartera de la cuenta?");
    if (!confirmacion) {
      console.log("No se ha borrado la cartera.");
    }
    this.http.post(`/api/deleteWallet`, this.deleteWalletInfo, { responseType: 'text' })
      .subscribe({
        next: response => {
          window.alert("Resultado de la operación: " + response); // Manejo de éxito
          // Recargar la página
          window.location.reload();
        },
        error: error => 
        {
          console.log('Error al borrar la cartera', error);
          window.alert("No se pudo borrar la cartera: " + error.message); // Manejo de error
        }
      });
  }

}
