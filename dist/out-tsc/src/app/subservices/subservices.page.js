import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
var SubservicesPage = /** @class */ (function () {
    function SubservicesPage(route) {
        this.route = route;
        this.services = [
            { name: 'eletrica', displayText: 'Elétrica' },
            { name: 'hidraulica', displayText: 'Hidráulica' },
            { name: 'informatica', displayText: 'Informática' },
            { name: 'linhaBranca', displayText: 'Linha Branca' },
            { name: 'automotiva', displayText: 'Automotiva' },
            { name: 'televisao', displayText: 'Televisão' },
            { name: 'iluminacao', displayText: 'Iluminação' }
        ];
    }
    SubservicesPage.prototype.ngOnInit = function () {
        var _this = this;
        this.chosenService = this.route.snapshot.paramMap.get('chosenService');
        this.services.forEach(function (element) {
            if (element.name == _this.chosenService) {
                _this.chosenServiceDisplayText = element.displayText;
            }
        });
    };
    SubservicesPage = tslib_1.__decorate([
        Component({
            selector: 'app-subservices',
            templateUrl: './subservices.page.html',
            styleUrls: ['./subservices.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute])
    ], SubservicesPage);
    return SubservicesPage;
}());
export { SubservicesPage };
//# sourceMappingURL=subservices.page.js.map