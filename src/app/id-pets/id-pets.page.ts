import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
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
    private toastController: ToastController,
    private barcodeScanner: BarcodeScanner,
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

  scan(){

    this.barcodeScanner.scan({disableSuccessBeep: true}).then(barcodeData => {
      let code = barcodeData.text.split('https://radi.pet/pets/')
      let data = {
        id: hashids.decode(this.id)[0],
        code: code[1]
      }
      this.dataService.associatedId(data).subscribe((result:any) => {
        if(result.status == 200){
          this.verified = true;
          this.presentToast('Se ha vinculado exitosamente','success');
          this.modalCtrl.dismiss(data);
        }

        if(result.status == 503){
          this.presentToast('No se puede asociar','warning');
        }
      },err => {
        this.presentToast('No se puede asociar','warning');
      })
    }).catch(err => {
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
