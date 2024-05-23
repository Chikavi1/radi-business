import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MethodPaymentsPageRoutingModule } from './method-payments-routing.module';

import { MethodPaymentsPage } from './method-payments.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    MethodPaymentsPageRoutingModule
  ],
  declarations: [MethodPaymentsPage]
})
export class MethodPaymentsPageModule {}
