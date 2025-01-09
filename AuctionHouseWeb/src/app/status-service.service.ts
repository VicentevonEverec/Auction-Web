import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root',
})

export class StateService 
{

  async setFondosActuales() {
    try { 
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(this.getAccount());

      const ethereumAmount = parseFloat(ethers.utils.formatEther(balance));
      var ethereumPrice = this.getEthereumPrice();

      if (ethereumPrice !== null && ethereumPrice !== 0) {
        var convertedAmount = ethereumAmount * ethereumPrice;
        localStorage.setItem('convertedAmount', convertedAmount.toString())
      }
    } catch (error) {
      console.error('El saldo actual de esta cartera es 0.');
    }
  }

  getFondosActuales() {
    const fondosActuales = localStorage.getItem('convertedAmount');
    if (fondosActuales !== null) {
      const fondos = parseFloat(fondosActuales);
      console.log('Fondos actuales:', fondos);
      return fondos;
    } else {
      console.log('El valor de los fondos actuales en localStorage es nulo.');
      return 0;
    } 
  }

  setEthereumPrice(price: number) { localStorage.setItem('ethereumPrice', price.toString()) }

  getEthereumPrice() { 
    const ethereumPriceString = localStorage.getItem('ethereumPrice');
    if (ethereumPriceString !== null) {
      const ethereumPrice = parseFloat(ethereumPriceString);
      console.log('Ethereum Price:', ethereumPrice);
      return ethereumPrice;
    } else {
      console.log('El valor de Ethereum Price en localStorage es nulo.');
      return 0;
    }
  }

  setCacheRecargas(cache: number) { localStorage.setItem('cacheRecargas', cache.toString()) }

  getCacheRecargas() { 
    const cacheRecargas = localStorage.getItem('cacheRecargas');
    if (cacheRecargas !== null) {
      const cache = parseFloat(cacheRecargas);
      console.log('Tiempo caché:', cache);
      return cache;
    } else {
      console.log('El valor del tiempo de recarga en localStorage es nulo.');
      return 0;
    } 
  }

  userData = {
    name: "",
    surname: "",
    email: "",
    dni: "",
    account: ""
  }

  private walletSubject = new BehaviorSubject<string>('');

  wallet$ = this.walletSubject.asObservable();

  constructor() {
    // Al iniciar el servicio, intenta cargar la cartera desde Local Storage
    this.loadWallet();
  }

  setWallet(wallet: string): void {
    // Actualizar la cartera en el BehaviorSubject y guardar en Local Storage
    this.walletSubject.next(wallet);
    this.saveWallet(wallet);
  }

  private loadWallet() {
    const storedWallet = localStorage.getItem('wallet');
    if (storedWallet) {
      // Cargar la cartera desde Local Storage
      this.walletSubject.next(storedWallet);
    }
  }

  private saveWallet(wallet: string) {
    // Guardar la cartera en Local Storage
    localStorage.setItem('wallet', wallet);
  }

  getAccount(): string {
    // Obtener el valor de la cartera desde el BehaviorSubject
    return this.walletSubject.value;
  }

  getAccountToShow(): string {
    const wallet = this.walletSubject.value;
    // Modificar el valor de la cartera para mostrarlo como se desea
    return wallet.substring(0, 6) + '...' + wallet.substring(wallet.length - 4);
  }

  getDni() : string
  {
    return this.userData.dni;
  }

  setDni(dni : string) : void
  {
    this.userData.dni = dni;
  }

  getEmail() : string
  {
    return this.userData.email;
  }

  setEmail(email : string) : void
  {
    this.userData.email = email;
  }

  getName() : string
  {
    return this.userData.name;
  }

  setName(name : string) : void
  {
    this.userData.name = name;
  }

  getSurname() : string
  {
    return this.userData.surname;
  }

  setSurname(surname : string) : void
  {
    this.userData.surname = surname;
  }

  setUserData(userData : any) : void
  {
    this.setName(userData.name);
    this.setSurname(userData.surname);
    this.setEmail(userData.email);
    this.setDni(userData.dni);
  }

  cleanUserData() : void
  {
    this.setName("");
    this.setSurname("");
    this.setEmail("");
    this.setDni("");
    this.setWallet("");
  }

  getUserData() : any
  {
    return this.userData;
  }
}
