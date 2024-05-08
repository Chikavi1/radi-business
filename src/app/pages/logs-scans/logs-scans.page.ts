import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { CreateRewardPage } from 'src/app/create-reward/create-reward.page';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-logs-scans',
  templateUrl: './logs-scans.page.html',
  styleUrls: ['./logs-scans.page.scss'],
})
export class LogsScansPage implements OnInit {




rewards:any=[];

createModal(){
  this.openAdds(CreateRewardPage)
}

back(){
  this.navCtrl.back();
}

async openAdds(page){
  const modal = await this.modalCtrl.create({
    component: page,
    breakpoints: [1],
    initialBreakpoint: 1
  });

  modal.onDidDismiss().then((data) => {
   if(data['data']){
      // this.presentToast('Se ha creado exitosamente','success');
    }
  });

  return await modal.present();
}

  constructor(private api:DataService,
    private navCtrl:NavController,
    private modalCtrl:ModalController) {

    this.api.getRewards(localStorage.getItem('id_company')).subscribe(data => {
      console.log(data);
      this.rewards = data;
    });
  }
  step = 1;

  showUser(){
    this.step = 2;
  }


  ngOnInit() {
  }

  scan(id){

    let scanData = {
      code: '214024',
      user_id: 1,
      pet_id: 2
    }

    let data = {
      code: scanData.code,
      date: Date.now(),
      user_id: scanData.user_id,
      pet_id: scanData.pet_id,
      rewards_id: id
    }

    this.api.createRewardsLogs(data).subscribe(data=>{
      console.log(data);

    });

  }

}
