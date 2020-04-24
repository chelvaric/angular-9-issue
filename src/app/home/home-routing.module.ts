import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { ModulesPageModule } from '../modules/modules.module';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'modules',
        loadChildren: () => import('../modules/modules.module').then(m => m.ModulesPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
