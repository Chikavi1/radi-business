import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import jwt_decode from "jwt-decode";

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
    private toastController: ToastController,
    private navCtrl:NavController) {
     this.device = localStorage.getItem('device');
    }

  ngOnInit() {
  }

  login(){

    let data = {
      email: this.email,
      password: this.password
    }

    this.api.loginBusiness(data).subscribe((data:any) => {
      var decoded:any = jwt_decode(data.token);
      localStorage.setItem('id_company',decoded.id);
      localStorage.setItem('name',decoded.name);
      localStorage.setItem('image',decoded.image);
      localStorage.setItem('type',decoded.type);
      localStorage.setItem('email',decoded.email);
      localStorage.setItem('granted',decoded.granted);
      this.navCtrl.navigateRoot('/')
    },err => {
      console.log(err);
      this.presentToast('Credenciales incorrectas','danger');

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
