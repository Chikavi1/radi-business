import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalWarningPageRoutingModule } from './modal-warning-routing.module';

import { ModalWarningPage } from './modal-warning.page';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LottieModule.forRoot({ player: playerFactory }),
    ModalWarningPageRoutingModule
  ],
  declarations: [ModalWarningPage]
})
export class ModalWarningPageModule {}
