import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ModalController, NavController } from '@ionic/angular';
import { AlertPage } from '../alert/alert.page';
import { CreateAlertPage } from '../create-alert/create-alert.page';
import { LogsActivityService } from '../services/logs-activity.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
})
export class AlertsPage implements OnInit {

  alerts:any = [];
  constructor(private api:DataService,
    private LogsActivity: LogsActivityService,
    private navCtrl:NavController,
    private modalCtrl:ModalController){
   }
   loading = true;


   getAlerts(){
     this.api.getNotifications(localStorage.getItem('id_company')).subscribe(data => {
       this.alerts = data;
       this.onEvent('request','Lista de notificaciones');
    },err=>{
      this.onEvent('error','Error al tener Lista de notificaciones');

    });


    setTimeout(()=>{
      this.loading = false;
    },1200);

   }

   addAlert(){
     this.onEvent('click','Agregar alerta');
    this.openAdds(CreateAlertPage,{});
  }

   openAlert(data){
    this.openAdds(AlertPage,data);
   }

   async openAdds(page,data){
    this.onEvent('click','Ver alerta');

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


  ngOnInit() {
    this.LogsActivity.startLogging('Alerts');
    this.getAlerts();
    }

    ngOnDestroy() {
      this.LogsActivity.stopLogging();
    }

    onEvent(type,name) {
      this.LogsActivity.logEvent(type,name);
    }

  close(){
    this.onEvent('close','close');
    this.navCtrl.back();
  }


}
