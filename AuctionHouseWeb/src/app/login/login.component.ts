import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StateService } from '../status-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Variable para controlar la visibilidad del formulario
  isFormVisible = true;

  // Datos del usuario para login
  userData = {
    email: "",
    password: ""
  };

  // Mensajes de retroalimentación
  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router, private stateService: StateService) {}

  // Método para enviar los datos del formulario (login)
  submitLogin(): void {
    const { email, password } = this.userData;

    // Verificar si los campos están completos
    if (!email || !password) {
      window.alert("Por favor, ingresa un correo electrónico y una contraseña.");
      return;
    }

    // Enviar datos al backend
    this.http.post('/api/login', this.userData, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          // Mostrar mensaje de éxito
          this.successMessage = 'Inicio de sesión exitoso.';
          this.errorMessage = '';
          console.log('Respuesta del servidor:', response);
          this.+-(response);// y aqui tengo que poner la cartera que se ha logeado
          // Realizar acciones adicionales, como redirigir al usuario
        },
        error: (error) => {
          // Mostrar mensaje de error
          this.successMessage = '';
          this.errorMessage ='' + error.error;
          console.error('Error del servidor:', error);
        }
      });
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
}
