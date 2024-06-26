import { Component } from '@angular/core';
import { ActionSheetController, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { ResultPage } from '../result/result.page';
import { PaymentPage } from '../payment/payment.page';
import { CreateBusinessPage } from '../create-business/create-business.page';
import { SelectReadPage } from '../select-read/select-read.page';
// import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import { DataService } from '../services/data.service';
import { AddClientPage } from '../add-client/add-client.page';
import { PromotionPage } from '../promotion/promotion.page';
import { CreatePromotionPage } from '../create-promotion/create-promotion.page';
import { CreateEventPage } from '../create-event/create-event.page';
import { CreateRewardPage } from '../create-reward/create-reward.page';
import { BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { CreateAdPage } from '../create-ad/create-ad.page';
import { CreateAlertPage } from '../create-alert/create-alert.page';
import { LogsActivityService } from '../services/logs-activity.service';

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

  logs: any[];

  plan;

  constructor(private modalCtrl:ModalController,
    private LogsActivity:LogsActivityService,
    // private nfc:NFC,
    private api: DataService,
    private actionSheetController: ActionSheetController,
    private navCtrl: NavController,
    private platform:Platform,
    private toastController:ToastController){
      // this.openResult('app', 214904);


      this.plan = localStorage.getItem('plan');


    this.name = localStorage.getItem('name');
    this.image = localStorage.getItem('image');
    this.device = localStorage.getItem('device');

    let granted = localStorage.getItem('granted');
    if(granted){
      this.grantedLinks = granted.includes('links');
      this.grantedPayments = granted.includes('payments')
      this.grantedRoot = granted.includes('root');
    }
  }

  ngOnInit() {
    this.LogsActivity.startLogging('tab1');
  }

  ngOnDestroy() {
    this.LogsActivity.stopLogging();
  }

  // Ejemplo de un método que registra un evento de click
  onButtonClick() {
    this.LogsActivity.logEvent('click', 'Escanear placa');
  }

  code;

  action;   // visit || payments || links
  modeRead; // placa || app

  async scanResult(action){
    this.action = action; // visit
    // this.processData('https://radi.pet/pets/RD1a3ad0e','visits')

    // this.nfc.enabled().then( () => {
    //   this.openSelectRead();
    // }).catch(() => {
      this.qrcodescan(action);
    // });
  }

  goTo(page){
    this.navCtrl.navigateForward(page);
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


  async openPayments(){
    const modal = await this.modalCtrl.create({
      component: PaymentPage,
      breakpoints: [1],
      initialBreakpoint: 1
    });
    modal.onDidDismiss().then((data) => {
      // if(data['data']){
      //   const info = data['data'];
      //   console.log(info);
      // }
    });
    return await modal.present();
  }

  ionViewWillEnter() {
    // Este código se ejecuta cada vez que la vista está a punto de ser activada
    console.log('Tab1 is about to be displayed');
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
      breakpoints: [1],
      initialBreakpoint: 1,
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
    if(this.platform.is('android')){
      await BarcodeScanner.requestPermissions();
      const data = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
      if (data.available) {
        const code = await this.startScanner();
        this.handlerScanner(code[0].displayValue,action);
      } else {
        try {
          await BarcodeScanner.installGoogleBarcodeScannerModule();
          const code = await this.startScanner();
          this.handlerScanner(code[0].displayValue,action);
        } catch (e) {
        }
      }
    }else{
      await BarcodeScanner.requestPermissions();
      const code = await this.startScanner();
      this.handlerScanner(code[0].displayValue,action);
    }
  }

  handlerScanner(d,action){
    this.processData(d,action);
  }

  async startScanner() {
    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode, BarcodeFormat.Ean13]
    });
    return barcodes;
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

//  async  presentActionSheet(){
//   let options = [
//     {
//         text: 'Crear Cliente',
//         icon: 'person-add',
//         handler: () => {
//           this.openAdds(AddClientPage)
//         }
//     },
//     {
//       text: 'Crear Evento',
//       icon: 'calendar',
//       handler: () => {
//         this.openAdds(CreateEventPage);
//       }
//     },
//     {
//       text: 'Crear Promoción',
//       icon: 'pricetag',
//       handler: () => {
//        this.openAdds(CreatePromotionPage);
//       }
//     },
//     {
//       text: 'Generar cobro',
//       icon: 'card',
//       handler: () => {
//        this.openPayments();
//       }
//     },
//     {
//       text: 'Crear Recompensa',
//       icon: 'trophy',
//       handler: () => {
//         this.openAdds(CreateRewardPage);

//       }
//     },
//     {
//       text: 'Crear Alerta',
//       icon: 'notifications',
//       handler: () => {
//         this.openAdds(CreateAlertPage);

//       }
//     },
//     {
//       text: 'Crear Anuncio',
//       icon: 'megaphone',
//       handler: () => {
//         this.openAdds(CreateAdPage);

//       }
//     },
//     {
//       text: 'Cancelar',
//       icon: 'close',
//       role: 'cancel',
//       handler: () => {
//       }
//     }
//   ]

//     const actionSheet = await this.actionSheetController.create({
//       header: '¿Qué deseas agregar?',
//       mode:'md',
//       buttons: options
//     });
//     await actionSheet.present();

//     const { role } = await actionSheet.onDidDismiss();
//   }



  async presentActionSheet() {
    const grantedPermissions = JSON.parse(localStorage.getItem('granted') || '[]');
    const options = [];

      options.push({
        text: 'Crear Cliente',
        icon: 'person-add',
        handler: () => {
          this.openAdds(AddClientPage);
        }
      });

      if (grantedPermissions.includes('events')) {
        options.push({
          text: 'Crear Evento',
          icon: 'calendar',
          handler: () => {
            this.openAdds(CreateEventPage);
          }
        });
      }

      options.push({
              text: 'Crear Promoción',
              icon: 'pricetag',
              handler: () => {
               this.openAdds(CreatePromotionPage);
              }
      });

      if (grantedPermissions.includes('payments')) {
        options.push({
          text: 'Generar cobro',
          icon: 'card',
          handler: () => {
            this.openPayments();
          }
        });
      }

      options.push({
        text: 'Crear Recompensa',
        icon: 'trophy',
        handler: () => {
          this.openAdds(CreateRewardPage);
        }
      });


      options.push(  {
        text: 'Crear Alerta',
        icon: 'notifications',
        handler: () => {
          this.openAdds(CreateAlertPage);

        }
      });


      options.push( {
        text: 'Crear Anuncio',
        icon: 'megaphone',
        handler: () => {
          this.openAdds(CreateAdPage);

        }
      });

    options.push({
      text: 'Cancelar',
      icon: 'close',
      role: 'cancel',
      handler: () => {}
    });

    const actionSheet = await this.actionSheetController.create({
      header: '¿Qué deseas agregar?',
      mode: 'md',
      buttons: options
    });

    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
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
    // if(action === 'payments'){
    //   if(text.includes('https://radi.pet/pets/')){
    //     hash = text.split('pet/pets/');
    //     modeRead = 'placa'
    //     this.openPayments(hash[1]);
    //     }else{
    //       this.presentToast('Opción disponible exclusivamente con la placa.','warning');
    //     }
    // }
  }


  async openAdds(page){
    const modal = await this.modalCtrl.create({
      component: page,
      breakpoints: [1],
      initialBreakpoint: 1
    });

    modal.onDidDismiss().then((data) => {
     if(data['data']){
        this.presentToast('Se ha creado exitosamente','success');
      }
    });

    return await modal.present();
  }


  async openModalLinks(page){
    const modal = await this.modalCtrl.create({
      component: page,
      breakpoints: [1],
      initialBreakpoint: 1
    });

    modal.onDidDismiss().then((data) => {

    });

    return await modal.present();
  }

  checkPlacas(){
    let data = {
      code: 'RDa899b6e'
    };


    this.api.getInfoPlaca(data).subscribe(data => {
      console.log(data);
    })

    // this.barcodeScanner.scan({disableSuccessBeep: true}).then(barcodeData => {
    //   if(!barcodeData.cancelled){
    //     let data = barcodeData.text;

    //     console.log(data);

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
