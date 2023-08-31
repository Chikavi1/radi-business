import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalWarningPage } from '../modal-warning/modal-warning.page';
import { PhotoModalPage } from '../photo-modal/photo-modal.page';
import * as Leaflet from 'leaflet';

import { DataService } from '../services/data.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
declare var L: any;


@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
})
export class EditEventPage implements OnInit {
  @ViewChild('leafletmap')
  private mapElement: ElementRef;


  latitude;
  longitude;
  image;
  name;
  start_date;
  end_date;
  description;
  considerations;
  price;
  url_redirect;
  address;
  map;


  constructor(private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastController:ToastController,
    private api: DataService) { }

  data;
  ngOnInit() {
    this.image = this.data.image;
    this.name = this.data.name;
    this.start_date = moment(this.data.start_date).utc().format();
    this.end_date = moment(this.data.end_date).utc().format();
    console.log(this.data.start_date);
    this.description = this.data.description;
    this.considerations = this.data.considerations;
    this.price = this.data.price;
    this.url_redirect = this.data.url_redirect;
    this.address = this.data.address;
    this.latitude = this.data.latitude;
    this.longitude = this.data.longitude;
    console.log(this.data);
  }


  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  async presentAlertskip() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar',
      message: '¿Seguro que quieres eliminarlo? Esta acción no se puede revertir',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si,Eliminar',
          handler: () => {
            let data = {
              id: this.data.id,
              status: 0
            }
            this.api.deleteEvent(data).subscribe(data => {
              console.log(data);
              this.presentToast('Se ha eliminado correctamente.','dark');
              this.modalCtrl.dismiss(1);

            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }

  update(){
    let data = {
      id:             this.data.id,
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


      this.api.updateEvent(data).subscribe(data => {
        if(data.status == 200){
          this.modalCtrl.dismiss(1);
        }
      });


  }

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
    var homeICon = L.icon(
      {
        iconUrl:  '../../../assets/img/logo.png',
        iconSize:     [33, 33], // size of the icon
      });

      // this.latitude = 20.71231315882407;
      // this.longitude = -103.42433816960676;

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
  }

  procesar(e){
    this.latitude = e.target._latlng.lat;
    this.longitude = e.target._latlng.lng;
  }

}
