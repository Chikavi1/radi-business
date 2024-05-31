import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-pets',
  templateUrl: './admin-pets.page.html',
  styleUrls: ['./admin-pets.page.scss'],
})
export class AdminPetsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

   name = ""
   description = ""
   size = ""
   breed = ""
   gender = ""
   status = ""
   id_user = ""
   verified = ""
   specie = ""
   code = ""
   photo = ""
   latitude = ""
   longitude = ""
   score = ""
   id_organization = ""
   weight = ""
   tags = ""
   sterelized = ""
   sterelized_date = ""
   muzzle = ""
   chronic_disease = ""
   color_necklace = ""
   birthday = ""
   id_report = ""
   date_death = ""
   memorial_id = ""
   photo_booklet = ""

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
