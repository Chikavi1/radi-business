import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-id-pets-admin',
  templateUrl: './id-pets-admin.page.html',
  styleUrls: ['./id-pets-admin.page.scss'],
})
export class IdPetsAdminPage implements OnInit {
  mode = 'read';

  url;
  garanty;
  version;
  color;
  nfc;

  constructor(private api:DataService) { }

  ngOnInit() {
  }

  add(){
    this.mode = 'write';
  }

  create(){
    this.clearData();
    this.mode = 'read';
    alert('se ha creado');
  }

  cancel(){
    this.clearData();
    this.mode = 'read'
  }

  update(){
    this.mode = 'read';
    this.clearData()
    alert('se ha actualizado');
  }

  scan(){
    this.mode = 'result';

    let data = {
      code: 'RDa899b6e'
    };


    this.api.getInfoPlaca(data).subscribe(data => {
      console.log(data);
      this.url = data[0].url;
      this.garanty = data[0].guarantee;
      this.color = data[0].color;
      this.nfc = data[0].nfc;
      this.version = data[0].version;
    })
  }

  uuidv4() {
    return "RPxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  clearData(){
    this.url = '';
    this.garanty = '';
    this.version  = '';
    this.color = '';
    this.nfc = '';
  }

  generateURL(){
    let code = this.uuidv4()
    this.url = 'https://radi.pet/pets/'+code;
  }

}
