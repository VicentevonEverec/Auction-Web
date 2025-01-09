import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ethers } from 'ethers';
import { HttpClient } from '@angular/common/http';

import { StateService } from '../../status-service.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})

export class UserHeaderComponent {
  
  constructor(private router: Router, protected stateService : StateService, private http: HttpClient) {}

  async onLogin()
  {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const account =  await provider.send("eth_requestAccounts", []);

    // Llama al backend para verificar la cartera
    this.verifyWalletInDatabase(account[0]);
  }

  verifyWalletInDatabase(walletAddress: string) {
  
    this.http.post('/api/check-wallet', walletAddress, { responseType: 'text' })
      .subscribe({
        next: response => {
          console.log('Cartera registrada, permitiendo acceso.');
          this.stateService.setWallet(response);
          this.router.navigate(['/home']); // Redirigir a la página principal
        },
        error: error => 
        {
          console.log('Cartera no registrada, redireccionando a registro', error);
          window.alert("La cartera no está registrada en la base de datos."); // Redirigir a la página de registro con la cartera ya rellenada
          this.router.navigate(['/register']);
        }
      });
  }

  async onLogout() 
  {
    this.stateService.cleanUserData();
    this.router.navigate(['/home']); // Redirigir a la página principal
  }

  onRegister(): void {
    this.router.navigate(['/register']);
  }

  onHowToSell(): void {
    this.router.navigate(['/how-to-sell']);
  }

  onProfile(walletAddress : string): void 
  {
    this.router.navigate(['/profile']); // Redirigir a la página de perfil
  }

}
