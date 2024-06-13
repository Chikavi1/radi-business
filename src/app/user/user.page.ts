import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import * as moment from 'moment';
import { HistoryPage } from '../history/history.page';
import { PetPage } from '../pet/pet.page';
import { Browser } from '@capacitor/browser';
import { AlertPage } from '../alert/alert.page';
import { CreateAlertPage } from '../create-alert/create-alert.page';
import { LogsActivityService } from '../services/logs-activity.service';
import { CreateMembershipPage } from '../create-membership/create-membership.page';


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

  loading = false;


  segmentChange(event){
    // console.log(e);
    if(event.detail.value === 'visits'){
      this.onEvent('click','menu visitas');
      this.getVisits();
    }

    if(event.detail.value === 'pets'){
      this.onEvent('click','menu mascotas');
      this.getPets();
    }

    if(event.detail.value === 'extras'){
      this.onEvent('click','menu extras');
      this.getExtraData();
    }

    if(event.detail.value === 'protect'){
      this.onEvent('click','menu dirección');
      this.getAdrresses();
    }

    if(event.detail.value === 'alerts'){
      this.onEvent('click','menu alertas');
      this.getSubscrptionAlert();
    }

    if(event.detail.value === 'membership'){
      this.onEvent('click','menu membership');
      this.getMembership();
    }

    if(event.detail.value === 'payments'){
      this.onEvent('click','menu pagos');
      this.getPayments();
    }


  }

  menu = 'info';
  interest:any = [];

  account;
  constructor(private api:DataService,
    private toastController:ToastController,
    private LogsActivity: LogsActivityService,
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
          this.onEvent('request','Obten pagos cliente');
        },err=>{
          this.onEvent('error','error al obtener pagos');
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

  loadingMemberships = false;
  loadingVisits = false;

  getExtraData(){
    if(!this.extraShows){
      this.api.getExtraData({id_business: localStorage.getItem('id_company'), id_user: this.user.id}).subscribe(data => {
        this.extraShows = true;
        if(data.length == 0){
          this.crudIs = 'create';
        }else{
          this.crudIs = 'update';
          this.notes = data[0].notes;
          this.tof_accept = data[0].tof_accept;
          this.tos_accept = data[0].tos_accept;
        }

        this.onEvent('request','consulta extras');

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
        this.onEvent('request','crea extras');
      }
    },err => {
      this.onEvent('error','Error al crea extras');
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

      this.onEvent('request','Actualiza extras');

    },err=>{
      this.onEvent('error','Error al actualizar extras');
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
        this.onEvent('request','Obten direcciones');

      },error=>{
        this.onEvent('error','Error al Obtener direcciones');
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
      this.onEvent('request','Obten visitas por usuario');
    });

    setTimeout(()=>{
      this.loadingVisits = true;
    },1200)

  }
}


sendNotification(){
  this.onEvent('click','Enviar notificación');
  this.presentModaNotification(CreateAlertPage,this.user.id,this.user.name);
}

async presentModaNotification(component,userId,userSelectName) {
  const modal = await this.modalctrl.create({
    component: component,
    breakpoints: [1],
    componentProps:{
      userId: userId,
      userSelectName: userSelectName,
      people: 1
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

checkboxSuscribe = false;
isSuscribe;
suscribeStatus;

memberships:any = [];
loadingAlerts = false;

getSubscrptionAlert(){
  let data = {
    id_user: this.user.id,
    id_business: localStorage.getItem('id_company')
  }

  this.api.getSuscription(data).subscribe(data => {
    this.onEvent('request','obten suscripción del cliente');

    if(data.length == 0){
      this.isSuscribe = false;
    }else{
      this.isSuscribe = true;
      this.suscribeStatus = data[0].status;
    }
  });

  setTimeout(()=>{
    this.loadingAlerts = true;
  },1500);
}

createSubscrptionAlert(){
  let data = {
    id_user: this.user.id,
    id_business: localStorage.getItem('id_company'),
    hash: hashids.encode(this.user.id),
  }

  this.api.createSuscription(data).subscribe(data => {
    this.onEvent('request','suscribir al cliente');

    console.log(data);
    if(data.status == 200){
      this.isSuscribe = 1;
      this.suscribeStatus = 1;
      this.presentToast('Usuario suscrito a tus notificaciones','success');
    }
  });
}

getPets(){
  if(!this.petsShows){
    this.api.getPetsByUser(this.user.id).subscribe(data => {
      this.onEvent('request','listado mascotas del cliente');
      this.pets = data;
      if(data.length != 0){
        this.petsShows = true;
      }
    });
  }
}

seePets(id){
  this.onEvent('click','Ver mascota del cliente | '+id);
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


getMembership(){
  let data = {
    id_user: this.user.id,
    id_pawrtner:  localStorage.getItem('id_company')
  }

  console.log(data);

  this.api.getMembershipByUser(data).subscribe(data => {
    console.log(data);
    this.memberships = data;
    this.calculateNextDate();
  });

  setTimeout(()=>{
    this.loadingMemberships = true;
  },1200)

}

calculateNextDate(): void {
  this.memberships.forEach(membership => {
    if (membership.status === 1) {
      const startDate = moment(membership.start);
      const nextDate = startDate.add(membership.period, 'days');
      membership.nextDate = nextDate.format('YYYY-MM-DD');
    }
  });
}

editMembership(item){
  this.openEdit(item);
}

async openEdit(data){
  const modal = await this.modalctrl.create({
    component: CreateMembershipPage,
    breakpoints: [ 1],
    initialBreakpoint: 1,
    backdropDismiss:true,
    canDismiss:true,
    componentProps: data
  });
  modal.onDidDismiss().then((data) => {
    if(data['data']){
      this.getMembership();
    }
  });
  return await modal.present();
}


async createMembership(){
  const modal = await this.modalctrl.create({
    component: CreateMembershipPage,
    breakpoints: [ 1],
    initialBreakpoint: 1,
    backdropDismiss:true,
    canDismiss:true,
  });
  modal.onDidDismiss().then((data) => {
    if(data['data']){
      this.getMembership();
    }
  });
  return await modal.present();
}

async History(id){
  this.onEvent('click','Ver visita | +id');

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
    this.LogsActivity.startLogging('User');

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

      setTimeout( () => {
        this.loading = true
      },1800);

      this.onEvent('request','Obtén información del cliente');


    });

  }

  close(){
    this.onEvent('close','close');
    this.modalctrl.dismiss();
  }

  ngOnDestroy() {
    this.LogsActivity.stopLogging();
  }

  onEvent(type,name) {
    this.LogsActivity.logEvent(type,name);
  }



}
