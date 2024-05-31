import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.page.html',
  styleUrls: ['./vaccine.page.scss'],
})
export class VaccinePage implements OnInit {

  name;
  type;
  id_pet;
  date;

  specie;

  other_name = '';
  today;
  yearLimitIonDateTime;
  device;

  constructor(private modalCtrl:ModalController,
    private api:DataService,
    private toastController:ToastController){

      this.device = localStorage.getItem('device');
      this.today =  moment().format('yyyy-MM-DD');
      this.yearLimitIonDateTime = moment().subtract(17,'years').format('yyyy-MM-DD');

    }


  ngOnInit() {
    console.log(this.id_pet);

    if(this.type == 'deworming'){
      this.name = 'desparasitación'
    }
  }

  setName(n){
    this.name = n;
  }



  add(){
    let data = {
      "name": this.name!='other'?this.name:this.other_name,
      "type": (this.type === 'vaccine')?1:2,
      "id_pet": this.id_pet,
      "status": 2,
      "date": this.date,
      "id_visit": 0
    }

    this.api.createVaccine(data).subscribe((data:any) => {
      if(data.status == 200){
        this.presentToast('Se ha guardado exitosamente.','success');
      }
      this.back(1);
    });


  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }

  back(flag){
    this.modalCtrl.dismiss(flag);
 }
}
