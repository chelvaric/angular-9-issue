import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule,Storage } from '@ionic/storage';
import { JwtModule,JWT_OPTIONS  } from '@auth0/angular-jwt';

import { environment } from './../environments/environment';

import { AuthService,JWT_TOKEN } from './services/auth.service';

export function jwtOptionsFactory(storage:Storage) {
   return {
     tokenGetter: () => {
       return storage.get(JWT_TOKEN);
     },
     whitelistedDomains: environment.whiteListedDomains
    
   }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(), 
     AppRoutingModule,
     IonicStorageModule.forRoot(),
     HttpClientModule,
     JwtModule.forRoot(
       {
         jwtOptionsProvider: {
           provide: JWT_OPTIONS,
           useFactory: jwtOptionsFactory,
           deps: [Storage]
         }
       }
     )
    ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
