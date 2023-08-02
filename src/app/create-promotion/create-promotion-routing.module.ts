import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePromotionPage } from './create-promotion.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePromotionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePromotionPageRoutingModule {}
