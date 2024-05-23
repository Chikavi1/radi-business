import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { DataService } from '../services/data.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';



declare var require: any;
const Hashids = require('hashids/cjs');
const hashids = new Hashids('Elradipet10Lt', 6,'ABCEIU1234567890');



@Component({
  selector: 'app-update-pet',
  templateUrl: './update-pet.page.html',
  styleUrls: ['./update-pet.page.scss'],
})
export class UpdatePetPage implements OnInit {
id;
pet:any = [];

chronic_disease;
birthday;
size;
gender;
specie;
weight;
sterelized;
sterelized_date;
muzzle;
name;
today

menu = "general"

segmentChange(e){
  console.log(e.detail.value);
}

async editPhoto(){
  let options = [];
    options = [

    {
      text: 'Tomar foto',
      icon: 'camera',
      handler: () => {

        Camera.checkPermissions().then((res) => {
          if(res.camera != 'denied'){
            this.getPicture('camera');
          }else{
            alert('Necesitas autorizar los permisos');
          }
        })

      }
    },
    {
        text: 'Galeria',
        icon: 'image',
        handler: () => {
          Camera.checkPermissions().then((res) => {
            if(res.photos != 'denied'){
              this.getPicture('photos');
            }else{
             alert('Necesitas autorizar los permisos');
            }
            // alert(JSON.stringify(res));
          })
        }
    },
    {
      text: 'Cancelar',
      icon: 'close',
      role: 'cancel',
      handler: () => {
      }
    }
  ];

  const actionSheet = await this.actionSheetController.create({
    header: 'Selecciona una opción',
    mode: 'md',
    buttons: options
  });
  await actionSheet.present();

  const { role } = await actionSheet.onDidDismiss();
}

async getPicture(src){
  let source = src=='camera'?CameraSource.Camera:CameraSource.Photos;

  const image = await Camera.getPhoto({
    quality: 100,
    saveToGallery:true,
    allowEditing: false,
    resultType: CameraResultType.Base64,
    source: source,
    promptLabelHeader: 'Carnet de la mascota',
    promptLabelCancel: 'Cancelar',
    promptLabelPhoto:  'Galeria',
    promptLabelPicture: 'Tomar Foto'
  });


    this.modalImage(image.base64String);
}


  constructor(private modalCtrl:ModalController,
    private toastController:ToastController,
    private loadingController: LoadingController,
    private actionSheetController:ActionSheetController,
    private api:DataService) {
    this.today =  moment().format('yyyy-MM-DD');
  }

  ngOnInit(){
    this.photo = 'https://ionicframework.com/docs/img/demos/card-media.png';
    this.api.getPet(this.id).subscribe(data => {
      let pet = data[0];
      this.name = pet.name;
      this.chronic_disease = pet.chronic_disease;
      this.birthday = pet.birthday;
      this.size = pet.size;
      this.gender = pet.gender;
      this.specie = pet.specie;
      this.weight = pet.weight;
      this.sterelized = pet.sterelized;
      this.sterelized_date = pet.sterelized_date;
      this.muzzle = pet.muzzle;
    });
  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Actualizando información, un momento...',
      duration: 1200
    });
    loading.present();
  }


  uploadPhoto;
  photo;


  modalImage(image){
    this.uploadPhoto = image;
    this.photo = `data:image/jpeg;base64,`+image;
    this.uploadImage(this.uploadPhoto);
  }


  uploadImage(photo){
    this.presentLoading();
    let data = {
      id: hashids.decode(this.id)[0],
      photo: photo
    }
    console.log(data)

    this.api.updatePhotoCarnet(data).subscribe((data:any) => {
      if(data.status == 200){
        this.loadingController.dismiss();
        this.presentToast('Se ha subido exitosamente el carnet, espera unos segundos para que se actualice','success');
      }
    });
  }

  close(){
    this.modalCtrl.dismiss()
  }


  setSize(s){
    this.size = s;
  }
  setGender(g){
    this.gender = g;
  }
  setSpecie(s){
    this.specie = s;
  }
  setSterelized(s){
  this.sterelized = s;
  }
  setMuzzle(m){
    this.muzzle = m;
  }

  update(){

    let data = {
      id: hashids.decode(this.id)[0],
      chronic_disease: this.chronic_disease,
      birthday: this.birthday,
      size: this.size,
      gender: this.gender,
      specie: this.specie,
      weight: this.weight,
      sterelized: this.sterelized,
      sterelized_date: this.sterelized_date,
      muzzle: this.muzzle,

    }

    this.api.updatePet(data).subscribe(result => {
      console.log(result);
      if(result.status == 200){
        this.presentToast('Se ha actualizado correctamente.','success');
        this.modalCtrl.dismiss(data);

      }
    });

  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }

}
