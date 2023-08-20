import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  success;
  enabledButton = true;
  paymentsEnabled = true;
  constructor(private loadingCtrl: LoadingController,private modalCtrl:ModalController) {
    this.success  = {
      path: '../../../assets/lotties/success.json',
      autoplay: true,
      loop: true
    }

   }

  ngOnInit() {
    // checar si tiene habilitado / y si tiene tarjeta

  }

  amount = 35;
  description = 'Compra en Radi Pets';
  total;

  setTotal(){
    this.total = this.amount+(this.amount*0.032);
    console.log(this.total);
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Procesando Pago ...',
      duration: 3000,
    });

    loading.present();
    this.enabledButton = false;
    // checa nip, se hace pago y envia notificación

    setTimeout(()=>{
      this.datePayment = new Date();
      this.step = 3;
      this.enabledButton = true;
    },3000)

  }

  pin = '';
  step = 1;

  next(){
    this.step = 2;
    this.setTotal();
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
