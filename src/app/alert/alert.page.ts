import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage implements OnInit{

  constructor(private api:DataService,private modalCtrl:ModalController){

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


    })
  }

  close(){
    this.modalCtrl.dismiss();
  }

}
