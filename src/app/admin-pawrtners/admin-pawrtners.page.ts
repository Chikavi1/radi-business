import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-pawrtners',
  templateUrl: './admin-pawrtners.page.html',
  styleUrls: ['./admin-pawrtners.page.scss'],
})
export class AdminPawrtnersPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

    name = ''
    description = '';
    image = '';
    bg_color = '';
    fn_color = '';
    fb_url = '';
    ig_url = '';
    web_url = '';
    latitude = '';
    longitude = '';
    address = '';
    status = '';
    email = '';
    password = '';
    granted = '';
    type = '';
    account = '';
    customer = '';
    visible = '';
    last_session = '';
    sales_mode = '';



  typesearch = 1;
  step = 1;

  update(){

  }

  back(){
    this.step = 1;
  }


  setSearch(t){
    this.typesearch = t;
  }


  select(){
    this.step = 2;
  }


}
