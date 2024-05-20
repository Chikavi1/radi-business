import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoRoundedModalPage } from './photo-rounded-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PhotoRoundedModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoRoundedModalPageRoutingModule {}
