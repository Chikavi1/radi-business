import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { UpdatePetPage } from '../update-pet/update-pet.page';
import { LogsActivityService } from '../services/logs-activity.service';


declare var require: any;
const Hashids = require('hashids/cjs');
const hashids = new Hashids('Elradipet10Lt', 6,'ABCEIU1234567890');

@Component({
  selector: 'app-id-pets',
  templateUrl: './id-pets.page.html',
  styleUrls: ['./id-pets.page.scss'],
})
export class IdPetsPage implements OnInit {
  verified = false;
  id;
  date;

  success;
  wrong;

  info:any = [];
  walletstep = 1;

  menu = 'index';

  setMenu(o){
    this.menu = o;
  }


  name;
  user_name;
  email;
  pet_name;
  pet_gender;
  pet_birthday;
  pet_breed;
  pet_specie;
  vaccines;
  dewormings;
  pet_sterelized;
  vet_name;
  vet_id;

  constructor(
    public modalCtrl: ModalController,
    public  dataService:  DataService,
    private loadingController:LoadingController,
    private LogsActivity:LogsActivityService,
    private platform:Platform,
    private toastController: ToastController,
    private alertController:AlertController,



    ){
      this.vet_name = localStorage.getItem('vet_name');
      this.vet_id = localStorage.getItem('vet_id');

      console.log(this.vet_name,this.vet_id);


    }

    async delete(){
      this.onEvent('click','Quiere eliminar la vinculacion de la placa');

        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header:'¿Estás seguro?',
          message:'No se podrá restablecer,esta placa quedaria inservible, tendras que agregar otra.',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {

              }
            }, {
              text: 'Aceptar',
              handler: (e) => {
                this.onEvent('click','desvinculo placa');

              // this.dataService.deleteIdentification().subscribe(data => {
                this.verified = false;
                this.date = null;
              // });
              this.presentToast('Se ha disvinculado la placa','dark');


              }
            }
          ]
        });

        await alert.present();

        const { role } = await alert.onDidDismiss();
    }

  ngOnInit(){
    // buscar si ya tiene
    this.dataService.getIdentification(hashids.decode(this.id)[0]).subscribe((data:any) => {
      this.info = data[0];
      this.onEvent('request','obtuvo info placa');

      console.log(data);
      if(data.length == 0){
        this.verified = false;
      }else{
        this.verified = true;
        this.date = data[0].redeemed_date;
      }
    },err=>{
      this.onEvent('error','error al obtener info placa');
    });
  }

  async scan(){
    this.onEvent('click','escaneo placa');
    if(this.platform.is('android')){
      await BarcodeScanner.requestPermissions();
      const data = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
      if (data.available) {
        const code = await this.startScanner();
        this.handlerScanner(code[0].displayValue);
      } else {
        try {
          await BarcodeScanner.installGoogleBarcodeScannerModule();
          const code = await this.startScanner();
          this.handlerScanner(code[0].displayValue);
        } catch (e) {
        }
      }
    }else{
      await BarcodeScanner.requestPermissions();
      const code = await this.startScanner();
      this.handlerScanner(code[0].displayValue);
    }
  }

  async startScanner() {
    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode, BarcodeFormat.Ean13]
    });
    return barcodes;
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  handlerScanner(d){
      let code = d.split('https://radi.pet/pets/')
      let data = {
        id: hashids.decode(this.id)[0],
        code: code[1]
      }
      this.dataService.associatedId(data).subscribe((result:any) => {
        console.log(result);

        if(result.status == 200){
          this.verified = true;

          this.onEvent('request','Vinculo placa');

          this.presentToast('Se ha vinculado exitosamente','success');
          localStorage.setItem('updatePets','true');
          this.modalCtrl.dismiss(data);
        }

        if(result.status == 503){
          this.onEvent('error','Error al vincular la placa');
          this.presentToast('No se puede asociar','warning');
        }
      },err => {
        console.log(err)
        this.onEvent('error','Error al vincular la placa');
        this.presentToast('No se puede asociar','warning');
      })
  }

  close(){
    this.onEvent('close','close');
    this.LogsActivity.stopLogging();
    this.modalCtrl.dismiss();
  }

  disabledButton = false;
  async presentLoading(){
    const loading = await this.loadingController.create({
      message:  'Generando tarjeta digital',
      duration: 3000
    });
    loading.present();
  }



  seWalletStep(w){
    this.walletstep = w;
    this.onEvent('click','Ver wallet');
    this.getData();
  }

  getData(){
    let data = {
      id: this.info.id_pet
    }
    console.log(data);
    this.dataService.getInfodigitalCard(data).subscribe(data => {
      this.onEvent('request','Obtuvo info wallet');

      console.log(data);
      this.pet_name = data[0].pet_name;
      this.user_name = data[0].user_name;
      this.email = data[0].email;

      this.pet_birthday = data[0].pet_birthday;
      this.pet_gender = data[0].pet_gender;
      this.pet_breed = data[0].pet_breed;
      this.pet_specie = data[0].pet_specie;
      this.vaccines = data[0].vaccines;
      this.dewormings = data[0].dewormings;
      this.pet_sterelized = data[0].pet_sterelized;

    },err => {
      this.onEvent('error','Error en info wallet');
    });
  }

  checkboxSuscribe = false;

  createWallet(){

    this.disabledButton = true;
    this.presentLoading();

    let data = {
      "id":this.id,
      "name": this.name,
      "user_name":this.user_name,
      "email": this.email,
      "pet_name": this.pet_name,
      "pet_gender": this.pet_gender,
      "pet_birthday": this.pet_birthday,
      "pet_breed": this.pet_breed,
      "pet_specie": this.pet_specie ,
      "vaccines":this.vaccines?this.vaccines:'N/A',
      "dewormings":this.dewormings?this.dewormings:'N/A',
      "pet_sterelized": this.pet_sterelized,
      "vet_name": this.vet_name,
      "vet_id": this.vet_id,
    };

    this.dataService.createWallet(data).subscribe(data => {
      console.log(data);
      if(data.status == 200){
        this.loadingController.dismiss();
        this.onEvent('request','Envio wallet al correo');
        this.presentToast('Se envio la tarjeta digital a tu correo','success');
        this.close();
      }
    },err=>{
      console.log(err);
      this.onEvent('error','Error wallet al correo');
      this.disabledButton = false;
    });
  }


  updateInfo(){
    console.log(this.id);
    this.presentModal(UpdatePetPage,{id: this.id});
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

    modal.onDidDismiss().then((data) => {
      if(data['data']){
        this.getData();
      }
    });
    this.LogsActivity.stopLogging();
    return await modal.present();
  }


  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }

    onEvent(type,name) {
      this.LogsActivity.logEvent(type,name);
    }


}
