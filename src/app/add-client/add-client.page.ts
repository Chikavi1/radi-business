import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.page.html',
  styleUrls: ['./add-client.page.scss'],
})
export class AddClientPage implements OnInit {

  name;
  email;
  cellphone;
  country="Mexico"
  gender;
  currency='mxn'
  coupon='Dog Pawrk'

  constructor(private modalCtrl:ModalController,
    private toastController:ToastController,
    private api:DataService

  ) { }

  ngOnInit() {
  }

  back(){
    this.modalCtrl.dismiss();
  }

  setGender(g){
    this.gender = g;
  }

  send(){
    let data = {
      name:      this.name,
      email:     this.email,
      cellphone: this.cellphone,
      gender:    this.gender,
      country:   this.country,
      currency:  this.currency,
      coupon:    this.coupon
    }

    console.log(data);

    this.api.createUser(data).subscribe(data => {
     if(data.status){
      this.presentToast('Usuario creado','danger');
      this.name = '';
      this.email = '';
      this.cellphone = '';
      this.gender =  null;
     }
    },err =>{
    if(err.error.status == 401){
      this.presentToast('Usuario ya existe con ese correo','danger');
    }
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
