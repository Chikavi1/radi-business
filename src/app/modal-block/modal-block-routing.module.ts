import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalBlockPage } from './modal-block.page';

const routes: Routes = [
  {
    path: '',
    component: ModalBlockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalBlockPageRoutingModule {}
