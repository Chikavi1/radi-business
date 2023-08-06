import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalBlockPageRoutingModule } from './modal-block-routing.module';

import { ModalBlockPage } from './modal-block.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalBlockPageRoutingModule
  ],
  declarations: [ModalBlockPage]
})
export class ModalBlockPageModule {}
