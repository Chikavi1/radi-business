import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetsOrgPage } from './pets-org.page';

const routes: Routes = [
  {
    path: '',
    component: PetsOrgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsOrgPageRoutingModule {}
