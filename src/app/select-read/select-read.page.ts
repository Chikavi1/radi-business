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
    private nfc:NFC) { }
    type;
    code;

    close(){
      this.modalCtrl.dismiss();
    }

  ngOnInit() {
    console.log(this.type);
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

  processData(text){
    let hash;
    if(this.type === 1){
        if(text.includes('https://radi.pet/pets/')){
          hash = text.split('pet/pets/');
          this.type = 'placa'
        }else{
          hash = text.split('pet/pet/');
          this.type =  'app'
        }
        this.code = hash[1];
        this.openResult();
        this.close();
    }
    if(this.type === 2){
      // pagos
      this.openModal(PaymentPage);
    }
    if(this.type === 3){
      // links
      if(text.includes('https://radi.pet/links/')){
          const hash = text.split('pet/links/');
          this.code = hash[1];
          this.openModal(CreateLinksPage)
      }else{
        alert('Error intenta luego.')
      }

    }
  }

  async openResult(){
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
      }
    });
    return await modal.present();
  }

  async qrcodescan(){
    this.barcodeScanner.scan().then(barcodeData => {
      if(!barcodeData.cancelled){
        let data = barcodeData.text;
        this.processData(data);
      }
    }).catch(err => {
      this.presentToast('Hubo un error,intenta despues.','danger');
      console.log('Error', err);
    });
  }

  async nfcscan(){
    try {
      let data = await this.nfc.scanNdef();
      let payload = data.ndefMessage[0].payload;
      let tagContent = this.nfc.bytesToString(payload).substring(3);
      alert(JSON.stringify(tagContent));
      this.processData(tagContent);
   } catch (err) {
       alert(JSON.stringify(err));
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

  async scanResult(){

    const modal = await this.modalCtrl.create({
      component: SelectReadPage,
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

}
