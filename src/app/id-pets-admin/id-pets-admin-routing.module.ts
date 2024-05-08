import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdPetsAdminPage } from './id-pets-admin.page';

const routes: Routes = [
  {
    path: '',
    component: IdPetsAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdPetsAdminPageRoutingModule {}
