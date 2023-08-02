import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Share } from '@capacitor/share';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalWarningPage } from '../modal-warning/modal-warning.page';
import { PhotoModalPage } from '../photo-modal/photo-modal.page';

declare var require: any;
const Hashids = require('hashids/cjs');
const hashids = new Hashids('Elradipet10Lt', 6,'ABCEIU1234567890');

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.page.html',
  styleUrls: ['./promotion.page.scss'],
})
export class PromotionPage implements OnInit {

  id;
  discount:any = [];
  hash;
  edit = false;

  title;
  conditions;
  description;
  image;

  editing(){
    this.edit = !this.edit;
  }

  constructor(
    private modalCtrl:ModalController,
    private toastController:ToastController,
    private alertCtrl:AlertController,
    private api:DataService){

   }

   update(){
    let data = {
      id: this.discount.id,
      title: this.title,
      conditions: this.conditions,
      description: this.description
    }

    this.api.updatediscount(data).subscribe((data:any) => {
      if(data.status == 200){
        this.presentToast('Se ha actualizado correctamente.','success')
        this.close(1);
      }
    });
   }

   delete(){
      let data = {
        id: this.discount.id,
        status: 0
      }
      this.api.updatediscount(data).subscribe(data => {
        this.presentToast('Se ha eliminado correctamente.','dark');
        this.close(1);
      });
   }

  ngOnInit() {
    this.api.discount(this.id).subscribe(data => {
      this.discount = data[0];
      console.log(this.discount);
      this.image = this.discount.image;
      this.title = this.discount.title;
      this.description = this.discount.description;
      this.conditions = this.discount.conditions;
    })
  }

  close(status){
    this.modalCtrl.dismiss(status);
  }

  async share(){
    await Share.share({
      title: 'Compartir descuento',
      text: 'Mira este descuento presentando la placa QR de tu mascota ',
      url: 'https://radi.pet/discount/'+ hashids.encode(this.discount.id),
      dialogTitle: 'Compartir descuento',
    });
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
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
            this.delete();
          }
        }
      ]
    });

    await alert.present();
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
  photo;

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

        let datar = {
          id: this.discount.id,
          image: this.uploadPhoto
        }
        this.api.updatediscountImage(datar).subscribe(data => {
          this.presentToast('Se ha actualizado la imagen correctamente.','dark');
          this.close(1);
        });

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
}

