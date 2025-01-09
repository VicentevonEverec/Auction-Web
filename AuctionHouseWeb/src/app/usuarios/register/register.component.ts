import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ethers } from 'ethers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent 
{
  
  constructor(private http: HttpClient, private router: Router) {
    
    // Temporarlmente deshabilitado para evitar que se muestre el mensaje de privacidad cada vez que se carga la página en las pruebas
    /*
    window.alert("Privacidad y Protección de Datos: En Auction Blockchain, valoramos y respetamos tu privacidad. \n\
    Todos los datos personales que proporcionas al registrarte en nuestro sitio serán tratados con la máxima confidencialidad y \n\
    solo serán utilizados por el equipo de administración de la página de subastas con el único propósito de prevenir fraudes y garantizar la integridad de nuestras transacciones. \n\
    Queremos asegurarte que tu información será tratada con responsabilidad y de acuerdo con las leyes de protección de datos aplicables. \n\
    Mantendremos tus datos de manera segura y solo los compartiremos con terceros cuando sea necesario para cumplir con nuestras obligaciones legales o cuando tengamos tu consentimiento explícito para hacerlo. \n\
    Es importante destacar que, de cara al público, todos los usuarios serán tratados de manera anónima. Tu identidad no será revelada ni compartida en ningún momento. \n\
    Nuestra plataforma garantiza que todas las subastas y transacciones se realicen de forma confidencial y segura. \n\
    Si tienes alguna pregunta o inquietud sobre el manejo de tus datos personales, no dudes en contactarnos a través de nuestro centro de soporte. \n\
    Estamos comprometidos a proteger tu privacidad y a brindarte la mejor experiencia posible en nuestro sitio. \n\
    Al utilizar Auction Blockchain, aceptas nuestras políticas de privacidad y el tratamiento de tus datos personales de acuerdo con lo establecido en este aviso.");
    */
  }

  userData = {
    name: "",
    surname: "",
    email: "",
    dni: "",
    walletAddress: ""
  }

  onRegister(): void
  {
    const confirmacion = confirm("¿Estás seguro de que quieres registrarte?");
    if (!confirmacion) {
      this.router.navigate(['/home']); // Si no se confirma el registro, se redirige a la página de inicio
    }

    this.http.post('/api/register', this.userData, { responseType: 'text' })
    .subscribe({
      next: response => {
        console.log('Registro exitoso', response);
        window.alert('Registro exitoso: ' + response);
        this.router.navigate(['/home']);
      },
      error: error => 
      {
        console.error('Error en el registro', error);
        window.alert('Error en el registro: ' + error.error);
      }
    });

  }

  isAutofillEnabled = false;

  async autofillWallet() 
  {
    this.isAutofillEnabled = true;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const account =  await provider.send("eth_requestAccounts", []);
    this.userData.walletAddress = account[0];
    this.isAutofillEnabled = false;
  }

}
