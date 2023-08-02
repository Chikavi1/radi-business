import { Component, OnInit } from '@angular/core';
import { Share } from '@capacitor/share';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-qrcodeapp',
  templateUrl: './qrcodeapp.page.html',
  styleUrls: ['./qrcodeapp.page.scss'],
})
export class QrcodeappPage implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  close(){
    this.modalCtrl.dismiss();

  }

  async share(){
    await Share.share({
      title: 'Descarga App',
      text: 'Descargar app Radi Pets',
      url: 'https://radi.pet/download/',
      dialogTitle: 'Descarga App',
    });
  }

}
