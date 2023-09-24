import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { P404Component } from './p404/p404.component';

const routes: Routes = [
{
path:'',
component: HomepageComponent,
pathMatch:'full'
},
{
path:'about',
component: HomepageComponent
},
{
path:'login',
component: HomepageComponent
},
{
  path:'**',
component: P404Component
},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
