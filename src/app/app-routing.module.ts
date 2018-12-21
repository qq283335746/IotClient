import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
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
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
