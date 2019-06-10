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
  { path: 'subservices/:chosenService', loadChildren: './subservices/subservices.module#SubservicesPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
