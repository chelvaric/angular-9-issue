import { Component } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  activePath = '';

  pages = [
    {
      name: 'Modules',
      path: 'modules'
    }
  ]

  constructor(router: Router) {

       router.events.subscribe((routerEvent: RouterEvent) => {
            this.activePath = routerEvent.url;
       });

  }

}
