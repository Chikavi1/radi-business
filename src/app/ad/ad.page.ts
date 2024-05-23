import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { ModalController } from '@ionic/angular';
import * as Leaflet from 'leaflet';
declare var L: any;

@Component({
  selector: 'app-ad',
  templateUrl: './ad.page.html',
  styleUrls: ['./ad.page.scss'],
})
export class AdPage implements OnInit {
  @ViewChild('leafletmap')
  private mapElement: ElementRef;

  constructor(private api:DataService,private modalCtrl:ModalController) { }
  id;
  ad:any = []
  ngOnInit() {
    this.api.getAd(this.id).subscribe(data => {
      console.log(data);
      this.ad = data[0];
    });
  }

  close(){
    this.modalCtrl.dismiss();
  }

  map;

  ionViewDidEnter(){

    this.leafletMap();
  }


  leafletMap(){
    let initlat = 20.65822858189279;
    let initlng = -103.3518831503091
    this.map = Leaflet.map(this.mapElement.nativeElement,{ zoomControl: false}).setView([initlat,initlng], 10);

    var homeICon = L.icon(
      {
        iconUrl:  localStorage.getItem('image'),
        iconSize:     [33, 33], // size of the icon
        className: 'custom-icon'
      });

      Leaflet.tileLayer('https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga', {
        zoom: 8,
        zoomControl: false,
        maxZoom: 18,
        minZoom: 4,
        minResolution: 4891.96981025128,
        maxResolution: 39135.75848201024,
        doubleClickZoom: true
        }).addTo(this.map);



          this.map.panTo(new L.LatLng(this.ad.latitude,this.ad.longitude));
          const marker = Leaflet.marker([this.ad.latitude, this.ad.longitude], {draggable: false, icon: homeICon}).addTo(this.map);
          const circle = Leaflet.circle([this.ad.latitude, this.ad.longitude], {
            color: 'green',
            radius: 10000,
            fillColor: 'green',
            opacity: 0.5
          }).addTo(this.map);




    }

}
