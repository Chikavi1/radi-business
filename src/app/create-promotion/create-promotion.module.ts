import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePromotionPageRoutingModule } from './create-promotion-routing.module';

import { CreatePromotionPage } from './create-promotion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePromotionPageRoutingModule
  ],
  declarations: [CreatePromotionPage]
})
export class CreatePromotionPageModule {}
