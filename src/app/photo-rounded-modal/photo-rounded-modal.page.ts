import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-photo-rounded-modal',
  templateUrl: './photo-rounded-modal.page.html',
  styleUrls: ['./photo-rounded-modal.page.scss'],
})
export class PhotoRoundedModalPage implements OnInit {
  @ViewChild(ImageCropperComponent,{ static: false }) angularCropper: ImageCropperComponent;
  imageSend;
  backimage;
  constructor(private modalCtrl:ModalController){
    this.imageSend = "data:image/jpeg;base64,/"+this.imageSend;

   }

  ngOnInit() {
    this.imageSend = "data:image/jpeg;base64,"+this.imageSend;
    console.log(this.imageSend);

  }

  imageCropped(event: ImageCroppedEvent){
    // this.backimage =  event.base64.split(',')[1];
  }

  exit(){
    this.modalCtrl.dismiss();
  }

  crop(){
    const evento = this.angularCropper.crop();
    this.backimage =  evento.base64.split(',')[1];
    this.modalCtrl.dismiss(this.backimage);
  }




}
