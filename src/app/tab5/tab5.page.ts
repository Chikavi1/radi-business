import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';
import Chart from 'chart.js/auto';
import { DataService } from '../services/data.service';
import { QrcodeappPage } from '../qrcodeapp/qrcodeapp.page';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements AfterViewInit{
  @ViewChild('speciePet') private speciePetBar: ElementRef;
  @ViewChild('genderPet') private genderPetBar: ElementRef;
  @ViewChild('bestHour') private bestHourBar: ElementRef;
  @ViewChild('bestWeekDay') private bestWeekDayBar: ElementRef;
  @ViewChild('genderHuman') private genderHumanBar: ElementRef;
  @ViewChild('ageHuman') private ageHumanBar: ElementRef;

  barChart: any;


  counter;
  income;
  dogcounter;
  catscounter;
  petMas;
  petFem;
  HumGenderMas
  HumGenderFem;
  winGen = 0;
  winSpe = 0;
  weekday;
  days;
  ageRange;

  hours ;
  device;

  constructor(private api:DataService,private modalCtrl:ModalController){
    this.device = localStorage.getItem('device');


  }


  doRefresh(event) {
    this.getInfo();

    setTimeout(() => {
      event.target.complete();
    },2000);
  }

  getInfo(){
    this.api.getStats(localStorage.getItem('id_company')).subscribe((data:any) => {
      this.counter = data.info[0].counter;
      this.dogcounter = data.info[0].PetDogs;
      this.catscounter = data.info[0].PetCats;
      this.petMas = data.info[0].PetGenderMas;
      this.petFem = data.info[0].PetGenderFem;
      this.HumGenderMas = data.info[0].HumGenderMas;
      this.HumGenderFem = data.info[0].HumGenderFem;
      this.hours = data.hours;
      this.days = data.days;
      console.log(data.hours,data.days);

      this.ageRange = data.rangeAge;
      this.income = data.info[0].countIncome;
      if(this.petMas > this.petFem){
        this.winGen = 1;
      }else{
        this.winGen = 2;
      }

      if(this.catscounter > this.dogcounter){
        this.winSpe = 1;
      }else{
        this.winSpe = 2;
      }


    this.speciePet();
    this.genderPet();

    this.bestHour();
    this.bestWeekDay();

    this.genderHuman();
    this.ageHuman();
  });
  }

  ionViewDidEnter(){
    if(localStorage.getItem('updateStats')){
     this.getInfo();
     localStorage.removeItem('updateStats');

    }
   }

  ngAfterViewInit() {
    this.getInfo()
  }

  speciePet() {
    this.barChart = new Chart(this.speciePetBar.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Perro', 'Gato',],
        datasets: [{
          label: '# de visitas',
          data: [this.dogcounter, this.catscounter],
          backgroundColor: [
            'rgb(83,132,239)',
            'rgb(240,114,116)',

          ],
          borderColor: [
            'rgb(83,132,239)',
            'rgb(240,114,116)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            ticks: {
              display: true,
            },
          },
          y: {
            ticks: {
              display: true,
            },
          },
        },
      }
    });
  }

  genderPet() {
    this.barChart = new Chart(this.genderPetBar.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Macho', 'Hembra',],
        datasets: [{
          label: '# de visitas',
          data: [this.petMas, this.petFem],
          backgroundColor: [
            'rgb(83,132,239)',
            'rgb(240,114,116)',

          ],
          borderColor: [
            'rgb(83,132,239)',
            'rgb(240,114,116)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            ticks: {
              display: true,
            },
          },
          y: {
            ticks: {
              display: true,
            },
          },
        },
      }
    });
  }

  bestHour() {
    this.barChart = new Chart(this.bestHourBar.nativeElement, {
      type: 'bar',
      data: {
        // labels: ['11:00 - 12:00 ', '4:00 - 5:00','5:00 - 6:00','6:00 - 7:00','10:00 - 11:00'],
        datasets: [{
          label: '# de visitas',
          data: this.hours,
          backgroundColor: [
            'rgb(83,132,239)',
            'rgb(240,114,116)',
            'rgb(217,101,6)',
            'rgb(218,70,144)',
            'rgb(58,122,124)'
          ],
          borderColor: [
            'rgb(83,132,239)',
            'rgb(240,114,116)',
            'rgb(217,101,6)',
            'rgb(218,70,144)',
            'rgb(58,122,124)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        parsing: {
          xAxisKey: 'hours',
          yAxisKey: 'uso'
        }
      }
    });
  }


  bestWeekDay() {
    this.barChart = new Chart(this.bestWeekDayBar.nativeElement, {
      type: 'bar',
      data: {
        // labels: ['Viernes', 'Sabado','Lunes','Miercoles','Domingo'],
        datasets: [{
          label: '# de visitas',
          data: this.days,
          backgroundColor: [
            'rgb(83,132,239)',
            'rgb(240,114,116)',
            'rgb(217,101,6)',
            'rgb(218,70,144)',
            'rgb(58,122,124)'
          ],
          borderColor: [
            'rgb(83,132,239)',
            'rgb(240,114,116)',
            'rgb(217,101,6)',
            'rgb(218,70,144)',
            'rgb(58,122,124)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        parsing: {
          xAxisKey: 'week_day',
          yAxisKey: 'counts'
        }
      }
    });
  }

  genderHuman() {
    this.barChart = new Chart(this.genderHumanBar.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Hombre', 'Mujer'],
        datasets: [{
          label: '# de visitas',
          data: [this.HumGenderMas,this.HumGenderFem],
          backgroundColor: [
            'rgb(83,132,239)',
            'rgb(240,114,116)',
          ],
          borderColor: [
            'rgb(83,132,239)',
            'rgb(240,114,116)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            ticks: {
              display: true,
            },
          },
          y: {
            ticks: {
              display: true,
            },
          },
        },
      }
    });
  }

  ageHuman() {
    this.barChart = new Chart(this.ageHumanBar.nativeElement, {
      type: 'bar',
      data: {
        datasets: [{
          label: '# de visitas',
          data: this.ageRange,
          backgroundColor: [
            'rgba(255, 206, 86, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(255,99,132,1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        parsing: {
          xAxisKey: 'age_range',
          yAxisKey: 'count'
        }
      }
    });
  }


}
