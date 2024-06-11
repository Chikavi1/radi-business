import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, NavController, ToastController } from '@ionic/angular';
import { LogsActivityService } from '../services/logs-activity.service';
import { DataService } from '../services/data.service';
import * as moment from 'moment';
import { CreateMembershipPage } from '../create-membership/create-membership.page';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.page.html',
  styleUrls: ['./membership.page.scss'],
})
export class MembershipPage implements OnInit {

  memberships:any = [];

  constructor(private navCtrl:NavController,
    private actionSheetController:ActionSheetController,
    private api: DataService,
    private modalCtrl:ModalController,
    private toastController:ToastController,
    private LogsActivity:LogsActivityService) {

   }

  ngOnInit(){
    this.LogsActivity.startLogging('membership');



    this.getMemberships();

  }

  sortMembershipsByNextDate(): void {
    this.memberships.sort((a, b) => {
      if (a.status === 1 && b.status === 1) {
        return moment(a.nextDate).diff(moment(b.nextDate));
      } else if (a.status === 1) {
        return -1;
      } else if (b.status === 1) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  addMembership(){
    this.onEvent('click','Agregar membresia');
    this.blockModal();
  }

  getMemberships(){
    let data = {
      "id": localStorage.getItem('id_company')
    };
    this.api.getMembership(data).subscribe( data => {
      console.log(data);
      this.memberships = data;
      this.calculateNextDate();
      this.sortMembershipsByNextDate();
    },err=> {
      console.log(err);
    });

  }


  async blockModal(){
    const modal = await this.modalCtrl.create({
      component: CreateMembershipPage,
      breakpoints: [ 1],
      initialBreakpoint: 1,
      backdropDismiss:true,
      canDismiss:true,
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){

        this.getMemberships();

      }
    });
    return await modal.present();
  }


  calculateNextDate(): void {
    this.memberships.forEach(membership => {
      if (membership.status === 1) {
        const startDate = moment(membership.start);
        const nextDate = startDate.add(membership.period, 'days');
        membership.nextDate = nextDate.format('YYYY-MM-DD');
      }
    });
  }

  editMembership(item){
    this.openEdit(item);
  }

  async openEdit(data){
    const modal = await this.modalCtrl.create({
      component: CreateMembershipPage,
      breakpoints: [ 1],
      initialBreakpoint: 1,
      backdropDismiss:true,
      canDismiss:true,
      componentProps: data
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        this.getMemberships();
      }
    });
    return await modal.present();
  }


  async presentActionSheet(data) {
    console.log(data);

    let options = [];
    options = [
    {
      text: 'Editar membresia',
      icon: 'create-outline',
      handler: () => {
        this.onEvent('click','Actualizar');

        // this.openEdit(id);
        this.editMembership(data);
      }
    },
    {
      text: 'Cambiar estatus',
      icon: 'alert-circle-outline',
      handler: () => {
        this.onEvent('click','cambiar estatus');

          let datarequest = {
            id: data.id,
            status: data.status == 1?0:1
          };

          this.api.updateMembership(datarequest).subscribe(data => {
            if(data.status == 200){
              const index = this.memberships.findIndex(d => d.id === datarequest.id);
              console.log(index);
              if (index !== -1) {
                this.memberships[index].status = datarequest.status;
              }
             this.presentToast('Se ha actualizado','success')
            }
          });

      }
    },
    {
      text: 'Cancelar',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        this.onEvent('click','Cancelar boton opciones');

      }
    }
  ];

    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una opción',
      mode:'md',
      buttons: options
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }


  close(){
    this.onEvent('close','close');

    this.LogsActivity.stopLogging();
    this.navCtrl.back();
  }


  onEvent(type,name) {
    this.LogsActivity.logEvent(type,name);
  }




}
