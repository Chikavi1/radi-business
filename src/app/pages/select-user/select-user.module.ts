import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectUserPageRoutingModule } from './select-user-routing.module';

import { SelectUserPage } from './select-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectUserPageRoutingModule
  ],
  declarations: [SelectUserPage]
})
export class SelectUserPageModule {}
