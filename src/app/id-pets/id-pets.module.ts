import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdPetsPageRoutingModule } from './id-pets-routing.module';

import { IdPetsPage } from './id-pets.page';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PipesModule,
    IdPetsPageRoutingModule
  ],
  declarations: [IdPetsPage]
})
export class IdPetsPageModule {}
