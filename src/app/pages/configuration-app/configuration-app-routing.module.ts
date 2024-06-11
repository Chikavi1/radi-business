import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigurationAppPage } from './configuration-app.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationAppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationAppPageRoutingModule {}
