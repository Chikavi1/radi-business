import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./tab3/tab3.module').then( m => m.Tab3PageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'result',
    loadChildren: () => import('./result/result.module').then( m => m.ResultPageModule)
  },
  {
    path: 'promotion',
    loadChildren: () => import('./promotion/promotion.module').then( m => m.PromotionPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'create-achivement',
    loadChildren: () => import('./create-achivement/create-achivement.module').then( m => m.CreateAchivementPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'qrcodeapp',
    loadChildren: () => import('./qrcodeapp/qrcodeapp.module').then( m => m.QrcodeappPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'create-promotion',
    loadChildren: () => import('./create-promotion/create-promotion.module').then( m => m.CreatePromotionPageModule)
  },
  {
    path: 'modal-warning',
    loadChildren: () => import('./modal-warning/modal-warning.module').then( m => m.ModalWarningPageModule)
  },
  {
    path: 'photo-modal',
    loadChildren: () => import('./photo-modal/photo-modal.module').then( m => m.PhotoModalPageModule)
  },
  {
    path: 'info-app',
    loadChildren: () => import('./info-app/info-app.module').then( m => m.InfoAppPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'event',
    loadChildren: () => import('./event/event.module').then( m => m.EventPageModule)
  },
  {
    path: 'create-links',
    loadChildren: () => import('./create-links/create-links.module').then( m => m.CreateLinksPageModule)
  },
  {
    path: 'modal-block',
    loadChildren: () => import('./modal-block/modal-block.module').then( m => m.ModalBlockPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'create-event',
    loadChildren: () => import('./create-event/create-event.module').then( m => m.CreateEventPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'edit-event',
    loadChildren: () => import('./edit-event/edit-event.module').then( m => m.EditEventPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'vaccine',
    loadChildren: () => import('./vaccine/vaccine.module').then( m => m.VaccinePageModule)
  },
  {
    path: 'update-pet',
    loadChildren: () => import('./update-pet/update-pet.module').then( m => m.UpdatePetPageModule)
  },
  {
    path: 'create-business',
    loadChildren: () => import('./create-business/create-business.module').then( m => m.CreateBusinessPageModule)
  },
  {
    path: 'select-read',
    loadChildren: () => import('./select-read/select-read.module').then( m => m.SelectReadPageModule)
  },
  {
    path: 'billing',
    loadChildren: () => import('./billing/billing.module').then( m => m.BillingPageModule)
  },
  {
    path: 'pets-org',
    loadChildren: () => import('./pets-org/pets-org.module').then( m => m.PetsOrgPageModule)
  },
  {
    path: 'result-pets-org',
    loadChildren: () => import('./result-pets-org/result-pets-org.module').then( m => m.ResultPetsOrgPageModule)
  },
  {
    path: 'id-pets',
    loadChildren: () => import('./id-pets/id-pets.module').then( m => m.IdPetsPageModule)
  },
  {
    path: 'id-pets-admin',
    loadChildren: () => import('./id-pets-admin/id-pets-admin.module').then( m => m.IdPetsAdminPageModule)
  },
  {
    path: 'campaings',
    loadChildren: () => import('./campaings/campaings.module').then( m => m.CampaingsPageModule)
  },
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then( m => m.BooksPageModule)
  },
  {
    path: 'logs-scans',
    loadChildren: () => import('./pages/logs-scans/logs-scans.module').then( m => m.LogsScansPageModule)
  },
  {
    path: 'add-client',
    loadChildren: () => import('./add-client/add-client.module').then( m => m.AddClientPageModule)
  },
  {
    path: 'create-reward',
    loadChildren: () => import('./create-reward/create-reward.module').then( m => m.CreateRewardPageModule)
  },
  {
    path: 'pets',
    loadChildren: () => import('./pets/pets.module').then( m => m.PetsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
