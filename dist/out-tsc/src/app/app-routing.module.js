import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule'
    },
    {
        path: 'list',
        loadChildren: './list/list.module#ListPageModule'
    },
    { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
    { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
    { path: 'services', loadChildren: './services/services.module#ServicesPageModule' },
    { path: 'subservices', loadChildren: './subservices/subservices.module#SubservicesPageModule' },
    { path: 'subservices/:chosenService', loadChildren: './subservices/subservices.module#SubservicesPageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map