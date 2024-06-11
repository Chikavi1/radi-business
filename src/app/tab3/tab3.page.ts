import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';
import { UserPage } from '../user/user.page';
import { DataService } from '../services/data.service';
import { QrcodeappPage } from '../qrcodeapp/qrcodeapp.page';
import { AddClientPage } from '../add-client/add-client.page';
import { LogsActivityService } from '../services/logs-activity.service';

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
    private LogsActivity:LogsActivityService,
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

   ngOnInit() {
    this.LogsActivity.startLogging('Clients');
    }


    onEvent(type,name) {
      this.LogsActivity.logEvent(type,name);
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
       this.LogsActivity.logEvent('request','Listado de clientes');
    });
   }

  async addClient(){
    this.LogsActivity.logEvent('click','boton agregar clientes');

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
    this.removeLogging();
    return await modal.present();


  }

   back(){
    this.LogsActivity.logEvent('close','close');
    this.navCtrl.back();
   }



  async User(id){

    this.onEvent('click', 'Ver usuario | '+id);

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
    this.removeLogging();
    return await modal.present();
  }

  removeLogging() {
    this.LogsActivity.stopLogging();
  }



}
