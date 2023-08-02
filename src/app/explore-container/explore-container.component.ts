import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';
import { QrcodeappPage } from '../qrcodeapp/qrcodeapp.page';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {

  name;
  image;
  constructor(private modalCtrl:ModalController){
    this.name = localStorage.getItem('name');
    this.image = localStorage.getItem('image');
  }

  async Profile(){
    const modal = await this.modalCtrl.create({
      component: ProfilePage,
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

  async qrcodeapp(){
    const modal = await this.modalCtrl.create({
      component: QrcodeappPage,
      breakpoints: [,1],
      initialBreakpoint: 1
    });

    return await modal.present();
  }

}
