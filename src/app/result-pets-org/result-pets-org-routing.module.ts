import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultPetsOrgPage } from './result-pets-org.page';

const routes: Routes = [
  {
    path: '',
    component: ResultPetsOrgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultPetsOrgPageRoutingModule {}
