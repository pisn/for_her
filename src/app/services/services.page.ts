import { Component, OnInit } from '@angular/core';
import { Services } from '@angular/core/src/view';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  constructor(private navCtrl: NavController) {
      
   }
   

  private services = [
    {name: 'eletrica',displayText:'Elétrica'},
    {name: 'hidraulica',displayText:'Hidráulica'},
    {name: 'informatica',displayText:'Informática'},
    {name: 'linhaBranca',displayText:'Linha Branca'},
    {name: 'automotiva',displayText:'Automotiva'},
    {name: 'televisao',displayText:'Televisão'},
    {name: 'iluminacao',displayText:'Iluminação'}
  ]

  private servicesRows = Array.from(Array(Math.ceil(this.services.length/3))).map((x,i) => i); //Dividindo sevicos em linhas com tres servicos cada
  private dummyColumns = Array.from(Array(3 - (this.services.length % 3))).map((x,i) => i); //Ultima linha pode ter menos servicos, caso nao seja multiplo de 3

  ngOnInit() {
  }

  listSubservices(chosenService: string){
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //       service: service          
      
    //   }  
    // }
    console.log('Service ' + chosenService);
    //this.router.navigate(['/subservices',chosenService]); 
      
  }

}
