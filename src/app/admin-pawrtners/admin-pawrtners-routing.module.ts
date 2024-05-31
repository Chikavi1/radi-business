import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPawrtnersPage } from './admin-pawrtners.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPawrtnersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPawrtnersPageRoutingModule {}
