import { Component, OnInit, NgZone } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {CognitoServiceService} from '../cognito-service.service'
import {HttpService} from '../http.service';

@Component({
  selector: 'app-subservices',
  templateUrl: './subservices.page.html',
  styleUrls: ['./subservices.page.scss'],
})
export class SubservicesPage implements OnInit {
  private API_URL = 'https://58jgjsy2y5.execute-api.ca-central-1.amazonaws.com/beta/subservices';

  chosenService: string;
  chosenServiceDisplayText: string;  

  private services = [
    {name: 'eletrica',displayText:'Elétrica'},
    {name: 'hidraulica',displayText:'Hidráulica'},
    {name: 'informatica',displayText:'Informática'},
    {name: 'linhaBranca',displayText:'Linha Branca'},
    {name: 'automotiva',displayText:'Automotiva'},
    {name: 'televisao',displayText:'Televisão'},
    {name: 'iluminacao',displayText:'Iluminação'}
  ]

  private subServicesRows : Array<number>;
  private subServices : Array<JSON>;
  private dummyColumns: Array<number>;
  
  constructor(private route: ActivatedRoute, private cognitoService: CognitoServiceService, private httpService : HttpService,private zone:NgZone) { 

  } 

  ngOnInit() {        
    this.chosenService = this.route.snapshot.paramMap.get('chosenService');
    
    this.services.forEach(element => {
      if (element.name == this.chosenService){
        this.chosenServiceDisplayText = element.displayText;
      }
    });   

    this.getSubservices().then((result : any) => {        
          console.log("Result Arrived");        
          console.log(result.Items);        
          this.subServices = result.Items;
          this.subServicesRows = Array.from(Array(Math.ceil(this.services.length/3))).map((x,i) => i); //Dividindo sevicos em linhas com tres servicos cada
          this.dummyColumns = Array.from(Array(3 - (this.services.length % 3))).map((x,i) => i); //Ultima linha pode ter menos servicos, caso nao seja multiplo de 3        
        
    });
    
  }

  getSubservices(){
    

      return new Promise((resolve,reject) => {
        var headersDict = {
          'Accept': "application/json", 
          'Authorization': this.cognitoService.getUserSession().getIdToken().getJwtToken().toString()
        };
        
        var requestOptions = {
          headers : new HttpHeaders(headersDict)
        };              
        
        this.httpService.getHttpClient().get(this.API_URL + "?service=" + this.chosenService,requestOptions)
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
