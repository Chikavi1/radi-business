import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigurationAppPageRoutingModule } from './configuration-app-routing.module';

import { ConfigurationAppPage } from './configuration-app.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigurationAppPageRoutingModule
  ],
  declarations: [ConfigurationAppPage]
})
export class ConfigurationAppPageModule {}
