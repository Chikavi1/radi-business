import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { DataService } from './services/data.service';
import { ModalBlockPage } from './modal-block/modal-block.page';
import { register } from 'swiper/element/bundle';
import { ResultPage } from './result/result.page';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router:Router,private modalCtrl:ModalController,private api:DataService,private platform:Platform){

    this.checkDevice();
      if(localStorage.getItem('id_company')){

        this.api.checkStatus({id:localStorage.getItem('id_company')}).subscribe((data:any) => {
          if(data[0].status == 0){
            this.blockModal(0)
          }
          if(data[0].status == 2){
            this.blockModal(2)
          }
          localStorage.setItem('granted',data[0].granted);
        });

        this.router.navigateByUrl('/');
      }else{
        this.router.navigateByUrl('/login')
    }
    // this.openResult('app','214904');
  }

  async checkDevice(){
    if(this.platform.width() > 800){
      localStorage.setItem('device','tablet');
    }else{
      localStorage.setItem('device','phone');

    }
  }

  async blockModal(id){
    const modal = await this.modalCtrl.create({
      component: ModalBlockPage,
      breakpoints: [ 1],
      initialBreakpoint: 1,
      backdropDismiss:true,
      canDismiss:false,
      componentProps:{
        id: id,
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){

      }
    });
    return await modal.present();
  }

  async openResult(modeRead,code){
    console.log(modeRead,code);

    const modal = await this.modalCtrl.create({
      component: ResultPage,
      breakpoints: [.95,1],
      initialBreakpoint: .95,
      componentProps:{
        modeRead: modeRead,
        code: code,
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
      }
    });
    return await modal.present();
  }

}
