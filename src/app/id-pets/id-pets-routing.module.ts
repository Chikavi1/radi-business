import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdPetsPage } from './id-pets.page';

const routes: Routes = [
  {
    path: '',
    component: IdPetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdPetsPageRoutingModule {}
