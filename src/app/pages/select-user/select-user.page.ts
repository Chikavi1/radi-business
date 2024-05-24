import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.page.html',
  styleUrls: ['./select-user.page.scss'],
})
export class SelectUserPage implements OnInit {

  constructor(
    private modalCtrl:ModalController,
    private api:DataService) { }
  users:any = [];
  ngOnInit() {
    this.api.getUsersFilterAlert(localStorage.getItem('id_company')).subscribe(data=>{
      this.users = data;
    });
  }

  close(name,id){
    this.modalCtrl.dismiss({
      id,
      name
    })
  }

  exit(){
    this.modalCtrl.dismiss();
  }
}
