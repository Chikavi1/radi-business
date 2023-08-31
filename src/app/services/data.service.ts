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

  removeId(data):any{
    return this.http.post(this.MODE + 'identifications/removed', JSON.parse(JSON.stringify(data)), this.options);
  }

  loginOrg(data):any{
    return this.http.post(this.MODE + 'organization/login', JSON.parse(JSON.stringify(data)), this.options);
  }

  getBreedInfo(data){
    return this.http.post(this.MODE + 'breeds/search', JSON.parse(JSON.stringify(data)), this.options);
  }


  getIdentification(id_pet){
    return this.http.post(this.MODE + 'identifications/get', JSON.parse(JSON.stringify({id:id_pet})), this.options);
  }

  associatedId(data){
    return this.http.post(this.MODE + 'identifications/associated', JSON.parse(JSON.stringify(data)), this.options);
  }

  deleteIdentification(data){
    return this.http.post(this.MODE+'deleteIdentification',JSON.parse(JSON.stringify(data)),this.options);
  }


  getAccount(data):any{
    return this.http.post(this.MODE + 'getAccount',JSON.parse(JSON.stringify(data)), this.options);
  }


  createLink(data):any{
    return this.http.post(this.MODE + 'createLinks',JSON.parse(JSON.stringify(data)), this.options);
  }

  getMovements(data):any{
    return this.http.post(this.MODE + 'getCharges',JSON.parse(JSON.stringify(data)), this.options);
  }


  checkUserPay(data):any{
    return this.http.post(this.MODE + 'checkuserpay',JSON.parse(JSON.stringify(data)), this.options);
  }

  pay(data):any{
    return this.http.post(this.MODE + 'userpay',JSON.parse(JSON.stringify(data)), this.options);
  }

  getPetsByOrg(id_org):any{
    return this.http.get(this.MODE + 'pets/organizationsInAdoptions/'+id_org);
  }

  createBusiness(data): any {
    return this.http.post(this.MODE + 'business/create',JSON.parse(JSON.stringify(data)), this.options);
  }

  getPet(PetId): any {
    return this.http.get(this.MODE + 'pets/showOrg/' + PetId);
  }

  updatePet(data):any{
    return this.http.put(this.MODE + 'pets/updategranted',JSON.parse(JSON.stringify(data)), this.options);
  }

  getVaccines(id_pet){
    return this.http.get(this.MODE+'get_vaccines/'+id_pet);
  }

  createVaccine(data){
    return this.http.post(this.MODE + 'create_vaccine',JSON.parse(JSON.stringify(data)), this.options);
  }

  updateVaccines(data){
    return this.http.put(this.MODE + 'update_vaccine',JSON.parse(JSON.stringify(data)), this.options);
  }

  deleteVaccine(data){
    return this.http.post(this.MODE + 'delete_vaccine',JSON.parse(JSON.stringify(data)), this.options);
  }

  changePassword(data){
    return this.http.put(this.MODE + 'business_password',JSON.parse(JSON.stringify(data)), this.options);
  }

  getEventsByBusiness(id_company){
    return this.http.get(this.MODE+'radievents/'+id_company);
  }

  getEvent(id):any{
    return this.http.get(this.MODE+'radievent/'+id);
  }

  createEvent(data):any{
    return this.http.post(this.MODE + 'eventcreate',JSON.parse(JSON.stringify(data)), this.options);

  }

  updateEvent(data):any{
    return this.http.put(this.MODE + 'eventupdate',JSON.parse(JSON.stringify(data)), this.options);
  }


  deleteEvent(data):any{
    return this.http.post(this.MODE + 'eventdelete',JSON.parse(JSON.stringify(data)), this.options);
  }

  checkLink(data){
    return this.http.post(this.MODE + 'Radilinks',JSON.parse(JSON.stringify(data)), this.options);
  }

  createLinks(data):any{
    return this.http.post(this.MODE + 'links/create',JSON.parse(JSON.stringify(data)), this.options);
  }

  updateLinks(data):any{
    return this.http.put(this.MODE + 'links/update',JSON.parse(JSON.stringify(data)), this.options);
  }

  checkStatus(data){
    return this.http.post(this.MODE + 'business/status',JSON.parse(JSON.stringify(data)), this.options);
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
    return this.http.get(this.MODE+'listachivements/'+type);
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

  getPetInfoOrg(data){
    return this.http.post(this.MODE + 'radi-pet-info-org',JSON.parse(JSON.stringify(data)), this.options);
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

  getUsersById(data){
    return this.http.post(this.MODE + 'businessuser',JSON.parse(JSON.stringify(data)), this.options);
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
