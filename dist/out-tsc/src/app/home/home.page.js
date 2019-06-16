import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CognitoServiceService } from '../cognito-service.service';
var HomePage = /** @class */ (function () {
    function HomePage(CognitoService) {
        this.CognitoService = CognitoService;
    }
    HomePage.prototype.login = function () {
        console.log("password: " + this.passwordInput);
        this.CognitoService.authenticate(this.emailInput, this.passwordInput)
            .then(function (res) {
            console.log("Access Token received from Amazon.");
        }, function (err) {
            console.log(err);
        });
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [CognitoServiceService])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map