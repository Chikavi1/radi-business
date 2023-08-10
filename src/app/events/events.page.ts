import { Component, OnInit } from '@angular/core';
import { EventPage } from '../event/event.page';
import { ModalController } from '@ionic/angular';
import { CreateEventPage } from '../create-event/create-event.page';
import { DataService } from '../services/data.service';



declare var require: any;
const Hashids = require('hashids/cjs');
const hashids = new Hashids('Elradipet10Lt', 6,'ABCEIU1234567890');

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  device;
  events:any = [];

  constructor(private modalCtrl:ModalController,private api:DataService){
    this.device = localStorage.getItem('device');
    this.getData();
  }

  getData(){

    this.api.getEventsByBusiness(localStorage.getItem('id_company')).subscribe(data => {
      console.log(data);
      this.events = data;
    });
  }

  ngOnInit(){
  }

  async createEvent(){
    const modal = await this.modalCtrl.create({
      component: CreateEventPage,
      breakpoints: [ 1],
      initialBreakpoint: 1
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){

      }
    });
    return await modal.present();
  }

 async eventOpen(id){
  id = hashids.encode(id)
    const modal = await this.modalCtrl.create({
      component: EventPage,
      breakpoints: [ 1],
      initialBreakpoint: 1,
      componentProps:{
        id: id,
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        this.getData()
      }
    });
    return await modal.present();  }

}
