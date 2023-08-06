import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  grantedEvents;

  constructor() {
    let granted = localStorage.getItem('granted');
    this.grantedEvents = granted.includes('events')

  }

}
