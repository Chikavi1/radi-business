import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAdPageRoutingModule } from './create-ad-routing.module';

import { CreateAdPage } from './create-ad.page';
import { PipesModule } from '../pipes/pipes.module';
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
    PipesModule,
    CreateAdPageRoutingModule
  ],
  declarations: [CreateAdPage]
})
export class CreateAdPageModule {}
