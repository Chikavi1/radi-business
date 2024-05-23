import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Stripe } from '@awesome-cordova-plugins/stripe/ngx';
const STRIPE_PUBLIC_KEY = 'pk_live_51KsA9rBp6uwr6porsLeNx9LTinc5UlLigLVda6w2RSnXJon8rlNOHJKLTtJIQEPc5Rsx5iPytfFhlOV2wutNdZEv00J6YxosX1';
import { isValid } from 'cc-validate';


@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {
  sendData = true;


  cardDetails:any = {};
  cardYears:number[] = [];
  numero:string;
  titular:string;
  expiration:string;
  cvc:string;
  month:any;
  year:any;
  card_expiration:string;

  yearLimitIonDateTime;

  logoimg = null;
  mindate;
  type;
  code = '';

  device;
  redeemsuccess;
  redeemfailed;
  incorrect_number;
  card_declined;
  invalid_cvc;
  invalid_expiry_month;
  loadcard;

  translate(){


    this.translateService.get('cards.loadcard').subscribe(value => {
      this.loadcard = value;
    });

    this.translateService.get('addcard.successredeem').subscribe(value => {
      this.redeemsuccess = value;
    });

    this.translateService.get('addcard.incorrect_number').subscribe(value => {
      this.incorrect_number = value;
    });

    this.translateService.get('addcard.failedredeem').subscribe(value => {
      this.redeemfailed = value;
    });

    this.translateService.get('addcard.card_declined').subscribe(value => {
      this.card_declined = value;
    });

    this.translateService.get('addcard.invalid_cvc').subscribe(value => {
      this.invalid_cvc = value;
    });

    this.translateService.get('addcard.invalid_cvc').subscribe(value => {
      this.invalid_cvc = value;
    });
    this.translateService.get('addcard.invalid_expiry_month').subscribe(value => {
      this.invalid_expiry_month = value;
    });
  }
  btnenabled;

  constructor(

    private modalCtrl: ModalController,
    private api: DataService,
    private stripe: Stripe,
    private loadingController:LoadingController,
    private translateService: TranslateService,
    private toastController:ToastController){
      this.translate();
    this.device = localStorage.getItem('device');

    this.stripe.setPublishableKey(STRIPE_PUBLIC_KEY);

    this.mindate = moment().format('YYYY-MM-DD');
    this.yearLimitIonDateTime = moment().year()+8;
  }

  ngOnInit() {
    this.getYears();
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  exit(){
    this.modalCtrl.dismiss();
  }
  getYears(){
    const currentYear = new Date().getFullYear();
    for(let i=0; i<10;i++){
      this.cardYears.push(currentYear + i)
    }
  }

  onEvent(event: KeyboardEvent) {
    let result: any = isValid(this.numero);
    if(result.isValid){
      this.logoimg = result.cardType;
    }
    const input = event.target as HTMLInputElement;

    let trimmed = input.value.replace(/\s+/g, '');
    if (trimmed.length > 16) {
      trimmed = trimmed.substr(0, 16);
    }

    let numbers = [];
    for (let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substr(i, 4));
    }

    input.value = numbers.join(' ');

  }

   GetCardType(number){
    let result: any = isValid(number);
    if(result.isValid){
      this.logoimg = result.cardType;
    }
  }

  ParseDataTimeToCardExpiration(date) {
    this.month =  moment(date).month()+1;
    this.year =  moment(date).year();
    this.card_expiration = this.month+'/'+this.year;
 }

 canjear(){
  this.sendData = false;
  let data = {
    code: this.code,
    user_id: localStorage.getItem('user_id')
  }
  // this.api.useGift(data).subscribe((data:any) => {
  //   if(data.status === 200){

  //     this.presentToast(this.redeemsuccess,'success');
  //     this.exit();
  //   }
  // },err => {
  //    this.sendData = true;
  //    this.presentToast(this.redeemfailed,'danger')
  //  });
 }


 async presentLoading(){
  const loading = await this.loadingController.create({
    message:  this.loadcard,
    duration: 3000
  });
  loading.present();
}


 agregarTarjeta(){
  this.btnenabled = false;
  this.presentLoading();
    this.cardDetails = {
      number: this.numero,
      expMonth: this.month,
      expYear: this.year,
      cvc: this.cvc
    }
    this.stripe.createCardToken(this.cardDetails)
    .then(token => {

     let datos =  {
        customerId: localStorage.getItem('customer'),
        token: token.id
     }

      this.api.addCard(datos).subscribe(data => {
          this.loadingController.dismiss();
          this.exit();
        },
        err => {
          this.btnenabled = true;
          console.log(err);
          if(err.error.code === "invalid_cvc"){
            this.presentToast(this.invalid_cvc,'danger');
          }
        }
      );
    }).catch(error =>{
      console.error(error)
      this.btnenabled = true;
          if(error.code == "incorrect_number"){
            this.presentToast(this.incorrect_number,'danger');
          }
          if(error.code == "card_declined"){
            this.presentToast(this.card_declined,'danger');
          }
          if(error.code == "invalid_cvc"){
            this.presentToast(this.invalid_cvc,'danger');
          }
          if(error.code == "invalid_expiry_month"){
            this.presentToast(this.invalid_expiry_month,'danger');
          }
    }
    );
 }



   async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }



}
