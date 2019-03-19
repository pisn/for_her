import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedStatusService {

  constructor() { 
    this.logged = false;
  }


  private logged: boolean;

  logMeIn(){
    this.logged = true;
  }

  isLogged(){
    return this.logged;    
  }
}
