import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router'

/**
 * Components import 
*/
import { HerosComponent } from './heros/heros.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { HeroDetailComponent } from './hero-detail/hero-detail.component'
import { MessagesComponent } from './messages/messages.component'

const routes: Routes = [ 
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heros' , component: HerosComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'logs', component: MessagesComponent},
  { path: 'detail/:id' , component: HeroDetailComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
