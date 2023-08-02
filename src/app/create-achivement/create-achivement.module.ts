import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAchivementPageRoutingModule } from './create-achivement-routing.module';

import { CreateAchivementPage } from './create-achivement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateAchivementPageRoutingModule
  ],
  declarations: [CreateAchivementPage]
})
export class CreateAchivementPageModule {}
