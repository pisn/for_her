import { Component, OnInit,  ElementRef, ViewChild, AfterViewInit} from '@angular/core';
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
  query: string;  
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any;  
  geocoder : any;

  constructor(public navCtrl: NavController, /*public zone: NgZone,*/ public maps: GoogleMapsService, public platform: Platform, public geolocation: Geolocation, public viewCtrl: ModalController) {
      this.searchDisabled = true;
      this.saveDisabled = true;      
      this.query = '';
  }

  ngOnInit(){
    this.geolocation.getCurrentPosition().then((position) => {
      let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement, position.coords.latitude, position.coords.longitude).then(() => {

        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.placesService = new google.maps.places.PlacesService(this.maps.map);
        this.geocoder = new google.maps.Geocoder();
        this.searchDisabled = false;               

        this.maps.map.addListener('dragend', function() {
        
          console.log('Dispatching event')         
          
        });      

        this.setAdressByLocation(position.coords.latitude, position.coords.longitude); 


        /***Criando botao de confirmacao */
        // Set CSS for the control border.
        var controlDiv = document.createElement('div');
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Confirmar';
        controlUI.appendChild(controlText);

        
        this.maps.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(controlDiv);
        
        controlUI.addEventListener('click',  (event) => {
          this.save();
        });               

      });       

    });     
  }      

  testeQuery(){
    console.log(this.query);
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

        location.name = place.description;
        location.lat = details.geometry.location.lat();
        location.lng = details.geometry.location.lng();               

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
              input: this.query,
              location: this.maps.map.getCenter(),
              radius: 2000
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

  setAdressByLocation (latitude: number, longitude: number) {
    var latlng = {lat: latitude, lng: longitude};

    console.log('Executing request to google Geocoding. Latitude:' + latitude.toString() + ' Longitude:' + longitude.toString());    

    this.geocoder.geocode({'location': latlng}, (results, status) =>  {
      console.log('GeocodingRequest');
      if (status === 'OK') {
        if (results[0]) {          
          console.log(results[0].formatted_address);
          this.query = results[0].formatted_address;
          
        } else {
          this.query = 'No results found';
        }
      } else {
        console.log('Geocoder failed due to: ' + status);        
      }
    });    
    
  }

  save(){            
      this.viewCtrl.dismiss(this.location);
  }

  close(){
      this.viewCtrl.dismiss();
  }   

}
