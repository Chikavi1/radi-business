import { Component, OnInit } from '@angular/core';
import { BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ModalController, NavController, Platform } from '@ionic/angular';
import * as moment from 'moment';
import { CreateRewardPage } from 'src/app/create-reward/create-reward.page';
import { DataService } from 'src/app/services/data.service';

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

back(){
  this.navCtrl.back();
}

async openAdds(page){
  const modal = await this.modalCtrl.create({
    component: page,
    breakpoints: [1],
    initialBreakpoint: 1
  });
  modal.onDidDismiss().then((data) => {
   if(data['data']){
    }
  });
  return await modal.present();
}
description;
count;
finish

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
    }
  });
  return await modal.present();
}

  constructor(private api:DataService,
    private navCtrl:NavController,
    private platform:Platform,
    private modalCtrl:ModalController) {

    this.api.getRewards(localStorage.getItem('id_company')).subscribe(data => {
      console.log(data);
      this.rewards = data;
    });
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


  async scan(){
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

  handlerScanner(d){
      let code = d.split('https://radi.pet/pets/')
      alert(code);

      // let data = {
      //   id: hashids.decode(this.id)[0],
      //   code: code[1]
      // }


  }
}
