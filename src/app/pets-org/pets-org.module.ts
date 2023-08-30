import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetsOrgPageRoutingModule } from './pets-org-routing.module';

import { PetsOrgPage } from './pets-org.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetsOrgPageRoutingModule
  ],
  declarations: [PetsOrgPage]
})
export class PetsOrgPageModule {}
