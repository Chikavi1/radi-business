import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateLinksPage } from './create-links.page';

const routes: Routes = [
  {
    path: '',
    component: CreateLinksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateLinksPageRoutingModule {}
