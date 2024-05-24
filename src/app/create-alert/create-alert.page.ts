import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import * as moment from 'moment';
import { SelectUserPage } from '../pages/select-user/select-user.page';
import { EventPage } from '../event/event.page';
import { CreateEventPage } from '../create-event/create-event.page';
import { CreatePromotionPage } from '../create-promotion/create-promotion.page';

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
  eventsAvailable = false;

  constructor(private modalCtrl: ModalController,
    private toastController:ToastController,
    private loadingController: LoadingController,
    private api: DataService){
      moment.locale('es');

      const grantedPermissions = JSON.parse(localStorage.getItem('granted') || '[]');
      if (grantedPermissions.includes('events')) {
        this.eventsAvailable = true;
      }

    this.sendnoti  = {
      path: '../../../assets/lotties/send-notification.json',
      autoplay: true,
      loop: false
    }
  }
  selectedId;

  async userSelectModal(){
    const modal = await this.modalCtrl.create({
      component: SelectUserPage,
      breakpoints: [1],
      initialBreakpoint: 1,
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        console.log(data);
        this.userId = data.data.id;
        this.userSelectName = data.data.name;
      }
    });
    return await modal.present();
  }

  select(item){

    this.selectedId = item.id;
    if(this.type == 2){
      this.generateTextNotiEvent(item.title,item.date)
    }else if(this.type == 3){
      this.generateTextoNotiDiscount(item.title,item.text)
    }
  }

  capitalizeFirstLetter(string) {
    if (!string) return ''; // Manejar el caso de una cadena vacía o indefinida
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


  generateTextNotiEvent(title,date){
    let name = localStorage.getItem('name');
    let fechaMoment = moment(moment(date), "DD/MM/YYYY HH:mm");
    let fechaFormateada = fechaMoment.format('dddd D [de] MMMM [del] YYYY [a las] h:mm A');

    this.title = "Evento de "+ name+" ";
    this.text  = this.capitalizeFirstLetter(title)+": "+this.capitalizeFirstLetter(fechaFormateada)
  }

  generateTextoNotiDiscount(title,text){
    let name = localStorage.getItem('name');
    this.title = name+": "+title;
    this.text = this.capitalizeFirstLetter(text);
  }

  items:any = [];

  getEvents(){
    console.log('obtengo eventos')
    this.items = [];
    this.api.discountsEvents(localStorage.getItem('id_company')).subscribe((data:any) => {
      console.log(data);
      data.forEach(item => {
        this.items.push({ "title": item.name,"id": item.id,"date": item.start_date });
      });
    });

    console.log(this.items);
  }

  getDiscounts(){
    console.log('obtengo descuentos')

    this.items = [];
    this.api.discountsAlerts(localStorage.getItem('id_company')).subscribe((data:any) => {
      console.log(data);
      data.forEach(item => {
        this.items.push({ "title": item.title,id: item.id,"text":item.description  });
      });
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

    if(this.type == 2){
      this.getEvents()
    }else if(this.type == 3){
      this.getDiscounts()
    }

    if(this.people == 1){
      this.generateHash();
    }


    if(this.people == 2){
      this.getUsersFilter();
    }

    this.selectedId = 0;
    this.step = 2;

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
    this.api.createNotification(data).subscribe(data => {
      this.loadingController.dismiss();
      if(data.status== 200){
        this.step = 3;
      }else{
        this.presentToast('Hubo un error, intenta despues','danger');
      }
      console.log(data);
    },err => {
      this.presentToast('Hubo un error, intenta despues','danger');
      console.log(err);
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

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Creando notificación',
      duration: 1200
    });
    loading.present();
  }


  async add(type){
    let typeComponent;
    if(type == 2){
      typeComponent = CreateEventPage
    }else if(type==3){
      typeComponent = CreatePromotionPage
    }
    const modal = await this.modalCtrl.create({
      component: typeComponent,
      breakpoints: [1],
      initialBreakpoint: 1,
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        if(type == 2){
          this.getEvents();
        }else if(type==3){
          this.getDiscounts();
        }
      }
    });
    return await modal.present();
  }
}
