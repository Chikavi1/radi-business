import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListVaccinesPage } from './list-vaccines.page';

const routes: Routes = [
  {
    path: '',
    component: ListVaccinesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListVaccinesPageRoutingModule {}
