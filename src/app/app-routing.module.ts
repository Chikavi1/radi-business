import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
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
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
