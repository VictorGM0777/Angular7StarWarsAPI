import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroiComponent } from './components/heroi/heroi.component';
import { HeroiDetailComponent } from './components/heroi/heroi-detail.component';
import { LoginComponent } from './components/login/login.component';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'event', component: HeroiComponent },
  { path: 'event-detail', component: HeroiDetailComponent },
  { path: 'home', component: PaginaInicialComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
