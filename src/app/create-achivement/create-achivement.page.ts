import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-create-achivement',
  templateUrl: './create-achivement.page.html',
  styleUrls: ['./create-achivement.page.scss'],
})
export class CreateAchivementPage implements OnInit {

  selected;
  user_id;

  close(status){
    this.modalCtrl.dismiss(status);
  }

  achivements:any = [];

  constructor(private api:DataService, private modalCtrl:ModalController){

    this.api.getAchiviments(localStorage.getItem('type')).subscribe(data => {
      console.log(data);
      this.achivements = data;
    });
   }

   id;
   pet_id;

  ngOnInit() {
    // console.log(this.user_id);

    this.id;
    this.pet_id;
    console.log(this.id,this.pet_id,this.user_id);

  }
  idSelected
  selectA(items){
    this.selected = items;
    this.idSelected = this.selected.id
  }

  btnDisabled = false;


  create(){
    this.btnDisabled = true;

    let data = {
      id_pet: this.pet_id,
      id_business: localStorage.getItem('id_company'),
      id_visit: this.id,
      id_user: this.user_id,
      business_name: localStorage.getItem('name'),
      id_achivement: this.idSelected,
      status: 1,
      date: new Date()
    }
    this.api.createAchivement(data).subscribe(result => {
      console.log(result);
      this.close(true);
    });
  }

}
