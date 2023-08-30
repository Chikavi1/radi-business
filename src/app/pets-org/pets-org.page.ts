import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ResultPage } from '../result/result.page';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
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
  type = 'app';
  code = '214904';
  id_org;
  pets:any = [];
  email;
  password;
  name_organization;
  constructor(private modalCtrl:ModalController,
    private nfc:NFC,
    private api:DataService,
    private toastController:ToastController,
    private barcodeScanner: BarcodeScanner){

      this.id_org = localStorage.getItem('id_organization');
      this.name_organization = localStorage.getItem('name_organization');
      // this.id_org = 1;
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
      console.log(datos);

      this.api.loginOrg(datos).subscribe( data => {
        console.log(data);
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
    this.id = id;
    this.code = code;
    this.openResult()
  }

  async openResult(){
    const modal = await this.modalCtrl.create({
      component: ResultPetsOrgPage,
      breakpoints: [.95,1],
      initialBreakpoint: .95,
      componentProps:{
        type: this.type,
        code: this.code,
        id: this.id
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

  async scanResult(type){
    this.type = type;
    this.nfc.enabled().then( () => {
      this.openModal(SelectReadPage);
    }).catch(() => {
      this.qrcodescan();
    });
  }

  async openModal(Page){
    const modal = await this.modalCtrl.create({
      component: Page,
      breakpoints: [1],
      initialBreakpoint: 1,
      componentProps:{
        type: this.type,
        code: this.code,
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        const info = data['data'];


      }
    });
    return await modal.present();
  }

  async qrcodescan(){
    this.barcodeScanner.scan({disableSuccessBeep: true}).then(barcodeData => {
      if(!barcodeData.cancelled){
        let data = barcodeData.text;
        this.processData(data);
      }
    }).catch(err => {
      this.presentToast('Hubo un error,intenta despues.','danger');
      console.log('Error', err);
    });
  }

  processData(text){
    let hash;

    if(text.includes('https://radi.pet/pets/')){
      hash = text.split('pet/pets/');
      this.type = 'placa'
    }else{
      hash = text.split('pet/pet/');
      this.type =  'app'
    }
    this.code = hash[1];
    this.openResult();

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
