import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'addOrder',
    pathMatch: 'full',
  },
  {path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
  {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  {
    path: 'addOrder',
    loadChildren: './pages/add-order/add-order.module#AddOrderPageModule',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
