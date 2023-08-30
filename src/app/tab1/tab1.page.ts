import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ResultPage } from '../result/result.page';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { CreateLinksPage } from '../create-links/create-links.page';
import { PaymentPage } from '../payment/payment.page';
import { CreateBusinessPage } from '../create-business/create-business.page';
import { SelectReadPage } from '../select-read/select-read.page';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';

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
    private nfc:NFC,
    private toastController:ToastController,
    private barcodeScanner: BarcodeScanner){
    this.name = localStorage.getItem('name');
    this.image = localStorage.getItem('image');
    this.device = localStorage.getItem('device');

    let granted = localStorage.getItem('granted');
    this.grantedLinks = granted.includes('links');
    this.grantedPayments = granted.includes('payments')
    this.grantedRoot = granted.includes('root');
  }

  code;

  action;   // visit || payments || links
  modeRead; // placa || app

  async scanResult(action){
    this.action = action; // visit

    this.nfc.enabled().then( () => {
      this.openSelectRead();
    }).catch(() => {
      this.qrcodescan(action);

    });
  }

  async openSelectRead(){
    const modal = await this.modalCtrl.create({
      component: SelectReadPage,
      breakpoints: [1],
      initialBreakpoint: 1,
      componentProps:{
        action: this.action,
      }

    });
    modal.onDidDismiss().then((data) => {
      // if(data['data']){
      //   const info = data['data'];
      //   console.log(info);
      // }
    });
    return await modal.present();
  }


  async openPayments(code){
    const modal = await this.modalCtrl.create({
      component: PaymentPage,
      breakpoints: [1],
      initialBreakpoint: 1,
      componentProps:{
        code: code,
      }
    });
    modal.onDidDismiss().then((data) => {
      // if(data['data']){
      //   const info = data['data'];
      //   console.log(info);
      // }
    });
    return await modal.present();
  }


  async openModalBusiness(){
    const modal = await this.modalCtrl.create({
      component: CreateBusinessPage,
      breakpoints: [1],
      initialBreakpoint: 1
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

  async openResult(modeRead,code){
    const modal = await this.modalCtrl.create({
      component: ResultPage,
      breakpoints: [.95,1],
      initialBreakpoint: .95,
      componentProps:{
        modeRead: modeRead,
        code: code,
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
      }
    });
    return await modal.present();
  }


  createBusiness(){
    this.openModalBusiness();
  }


  async qrcodescan(action){
    this.barcodeScanner.scan({disableSuccessBeep: true}).then(barcodeData => {
      if(!barcodeData.cancelled){
        let data = barcodeData.text;
        this.processData(data,action);
      }
    }).catch(err => {
      this.presentToast('Hubo un error,intenta despues.','danger');
      console.log('Error', err);
    });
  }

  processData(text,action){
    let hash;
    let modeRead;
    if(action === 'visits'){
        if(text.includes('https://radi.pet/pets/')){
          hash = text.split('pet/pets/');
          modeRead = 'placa'
        }else{
          hash = text.split('pet/pet/');
          modeRead =  'app'
        }
        this.openResult(modeRead, hash[1]);
    }
    if(action === 'payments'){
      if(text.includes('https://radi.pet/pets/')){
        hash = text.split('pet/pets/');
        modeRead = 'placa'
        this.openPayments(hash[1]);
        }else{
          this.presentToast('Opción disponible exclusivamente con la placa.','warning');
        }
    }
  }


  createLinks(){
    // this.openModal(CreateLinksPage)



    //   if(text.includes('https://radi.pet/links/')){
    //       const hash = text.split('pet/links/');
    //       this.code = hash[1];
    //   }else{
    //     alert('Error intenta luego.')
    //   }

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
