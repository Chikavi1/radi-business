import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {

  constructor(private api:DataService) { }

  step = 2;
  plans_type = 'free';
  card:any = [];

  total;
  currency;

  code;
  product;
  btnValidate = false;
  price_id;
  showCodeInput = false;
  codeValid;


  goToPayments(){

  }

  selectPlan(p){
    this.price_id = p;
    this.total = 249;
    this.currency = "MXN";
    this.next()
  }

  openCode(){

  }

  validateCode(){

  }

  back(){
    this.step = 1;
  }

  ngOnInit(){
    this.getCards()
  }

  close(){

  }

  next(){
    this.step = 2;
    this.getCards()
  }

  getCards(){
    this.api.getCustomerCards(localStorage.getItem('customer_id')).subscribe(data => {
      console.log(data.data[0].card);
      this.card = data.data[0].card;
    });
  }


}
