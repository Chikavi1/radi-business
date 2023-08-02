import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  PRODUCTION_URL  = 'https://core.radi.pet/'
  TEST_URL        = 'https://raditest.radi.pet/';
  LOCAL_URL       = 'http://localhost:8080/'
  MODE = this.LOCAL_URL;

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  options = {
    headers: this.headers
  }

  constructor(private http: HttpClient){
    if(localStorage.getItem('sandbox')){
      this.MODE = this.LOCAL_URL;
    }else{
      this.MODE = this.LOCAL_URL;
    }
  }




  updatediscountImage(data){
    return this.http.put(this.MODE + 'discount/updateImage',JSON.parse(JSON.stringify(data)), this.options);
  }

  createReport(data){
    return this.http.post(this.MODE + 'reportsusersradi',JSON.parse(JSON.stringify(data)), this.options);
  }

  visitsByUser(data){
    return this.http.post(this.MODE + 'radivisitByUser',JSON.parse(JSON.stringify(data)), this.options);
  }

  getAchiviments(type){
    return this.http.get(this.MODE+'listachivements/type');
  }


  discounts(id_company){
  return this.http.get(this.MODE+'discounts-by-company/'+id_company);
  }

  discount(id){
  return this.http.get(this.MODE+'discount/'+id);
  }

  updatediscount(data){
    return this.http.put(this.MODE + 'discount/update',JSON.parse(JSON.stringify(data)), this.options);
  }

  updateVisit(data){
    return this.http.put(this.MODE + 'radivisits/update',JSON.parse(JSON.stringify(data)), this.options);
  }

   getCompany(id){
    return this.http.get(this.MODE+'discounts-companies/'+id);
   }

   updateCompany(data){
    return this.http.put(this.MODE + 'discounts-company/update',JSON.parse(JSON.stringify(data)), this.options);
   }

  getPetInfo(data){
    return this.http.post(this.MODE + 'radi-pet-info',JSON.parse(JSON.stringify(data)), this.options);
  }

  getPetVaccines(){
    return this.http.get(this.MODE+'discounts-companies/');
  }

  getPetVisitsByCompany(id){
    return this.http.get(this.MODE+'radivisitspets/'+id);
  }

  createVisit(data){
    return this.http.post(this.MODE + 'radivisits/create',JSON.parse(JSON.stringify(data)), this.options);
  }

  getRecordsByCompany(id){
    return this.http.get(this.MODE+'radivisits/'+id);
  }

  getRecordsById(id){
    return this.http.get(this.MODE+'radivisit/'+id);
  }

  createAchivement(data){
    return this.http.post(this.MODE + 'radiachiviments',JSON.parse(JSON.stringify(data)), this.options);
  }

  getUsersByCompany(id){
    return this.http.get(this.MODE+'businessusers/'+id);
  }

  getUsersById(id){
    return this.http.get(this.MODE+'businessuser/'+id);
  }


  createPromotion(data){
    return this.http.post(this.MODE + 'discount/create',JSON.parse(JSON.stringify(data)), this.options);
  }

  updatePromotion(data){
    return this.http.post(this.MODE + 'discount/update',JSON.parse(JSON.stringify(data)), this.options);
  }

  getStats(id){
    return this.http.get(this.MODE+'businessstats/'+id);
  }


  loginBusiness(data){
    return this.http.post(this.MODE + 'business/login',JSON.parse(JSON.stringify(data)), this.options);
  }

  logout(){
    return this.http.get(this.MODE+'logout/');
  }


}
