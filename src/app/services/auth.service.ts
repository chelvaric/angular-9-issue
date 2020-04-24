import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { take, map, switchMap, catchError } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { TokenResponse,Credentials,RefreshTokenResource } from '../models/login.interface';
import { zip } from 'rxjs';

//make the jwt helper
const helper = new JwtHelperService();
export const JWT_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userName:string;
  public user:Observable<any>;
  public userData = new BehaviorSubject(null);
  constructor(private storage: Storage,private httpClient: HttpClient,private platform:Platform,private router:Router) { 
  }

  /**
   * checks if a jwt token is stored and loads it
   */
   loadStoredToken(){
     //make an observable of the platform load
     let pltObs = from(this.platform.ready());

     //when the platform is ready we try to get the token and decode it 
      this.user = pltObs.pipe(
        switchMap(() => {
          //get the token and switch the map to this observable
          return this.storage.get(JWT_TOKEN);
        }),
        map(token => {
          //check if the token exists
          if(token){
              //decode it and push it to the user
             let decoded = helper.decodeToken(token);
              this.userName = decoded.sub;
             this.userData.next(decoded);
             return true;
          }
          else{
            return false
          }
        })
      );
   }

   /**
    *  does a login request to the api and stores the tokens
    *  @param userName the user name of the user
    *  @param password the password of the user
    */
    login(userName:string,password:string)  {

      //make object
      let cred: Credentials = { userName:userName,password:password };

      return this.httpClient.post<TokenResponse>(environment.apiUrl + "/login",cred).pipe(
        take(1),
        switchMap(token => {

             return this.handleTokenResponse(token);
        })
      );

    }

    /**
     * handles the token response by saving the tokens
     * @param token the token response returned from login or refresh token
     */
    private handleTokenResponse(token:TokenResponse)
    {
             //decode the access token and set it as the current user
             var accessToken = helper.decodeToken(token.accessToken);
             this.userData.next(accessToken);
             //store the username
             this.userName = accessToken.sub;
             
             console.log(helper.getTokenExpirationDate(token.accessToken));

             //store both tokens
              var accesPromise = this.storage.set(JWT_TOKEN,token.accessToken);
              var refreshPromise = this.storage.set(REFRESH_TOKEN, token);
              //zip the promises to one observable
              return  zip(accesPromise,refreshPromise)
    }


    /**
     * refreshes the token
     */
    async refreshToken(){

      //get the refresh token
      var token = await this.storage.get(REFRESH_TOKEN);
       
      //make the resource and call the refresh 
      let resource: RefreshTokenResource = { userName:this.userName,token:token };
       return this.httpClient.post<TokenResponse>(environment.apiUrl + '/refreshtoken',resource).pipe(
          take(1),
          map(token => {
             return this.handleTokenResponse(token);
          })
       ).toPromise();

    }

    /**
     * gets the currently logged in user
     */
    getUser(){
       return this.userData.getValue();
    }

    /**
     * Logs the currently logged in user out and deletes the tokens
     */
    logout()  {
         //delete the full store
       this.storage.clear().then(() => {
           //go back to the login and set current user to null
           this.router.navigateByUrl('/');
           this.userData.next(null);
       });
    }

}
