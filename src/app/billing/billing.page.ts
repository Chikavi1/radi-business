import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Browser } from '@capacitor/browser';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.page.html',
  styleUrls: ['./billing.page.scss'],
})
export class BillingPage implements OnInit {
  needConfigurate = true;
  account;
  external_accounts:any = [];
  movements:any  = [];
  percent1 = 95;
  percent2 = 5;
  load = true;
  constructor(private api:DataService,private modalCtrl:ModalController){

  }

  close(){
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    this.account = localStorage.getItem('account');
    // get info account
    this.getAccountInfo();
    setTimeout(()=>{
      this.load = false;
    },1400);
  }

    // crear link
  createLink(){

    this.api.createLink({account: this.account}).subscribe(data => {
      console.log(data);
      this.openBrowser(data.url);
    });

  }

  // abrir link
 async openBrowser(url){
    await Browser.open({ url });
    Browser.addListener('browserFinished', () => {
      this.getAccountInfo();
    });

  }

  // obtener informacion
  getAccountInfo(){
    this.api.getAccount({account: this.account}).subscribe(data => {
      // console.log(data.external_accounts.data);
      this.external_accounts = data.external_accounts.data[0];
      if(!data.charges_enabled){
        this.needConfigurate = true;
      }else{
        this.needConfigurate = false;
        this.getMovements();
      }
    });
  }

  // obtener movimientos
  getMovements(){
    this.api.getMovements({account: this.account}).subscribe(data => {
      this.movements = data.data;
      console.log(this.movements);
    });
  }

}
