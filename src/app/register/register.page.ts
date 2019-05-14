import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  cpf_cnpj='';
  maskedId: any;
  DECIMAL_SEPARATOR=".";
  GROUP_SEPARATOR=",";

  constructor() {     
  }

  customMonthNames = [
    'Janeiro',
    'Fevereiro',
    'Marco',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];

  cpf_mask(v) {
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
    return v;
  }

  cep_mask(v){
    v = v.replace()
    v = v.replace(/(\d{5})(\d)/, '$1-$2'); //Coloca um hifem

    return v;
  }

  formatCpf(valString) {    
    if (!valString) {
        return '';
    }
    let val = valString.toString();        
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR)
    this.maskedId = this.cpf_mask(parts[0]);
    return this.maskedId;
    
  };

  formatCep(valString){
    if(!valString)
      return '';

    let val = valString.toString();
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR)
    this.maskedId = this.cep_mask(parts[0]);

    //this.fillAddress(this.unFormat(val));

    return this.maskedId;

  };

  // fillAddress(cep){
  //   $http.get("https://viacep.com.br/ws/05346901/json/")
  //   .then(function(response) {

  //   });

  // }


  unFormat(val) {
    if (!val) {
        return '';
    }
    val = val.replace(/\D/g, '');

    if (this.GROUP_SEPARATOR === ',') {
        return val.replace(/,/g, '');
    } else {
        return val.replace(/\./g, '');
    }
  };

  unFormatCep(val){
    if(!val){
      return '';
    }

    return val.replace(/-/g,'');
  }

  ngOnInit() {
  }

  

}
