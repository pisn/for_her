import { Component } from '@angular/core';
import {CognitoServiceService} from '../cognito-service.service'
import { stringify } from '@angular/core/src/render3/util';
import { reject } from 'q';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  emailInput:string;
  passwordInput:string;

  constructor(public CognitoService: CognitoServiceService, public navCtrl : NavController) {}

  login(){           
    this.CognitoService.authenticate(this.emailInput,this.passwordInput)
      .then(res=> {
         console.log("Access Token received from Amazon.");                  
         this.navCtrl.navigateForward('/services');

      },
      err =>{
        console.log(err);
      });

  }
}
