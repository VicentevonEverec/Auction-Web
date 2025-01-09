import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ethers } from 'ethers';

import { StateService } from '../../status-service.service';

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrls: ['./add-wallet.component.scss']
})
export class AddWalletComponent {

  constructor(protected router: Router, private http: HttpClient, private stateService : StateService) { }

  addWalletInfo = {
  currentWallet : this.stateService.getAccount(),
  walletAddress: ""
  }

  addWallet(): void
  {
    const confirmacion = confirm("¿Estás seguro de que quieres añadir esta cartera?");
    if (!confirmacion) {
      this.router.navigate(['/wallet-management']);
    }

    //Los datos que enviamos
    console.log(this.addWalletInfo);

    this.http.post('/api/addWallet', this.addWalletInfo, { responseType: 'text' })
    .subscribe({
      next: response => {
        console.log('Cartera añadida correctamente: ', response);
        window.alert('Cartera añadida correctamente: ' + response);
      },
      error: error => 
      {
        console.error('Error al añadir la cartera: ', error);
        window.alert('Error al añadir la cartera: ' + error.error);
      }
    });

  }

  isAutofillEnabled: boolean = false;

  async autofillWallet() 
  {
    this.isAutofillEnabled = true;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const account =  await provider.send("eth_requestAccounts", []);
    this.addWalletInfo.walletAddress = account[0];
    this.isAutofillEnabled = false;
  }

}
