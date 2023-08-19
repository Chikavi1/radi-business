import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectReadPageRoutingModule } from './select-read-routing.module';

import { SelectReadPage } from './select-read.page';
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
    SelectReadPageRoutingModule
  ],
  declarations: [SelectReadPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SelectReadPageModule {}
