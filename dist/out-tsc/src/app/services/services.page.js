import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
var ServicesPage = /** @class */ (function () {
    function ServicesPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.services = [
            { name: 'eletrica', displayText: 'Elétrica' },
            { name: 'hidraulica', displayText: 'Hidráulica' },
            { name: 'informatica', displayText: 'Informática' },
            { name: 'linhaBranca', displayText: 'Linha Branca' },
            { name: 'automotiva', displayText: 'Automotiva' },
            { name: 'televisao', displayText: 'Televisão' },
            { name: 'iluminacao', displayText: 'Iluminação' }
        ];
        this.servicesRows = Array.from(Array(Math.ceil(this.services.length / 3))).map(function (x, i) { return i; }); //Dividindo sevicos em linhas com tres servicos cada
        this.dummyColumns = Array.from(Array(3 - (this.services.length % 3))).map(function (x, i) { return i; }); //Ultima linha pode ter menos servicos, caso nao seja multiplo de 3
    }
    ServicesPage.prototype.ngOnInit = function () {
    };
    ServicesPage.prototype.listSubservices = function (chosenService) {
        // let navigationExtras: NavigationExtras = {
        //   queryParams: {
        //       service: service          
        //   }  
        // }
        console.log('Service ' + chosenService);
        //this.router.navigate(['/subservices',chosenService]); 
    };
    ServicesPage = tslib_1.__decorate([
        Component({
            selector: 'app-services',
            templateUrl: './services.page.html',
            styleUrls: ['./services.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController])
    ], ServicesPage);
    return ServicesPage;
}());
export { ServicesPage };
//# sourceMappingURL=services.page.js.map