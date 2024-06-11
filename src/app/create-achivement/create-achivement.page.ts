import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { LogsActivityService } from '../services/logs-activity.service';

@Component({
  selector: 'app-create-achivement',
  templateUrl: './create-achivement.page.html',
  styleUrls: ['./create-achivement.page.scss'],
})
export class CreateAchivementPage implements OnInit {

  selected;
  user_id;

  close(status){
    this.onEvent('close','close');
    this.modalCtrl.dismiss(status);
  }

  achivements:any = [];

  constructor(private api:DataService,
    private LogsActivity:LogsActivityService,
    private modalCtrl:ModalController){

   }

   id;
   pet_id;

   ngOnInit() {
    this.LogsActivity.startLogging('achiviments');
    this.api.getAchiviments(localStorage.getItem('type')).subscribe(data => {
      console.log(data);
      this.achivements = data;
      this.onEvent('request','Lista de reconocimientos');

    }, err => {
      this.onEvent('error','Error al obtener listado de reconocimientos');

    });

  }
  idSelected
  selectA(items){
    this.selected = items;
    this.idSelected = this.selected.id
  }

  btnDisabled = false;


  create(){
    this.btnDisabled = true;

    let data = {
      id_pet: this.pet_id,
      id_business: localStorage.getItem('id_company'),
      id_visit: this.id,
      id_user: this.user_id,
      business_name: localStorage.getItem('name'),
      id_achivement: this.idSelected,
      status: 1,
      date: new Date()
    }
    this.api.createAchivement(data).subscribe(result => {
      console.log(result);
      this.onEvent('request','se creo reconocimiento');
      this.close(true);
    },error=>{
      this.onEvent('error','No se pudo crear reconocimiento');

    });
  }



  ngOnDestroy() {
    this.LogsActivity.stopLogging();
  }

  onEvent(type,name) {
    this.LogsActivity.logEvent(type,name);
  }

}
