import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SysEntryDetailPage } from './sys-entry-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SysEntryDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SysEntryDetailPage]
})
export class SysEntryDetailPageModule {}
