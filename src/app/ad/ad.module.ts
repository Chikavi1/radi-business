import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdPageRoutingModule } from './ad-routing.module';

import { AdPage } from './ad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdPageRoutingModule
  ],
  declarations: [AdPage]
})
export class AdPageModule {}
