import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.page.html',
  styleUrls: ['./create-ad.page.scss'],
})
export class CreateAdPage implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  close(){
    this.modalCtrl.dismiss();
  }

  title = '';
  cta;
  image;
  latitude;
  longitude;
  finish_date;

  create(){
    let data = {
      'title': this.title,
      'cta':this.cta,

      'image':this.image,
      'keywords':'[]',
      'company':'Radi Pets',
      'latitude': this.latitude,
      'longitude': this.longitude,
      'finish_date': this.finish_date,
      'priority': 1,
      'language': 'es'
    }

    console.log(data);


  }
}
