import { Component } from '@angular/core';
import { LoggedStatusService } from '../logged-status.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private loggedService: LoggedStatusService) {}

  logIn(){
    this.loggedService.logMeIn();
    console.log(this.loggedService.isLogged())


  }
}
