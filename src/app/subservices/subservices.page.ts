import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-subservices',
  templateUrl: './subservices.page.html',
  styleUrls: ['./subservices.page.scss'],
})
export class SubservicesPage implements OnInit {


  chosenService: string;
  chosenServiceDisplayText: string;

  private services = [
    {name: 'eletrica',displayText:'Elétrica'},
    {name: 'hidraulica',displayText:'Hidráulica'},
    {name: 'informatica',displayText:'Informática'},
    {name: 'linhaBranca',displayText:'Linha Branca'},
    {name: 'automotiva',displayText:'Automotiva'},
    {name: 'televisao',displayText:'Televisão'},
    {name: 'iluminacao',displayText:'Iluminação'}
  ]
  
  constructor(private route: ActivatedRoute) { 

  } 

  ngOnInit() {    
    this.chosenService = this.route.snapshot.paramMap.get('chosenService');
    
    this.services.forEach(element => {
      if (element.name == this.chosenService){
        this.chosenServiceDisplayText = element.displayText;
      }
    });
    
  }

}
