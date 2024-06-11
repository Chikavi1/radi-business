import { Component, OnInit } from '@angular/core';
import { Share } from '@capacitor/share';
import { ModalController } from '@ionic/angular';
import { LogsActivityService } from '../services/logs-activity.service';

@Component({
  selector: 'app-qrcodeapp',
  templateUrl: './qrcodeapp.page.html',
  styleUrls: ['./qrcodeapp.page.scss'],
})
export class QrcodeappPage implements OnInit {
  device;

  constructor(private modalCtrl:ModalController,
    private LogsActivity: LogsActivityService) {
    this.device = localStorage.getItem('device');

  }

  ngOnInit() {
    this.LogsActivity.startLogging('qrapp');

  }
  ngOnDestroy() {
    this.LogsActivity.stopLogging();
  }

  onEvent(type,name) {
    this.LogsActivity.logEvent(type,name);
  }


  close(){
    this.onEvent('close','close');
    this.modalCtrl.dismiss();

  }

  async share(){
    this.onEvent('click','compartio app');

    await Share.share({
      title: 'Descarga App',
      text: 'Descargar app Radi Running',
      url: 'https://www.radi.pet/running/',
      dialogTitle: 'Descarga App',
    });
  }

}
