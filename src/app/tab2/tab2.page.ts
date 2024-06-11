import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';
import { HistoryPage } from '../history/history.page';
import { DataService } from '../services/data.service';
import { QrcodeappPage } from '../qrcodeapp/qrcodeapp.page';
import { LogsActivityService } from '../services/logs-activity.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  records:any = [];
  device;
  loading = false;

  constructor(private api:DataService,
    private LogsActivity:LogsActivityService,
    private modalCtrl:ModalController){


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
      this.onEvent('request','Listado de visitas');
    },err=> {
      this.onEvent('error','Error en ver listado de visitas');
    });
  }

  doRefresh(event){
    this.getInfo();
    setTimeout(() => {
      event.target.complete();
    },2000);
  }


  async History(id){
    this.onEvent('click','ver visita | '+id);

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

    ngOnInit() {
      this.LogsActivity.startLogging('Visits');

      this.getInfo();
      setTimeout(() => {
        this.loading = true;
      },1200);
      this.device = localStorage.getItem('device');
    }

    ngOnDestroy() {
      this.LogsActivity.stopLogging();
    }

    onEvent(type,name) {
      this.LogsActivity.logEvent(type,name);
    }


}
