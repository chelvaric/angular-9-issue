import { Injectable } from '@angular/core';
import { CanActivate, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
   constructor(private authservice: AuthService,private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
     return this.authservice.user.pipe(
          take(1),
          map(user => {
            if(!user)
            {
               this.router.navigateByUrl('/login');
              return false;
            }
            else {
              return true;
            }

          })
      );

  }

}
