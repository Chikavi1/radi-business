import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateAdPage } from '../create-ad/create-ad.page';
import { DataService } from '../services/data.service';
import { AdPage } from '../ad/ad.page';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.page.html',
  styleUrls: ['./ads.page.scss'],
})
export class AdsPage implements OnInit {

  device;
  now: Date = new Date();

  ads:any = [];
  constructor(private modalCtrl:ModalController,private api:DataService) {
    this.device = localStorage.getItem('device');
    this.getAds()

   }


   getAds(){
    this.api.getAds(localStorage.getItem('id_company')).subscribe(data =>{
      console.log(data);
      this.ads = data.map(item => ({
        ...item,
        statusText: this.getStatus(item)
      }));
    });
   }

  ngOnInit() {
  }

  getStatus(item: any): string {
    if (item.status == 1 && new Date(item.finish_date) > this.now) {
      return 'Activo';
    } else {
      return 'Inactivo';
    }
  }

  async createAd(){
    const modal = await this.modalCtrl.create({
      component: CreateAdPage,
      breakpoints: [ 1],
      initialBreakpoint: 1,
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        this.getAds();
      }
    });
    return await modal.present();
  }


  async openAd(id){
      const modal = await this.modalCtrl.create({
        component: AdPage,
        breakpoints: [1],
        initialBreakpoint: 1,
        componentProps:{
          id: id,
        }
      });
      modal.onDidDismiss().then((data) => {
        if(data['data']){
          this.getAds();
        }
      });
      return await modal.present();
    }

}
