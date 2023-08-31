import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import * as moment from 'moment';

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

  constructor(private api:DataService,private modalctrl:ModalController) { }

  ngOnInit() {

    let data = {
      id_user: this.id,
      id_business: localStorage.getItem('id_company')
    }
    this.api.getUsersById(data).subscribe((data:any) => {
      console.log(data);
      this.user = data.user[0];
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
