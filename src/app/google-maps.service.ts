import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ConnectivityService } from './connectivity.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { markParentViewsForCheck } from '@angular/core/src/view/util';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  apiKey: string = "AIzaSyCuoi4tT8hNMiLXg5LeosKLjz6fh772RiU";
  centerChangedEvent: Event;

  constructor(public connectivityService: ConnectivityService, public geolocation: Geolocation) {

  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {

    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
    this.centerChangedEvent = new Event('center_changed');

    return this.loadGoogleMaps();

  }

  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {     

      if(typeof google == "undefined" || typeof google.maps == "undefined"){

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if(this.connectivityService.isOnline()){

          window['mapInit'] = () => {

            this.initMap().then(() => {
              resolve(true);
            });

            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "googleMaps";

          if(this.apiKey){
            script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=places';
          } else {
            script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';       
          }

          document.body.appendChild(script);            

        } 
      } else {

        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }

        resolve(true);

      }

      this.addConnectivityListeners();

    });

  }

  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {      
      this.geolocation.getCurrentPosition().then((position) => {

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          streetViewControl: false,
          zoomControl: false
        }        

        this.map = new google.maps.Map(this.mapElement, mapOptions);

        /***Botando icone no lugar onde o GPS indica posicao */
        var marker = new google.maps.Marker({
          position: {lat: position.coords.latitude, lng: position.coords.longitude},
          icon: 'assets/icon/woman-map.png'
        });
        
        marker.setMap(this.map);        

        resolve(true);

      });

        // let latLng = new google.maps.LatLng(-23.550382, -46.634238);

        // let mapOptions = {
        //   center: latLng,
        //   zoom: 15,
        //   mapTypeId: google.maps.MapTypeId.ROADMAP
        // }

        // this.map = new google.maps.Map(this.mapElement, mapOptions);                       

        // resolve(true);

    });

  }
  
  mapCenterChanged() {
    console.log('EventFired');    
  }


  disableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }

  }

  enableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }

  }

  addConnectivityListeners(): void {

    this.connectivityService.watchOnline().subscribe(() => {

      setTimeout(() => {

        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        } 
        else {
          if(!this.mapInitialised){
            this.initMap();
          }

          this.enableMap();
        }

      }, 2000);

    });

    this.connectivityService.watchOffline().subscribe(() => {

      this.disableMap();

    });

  }
}
