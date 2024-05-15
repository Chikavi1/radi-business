import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MethodPaymentsPage } from './method-payments.page';

const routes: Routes = [
  {
    path: '',
    component: MethodPaymentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MethodPaymentsPageRoutingModule {}
