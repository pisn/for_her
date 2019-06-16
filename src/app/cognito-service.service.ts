import { Injectable } from '@angular/core';
import * as AWSCognito from 'amazon-cognito-identity-js';


@Injectable({
  providedIn: 'root'
})
export class CognitoServiceService {

  userSession : AWSCognito.CognitoUserSession;
  isConnected : boolean;

  //replace the value with actual value 
  _POOL_DATA = {
    UserPoolId: "ca-central-1_TK3RRnXJH",
    ClientId: "6k18j6jobmhhb036cf0sbm15hd"
  };  

  getUserSession(){
    return this.userSession;
  }


  signUp(email: string, birthDate:string, password: string, cpf: string,  address:string) {
    return new Promise((resolved, reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      let userAttribute = [];
      userAttribute.push(
        new AWSCognito.CognitoUserAttribute({ Name: "email", Value: email }),
        new AWSCognito.CognitoUserAttribute({ Name: "address", Value: address }),
        new AWSCognito.CognitoUserAttribute({ Name: "birthdate", Value: birthDate }),
        new AWSCognito.CognitoUserAttribute({ Name: "custom:CPF", Value: cpf })
      );
      
      userPool.signUp(email, password, userAttribute, null, function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolved(result);
        }
      });
    });
  }

  authenticate(email, password) {
    return new Promise((resolved, reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      const authDetails = new AWSCognito.AuthenticationDetails({
        Username: email,
        Password: password
      });

      const cognitoUser = new AWSCognito.CognitoUser({
        Username: email,
        Pool: userPool
      });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: result => {
          resolved(result);
          this.userSession = result;
          this.isConnected = true;
        },
        onFailure: err => {
          reject(err);
        },
        newPasswordRequired: userAttributes => {
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.

          // the api doesn't accept this field back
          userAttributes.email = email;
          delete userAttributes.email_verified;

          cognitoUser.completeNewPasswordChallenge(password, userAttributes, {
            onSuccess: function(result) {},
            onFailure: function(error) {
              reject(error);
            }
          });
        }
      });
    });
  }

  constructor() { 
    this.isConnected = false;
  }
}
