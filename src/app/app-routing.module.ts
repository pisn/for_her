import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
  { path: 'subservices/:chosenService', loadChildren: './subservices/subservices.module#SubservicesPageModule' },
  { path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'reset-password/:userEmail', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'new-order', loadChildren: './new-order/new-order.module#NewOrderPageModule' },
  { path: 'search-prestador', loadChildren: './search-prestador/search-prestador.module#SearchPrestadorPageModule' },
  { path: 'my-orders', loadChildren: './my-orders/my-orders.module#MyOrdersPageModule' },
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' },
  { path: 'subservice-details/:chosenSubservice', loadChildren: './subservice-details/subservice-details.module#SubserviceDetailsPageModule' },
  { path: 'location-select', loadChildren: './location-select/location-select.module#LocationSelectPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
