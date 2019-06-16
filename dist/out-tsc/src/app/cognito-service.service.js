import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as AWSCognito from 'amazon-cognito-identity-js';
var CognitoServiceService = /** @class */ (function () {
    function CognitoServiceService() {
        //replace the value with actual value 
        this._POOL_DATA = {
            UserPoolId: "ca-central-1_TK3RRnXJH",
            ClientId: "6k18j6jobmhhb036cf0sbm15hd"
        };
    }
    CognitoServiceService.prototype.getUserSession = function () {
        return this.userSession;
    };
    CognitoServiceService.prototype.signUp = function (email, birthDate, password, cpf, address) {
        var _this = this;
        return new Promise(function (resolved, reject) {
            var userPool = new AWSCognito.CognitoUserPool(_this._POOL_DATA);
            var userAttribute = [];
            userAttribute.push(new AWSCognito.CognitoUserAttribute({ Name: "email", Value: email }), new AWSCognito.CognitoUserAttribute({ Name: "address", Value: address }), new AWSCognito.CognitoUserAttribute({ Name: "birthdate", Value: birthDate }), new AWSCognito.CognitoUserAttribute({ Name: "custom:CPF", Value: cpf }));
            userPool.signUp(email, password, userAttribute, null, function (err, result) {
                if (err) {
                    reject(err);
                }
                else {
                    resolved(result);
                }
            });
        });
    };
    CognitoServiceService.prototype.authenticate = function (email, password) {
        var _this = this;
        return new Promise(function (resolved, reject) {
            var userPool = new AWSCognito.CognitoUserPool(_this._POOL_DATA);
            var authDetails = new AWSCognito.AuthenticationDetails({
                Username: email,
                Password: password
            });
            var cognitoUser = new AWSCognito.CognitoUser({
                Username: email,
                Pool: userPool
            });
            cognitoUser.authenticateUser(authDetails, {
                onSuccess: function (result) {
                    resolved(result);
                    _this.userSession = result;
                },
                onFailure: function (err) {
                    reject(err);
                },
                newPasswordRequired: function (userAttributes) {
                    // User was signed up by an admin and must provide new
                    // password and required attributes, if any, to complete
                    // authentication.
                    // the api doesn't accept this field back
                    userAttributes.email = email;
                    delete userAttributes.email_verified;
                    cognitoUser.completeNewPasswordChallenge(password, userAttributes, {
                        onSuccess: function (result) { },
                        onFailure: function (error) {
                            reject(error);
                        }
                    });
                }
            });
        });
    };
    CognitoServiceService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], CognitoServiceService);
    return CognitoServiceService;
}());
export { CognitoServiceService };
//# sourceMappingURL=cognito-service.service.js.map