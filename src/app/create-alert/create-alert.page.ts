import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';

declare var require: any;
const Hashids = require('hashids/cjs');
const hashids = new Hashids('Elradipet10Lt', 6,'ABCEIU1234567890');

@Component({
  selector: 'app-create-alert',
  templateUrl: './create-alert.page.html',
  styleUrls: ['./create-alert.page.scss'],
})
export class CreateAlertPage implements OnInit {
  type = 1;
  people = 2;
  step = 1;

  title;
  text;

  titlerecommed = 40
  textrecommend = 80;
  sendnoti;

  userCategory = 1;

  constructor(private modalCtrl: ModalController,
    private toastController:ToastController,
    private loadingController: LoadingController,
    private api: DataService){
    this.sendnoti  = {
      path: '../../../assets/lotties/send-notification.json',
      autoplay: true,
      loop: false
    }
  }
  selectedId;

  select(id,title){
    this.selectedId = id;
    this.generateImage(title)
  }

  generateImage(title){
    let name = localStorage.getItem('name');
    let date = "25 de mayo a las 8:00 PM";

    if(this.type == 2){
      this.title = "Evento de "+ name+" ";
      this.text  = title+": el "+date+ ""
    }else if(this.type == 3){
      this.title = "Descuento por parte de "+name;
    }else if(this.type == 4){
      this.title = "Ayudanos a mejorar en "+name,
      this.text = "Tu opinión cuenta para mejorar el parque";
    }
  }

  items:any = [];

  getEvents(){
    this.api.getEventsByBusiness(localStorage.getItem('id_company')).subscribe(data => {
      console.log(data);
      this.items = data;
    });
  }

  getDiscounts(){
    this.api.discounts(localStorage.getItem('id_company')).subscribe(data => {
      this.items = data;
    });
  }

  getUsersFilter(){

    let data = {
      "userCategory":this.userCategory,
      "userGender":this.userGender,
      "userAge":this.userAge,
      "petGender":this.petGender,
      "petAge":this.petAge,
      "petSpecie":this.petSpecie,
      "id_business": localStorage.getItem('id_company')
    }


    this.api.getUsersFilter(data).subscribe(data => {
      this.external_user_id = data;
      console.log(this.external_user_id);
    });

  }

  userSelectName;
  userId;

  selectUser(){
  this.userId = 1;
  this.userSelectName = "erik gzl"
  }

  setUserCategory(c){
    this.userCategory = c;
  }

  userGender = 0;
  setUserGender(g){
    this.userGender = g;
  }

  userAge = 0;
  setUserAge(a){
    this.userAge = a;
  }

  petGender = 0;
  setPetGender(g){
    this.petGender = g;
  }

  petAge = 0;
  setPetAge(a){
    this.petAge = a;
  }

  petSpecie = 0;
  setPetSpecie(s){
    this.petSpecie = s;
  }

  setType(t){
    this.type = t;
  }

  setPeople(p){
    this.people = p;
  }

  ngOnInit() {
  }

  exit(t?){
    this.modalCtrl.dismiss(t);
  }

  back(){
    this.step = 1;
  }

  next(){

    if(this.people == 1){
      this.generateHash();
    }


    if(this.people == 2){
      this.getUsersFilter();
    }

    this.step = 2;
    if(this.type == 2){
      this.getEvents()
    }else if(this.type == 3){
      this.getDiscounts()
    }

    console.log(this.external_user_id);

  }

  generateHash(){
    const listuser = [this.userId];
    const array = []
    listuser.forEach(item => {
      array.push(hashids.encode(item));
    });
    this.external_user_id = array;
  }

  external_user_id = [];

  send(){
    this.presentLoading();


    let data =
    {
      id_business: localStorage.getItem('id_company'),
      type: this.type,
      channel: this.people,
      title: this.title,
      id: this.selectedId,
      text: this.text,
      external_user_id: this.external_user_id
    }

    console.log(data);
        this.step = 3;

    // this.api.createNotification(data).subscribe(data => {
    //   this.loadingController.dismiss();
    //   if(data.status== 200){
    //     this.step = 3;
    //   }else{
    //     this.presentToast('Hubo un error, intenta despues','danger');
    //   }
    //   console.log(data);
    // },err => {
    //   this.presentToast('Hubo un error, intenta despues','danger');
    //   console.log(err);
    // });
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Creando notificación',
      duration: 1200
    });
    loading.present();
  }
}
