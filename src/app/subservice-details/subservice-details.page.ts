import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import {CognitoServiceService} from '../cognito-service.service';
import {HttpService} from '../http.service';
import {LocationSelectPage} from '../location-select/location-select.page';
import { AwsApiConnectService } from '../aws-api-connect.service';


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

  constructor(private route: ActivatedRoute, private router: Router, private awsService: AwsApiConnectService, private cognitoService: CognitoServiceService, private httpService : HttpService, private modalCtrl : ModalController) { }

  ngOnInit() {
    this.totalValue = 0;
    
    this.chosenSubservice = this.route.snapshot.paramMap.get('chosenSubservice');

    this.awsService.getSubservices(this.chosenSubservice).then((result: any) => {
      this.subserviceDetails = result.Items;
      this.selectedDetails = new Array<boolean>(result.Items.length);
      
    });
  }  

selectSubserviceDetail(selectedIndex){
  this.selectedDetails[selectedIndex] = !this.selectedDetails[selectedIndex];
}


async launchLocationPage(){

  let modal = await this.modalCtrl.create({
    component: LocationSelectPage      
  });

  await modal.present();
  
  modal.onDidDismiss().then ((location) => {
    console.log(location.data);
    this.searchPrestador(location.data)
  })
}


searchPrestador(location){  
  let navigationExtras: NavigationExtras = {
    state: {
      chosenSubservice : this.chosenSubservice,
       subserviceDetails: this.subserviceDetails.filter(function(x,i) { return this[i] }, this.selectedDetails),
       location: location
      
    }
    
  };  

  this.router.navigate(['search-prestador'],navigationExtras);  
}

  

}
