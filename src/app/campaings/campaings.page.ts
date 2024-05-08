import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaings',
  templateUrl: './campaings.page.html',
  styleUrls: ['./campaings.page.scss'],
})
export class CampaingsPage implements OnInit {
 step = 1;
  constructor() { }

  ngOnInit() {
  }

  next(){
    this.step += 1;
  }
}
