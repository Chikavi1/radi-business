import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateRewardPage } from './create-reward.page';

const routes: Routes = [
  {
    path: '',
    component: CreateRewardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRewardPageRoutingModule {}
