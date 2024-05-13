import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import * as moment from 'moment';
import { HistoryPage } from '../history/history.page';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  id;
  user:any = [];
  counter;
  age;


  segmentChange(event){
    // console.log(e);
    if(event.detail.value === 'visits'){
      this.getVisits();
    }

    if(event.detail.value === 'pets'){
      this.getPets();
    }
  }

  menu = 'info';
  interest:any = [];

  constructor(private api:DataService,private modalctrl:ModalController) { }
  records:any = [];
  pets:any = [];

getVisits(){
  this.api.getVisitsByUser({id_business: localStorage.getItem('id_company'), id_user: this.user.id}).subscribe(data => {
    console.log(data);
    this.records = data;
  });
}

getPets(){
  this.api.getPetsByUser(this.user.id).subscribe(data => {
    console.log(data);
    this.pets = data;

  });
}

async History(id){
  const modal = await this.modalctrl.create({
    component: HistoryPage,
    breakpoints: [1],
    initialBreakpoint: 1,
    componentProps:{
      id: id,
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

  ngOnInit() {

    let data = {
      id_user: this.id,
      id_business: localStorage.getItem('id_company')
    }
    this.api.getUsersById(data).subscribe((data:any) => {
      console.log(data);
      this.user = data.user[0];
      this.interest = JSON.parse(data.user[0].interest);
      this.interest = this.interest.join(', ')

      this.counter = data.count;
      if(this.user.birthday){
        this.age = moment().diff(this.user.birthday, 'years',false);
      }

    });

  }

  close(){
    this.modalctrl.dismiss();
  }
}
