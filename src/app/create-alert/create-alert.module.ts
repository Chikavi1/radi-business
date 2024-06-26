import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAlertPageRoutingModule } from './create-alert-routing.module';

import { CreateAlertPage } from './create-alert.page';
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
    LottieModule,
    CreateAlertPageRoutingModule
  ],
  declarations: [CreateAlertPage]
})
export class CreateAlertPageModule {}
