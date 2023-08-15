import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateBusinessPage } from './create-business.page';

const routes: Routes = [
  {
    path: '',
    component: CreateBusinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateBusinessPageRoutingModule {}
