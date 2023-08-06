import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateLinksPageRoutingModule } from './create-links-routing.module';

import { CreateLinksPage } from './create-links.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateLinksPageRoutingModule
  ],
  declarations: [CreateLinksPage]
})
export class CreateLinksPageModule {}
