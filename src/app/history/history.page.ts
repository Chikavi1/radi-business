import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { DataService } from '../services/data.service';
import { CreateAchivementPage } from '../create-achivement/create-achivement.page';
import { ReportPage } from '../report/report.page';
import { UserPage } from '../user/user.page';
import { PetPage } from '../pet/pet.page';
import { LogsActivityService } from '../services/logs-activity.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
id;
history:any = [];
hours;
edit = false;

description;
income;

  constructor(private api:DataService,
    private toastController:ToastController,
    private LogsActivity:LogsActivityService,
    private modalctrl:ModalController){
  }

  editing(){
    this.onEvent('click','Editar visita');
    this.edit = !this.edit;
  }



  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  async createReport(){
    this.onEvent('click','Crear reporte usuario');

    const modal = await this.modalctrl.create({
      component: ReportPage,
      breakpoints: [1],
      initialBreakpoint: 1,
      componentProps:{
        id: this.history.id,
        user_id: this.history.user_id,
        pet_id: this.history.pet_id
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        this.history.report_id = 1;
      }
    });
    return await modal.present();
  }
  async createAchivementModal(){
    this.onEvent('click','Crear reconocimiento mascota');

    console.log(this.history.user_id)
    const modal = await this.modalctrl.create({
      component: CreateAchivementPage,
      breakpoints: [1],
      initialBreakpoint: 1,
      componentProps:{
        id: this.history.id,
        pet_id: this.history.pet_id,
        user_id: this.history.user_id

      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        this.history.achivement_id = 1;
      }
    });
    return await modal.present();
  }

  update(){
    let data = {
      id: this.history.id,
      description: this.description,
      income: this.income
    }

    this.api.updateVisit(data).subscribe((data:any) => {
      console.log(data);
      if(data.status == 200){
        this.presentToast('Se ha actualizado correctamente.','success');
        this.onEvent('request','Actualiza visita');
        this.close();
      }
    },err=>{
      this.onEvent('error','Error al actualizar');
    });
  }

  close(){
    this.onEvent('close','close');
    this.modalctrl.dismiss();
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }

  async pet(id){
    const modal = await this.modalctrl.create({
      component: PetPage,
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

  seePet(id){
    this.onEvent('click','Ver perro |'+id);
    this.pet(id);
  }

  async User(id){
    const modal = await this.modalctrl.create({
      component: UserPage,
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

  seeUser(id){
    this.onEvent('click','Ver usuario |'+id);
    this.User(id);
  }

  ngOnInit() {
    this.LogsActivity.startLogging('Visit');
    this.api.getRecordsById(this.id).subscribe(data => {
      console.log(data);
      this.history = data[0];
      this.description = this.history.description;
      this.income = this.history.income;
      this.hours = moment().diff(moment(this.history.date), 'hours')
      this.onEvent('request','Información de la visita');
    },err=>{
      this.onEvent('error','error al obtener la visita | ');

    });

  }

  ngOnDestroy() {
    this.LogsActivity.stopLogging();
  }

  onEvent(type,name) {
    this.LogsActivity.logEvent(type,name);
  }
}
