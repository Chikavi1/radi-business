import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ModalController, NavController } from '@ionic/angular';
import { AlertPage } from '../alert/alert.page';
import { CreateAlertPage } from '../create-alert/create-alert.page';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
})
export class AlertsPage implements OnInit {

  alerts:any = [];
  constructor(private api:DataService,
    private navCtrl:NavController,
    private modalCtrl:ModalController){
      this.getAlerts();
   }
   loading = true;


   getAlerts(){
    this.api.getNotifications(localStorage.getItem('id_company')).subscribe(data => {
      this.alerts = data;
    });

    setTimeout(()=>{
      this.loading = false;
    },1200);

   }

   addAlert(){
    this.openAdds(CreateAlertPage,{});
  }

   openAlert(data){
    this.openAdds(AlertPage,data);
   }

   async openAdds(page,data){
    console.log(data);
    const modal = await this.modalCtrl.create({
      component: page,
      breakpoints: [1],
      componentProps: {
        "data":data
      },
      initialBreakpoint: 1
    });

    modal.onDidDismiss().then((data) => {
     if(data['data']){
      this.getAlerts();

    }
    });

    return await modal.present();
  }

  ngOnInit(){
  }

  close(){
    this.navCtrl.back();
  }
}
