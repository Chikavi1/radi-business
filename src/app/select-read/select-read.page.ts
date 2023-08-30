import { Component, OnInit } from '@angular/core';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ModalController, ToastController } from '@ionic/angular';
import { PaymentPage } from '../payment/payment.page';
import { CreateLinksPage } from '../create-links/create-links.page';
import { ResultPage } from '../result/result.page';

@Component({
  selector: 'app-select-read',
  templateUrl: './select-read.page.html',
  styleUrls: ['./select-read.page.scss'],
})
export class SelectReadPage implements OnInit {
    qrlottie;
    nfclottie;

  constructor(private barcodeScanner:BarcodeScanner,
    private toastController:ToastController,
    private modalCtrl:ModalController,
    private nfc:NFC) {
      this.qrlottie  = {
        path: '../../../assets/lotties/readqr.json',
        autoplay: true,
        loop: true
      }
      this.nfclottie  = {
        path: '../../../assets/lotties/readnfc.json',
        autoplay: true,
        loop: true
      }
    }

    action;
    modeRead;
    code;

    close(){
      this.modalCtrl.dismiss();
    }

  ngOnInit() {

  }

  processData(text,action,tec){
    let hash;
    let modeRead;
    if(action === 'visits'){
        if(text.includes('di.pet/pets/')){
          hash = text.split('pet/pets/');
          modeRead = 'placa'
        }else{
          hash = text.split('pet/pet/');
          modeRead =  'app'
        }

        if(tec == 'nfc'){
          modeRead = 'placa'
          this.openResult(modeRead, hash[0]);
        }else{
          this.openResult(modeRead, hash[1]);
        }
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

  async openPayments(code){
    console.log(this.modeRead,this.code)
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

  async openResult(modeRead,code){
    console.log('------')
    console.log(modeRead,code);
    console.log('------')

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


  async qrcodescan(){
    // let data = 'https://radi.pet/pets/RD39uc98q4';
    // // let data = 'https://radi.pet/pet/214904';
    // console.log(data,this.action,'qr')
    // this.processData(data,this.action,'qr');


    this.barcodeScanner.scan({disableSuccessBeep: true}).then(barcodeData => {
      if(!barcodeData.cancelled){
        let data = barcodeData.text;
        this.processData(data,this.action,'qr');
      }
    }).catch(err => {
      this.presentToast('Hubo un error,intenta despues.','danger');
      console.log('Error', err);
    });
  }

  async nfcscan(){
    // let tagContent = 'di.pet/pets/RDa899b6e';
    // let id =  tagContent.split('pets/');
    // this.processData(id[1],this.action,'nfc');

    try {
      let data = await this.nfc.scanNdef();
      let payload = data.ndefMessage[0].payload;
      let tagContent = this.nfc.bytesToString(payload).substring(3);
      let id =  tagContent.split('pets/');
      this.processData(id[1],this.action,'nfc');
   } catch (err) {
   }
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }

  async openModal(Page){
    const modal = await this.modalCtrl.create({
      component: Page,
      breakpoints: [1],
      initialBreakpoint: 1,
      componentProps:{
        type: this.modeRead,
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

}
