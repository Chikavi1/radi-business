import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import * as Leaflet from 'leaflet';
import { ModalWarningPage } from '../modal-warning/modal-warning.page';
import { PhotoModalPage } from '../photo-modal/photo-modal.page';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Geolocation } from '@capacitor/geolocation';

import { DataService } from '../services/data.service';
declare var L: any;

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  @ViewChild('leafletmap')
  private mapElement: ElementRef;

  step=1;

  title;
  image;
  amount;
  url;
  description;
  considerations;

  date_start;


  next(){
    this.step += 1;
  }

  constructor(private modalCtrl:ModalController,private api:DataService) {
    this.image = "../../assets/img/logo-white.png";
    this.start_date = moment().format();;
    this.end_date = moment(this.start_date).add(1, 'hours').format();

   }

  ngOnInit() {
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

name;
start_date;
end_date;
price;
url_redirect;

latitude;
longitude;

address:string = '';



  send(){
    let data = {
    id_business:    localStorage.getItem('id_company'),
    name:           this.name,
    image:          this.uploadPhoto,
    start_date:     this.start_date,
    end_date:       this.end_date,
    price:          this.price,
    url_redirect:   this.url_redirect,
    description:    this.description,
    considerations: this.considerations,
    latitude:       this.latitude,
    longitude:      this.longitude,
    address:        this.address
    };

    this.api.createEvent(data).subscribe(data => {
      console.log(data);
      if(data.status){
        this.modalCtrl.dismiss(1);
      }

    });
  }
  map;

  takePhoto(){
    Camera.checkPermissions().then((res) => {
      if(res.photos != 'denied'){
        this.getPicture();
      }else{
        this.photoAlert(ModalWarningPage,
          'Necesitamos permisos',
          'Para subir una foto necesitamos que nos des permiso',
           null,
           'OK',
          'gallery')
      }
    })
  }

  async getPicture(){
    const image = await Camera.getPhoto({
      quality: 100,
      saveToGallery:false,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      promptLabelHeader: 'Tomar Foto',
      promptLabelCancel: 'Cancelar',
      promptLabelPhoto: 'Galeria',
      promptLabelPicture: 'Tomar Foto'
    });
      this.modalImage(image.base64String);
  }

  uploadPhoto;

  async modalImage(image){
    const modal = await this.modalCtrl.create({
      component: PhotoModalPage,
      componentProps:{
        imageSend: image,
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        const image = data['data'];
        this.uploadPhoto = image;
        this.image = `data:image/jpeg;base64,`+image;
      }
    });
    return await modal.present();
  }

  async photoAlert(component,title,subtitle,cancel_text?,done_text?,path?) {
    const modal = await this.modalCtrl.create({
      component: component,
      breakpoints: [0.0,0.73, 0.90],
      componentProps:{
        title: title,
        subtitle: subtitle,
        cancel_text: cancel_text,
        done_text: done_text,
        path: path
      },
      initialBreakpoint: 0.55,
      backdropDismiss:true,
      cssClass: 'small-modal'
    });

    modal.onDidDismiss().then((data) => {
      // NativeSettings.open({
      //   optionAndroid: AndroidSettings.ApplicationDetails,
      //   optionIOS: IOSSettings.App
      // })

    });
    return await modal.present();
  }


  close(){
    this.modalCtrl.dismiss();
  }

  ionViewDidEnter(){

    this.leafletMap();
  }

   leafletMap(){

    Geolocation.getCurrentPosition({enableHighAccuracy:true}).then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;


    var homeICon = L.icon(
      {
        iconUrl:  '../../../assets/img/logo.png',
        iconSize:     [33, 33], // size of the icon
      });



      this.map = Leaflet.map(this.mapElement.nativeElement,{ zoomControl: false}).setView([this.latitude,this.longitude], 15);
      Leaflet.tileLayer('https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga', {
        zoom: 8,
        zoomControl: false,
        maxZoom: 18,
        minZoom: 4,
        minResolution: 4891.96981025128,
        maxResolution: 39135.75848201024,
        doubleClickZoom: true
        }).addTo(this.map);
      Leaflet.marker([this.latitude,this.longitude],{draggable: true,icon: homeICon}).on('dragend', e => this.procesar(e) ).addTo(this.map);
    });
    }

  procesar(e){
    this.latitude = e.target._latlng.lat;
    this.longitude = e.target._latlng.lng;
  }

  back(){
    this.step -= 1;
  }
}
