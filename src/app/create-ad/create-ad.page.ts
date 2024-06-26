import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import * as Leaflet from 'leaflet';
declare var L: any;
import { Geolocation } from '@capacitor/geolocation';
import * as moment from 'moment';
import { MethodPaymentsPage } from '../method-payments/method-payments.page';
import { DataService } from '../services/data.service';
import { PhotomodalstoryPage } from '../photomodalstory/photomodalstory.page';
import { LogsActivityService } from '../services/logs-activity.service';


@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.page.html',
  styleUrls: ['./create-ad.page.scss'],
})
export class CreateAdPage implements OnInit {
  @ViewChild('leafletmap')
  private mapElement: ElementRef;

  start_date;
  finish_date;

  days = 2;
  total = 100;
  today;
  count = 2;
  cta_valid;
  success;
  step = 1;

  constructor(private modalCtrl:ModalController,
    private api:DataService,
    private LogsActivity:LogsActivityService,
    private loadingController:LoadingController,
    private toastController: ToastController) {
    this.start_date = moment().format('YYYY-MM-DD');
    this.finish_date   = moment().add(2, 'days').format('YYYY-MM-DD');
    this.today  = moment().format('YYYY-MM-DD');
    this.success  = {
      path: '../../../assets/lotties/success.json',
      autoplay: true,
      loop: false
    }

  }

  price = 10;
  getPrice(){
    this.api.getPrice().subscribe(data => {
      console.log(data);
      this.price = (data.unit_amount/100);
      this.total = this.price*2;
      console.log(data.unit_amount,this.price,this.total);

      this.onEvent('request','obtener precio del anuncio');

    });
  }

  plus(){
    this.count += 1;
    this.finish_date  = moment().add(this.count, 'days').format('YYYY-MM-DD');
    this.setTotal();
  }

  minus(){
    if(this.count > 2){
      this.count -= 1;
    }else{
      this.presentToast('No puedes hacer anuncios con menos de dos dias','danger')
    }
    this.finish_date   = moment().add(this.count, 'days').format('YYYY-MM-DD');
    this.setTotal();
  }

  setTotal(){
    this.total = this.count*this.price;
  }



  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }

  checkUrl(ev){
    this.cta_valid = this.isValidUrl(ev.detail.value);
  }

  isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }

  ngOnInit() {
    this.LogsActivity.startLogging('Ad-create');

    this.getInfoCards();
    this.getPrice();
  }

  segmentChange(e){
    this.finish_date  = moment(this.start_date).add(this.count, 'days').format('YYYY-MM-DD');
  }

  close(t?){
    this.modalCtrl.dismiss(t);
    this.onEvent('close','close');

  }

  title = '';
  cta = '';
  image;
  latitude;
  longitude;

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Creando Anuncio, un momento...',
    });
    loading.present();
  }

  create(){
    this.presentLoading()

    let data = {
      'title': this.title,
      'cta':this.cta,
      'image':this.uploadPhoto,
      'keywords':'[]',
      'company': localStorage.getItem('name'),
      'latitude': this.latitude,
      'longitude': this.longitude,
      'start_date': this.start_date,
      'finish_date': this.finish_date,
      'priority': 0,
      'business_id': localStorage.getItem('id_company'),
      'amount': this.total*100,
      'customer': localStorage.getItem('customer'),
      'language': 'es'
    }

    console.log(data);

    this.api.createAd(data).subscribe(data => {
      console.log(data);
      if(data.status==200){
        this.loadingController.dismiss();
        this.step = 2;

        this.onEvent('request','creo anuncio');

      }
    },err => {
      this.onEvent('error','Error al creo anuncio');
    });


  }

  goToMethods(){
    this.onEvent('click','Ver metodos de pago');
    this.goToModal(MethodPaymentsPage,{});
  }

  async goToModal(component,data){
    const modal = await this.modalCtrl.create({
      component: component,
      breakpoints: [1],
      componentProps: data,
      initialBreakpoint: 1,
      backdropDismiss:true,
      cssClass: 'small-modal'
    });

    modal.onDidDismiss().then( () => {
      this.getInfoCards();
      // this.obtenerPuntos();
    });


    return await modal.present();

  }


  async getPicture(){
    this.onEvent('click','Subir imagen');

    const image = await Camera.getPhoto({
      quality: 100,
      saveToGallery:true,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      promptLabelHeader: 'Sube una imagen',
      promptLabelCancel: 'Cancelar',
      promptLabelPhoto:  'Galeria',
      promptLabelPicture: 'Tomar Foto'
    });

      this.modalImage(image.base64String);
  }

  uploadPhoto;
  photo = "https://i.ibb.co/RNnTmqx/Radi-Pets-2.png";

  async modalImage(image){
    const modal = await this.modalCtrl.create({
      component: PhotomodalstoryPage,
      componentProps:{
        imageSend: image
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        const image = data['data'];
        this.uploadPhoto = image;
        this.photo = `data:image/jpeg;base64,`+image;
        }
    });
    return await modal.present();
  }

  ionViewDidEnter(){
    this.leafletMap();
  }

  map;

  leafletMap(){
    this.latitude  =  20.65822858189279;
    this.longitude = -103.3518831503091

    Geolocation.getCurrentPosition({enableHighAccuracy:true}).then((resp) => {
      this.latitude  =  resp.coords.latitude;
      this.longitude = resp.coords.longitude;
});

    this.map = Leaflet.map(this.mapElement.nativeElement,{ zoomControl: false}).setView([this.latitude,this.longitude], 10);

    var homeICon = L.icon(
      {
        iconUrl:  localStorage.getItem('image'),
        iconSize:     [33, 33], // size of the icon
        className: 'custom-icon'
      });

      Leaflet.tileLayer('https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga', {
        zoom: 8,
        zoomControl: false,
        maxZoom: 18,
        minZoom: 4,
        minResolution: 4891.96981025128,
        maxResolution: 39135.75848201024,
        doubleClickZoom: true
        }).addTo(this.map);


        this.map.panTo(new L.LatLng(this.latitude,this.longitude));
          const marker = Leaflet.marker([this.latitude, this.longitude], {draggable: true, icon: homeICon}).addTo(this.map);
          const circle = Leaflet.circle([this.latitude, this.longitude], {
            color: 'green',
            radius: 10000,
            fillColor: 'green',
            opacity: 0.5
          }).addTo(this.map);

          marker.on('drag', function(e) {
            const markerLatLng = e.target.getLatLng();
            circle.setLatLng(markerLatLng);
          });

          marker.on('dragend', e => this.procesar(e));


    }
    card;

    getInfoCards(){
      this.api.getCustomerCards(localStorage.getItem('customer')).subscribe(data => {
        console.log(data);
        this.onEvent('request','obtener info tarjetas');

        this.card = data.data[0];
      },err => {
        this.onEvent('error','Error obtener info tarjetas');
      });
    }

    procesar(e){
      this.latitude = e.target._latlng.lat;
      this.longitude = e.target._latlng.lng;
    }

    ngOnDestroy() {
      this.LogsActivity.stopLogging();
    }

    onEvent(type,name) {
      this.LogsActivity.logEvent(type,name);
    }
  }

