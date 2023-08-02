import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrcodeappPageRoutingModule } from './qrcodeapp-routing.module';

import { QrcodeappPage } from './qrcodeapp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrcodeappPageRoutingModule
  ],
  declarations: [QrcodeappPage]
})
export class QrcodeappPageModule {}
