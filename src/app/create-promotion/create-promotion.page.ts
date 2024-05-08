import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { PhotoModalPage } from '../photo-modal/photo-modal.page';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalWarningPage } from '../modal-warning/modal-warning.page';

@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.page.html',
  styleUrls: ['./create-promotion.page.scss'],
})
export class CreatePromotionPage implements OnInit {
  title
  description
  conditions;
  image;

  constructor(
    private modalCtrl:ModalController,
    private toastController:ToastController,
    private api:DataService) {
     this.image = "../../assets/img/default.png";
     }

  ngOnInit() {
  }

  photo;
  buttondisabled = false;

  create(){
    this.buttondisabled = true;
    let data = {
      title: this.title,
      description: this.description,
      image: this.uploadPhoto,
      conditions: this.conditions,
      company_id: localStorage.getItem('id_company'),
      status: 1
    }

    this.api.createPromotion(data).subscribe((result:any) => {
      if(result.status == 200){
        this.presentToast('Se ha creado correctamente.','success')
        this.modalCtrl.dismiss(data);
      }
    })
  }

  close(){
    this.modalCtrl.dismiss();
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
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
}
