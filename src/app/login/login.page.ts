import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import jwt_decode from "jwt-decode";
import { RegisterPage } from '../pages/register/register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email;
  password;
  device;

  constructor(private api:DataService,
    private loadingController:LoadingController,
    private toastController: ToastController,
    private modalCtrl:ModalController,
    private navCtrl:NavController) {
     this.device = localStorage.getItem('device');
     this.email  = localStorage.getItem('email')?localStorage.getItem('email'):''
    }

  ngOnInit() {
  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Verificando identidad',
      duration: 3500
    });
    loading.present();
  }

  login(){
    this.presentLoading();

    let data = {
      email: this.email,
      password: this.password
    }

    this.api.loginBusiness(data).subscribe((data:any) => {
      this.loadingController.dismiss();

      var decoded:any = jwt_decode(data.token);
      console.log(decoded);
      console.log(data);

      localStorage.setItem('id_company',decoded.id);
      localStorage.setItem('name',decoded.name);
      localStorage.setItem('image',decoded.image);
      localStorage.setItem('email',decoded.email);
      localStorage.setItem('account',decoded.account);
      localStorage.setItem('customer',decoded.customer);
      localStorage.setItem('granted',decoded.granted);
      localStorage.setItem('address',decoded.address);
      localStorage.setItem('plan',decoded.plan);

      this.navCtrl.navigateRoot('/')
    },err => {
      console.log(err);
      this.password = '';
      this.presentToast('Credenciales incorrectas','danger');

    });
  }

 async register(){
    const modal = await this.modalCtrl.create({
      component: RegisterPage,
      breakpoints: [1],
      initialBreakpoint: 1,
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
      }
    });
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
}
