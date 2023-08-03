import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';
import { UserPage } from '../user/user.page';
import { DataService } from '../services/data.service';
import { QrcodeappPage } from '../qrcodeapp/qrcodeapp.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  clients:any = [];
  device;
  constructor(private api:DataService, private modalCtrl:ModalController){
    this.device = localStorage.getItem('device');

    this.api.getUsersByCompany(localStorage.getItem('id_company')).subscribe(data => {
      console.log(data);
       this.clients = data;

    });
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
