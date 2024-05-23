import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name;
  description;
  address;
  category = "2";

  web_url;
  fb_url;
  ig_url;

  email;
  password;



  constructor(private modalCtrl:ModalController,
    private navCtrl:NavController,
    private toastController:ToastController,
    private api:DataService
  ) { }

  ngOnInit() {
  }

  close(){
    this.modalCtrl.dismiss();
  }
  disabledButton = false;
  create(){
    this.disabledButton = true;

    let data = {
      name: this.name,
      description:this.description,
      category: this.category,
      address: this.address,

      web_url: this.web_url,
      fb_url: this.fb_url,
      ig_url: this.ig_url,

      email: this.email,
      password: this.password
    }

    this.api.createCompany(data).subscribe(data => {
      console.log(data);
      if(data){
        localStorage.setItem('id_company',data.id);
        localStorage.setItem('name',data.name);
        localStorage.setItem('image',data.image);
        localStorage.setItem('email',data.email);
        localStorage.setItem('account',data.account);
        localStorage.setItem('customer',data.customer);
        localStorage.setItem('granted',data.granted);
        this.navCtrl.navigateRoot('/');
      }

      this.modalCtrl.dismiss();
    },err=>{
      this.disabledButton = true;
      this.presentToast('Ya existe cuenta con ese correo','danger');

    });
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
