import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CognitoServiceService } from '../cognito-service.service';
import { GeneralUtilitiesModule } from '../general-utilities/general-utilities.module';
import { NavController, ToastController } from '@ionic/angular';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(cognitoService, navCtrl, toastController) {
        this.cognitoService = cognitoService;
        this.navCtrl = navCtrl;
        this.toastController = toastController;
        this.cpf_cnpj = '';
        this.DECIMAL_SEPARATOR = ".";
        this.GROUP_SEPARATOR = ",";
        this.customMonthNames = [
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
    }
    RegisterPage.prototype.cpf_mask = function (v) {
        v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
        v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
        //de novo (para o segundo bloco de números)
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
        return v;
    };
    RegisterPage.prototype.cep_mask = function (v) {
        v = v.replace();
        v = v.replace(/(\d{5})(\d)/, '$1-$2'); //Coloca um hifem
        return v;
    };
    RegisterPage.prototype.formatCpf = function (valString) {
        if (!valString) {
            return '';
        }
        var val = valString.toString();
        var parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
        this.maskedId = this.cpf_mask(parts[0]);
        return this.maskedId;
    };
    ;
    RegisterPage.prototype.formatCep = function (valString) {
        if (!valString)
            return '';
        var val = valString.toString();
        var parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
        this.maskedId = this.cep_mask(parts[0]);
        //this.fillAddress(this.unFormat(val));
        return this.maskedId;
    };
    ;
    // fillAddress(cep){
    //   $http.get("https://viacep.com.br/ws/05346901/json/")
    //   .then(function(response) {
    //   });
    // }
    RegisterPage.prototype.unFormat = function (val) {
        if (!val) {
            return '';
        }
        val = val.replace(/\D/g, '');
        if (this.GROUP_SEPARATOR === ',') {
            return val.replace(/,/g, '');
        }
        else {
            return val.replace(/\./g, '');
        }
    };
    ;
    RegisterPage.prototype.unFormatCep = function (val) {
        if (!val) {
            return '';
        }
        return val.replace(/-/g, '');
    };
    RegisterPage.prototype.ngOnInit = function () {
    };
    RegisterPage.prototype.toastNotify = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
                            position: 'bottom'
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    RegisterPage.prototype.createAccount = function () {
        var _this = this;
        var birthDate = new Date(this.dataNascimentoInput);
        var birthFormatedString = birthDate.getFullYear() + "-" + GeneralUtilitiesModule.pad(birthDate.getMonth(), 2) + "-" + GeneralUtilitiesModule.pad(birthDate.getDay(), 2);
        var fullAdress = this.logradouroInput + ", " + this.numeroInput + (this.complementoInput != "" ? ", " + this.complementoInput : "") + ", " + this.cidadeInput + ", " + this.ufInput;
        this.cognitoService.signUp(this.emailInput, birthFormatedString, this.senhaInput, this.cpfInput, fullAdress)
            .then(function (res) {
            console.log("Register created at Amazon.");
            _this.navCtrl.back();
            _this.toastNotify("Conta criada. Para confirmar sua conta, siga as instruções enviadas por email");
        }, function (err) {
            console.log("Register failed at Amazon.");
        });
    };
    RegisterPage = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [CognitoServiceService, NavController, ToastController])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map