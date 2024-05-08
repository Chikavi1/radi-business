import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from '../services/data.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-reward',
  templateUrl: './create-reward.page.html',
  styleUrls: ['./create-reward.page.scss'],
})
export class CreateRewardPage implements OnInit {
  description;
  count = 10;
  finish_date;
  today;
  max;

  constructor(private api:DataService,private modalCtrl:ModalController) {
    this.finish_date = moment().format();
    this.today = moment().format();
    this.max = moment().add(5,'years').format();
  }

  back(){
    this.modalCtrl.dismiss();
  }

  create(){
    let data = {
      id_business: localStorage.getItem('id_company'),
      description: this.description,
      count:       this.count,
      finish_date: this.finish_date,
    }

    this.api.createRewards(data).subscribe(data => {
      console.log(data);
    })
  }

  ngOnInit() {
  }

}
