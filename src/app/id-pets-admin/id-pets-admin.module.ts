import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdPetsAdminPageRoutingModule } from './id-pets-admin-routing.module';

import { IdPetsAdminPage } from './id-pets-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdPetsAdminPageRoutingModule
  ],
  declarations: [IdPetsAdminPage]
})
export class IdPetsAdminPageModule {}
