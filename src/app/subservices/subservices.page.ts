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
  private API_URL = 'https://58jgjsy2y5.execute-api.ca-central-1.amazonaws.com/beta/';

  chosenService: string;
  chosenServiceDisplayText: string;  

  private services : Array<JSON>;

  subServicesRows : Array<number>;
  private subServices : Array<JSON>;
  private dummyColumns: Array<number>;
  
  constructor(private route: ActivatedRoute, private cognitoService: CognitoServiceService, private httpService : HttpService,private zone:NgZone) { 

  } 

  ngOnInit() {        
    this.chosenService = this.route.snapshot.paramMap.get('chosenService');
    
    this.getServices().then((result: any) => {
      console.log('Services arrived');
      this.services = result.Items;
      
      this.services.forEach(element => {
        console.log(element);
        if (element['service']  == this.chosenService){
          this.chosenServiceDisplayText = element['caption'];
        }
      });   
    })
    
    

    this.getSubservices().then((result : any) => {        
          console.log("Result Arrived");        
          console.log(result.Items);        
          this.subServices = result.Items;
          this.subServicesRows = Array.from(Array(Math.ceil(this.subServices.length/3))).map((x,i) => i); //Dividindo sevicos em linhas com tres servicos cada
          this.dummyColumns = Array.from(Array(3 - (this.subServices.length % 3))).map((x,i) => i); //Ultima linha pode ter menos servicos, caso nao seja multiplo de 3        
        
    });
    
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
      
      this.httpService.getHttpClient().get(this.API_URL + "services",requestOptions)
              .subscribe((result: any) => {                              
                  resolve(result);                    
              },
              (error) => {                    
                  console.log(error);
                  reject(error);
              });
      
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
        
        this.httpService.getHttpClient().get(this.API_URL + "subservices?service=" + this.chosenService,requestOptions)
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
