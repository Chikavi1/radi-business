import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-create-achivement',
  templateUrl: './create-achivement.page.html',
  styleUrls: ['./create-achivement.page.scss'],
})
export class CreateAchivementPage implements OnInit {

  // achivements = [
  //   {
  //     image:'https://i.ibb.co/JjgPLng/1.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/yqZDZBj/2.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/BPfsTNk/3.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/dMjSQGT/4.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/K6kqn1g/5.png'
  //   },

  //   {
  //     image:'https://i.ibb.co/nBkgGMs/6.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/TkTC6Wk/7.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/sVSy86w/8.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/wJpdqC8/9.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/cTD5gvm/10.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/9hspPVk/11.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/hRn4xg1/12.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/XJvPFWj/13.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/2NY781k/14.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/zZ6ndM7/15.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/rty2PWQ/16.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/K6hqYBQ/17.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/WKR9MSv/18.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/SvmfJw2/19.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/xYHwvtW/20.png'
  //   },

  //   {
  //     image:'https://i.ibb.co/WfZjYYG/21.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/JjjXmmk/22.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/CH8LqyT/23.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/T1GQBmZ/24.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/kh49CfH/25.png'
  //   },

  //   {
  //     image:'https://i.ibb.co/vhwXHVM/26.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/R0h8TD7/27.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/ygfCFH5/28.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/JtX1hMd/29.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/gwBXYFd/30.png'
  //   },

  //   {
  //     image:'https://i.ibb.co/41vYDQS/31.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/6JN0M6Q/32.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/R3v9XJP/33.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/rcYkxpF/34.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/D7xS96w/35.png'
  //   },

  //   {
  //     image:'https://i.ibb.co/2tShGGS/36.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/Vx4q6LC/37.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/3CdX8R0/38.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/JcWz7cb/39.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/SQv174W/40.png'
  //   },


  //   {
  //     image:'https://i.ibb.co/xXC4XpQ/41.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/7rB3bqx/42.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/C18BhbZ/43.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/RNSCfQ5/44.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/6m8mCrG/45.png'
  //   },

  //   {
  //     image:'https://i.ibb.co/f1GfcfF/46.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/LJdTJck/47.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/4JnFYtv/48.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/VwkT2J9/49.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/JtsGXtJ/50.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/SxMTMsP/51.png'
  //   },
  //   {
  //     image:'https://i.ibb.co/xhVJZ97/52.png'
  //   }
  // ]

  selected;

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
    this.id;
    this.pet_id;
    console.log(this.id,this.pet_id);

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
