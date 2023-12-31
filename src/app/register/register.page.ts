import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {CognitoServiceService} from '../cognito-service.service';
import { GeneralUtilitiesModule} from '../general-utilities/general-utilities.module';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import {HttpService} from '../http.service';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { PictureCropperPage } from '../picture-cropper/picture-cropper.page';

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

  constructor(private cognitoService : CognitoServiceService, 
              private navCtrl : NavController, 
              private modalCtrl: ModalController,
              private toastController : ToastController, 
              private httpService: HttpService, 
              private camera: Camera) {     
  }

  nomeInput: string;
  dataNascimentoInput: string;
  cpfInput : string;
  cepInput: string;
  logradouroInput: string;
  numeroInput: number;
  complementoInput: string;
  cidadeInput: string;
  ufInput: string;
  emailInput : string;
  senhaInput : string;
  cepWorked : boolean;
  base64Photo: any;  
  
  @ViewChild("numeroInputEdit") public numeroInputRef: ElementRef;

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

  ufs= [
      'AC',
      'AL',
      'AP',
      'AM',
      'BA',
      'CE',
      'DF',
      'ES',
      'GO',
      'MA',
      'MT',
      'MS',
      'MG',
      'PA',
      'PB',
      'PR',
      'PE',
      'PI',
      'RJ',
      'RN',
      'RS',
      'RO',
      'RR',
      'SC',
      'SP',
      'SE',
      'TO'
  ]  
  
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

  formatCpf() {       
    if (!this.cpfInput) {
        return '';
    }
    let val = this.cpfInput.toString();            
    
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);

    this.maskedId = this.cpf_mask(parts[0]);

    this.cpfInput = this.maskedId;    
  };

  formatCep(){

    if(!this.cepInput)
      return '';

    let val = this.cepInput.toString();
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR)
    this.maskedId = this.cep_mask(parts[0]);

    this.fillAddress(this.unFormat(val));

    this.cepInput = this.maskedId;

  };

  fillAddress(cep){        
    this.httpService.getHttpClient().get("https://viacep.com.br/ws/" + cep + "/json/")
       .subscribe((result: any) => {

         if(result.erro == true){//ViaCep retorna boolean erro quando nao encontra cep
          this.toastNotify("Não foi possível recuperar informações para este CEP.");          
          this.cepWorked = false;         

         }
         else {

          this.logradouroInput = result.logradouro;
          this.cidadeInput = result.localidade;
          this.ufInput = result.uf;         

          this.cepWorked = true;   
          
          this.numeroInputRef.nativeElement.focus();          
         }

       },
       (error: any) => {
          this.toastNotify("Não foi possível recuperar informações para este CEP.");          
          this.cepWorked = false;
       })

  }


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
    this.base64Photo = "/assets/testAvatar.png";
  }

  async toastNotify(message : string){
    const toast = await this.toastController.create({            
      duration:  1000, 
      message: message,
      position: 'bottom'      
    });
    toast.present();

  }

  async TakeProfilePicture() {
    const options: CameraOptions = {
      quality: 100,      
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then(async (imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):         
     
     let base64Image = 'data:image/jpeg;base64,' + imageData;     

      let modal = await this.modalCtrl.create({
        component: PictureCropperPage,
        componentProps: {
          imageBase64: base64Image
        }        
      });
  
      await modal.present();
      
      modal.onDidDismiss().then ((croppedPhoto) => {
        this.base64Photo = croppedPhoto.data;                
      });

    }, (err) => {
     // Handle error
    });
  }

  createAccount(){
    var birthDate = new Date(this.dataNascimentoInput);
    var birthFormatedString = birthDate.getFullYear() + "-" + GeneralUtilitiesModule.pad(birthDate.getMonth(),2) + "-" + GeneralUtilitiesModule.pad(birthDate.getDay(),2);
    
    var fullAdress = this.logradouroInput + ", " + this.numeroInput + (this.complementoInput != "" ? ", " + this.complementoInput : "") + ", " + this.cidadeInput + ", " + this.ufInput;

    this.cognitoService.signUp(this.emailInput,this.nomeInput,birthFormatedString,this.senhaInput, this.unFormat(this.cpfInput.toString()),fullAdress, this.base64Photo)
        .then(res => {          
          this.navCtrl.back();
          this.toastNotify("Conta criada. Para confirmar sua conta, siga as instruções enviadas por email");
        },
        err => {
          console.log("Register failed at Amazon.");          
          console.log(err);  
        })


  }

}
