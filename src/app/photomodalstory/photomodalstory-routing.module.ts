import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotomodalstoryPage } from './photomodalstory.page';

const routes: Routes = [
  {
    path: '',
    component: PhotomodalstoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotomodalstoryPageRoutingModule {}
