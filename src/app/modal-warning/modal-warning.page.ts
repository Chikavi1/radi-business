import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-modal-warning',
  templateUrl: './modal-warning.page.html',
  styleUrls: ['./modal-warning.page.scss'],
})
export class ModalWarningPage implements OnInit {
  // path: 'https://assets2.lottiefiles.com/packages/lf20_iaPjrMEc3H.json',


  warning: AnimationOptions;
  constructor(private modalCtrl:ModalController) {
   }

  title;
  subtitle;
  cancel_text;
  done_text;
  path;

  lottie;

  ngOnInit(){
    // if(this.path == 'warning'){
    //   this.lottie = '../../../assets/lotties/warning.json'
    // }

    // if(this.path == 'pending'){
    // }
    this.lottie = '../../../assets/lotties/'+this.path+'.json'

  this.warning  = {
      path: this.lottie,
      autoplay: true,
      loop: true
    }

  }

  close(type){
    this.modalCtrl.dismiss(type);
  }
}
