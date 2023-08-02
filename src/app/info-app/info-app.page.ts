import { Component, OnInit } from '@angular/core';

import { Browser } from '@capacitor/browser';
import { AlertController, ModalController, Platform, ToastController } from '@ionic/angular';


declare var require: any;
const Hashids = require('hashids/cjs');
const hashids = new Hashids('Elradipet10Lt', 6,'ABCEIU1234567890');

@Component({
  selector: 'app-info-app',
  templateUrl: './info-app.page.html',
  styleUrls: ['./info-app.page.scss'],
})
export class InfoAppPage {
  name;
  package;
  versionCode;
  versionNumber;
  plt;
  clicks = 0;

  hashiduser;

  sandbox;

  constructor(
    private modalController:ModalController,
    private alertController:AlertController,
    private toastController:ToastController,
    private platform:Platform){
      this.sandbox = localStorage.getItem('sandbox');
    this.plt = this.platform.is('android')?'android':'ios';
    this.hashiduser = hashids.encode(localStorage.getItem('user_id'));
   }

  beforePage(){
    this.modalController.dismiss();
  }


  sumClicks(){
    this.clicks++;
    if(this.clicks >= 10){
          if(this.sandbox){
            this.presentToast("Sandbox Desactivado.","success");
            localStorage.removeItem('sandbox');
            setTimeout(() => {          window.location.reload();}, 2000);

          }else{
            this.presentAlert('Vas a entrar a modo sandbox');
          }

        }
  }

  openProblems(){

  }

  async presentProblems(component) {
    const modal = await this.modalController.create({
      component: component,
      breakpoints: [1],
      initialBreakpoint: 1,
      backdropDismiss:true,
      cssClass: 'small-modal'
    });

    modal.onDidDismiss().then((data) => {

    });
    return await modal.present();
  }


  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message,
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'Código de reservación'
        }
      ],
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.modalController.dismiss();
          }
        }, {
          text: 'Aceptar',
          handler: (e) => {
            if(e.code == "chikavi"){

              localStorage.setItem('sandbox','true');
              this.presentToast("Sandbox activado.","success");
              setTimeout(() => {          window.location.reload();}, 2000);

          }

          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async presentToast(data,color) {
    const toast = await this.toastController.create({
      message: data,
      duration: 1500,
      color: color
    });
    toast.present();
  }

  async openBlank(url){
    await Browser.open({ url });
   }
}
