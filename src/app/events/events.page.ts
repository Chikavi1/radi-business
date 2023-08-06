import { Component, OnInit } from '@angular/core';
import { EventPage } from '../event/event.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  device;
  events:any = [];

  constructor(private modalCtrl:ModalController){
    this.device = localStorage.getItem('device');

  }

  ngOnInit() {
  }

  createEvent(){

  }

 async event(id){
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

      }
    });
    return await modal.present();  }

}
