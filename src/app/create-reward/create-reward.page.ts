import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from '../services/data.service';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-reward',
  templateUrl: './create-reward.page.html',
  styleUrls: ['./create-reward.page.scss'],
})
export class CreateRewardPage implements OnInit {
  description;
  count = 10;
  finish_date;
  today;
  max;

  constructor(private api:DataService,
    private alertCtrl:AlertController,
    private toastController:ToastController,
    private loadingController:LoadingController,
    private modalCtrl:ModalController) {
    this.finish_date = moment().format();
    this.today = moment().format();
    this.max = moment().add(5,'years').format();
  }

  back(){
    this.modalCtrl.dismiss();
  }

  create(){
    this.presentLoading();
    let data = {
      id_business: localStorage.getItem('id_company'),
      description: this.description,
      count:       this.count,
      finish_date: this.finish_date,
    }

    console.log(data);

    this.api.createRewards(data).subscribe(data => {
      console.log(data);

      if(data.status == 200){
        this.loadingController.dismiss();
        this.presentToast('Recompensa creada, puede tardar unos segundo en verse reflejado','success');
        this.modalCtrl.dismiss(true);
      }
    })
  }

  deleteReward(){
    this.presentAlertskip();
  }

  async presentAlertskip() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar',
      message: '¿Seguro que quieres eliminarlo? Se recomienda avisar a tus clientes primero',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si, Eliminar',
          handler: () => {

            let data = {
              id: this.id,
              status: 0
            }
            this.api.updateRewards(data).subscribe(data => {
              console.log(data);
              this.presentToast('Se ha eliminado correctamente.','dark');
              this.modalCtrl.dismiss(true);
            });

          }
        }
      ]
    });

    await alert.present();
  }

  update(){
    this.presentLoading();

    let data = {
      id: this.id,
      description: this.description,
      count:       this.count,
      finish_date: this.finish_date,
    }

    this.api.updateRewards(data).subscribe(data => {
      if(data.status == 200){
        this.loadingController.dismiss();
        this.modalCtrl.dismiss(true);
        this.presentToast('Recompensa actualizada, puede tardar unos segundo en verse reflejado','success');
      }
    })
  }

  id;

  ngOnInit() {
    console.log(this.id);
  }


  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Espere un momento...',
      duration: 1200
    });
    loading.present();
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
