import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.page.html',
  styleUrls: ['./add-client.page.scss'],
})
export class AddClientPage implements OnInit {

  name;
  email;
  cellphone;

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  back(){
    this.modalCtrl.dismiss();
  }

  send(){
    console.log(this.name,this.email,this.cellphone)
  }

}
