import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { LogsActivityService } from '../services/logs-activity.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  constructor(private api:DataService,
    private LogsActivity:LogsActivityService,
    private loadingController:LoadingController,
    private modalCtrl:ModalController) { }

  description;


  pet_id;
  user_id
  id;

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Agregando reporte, un momento...',
      duration: 1200
    });
    loading.present();
  }


  buttondisabled = false;
  send(){
    this.buttondisabled = true;

    this.presentLoading();
    let data = {
      id_visit: this.id,
      id_pet: this.pet_id,
      id_user: this.user_id,
      id_business: localStorage.getItem('id_company'),
      description: this.description,
      status: 1
    }

    console.log(data);

    this.api.createReport(data).subscribe(data => {
      console.log(data);
      this.onEvent('request','crea reporte | '+this.user_id);
      this.modalCtrl.dismiss(1);
    },err=>{
      this.onEvent('error','error al crear reporte');

    });
  }

  close(){
    this.onEvent('close','close');
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    this.LogsActivity.startLogging('Report');
  }


  ngOnDestroy() {
    this.LogsActivity.stopLogging();
  }

  onEvent(type,name) {
    this.LogsActivity.logEvent(type,name);
  }

}
