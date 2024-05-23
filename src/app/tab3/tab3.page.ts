import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';
import { UserPage } from '../user/user.page';
import { DataService } from '../services/data.service';
import { QrcodeappPage } from '../qrcodeapp/qrcodeapp.page';
import { AddClientPage } from '../add-client/add-client.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  clients:any = [];
  device;
  loading = false;
  constructor(private api:DataService,
    private navCtrl:NavController,
    private modalCtrl:ModalController){
    this.device = localStorage.getItem('device');
    this.getInfo();
    setTimeout(() => {
      this.loading = true;
    },1200);
  }

  ionViewDidEnter(){
    if(localStorage.getItem('updateUsers')){
     this.getInfo();
     localStorage.removeItem('updateUsers');

    }
   }

   doRefresh(event) {
    this.getInfo();
    setTimeout(() => {
      event.target.complete();
    },2000);
  }

   getInfo(){
    this.api.getUsersByCompany(localStorage.getItem('id_company')).subscribe(data => {
      console.log(data);
       this.clients = data;
    });
   }

  async addClient(){
    const modal = await this.modalCtrl.create({
      component: AddClientPage,
      breakpoints: [1],
      initialBreakpoint: 1
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        if(localStorage.getItem('update_clients')){
          this.getInfo();
        }
      }
    });
    return await modal.present();


  }

   back(){
    this.navCtrl.back();
   }



  async User(id){
    const modal = await this.modalCtrl.create({
      component: UserPage,
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
