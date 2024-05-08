import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaingsPage } from './campaings.page';

const routes: Routes = [
  {
    path: '',
    component: CampaingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaingsPageRoutingModule {}
