import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage  {
  isForgot;
  token;
  data;

  errorMessages;
  errorequired;
  errorrequiredconfirm;
  miniumerror;
  successchange;
  errorchange;
  passwordnomatch;
  passwordequal;

  new_password="";
  password="";
  new_passwordReset;


  device;

  showPassword = false;
  showPassword2;

  constructor(
    private api: DataService,
    private modalCtrl:ModalController,
    public toastController: ToastController,
    ) {
      this.showPassword = false;
      this.showPassword2 = false;
      this.device = localStorage.getItem('device');

    }



    toggleShow() {
      this.showPassword = !this.showPassword;
    }

    toggleShow2() {
      this.showPassword2 = !this.showPassword2;
    }




  update(){

    console.log(this.new_password, this.password)

      if(this.new_password == this.password){
        return this.presentToast(this.passwordequal,'warning')
      }

      this.api.changePassword({
        id:           localStorage.getItem('id_company'),
        password:     this.password,
        new_password: this.new_password
      }).subscribe( (data) =>{
          // this.registrationForm.reset();
          this.presentToast('Se ha actualizado correctamente','success');
          this.beforePage();
      },err=>{
        console.log(err);
        this.presentToast('Hubo un error intente luego','warning');
      });

  }

  beforePage(){
    this.modalCtrl.dismiss();
  }

  backTab3(){
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }


}
