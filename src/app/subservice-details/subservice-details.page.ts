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
  subserviceDetails: Array<JSON>;

  constructor(private route: ActivatedRoute, private cognitoService: CognitoServiceService, private httpService : HttpService) { }

  ngOnInit() {
    this.chosenSubservice = this.route.snapshot.paramMap.get('chosenSubservice');

    this.getSubservices().then((result: any) => {
      this.subserviceDetails = result.Items;
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

  

}
