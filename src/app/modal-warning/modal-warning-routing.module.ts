import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalWarningPage } from './modal-warning.page';

const routes: Routes = [
  {
    path: '',
    component: ModalWarningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalWarningPageRoutingModule {}
