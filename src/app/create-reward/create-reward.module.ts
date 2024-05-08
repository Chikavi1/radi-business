import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateRewardPageRoutingModule } from './create-reward-routing.module';

import { CreateRewardPage } from './create-reward.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateRewardPageRoutingModule
  ],
  declarations: [CreateRewardPage]
})
export class CreateRewardPageModule {}
