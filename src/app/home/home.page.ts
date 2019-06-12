import { Component } from '@angular/core';
import {CognitoServiceService} from '../cognito-service.service'
import { stringify } from '@angular/core/src/render3/util';
import { reject } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  emailInput:string;
  passwordInput:string;

  constructor(public CognitoService: CognitoServiceService) {}

  login(){       
    console.log("password: "  +this.passwordInput);
    this.CognitoService.authenticate(this.emailInput,this.passwordInput)
      .then(res=> {
         console.log("Access Token received from Amazon.");
      },
      err =>{
        console.log(err);
      });

  }
}
