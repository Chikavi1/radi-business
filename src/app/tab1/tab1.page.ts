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
  type;
  code;


  async scanResult(type){
    // check if have nfc
    this.type = type;
    // this.openModal(SelectReadPage);

    this.nfc.enabled().then( () => {
      this.openModal(SelectReadPage);
    }).catch(() => {
      this.qrcodescan();
    });
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
    this.openModal(CreateBusinessPage);
  }

  async qrcodescan(){


    this.barcodeScanner.scan({disableSuccessBeep: true}).then(barcodeData => {
      if(!barcodeData.cancelled){
        let data = barcodeData.text;
        this.processData(data);
      }
    }).catch(err => {
      this.presentToast('Hubo un error,intenta despues.','danger');
      console.log('Error', err);
    });
  }

  processData(text){
    let hash;
    if(this.type === 1){
      // visits
        if(text.includes('https://radi.pet/pets/')){
          hash = text.split('pet/pets/');
          this.type = 'placa'
        }else{
          hash = text.split('pet/pet/');
          this.type =  'app'
        }
        this.code = hash[1];
        this.openResult();

    }
    if(this.type === 2){
      // pagos
      if(text.includes('https://radi.pet/pets/')){
          this.openModal(PaymentPage);
        }else{
          this.presentToast('Opción disponible exclusivamente con la placa.','warning');
        }
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



      // let data = 'https://radi.pet/pets/RDa899b6e';
      // let data = 'https://radi.pet/pet/214904';

      // const hash = data.split('pet/pets/');
      // this.code = hash[1];
      // this.type = 'placa'



      // this.code = 'RDa899b6e';
      // this.type = 'placa'


  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }

}
