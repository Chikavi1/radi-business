import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import * as moment from 'moment';
import { HistoryPage } from '../history/history.page';
import { VaccinePage } from '../vaccine/vaccine.page';
import { UpdatePetPage } from '../update-pet/update-pet.page';


declare var require: any;
const Hashids = require('hashids/cjs');
const hashids = new Hashids('Elradipet10Lt', 6,'ABCEIU1234567890');

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  visits:any = [];
  result:any = [];
  code:any;
  vaccines:any = [];
  grantedCarnet = false;
  grantedHistorial;
  grantedEditPet
  constructor(private api:DataService,
    private alertCtrl:AlertController,
    private toastController:ToastController,
    private modalctrl:ModalController){
      let granted = localStorage.getItem('granted');
      this.grantedCarnet = granted.includes('carnet');
      this.grantedHistorial = granted.includes('historial');
      this.grantedEditPet = granted.includes('editpet');



    }
  btnCreate = true;
  goodbehavior = true;
  type;

  allgreen = true;
  cedula = 'a';
  petId;
  load = true;

  ngOnInit(){

    let data = {
      code: this.code,
      type: this.type
    }
    console.log(data);
    this.api.getPetInfo(data).subscribe(data => {
     this.result = data[0];
     console.log(this.result);
     this.petId = hashids.encode(this.result.id_pet);

      let dataVisit = {
        id_user: this.result.id_user,
        id_pet: this.result.id_pet,
        id_business: localStorage.getItem('id_company')
      }

      if(this.grantedCarnet){
        this.get_injections()
      }


      this.api.visitsByUser(dataVisit).subscribe(data => {
        this.visits = data;
        if(this.visits.length != 0){
          let differenceHours = moment().diff(moment(this.visits[0].date), 'hours');
          this.btnCreate = (differenceHours > 24)?true:false;
        }else{
          this.btnCreate = true;
        }

        this.visits.forEach(data => {
          if(data.report_id){
            this.goodbehavior = false;
            return;
          }
        });

      });

      this.load = false;
    },error=>{
      this.result = [];
    }
  );
  }

  get_injections(){
    this.api.getVaccines(this.petId).subscribe(data => {
      this.vaccines = data;
      this.vaccines.forEach(data => {
        if(data.status == 1){
          this.allgreen = false;
          return;
        }
      });
    });
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

  async History(id){
    const modal = await this.modalctrl.create({
      component: HistoryPage,
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

  updateInjection(id,index,type){
    if(this.cedula){
      let data = {
        id: id,
        status: 2
      }
      this.api.updateVaccines(data).subscribe(data => {
        console.log(data);
        this.vaccines[index].status = 2;
      });
    }else{
      this.needCedula();
    }

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
        console.log(info);
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

  addVisits(){
    let data = {
      'id_pet': this.result.id_pet,
      'id_user': this.result.id_user,
      'id_business': localStorage.getItem('id_company'),
      'description': 'Visita a '+localStorage.getItem('name'),
      'date': new Date(),
      'status': 1
    };

    this.api.createVisit(data).subscribe((data:any) => {
      if(data.status == 200){
        this.presentToast('Se ha creado la visita.','success')
        this.close();
        localStorage.setItem('updateVisits','true');
        localStorage.setItem('updateUsers','true');
        localStorage.setItem('updateStats','true');

      }
    })

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
    this.modalctrl.dismiss();
  }
}
