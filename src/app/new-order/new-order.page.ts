import { Component, OnInit } from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {AwsApiConnectService} from '../aws-api-connect.service';
import {CommonUtilsService} from '../common-utils.service';
import { Router } from '@angular/router';
import { Time } from '@angular/common';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
})
export class NewOrderPage implements OnInit {

  constructor(private navController : NavController, private alertController : AlertController, private router : Router, private awsApi : AwsApiConnectService, private utils : CommonUtilsService) { }

  preco: number;
  servicePrice: number;
  prestadora: any;
  location: any;
  chosenSubservice: string;
  subserviceDetails: Array<any>;
  subservicesPrices: Array<any>;
  chosenDate : Date;  
  chosenTime: string;
  serviceDescription: string;

  ngOnInit() {         
    this.prestadora = this.router.getCurrentNavigation().extras.state.prestadora;
    this.chosenSubservice = this.router.getCurrentNavigation().extras.state.chosenSubservice;
    this.subserviceDetails = this.router.getCurrentNavigation().extras.state.subserviceDetails;     
    this.location = this.router.getCurrentNavigation().extras.state.location;     
    this.subservicesPrices = new Array();

    var summedPrice = 0;

    this.subserviceDetails.forEach(s => {
      console.log('Summing price for: ' + s);

      summedPrice += this.prestadora.priceTable[s.serviceDetail];
      
      s.price = this.prestadora.priceTable[s.serviceDetail];      
      this.subservicesPrices.push({"caption": s.caption,"preco": this.prestadora.priceTable[s.serviceDetail] });

    });

    this.servicePrice = summedPrice;

    summedPrice += this.prestadora.distancePrice;
    
    this.preco = summedPrice;   

  }
  
  
datePickerObj: any = {
  inputDate:new Date(), // default new Date()
  fromDate: new Date(), // default null
  toDate: new Date().setDate(new Date().getDate() + 90), // default null
  showTodayButton: true, // default true
  closeOnSelect: true, // default false
  disableWeekDays: [0,6], // default []
  mondayFirst: false, // default false
  setLabel: 'S',  // default 'Set'
  todayLabel: 'Hoje', // default 'Today'
  closeLabel: 'Voltar', // default 'Close'
  disabledDates: [],
  titleLabel: 'Dia do serviço', // default null
  monthsList: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
  weeksList: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
  dateFormat: 'DD MMM YYYY', // default DD MMM YYYY
  clearButton : false , // default true
  momentLocale: 'pt-BR', // Default 'en-US'
  yearInAscending: true, // Default false
  btnCloseSetInReverse: true, // Default false
  btnProperties: {
    expand: 'block', // Default 'block'
    fill: '', // Default 'solid'
    size: '', // Default 'default'
    disabled: '', // Default false
    strong: '', // Default false
    color: '' // Default ''
  },
  arrowNextPrev: {
    nextArrowSrc: '../../assets/shapes/right-arrow.svg',
    prevArrowSrc: '../../assets/shapes/left-arrow.svg',
  }, // This object supports only SVG files.
  highlightedDates: [
   { date: new Date('2019-09-10'), color: '#ee88bf', fontColor: '#fff' },
   { date: new Date('2019-09-12'), color: '#50f2b1', fontColor: '#fff' }
  ], // Default [],
  isSundayHighlighted : {
   fontColor: '#ee88bf' // Default null
  } // Default {}
};

async presentAlertSuccess() {
    
    const alert = await this.alertController.create({
      header: 'Agendamento confirmado',      
      message: 'Aguarde o contato da prestadora.',
      buttons: [{
        text: "OK",
        handler: () => {
          this.navController.navigateBack("/services");
        }
      }]
    });
    

    await alert.present();
  }
  
  confirmarAgendamento(){
    this.presentAlertSuccess();        
    this.awsApi.setNewServiceOrder(this.prestadora, this.subserviceDetails, this.chosenDate, this.chosenTime, this.serviceDescription, this.location)
    .then( (v: any) => {
        console.log("Retornou certo");
    },
    (err: any) => {
      console.log("Deu merda");
    });

  }

  formatPreco(preco){
    return this.utils.formatPreco(preco);
  }

  formatPrecoTotal(){
    return this.formatPreco(this.preco);
  }  

  convertedDistance(distance){
    return this.utils.convertedDistance(distance);
  }

}
