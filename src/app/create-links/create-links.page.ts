import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Clipboard } from '@capacitor/clipboard';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-create-links',
  templateUrl: './create-links.page.html',
  styleUrls: ['./create-links.page.scss'],
})
export class CreateLinksPage implements OnInit {
  url;
  code;
  isEdit=false;
  id;

  constructor(private api:DataService,private modalCtrl:ModalController,private toastController:ToastController) { }

  ngOnInit() {
    this.api.checkLink({code:this.code}).subscribe(data => {
      this.isEdit = (data[0].url)?true:false;
      this.url = data[0].url;
      this.id = data[0].id;
    });

  }

  async getcopyinfo(){
    const { type, value } = await Clipboard.read();
    this.url = value.trim();
    };

    update(){

      let link = {
        id: this.id,
        url: this.url
      }

      this.api.updateLinks(link).subscribe(data =>{
        console.log(data);
        if(data.status == 200){
          this.presentToast('Se ha actualizado exitosamente.','success');
          this.close();
        }
      });
    }

    createOrUpdate(){
      if(this.isEdit){
        this.update();
      }else{
        this.create();
      }
    }

    create(){
      let link = {
        code: this.code,
        url: this.url
      }

      this.api.createLinks(link).subscribe(data =>{
        if(data.status == 200){
          this.presentToast('Se ha creado exitosamente.','success');
          this.close();
        }
      });
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
    this.modalCtrl.dismiss();
  }
}
