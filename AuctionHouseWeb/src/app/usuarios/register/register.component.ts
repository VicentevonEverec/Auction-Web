import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ethers } from 'ethers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private http: HttpClient, private router: Router) { }

  // Datos del usuario
  userData = {
    dni:"",
    name: "",
    surname: "",
    email: "",
    password: '',
    walletAddress: "" // Este campo puede ser opcional
  }

  // Bandera para controlar si el campo de billetera está habilitado
  isAutofillEnabled = false;

  // Método para registrar al usuario
  onRegister(): void {
    const confirmacion = confirm("¿Estás seguro de que quieres registrarte?"); // Mostrar un cuadro de confirmación
    if (!confirmacion) {
      this.router.navigate(['/home']); // Si no se confirma el registro, se redirige a la página de inicio
      return; // Salir de la función si no se confirma
    }

    // Realizar el registro enviando los datos
    this.http.post('/api/register', this.userData, { responseType: 'text' }) // Enviar una solicitud POST con los datos del usuario
      .subscribe({
        next: response => {
          console.log('Registro exitoso', response); // Imprimir en consola el éxito del registro
          window.alert('Registro exitoso: ' + response); // Mostrar una alerta de éxito
          this.router.navigate(['/home']); // Redirigir a la página de inicio
        },
        error: error => {
          console.error('Error en el registro', error); // Imprimir en consola el error del registro
          window.alert('Error en el registro: ' + error.error); // Mostrar una alerta de error
        }
      });
  }
  

  // Función para rellenar la billetera automáticamente
  async autofillWallet() {
    this.isAutofillEnabled = true;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const account = await provider.send("eth_requestAccounts", []);
    this.userData.walletAddress = account[0]; // Asignar la billetera
    this.isAutofillEnabled = false;
  }
}
