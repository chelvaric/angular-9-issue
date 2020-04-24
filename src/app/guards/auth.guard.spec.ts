import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { SpectatorService, createService, mockProvider } from '@netbasal/spectator';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

describe('AuthGuard', () => {
 
 
  const spectator = createService({
    service: AuthGuard,
    providers: [
      mockProvider(AuthService,{
        user: new Observable<boolean>((observer) => false)
      })
    ]
  });


   


});
