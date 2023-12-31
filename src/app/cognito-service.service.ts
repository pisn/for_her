import { Injectable } from '@angular/core';
import * as AWSCognito from 'amazon-cognito-identity-js';
import * as aws from 'aws-sdk';
import Amplify, {Auth} from 'aws-amplify';
import {Buffer} from 'buffer';
import { reject } from 'q';
import { AwsApiConnectService } from './aws-api-connect.service';


@Injectable({
  providedIn: 'root'
})
export class CognitoServiceService {
  user : AWSCognito.CognitoUser;
  userAttributes: any;
  userSession : AWSCognito.CognitoUserSession;
  isConnected : boolean;  
  profilePicture: any;

  //replace the value with actual value 
  _POOL_DATA = {
    UserPoolId: "ca-central-1_UKTkSiKAR",
    ClientId: "618ibf867ggo4erplu002t6vf8"
  };  

  getUserSession(){
    return this.userSession;
  }

  getUserId(){
    return this.user.getUsername();
  }

  signUp(email: string, name:string, birthDate:string, password: string, cpf: string,  address:string, base64Photo: any) {

    var cognitoService = this;

    return new Promise((resolved, reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      let userAttribute = [];
      userAttribute.push(
        new AWSCognito.CognitoUserAttribute({ Name: "name", Value: name }),
        new AWSCognito.CognitoUserAttribute({ Name: "email", Value: email }),
        new AWSCognito.CognitoUserAttribute({ Name: "address", Value: address }),
        new AWSCognito.CognitoUserAttribute({ Name: "birthdate", Value: birthDate }),
        new AWSCognito.CognitoUserAttribute({ Name: "custom:cpf", Value: cpf })
      );
      
      userPool.signUp(email, password, userAttribute, null, function(err, result) {
        if (err) {
          reject(err);
        } else {
          cognitoService.uploadPictureToS3(base64Photo, "profilePicture_" + result.userSub + ".jpg");  

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
          this.userSession = result;
          this.isConnected = true;
          this.user = cognitoUser;

          Auth.signIn(email, password).then(res => {
            console.log('Logged in Amplify')                                    
          })          

          this.user.getUserAttributes((err, attrs) => {
            
            const payload = {};
            attrs.forEach(attr => (payload[attr.getName()] = attr.getValue()));            
            this.userAttributes = payload
          });

          let profilePictureDownloadPromise = this.downloadPrestadoraPictureFromS3(this.getUserId());
          
          profilePictureDownloadPromise.then((data) => {
            this.profilePicture = data;
          })

          Promise.all([profilePictureDownloadPromise]).then((allResolved) => {
            resolved(result); //Esperar picture voltar pra liberar o resolve
          });

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

  resendEmail(email){
    return new Promise((resolve,reject) => {

      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      const cognitoUser = new AWSCognito.CognitoUser({
        Username: email,
        Pool: userPool
      });

      cognitoUser.resendConfirmationCode( 
        err => { 
          if(err != null){
            console.log(err);
            reject(err);    
          }      
          else{
            resolve();
          }
        }        
      );

    });
  }

  forgotPassword(email){
    return new Promise((resolve,reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      const cognitoUser = new AWSCognito.CognitoUser({
        Username: email,
        Pool: userPool
      });

      cognitoUser.forgotPassword( 
        {
          onSuccess: result => {
            resolve(result);
          },
          onFailure: err => {
            console.log(err);
            reject(err);
          }
        }
      )
     });
  }

  confirmCode(email, verificationCode, newPassword){
    return new Promise((resolve,reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      const cognitoUser = new AWSCognito.CognitoUser({
        Username: email,
        Pool: userPool
      });

      cognitoUser.confirmPassword(verificationCode, newPassword, 
        {
          onSuccess: () => {
            resolve(null);
          },
          onFailure: err => {
            console.log(err);
            reject(err);
          }
        });
    });


  }

  uploadPictureToS3(image, imageName){
    return new Promise((resolve, reject) => {    
      let base64Image = image.replace(/^data:image\/\w+;base64,/, '');
      
      const body = Buffer.from(base64Image, 'base64');

      aws.config.region = 'ca-central-1';
          aws.config.credentials = new aws.Credentials({
            accessKeyId:  "AKIATSVHE7R5WYSRPDKR",
            secretAccessKey: "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"
      });
  
      var s3 = new aws.S3({
        apiVersion: "2006-03-01",
        params: { Bucket: "forher-prestadora-profilepictures" }
      }); 
      
  
      var data = {
        Bucket: "forher-prestadora-profilepictures",
        Key: imageName,
        Body: body,
        ContentEncoding: "base64",
        ContentType: "image/jpeg"
      };

      
  
      s3.putObject(data, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }


  downloadPrestadoraPictureFromS3(prestadoraId){
    return new Promise((resolve, reject) => {    
          aws.config.region = 'ca-central-1';
          aws.config.credentials = new aws.CognitoIdentityCredentials({
            IdentityPoolId: "ca-central-1:1aa43394-222b-4c1c-a8dc-53f91f4effd9",
            Logins: {
              'cognito-idp.ca-central-1.amazonaws.com/ca-central-1_UKTkSiKAR' : this.getUserSession().getIdToken().getJwtToken()
            }
          });      
  
      var s3 = new aws.S3({
        apiVersion: "2006-03-01",
        params: { Bucket: "forher-prestadora-profilepictures" }
      }); 
      
  
      var data = {
        Bucket: "forher-prestadora-profilepictures",
        Key: 'profilePicture_' + prestadoraId + '.jpg'        
      };
      
  
      s3.getObject(data, (err, res) => {
        if (err) {
          reject(err);
        } else {
          let base64String= (res.Body as Buffer).toString('base64')
          let src = "data:image/jpeg;base64,"+base64String;

          resolve(src);
        }
      });
    });
  }

  constructor() { 
    this.isConnected = false;
  }
}
