import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';


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


  constructor(
    public modalCtrl: ModalController,
    public  dataService:  DataService,
    private platform:Platform,
    private toastController: ToastController,
    private alertController:AlertController
    ){
    }

    async delete(){
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
      if(data.length == 0){
        this.verified = false;
      }else{
        this.verified = true;
        this.date = data[0].redeemed_date;
      }
    });
  }

  async scan(){
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
          this.presentToast('Se ha vinculado exitosamente','success');
          localStorage.setItem('updatePets','true');
          this.modalCtrl.dismiss(data);
        }

        if(result.status == 503){
          this.presentToast('No se puede asociar','warning');
        }
      },err => {
        console.log(err)
        this.presentToast('No se puede asociar','warning');
      })
  }

  close(){
    this.modalCtrl.dismiss();
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
