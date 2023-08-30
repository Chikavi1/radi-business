import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  grantedEvents;
  grantedOrg;
  grantedBusiness;

  constructor() {
    let granted = localStorage.getItem('granted');
    console.log(granted);

    this.grantedEvents = granted.includes('events')
    this.grantedOrg = granted.includes('orgs')
    this.grantedBusiness = granted.includes('business');


  }

}
