import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
})
export class NewOrderPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  myDate : Date;
  disabledDates: Date[] = [
      new Date(1545911005644),     
      new Date(),     
      new Date(2018, 12, 12), // Months are 0-based, this is August, 10th.     
      new Date('Wednesday, December 26, 2018'), // Works with any valid Date formats like long format     
      new Date('12-14-2018'), // Short format
  ];
  
datePickerObj: any = {
  inputDate:new Date(), // default new Date()
  fromDate: new Date(), // default null
  toDate: new Date().setDate(new Date().getDate() + 90), // default null
  showTodayButton: true, // default true
  closeOnSelect: true, // default false
  disableWeekDays: [0,1], // default []
  mondayFirst: false, // default false
  setLabel: 'S',  // default 'Set'
  todayLabel: 'T', // default 'Today'
  closeLabel: 'C', // default 'Close'
  disabledDates: this.disabledDates, // default []
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
    nextArrowSrc: 'assets/images/arrow_right.svg',
    prevArrowSrc: 'assets/images/arrow_left.svg'
  }, // This object supports only SVG files.
  highlightedDates: [
   { date: new Date('2019-09-10'), color: '#ee88bf', fontColor: '#fff' },
   { date: new Date('2019-09-12'), color: '#50f2b1', fontColor: '#fff' }
  ], // Default [],
  isSundayHighlighted : {
   fontColor: '#ee88bf' // Default null
  } // Default {}
};

}
