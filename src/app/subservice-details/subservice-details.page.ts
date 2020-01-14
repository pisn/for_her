import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import {CognitoServiceService} from '../cognito-service.service';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-subservice-details',
  templateUrl: './subservice-details.page.html',
  styleUrls: ['./subservice-details.page.scss'],
})


export class SubserviceDetailsPage implements OnInit {
  
  private API_URL = 'https://58jgjsy2y5.execute-api.ca-central-1.amazonaws.com/beta/';                     

  chosenSubservice: string;
  subserviceDetails: Array<any>;
  selectedDetails : Array<boolean>;
  totalValue : number;

  constructor(private route: ActivatedRoute, private cognitoService: CognitoServiceService, private httpService : HttpService) { }

  ngOnInit() {
    this.totalValue = 0;
    
    this.chosenSubservice = this.route.snapshot.paramMap.get('chosenSubservice');

    this.getSubservices().then((result: any) => {
      this.subserviceDetails = result.Items;
      this.selectedDetails = new Array<boolean>(result.Items.length);
      
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
      
      this.httpService.getHttpClient().get(this.API_URL + "subservicedetails?subservice=" + this.chosenSubservice,requestOptions)
              .subscribe((result: any) => {                              
                  resolve(result);                    
              },
              (error) => {                    
                  console.log(error);
                  reject(error);
              });
      
   });
}

selectSubserviceDetail(selectedIndex){
  this.selectedDetails[selectedIndex] = !this.selectedDetails[selectedIndex];

  this.totalValue = 0;

  this.selectedDetails.forEach((value: boolean, index : number) => {
    if(value){
      this.totalValue += this.subserviceDetails[index].preco;
    }
  });

}

  

}
