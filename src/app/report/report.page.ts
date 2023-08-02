import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  constructor(private api:DataService,private modalCtrl:ModalController) { }

  description;
  ngOnInit() {

  }

  pet_id;
  user_id
  id;

  send(){
    let data = {
      id_visit: this.id,
      pet_id: this.pet_id,
      user_id: this.user_id,
      id_business: localStorage.getItem('id_company'),
      description: this.description,
      status: 1
    }

    this.api.createReport(data).subscribe(data => {
      console.log(data);
      this.modalCtrl.dismiss(1);
    });
  }

  close(){
    this.modalCtrl.dismiss();
  }

}
