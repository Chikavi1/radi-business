import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';
import { HistoryPage } from '../history/history.page';
import { DataService } from '../services/data.service';
import { QrcodeappPage } from '../qrcodeapp/qrcodeapp.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  records:any = [];
  device;
  loading = false;

  constructor(private api:DataService,private modalCtrl:ModalController){
    this.getInfo();
    setTimeout(() => {
      this.loading = true;
    },1200);
    this.device = localStorage.getItem('device');

  }

  ionViewDidEnter(){
  //  if(localStorage.getItem('updateVisits')){
  //   this.getInfo();
  //   localStorage.removeItem('updateVisits');
  //  }
  }

  getInfo(){
    this.api.getRecordsByCompany(localStorage.getItem('id_company')).subscribe(data => {
      this.records = data;
    });
  }

  doRefresh(event){
    this.getInfo();
    setTimeout(() => {
      event.target.complete();
    },2000);
  }


  async History(id){
    const modal = await this.modalCtrl.create({
      component: HistoryPage,
      breakpoints: [1],
      initialBreakpoint: 1,
      componentProps:{
        id: id,
      }
    });

    modal.onDidDismiss().then((data) => {
      if(data['data']){
        const info = data['data'];
        console.log(info);
      }
    });
    return await modal.present();
  }


}
