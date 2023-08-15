import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { DataService } from '../services/data.service';



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

  constructor(private modalCtrl:ModalController,
    private toastController:ToastController,
    private api:DataService) {
    this.today =  moment().format('yyyy-MM-DD');
  }

  ngOnInit(){
    console.log(this.id);
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

    console.log(data);

    this.api.updatePet(data).subscribe(data => {
      console.log(data);
      if(data.status == 200){
        this.presentToast('Se ha actualizado correctamente.','success');
        this.close();
      }
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

}
