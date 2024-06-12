import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { DataService } from './services/data.service';
import { ModalBlockPage } from './modal-block/modal-block.page';
import { register } from 'swiper/element/bundle';
import { ResultPage } from './result/result.page';
import { TranslateService } from '@ngx-translate/core';
import { LogsActivityService } from './services/logs-activity.service';


register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router:Router,
    private translateService:TranslateService,
    private LogsActivity: LogsActivityService,
    private modalCtrl:ModalController,private api:DataService,private platform:Platform){
      this.translate();
    this.checkDevice();
      if(localStorage.getItem('id_company')){

      console.log(this.LogsActivity.getTotalDuration(),this.LogsActivity.getPageVisits(),this.LogsActivity.countEventsOfType('request'));

        this.api.checkStatus({id:localStorage.getItem('id_company')}).subscribe((data:any) => {
          console.log(data);

          if(data.status == 0){
            this.blockModal(0)
          }
          if(data.status == 2){
            this.blockModal(2)
          }
          localStorage.setItem('granted',data.granted);
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
      breakpoints: [1],
      initialBreakpoint: 1,
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

  translate(){
    this.translateService.addLangs(['es']);
    let language = localStorage.getItem('language')?localStorage.getItem('language'):'es';
    this.translateService.setDefaultLang(language);
    this.translateService.currentLang = language;
  }

}
