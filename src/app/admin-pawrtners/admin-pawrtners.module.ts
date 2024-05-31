import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPawrtnersPageRoutingModule } from './admin-pawrtners-routing.module';

import { AdminPawrtnersPage } from './admin-pawrtners.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPawrtnersPageRoutingModule
  ],
  declarations: [AdminPawrtnersPage]
})
export class AdminPawrtnersPageModule {}
