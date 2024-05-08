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
  constructor(private api:DataService,
    private navCtrl:NavController,
    private modalCtrl:ModalController){
    this.device = localStorage.getItem('device');
    this.getInfo();

  }

  ionViewDidEnter(){
    if(localStorage.getItem('updateUsers')){
     this.getInfo();
     localStorage.removeItem('updateUsers');

    }
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
        console.log('update Cliente')
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
      breakpoints: [.75,1],
      initialBreakpoint: .75,
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
