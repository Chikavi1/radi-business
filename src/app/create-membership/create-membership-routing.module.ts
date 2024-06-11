import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMembershipPage } from './create-membership.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMembershipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMembershipPageRoutingModule {}
