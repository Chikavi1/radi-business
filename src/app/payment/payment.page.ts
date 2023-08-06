import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  amount;
  description;

  pin = '';
  step = 1;

  next(){
    this.step = 2;
  }

  process(){
    this.step = 3;
  }

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
