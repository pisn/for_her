import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import { CognitoServiceService } from './cognito-service.service';
import { HttpHeaders } from '@angular/common/http';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AwsApiConnectService {

  private API_URL = 'https://58jgjsy2y5.execute-api.ca-central-1.amazonaws.com/beta/';        

  constructor(private httpService : HttpService, private cognitoService : CognitoServiceService) { }

  getPrestadorasBySubservice(serviceDetails: Array<string>){

    return new Promise((resolve,reject) => {
      var headersDict = {
        'Accept': "application/json", 
        'Authorization': this.cognitoService.getUserSession().getIdToken().getJwtToken().toString()
      };
      
      var requestOptions = {
        headers : new HttpHeaders(headersDict)
      };              
      
      this.httpService.getHttpClient().get(this.API_URL + "prestadorasbysubservice?serviceDetails=" + JSON.stringify(serviceDetails),requestOptions)
              .subscribe((result: any) => {                    
                  resolve(result);                    
              },
              (error) => {                    
                  console.log(error);
                  reject(error);
              });
      
    });

  }

  setNewServiceOrder(subservices : Array<string>, chosenDate : Date, details: string, distancePrice: number, servicePrice: number){

    return new Promise((resolve,reject) => {
      var headersDict = {
        'Accept': "application/json", 
        'Authorization': this.cognitoService.getUserSession().getIdToken().getJwtToken().toString()
      };
      
      var requestOptions = {
        headers : new HttpHeaders(headersDict)
      };              

      var requestBody = {
          table: "serviceOrders",
          item: {
            userId: this.cognitoService.getUserId(),
            chosenSubservices: subservices,
            chosenDate : chosenDate,
            details : details, 
            distancePrice: distancePrice.toFixed(2),
            servicePrice: servicePrice            
          }
      };
      
      console.log(JSON.stringify(requestBody).toString());

      this.httpService.getHttpClient().post(this.API_URL + "serviceorder", JSON.stringify(requestBody),requestOptions)
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
