import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { UpdatePetPage } from '../update-pet/update-pet.page';
import { VaccinePage } from '../vaccine/vaccine.page';
import { IdPetsPage } from '../id-pets/id-pets.page';
import * as moment from 'moment';


declare var require: any;
const Hashids = require('hashids/cjs');
const hashids = new Hashids('Elradipet10Lt', 6,'ABCEIU1234567890');

@Component({
  selector: 'app-result-pets-org',
  templateUrl: './result-pets-org.page.html',
  styleUrls: ['./result-pets-org.page.scss'],
})
export class ResultPetsOrgPage implements OnInit {

  constructor(
    private api:DataService,
    private toastController:ToastController,
    private alertCtrl:AlertController,
    private modalctrl:ModalController) {
      let granted = localStorage.getItem('granted');
      this.grantedCarnet = granted.includes('carnet');
      this.grantedHistorial = granted.includes('historial');
      this.grantedEditPet = granted.includes('editpet');


    }
  code;
  type;
  result:any = [];
  load = true;

  age;
  dateFormat;

  grantedCarnet = false;
  grantedHistorial;
  grantedEditPet

  petId;
  id;

  vaccines:any = [];
  allgreen = true;

  cedula = '1';

  breedData:any = [];


  ngOnInit(){
    this.petId  = hashids.encode(this.id);

    console.log(this.id,this.petId,this.code);

    let data = {
      code: this.petId,
      type: this.type
    }

    this.api.getPetInfoOrg(data).subscribe(data => {
      this.result = data[0];
      this.birthdayChange(data[0].birthday)

      this.get_injections();

      let petInfo = {
        language: 'es',
        id: this.result.breed,
        specie: this.result.specie
      }

      this.api.getBreedInfo(petInfo).subscribe(data => {
        this.breedData = data;
      })

      this.load = false;
    },error=>{
      this.result = [];
    }
  );
  }


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

  async createVaccine(type){
    if(!this.cedula){
      this.needCedula();
    }else{
      this.presentModalInjection(VaccinePage,{
        id_pet: this.petId,
        type,
        specie: this.result.specie
      })
    }
  }

  async presentModalInjection(component,data) {
    const modal = await this.modalctrl.create({
      breakpoints: [1.0],
      initialBreakpoint:1.0,
      backdropDismiss:true,
      cssClass: 'small-modal',
      component: component,
      componentProps: data
    });
    modal.onDidDismiss().then( (data) => {
      if(data.data){
        this.get_injections();
      }
    });

    return await modal.present();
  }

  async needCedula() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Cuidado',
      message: 'Necesitas agregar tu cedula profesional para modificar las vacunas',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Agregar',
          handler: () => {
            // this.modalCtrl.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }



  get_injections(){

    this.api.getVaccines(this.petId).subscribe(data => {
      console.log(data);
      this.vaccines = data;
      this.vaccines.forEach(data => {
        console.log(data)
        if(data.status === 1){
          this.allgreen = false;
          alert('valio verg')
          return;
        }
      });
    });
  }

  updateInjection(id,index,type){
    if(this.cedula){
      let data = {
        id: id,
        status: 2
      }
      this.api.updateVaccines(data).subscribe(data => {
        this.vaccines[index].status = 2;
      });
    }else{
      this.needCedula();
    }

  }

  async aresuredelete(id,index,type) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Cuidado',
      message: '¿Estás seguro de eliminar esta vacuna?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si,eliminar',
          handler: () => {
            this.deleteApi(id,index,type);
            // this.modalCtrl.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }

  deleteApi(id,index,type){
    this.api.deleteVaccine({id}).subscribe((data:any) => {
      console.log(data);
        if(data.status == 200){
          if(type == 1){
            this.vaccines.splice(index, 1);
            this.presentToast('Se ha eliminado la vacuna','success'); // need_translate
          }else{
            // this.dewormings.splice(index,1);
            // this.presentToast('Se ha eliminado la desparasitación','success'); //need_translate
          }
        }
    });
  }


  async updatePet(){
    const modal = await this.modalctrl.create({
      component: UpdatePetPage,
      breakpoints: [.75,1],
      initialBreakpoint: .75,
      componentProps:{
        id: this.petId,
      }
    });

    modal.onDidDismiss().then((data) => {
      if(data['data']){
        const info = data['data'];
        this.result.birthday = info.birthday;
        this.result.size = info.size;
        this.result.weight = info.weight;
        this.result.gender = info.gender;
        this.result.specie = info.specie;
        this.result.sterelized = info.sterelized;
        this.result.sterelized_date = info.sterelized_date;
        this.result.chronic_disease = info.chronic_disease;
        this.result.muzzle = info.muzzle;
      }
    });
    return await modal.present();
  }


  async presentModalSmall(component,data) {
    const modal = await this.modalctrl.create({
      breakpoints: [0.59,1.0],
      initialBreakpoint:0.59,
      backdropDismiss:true,
      cssClass: 'small-modal',
      component: component,
      componentProps: data
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        const info = data['data'];
        this.result.code = info.code;
      }
    });

    return await modal.present();
  }

    vincular(){
      this.presentModalSmall(IdPetsPage,{id: this.petId});
    }

    desvincular(){
      this.aresuredesvincular();
    }

    async aresuredesvincular( ) {
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Cuidado',
        message: '¿Estás seguro de desvincular la placa?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Si,eliminar',
            handler: () => {
              let data = {
                id: this.id,
                code: this.result.code
              };

              this.api.removeId(data).subscribe(data => {
                console.log(data);
                if(data.status == 200){
                  this.result.code =  null;
                }
              })

            }
          }
        ]
      });

      await alert.present();
    }

    async presentToast(message,color) {
      const toast = await this.toastController.create({
        message,
        color,
        duration: 2000
      });
      toast.present();
    }

    close(){
      let data = {
        id: this.result.id,
        code: this.result.code
      }
      this.modalctrl.dismiss(data);
    }

}
