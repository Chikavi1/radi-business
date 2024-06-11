import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LogsActivityService } from 'src/app/services/logs-activity.service';

@Component({
  selector: 'app-configuration-app',
  templateUrl: './configuration-app.page.html',
  styleUrls: ['./configuration-app.page.scss'],
})
export class ConfigurationAppPage implements OnInit {


  autoVisit;
  constructor(private LogsActivity:LogsActivityService,private modalCtrl:ModalController) {
    this.autoVisit = localStorage.getItem('automatic_visits');

  }

  ngOnInit(){
    this.LogsActivity.startLogging('configuration-app');
    // localStorage.setItem('automatic_visit','true');
    // localStorage.removeItem('automatic_visit')
  }

  toggleVisits(event: any) {
    const isChecked = event.detail.checked;

    if (isChecked) {
      localStorage.setItem('automatic_visits', 'true');
      console.log('automatic_visits almacenado en localStorage');
    } else {
      localStorage.removeItem('automatic_visits');
      console.log('automatic_visits eliminado de localStorage');
    }
  }


  close(){
    this.modalCtrl.dismiss();
  }
}
