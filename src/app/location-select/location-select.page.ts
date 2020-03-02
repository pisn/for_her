import { Component, OnInit,  ElementRef, ViewChild} from '@angular/core';
import { NavController, Platform, ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMapsService } from '../google-maps.service';

declare var google;

/**********BOTAR ISSO NA CHAMADA DO COMPONENTE
 * async launchLocationPage(){

    let modal = await this.modalCtrl.create({
      component: LocationSelectPage      
    });

    await modal.present();
    
    modal.onDidDismiss().then ((location) => {
      console.log(location);
    })
  }
 * 
 */


@Component({
  selector: 'app-location-select',
  templateUrl: './location-select.page.html',
  styleUrls: ['./location-select.page.scss'],
})
export class LocationSelectPage implements OnInit{  

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  latitude: number;
  longitude: number;
  autocompleteService: any;
  placesService: any;
  query: string = '';
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any;  

  constructor(public navCtrl: NavController, /*public zone: NgZone,*/ public maps: GoogleMapsService, public platform: Platform, public geolocation: Geolocation, public viewCtrl: ModalController) {
      this.searchDisabled = true;
      this.saveDisabled = true;
  }

  ngOnInit(){
    console.log('ionVIew Test');

    let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {

        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.placesService = new google.maps.places.PlacesService(this.maps.map);
        this.searchDisabled = false;

    }); 
  }  

  selectPlace(place){

      this.places = [];

      let location = {
          lat: null,
          lng: null,
          name: place.name
      };

      this.query = place.description;
      
      this.placesService.getDetails({placeId: place.place_id}, (details) => {

        location.name = details.name;
        location.lat = details.geometry.location.lat();
        location.lng = details.geometry.location.lng();
        this.saveDisabled = false;

        this.maps.map.setCenter({lat: location.lat, lng: location.lng}); 

        this.location = location;       

        //   this.zone.run(() => {

        //       location.name = details.name;
        //       location.lat = details.geometry.location.lat();
        //       location.lng = details.geometry.location.lng();
        //       this.saveDisabled = false;

        //       this.maps.map.setCenter({lat: location.lat, lng: location.lng}); 

        //       this.location = location;

        //   });

      });

  }

  searchPlace(){     

      this.saveDisabled = true;

      if(this.query.length > 0 && !this.searchDisabled) {

          let config = {
              types: ['geocode'],
              input: this.query
          }

          this.autocompleteService.getPlacePredictions(config, (predictions, status) => {

              if(status == google.maps.places.PlacesServiceStatus.OK && predictions){

                  this.places = [];

                  predictions.forEach((prediction) => {
                      this.places.push(prediction);
                  });
              }

          });

      } else {
          this.places = [];
      }

  }

  save(){            
      this.viewCtrl.dismiss(this.location);
  }

  close(){
      this.viewCtrl.dismiss();
  }   

}
