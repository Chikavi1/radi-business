import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
})
export class AdminUsersPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  name = ""
  email = ""
  password = ""
  cellphone = ""
  expiration = ""
  identification = ""
  points = ""
  status = ""
  customer = ""
  token = ""
  photo = ""
  latitude = ""
  longitude = ""
  code = ""
  birthday = ""
  gender = ""
  verified = ""
  notifications = ""
  country = ""
  currency = ""
  description
  subscription = ""
  interest = ""
  donation_destination = ""
  public_configuration = ""
  city = ""
  visible = ""
  social_media = ""
  coupon = ""
  granted
  pin = ""
  streak = ""
  streak_date = ""
  running_points = ""
  social_verified = ""
  payments_enabled = ""

  update(){

  }

  back(){
    this.step = 1;
  }

  typesearch
  step = 1;

  setSearch(t){
    this.typesearch = t;
  }


  select(){
    this.step = 2;
  }


}
