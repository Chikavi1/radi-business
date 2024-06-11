import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ChangePasswordPage } from '../change-password/change-password.page';
import { SupportPage } from '../support/support.page';
import { BillingPage } from '../billing/billing.page';
import { InfoAppPage } from '../info-app/info-app.page';
import { Browser } from '@capacitor/browser';
import { ProfilePage } from '../profile/profile.page';
import { ConfigurationAppPage } from '../pages/configuration-app/configuration-app.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private navCtrl:NavController,private modalCtrl:ModalController) { }

  name;
  image;

  grantedPayments;


  ngOnInit() {
    let granted = localStorage.getItem('granted');
    if(granted){
      this.grantedPayments = granted.includes('payments')
    }

    this.name = localStorage.getItem('name');
    this.image = localStorage.getItem('image');
  }


  logout(){
    localStorage.removeItem('id_company');
    localStorage.removeItem('name');
    localStorage.removeItem('image');
    localStorage.removeItem('type');
    // localStorage.removeItem('email');
    localStorage.removeItem('customer');
    localStorage.removeItem('account');
    localStorage.removeItem('granted');
    localStorage.removeItem('address');

    localStorage.removeItem('name_organization');
    localStorage.removeItem('id_organization');

    this.navCtrl.navigateRoot('/login');
    this.close();

  }



  async openBlank(url){
    await Browser.open({ url });
  }

  profile(){
    this.openModal(ProfilePage)
  }

  infoApp(){
    this.openModal(InfoAppPage)
  }

  support(){
    this.openModal(SupportPage)
  }

  billing(){
    this.openModal(BillingPage)
  }

  app(){
    this.openModal(ConfigurationAppPage)
  }


  async openModal(Page){
    const modal = await this.modalCtrl.create({
      component: Page,
      breakpoints: [1],
      initialBreakpoint: 1,
      componentProps:{
        id:1,
      }
    });
    modal.onDidDismiss().then((data) => {

    });
    return await modal.present();
  }

  close(){
    this.modalCtrl.dismiss();
  }


  async changePass(){
    const modal = await this.modalCtrl.create({
      component: ChangePasswordPage,
      breakpoints: [1],
      initialBreakpoint:1,
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
}
