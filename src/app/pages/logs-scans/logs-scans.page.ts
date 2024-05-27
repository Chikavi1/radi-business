import { Component, OnInit } from '@angular/core';
import { BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { CreateRewardPage } from 'src/app/create-reward/create-reward.page';
import { DataService } from 'src/app/services/data.service';


declare var require: any;
const Hashids = require('hashids/cjs');
const hashids = new Hashids('Elradipet10Lt', 6,'ABCEIU1234567890');

@Component({
  selector: 'app-logs-scans',
  templateUrl: './logs-scans.page.html',
  styleUrls: ['./logs-scans.page.scss'],
})
export class LogsScansPage implements OnInit {


rewards:any=[];

createModal(){
  this.openAdds(CreateRewardPage)
}

close(){
  this.navCtrl.back();
}

back(){
  this.step = 1;
  this.successful = null;
}

async openAdds(page){
  const modal = await this.modalCtrl.create({
    component: page,
    breakpoints: [1],
    initialBreakpoint: 1
  });
  modal.onDidDismiss().then((data) => {
   if(data['data']){
    this.getRewards();
    }
  });
  return await modal.present();
}
description;
finish;

loading = true;

edit(item){
this.editModal(CreateRewardPage,item);
}

async editModal(page,data){
  console.log(data);
  const modal = await this.modalCtrl.create({
    component: page,
    breakpoints: [1],
    initialBreakpoint: 1,
    componentProps:{
      id: data.id,
      description: data.description,
      count: data.count,
      finish_date: data.finish_date
    },
  });
  modal.onDidDismiss().then((data) => {
   if(data['data']){
    console.log('se actualiza coño')
    this.getRewards();
    }
  });
  return await modal.present();
}

count = 0;
limit = 10;
device;
logo;

getRewards(){
  this.api.getRewards(localStorage.getItem('id_company')).subscribe(data => {
    console.log(data);
    this.rewards = data;
  });
}

  constructor(private api:DataService,
    private toastController:ToastController,
    private navCtrl:NavController,
    private platform:Platform,
    private modalCtrl:ModalController) {
    this.device = localStorage.getItem('device');
    this.logo = localStorage.getItem('image');
    this.getRewards();

  }
  step = 1;

  showUser(){
    this.step = 2;
  }


  ngOnInit() {
  }

  // scan(){

    // let scanData = {
    //   code: '214024',
    //   user_id: 1,
    //   pet_id: 2
    // }

    // let data = {
    //   code: scanData.code,
    //   date: Date.now(),
    //   user_id: scanData.user_id,
    //   pet_id: scanData.pet_id,
    //   rewards_id: id
    // }

    // this.api.createRewardsLogs(data).subscribe(data=>{
    //   console.log(data);

    // });

  // }


  async scan(c,id){

    if(this.platform.is('android')){
      await BarcodeScanner.requestPermissions();
      const data = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
      if (data.available) {
        const code = await this.startScanner();
        this.handlerScanner(code[0].displayValue,c,id);
      } else {
        try {
          await BarcodeScanner.installGoogleBarcodeScannerModule();
          const code = await this.startScanner();
          this.handlerScanner(code[0].displayValue,c,id);
        } catch (e) {
        }
      }
    }else{
      await BarcodeScanner.requestPermissions();
      const code = await this.startScanner();
      this.handlerScanner(code[0].displayValue,c,id);
    }
  }

  user_id;
  isreset = false;

  updateReward(){
    this.isreset = true;

    let data = {
      user_id: this.user_id,
      limit: this.limit
    }
    this.api.resetRewardLogs(data).subscribe(data => {
      if(data.status == 200 ){
        this.count = this.count-this.limit;
        this.presentToast('¡Se canjeo recompensa!','success','top')
      }
    },err=> {
      this.isreset = false;
    });
  }

  async presentToast(message,color,p) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: p
    });
    toast.present();
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

  successful;

  handlerScanner(d,c,id){
    console.log(d,c,id);

      this.limit = c;
      let code = d.split('https://radi.pet/pets/')
      this.showUser()
      let data = {
        code: code[1],
        rewards_id:  id
      }
      this.api.createRewardLog(data).subscribe(data => {
        console.log(data);
        this.count = data.count;
        this.user_id = data.user_id;
        this.successful = true;

        setTimeout(()=>{
          this.loading = false;
        },1200);

      },err => {
        this.successful = false;
      });
  }

  getPorcentaje(recaudado,limite): number {
    return  (recaudado % limite) / limite * 100;
  }
}
