import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ModalController, NavController } from '@ionic/angular';
import { PetPage } from '../pet/pet.page';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.page.html',
  styleUrls: ['./pets.page.scss'],
})
export class PetsPage {

  pets:any = [];
  device;
  loading = false;
  constructor(private api:DataService,
    private navCtrl:NavController,
    private modalCtrl:ModalController){
    this.device = localStorage.getItem('device');
    this.getInfo();
    setTimeout(() => {
      this.loading = true;
    },1200);
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
   showPet(id){
    this.pet(id);
   }

  async pet(id){
    const modal = await this.modalCtrl.create({
      component: PetPage,
      breakpoints: [1],
      initialBreakpoint: 1,
      componentProps:{
        id: id,
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        const info = data['data'];
        console.log(info);
        if( localStorage.getItem('updatePets')){
          this.getInfo();
          localStorage.removeItem('updatePets');
        }
      }
    });
    return await modal.present();
  }

}
