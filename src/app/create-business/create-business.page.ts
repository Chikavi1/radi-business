import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-business',
  templateUrl: './create-business.page.html',
  styleUrls: ['./create-business.page.scss'],
})
export class CreateBusinessPage implements OnInit {

  name;
  email;
  password;
  granted;
  type = 4;
  description;
  fb_url;
  ig_url;
  web_url;
  status = 1;

  clients:any = [];

  constructor(private api:DataService,private modalCtrl:ModalController){

  }

  close(){
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

  create(){
    let data = {
      name: this.name,
      email: this.email,
      password: this.password,
      granted: JSON.stringify(this.granted),
      type: this.type,
      description: this.description,
      fb_url: this.fb_url,
      ig_url: this.ig_url,
      web_url: this.web_url,
      status: 1
    }
    console.log(data);

    this.api.createBusiness(data).subscribe(data => {
        if(data.status == 200){
          this.close();
        }
    });

  }
}
