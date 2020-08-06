import { Component, OnInit } from '@angular/core';
import { CognitoServiceService } from '../cognito-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private cognitoService : CognitoServiceService) { }
  
  maskedId: any;
  cpf: string;
  name: string;
  address: string;
  profilePicture: any;

  ngOnInit() {
    this.profilePicture = this.cognitoService.profilePicture;
    this.cpf = this.formatCpf(this.cognitoService.userAttributes['custom:cpf']);
    this.name = this.cognitoService.userAttributes['name'];    
    this.address = this.cognitoService.userAttributes['address'];
  }

  cpf_mask(v) {
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
    return v;
  }

  formatCpf(cpf) {              
    
    const parts = this.unFormat(cpf).split('.');

    this.maskedId = this.cpf_mask(parts[0]);

    return this.maskedId;    
  };

  unFormat(val) {
    if (!val) {
        return '';
    }
    val = val.replace(/\D/g, '');
    
    return val.replace(/,/g, '');   
  };

}
