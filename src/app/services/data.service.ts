import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  PRODUCTION_URL  = 'https://p6lde6btg7.execute-api.us-east-1.amazonaws.com/dev/'
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
      this.MODE = this.PRODUCTION_URL;
    }
  }

  updatePhotoCarnet(data):any{
    return this.http.post(this.MODE + 'uploadPetsBooklet', JSON.parse(JSON.stringify(data)), this.options);
  }

  getExtraData(data):any{
    return this.http.post(this.MODE + 'extra-business/get', JSON.parse(JSON.stringify(data)), this.options);
  }

  createExtraData(data):any{
    return this.http.post(this.MODE + 'extra-business/create', JSON.parse(JSON.stringify(data)), this.options);
  }

  updateExtraData(data):any{
    return this.http.post(this.MODE + 'extra-business/update', JSON.parse(JSON.stringify(data)), this.options);

  }

  showOrganizationPets(PetId): any {
    return this.http.get(this.MODE + 'pets/showOrg/' + PetId);
  }

  getPaymentsByUser(data):any{
    return this.http.post(this.MODE + 'business/payments-by-user', JSON.parse(JSON.stringify(data)), this.options);
  }

  getPaymentsByCompany(data):any{
    return this.http.post(this.MODE + 'business/payments-by-company', JSON.parse(JSON.stringify(data)), this.options);
  }

  createRewardLog(data):any{
    return this.http.post(this.MODE + 'rewards/logs/create', JSON.parse(JSON.stringify(data)), this.options);
  }

  resetRewardLogs(data):any{
    return this.http.post(this.MODE + 'rewards/logs/reset', JSON.parse(JSON.stringify(data)), this.options);
  }



  getAddresses(id):any{
    return this.http.get(this.MODE + 'addresses/user/'+id);
  }

  updateRewards(data):any{
    return this.http.post(this.MODE + 'rewards/update', JSON.parse(JSON.stringify(data)), this.options);
  }

  getVisitsByUser(data):any{
    return this.http.post(this.MODE + 'business/visits-by-iduser', JSON.parse(JSON.stringify(data)), this.options);
  }

  getPetsByUser(id):any{
    return this.http.get(this.MODE + 'pets/user/'+id);
  }

  createUser(data):any{
    return this.http.post(this.MODE + 'business/users/create', JSON.parse(JSON.stringify(data)), this.options);
  }

  getRewards(id):any{
    return this.http.get(this.MODE + 'rewards/company/'+id);
  }

  createRewards(data):any{
    return this.http.post(this.MODE + 'rewards/create', JSON.parse(JSON.stringify(data)), this.options);
  }


  createRewardsLogs(data):any{
    return this.http.post(this.MODE + 'rewards/logs/create', JSON.parse(JSON.stringify(data)), this.options);
  }



  getInfoPlaca(data):any{
    return this.http.post(this.MODE + 'identifications_info/', JSON.parse(JSON.stringify(data)), this.options);
  }



  placaUpdate(data):any{
    return this.http.post(this.MODE + 'identifications/admin', JSON.parse(JSON.stringify(data)), this.options);
  }

  removeId(data):any{
    return this.http.post(this.MODE + 'identifications/removed', JSON.parse(JSON.stringify(data)), this.options);
  }

  loginOrg(data):any{
    return this.http.post(this.MODE + 'organization/login', JSON.parse(JSON.stringify(data)), this.options);
  }

  getBreedInfo(data){
    return this.http.post(this.MODE + 'animal-breeds/search', JSON.parse(JSON.stringify(data)), this.options);
  }


  getIdentification(id_pet){
    return this.http.post(this.MODE + 'identifications/get', JSON.parse(JSON.stringify({id:id_pet})), this.options);
  }

  associatedId(data):any{
    return this.http.post(this.MODE + 'identifications/associate', JSON.parse(JSON.stringify(data)), this.options);
  }

  deleteIdentification(data){
    return this.http.post(this.MODE+'identifications/remove',JSON.parse(JSON.stringify(data)),this.options);
  }


  getAccount(data):any{
    return this.http.post(this.MODE + 'stripe/account',JSON.parse(JSON.stringify(data)), this.options);
  }

  getBanks(data):any{
    return this.http.post(this.MODE + 'stripe/accounts/bank',JSON.parse(JSON.stringify(data)), this.options);
  }


  createLink(data):any{
    return this.http.post(this.MODE + 'stripe/addLink',JSON.parse(JSON.stringify(data)), this.options);
  }

  getMovements(data):any{
    return this.http.post(this.MODE + 'getCharges',JSON.parse(JSON.stringify(data)), this.options);
  }


  checkUserPay(data):any{
    return this.http.post(this.MODE + 'business/checkUserPaymentsEnabled',JSON.parse(JSON.stringify(data)), this.options);
  }

  paymentbusiness(data):any{
    return this.http.post(this.MODE + 'business/userpay',JSON.parse(JSON.stringify(data)), this.options);
  }

  updateGranted(data){
    return this.http.post(this.MODE + 'user/update-granted',JSON.parse(JSON.stringify(data)), this.options);
   }

  // pay(data):any{
  //   return this.http.post(this.MODE + 'business/user-payment',JSON.parse(JSON.stringify(data)), this.options);
  // }

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
    return this.http.get(this.MODE+'vaccines/'+id_pet);
  }

  createVaccine(data){
    return this.http.post(this.MODE + 'vaccine/create',JSON.parse(JSON.stringify(data)), this.options);
  }

  updateVaccines(data){
    return this.http.put(this.MODE + 'vaccine/update',JSON.parse(JSON.stringify(data)), this.options);
  }

  deleteVaccine(data){
    return this.http.post(this.MODE + 'delete_vaccine',JSON.parse(JSON.stringify(data)), this.options);
  }

  changePassword(data){
    return this.http.put(this.MODE + 'business/password',JSON.parse(JSON.stringify(data)), this.options);
  }

  getEventsByBusiness(id_company){
    return this.http.get(this.MODE+'business/events/'+id_company);
  }

  getEvent(id):any{
    return this.http.get(this.MODE+'business/event/'+id);
  }

  createEvent(data):any{
    return this.http.post(this.MODE + 'business/event/create',JSON.parse(JSON.stringify(data)), this.options);

  }

  updateEvent(data):any{
    return this.http.put(this.MODE + 'business/event/update',JSON.parse(JSON.stringify(data)), this.options);
  }


  deleteEvent(data):any{
    return this.http.post(this.MODE + 'business/event/delete',JSON.parse(JSON.stringify(data)), this.options);
  }

  checkLink(data){
    return this.http.post(this.MODE + 'business/links',JSON.parse(JSON.stringify(data)), this.options);
  }

  createLinks(data):any{
    return this.http.post(this.MODE + 'business/links/create',JSON.parse(JSON.stringify(data)), this.options);
  }

  updateLinks(data):any{
    return this.http.put(this.MODE + 'business/links/update',JSON.parse(JSON.stringify(data)), this.options);
  }

  checkStatus(data){
    return this.http.post(this.MODE + 'business/status',JSON.parse(JSON.stringify(data)), this.options);
  }


  updatediscountImage(data){
    return this.http.put(this.MODE + 'discount/updateImage',JSON.parse(JSON.stringify(data)), this.options);
  }

  createReport(data){
    return this.http.post(this.MODE + 'business/reports-users',JSON.parse(JSON.stringify(data)), this.options);
  }

  visitsByUser(data){
    return this.http.post(this.MODE + 'business/visits-by-user',JSON.parse(JSON.stringify(data)), this.options);
  }

  getAchiviments(type){
    return this.http.get(this.MODE+'business/achievements/list/'+type);
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
    return this.http.put(this.MODE + 'business/visits/update',JSON.parse(JSON.stringify(data)), this.options);
  }

   getCompany(id){
    return this.http.get(this.MODE+'discounts-companies/'+id);
   }

   updateCompany(data){
    return this.http.put(this.MODE + 'discounts-company/update',JSON.parse(JSON.stringify(data)), this.options);
   }

  getPetInfo(data){
    return this.http.post(this.MODE + 'pets/qr-scan-visit',JSON.parse(JSON.stringify(data)), this.options);
  }

  getPetInfoOrg(data){
    return this.http.post(this.MODE + 'pets/qr-scan-visit-org',JSON.parse(JSON.stringify(data)), this.options);
  }

  getPetVaccines(){
    return this.http.get(this.MODE+'discounts-companies/');
  }

  getPetVisitsByCompany(id){
    return this.http.get(this.MODE+'radivisitspets/'+id);
  }

  createVisit(data){
    return this.http.post(this.MODE + 'business/visits/create',JSON.parse(JSON.stringify(data)), this.options);
  }

  getRecordsByCompany(id){
    return this.http.get(this.MODE+'business/visits/'+id);
  }

  getRecordsById(id){
    return this.http.get(this.MODE+'business/visit/'+id);
  }

  createAchivement(data){
    return this.http.post(this.MODE + 'business/achievements',JSON.parse(JSON.stringify(data)), this.options);
  }

  getUsersByCompany(id){
    return this.http.get(this.MODE+'business/users/'+id);
  }

  getPetsByCompany(id){
    return this.http.get(this.MODE+'business/pets/'+id);
  }

  getUsersById(data){
    return this.http.post(this.MODE + 'business/user',JSON.parse(JSON.stringify(data)), this.options);
  }


  createPromotion(data){
    return this.http.post(this.MODE + 'discounts/create',JSON.parse(JSON.stringify(data)), this.options);
  }

  updatePromotion(data){
    return this.http.post(this.MODE + 'discount/update',JSON.parse(JSON.stringify(data)), this.options);
  }

  getStats(id){
    return this.http.get(this.MODE+'business/stats/'+id);
  }


  loginBusiness(data):any{
    return this.http.post(this.MODE + 'business/login',JSON.parse(JSON.stringify(data)), this.options);
  }

  logout(){
    return this.http.get(this.MODE+'logout/');
  }


}
