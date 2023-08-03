import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router:Router,private platform:Platform){
    this.checkDevice();
      if(localStorage.getItem('id_company')){
        this.router.navigateByUrl('/');
      }else{
        this.router.navigateByUrl('/login')
    }
  }

  async checkDevice(){
    if(this.platform.width() > 800){
      localStorage.setItem('device','tablet');
    }else{
      localStorage.setItem('device','phone');

    }
  }
}
