import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
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
  coupon;

  constructor(private modalCtrl: ModalController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private api:DataService

  ) {
    this.coupon = localStorage.getItem('name');
   }

  ngOnInit() {
  }

  back(){
    this.modalCtrl.dismiss();
  }

  setGender(g){
    this.gender = g;
  }

  pet_name;
  pet_gender;
  pet_specie;
  pet_size;

  birthday;
  pet_birthday;
  inserpassword = 1;
  password;

  setPetGender(g){
    this.pet_gender = g;
  }

  setSpecie(s){
    this.pet_specie = s;
  }

  setSize(s){
    this.pet_size = s;
  }

  setinserpassword(s){
    this.inserpassword = s;
  }

  buttondisabled = false;
  send(){
    this.buttondisabled = true;

    this.presentLoading();

    let data = {
      name:      this.name,
      email:     this.email,
      password: this.password,
      cellphone: this.cellphone,
      birthday: this.birthday,
      gender:    this.gender,
      country:   this.country,
      currency:  this.currency,
      coupon:    this.coupon,
      id_business: localStorage.getItem('id_company'),
      pet_name: this.pet_name,
      pet_description: 'Mascota generada por '+localStorage.getItem('name'),
      pet_gender: this.pet_gender,
      pet_specie: this.pet_specie,
      pet_birthday: this.pet_birthday,
      pet_size: this.pet_size,

    }

    console.log(data);

    this.api.createUser(data).subscribe(data => {
     if(data.status){
      this.presentToast('Usuario creado','success');
      localStorage.setItem('update_clients','true')
      this.modalCtrl.dismiss(true);
     }
    },err =>{
      this.buttondisabled = false;
    if(err.error.status == 401){
      this.presentToast('Usuario ya existe con ese correo','danger');
    }
    });
  }


  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Cargando información, un momento...',
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
