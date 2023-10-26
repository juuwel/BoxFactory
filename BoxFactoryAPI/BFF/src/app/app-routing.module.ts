import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {BoxListComponent} from "./boxlist/boxlist.component";
import {OrdersComponent} from "./orders/orders.component";
import {UpdateboxComponent} from "./boxlist/(update)/updatebox.component";

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'boxlist', component: BoxListComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'boxlist/update/:boxId', component: UpdateboxComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
