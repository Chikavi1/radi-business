import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotomodalstoryPageRoutingModule } from './photomodalstory-routing.module';

import { PhotomodalstoryPage } from './photomodalstory.page';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageCropperModule,
    PhotomodalstoryPageRoutingModule
  ],
  declarations: [PhotomodalstoryPage]
})
export class PhotomodalstoryPageModule {}
