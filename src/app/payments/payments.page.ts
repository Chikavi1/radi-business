import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Browser } from '@capacitor/browser';
import { ModalController } from '@ionic/angular';
import { LogsActivityService } from '../services/logs-activity.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {

  constructor(private api:DataService,
    private LogsActivity: LogsActivityService,
    private modalCtrl:ModalController) { }
  payments:any = [];
  loading = false;

  ngOnInit() {
    this.LogsActivity.startLogging('Payments');

    let data = {
      account: localStorage.getItem('account')
    }
    this.api.getPaymentsByCompany(data).subscribe(data => {
      console.log(data);
      this.payments = data.data;
      this.onEvent('request','Lista de pagos');
    });
    setTimeout(() => {
      this.loading = true;
    },1500);
  }

  seeReceipt(url){
    this.onEvent('click','ver recibo');

    this.openBlank(url);
  }

  async openBlank(url){
    await Browser.open({ url });
  }

  close(){
    this.onEvent('close','close');

    this.modalCtrl.dismiss();
  }


    ngOnDestroy() {
      this.LogsActivity.stopLogging();
    }

    onEvent(type,name) {
      this.LogsActivity.logEvent(type,name);
    }
}
