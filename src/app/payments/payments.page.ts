import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Browser } from '@capacitor/browser';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {

  constructor(private api:DataService,private modalCtrl:ModalController) { }
  payments:any = [];
  loading = false;

  ngOnInit() {
    let data = {
      account: localStorage.getItem('account')
    }
    this.api.getPaymentsByCompany(data).subscribe(data => {
      console.log(data);
      this.payments = data.data;
    });
    setTimeout(() => {
      this.loading = true;
    },1500);
  }

  seeReceipt(url){
    this.openBlank(url);
  }

  async openBlank(url){
    await Browser.open({ url });
  }

  close(){
    this.modalCtrl.dismiss();
  }

}
