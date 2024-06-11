import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { LogsActivityService } from '../services/logs-activity.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage implements OnInit{

  constructor(private api:DataService,
    private LogsActivity: LogsActivityService,
    private modalCtrl:ModalController){

   }

  sent;
  converted;
  remaining;

  data;

  isIos;
  isAndroid;

  android;
  ios;

  ngOnInit() {
    this.LogsActivity.startLogging('Alert');
    console.log(this.data);

    this.api.getNotificationOneSignal(this.data.id_push).subscribe(data => {
      console.log(data);
      this.sent = data.successful;
      this.converted = data.converted;
      this.remaining = data.remaining;
      this.isAndroid = data.isAndroid;
      this.isIos     = data.isIos;
      this.android   = data.platform_delivery_stats.android;
      this.ios   = data.platform_delivery_stats.ios;

      this.onEvent('request','obtiene info noti | '+this.data.id_push);

    },err=>{
      this.onEvent('error','Error en obtener info noti');
    })
  }

  close(){
    this.onEvent('close','close');

    this.modalCtrl.dismiss();
  }

  ngOnDestroy() {
    this.LogsActivity.stopLogging();
  }

  onEvent(type,name) {
    this.LogsActivity.logEvent(type,name);
  }

}
