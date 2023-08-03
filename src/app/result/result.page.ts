import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import * as moment from 'moment';
import { HistoryPage } from '../history/history.page';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  visits:any = [];
  result:any = [];
  code:any;

  constructor(private api:DataService,
    private toastController:ToastController,
    private modalctrl:ModalController){ }
  btnCreate = true;
  goodbehavior = true;
  type;


  ngOnInit(){

    let data = {
      code:this.code,
      type:this.type
    }
    console.log(data);
    this.api.getPetInfo(data).subscribe(data => {
     this.result = data[0];

      let dataVisit = {
        id_user: this.result.id_user,
        id_pet: this.result.id_pet,
        id_business: localStorage.getItem('id_company')
      }

      this.api.visitsByUser(dataVisit).subscribe(data => {
        this.visits = data;
        if(this.visits.length != 0){
          let differenceHours = moment().diff(moment(this.visits[0].date), 'hours');
          this.btnCreate = (differenceHours > 24)?true:false;
        }else{
          this.btnCreate = true;
        }

        this.visits.forEach(data => {
          if(data.report_id){
            this.goodbehavior = false;
            return;
          }
        });

      });

    },error=>{
      this.result = [];
    }
  );
  }

  async History(id){
    const modal = await this.modalctrl.create({
      component: HistoryPage,
      breakpoints: [.75,1],
      initialBreakpoint: .75,
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

  addVisits(){
    let data = {
      'id_pet': this.result.id_pet,
      'id_user': this.result.id_user,
      'id_business': localStorage.getItem('id_company'),
      'description': 'Visita a '+localStorage.getItem('name'),
      'date': new Date(),
      'status': 1
    };

    this.api.createVisit(data).subscribe((data:any) => {
      if(data.status == 200){
        this.presentToast('Se ha creado la visita.','success')
        this.close();
        localStorage.setItem('updateVisits','true');

      }
    })

  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }

  close(){
    this.modalctrl.dismiss();
  }
}
