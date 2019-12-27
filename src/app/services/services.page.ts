import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Services } from '@angular/core/src/view';
import { NavController } from '@ionic/angular';
import {CognitoServiceService} from '../cognito-service.service'
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  private API_URL = 'https://58jgjsy2y5.execute-api.ca-central-1.amazonaws.com/beta/services';                     


  constructor(private navCtrl: NavController, private cognitoService: CognitoServiceService, private httpService: HttpService) {
      
   } 

  private services : Array<JSON>;
   servicesRows : Array<number>;
  private dummyColumns : Array<number>;

  ngOnInit() {
    this.getServices().then((result : any) => {        
      console.log("Result Arrived");        
      console.log(result.Items);        
      this.services = result.Items;
      this.servicesRows = Array.from(Array(Math.ceil(this.services.length/3))).map((x,i) => i); //Dividindo sevicos em linhas com tres servicos cada
      this.dummyColumns = Array.from(Array(3 - (this.services.length % 3))).map((x,i) => i); //Ultima linha pode ter menos servicos, caso nao seja multiplo de 3        
    
    });

  }

  listSubservices(chosenService: string){
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //       service: service          
      
    //   }  
    // }
    console.log('Service ' + chosenService);   
      
  }

  getServices(){
    

    return new Promise((resolve,reject) => {
      var headersDict = {
        'Accept': "application/json", 
        'Authorization': this.cognitoService.getUserSession().getIdToken().getJwtToken().toString()
      };
      
      var requestOptions = {
        headers : new HttpHeaders(headersDict)
      };              
      
      this.httpService.getHttpClient().get(this.API_URL,requestOptions)
              .subscribe((result: any) => {                              
                  resolve(result);                    
              },
              (error) => {                    
                  console.log(error);
                  reject(error);
              });
      
   });
}

}
