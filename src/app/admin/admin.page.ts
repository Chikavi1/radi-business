import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }

  goTo(p){
    this.navCtrl.navigateForward(p);
  }
}
