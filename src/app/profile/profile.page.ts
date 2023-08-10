import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Browser } from '@capacitor/browser';
import { InfoAppPage } from '../info-app/info-app.page';
import { Share } from '@capacitor/share';
import { ChangePasswordPage } from '../change-password/change-password.page';


declare var require: any;
const Hashids = require('hashids/cjs');
const hashids = new Hashids('Elradipet10Lt', 6,'ABCEIU1234567890');

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  edit=false;
  company:any = [];

  description;
  fb_url;
  ig_url;
  web_url;

  constructor(private api:DataService,
    private navCtrl: NavController,
    private modalctrl:ModalController,private toastController:ToastController) {
    this.api.getCompany(localStorage.getItem('id_company')).subscribe(data => {
      this.company = data[0];

      this.description = this.company.description;
      this.fb_url = this.company.fb_url;
      this.ig_url = this.company.ig_url;
      this.web_url = this.company.web_url;

      // setTimeout(()=>{
      //   this.map.panTo(new L.LatLng(data[0].latitude,data[0].longitude));
      //   Leaflet.marker([data[0].latitude,data[0].longitude],{icon: this.homeICon}).addTo(this.map).bindPopup(data[0].address);
      // },1000)

    });
  }

  async share(){
   let hash = hashids.encode(this.company.id);

    await Share.share({
      title: 'Compartir tu perfil',
      text: 'Mira mi negocio en Radi Pets',
      url: 'https://radi.pet/discount-business/'+hash,
      dialogTitle: 'Compartir perfil',
    });
  }


  logout(){
    localStorage.removeItem('id_company');
    localStorage.removeItem('name');
    localStorage.removeItem('image');
    localStorage.removeItem('type');
    localStorage.removeItem('email');

    this.navCtrl.navigateRoot('/login');
    this.close();

  }


  async changePass(){
    const modal = await this.modalctrl.create({
      component: ChangePasswordPage,
      breakpoints: [.95,1],
      initialBreakpoint: .95,
      componentProps:{
        id:1,
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

  async infoApp(){
    const modal = await this.modalctrl.create({
      component: InfoAppPage,
      breakpoints: [.95,1],
      initialBreakpoint: .95,
      componentProps:{
        id:1,
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

  update(){
  let data = {
    id: this.company.id,
    description: this.description ,
    fb_url: this.fb_url,
    ig_url: this.ig_url,
    web_url: this.web_url
  }

    this.api.updateCompany(data).subscribe((data:any) => {
      if(data.status == 200){
        this.presentToast('Se ha actualizado correctamente.','success')
        this.close();
      }

      console.log(data);

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


  editing(){
    this.edit = !this.edit;
  }

  ngOnInit() {
  }

  async openBlank(url){
    await Browser.open({ url });
  }


  close(){
    this.modalctrl.dismiss();
  }

}
