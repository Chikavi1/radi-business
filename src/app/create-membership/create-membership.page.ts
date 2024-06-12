import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { SelectUserPage } from '../pages/select-user/select-user.page';
import * as moment from 'moment';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-create-membership',
  templateUrl: './create-membership.page.html',
  styleUrls: ['./create-membership.page.scss'],
})
export class CreateMembershipPage implements OnInit {

  user_name;

  user_id;
  start;
  description;
  period = 31;

  today;
  status;

  constructor(private modalCtrl:ModalController,
    private toastController:ToastController,
    private loadingController:LoadingController,
    private api:DataService) {
    this.today = moment().format('YYYY-MM-DD');
  }

  id;
  id_user;

  ngOnInit() {
    console.log(this.id);
    console.log(this.status);
    console.log(this.id_user)
  }


  async selectUser(){
    const modal = await this.modalCtrl.create({
      component: SelectUserPage,
      breakpoints: [ 1],
      initialBreakpoint: 1,
      backdropDismiss:true,
      canDismiss:true,
      // componentProps: data
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        console.log(data);
        this.user_id = data.data.id;
        this.user_name = data.data.name;
      }
    });
    return await modal.present();
  }


  close(){
    this.modalCtrl.dismiss();
  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Cargando información, un momento...',
      duration: 1200
    });
    loading.present();
  }

  buttonDisabled = false;

  create(){
    this.presentLoading();
    this.buttonDisabled = true;
    let data = {
      "id_user": this.user_id,
      "id_pawrtner": localStorage.getItem('id_company'),
      "start": this.start,
      "description": this.description,
      "period": this.period
    }

    this.api.createMembership(data).subscribe(data => {
      console.log(data);

      if(data.status == 200){
        this.loadingController.dismiss();
        this.presentToast('Se ha creado la membresia','success');
        this.modalCtrl.dismiss(true);
      }

    },err => {
      this.buttonDisabled = false;

    });
  }

  update(){
    this.presentLoading();
    this.buttonDisabled = true;

    let data = {
      "id": this.id,
      "id_user" : this.id_user,
      "id_pawrtner" :  localStorage.getItem('id_company'),
      "start" : this.start,
      "description" : this.description,
      "period" : this.period,
      "status": this.status
    }

    this.api.updateMembership(data).subscribe(data => {
      console.log(data);

      if(data.status == 200){
        this.loadingController.dismiss();
        this.presentToast('Se ha actualizado la membresia','success');
        this.modalCtrl.dismiss(true);
      }

    },err => {
      this.buttonDisabled = false;

    });
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }


}
