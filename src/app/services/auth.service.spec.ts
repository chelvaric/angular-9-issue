import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AuthService,JWT_TOKEN,REFRESH_TOKEN } from './auth.service';
import { createService,SpectatorService } from '@netbasal/spectator';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

describe('AuthService', () => {

  const spectator = createService({
    service: AuthService,
    mocks: [Storage,Platform,Router,HttpClient]
  });
   
    

   it("should not have a user",() => {
        expect(spectator.service.getUser()).toBeNull();
   });
  
   it("should have a user",() => {
     spectator.service.userData.next(true);
    expect(spectator.service.getUser()).toBe(true);
   });

});
