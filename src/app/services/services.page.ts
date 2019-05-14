import { Component, OnInit } from '@angular/core';
import { Services } from '@angular/core/src/view';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  constructor() {
    
   }

  private services = [
    'Elétrica',
    'Hidráulica',
    'Informática',
    'Linha Branca',
    'Automotiva',
    'Televisão',
    'Iluminação'

  ]

  private servicesRows = Array.from(Array(Math.ceil(this.services.length/3))).map((x,i) => i);

  ngOnInit() {
  }

}
