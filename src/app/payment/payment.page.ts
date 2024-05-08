import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

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

 amount = 35;
 serviceUser =  ((2.85*this.amount)/100)+1.75; // 2.74
 serviceBusiness = ((3.35*this.amount)/100)+1.75; // 2.92
 total =  this.amount+this.serviceUser; // 37.74
 radiPets = this.serviceUser+this.serviceBusiness; // 5.67
 stripeCost =  ((3.60*this.amount)/100)+3; // 4.26
 business = this.amount-this.serviceBusiness; // 32.07
 totalRadiPets = this.radiPets-this.stripeCost; // 1.41

 constructor(
   private api:DataService,
    private toastController:ToastController,
    private platform:Platform,
    private loadingCtrl: LoadingController,
    private modalCtrl:ModalController) {
      console.log(this.serviceUser,this.serviceBusiness,this.total,this.radiPets)
      this.success  = {
        path: '../../../assets/lotties/success.json',
        autoplay: true,
        loop: true
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

  }

  handlerScanner(d){
    let hash;
      if(d.includes('https://radi.pet/pets/')){
        hash = d.split('pet/pets/');
      }

    this.api.checkUserPay({code: hash[1]}).subscribe(data => {
      this.messageStatus = data.result;
      this.customer = data.id;

      if(data.result == 'success'){
        this.paymentsEnabled = true;
        this.step == 2;
      }else{
        this.paymentsEnabled = false;
        this.presentToast('No tiene habilitado los pagos con la placa','danger');
      }
    },err=>{
      this.presentToast('No tiene habilitado los pagos con la placa','danger');
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

  description = 'Compra en Radi Pets';

  setTotal(){
    this.serviceUser =  ((2.85*this.amount)/100)+1.75; // 2.74
    this.serviceBusiness = ((3.35*this.amount)/100)+1.75; // 2.92
    this.total =  this.amount+this.serviceUser; // 37.74
    this.radiPets = this.serviceUser+this.serviceBusiness; // 5.67
    this.stripeCost =  ((3.60*this.amount)/100)+3; // 4.26
    this.business = this.amount-this.serviceBusiness; // 32.07
    this.totalRadiPets = this.radiPets-this.stripeCost; // 1.41
  }

  intents = 3;
  idc;

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Procesando Pago ...',
      duration: 3000,
    });

    loading.present();
    this.enabledButton = false;
    // checa nip, se hace pago y envia notificación

    let data = {
      customer: this.customer,
      account: localStorage.getItem('account'),
      pin: this.pin,
      description: this.description,
      serviceUser :this.serviceUser,
      serviceBusiness:this.serviceBusiness,
      total: this.total,
      radiPets:this.radiPets,
      stripeCost:this.stripeCost,
      business:this.business
    }
    this.api.pay(data).subscribe(resp => {
       console.log(resp);
      if(resp.status == 'succeeded'){
        this.idc = resp.id;
        setTimeout(()=>{
          this.datePayment = new Date();
          this.enabledButton = true;
          this.step = 3;
        },3000)
      }else{
        if(this.intents < 0){
          this.presentToast('Pagos bloqueados','danger');
          this.modalCtrl.dismiss();
        }

        this.pin = '';
        this.presentToast('Pin incorrecto, quedan '+this.intents+' intentos antes de bloquear','danger');
        this.intents -= 1;
        this.enabledButton = true;

      }
    });


  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
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

}
