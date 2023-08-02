import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateAchivementPage } from './create-achivement.page';

const routes: Routes = [
  {
    path: '',
    component: CreateAchivementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateAchivementPageRoutingModule {}
