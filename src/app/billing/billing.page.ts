import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Browser } from '@capacitor/browser';
import { ModalController, ToastController } from '@ionic/angular';

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
  constructor(private api:DataService,private toastController:ToastController,private modalCtrl:ModalController){

  }

  close(){
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    // 'acct_1NhHerBGXEEdgI6X'
    this.account = localStorage.getItem('account');
    if(this.account == null){

      this.api.getCompany(localStorage.getItem('id_company')).subscribe(data => {
        console.log(data)
        if(data[0].account){
         this.account = data[0].account;
        }else{
          this.presentToast('No tienes cuenta asociada para pagos, comunicate con nosotros','danger');
        }
      });
    }


    console.log(this.account);

    this.getAccountInfo();
    setTimeout(()=>{
      this.load = false;
    },1400);
  }

    // crear link
  createLink(){

    this.api.createLink({account: this.account,type:'account_onboarding'}).subscribe(data => {
      console.log(data);
      this.openBrowser(data.url);
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

 async openBrowser(url){
    await Browser.open({ url });
    Browser.addListener('browserFinished', () => {
      this.getAccountInfo();
    });

  }
  account_data:any = [];

  getAccountInfo(){
    this.api.getAccount({account: this.account}).subscribe(data => {
      this.account_data = data;
      if(data.details_submitted){
        this.needConfigurate = false;
      }else{
        this.needConfigurate = true;
      }
    });
  }

  isShowCards = false;
  showCards(){
    if(this.isShowCards){
      this.isShowCards = false;
    }else{
      this.getBankAccounts();
      this.isShowCards = true;
    }

  }

  firstShow = false;
  banks:any = [];

  getBankAccounts(){
    this.api.getBanks({account: this.account}).subscribe(data => {
      this.banks = data;
      console.log(data);
    });
  }

  updateDataGeneral(){
    this.openBrowser('https://dashboard.stripe.com/settings/account');
  }

  updateBank(){
    this.openBrowser('https://dashboard.stripe.com/settings/payouts');
  }



}
