import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import * as moment from 'moment';
import { Browser } from '@capacitor/browser';
import { UpdatePetPage } from '../update-pet/update-pet.page';
import { IdPetsPage } from '../id-pets/id-pets.page';

declare var require: any;
const Hashids = require('hashids/cjs');
const hashids = new Hashids('Elradipet10Lt', 6,'ABCEIU1234567890');


@Component({
  selector: 'app-pet',
  templateUrl: './pet.page.html',
  styleUrls: ['./pet.page.scss'],
})
export class PetPage implements OnInit {

  constructor(
    private api:DataService,
    private actionSheetController:ActionSheetController,
    private modalCtrl:ModalController) {

      this.device = 'phone';
     }

  id;

  ngOnInit() {
    this.getPetInfo();

    console.log(this.id);
  }

  noContent;
  owner = false;
  pet;
  breedData;
  tags;
  show = false;
  device;

  vaccines;
  deworming;

  injections;

  segmentChanged(event){
  }

  getPetInfo(){
      this.api.showOrganizationPets(hashids.encode(this.id)).subscribe( data => {
        console.log(data);

        if(data.length != 0){
          this.noContent = false;
          this.pet = data[0];

          if(this.pet.breed){
            let petInfo = {
              language: 'es',
              id: this.pet.breed,
              specie: this.pet.specie
            }

            this.api.getBreedInfo(petInfo).subscribe(data => {
              this.breedData = data;
            })
          }

          this.setNecklaceColor(this.pet.color_necklace)
          this.birthdayChange(data[0].birthday)

          if(data[0].tags){
            var tags = data[0].tags;
            this.tags =  JSON.parse(tags.split(','));
          }
        }else{
          this.noContent = true;
        }
        this.show = true;
      });
  }

  necklaceSrc;
  necklaceTitle

  setNecklaceColor(colorId: number){
    switch(colorId){
      case 1: this.necklaceSrc = "../../../assets/necklace-red.png";
              this.necklaceTitle = "createpet.warning";
              break;
      case 2: this.necklaceSrc = "../../../assets/necklace-yellow.png";
              this.necklaceTitle = "createpet.nervious";
              break;
      case 3: this.necklaceSrc = "../../../assets/necklace-green.png";
              this.necklaceTitle = "createpet.friendly";
              break;
      case 4: this.necklaceSrc = "../../../assets/necklace-orange.png";
              this.necklaceTitle = "createpet.notfriendly";
              break;
      case 5: this.necklaceSrc = "../../../assets/necklace-purple.png";
              this.necklaceTitle = "createpet.notfeedme";
              break;
      case 6: this.necklaceSrc = "../../../assets/necklace-blue.png";
              this.necklaceTitle = "createpet.trained";
              break;
      case 7: this.necklaceSrc = "../../../assets/necklace-white.png"
              this.necklaceTitle = "createpet.disability";
              break;
    }
   }

   age;
   dateFormat;

  birthdayChange(birthdayChange){
    var years = moment().diff(moment(birthdayChange).format('yyyy-MM-DD'), 'years');
    this.age = years;
    this.dateFormat='years';
    if(years === 0){
      var months = moment().diff(moment(birthdayChange).format('yyyy-MM-DD'), 'months');
      this.age = months;
      this.dateFormat='months';
      if(months === 0){
        var days = moment().diff(moment(birthdayChange).format('yyyy-MM-DD'), 'days');
        this.age = days;
        this.dateFormat='days';
      }
    }
  }

  close(){
    this.modalCtrl.dismiss()
  }

  async openBlank(url){
    await Browser.open({ url });
   }

   async presentActionSheet() {
    let options = [];
    options = [
    {
      text: 'Editar',
      icon: 'paw',
      handler: () => {
        this.presentModal(UpdatePetPage,{id: hashids.encode(this.id)});
      }
    },
    {
      text: 'Identificación',
      icon: 'id-card-outline',
      handler: () => {
       this.presentModal(IdPetsPage, {id: hashids.encode(this.id)});
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

    if(this.pet.status === 0){
      options = options.slice(0,1);
    }

    // if(this.pet.status === 3){
    //   options.splice(1,1);
    // }


    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una opción',
      mode:'md',
      buttons: options
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
  }


  async presentModal(component,data) {
    const modal = await this.modalCtrl.create({
      breakpoints: [1],
      initialBreakpoint:1,
      backdropDismiss:true,
      cssClass: 'small-modal',
      component: component,
      componentProps: data
    });



    return await modal.present();
  }
}
