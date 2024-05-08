import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';
import { PromotionPage } from '../promotion/promotion.page';
import { DataService } from '../services/data.service';
import { QrcodeappPage } from '../qrcodeapp/qrcodeapp.page';
import { CreatePromotionPage } from '../create-promotion/create-promotion.page';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  discounts:any = [];
  device;

  constructor(private api:DataService,
    private navCtrl:NavController,
    private modalCtrl:ModalController){
    this.device = localStorage.getItem('device');
    this.getData()
  }

  getData(){
    this.api.discounts(localStorage.getItem('id_company')).subscribe(data => {
      this.discounts = data;
    });
  }

  back(){
    this.navCtrl.back();
   }

 async createPromotion(){
    const modal = await this.modalCtrl.create({
      component: CreatePromotionPage,
      breakpoints: [ 1],
      initialBreakpoint: 1,
        });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        this.getData();

      }
    });
    return await modal.present();
  }

  doRefresh(event) {
    this.getData();

    setTimeout(() => {
      event.target.complete();
    },2000);
  }

  async promotion(id){
    const modal = await this.modalCtrl.create({
      component: PromotionPage,
      breakpoints: [.75,1],
      initialBreakpoint: .75,
      componentProps:{
        id: id,
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        this.getData()

      }
    });
    return await modal.present();
  }
}
