import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { CardPage } from '../card/card.page';

@Component({
  selector: 'app-method-payments',
  templateUrl: './method-payments.page.html',
  styleUrls: ['./method-payments.page.scss'],
})
export class MethodPaymentsPage implements OnInit {
  customer_id;

  constructor(private modalCtrl:ModalController,
    private api: DataService
  ){
    this.customer_id =  localStorage.getItem('customer');
    this.getCards();
  }

  ngOnInit() {
  }

  exit(){
    this.modalCtrl.dismiss();
  }

  // this.presentModal(CardPage,1);

  cards:any = [];
  getCards(){
    this.api.getCustomerCards(this.customer_id).subscribe( cards => {
      console.log(cards);
      this.cards = cards.data;
    });
  }

  async addCard(){
    this.presentModal(CardPage,1);
  }

  delete(item,customer_id,card_id){
    let index = this.cards.indexOf(item);
    if(index > -1){
      this.cards.splice(index, 1);
    }
    let data = {
      customerId:customer_id,
      cardId:card_id
    }
    this.api.deleteCard(data).subscribe( datos => {
    });
  }


  updateDefaultCard(customer_id,card_id){
    localStorage.setItem('method_payment','1');
    let data = {
      customerId:customer_id,
      cardId:card_id
    }


    this.api.updateCustomer(data).subscribe( datos => {

    });
    this.getCards();
    this.exit();
  }

  async presentModal(component,type) {
    const modal = await this.modalCtrl.create({
      component: component,
      componentProps: {
        type
      }
    });
      modal.onDidDismiss().then( () => {
        this.getCards();
      });
    return await modal.present();
  }
}
