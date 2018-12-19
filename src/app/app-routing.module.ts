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
    path: 'addOrder',
    loadChildren: './pages/add-order/add-order.module#AddOrderPageModule',
  },
  { path: 'orderPackage', loadChildren: './pages/order-package/order-package.module#OrderPackagePageModule' },
  { path: 'addSysEntry', loadChildren: './pages/add-sys-entry/add-sys-entry.module#AddSysEntryPageModule' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
