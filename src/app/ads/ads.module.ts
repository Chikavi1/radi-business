import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdsPageRoutingModule } from './ads-routing.module';

import { AdsPage } from './ads.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    AdsPageRoutingModule
  ],
  declarations: [AdsPage]
})
export class AdsPageModule {}
