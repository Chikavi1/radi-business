import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListVaccinesPageRoutingModule } from './list-vaccines-routing.module';

import { ListVaccinesPage } from './list-vaccines.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListVaccinesPageRoutingModule
  ],
  declarations: [ListVaccinesPage]
})
export class ListVaccinesPageModule {}
