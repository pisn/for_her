import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SubservicesPage } from './subservices.page';
var routes = [
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
var SubservicesPageModule = /** @class */ (function () {
    function SubservicesPageModule() {
    }
    SubservicesPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SubservicesPage]
        })
    ], SubservicesPageModule);
    return SubservicesPageModule;
}());
export { SubservicesPageModule };
//# sourceMappingURL=subservices.module.js.map