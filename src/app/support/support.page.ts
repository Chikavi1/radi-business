import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  constructor(private modalController:ModalController) { }

  ngOnInit() {
  }

  beforePage(){
    this.modalController.dismiss();
  }

  async openBlank(url){
    await Browser.open({ url });
   }

}
