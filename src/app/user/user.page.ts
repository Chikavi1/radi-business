import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import * as moment from 'moment';
import { HistoryPage } from '../history/history.page';
import { PetPage } from '../pet/pet.page';
import { Browser } from '@capacitor/browser';


declare var require: any;
const Hashids = require('hashids/cjs');
const hashids = new Hashids('Elradipet10Lt', 6,'ABCEIU1234567890');


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  id;
  user:any = [];
  counter;
  age;


  segmentChange(event){
    // console.log(e);
    if(event.detail.value === 'visits'){
      this.getVisits();
    }

    if(event.detail.value === 'pets'){
      this.getPets();
    }

    if(event.detail.value === 'extras'){
      this.getExtraData();
    }



    if(event.detail.value === 'protect'){
      this.getAdrresses();
    }

    if(event.detail.value === 'payments'){
      this.getPayments();
    }


  }

  menu = 'info';
  interest:any = [];

  account;
  constructor(private api:DataService,
    private toastController:ToastController,
    private modalctrl:ModalController) {
    this.account = localStorage.getItem('account');

   }
  records:any = [];
  pets:any = [];
  addresses:any = [];
  payments:any = [];


  recordsShows = false;
  petsShows = false;
  AddressShows = false;
  paymentsShows = false;
  extraShows = false;

  seeReceipt(url){
    this.openBlank(url);
  }

  async openBlank(url){
    await Browser.open({ url });
  }

  getPayments(){
    if(this.account){
      if(!this.paymentsShows){
        let data = {
          customer: this.user.customer,
          account: localStorage.getItem('account')
        }
        console.log(data);

        this.api.getPaymentsByUser(data).subscribe(data => {
          console.log(data);
          this.payments = data;
          if(data.length != 0){
            this.paymentsShows = true;
          }
        });

      }
    }
  }

  visibleAddress = false;

  setVisibleAddress(){
    if(!this.visibleAddress){
      this.getAdrresses();
      this.visibleAddress = true
    }else{
      this.visibleAddress = false;
    }
  }

  tos_accept;
  tof_accept;
  notes;
  crudIs;

  getExtraData(){
    if(!this.extraShows){
      this.api.getExtraData({id_business: localStorage.getItem('id_company'), id_user: this.user.id}).subscribe(data => {
        console.log(data)
        this.extraShows = true;
        if(data.length == 0){
          this.crudIs = 'create';
        }else{
          this.crudIs = 'update';
          this.notes = data[0].notes;
          this.tof_accept = data[0].tof_accept;
          this.tos_accept = data[0].tos_accept;
        }
      });
    }
  }

  createExtraData(){
    let data = {
      id_business: localStorage.getItem('id_company'),
      notes: this.notes,
      tos_accept: this.tos_accept,
      tof_accept: this.tof_accept,
      id_user: this.user.id}

      this.api.createExtraData(data).subscribe(data => {
        if(data.status == 200){
        this.crudIs = 'update';
        this.presentToast('Se agrego correctamente','success');
      }
    });
  }

  updateExtraData(){
    let data = {
      id_business: localStorage.getItem('id_company'),
      notes: this.notes,
      tos_accept: this.tos_accept,
      tof_accept: this.tof_accept,
      id_user: this.user.id}
      console.log(data);

      this.api.updateExtraData(data).subscribe(data => {
        console.log(data);
        if(data.status == 200){
        this.presentToast('Se actualizo correctamente','success');
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

  setTos(t){
    this.tos_accept = t;
  }

  setTof(t){
    this.tof_accept = t;
  }




  getAdrresses(){
    if(!this.AddressShows){
      this.api.getAddresses(this.user.id).subscribe(data => {
        console.log(data);
        this.addresses = data;
        if(data.length != 0){
          this.AddressShows = true;
        }
      });
    }
  }

getVisits(){
  if(!this.recordsShows){
    this.api.getVisitsByUser({id_business: localStorage.getItem('id_company'), id_user: this.user.id}).subscribe(data => {
      this.records = data;
      if(data.length != 0){
        this.recordsShows = true;
      }
    });
  }
}

getPets(){
  if(!this.petsShows){
    this.api.getPetsByUser(this.user.id).subscribe(data => {
      this.pets = data;
      if(data.length != 0){
        this.petsShows = true;
      }
    });
  }
}

seePets(id){
  this.presentModalShow(PetPage,id);
}

async presentModalShow(component,id) {
  const modal = await this.modalctrl.create({
    component: component,
    breakpoints: [1],
    componentProps:{
      id: id,
    },
    initialBreakpoint: 1,
    backdropDismiss:true,
    cssClass: 'small-modal'
  });

  modal.onDidDismiss().then((data) => {
  if(data['data']){

  }

  });
  return await modal.present();
}

async History(id){
  const modal = await this.modalctrl.create({
    component: HistoryPage,
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

  ngOnInit() {

    let data = {
      id_user: this.id,
      id_business: localStorage.getItem('id_company')
    }
    this.api.getUsersById(data).subscribe((data:any) => {
      console.log(data);
      this.user = data.user[0];
      if(data.user[0].interest){
        this.interest = JSON.parse(data.user[0].interest);
        this.interest = this.interest.join(', ')
      }

      this.counter = data.count;
      if(this.user.birthday){
        this.age = moment().diff(this.user.birthday, 'years',false);
        console.log(this.age);
      }

    });

  }

  close(){
    this.modalctrl.dismiss();
  }
}
