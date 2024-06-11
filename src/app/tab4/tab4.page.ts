import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';
import { PromotionPage } from '../promotion/promotion.page';
import { DataService } from '../services/data.service';
import { QrcodeappPage } from '../qrcodeapp/qrcodeapp.page';
import { CreatePromotionPage } from '../create-promotion/create-promotion.page';
import { LogsActivityService } from '../services/logs-activity.service';

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
    private LogsActivity: LogsActivityService,
    private modalCtrl:ModalController){
    this.device = localStorage.getItem('device');
    this.getData()
  }

  getData(){
    this.api.discounts(localStorage.getItem('id_company')).subscribe(data => {
      this.discounts = data;
      console.log(this.discounts);
      this.onEvent('request','listado de promociones')
    },err=>{
      this.onEvent('error','error en listado de promociones')
    });
  }

  back(){
    this.navCtrl.back();
   }

 async createPromotion(){
  this.onEvent('click','crear promocion')
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
    this.removeLogging()
    return await modal.present();
  }

  doRefresh(event) {
    this.onEvent('refresher','se refresco la pagina')

    this.getData();

    setTimeout(() => {
      event.target.complete();
    },2000);
  }

  async promotion(id){
    this.onEvent('click','Ver promoción | '+id);
    const modal = await this.modalCtrl.create({
      component: PromotionPage,
      breakpoints: [1],
      initialBreakpoint: 1,
      componentProps:{
        id: id,
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        this.getData()

      }
    });
    this.removeLogging();
    return await modal.present();
  }

    ngOnInit() {
    this.LogsActivity.startLogging('Promotions');
    }

    removeLogging(){
      this.LogsActivity.stopLogging();
    }

    onEvent(type,name) {
      this.LogsActivity.logEvent(type,name);
    }
}
