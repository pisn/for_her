import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

import { IonicModule } from '@ionic/angular';

import { NewOrderPage } from './new-order.page';

const routes: Routes = [
  {
    path: '',
    component: NewOrderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    Ionic4DatepickerModule
  ],
  declarations: [NewOrderPage]
})
export class NewOrderPageModule {}
