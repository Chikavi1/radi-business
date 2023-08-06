import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  async share(){
    let hash = 1;
    //  hashids.encode(this.company.id);

     await Share.share({
       title: 'Mira este evento',
       text: 'Conoce este evento en Radi Pets',
       url: 'https://radi.pet/discount-business/'+hash,
       dialogTitle: 'Compartir evento',
     });
   }

   cta(url){

    this.openBlank(url);
   }

   async openBlank(url){
    await Browser.open({ url });
   }

   close(){
    this.modalCtrl.dismiss();
   }
}
