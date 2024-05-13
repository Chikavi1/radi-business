import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.page.html',
  styleUrls: ['./pets.page.scss'],
})
export class PetsPage {

  pets:any = [];
  device;
  constructor(private api:DataService,
    private navCtrl:NavController,
    private modalCtrl:ModalController){
    this.device = localStorage.getItem('device');
    this.getInfo();

  }

  ionViewDidEnter(){
    if(localStorage.getItem('updateUsers')){
     this.getInfo();
     localStorage.removeItem('updateUsers');

    }
   }

   getInfo(){
    this.api.getPetsByCompany(localStorage.getItem('id_company')).subscribe(data => {
      console.log(data);
       this.pets = data;
    });
   }

  async addPet(){
    // const modal = await this.modalCtrl.create({
    //   component: AddClientPage,
    //   breakpoints: [1],
    //   initialBreakpoint: 1
    // });
    // modal.onDidDismiss().then((data) => {
    //   if(data['data']){
    //     console.log('update Cliente')
    //   }
    // });
    // return await modal.present();


  }

   back(){
    this.navCtrl.back();
   }

  async pet(id){
    const modal = await this.modalCtrl.create({
      component: PetsPage,
      breakpoints: [.75,1],
      initialBreakpoint: .75,
      componentProps:{
        id: id,
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        const info = data['data'];
        console.log(info);
      }
    });
    return await modal.present();
  }

}
