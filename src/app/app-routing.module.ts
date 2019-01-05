import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'orderDetail',
    pathMatch: 'full',
  },
  {path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
  {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  {
    path: 'orderDetail',
    loadChildren:
      './pages/order-detail/order-detail.module#OrderDetailPageModule',
  },
  {
    path: 'orderPackageDetail',
    loadChildren:
      './pages/order-package-detail/order-package-detail.module#OrderPackageDetailPageModule',
  },
  {
    path: 'sysEntryDetail',
    loadChildren:
      './pages/sys-entry-detail/sys-entry-detail.module#SysEntryDetailPageModule',
  },
  { path: 'findOrder', loadChildren: './pages/find-order/find-order.module#FindOrderPageModule' },
  { path: 'resultRedirect', loadChildren: './pages/result-redirect/result-redirect.module#ResultRedirectPageModule' },
  { path: 'orderBack', loadChildren: './pages/order-back/order-back.module#OrderBackPageModule' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
