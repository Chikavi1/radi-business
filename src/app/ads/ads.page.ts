import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateAdPage } from '../create-ad/create-ad.page';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.page.html',
  styleUrls: ['./ads.page.scss'],
})
export class AdsPage implements OnInit {

  device;
  constructor(private modalCtrl:ModalController) {
    this.device = localStorage.getItem('device');

   }

  ngOnInit() {
  }


  async createAd(){
    const modal = await this.modalCtrl.create({
      component: CreateAdPage,
      breakpoints: [ 1],
      initialBreakpoint: 1,
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
      }
    });
    return await modal.present();
  }


  async openAd(id){
      const modal = await this.modalCtrl.create({
        component: AdsPage,
        breakpoints: [ 1],
        initialBreakpoint: 1,
        componentProps:{
          id: id,
        }
      });
      modal.onDidDismiss().then((data) => {
        if(data['data']){
        }
      });
      return await modal.present();
    }

}
