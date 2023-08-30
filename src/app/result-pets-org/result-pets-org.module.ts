import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultPetsOrgPageRoutingModule } from './result-pets-org-routing.module';

import { ResultPetsOrgPage } from './result-pets-org.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultPetsOrgPageRoutingModule
  ],
  declarations: [ResultPetsOrgPage]
})
export class ResultPetsOrgPageModule {}
