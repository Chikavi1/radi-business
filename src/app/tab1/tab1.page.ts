import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ResultPage } from '../result/result.page';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { CreateLinksPage } from '../create-links/create-links.page';
import { PaymentPage } from '../payment/payment.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
name;
image;
device;

grantedLinks;
grantedPayments;
grantedRoot;

  constructor(private modalCtrl:ModalController,
    private toastController:ToastController,
    private barcodeScanner: BarcodeScanner){
    this.name = localStorage.getItem('name');
    this.image = localStorage.getItem('image');
    this.device = localStorage.getItem('device');

    let granted = localStorage.getItem('granted');
    this.grantedLinks = granted.includes('links');
    this.grantedPayments = granted.includes('payments')
    this.grantedRoot = granted.includes('root')

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


  async openModal(Page){
    const modal = await this.modalCtrl.create({
      component: Page,
      breakpoints: [1],
      initialBreakpoint: 1,
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

  createBusiness(){
    alert('crear')
  }


  scan(type){
    this.code = '214904';
    this.type = 'app'
    this.scanResult();

    // this.barcodeScanner.scan().then(barcodeData => {
    //   let data = barcodeData.text;
    //   if(type === 1){
    //     if(!barcodeData.cancelled){
    //       if(data.includes('https://')){
    //         const hash = data.split('pet/pet/');
    //         this.code = hash[1];
    //         this.type = 'app'
    //       }else{
    //         this.type =  'placa'
    //         this.code = data;
    //       }
    //     }
    //     this.scanResult();
    //   }

    //   if(type === 2){
    //     this.openModal(PaymentPage);
    //   }
    //   if(type === 3){
    //     // let data = 'https://radi.pet/links/70405c1s';
    //     if(data.includes('https://radi.pet/links/')){
    //         const hash = data.split('pet/links/');
    //         this.code = hash[1];
    //         this.openModal(CreateLinksPage)
    //     }else{
    //       alert('Error intenta luego.')
    //     }

    //   }

    // }).catch(err => {
    //   this.presentToast('Hubo un error,intenta despues.','danger');
    //   console.log('Error', err);
    // });
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
