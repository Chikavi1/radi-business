import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import * as Leaflet from 'leaflet';
import { EditEventPage } from '../edit-event/edit-event.page';
import { LogsActivityService } from '../services/logs-activity.service';
declare var L: any;


declare var require: any;
const Hashids = require('hashids/cjs');
const hashids = new Hashids('Elradipet10Lt', 6,'ABCEIU1234567890');


@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  @ViewChild('leafletmap')
  private mapElement: ElementRef;

  constructor(private modalCtrl:ModalController,
    private LogsActivity:LogsActivityService,
    private api:DataService) { }
  event;
  id;
  hash;

  books(){
    console.log('hehe');
  }

  ngOnInit(){

    this.hash = this.id;
    this.LogsActivity.startLogging('Event');

      this.id = hashids.decode(this.id)[0];
      console.log(this.id);

    this.api.getEvent(this.id).subscribe(data => {
      console.log(data);
      this.event = data[0];
      this.onEvent('request','Obten evento | '+this.id);

    },err=> {
      this.onEvent('error','Error al obtener evento | '+this.id);
    });
  }

  async share(){
    this.onEvent('click','Compartir evento | '+this.id);

     await Share.share({
       title: 'Mira este evento',
       text: 'Conoce este evento en Radi Pets',
       url: 'https://radi.pet/event/'+this.hash,
       dialogTitle: 'Compartir evento',
     });
   }

   async editaEvent(){
    this.onEvent('click','editar evento');

    const modal = await this.modalCtrl.create({
      component: EditEventPage,
      breakpoints: [1],
      initialBreakpoint: 1,
      componentProps:{
        data: this.event,
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        this.modalCtrl.dismiss(1);
      }
    });
    return await modal.present();
  }

   async openBlank(url){
    this.onEvent('click','Abri navegador');

    await Browser.open({ url });
   }

   close(){
    this.onEvent('close','close');

    this.modalCtrl.dismiss();
   }

   map;

   ionViewDidEnter(){
    this.leafletMap();
  }

   leafletMap(){

    var homeICon = L.icon(
      {
        iconUrl:  '../../../assets/img/logo.png',
        iconSize:     [33, 33], // size of the icon
      });

      this.map = Leaflet.map('mapEvent',{ zoomControl: false}).setView([this.event.latitude,this.event.longitude], 15);
      Leaflet.tileLayer('https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga', {
        zoom: 8,
        zoomControl: false,
        maxZoom: 18,
        minZoom: 4,
        minResolution: 4891.96981025128,
        maxResolution: 39135.75848201024,
        doubleClickZoom: true
        }).addTo(this.map);
      Leaflet.marker([this.event.latitude,this.event.longitude],{icon: homeICon}).addTo(this.map);
  }

  ngOnDestroy() {
    this.LogsActivity.stopLogging();
  }

  onEvent(type,name) {
    this.LogsActivity.logEvent(type,name);
  }

}
