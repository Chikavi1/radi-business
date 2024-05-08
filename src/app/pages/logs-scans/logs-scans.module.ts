import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogsScansPageRoutingModule } from './logs-scans-routing.module';

import { LogsScansPage } from './logs-scans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogsScansPageRoutingModule
  ],
  declarations: [LogsScansPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class LogsScansPageModule {}
