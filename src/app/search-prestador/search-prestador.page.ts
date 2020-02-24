import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import {CognitoServiceService} from '../cognito-service.service';
import {HttpService} from '../http.service';
import { AwsApiConnectService } from '../aws-api-connect.service';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-search-prestador',
  templateUrl: './search-prestador.page.html',
  styleUrls: ['./search-prestador.page.scss'],
})
export class SearchPrestadorPage implements OnInit {
               

  chosenSubservice: string;
  subserviceDetails: Array<any>;
  prestadoras: Array<any>;    

  constructor(private router: Router, private awsConnectService : AwsApiConnectService, private geolocation : Geolocation) 
  { 
    
  }

  ngOnInit() {    
    this.chosenSubservice = this.router.getCurrentNavigation().extras.state.chosenSubservice;                
    this.subserviceDetails = this.router.getCurrentNavigation().extras.state.subserviceDetails;
    
    let detailsNames = new  Array<string>();
    this.subserviceDetails.forEach(d => {      
      detailsNames.push(d.serviceDetail);
    });

    this.awsConnectService.getPrestadorasBySubservice(detailsNames).then((result: any) => {           

      this.prestadoras = this.orderedPrestadoras(result).sort(function(a,b) {return a.distance - b.distance});
      
    }, 
    (error: any) => {
      console.log(error);
    });  
  }

  getDistance(lat1: number, lat2: number, lon1:number, lon2:number){
    lat1 = lat1 * (Math.PI /180);
    lat2 = lat2 * (Math.PI /180);
    lon1 = lon1 * (Math.PI /180);
    lon2 = lon2 * (Math.PI /180);


    var R = 6371e3; //Curvatura terrestre
    var x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
    var y = (lat2-lat1);
    return Math.sqrt(x*x + y*y) * R;
  }

  orderedPrestadoras(prestadoras : any){   

    //Obtendo distancia de cada prestadora ao usuário
    
    let currentLocation : Geoposition;    

    let geoOptions : GeolocationOptions = {
      timeout : 200
    }
    
    this.geolocation.getCurrentPosition(geoOptions).then((resp) => {
      console.log('Got location!');
      console.log(resp.coords.latitude.toString());
      console.log(resp.coords.longitude.toString());      
      currentLocation = resp;      

      prestadoras.forEach(element => {               
        console.log(element.nome + ' coordinates: ' + element.coordinates.latitude);

        element.distance = this.getDistance(currentLocation.coords.latitude,element.coordinates.latitude ,currentLocation.coords.longitude, element.coordinates.longitude);
       });
       
     },
     (error : any) => {
        prestadoras.forEach(element => {       
          element.distance = this.getDistance(-23.564183,element.latitude ,-46.691130, element.longitude);          
        });
        console.log('Error returning location');
        console.log(error);
     });       


     // Obtendo preco de cada prestadora, por enquanto unificado

     prestadoras.forEach(element => {
        var summedPrice = 0;

        this.subserviceDetails.forEach(s => {
          console.log('Summing price for: ' + s);

          summedPrice += element.priceTable[s.serviceDetail];
        });

        element.preco = summedPrice;

     });



     return prestadoras;

  }

  convertedDistance(distance: number){
    if(distance < 1000){
      return Math.round(distance).toString() + " m";
    }
    else {
      return (distance/1000).toFixed(2).toString() + " Km";
    }
    
  }

  formatPreco(preco){
    let numberFormat : Intl.NumberFormatOptions = {
      style : "currency",
      currency : "BRL"
    };

    return preco.toLocaleString("pt-BR",numberFormat);
  }

  startNewOrder(prestadora){

    let extras : NavigationExtras = {
      state : {
        subserviceDetails: this.subserviceDetails,
        chosenSubservice : this.chosenSubservice,        
        prestadora : prestadora
      }
    };
    
    this.router.navigate(['new-order'], extras);    
  }

}
