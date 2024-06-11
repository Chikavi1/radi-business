import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PaymentsPage } from '../payments/payments.page';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { MethodPaymentsPage } from '../method-payments/method-payments.page';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {

  plans:any= [];
  success;
  views;

  PLAN_INDIVIDUAL = 'prod_QGZ6T1W3TRxy9T'
  PLAN_BUSINESS = 'prod_QGZ6cHfp1xLxIB'
  PLAN_COMPANY = 'prod_QGZ7zPuqNGhcH8'

  suscriptions:any = [];

  constructor(private api:DataService,
    private navCtrl:NavController,
    private alertController:AlertController,
    private modalCtrl:ModalController) {

    this.success  = {
      path: '../../../assets/lotties/success.json',
      autoplay: true,
      loop: false
    }

    this.getSubscriptions();


  }


  getSubscriptions(){

    this.api.getSubscriptions(localStorage.getItem('customer')).subscribe(data => {
      if(data.length != 0){
        this.views = 'see';
        console.log(data);
        this.suscriptions = data;
      }else{
        this.views = 'create';
        this.getPlans();
      }
    });
  }

  updagredPlan(id,plan){
    this.views = 'create';
    this.idsuscription = id;
    this.old_plan = plan;
    console.log(this.old_plan);

    this.getPlans();
  }


  async reactivateAlert(id){
    const alert = await this.alertController.create({
      header: '¿seguro que quieres reactivar la suscripción?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Si,reactivar',
          role: 'confirm',
          handler: () => {

            let data = {
              id: id
            }
            this.api.reactiveSuscription(data).subscribe(data => {
              console.log(data);
              this.getSubscriptions();
            })
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async cancelAlert(id) {
    const alert = await this.alertController.create({
      header: '¿seguro que quieres cancelar la suscripción?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Hecho',
          role: 'confirm',
          handler: () => {

            let data = {
              id: id
            }
            this.api.cancelSubscription(data).subscribe(data => {
              console.log(data);
              this.getSubscriptions();
            })
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  getPlans(){
    let data = {
      currency: this.currency.toLowerCase(),
      type: 'business'
    }


    this.api.planList(data).subscribe(data => {
      console.log(data);
      this.plans = data;
    });
  }

  step = 1;
  plans_type = 'free';
  card:any = [];

  total;
  currency = 'mxn';

  code;
  product;
  btnValidate = false;
  price_id;
  showCodeInput = false;
  codeValid;


  payment;
  method_payment;

  goToPayments(){
    this.goToModal(MethodPaymentsPage,{});
  }

  async goToModal(component,data){
    const modal = await this.modalCtrl.create({
      component: component,
      breakpoints: [1],
      componentProps: data,
      initialBreakpoint: 1,
      backdropDismiss:true,
      cssClass: 'small-modal'
    });

    modal.onDidDismiss().then((data) => {
      this.getCards();
      this.payment = localStorage.getItem('method_payment');
      this.method_payment = localStorage.getItem('method_payment');
    });
    return await modal.present();
  }


  selectPlan(price,product,amount){
    this.price_id = price;
    this.product = product;
    this.total = amount;
    console.log(price,product,amount);

    this.next()
  }

  openCode(){
    this.showCodeInput = !this.showCodeInput;
  }

  old_plan;

  validateCode(){
    this.btnValidate = true;

    console.log(this.code);
    let data = {
      product_id: this.product,
      coupon_id: this.code
    }

    this.api.validateCoupon(data).subscribe(data => {
      if(data.status == 200){
        let coupon = data.data;
        this.codeValid = 'true';
        let total = this.total;

        if(coupon.amount_off !== null) {
          total -= coupon.amount_off;
        }else if (coupon.percent_off !== null) {
          total *= (1 - coupon.percent_off / 100);
        }

        this.total = total;

      }else{
        this.codeValid = 'false';
      }
      this.btnValidate = false;

    },err => {
      this.btnValidate = false;
      this.codeValid = 'false';
    });
  }

idsuscription;

  createPlan(){

    if(!this.idsuscription){
      let data = {
        customer: localStorage.getItem('customer'),
        price: this.price_id,
        coupon: this.code
      };

      this.api.createSuscriptionPlan(data).subscribe(data => {
        let namePlan = this.getNameOfPlan(data.plan.product);

        let databusiness = {
          id: localStorage.getItem('id_company'),
          plan: namePlan
        }

        this.api.updateCompany(databusiness).subscribe(data => {
          console.log(data);
          localStorage.setItem('plan',namePlan);
        })

        localStorage.setItem('plan',namePlan);
        this.next();
      });
    }else{

      let data = {
        subscriptionId: this.idsuscription,
        newPriceId: this.price_id
      }


      this.api.updatedSuscriptionPlan(data).subscribe(data=>{
        console.log(data);
        let namePlan = this.getNameOfPlan(data.plan.product);

        let databusiness = {
          id: localStorage.getItem('id_company'),
          plan: namePlan
        }

        this.api.updateCompany(databusiness).subscribe(data => {
          console.log(data);
          localStorage.setItem('plan',namePlan);

        })

        this.next();
      });


    }


  }

  productNames = {
    PLAN_INDIVIDUAL : 'Individual',
    PLAN_BUSINESS: 'Business',
    PLAN_COMPANY: 'Companies'
  };

  getNameOfPlan(product: string): string {
    return this.productNames[product] || 'Unknown Plan';
  }


  finish(){
    window.location.reload();
  }

  back(){
    this.step = 1;
  }

  ngOnInit(){
    this.getCards()
  }

  close(){
    this.navCtrl.navigateBack('/tabs/tab1');

  }

  next(){
    this.step += 1;
    this.getCards()
  }

  getCards(){
    this.api.getCustomerCards(localStorage.getItem('customer')).subscribe(data => {
      if (data && data.data && data.data[0] && data.data[0].card) {
        this.card = data.data[0].card;
      } else {
        console.log('No se pudo acceder a la tarjeta');
        this.card = null; // o algún valor por defecto
      }    });
  }


}
