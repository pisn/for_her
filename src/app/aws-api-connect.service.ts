import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import { CognitoServiceService } from './cognito-service.service';
import { HttpHeaders } from '@angular/common/http';
import { Time } from '@angular/common';
import Amplify, {Auth} from 'aws-amplify';

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
                  resolve(result.body);                    
              },
              (error) => {                    
                  console.log(error);
                  reject(error);
              });
      
    });

  }

  getOrdersByUser(){
    
    return new Promise((resolve,reject) => {
      var headersDict = {
        'Accept': "application/json", 
        'Authorization': this.cognitoService.getUserSession().getIdToken().getJwtToken().toString()
        
      };
      
      var requestOptions = {
        headers : new HttpHeaders(headersDict)
      };                    
      
      this.httpService.getHttpClient().get(this.API_URL + "serviceorderbyuser?userId=" + this.cognitoService.getUserId(), requestOptions)
              .subscribe((result: any) => {                   
                  resolve(result);                    
              },
              (error) => {                    
                  console.log(error);
                  reject(error);
              });
      
    });

  }

  getSubservices(subservice){    

    return new Promise((resolve,reject) => {
      var headersDict = {
        'Accept': "application/json", 
        'Authorization': this.cognitoService.getUserSession().getIdToken().getJwtToken().toString()
      };
      
      var requestOptions = {
        headers : new HttpHeaders(headersDict)
      };                   
      

      this.httpService.getHttpClient().get(this.API_URL + "subservicedetails?subservice=" + subservice,requestOptions)
              .subscribe((result: any) => {                              
                  resolve(result);                    
              },
              (error) => {                    
                  console.log(error);
                  reject(error);
              });
      
   });
  }

  setNewServiceOrder(prestadora: any, subservices : Array<string>, chosenDate : Date, chosenTime: string, details: string, location: Array<any>){

    return new Promise((resolve,reject) => {
      var headersDict = {
        'Content-Type': "application/json", 
        'Authorization': this.cognitoService.getUserSession().getIdToken().getJwtToken().toString()
      };
      
      const headers = new HttpHeaders(headersDict);
                

      var prestadoraFiltered = {
        coordinates: prestadora.coordinates,
        distance: prestadora.distance,
        distancePrice : Number.parseFloat(prestadora.distancePrice.toFixed(2)),        
        freeDistance: prestadora.freeDistance,
        kilometerPrice : prestadora.kilometerPrice,
        nome: prestadora.nome,
        prestadoraId: prestadora.prestadoraId
      }

      var clienteFiltered = {
        name: this.cognitoService.userAttributes['name'],
        clienteId: this.cognitoService.getUserId()
      }

      var requestBody = {
          table: "serviceOrders",
          item: {                      
            prestadoraId: prestadoraFiltered.prestadoraId,
            location: location,
            chosenSubservices: subservices,            
            chosenDate : chosenDate,
            chosenTime : chosenTime,
            prestadora: prestadoraFiltered,            
            cliente: clienteFiltered,
            details : details,             
            status: "Em Aberto"            
          }
      };
      
          

      this.httpService.getHttpClient().post(this.API_URL + "serviceorder", requestBody,{headers : headers})
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
