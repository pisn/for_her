import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubservicesPage } from './subservices.page';

const routes: Routes = [
  {
    path: '',
    component: SubservicesPage
  },
  {
    path: '/subservices/:chosenService',
    component: SubservicesPage
  },
  {
    path: '/subservices',
    component: SubservicesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubservicesPage]
})
export class SubservicesPageModule {}
