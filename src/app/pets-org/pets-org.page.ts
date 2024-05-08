import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ResultPage } from '../result/result.page';
// import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import { SelectReadPage } from '../select-read/select-read.page';
import { DataService } from '../services/data.service';
import { ResultPetsOrgPage } from '../result-pets-org/result-pets-org.page';
import jwt_decode from "jwt-decode";


declare var require: any;
const Hashids = require('hashids/cjs');
const hashids = new Hashids('Elradipet10Lt', 6,'ABCEIU1234567890');


@Component({
  selector: 'app-pets-org',
  templateUrl: './pets-org.page.html',
  styleUrls: ['./pets-org.page.scss'],
})
export class PetsOrgPage implements OnInit {
  code = '214904';

  id_org;
  pets:any = [];
  email;
  password;
  name_organization;

  constructor(private modalCtrl:ModalController,
    // private nfc:NFC,
    private api:DataService,
    private toastController:ToastController){

      this.id_org = localStorage.getItem('id_organization');
      this.name_organization = localStorage.getItem('name_organization');
      if(this.id_org){
        this.loadPets()
      }
    }

    loadPets(){
      this.api.getPetsByOrg(this.id_org).subscribe(data => {
        this.pets = data;
        console.log(this.pets);
      });
    }

    login(){
      let datos = {
        email: this.email,
        password: this.password
      }

      this.api.loginOrg(datos).subscribe( data => {
        if(data.token){
          var decoded:any = jwt_decode(data.token);
          localStorage.setItem('id_organization',decoded.id);
          localStorage.setItem('name_organization',decoded.name);
          this.id_org = decoded.id;
          this.name_organization =  decoded.name

          this.loadPets();
        }

      },error => {
        console.log(error);
        this.presentToast(error.error.message,'danger');
      })
    }

  ngOnInit() {
  }

  doRefresh(event) {
    this.loadPets();
    setTimeout(() => {
      event.target.complete();
    },2000);
  }

  id;

  seePet(id,code){
    console.log('app',hashids.encode(id));
    this.openResult('app',code,id);
  }

  async openResult(modeRead,code,id?){
    const modal = await this.modalCtrl.create({
      component: ResultPetsOrgPage,
      breakpoints: [.95,1],
      initialBreakpoint: .95,
      componentProps:{
        modeRead: modeRead,
        code: code,
        id:id
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        const info = data['data'];
        let indx = this.pets.findIndex(x => x.id === info.id);
        this.pets[indx].code = info.code;
      }
    });
    return await modal.present();
  }

  action;
  async scanResult(action){
    this.action = 'visits'; // visits
    // this.nfc.enabled().then( () => {
      // this.openSelectRead();
    // }).catch(() => {
      this.qrcodescan(this.action);
    // });
  }

  async openSelectRead(){
    const modal = await this.modalCtrl.create({
      component: SelectReadPage,
      breakpoints: [1],
      initialBreakpoint: 1,
      componentProps:{
        action: this.action,
      }

    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

  async qrcodescan(action){
    // cambio
    // this.barcodeScanner.scan({disableSuccessBeep: true}).then(barcodeData => {
    //   if(!barcodeData.cancelled){
    //     let data = barcodeData.text;
    //     this.processData(data,action);
    //   }
    // }).catch(err => {
    //   this.presentToast('Hubo un error,intenta despues.','danger');
    //   console.log('Error', err);
    // });
  }



  processData(text,action){
    let hash;
    let modeRead;
    if(action === 'visits'){
        if(text.includes('https://radi.pet/pets/')){
          hash = text.split('pet/pets/');
          modeRead = 'placa'
        }else{
          hash = text.split('pet/pet/');
          modeRead =  'app'
        }
        this.openResult(modeRead, hash[1]);
    }
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
