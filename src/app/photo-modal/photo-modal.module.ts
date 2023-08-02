import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotoModalPageRoutingModule } from './photo-modal-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';

import { PhotoModalPage } from './photo-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageCropperModule,
    PhotoModalPageRoutingModule
  ],
  declarations: [PhotoModalPage]
})
export class PhotoModalPageModule {}
