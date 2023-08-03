import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ResultPage } from '../result/result.page';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
name;
image;
device;

  constructor(private modalCtrl:ModalController,
    private toastController:ToastController,
    private barcodeScanner: BarcodeScanner){
    this.name = localStorage.getItem('name');
    this.image = localStorage.getItem('image');
    this.device = localStorage.getItem('device');
  }
  type;
  code;

  async scanResult(){
    const modal = await this.modalCtrl.create({
      component: ResultPage,
      breakpoints: [.95,1],
      initialBreakpoint: .95,
      componentProps:{
        type: this.type,
        code: this.code,
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        const info = data['data'];
        console.log(info);
      }
    });
    return await modal.present();
  }





  scan(){


    this.barcodeScanner.scan().then(barcodeData => {
      let data = barcodeData.text;
      if(!barcodeData.cancelled){
        if(data.includes('https://')){
          const hash = data.split('pet/pet/');
          this.code = hash[1];
          this.type = 'app'
        }else{
          this.type =  'placa'
          this.code = data;
        }
      }
      this.scanResult();
    }).catch(err => {
      this.presentToast('Hubo un error,intenta despues.','danger');
      console.log('Error', err);
    });
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }

}
