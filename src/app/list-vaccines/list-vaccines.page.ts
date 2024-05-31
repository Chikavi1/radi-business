import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-list-vaccines',
  templateUrl: './list-vaccines.page.html',
  styleUrls: ['./list-vaccines.page.scss'],
})
export class ListVaccinesPage implements OnInit {

  constructor(private api: DataService,
    private modalCtrl:ModalController
  ) { }

  menu = "vaccine"
vaccines:any = [];
dewormings:any = [];
id_pet;

  ngOnInit(){

    console.log(this.id_pet,this.menu);
    this.api.getVaccines(this.id_pet).subscribe((data:any) => {
      console.log(data);
      data.forEach(element => {
        if(element.type == 1){
          this.vaccines.push(element);
        }else{
          this.dewormings.push(element);
        }
      });

    });
  }

  close(){
    this.modalCtrl.dismiss();
  }

}
