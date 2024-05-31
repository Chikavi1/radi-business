import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Share } from '@capacitor/share';
import { Browser } from '@capacitor/browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PhotoRoundedModalPage } from '../photo-rounded-modal/photo-rounded-modal.page';



declare var require: any;
const Hashids = require('hashids/cjs');
const hashids = new Hashids('Elradipet10Lt', 6,'ABCEIU1234567890');

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  edit=false;
  company:any = [];

  description;
  fb_url;
  ig_url;
  web_url;

  grantedOrg;

  grantedPayments;
  grantedEvents;
  grantedBusiness;
  grantedEditProfile;
  grantedCreateClients;

  vet_name;
  vet_id;

  constructor(private api:DataService,
    private navCtrl: NavController,
    private alertController:AlertController,
    private actionSheetController:ActionSheetController,
    private loadingController:LoadingController,
    private modalctrl:ModalController,private toastController:ToastController) {

      this.vet_name = localStorage.getItem('vet_name')
      this.vet_id = localStorage.getItem('vet_id')

    this.api.getCompany(localStorage.getItem('id_company')).subscribe(data => {
      console.log(data)
      this.company = data[0];
      localStorage.setItem('granted',JSON.stringify(this.company.granted));

      let granted = this.company.granted
      if(granted){
        this.grantedEvents = granted.includes('events')
        this.grantedOrg = granted.includes('orgs')
        this.grantedBusiness = granted.includes('business');
        this.grantedEditProfile = granted.includes('editpet');
        this.grantedCreateClients = granted.includes('createusers');
      }

      if(!localStorage.getItem('address')){
        localStorage.setItem('address',this.company.address);
      }

      this.description = this.company.description;
      this.fb_url = this.company.fb_url;
      this.ig_url = this.company.ig_url;
      this.web_url = this.company.web_url;

      // setTimeout(()=>{
      //   this.map.panTo(new L.LatLng(data[0].latitude,data[0].longitude));
      //   Leaflet.marker([data[0].latitude,data[0].longitude],{icon: this.homeICon}).addTo(this.map).bindPopup(data[0].address);
      // },1000)

    });
  }

  async share(){
   let hash = hashids.encode(this.company.id);

    await Share.share({
      title: 'Compartir tu perfil',
      text: 'Mira mi negocio en Radi Pets',
      url: 'https://radi.pet/pawtner/'+hash,
      dialogTitle: 'Compartir perfil',
    });
  }


  saveVetData(){
    localStorage.setItem('vet_id',this.vet_id);
    localStorage.setItem('vet_name',this.vet_name);

    this.presentToast('Se ha guardado exitosamente','success');
  }




  async setImage(){
    if(this.update){

      let options = [];
      options = [

      {
        text: 'Tomar foto',
        icon: 'camera',
        handler: () => {

          Camera.checkPermissions().then((res) => {
            if(res.camera != 'denied'){
              this.getPicture('camera');
            }else{
              alert('Necesitas autorizar los permisos');
            }
          })

        }
      },
      {
          text: 'Galeria',
          icon: 'image',
          handler: () => {
            Camera.checkPermissions().then((res) => {
              if(res.photos != 'denied'){
                this.getPicture('photos');
              }else{
               alert('Necesitas autorizar los permisos');
              }
              // alert(JSON.stringify(res));
            })
          }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }
    ];

    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una opción',
      mode: 'md',
      buttons: options
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();

    }
  }

  async getPicture(src){
    let source = src=='camera'?CameraSource.Camera:CameraSource.Photos;

    const image = await Camera.getPhoto({
      quality: 100,
      saveToGallery:true,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: source,
      promptLabelHeader: 'Carnet de la mascota',
      promptLabelCancel: 'Cancelar',
      promptLabelPhoto:  'Galeria',
      promptLabelPicture: 'Tomar Foto'
    });

    this.modalImage(image.base64String);
  }

  uploadPhoto;

  async modalImage(image){
    const modal = await this.modalctrl.create({
      component:PhotoRoundedModalPage,
      componentProps:{
        imageSend: image,
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        const image = data['data'];
        this.uploadPhoto = image;
        this.company.image = `data:image/jpeg;base64,`+image;
        this.uploadImage(this.uploadPhoto);
      }
    });
    return await modal.present();

  }

  uploadImage(photo){

    this.presentLoading();

    let data = {
      id: this.company.id,
      photo: photo
    }

    console.log(data)

    this.api.uploadCompanyImage(data).subscribe((data:any) => {
      if(data.url){
        this.loadingController.dismiss();
        localStorage.setItem('image',data.url)
        this.presentToast('Se ha actualizado exitosamente la foto de perfil, espera unos segundos para que se actualice','success');
      }
    });

  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Subiendo foto, un momento...',
      duration: 1200
    });
    loading.present();
  }


  update(){
  let data = {
    id: this.company.id,
    description: this.description,
    bg_color: this.company.bg_color,
    fn_color: this.company.fn_color,
    fb_url: this.fb_url,
    ig_url: this.ig_url,
    web_url: this.web_url
  }

    this.api.updateCompany(data).subscribe((data:any) => {
      if(data.status == 200){
        this.presentToast('Se ha actualizado correctamente.','success')
        this.close();
      }

      console.log(data);

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


  editing(){
    this.edit = !this.edit;
  }

  ngOnInit() {
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Eliminar cuenta',
      message: '¿Estás seguro? Esta acción no se puede deshacer.Ingresa la palabra eliminar',
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'Ingresa palabra'
        }
      ],
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (e) => {
            if(e.code.toLowerCase() === 'eliminar'){

              this.api.deleteCompany({id:localStorage.getItem('id_company')}).subscribe(data => {
                if(data.status == 200){
                  this.presentToast('Se ha eliminado la cuenta','success');
                  localStorage.clear();
                  window.location.reload();
                }
              })
            }else{
              // this.presentToast(this.deleteuser,'warning');
            }
          }
        }
      ]
    });

    await alert.present();
  }


  async openBlank(url){
    await Browser.open({ url });
  }

  close(){
    this.modalctrl.dismiss();
  }

}
