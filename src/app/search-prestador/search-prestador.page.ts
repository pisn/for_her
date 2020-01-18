import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import {CognitoServiceService} from '../cognito-service.service';
import {HttpService} from '../http.service';
import { AwsApiConnectService } from '../aws-api-connect.service';

@Component({
  selector: 'app-search-prestador',
  templateUrl: './search-prestador.page.html',
  styleUrls: ['./search-prestador.page.scss'],
})
export class SearchPrestadorPage implements OnInit {
               

  chosenSubservice: string;
  prestadoras: Array<any>;

  constructor(private router: Router, private awsConnectService : AwsApiConnectService) 
  { 
    
  }

  ngOnInit() {    
    this.chosenSubservice = this.router.getCurrentNavigation().extras.state.chosenSubservice;        
    console.log('chosenSubservice:' + this.chosenSubservice);
    this.awsConnectService.getPrestadorasBySubservice(this.chosenSubservice).then((result: any) => {
      console.log('resultsArrived:');
      console.log(result);
      this.prestadoras = result.Items[0].prestadoras;
    }, 
    (error: any) => {
      console.log(error);
    });

  }

}
