import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMembershipPageRoutingModule } from './create-membership-routing.module';

import { CreateMembershipPage } from './create-membership.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateMembershipPageRoutingModule
  ],
  declarations: [CreateMembershipPage]
})
export class CreateMembershipPageModule {}
