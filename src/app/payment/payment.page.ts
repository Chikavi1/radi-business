import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { PaymentsPage } from '../payments/payments.page';
import { LogsActivityService } from '../services/logs-activity.service';
import { BillingPage } from '../billing/billing.page';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  success;
  enabledButton = true;
  paymentsEnabled = true;
  code = 'RDa899b6e';
  // cambiar
  customer;
  correctPin;

 amount = 35;
 stripe = 0; //4.26;
 ivastripe = 0; // 0.68;
 business = 0; //30.06;
 radiservice = 1.99;
 total = 0;

 setTotal(){
  this.stripe = ((3.60*this.amount)/100)+3;
  this.ivastripe = (this.stripe * 0.16);
  this.business = this.amount - (this.stripe+this.ivastripe);
  this.total = this.amount;
}

billing(){
  this.close();
  this.openModal(BillingPage)
}

async openModal(Page){
  const modal = await this.modalCtrl.create({
    component: Page,
    breakpoints: [1],
    initialBreakpoint: 1,
    componentProps:{
      id:1,
    }
  });
  modal.onDidDismiss().then((data) => {

  });
  return await modal.present();
}

account;

 constructor(
   private api:DataService,
   private LogsActivity: LogsActivityService,
    private toastController:ToastController,
    private platform:Platform,
    private loadingCtrl: LoadingController,
    private modalCtrl:ModalController) {
      // 'acct_1NhHerBGXEEdgI6X'
      this.account = localStorage.getItem('account');
      this.success  = {
        path: '../../../assets/lotties/success.json',
        autoplay: true,
        loop: false
      }
    }

    messageStatus;

    pin = '';
    step = 1;

    percent1 = 95;
    percent2 = 5;
    back(){
      this.step -= 1;

    }
    breakdown = false;

    setBreakdown(b){
      this.breakdown = b;
    }

  ngOnInit(){


    this.getAccountInfo();

    this.LogsActivity.startLogging('Payment');
  }

  needConfigurate
  getAccountInfo(){
    this.api.getAccount({account: this.account}).subscribe(data => {
      if(data.details_submitted){
        this.needConfigurate = false;
      }else{
        this.messageStatus = 'needconfiguration';
        console.log('NECESITAS CONFIGURAR TUS PAGOS')
        this.needConfigurate = true;
      }
    });
  }

  removeLogging(){
    this.LogsActivity.stopLogging();
  }

  seePayments(){
    this.onEvent('click','ver pagos');

    this.payments();
  }

  async payments(){
    const modal = await this.modalCtrl.create({
      component: PaymentsPage,
      breakpoints: [1],
      initialBreakpoint: 1
    });
    modal.onDidDismiss().then((data) => {

    });
    this.removeLogging();
    return await modal.present();
  }


  handlerScanner(d){
    this.onEvent('click','Escanear placa para hacer pagos');

    let hash;
      if(d.includes('https://radi.pet/pets/')){
        hash = d.split('pet/pets/');
      }

    this.api.checkUserPay({code: hash[1]}).subscribe(data => {
      console.log(data)
      if(data.status == 401){
        this.onEvent('error','pagos placa inhabilitado');
        this.presentToast('No tiene habilitado los pagos con la placa','danger','top');
      }else{
        if(data[0].pin){
          this.customer = data[0].customer;
          this.correctPin = data[0].pin;
          this.idUser = data[0].id;
          this.step += 1;
        }
      }
    },err=>{
      console.log(err);
      this.presentToast('Placa no valida','danger','top');
    });
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


 async checkPayments(){
  // let url = 'https://radi.pet/pets/RDxqp83r35';
  // this.handlerScanner(url);


    if(this.platform.is('android')){
      await BarcodeScanner.requestPermissions();
      const data = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
      if (data.available) {
        const code = await this.startScanner();
        this.handlerScanner(code[0].displayValue);
      } else {
        try {
          await BarcodeScanner.installGoogleBarcodeScannerModule();
          const code = await this.startScanner();
          this.handlerScanner(code[0].displayValue);
        } catch (e) {
        }
      }
    }else{
      await BarcodeScanner.requestPermissions();
      const code = await this.startScanner();
      this.handlerScanner(code[0].displayValue);
    }
  }

  description = 'Compra en '+localStorage.getItem('name');
  intents = 0;
  idc;
  idUser;

  payment(){
    this.onEvent('click','boton pagar');
    if(this.correctPin == this.pin){
      this.showLoading();

      let data = {
        customer: this.customer,
        account: this.account,
        total: this.total,
        description: this.description
      }
      console.log(data);

      this.datePayment = new Date();


      this.api.paymentbusiness(data).subscribe(async(data) => {
        console.log(data);
        if(data.status == 'succeeded'){
          this.onEvent('payment','pago | '+data.id);
            this.idc = data.id;
            this.loadingCtrl.dismiss();
            this.enabledButton = true;
            this.step = 3;
        }

        if(data.status == 204){
          this.onEvent('error','No tiene tarjeta vinculada');
          this.presentToast('No tiene tarjeta vinculada','danger','top');
          this.pin = '';
          this.enabledButton = true;
        }
      },err => {
        this.enabledButton = true;

        console.log(err);

        if(err.error.details.code  == "card_declined"){
          this.presentToast('Tarjeta declinada, sin saldo','danger','bottom');
        }

        console.log(err.error.details.code == "card_declined");
      });

    }else{
      this.pin = '';
      this.enabledButton = true;
      this.onEvent('error','pin invalido');
      this.presentToast('Pin Invalido','danger','top');
      this.intents += 1;
      console.log(this.intents);

      if(this.intents > 3){
        this.step = 1;

        let data = {
          "payments_enabled": false,
          "id": this.idUser
        }

        this.api.updateGranted(data).subscribe((data:any) => {
          if(data.status == 200){
            this.onEvent('error','Se deshabilitaron los pagos');
            this.presentToast('Por seguridad, se deshabilitaron los pagos con la placa','danger','top')
          }
        });

      }

    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Procesando Pago ...',
      duration: 3000,
    });

    loading.present();
    this.enabledButton = false;
    // checa nip, se hace pago y envia notificación

    // let data = {
    //   customer: this.customer,
    //   account: localStorage.getItem('account'),
    //   pin: this.pin,
    //   description: this.description,
    //   serviceUser :this.serviceUser,
    //   serviceBusiness:this.serviceBusiness,
    //   total: this.total,
    //   radiPets:this.radiPets,
    //   stripeCost:this.stripeCost,
    //   business:this.business
    // }
    // this.api.pay(data).subscribe(resp => {
    //    console.log(resp);
    //   if(resp.status == 'succeeded'){
    //     this.idc = resp.id;
    //     setTimeout(()=>{
    //       this.datePayment = new Date();
    //       this.enabledButton = true;
    //       this.step = 3;
    //     },3000)
    //   }else{
    //     if(this.intents < 0){
    //       this.presentToast('Pagos bloqueados','danger');
    //       this.modalCtrl.dismiss();
    //     }

    //     this.pin = '';
    //     this.presentToast('Pin incorrecto, quedan '+this.intents+' intentos antes de bloquear','danger');
    //     this.intents -= 1;
    //     this.enabledButton = true;

    //   }
    // });


  }

  async presentToast(message,color,position) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position
    });
    toast.present();
  }



  next(){
    if(this.step == 1){
      this.checkPayments();
      // this.step = 2;
      this.setTotal();
    }

  }
  datePayment



  close(){
    this.onEvent('close','close');
    this.modalCtrl.dismiss();
  }

  setPin(digit){
    if(this.pin.length > 3){
      return;
    }
    this.pin += digit
  }

  deletedigit(){
    this.pin = this.pin.slice(0, -1)
    console.log(this.pin);
    if(this.pin.length != 0){
    }else{
      return;
    }
  }


  onEvent(type,name) {
    this.LogsActivity.logEvent(type,name);
  }

}
