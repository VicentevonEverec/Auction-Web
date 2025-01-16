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

  async onLogin(){
    this.router.navigate(['/login']);
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
